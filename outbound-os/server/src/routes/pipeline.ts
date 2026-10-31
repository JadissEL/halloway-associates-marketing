import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { ingestReply } from "../services/replies.js";

const stages = [
  "new_reply",
  "hot",
  "audit_booked",
  "proposal_sent",
  "won",
  "lost",
] as const;

export async function pipelineRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  app.get("/api/pipeline", async () => {
    const items = await prisma.pipelineItem.findMany({
      include: { lead: true, reply: true },
      orderBy: { updatedAt: "desc" },
    });
    return { items, stages };
  });

  app.patch("/api/pipeline/:id", async (req) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);
    const body = z
      .object({
        stage: z.enum(stages).optional(),
        notes: z.string().optional().nullable(),
        nextActionAt: z.string().datetime().optional().nullable(),
      })
      .parse(req.body);
    const item = await prisma.pipelineItem.update({
      where: { id },
      data: {
        stage: body.stage,
        notes: body.notes,
        nextActionAt: body.nextActionAt === null ? null : body.nextActionAt ? new Date(body.nextActionAt) : undefined,
      },
      include: { lead: true },
    });
    return { item };
  });

  app.post("/api/replies/manual", async (req) => {
    const body = z
      .object({
        rawText: z.string().min(1),
        leadId: z.string().optional(),
        campaignLeadId: z.string().optional(),
        outboxMessageId: z.string().optional(),
      })
      .parse(req.body);
    const result = await ingestReply({ ...body, source: "manual" });
    return result;
  });
}
