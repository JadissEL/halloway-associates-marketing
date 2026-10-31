import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import rateLimit from "@fastify/rate-limit";
import { ZodError } from "zod";
import { env, integrationStatus } from "./lib/env.js";
import { registerAuth } from "./lib/auth.js";
import { initQueue } from "./jobs/queue.js";
import { authRoutes } from "./routes/auth.js";
import { leadRoutes } from "./routes/leads.js";
import { campaignRoutes } from "./routes/campaigns.js";
import { sequenceRoutes } from "./routes/sequences.js";
import { pipelineRoutes } from "./routes/pipeline.js";
import { suppressionRoutes } from "./routes/suppressions.js";
import { settingsRoutes } from "./routes/settings.js";
import { statsRoutes } from "./routes/stats.js";
import { publicRoutes } from "./routes/public.js";
import { getWorkspace } from "./services/scheduler.js";
import { prisma } from "./lib/prisma.js";

async function main() {
  const app = Fastify({
    logger: {
      level: env.NODE_ENV === "production" ? "info" : "info",
      redact: ["req.headers.authorization", "body.password", "body.csv"],
    },
  });

  const corsOrigins = env.CORS_ORIGIN.split(",").map((s) => s.trim()).filter(Boolean);
  await app.register(cors, {
    origin: corsOrigins.length <= 1 ? corsOrigins[0] ?? true : corsOrigins,
    credentials: true,
  });
  await app.register(jwt, { secret: env.JWT_SECRET });
  await app.register(rateLimit, { global: false });
  registerAuth(app);

  // Accept empty POST bodies (start/pause/process) without Content-Type
  app.addContentTypeParser("*", { parseAs: "buffer" }, (req, body, done) => {
    const buf = body as Buffer;
    if (!buf || buf.length === 0) {
      done(null, {});
      return;
    }
    const text = buf.toString("utf8");
    try {
      done(null, JSON.parse(text));
    } catch (err) {
      done(err as Error, undefined);
    }
  });

  app.setErrorHandler((err, _req, reply) => {
    if (err instanceof ZodError) {
      return reply.code(400).send({ error: "validation_error", issues: err.issues });
    }
    const statusCode = typeof (err as { statusCode?: number }).statusCode === "number"
      ? (err as { statusCode: number }).statusCode
      : 500;
    if (statusCode >= 500) app.log.error(err);
    const message = err instanceof Error ? err.message : "request_error";
    return reply.code(statusCode).send({
      error: statusCode === 415 ? "unsupported_media_type" : "request_error",
      message,
    });
  });


  await app.register(authRoutes);
  await app.register(leadRoutes);
  await app.register(campaignRoutes);
  await app.register(sequenceRoutes);
  await app.register(pipelineRoutes);
  await app.register(suppressionRoutes);
  await app.register(settingsRoutes);
  await app.register(statsRoutes);
  await app.register(publicRoutes);

  await initQueue();

  // sync integration flags into workspace (no secrets stored)
  const status = integrationStatus();
  const workspace = await getWorkspace();
  await prisma.workspaceSettings.update({
    where: { id: workspace.id },
    data: {
      openaiConfigured: status.openai,
      resendConfigured: status.resend,
      smtpConfigured: status.smtp,
      googlePlacesConfigured: status.googlePlaces,
      dryRun: status.dryRun,
    },
  });

  await app.listen({ port: env.PORT, host: env.HOST });
  console.info(
    `API listening on http://${env.HOST}:${env.PORT} (dryRun=${status.dryRun}, openai=${status.openai})`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
