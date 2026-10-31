import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma.js";

function startOfDay() {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

export async function statsRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  app.get("/api/stats/dashboard", async () => {
    const today = startOfDay();
    const [sentToday, repliesToday, hotLeads, campaigns, audit, notifications] = await Promise.all([
      prisma.outboxMessage.count({
        where: {
          status: { in: ["sent", "dry_run_sent"] },
          sentAt: { gte: today },
        },
      }),
      prisma.reply.count({ where: { createdAt: { gte: today } } }),
      prisma.pipelineItem.count({ where: { stage: "hot" } }),
      prisma.campaign.findMany({
        include: {
          _count: { select: { leads: true } },
        },
        orderBy: { updatedAt: "desc" },
        take: 20,
      }),
      prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
      prisma.notification.findMany({ orderBy: { createdAt: "desc" }, take: 15 }),
    ]);

    const campaignStats = await Promise.all(
      campaigns.map(async (c) => {
        const byStatus = await prisma.campaignLead.groupBy({
          by: ["status"],
          where: { campaignId: c.id },
          _count: true,
        });
        return {
          id: c.id,
          name: c.name,
          status: c.status,
          niche: c.niche,
          city: c.city,
          leads: c._count.leads,
          stats: Object.fromEntries(byStatus.map((s) => [s.status, s._count])),
        };
      }),
    );

    return {
      today: { sent: sentToday, replies: repliesToday, hotLeads },
      campaigns: campaignStats,
      audit,
      notifications,
    };
  });

  app.post("/api/notifications/:id/read", async (req) => {
    const id = (req.params as { id: string }).id;
    await prisma.notification.update({ where: { id }, data: { read: true } });
    return { ok: true };
  });
}
