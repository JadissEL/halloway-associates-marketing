import type { Lead, SequenceStep, WorkspaceSettings } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { env } from "../lib/env.js";
import { brandDefaults } from "../lib/brandConfig.js";
import { appendUnsubscribe, renderTemplate, textToHtml } from "../lib/templates.js";
import { personalizeMessage } from "../providers/ai.js";
import { isFreeEmailDomain, isSuppressed } from "./suppression.js";
import { writeAudit } from "./audit.js";

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

export async function getWorkspace(): Promise<WorkspaceSettings> {
  const existing = await prisma.workspaceSettings.findFirst();
  if (existing) return existing;
  const brand = brandDefaults();
  return prisma.workspaceSettings.create({
    data: {
      brand: env.BRAND || brand.brand,
      founderName: env.FOUNDER_NAME || brand.founderName,
      contactEmail: env.CONTACT_EMAIL || brand.contactEmail,
      contactPhone: env.CONTACT_PHONE || brand.contactPhone,
      defaultCity: env.CITY || brand.city,
      dryRun: env.DRY_RUN,
      warmUpMode: true,
      maxEmailsPerDay: env.DEFAULT_DAILY_CAP,
      requireWebsite: env.REQUIRE_WEBSITE,
      excludeFreeEmailDomains: env.EXCLUDE_FREE_EMAIL_DOMAINS,
    },
  });
}

export async function enqueueFirstStepForCampaign(campaignId: string) {
  const campaign = await prisma.campaign.findUniqueOrThrow({
    where: { id: campaignId },
    include: {
      sequence: { include: { steps: { orderBy: { order: "asc" } } } },
      mailbox: true,
      leads: { include: { lead: true }, where: { status: "pending" } },
    },
  });
  const step = campaign.sequence.steps[0];
  if (!step) throw new Error("Sequence has no steps");
  const settings = await getWorkspace();
  let queued = 0;
  let skipped = 0;

  for (const cl of campaign.leads) {
    const result = await enqueueStepForLead({
      campaignId,
      campaignLeadId: cl.id,
      lead: cl.lead,
      step,
      mailboxId: campaign.mailboxId,
      scheduledAt: campaign.startAt && campaign.startAt > new Date() ? campaign.startAt : new Date(),
      settings,
    });
    if (result === "queued") queued += 1;
    else skipped += 1;
  }

  await writeAudit({
    action: "campaign.enqueue",
    campaignId,
    meta: { queued, skipped },
  });
  return { queued, skipped };
}

export async function enqueueStepForLead(opts: {
  campaignId: string;
  campaignLeadId: string;
  lead: Lead;
  step: SequenceStep;
  mailboxId: string;
  scheduledAt: Date;
  settings: WorkspaceSettings;
}): Promise<"queued" | "skipped"> {
  const { lead, step, settings } = opts;
  if (!lead.email) {
    await prisma.campaignLead.update({
      where: { id: opts.campaignLeadId },
      data: { status: "skipped", error: "missing_email" },
    });
    return "skipped";
  }
  if (settings.requireWebsite && !lead.website) {
    await prisma.campaignLead.update({
      where: { id: opts.campaignLeadId },
      data: { status: "skipped", error: "missing_website" },
    });
    return "skipped";
  }
  if (settings.excludeFreeEmailDomains && isFreeEmailDomain(lead.email)) {
    await prisma.campaignLead.update({
      where: { id: opts.campaignLeadId },
      data: { status: "skipped", error: "free_email_domain" },
    });
    return "skipped";
  }

  const suppressed = await isSuppressed(prisma, { email: lead.email, phone: lead.phone });
  if (suppressed.suppressed) {
    await prisma.campaignLead.update({
      where: { id: opts.campaignLeadId },
      data: { status: "skipped", error: `suppressed:${suppressed.reason}` },
    });
    return "skipped";
  }

  const personalized = await personalizeMessage({
    businessName: lead.businessName,
    niche: lead.niche,
    city: lead.city,
    website: lead.website,
    subjectTemplate: step.subjectTemplate,
    bodyTemplate: step.bodyTemplate,
    brand: settings.brand,
    founderName: settings.founderName,
  });

  const vars = {
    BUSINESS_NAME: lead.businessName,
    NICHE: lead.niche,
    CITY: lead.city,
    WEBSITE: lead.website ?? "",
    BRAND: settings.brand,
    FOUNDER_NAME: settings.founderName,
    EMAIL: settings.contactEmail,
    PHONE: settings.contactPhone,
  };

  const subject = renderTemplate(personalized.subject, vars);
  let body = renderTemplate(personalized.body, vars);
  const unsubToken = Buffer.from(`${lead.email}|${opts.campaignLeadId}`).toString("base64url");
  const unsubUrl = `${env.UNSUBSCRIBE_BASE_URL}?token=${unsubToken}`;
  const withUnsub = appendUnsubscribe(textToHtml(body), body, unsubUrl);
  body = withUnsub.text;

  const idempotencyKey = `${opts.campaignId}:${opts.campaignLeadId}:${step.id}`;

  await prisma.outboxMessage.upsert({
    where: { idempotencyKey },
    create: {
      campaignId: opts.campaignId,
      campaignLeadId: opts.campaignLeadId,
      mailboxId: opts.mailboxId,
      stepId: step.id,
      toEmail: lead.email,
      subject,
      bodyHtml: withUnsub.html,
      bodyText: withUnsub.text,
      scheduledAt: opts.scheduledAt,
      status: "scheduled",
      idempotencyKey,
    },
    update: {},
  });

  await prisma.campaignLead.update({
    where: { id: opts.campaignLeadId },
    data: {
      status: "queued",
      currentStep: step.order,
      nextScheduledAt: opts.scheduledAt,
      personalizedJson: { subject, provider: personalized.provider },
      error: null,
    },
  });

  await prisma.lead.update({
    where: { id: lead.id },
    data: { status: "queued" },
  });

  return "queued";
}

export async function scheduleNextStep(campaignLeadId: string) {
  const cl = await prisma.campaignLead.findUniqueOrThrow({
    where: { id: campaignLeadId },
    include: {
      lead: true,
      campaign: {
        include: {
          sequence: { include: { steps: { orderBy: { order: "asc" } } } },
        },
      },
    },
  });
  if (["replied", "bounced", "unsubscribed", "failed", "skipped"].includes(cl.status)) {
    return null;
  }
  if (cl.campaign.status !== "running") return null;

  const next = cl.campaign.sequence.steps.find((s) => s.order === cl.currentStep + 1);
  if (!next) {
    return null;
  }
  const settings = await getWorkspace();
  const scheduledAt = addDays(cl.lastSentAt ?? new Date(), next.delayDays);
  return enqueueStepForLead({
    campaignId: cl.campaignId,
    campaignLeadId: cl.id,
    lead: cl.lead,
    step: next,
    mailboxId: cl.campaign.mailboxId,
    scheduledAt,
    settings,
  });
}
