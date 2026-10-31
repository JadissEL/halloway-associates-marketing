import { Queue, Worker, type JobsOptions } from "bullmq";
import { Redis } from "ioredis";
import { env } from "../lib/env.js";
import { mockDiscoverLeads, mockEnrichLead } from "../providers/leads.js";
import { prisma } from "../lib/prisma.js";
import { processDueOutbox } from "../services/outboxProcessor.js";
import { writeAudit } from "../services/audit.js";

export type JobName = "discover-leads" | "enrich-leads" | "process-outbox";

let connection: Redis | null = null;
let queue: Queue | null = null;
let redisOk = false;

export function useSyncJobs(): boolean {
  return env.SYNC_JOBS || !redisOk;
}

export async function initQueue(): Promise<void> {
  if (env.SYNC_JOBS) {
    console.info("[jobs] SYNC_JOBS=true — using in-process fallback");
    return;
  }
  try {
    connection = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: null,
      enableReadyCheck: true,
      lazyConnect: true,
    });
    await connection.connect();
    await connection.ping();
    queue = new Queue("outbound", { connection });
    redisOk = true;
    console.info("[jobs] BullMQ connected");
  } catch (err) {
    redisOk = false;
    console.warn("[jobs] Redis unavailable — falling back to sync mode", err);
  }
}

async function runDiscover(data: { niche: string; city: string; count?: number }) {
  const leads = mockDiscoverLeads(data.niche, data.city, data.count ?? 20);
  let created = 0;
  for (const lead of leads) {
    await prisma.lead.create({
      data: {
        businessName: lead.businessName,
        niche: lead.niche,
        city: lead.city,
        website: lead.website,
        email: lead.email,
        phone: lead.phone,
        instagram: lead.instagram,
        googleMapsUrl: lead.googleMapsUrl,
        publicListingUrl: lead.publicListingUrl,
        source: lead.source,
        collectedAt: new Date(),
        status: lead.email ? "enriched" : "new",
      },
    });
    created += 1;
  }
  await writeAudit({ action: "leads.discover", meta: { created, niche: data.niche, city: data.city } });
  return { created };
}

async function runEnrich(data: { leadIds: string[] }) {
  let updated = 0;
  for (const id of data.leadIds) {
    const lead = await prisma.lead.findUnique({ where: { id } });
    if (!lead) continue;
    const enriched = mockEnrichLead(lead);
    await prisma.lead.update({
      where: { id },
      data: {
        website: enriched.website,
        email: enriched.email,
        phone: enriched.phone,
        instagram: enriched.instagram,
        enrichmentJson: enriched.enrichmentJson,
        status: "enriched",
      },
    });
    updated += 1;
  }
  await writeAudit({ action: "leads.enrich", meta: { updated } });
  return { updated };
}

export async function enqueueJob(name: JobName, data: Record<string, unknown>, opts?: JobsOptions) {
  if (useSyncJobs() || !queue) {
    if (name === "discover-leads") return runDiscover(data as { niche: string; city: string; count?: number });
    if (name === "enrich-leads") return runEnrich(data as { leadIds: string[] });
    if (name === "process-outbox") return processDueOutbox();
    return null;
  }
  await queue.add(name, data, {
    removeOnComplete: 100,
    removeOnFail: 50,
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    ...opts,
  });
  return { queued: true };
}

export function startWorker() {
  if (useSyncJobs() || !connection) {
    console.info("[worker] sync mode — polling outbox every 10s");
    const timer = setInterval(() => {
      processDueOutbox().catch((err) => console.error("[worker] outbox error", err));
    }, 10_000);
    processDueOutbox().catch((err) => console.error("[worker] outbox error", err));
    return () => clearInterval(timer);
  }

  const worker = new Worker(
    "outbound",
    async (job) => {
      if (job.name === "discover-leads") return runDiscover(job.data);
      if (job.name === "enrich-leads") return runEnrich(job.data);
      if (job.name === "process-outbox") return processDueOutbox();
      return null;
    },
    { connection },
  );

  worker.on("failed", (job, err) => {
    console.error(`[worker] job ${job?.name} failed`, err.message);
  });

  // periodic outbox drain
  const timer = setInterval(() => {
    enqueueJob("process-outbox", {}).catch(() => undefined);
  }, 10_000);

  return () => {
    clearInterval(timer);
    void worker.close();
  };
}
