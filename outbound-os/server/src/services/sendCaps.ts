import type { PrismaClient } from "@prisma/client";

function startOfUtcDay(d = new Date()): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function startOfUtcHour(d = new Date()): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours()));
}

const SENT_STATUSES = ["sent", "dry_run_sent"] as const;

export async function countMailboxSentToday(prisma: PrismaClient, mailboxId: string, now = new Date()) {
  return prisma.outboxMessage.count({
    where: {
      mailboxId,
      status: { in: [...SENT_STATUSES] },
      sentAt: { gte: startOfUtcDay(now) },
    },
  });
}

export async function countMailboxSentThisHour(prisma: PrismaClient, mailboxId: string, now = new Date()) {
  return prisma.outboxMessage.count({
    where: {
      mailboxId,
      status: { in: [...SENT_STATUSES] },
      sentAt: { gte: startOfUtcHour(now) },
    },
  });
}

export async function countCampaignSentToday(prisma: PrismaClient, campaignId: string, now = new Date()) {
  return prisma.outboxMessage.count({
    where: {
      campaignId,
      status: { in: [...SENT_STATUSES] },
      sentAt: { gte: startOfUtcDay(now) },
    },
  });
}

export function effectiveMailboxDailyCap(opts: {
  mailboxDailyCap: number;
  warmUp: boolean;
  workspaceMax: number;
  warmUpCap: number;
}): number {
  const base = Math.min(opts.mailboxDailyCap, opts.workspaceMax);
  return opts.warmUp ? Math.min(base, opts.warmUpCap) : base;
}

export function hourlyCapFromDaily(dailyCap: number): number {
  return Math.max(1, Math.ceil(dailyCap / 8));
}

export async function canSendNow(
  prisma: PrismaClient,
  opts: {
    mailboxId: string;
    campaignId: string;
    mailboxDailyCap: number;
    campaignDailyLimit: number;
    warmUp: boolean;
    workspaceMax: number;
    warmUpCap: number;
    /** When true, skip hourly pacing (daily caps still apply) — used for dry-run demos */
    skipHourly?: boolean;
    now?: Date;
  },
): Promise<{ ok: boolean; reason?: string }> {
  const now = opts.now ?? new Date();
  const dailyCap = effectiveMailboxDailyCap({
    mailboxDailyCap: opts.mailboxDailyCap,
    warmUp: opts.warmUp,
    workspaceMax: opts.workspaceMax,
    warmUpCap: opts.warmUpCap,
  });
  const hourlyCap = hourlyCapFromDaily(dailyCap);

  const [mailboxDay, mailboxHour, campaignDay] = await Promise.all([
    countMailboxSentToday(prisma, opts.mailboxId, now),
    opts.skipHourly ? Promise.resolve(0) : countMailboxSentThisHour(prisma, opts.mailboxId, now),
    countCampaignSentToday(prisma, opts.campaignId, now),
  ]);

  if (mailboxDay >= dailyCap) {
    return { ok: false, reason: `mailbox_daily_cap:${dailyCap}` };
  }
  if (!opts.skipHourly && mailboxHour >= hourlyCap) {
    return { ok: false, reason: `mailbox_hourly_cap:${hourlyCap}` };
  }
  if (campaignDay >= opts.campaignDailyLimit) {
    return { ok: false, reason: `campaign_daily_limit:${opts.campaignDailyLimit}` };
  }
  return { ok: true };
}

