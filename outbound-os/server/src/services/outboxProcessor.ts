import { prisma } from "../lib/prisma.js";
import { env } from "../lib/env.js";
import { getEmailProvider } from "../providers/email.js";
import { canSendNow } from "./sendCaps.js";
import { isSuppressed } from "./suppression.js";
import { getWorkspace, scheduleNextStep } from "./scheduler.js";
import { writeAudit } from "./audit.js";

const TRANSIENT = /timeout|ECONNRESET|429|503|502|temporarily/i;

export async function processDueOutbox(limit = 25): Promise<{ processed: number; deferred: number; failed: number }> {
  const due = await prisma.outboxMessage.findMany({
    where: {
      status: "scheduled",
      scheduledAt: { lte: new Date() },
      campaign: { status: "running" },
    },
    include: {
      mailbox: true,
      campaign: true,
      campaignLead: { include: { lead: true } },
    },
    orderBy: { scheduledAt: "asc" },
    take: limit,
  });

  let processed = 0;
  let deferred = 0;
  let failed = 0;
  const settings = await getWorkspace();

  for (const msg of due) {
    const claimed = await prisma.outboxMessage.updateMany({
      where: { id: msg.id, status: "scheduled" },
      data: { status: "sending", attemptCount: { increment: 1 } },
    });
    if (claimed.count === 0) continue;

    const suppressed = await isSuppressed(prisma, {
      email: msg.toEmail,
      phone: msg.campaignLead.lead.phone,
    });
    if (suppressed.suppressed) {
      await prisma.outboxMessage.update({
        where: { id: msg.id },
        data: { status: "cancelled", error: `suppressed:${suppressed.reason}` },
      });
      await prisma.campaignLead.update({
        where: { id: msg.campaignLeadId },
        data: { status: "skipped", error: `suppressed:${suppressed.reason}` },
      });
      deferred += 1;
      continue;
    }

    if (["unsubscribed", "bounced", "replied"].includes(msg.campaignLead.status)) {
      await prisma.outboxMessage.update({
        where: { id: msg.id },
        data: { status: "cancelled", error: `lead_status:${msg.campaignLead.status}` },
      });
      deferred += 1;
      continue;
    }

    // Dry-run: keep daily caps, but skip warm-up hourly throttling so demos can drain outbox.
    const forceDry = settings.dryRun || env.DRY_RUN;
    const caps = await canSendNow(prisma, {
      mailboxId: msg.mailboxId,
      campaignId: msg.campaignId,
      mailboxDailyCap: msg.mailbox.dailyCap,
      campaignDailyLimit: msg.campaign.dailyLimit,
      warmUp: forceDry ? false : settings.warmUpMode || msg.mailbox.warmUp,
      workspaceMax: settings.maxEmailsPerDay,
      warmUpCap: env.WARM_UP_DAILY_CAP,
      skipHourly: forceDry,
    });

    if (!caps.ok) {
      await prisma.outboxMessage.update({
        where: { id: msg.id },
        data: {
          status: "scheduled",
          scheduledAt: new Date(Date.now() + 15 * 60 * 1000),
          error: caps.reason,
        },
      });
      deferred += 1;
      continue;
    }

    try {
      const provider = getEmailProvider(
        msg.mailbox.provider === "dry_run" ? "dry-run" : msg.mailbox.provider,
      );
      const result = forceDry
        ? await getEmailProvider("dry-run").send({
            fromName: msg.mailbox.fromName,
            fromEmail: msg.mailbox.fromEmail,
            to: msg.toEmail,
            subject: msg.subject,
            html: msg.bodyHtml,
            text: msg.bodyText,
            idempotencyKey: msg.idempotencyKey,
          })
        : await provider.send({
            fromName: msg.mailbox.fromName,
            fromEmail: msg.mailbox.fromEmail,
            to: msg.toEmail,
            subject: msg.subject,
            html: msg.bodyHtml,
            text: msg.bodyText,
            idempotencyKey: msg.idempotencyKey,
          });

      const status = result.dryRun || forceDry ? "dry_run_sent" : "sent";
      await prisma.outboxMessage.update({
        where: { id: msg.id },
        data: {
          status,
          sentAt: new Date(),
          providerId: result.providerId,
          error: null,
        },
      });
      await prisma.campaignLead.update({
        where: { id: msg.campaignLeadId },
        data: { status: "sent", lastSentAt: new Date() },
      });
      await prisma.lead.update({
        where: { id: msg.campaignLead.leadId },
        data: { status: "contacted" },
      });
      await scheduleNextStep(msg.campaignLeadId);
      processed += 1;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const attempts = msg.attemptCount + 1;
      const retryable = TRANSIENT.test(message) && attempts < 5;
      await prisma.outboxMessage.update({
        where: { id: msg.id },
        data: {
          status: retryable ? "scheduled" : "failed",
          error: message.slice(0, 500),
          scheduledAt: retryable
            ? new Date(Date.now() + Math.min(60, 2 ** attempts) * 60 * 1000)
            : undefined,
        },
      });
      if (!retryable) {
        await prisma.campaignLead.update({
          where: { id: msg.campaignLeadId },
          data: { status: "failed", error: message.slice(0, 500) },
        });
        failed += 1;
      } else {
        deferred += 1;
      }
      await writeAudit({
        action: "outbox.send_error",
        campaignId: msg.campaignId,
        meta: { outboxId: msg.id, error: message.slice(0, 200), retryable },
      });
    }
  }

  return { processed, deferred, failed };
}
