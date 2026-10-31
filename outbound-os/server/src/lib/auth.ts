import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "./prisma.js";

export type AuthUser = { id: string; email: string; name: string };

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { sub: string; email: string };
    user: AuthUser;
  }
}

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const payload = await request.jwtVerify<{ sub: string; email: string }>();
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      return reply.code(401).send({ error: "unauthorized" });
    }
    request.user = { id: user.id, email: user.email, name: user.name };
  } catch {
    return reply.code(401).send({ error: "unauthorized" });
  }
}

export function registerAuth(app: FastifyInstance) {
  app.decorate("authenticate", authenticate);
}

declare module "fastify" {
  interface FastifyInstance {
    authenticate: typeof authenticate;
  }
  interface FastifyRequest {
    user: AuthUser;
  }
}
