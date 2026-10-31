import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { enqueueFirstStepForCampaign } from "../services/scheduler.js";
import { writeAudit } from "../services/audit.js";
import { enqueueJob } from "../jobs/queue.js";

const CAMPAIGN_TRANSITIONS: Record<string, string[]> = {
  draft: ["running", "paused"],
  running: ["paused", "completed"],
  paused: ["running", "completed"],
  completed: [],
};

export async function campaignRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  app.get("/api/campaigns", async () => {
    const items = await prisma.campaign.findMany({
      include: {
        mailbox: true,
        sequence: true,
        _count: { select: { leads: true, outbox: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return { items };
  });

  app.get("/api/campaigns/:id", async (req) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);
    const campaign = await prisma.campaign.findUniqueOrThrow({
      where: { id },
      include: {
        mailbox: true,
        sequence: { include: { steps: { orderBy: { order: "asc" } } } },
        leads: { include: { lead: true }, take: 100 },
      },
    });
    const stats = await prisma.campaignLead.groupBy({
      by: ["status"],
      where: { campaignId: id },
      _count: true,
    });
    const interested = await prisma.pipelineItem.count({
      where: {
        stage: "hot",
        lead: { campaignLeads: { some: { campaignId: id } } },
      },
    });
    return {
      campaign,
      stats: Object.fromEntries(stats.map((s) => [s.status, s._count])),
      interested,
    };
  });

  app.post("/api/campaigns", async (req) => {
    const body = z
      .object({
        name: z.string().min(1),
        niche: z.string().min(1),
        city: z.string().min(1),
        mailboxId: z.string(),
        sequenceId: z.string(),
        dailyLimit: z.number().int().min(1).max(500).default(20),
        startAt: z.string().datetime().optional(),
        leadIds: z.array(z.string()).optional(),
      })
      .parse(req.body);

    const campaign = await prisma.campaign.create({
      data: {
        name: body.name,
        niche: body.niche,
        city: body.city,
        mailboxId: body.mailboxId,
        sequenceId: body.sequenceId,
        dailyLimit: body.dailyLimit,
        startAt: body.startAt ? new Date(body.startAt) : new Date(),
        status: "draft",
        leads: body.leadIds?.length
          ? {
              create: body.leadIds.map((leadId) => ({ leadId })),
            }
          : undefined,
      },
      include: { leads: true },
    });

    await writeAudit({
      action: "campaign.create",
      actorId: req.user.id,
      actorEmail: req.user.email,
      campaignId: campaign.id,
    });
    return { campaign };
  });

  app.post("/api/campaigns/:id/leads", async (req) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);
    const body = z.object({ leadIds: z.array(z.string()).min(1) }).parse(req.body);
    const campaign = await prisma.campaign.findUniqueOrThrow({ where: { id } });
    if (!["draft", "paused", "running"].includes(campaign.status)) {
      return { error: "invalid_status" };
    }
    let added = 0;
    for (const leadId of body.leadIds) {
      try {
        await prisma.campaignLead.create({ data: { campaignId: id, leadId } });
        added += 1;
      } catch {
        /* duplicate */
      }
    }
    return { added };
  });

  app.post("/api/campaigns/:id/start", async (req, reply) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);
    const campaign = await prisma.campaign.findUniqueOrThrow({ where: { id } });
    if (!CAMPAIGN_TRANSITIONS[campaign.status]?.includes("running")) {
      return reply.code(400).send({ error: `Cannot start from ${campaign.status}` });
    }
    await prisma.campaign.update({ where: { id }, data: { status: "running" } });
    const enqueue = await enqueueFirstStepForCampaign(id);
    await enqueueJob("process-outbox", {});
    await writeAudit({
      action: "campaign.start",
      actorId: req.user.id,
      actorEmail: req.user.email,
      campaignId: id,
      meta: enqueue,
    });
    return { ok: true, enqueue };
  });

  app.post("/api/campaigns/:id/pause", async (req, reply) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);
    const campaign = await prisma.campaign.findUniqueOrThrow({ where: { id } });
    if (!CAMPAIGN_TRANSITIONS[campaign.status]?.includes("paused")) {
      return reply.code(400).send({ error: `Cannot pause from ${campaign.status}` });
    }
    await prisma.campaign.update({ where: { id }, data: { status: "paused" } });
    await writeAudit({
      action: "campaign.pause",
      actorId: req.user.id,
      actorEmail: req.user.email,
      campaignId: id,
    });
    return { ok: true };
  });

  app.post("/api/campaigns/:id/resume", async (req, reply) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);
    const campaign = await prisma.campaign.findUniqueOrThrow({ where: { id } });
    if (campaign.status !== "paused") {
      return reply.code(400).send({ error: "Only paused campaigns can resume" });
    }
    await prisma.campaign.update({ where: { id }, data: { status: "running" } });
    await enqueueJob("process-outbox", {});
    await writeAudit({
      action: "campaign.resume",
      actorId: req.user.id,
      actorEmail: req.user.email,
      campaignId: id,
    });
    return { ok: true };
  });

  app.get("/api/outbox", async (req) => {
    const q = z
      .object({
        campaignId: z.string().optional(),
        status: z.string().optional(),
        take: z.coerce.number().default(50),
      })
      .parse(req.query);
    const items = await prisma.outboxMessage.findMany({
      where: {
        campaignId: q.campaignId,
        status: q.status as never,
      },
      include: { campaignLead: { include: { lead: true } } },
      orderBy: { scheduledAt: "desc" },
      take: q.take,
    });
    return { items };
  });

  app.post("/api/outbox/process", async () => {
    const result = await enqueueJob("process-outbox", {});
    return { ok: true, result };
  });
}
