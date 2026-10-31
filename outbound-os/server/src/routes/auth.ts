import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { verifyPassword } from "../lib/password.js";
import { env } from "../lib/env.js";
import { writeAudit } from "../services/audit.js";

export async function authRoutes(app: FastifyInstance) {
  app.post(
    "/api/auth/login",
    {
      config: { rateLimit: { max: 20, timeWindow: "1 minute" } },
    },
    async (req, reply) => {
      const body = z
        .object({
          email: z.string().email(),
          password: z.string().min(1),
        })
        .parse(req.body);

      const user = await prisma.user.findUnique({ where: { email: body.email.toLowerCase() } });
      if (!user || !verifyPassword(body.password, user.passwordHash)) {
        return reply.code(401).send({ error: "Identifiants invalides" });
      }

      const token = await reply.jwtSign(
        { sub: user.id, email: user.email },
        { expiresIn: `${env.SESSION_TTL_HOURS}h` },
      );

      await writeAudit({
        action: "auth.login",
        actorId: user.id,
        actorEmail: user.email,
      });

      return {
        token,
        user: { id: user.id, email: user.email, name: user.name },
      };
    },
  );

  app.get("/api/auth/me", { preHandler: [app.authenticate] }, async (req) => {
    return { user: req.user };
  });
}
