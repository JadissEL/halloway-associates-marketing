import { prisma } from "../lib/prisma.js";
import { classifyReply } from "../providers/ai.js";
import { addSuppression } from "./suppression.js";
import { getWorkspace } from "./scheduler.js";
import { writeAudit } from "./audit.js";
import { renderTemplate } from "../lib/templates.js";

export async function ingestReply(input: {
  rawText: string;
  leadId?: string;
  campaignLeadId?: string;
  outboxMessageId?: string;
  source?: string;
}) {
  const settings = await getWorkspace();
  const classified = await classifyReply(input.rawText, settings.founderName);
  const suggestedReply = renderTemplate(classified.suggestedReply, {
    FOUNDER_NAME: settings.founderName,
    BRAND: settings.brand,
    EMAIL: settings.contactEmail,
    PHONE: settings.contactPhone,
  });

  let leadId = input.leadId;
  let campaignLeadId = input.campaignLeadId;

  if (input.outboxMessageId && !campaignLeadId) {
    const msg = await prisma.outboxMessage.findUnique({ where: { id: input.outboxMessageId } });
    if (msg) {
      campaignLeadId = msg.campaignLeadId;
    }
  }
  if (campaignLeadId && !leadId) {
    const cl = await prisma.campaignLead.findUnique({ where: { id: campaignLeadId } });
    leadId = cl?.leadId;
  }

  const reply = await prisma.reply.create({
    data: {
      rawText: input.rawText,
      classification: classified.classification,
      confidence: classified.confidence,
      suggestedReply,
      source: input.source ?? "manual",
      leadId,
      campaignLeadId,
      outboxMessageId: input.outboxMessageId,
    },
  });

  if (leadId) {
    if (classified.classification === "unsubscribe") {
      const lead = await prisma.lead.findUnique({ where: { id: leadId } });
      if (lead?.email) {
        await addSuppression(prisma, {
          type: "email",
          value: lead.email,
          reason: "unsubscribe_reply",
        });
      }
      await prisma.lead.update({ where: { id: leadId }, data: { status: "unsubscribed" } });
      if (campaignLeadId) {
        await prisma.campaignLead.update({
          where: { id: campaignLeadId },
          data: { status: "unsubscribed" },
        });
        await prisma.outboxMessage.updateMany({
          where: { campaignLeadId, status: "scheduled" },
          data: { status: "cancelled", error: "unsubscribed" },
        });
      }
    } else if (classified.classification === "bounce") {
      await prisma.lead.update({ where: { id: leadId }, data: { status: "bounced" } });
      if (campaignLeadId) {
        await prisma.campaignLead.update({
          where: { id: campaignLeadId },
          data: { status: "bounced" },
        });
        await prisma.outboxMessage.updateMany({
          where: { campaignLeadId, status: "scheduled" },
          data: { status: "cancelled", error: "bounce" },
        });
      }
      const lead = await prisma.lead.findUnique({ where: { id: leadId } });
      if (lead?.email) {
        await addSuppression(prisma, { type: "email", value: lead.email, reason: "bounce" });
      }
    } else if (
      classified.classification === "interested" ||
      classified.classification === "question"
    ) {
      await prisma.lead.update({ where: { id: leadId }, data: { status: "hot" } });
      if (campaignLeadId) {
        await prisma.campaignLead.update({
          where: { id: campaignLeadId },
          data: { status: "replied" },
        });
        await prisma.outboxMessage.updateMany({
          where: { campaignLeadId, status: "scheduled" },
          data: { status: "cancelled", error: "replied_stop_sequence" },
        });
      }
      await prisma.pipelineItem.create({
        data: {
          leadId,
          replyId: reply.id,
          stage: "hot",
          suggestedReply,
          notes: `Classification: ${classified.classification} (${classified.confidence})`,
        },
      });
      await prisma.notification.create({
        data: {
          type: "hot_lead",
          title: "Lead chaud",
          body: `Réponse ${classified.classification} — à traiter dans le pipeline`,
          meta: { leadId, replyId: reply.id },
        },
      });
    } else if (classified.classification === "not_interested") {
      await prisma.lead.update({ where: { id: leadId }, data: { status: "replied" } });
      if (campaignLeadId) {
        await prisma.campaignLead.update({
          where: { id: campaignLeadId },
          data: { status: "replied" },
        });
        await prisma.outboxMessage.updateMany({
          where: { campaignLeadId, status: "scheduled" },
          data: { status: "cancelled", error: "not_interested" },
        });
      }
      await prisma.pipelineItem.create({
        data: {
          leadId,
          replyId: reply.id,
          stage: "new_reply",
          suggestedReply,
          notes: "not_interested",
        },
      });
    } else {
      await prisma.pipelineItem.create({
        data: {
          leadId,
          replyId: reply.id,
          stage: "new_reply",
          suggestedReply,
        },
      });
    }
  }

  await writeAudit({
    action: "reply.ingested",
    meta: {
      replyId: reply.id,
      classification: classified.classification,
      confidence: classified.confidence,
      provider: classified.provider,
    },
  });

  return { reply, classification: classified };
}
