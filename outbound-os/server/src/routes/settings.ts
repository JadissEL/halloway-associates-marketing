import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { integrationStatus, env } from "../lib/env.js";
import { getWorkspace } from "../services/scheduler.js";

export async function settingsRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  app.get("/api/settings", async () => {
    const workspace = await getWorkspace();
    const mailboxes = await prisma.mailbox.findMany({ orderBy: { createdAt: "asc" } });
    const integrations = integrationStatus();
    return {
      workspace,
      mailboxes,
      integrations: {
        openai: integrations.openai ? "configured" : "missing",
        resend: integrations.resend ? "configured" : "missing",
        smtp: integrations.smtp ? "configured" : "missing",
        googlePlaces: integrations.googlePlaces ? "configured" : "missing",
        dryRun: integrations.dryRun,
      },
      placeholders: {
        BRAND: env.BRAND,
        FOUNDER_NAME: env.FOUNDER_NAME,
        EMAIL: env.CONTACT_EMAIL,
        PHONE: env.CONTACT_PHONE,
        CITY: env.CITY,
        SITE_URL: env.SITE_URL,
      },
    };
  });

  app.patch("/api/settings", async (req) => {
    const body = z
      .object({
        brand: z.string().optional(),
        founderName: z.string().optional(),
        contactEmail: z.string().optional(),
        contactPhone: z.string().optional(),
        defaultCity: z.string().optional(),
        dryRun: z.boolean().optional(),
        warmUpMode: z.boolean().optional(),
        maxEmailsPerDay: z.number().int().min(1).max(1000).optional(),
        requireWebsite: z.boolean().optional(),
        excludeFreeEmailDomains: z.boolean().optional(),
      })
      .parse(req.body);
    const workspace = await getWorkspace();
    const updated = await prisma.workspaceSettings.update({
      where: { id: workspace.id },
      data: body,
    });
    return { workspace: updated };
  });

  app.post("/api/mailboxes", async (req) => {
    const body = z
      .object({
        fromName: z.string().min(1),
        fromEmail: z.string().email(),
        provider: z.enum(["dry_run", "resend", "smtp"]).default("dry_run"),
        dailyCap: z.number().int().min(1).max(500).default(40),
        warmUp: z.boolean().default(true),
      })
      .parse(req.body);
    const mailbox = await prisma.mailbox.create({ data: body });
    return { mailbox };
  });

  app.patch("/api/mailboxes/:id", async (req) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);
    const body = z
      .object({
        fromName: z.string().optional(),
        dailyCap: z.number().int().optional(),
        warmUp: z.boolean().optional(),
        active: z.boolean().optional(),
        provider: z.enum(["dry_run", "resend", "smtp"]).optional(),
      })
      .parse(req.body);
    const mailbox = await prisma.mailbox.update({ where: { id }, data: body });
    return { mailbox };
  });
}
