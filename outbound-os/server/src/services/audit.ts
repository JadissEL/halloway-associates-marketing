import type { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";

export async function writeAudit(opts: {
  action: string;
  actorId?: string | null;
  actorEmail?: string | null;
  campaignId?: string | null;
  meta?: Prisma.InputJsonValue;
}) {
  return prisma.auditLog.create({
    data: {
      action: opts.action,
      actorId: opts.actorId ?? undefined,
      actorEmail: opts.actorEmail ?? undefined,
      campaignId: opts.campaignId ?? undefined,
      meta: opts.meta ?? undefined,
    },
  });
}
