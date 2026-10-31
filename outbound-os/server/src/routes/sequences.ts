import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

export async function sequenceRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  app.get("/api/sequences", async () => {
    const items = await prisma.sequence.findMany({
      include: { steps: { orderBy: { order: "asc" } } },
      orderBy: { niche: "asc" },
    });
    return { items };
  });

  app.get("/api/sequences/:id", async (req) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);
    const sequence = await prisma.sequence.findUniqueOrThrow({
      where: { id },
      include: { steps: { orderBy: { order: "asc" } } },
    });
    return { sequence };
  });

  app.patch("/api/sequences/:id/steps/:stepId", async (req) => {
    const params = z.object({ id: z.string(), stepId: z.string() }).parse(req.params);
    const body = z
      .object({
        subjectTemplate: z.string().optional(),
        bodyTemplate: z.string().optional(),
        subjectB: z.string().optional().nullable(),
        delayDays: z.number().int().min(0).optional(),
      })
      .parse(req.body);
    const step = await prisma.sequenceStep.update({
      where: { id: params.stepId },
      data: body,
    });
    return { step };
  });
}
