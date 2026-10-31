import { config } from "dotenv";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { brandDefaults } from "./brandConfig.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
config({ path: resolve(root, ".env") });
config({ path: resolve(root, "server", ".env") });
config({ path: resolve(root, "..", ".env") });

const brand = brandDefaults();

const schema = z.object({
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  SYNC_JOBS: z
    .string()
    .optional()
    .transform((v) => v === "true"),
  OPERATOR_EMAIL: z.string().email().default(brand.contactEmail),
  OPERATOR_PASSWORD: z.string().min(6).default("change-me-now"),
  JWT_SECRET: z.string().min(16).default("dev-only-change-me-secret"),
  SESSION_TTL_HOURS: z.coerce.number().default(168),
  PORT: z.coerce.number().default(3001),
  HOST: z.string().default("0.0.0.0"),
  CORS_ORIGIN: z
    .string()
    .default(
      `http://localhost:5174,http://localhost:5173,${brand.siteUrl}`,
    ),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DRY_RUN: z
    .string()
    .optional()
    .transform((v) => v !== "false"),
  LOG_EMAIL_BODIES: z
    .string()
    .optional()
    .transform((v) => v === "true"),
  BRAND: z.string().default(brand.brand),
  FOUNDER_NAME: z.string().default(brand.founderName),
  CITY: z.string().default(brand.city),
  CONTACT_EMAIL: z.string().default(brand.contactEmail),
  CONTACT_PHONE: z.string().default(brand.contactPhone || ""),
  SITE_URL: z.string().default(brand.siteUrl),
  UNSUBSCRIBE_BASE_URL: z.string().default("http://localhost:3001/api/public/unsubscribe"),
  EMAIL_PROVIDER: z.enum(["dry-run", "resend", "smtp"]).default("dry-run"),
  RESEND_API_KEY: z.string().optional().default(""),
  SMTP_HOST: z.string().optional().default(""),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().optional().default(""),
  SMTP_PASS: z.string().optional().default(""),
  SMTP_SECURE: z
    .string()
    .optional()
    .transform((v) => v === "true"),
  OPENAI_API_KEY: z.string().optional().default(""),
  OPENAI_BASE_URL: z.string().default("https://api.openai.com/v1"),
  OPENAI_MODEL: z.string().default("gpt-4o-mini"),
  GOOGLE_PLACES_API_KEY: z.string().optional().default(""),
  DEFAULT_DAILY_CAP: z.coerce.number().default(40),
  WARM_UP_DAILY_CAP: z.coerce.number().default(10),
  REQUIRE_WEBSITE: z
    .string()
    .optional()
    .transform((v) => v === "true"),
  EXCLUDE_FREE_EMAIL_DOMAINS: z
    .string()
    .optional()
    .transform((v) => v === "true"),
  WEBHOOK_SECRET: z.string().optional().default(""),
});

export const env = schema.parse(process.env);

if (env.NODE_ENV === "production") {
  if (env.JWT_SECRET === "dev-only-change-me-secret" || env.JWT_SECRET.length < 24) {
    throw new Error("JWT_SECRET must be a strong unique value in production");
  }
  if (env.OPERATOR_PASSWORD === "change-me-now") {
    throw new Error("OPERATOR_PASSWORD must be changed in production");
  }
}

export function integrationStatus() {
  return {
    openai: Boolean(env.OPENAI_API_KEY),
    resend: Boolean(env.RESEND_API_KEY),
    smtp: Boolean(env.SMTP_HOST && env.SMTP_USER),
    googlePlaces: Boolean(env.GOOGLE_PLACES_API_KEY),
    dryRun: env.DRY_RUN || env.EMAIL_PROVIDER === "dry-run",
  };
}
