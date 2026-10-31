import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { addSuppression } from "../services/suppression.js";
import { writeAudit } from "../services/audit.js";

export async function suppressionRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  app.get("/api/suppressions", async () => {
    const items = await prisma.suppression.findMany({ orderBy: { createdAt: "desc" } });
    return { items };
  });

  app.post("/api/suppressions", async (req) => {
    const body = z
      .object({
        type: z.enum(["email", "domain", "phone"]),
        value: z.string().min(1),
        reason: z.string().optional(),
      })
      .parse(req.body);
    const item = await addSuppression(prisma, body);
    await writeAudit({
      action: "suppression.add",
      actorId: req.user.id,
      actorEmail: req.user.email,
      meta: { type: body.type, value: body.value },
    });
    return { item };
  });

  app.delete("/api/suppressions/:id", async (req) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);
    await prisma.suppression.delete({ where: { id } });
    return { ok: true };
  });
}
