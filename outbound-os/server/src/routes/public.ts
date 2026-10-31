import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { env } from "../lib/env.js";
import { addSuppression } from "../services/suppression.js";
import { ingestReply } from "../services/replies.js";
import { writeAudit } from "../services/audit.js";

function assertWebhookAuth(req: FastifyRequest, reply: FastifyReply): boolean {
  if (!env.WEBHOOK_SECRET) {
    if (env.NODE_ENV === "production") {
      void reply.code(503).send({ error: "webhook_not_configured" });
      return false;
    }
    return true;
  }
  const header = String(req.headers["x-webhook-secret"] ?? "");
  if (header !== env.WEBHOOK_SECRET) {
    void reply.code(401).send({ error: "unauthorized" });
    return false;
  }
  return true;
}

export async function publicRoutes(app: FastifyInstance) {
  app.post(
    "/api/public/inbound-lead",
    {
      config: { rateLimit: { max: 30, timeWindow: "1 minute" } },
    },
    async (req, reply) => {
      const body = z
        .object({
          type: z.string().max(40).default("audit"),
          name: z.string().min(1).max(120),
          businessName: z.string().min(1).max(200),
          niche: z.string().min(1).max(80),
          city: z.string().min(1).max(80),
          website: z.string().max(300).optional().nullable(),
          email: z.string().email().optional().nullable().or(z.literal("")),
          phone: z.string().max(40).optional().nullable(),
          notes: z.string().max(2000).optional().nullable(),
        })
        .parse(req.body);

      const email = body.email ? body.email.toLowerCase() : null;
      const websiteRaw = body.website?.trim() || "";
      const isIg = websiteRaw.startsWith("@") || /instagram\.com/i.test(websiteRaw);
      const lead = await prisma.lead.create({
        data: {
          businessName: body.businessName,
          niche: body.niche,
          city: body.city,
          website: isIg ? null : websiteRaw || null,
          instagram: isIg ? websiteRaw : null,
          email,
          phone: body.phone || null,
          notes: [body.name && `Contact: ${body.name}`, body.type && `Form: ${body.type}`, body.notes]
            .filter(Boolean)
            .join("\n"),
          source: "website_form",
          publicListingUrl: websiteRaw || null,
          status: "new",
          collectedAt: new Date(),
        },
      });

      const pipeline = await prisma.pipelineItem.create({
        data: {
          leadId: lead.id,
          stage: "new_reply",
          notes: `Inbound site (${body.type}) — ${body.name}`,
        },
      });

      const { notifyOperator } = await import("../services/notify.js");
      await notifyOperator({
        type: "inbound_lead",
        title: `Nouveau lead site — ${body.businessName}`,
        body: `${body.name} · ${body.niche} · ${body.city}\n${email || body.phone || "sans contact digital"}`,
        meta: { leadId: lead.id, pipelineId: pipeline.id, formType: body.type },
      });

      await writeAudit({
        action: "public.inbound_lead",
        meta: { leadId: lead.id, pipelineId: pipeline.id, type: body.type, source: "website_form" },
      });

      return reply.code(201).send({ ok: true, leadId: lead.id, pipelineId: pipeline.id });
    },
  );
  app.get(
    "/api/public/unsubscribe",
    {
      config: { rateLimit: { max: 60, timeWindow: "1 minute" } },
    },
    async (req, reply) => {
      const q = z.object({ token: z.string() }).parse(req.query);
      let email = "";
      let campaignLeadId: string | undefined;
      try {
        const decoded = Buffer.from(q.token, "base64url").toString("utf8");
        const [e, cl] = decoded.split("|");
        email = (e ?? "").trim().toLowerCase();
        campaignLeadId = cl;
      } catch {
        return reply.code(400).send({ error: "invalid_token" });
      }
      if (!email || !email.includes("@")) {
        return reply.code(400).send({ error: "invalid_token" });
      }

      await addSuppression(prisma, {
        type: "email",
        value: email,
        reason: "unsubscribe_link",
      });

      const lead = await prisma.lead.findFirst({ where: { email } });
      if (lead) {
        await prisma.lead.update({ where: { id: lead.id }, data: { status: "unsubscribed" } });
      }
      if (campaignLeadId) {
        await prisma.campaignLead.updateMany({
          where: { id: campaignLeadId },
          data: { status: "unsubscribed" },
        });
        await prisma.outboxMessage.updateMany({
          where: { campaignLeadId, status: "scheduled" },
          data: { status: "cancelled", error: "unsubscribed" },
        });
      }

      await writeAudit({
        action: "public.unsubscribe",
        meta: { email },
      });

      reply.header("content-type", "text/html; charset=utf-8");
      return `<!doctype html><html lang="fr"><body style="font-family:Georgia,serif;padding:40px"><h1>Désinscription confirmée</h1><p>Vous ne recevrez plus d'emails de notre part (${email}).</p></body></html>`;
    },
  );

  app.post(
    "/api/webhooks/email-events",
    {
      config: { rateLimit: { max: 120, timeWindow: "1 minute" } },
    },
    async (req, reply) => {
      if (!assertWebhookAuth(req, reply)) return;

      const body = z
        .object({
          type: z.enum(["reply", "bounce", "complaint", "open"]).or(z.string()),
          email: z.string().email().optional(),
          text: z.string().optional(),
          providerId: z.string().optional(),
          outboxMessageId: z.string().optional(),
        })
        .parse(req.body);

      if (body.type === "bounce" || body.type === "complaint") {
        if (body.email) {
          await addSuppression(prisma, {
            type: "email",
            value: body.email,
            reason: body.type,
          });
        }
        if (body.outboxMessageId) {
          await prisma.outboxMessage.updateMany({
            where: { id: body.outboxMessageId },
            data: { status: "failed", error: body.type },
          });
        }
        if (body.providerId) {
          await prisma.outboxMessage.updateMany({
            where: { providerId: body.providerId },
            data: { status: "failed", error: body.type },
          });
        }
        await writeAudit({ action: "webhook.email_event", meta: { type: body.type } });
        return { ok: true };
      }

      if (body.type === "reply" && body.text) {
        let outboxMessageId = body.outboxMessageId;
        if (!outboxMessageId && body.providerId) {
          const msg = await prisma.outboxMessage.findFirst({
            where: { providerId: body.providerId },
          });
          outboxMessageId = msg?.id;
        }
        let leadId: string | undefined;
        if (body.email) {
          const lead = await prisma.lead.findFirst({ where: { email: body.email.toLowerCase() } });
          leadId = lead?.id;
        }
        await ingestReply({
          rawText: body.text,
          leadId,
          outboxMessageId,
          source: "webhook",
        });
        return { ok: true };
      }

      // open events are best-effort MVP — audit only
      await writeAudit({
        action: "webhook.email_event",
        meta: { type: body.type, providerId: body.providerId },
      });
      return { ok: true, ignored: body.type === "open" ? false : true };
    },
  );

  app.get("/api/health", async () => ({ ok: true, service: "localpresence-outbound-os" }));
}
