import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { parse } from "csv-parse/sync";
import { prisma } from "../lib/prisma.js";
import { enqueueJob } from "../jobs/queue.js";
import { writeAudit } from "../services/audit.js";
import { personalizeMessage } from "../providers/ai.js";
import { getWorkspace } from "../services/scheduler.js";

const leadBody = z.object({
  businessName: z.string().min(1),
  niche: z.string().min(1),
  city: z.string().min(1),
  website: z.string().optional().nullable(),
  email: z.string().email().optional().nullable().or(z.literal("")),
  phone: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  googleMapsUrl: z.string().optional().nullable(),
  publicListingUrl: z.string().optional().nullable(),
  source: z.string().optional(),
  notes: z.string().optional().nullable(),
});

export async function leadRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  app.get("/api/leads", async (req) => {
    const q = z
      .object({
        niche: z.string().optional(),
        city: z.string().optional(),
        status: z.string().optional(),
        hasEmail: z.enum(["true", "false"]).optional(),
        search: z.string().optional(),
        take: z.coerce.number().max(200).default(50),
        skip: z.coerce.number().default(0),
      })
      .parse(req.query);

    const where: Record<string, unknown> = {};
    if (q.niche) where.niche = { contains: q.niche, mode: "insensitive" };
    if (q.city) where.city = { contains: q.city, mode: "insensitive" };
    if (q.status) where.status = q.status;
    if (q.hasEmail === "true") where.email = { not: null };
    if (q.hasEmail === "false") where.email = null;
    if (q.search) {
      where.OR = [
        { businessName: { contains: q.search, mode: "insensitive" } },
        { email: { contains: q.search, mode: "insensitive" } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: q.take,
        skip: q.skip,
      }),
      prisma.lead.count({ where }),
    ]);
    return { items, total };
  });

  app.post("/api/leads", async (req) => {
    const body = leadBody.parse(req.body);
    const lead = await prisma.lead.create({
      data: {
        ...body,
        email: body.email || null,
        source: body.source ?? "manual",
        collectedAt: new Date(),
        publicListingUrl: body.publicListingUrl ?? body.googleMapsUrl ?? null,
      },
    });
    await writeAudit({
      action: "lead.create",
      actorId: req.user.id,
      actorEmail: req.user.email,
      meta: { leadId: lead.id },
    });
    return { lead };
  });

  app.patch("/api/leads/:id", async (req) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);
    const body = leadBody.partial().parse(req.body);
    const lead = await prisma.lead.update({
      where: { id },
      data: {
        ...body,
        email: body.email === "" ? null : body.email,
      },
    });
    return { lead };
  });

  app.delete("/api/leads/:id", async (req) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);
    await prisma.lead.delete({ where: { id } });
    return { ok: true };
  });

  app.post("/api/leads/import-csv", async (req) => {
    const body = z
      .object({
        csv: z.string().min(1),
        mapping: z.record(z.string()),
      })
      .parse(req.body);

    const requiredMap = ["businessName", "niche", "city"] as const;
    const missingMap = requiredMap.filter((k) => !body.mapping[k]);
    if (missingMap.length) {
      return {
        created: 0,
        skipped: 0,
        errors: [
          {
            row: 0,
            message: `Mapping CSV incomplet — colonnes requises: ${missingMap.join(", ")}`,
          },
        ],
      };
    }

    const rows = parse(body.csv, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true,
    }) as Record<string, string>[];

    if (!rows.length) {
      return {
        created: 0,
        skipped: 0,
        errors: [{ row: 0, message: "Fichier CSV vide ou sans lignes de données" }],
      };
    }

    let created = 0;
    let skipped = 0;
    const errors: Array<{ row: number; message: string }> = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i]!;
      const rowNum = i + 2; // header = 1
      const get = (field: string) => {
        const col = body.mapping[field];
        return col ? row[col]?.trim() || null : null;
      };
      const businessName = get("businessName");
      const niche = get("niche");
      const city = get("city");
      if (!businessName || !niche || !city) {
        skipped += 1;
        errors.push({
          row: rowNum,
          message: `Ligne ${rowNum}: businessName, niche et city sont obligatoires`,
        });
        continue;
      }
      const email = get("email");
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        skipped += 1;
        errors.push({ row: rowNum, message: `Ligne ${rowNum}: email invalide (${email})` });
        continue;
      }
      await prisma.lead.create({
        data: {
          businessName,
          niche,
          city,
          website: get("website"),
          email,
          phone: get("phone"),
          instagram: get("instagram"),
          googleMapsUrl: get("googleMapsUrl"),
          publicListingUrl: get("publicListingUrl") ?? get("googleMapsUrl"),
          source: "csv_import",
          collectedAt: new Date(),
        },
      });
      created += 1;
    }

    await writeAudit({
      action: "leads.csv_import",
      actorId: req.user.id,
      actorEmail: req.user.email,
      meta: { created, skipped, errorCount: errors.length },
    });
    return { created, skipped, errors: errors.slice(0, 50) };
  });

  app.post("/api/leads/discover", async (req) => {
    const body = z
      .object({
        niche: z.string().min(1),
        city: z.string().min(1),
        count: z.number().int().min(1).max(50).default(20),
      })
      .parse(req.body);
    const result = await enqueueJob("discover-leads", body);
    return { ok: true, result };
  });

  app.post("/api/leads/enrich", async (req) => {
    const body = z.object({ leadIds: z.array(z.string()).min(1).max(100) }).parse(req.body);
    const result = await enqueueJob("enrich-leads", body);
    return { ok: true, result };
  });

  app.post("/api/leads/preview-message", async (req) => {
    const body = z
      .object({
        leadId: z.string(),
        subjectTemplate: z.string(),
        bodyTemplate: z.string(),
      })
      .parse(req.body);
    const lead = await prisma.lead.findUniqueOrThrow({ where: { id: body.leadId } });
    const settings = await getWorkspace();
    const personalized = await personalizeMessage({
      businessName: lead.businessName,
      niche: lead.niche,
      city: lead.city,
      website: lead.website,
      subjectTemplate: body.subjectTemplate,
      bodyTemplate: body.bodyTemplate,
      brand: settings.brand,
      founderName: settings.founderName,
    });
    return { personalized };
  });
}
