import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export type BrandConfig = {
  COMPANY_NAME: string;
  SITE_URL: string;
  CONTACT_EMAIL: string;
  FOUNDER_NAME: string;
  CITY: string;
  CITY_FR?: string;
  HQ_COUNTRY?: string;
  TARGET_MARKETS?: string[];
  PHONE?: string;
  INSTAGRAM?: string;
  PACKAGE_NAME_FR?: string;
  PACKAGE_NAME?: string;
  TAGLINE?: string;
  PROMISE_DAYS?: string;
  CURRENCY?: string;
  PRICING?: {
    starterMin: number;
    starterMax: number;
    bookingAddOn: number;
    careMin: number;
    careMax: number;
  };
};

const candidates = [
  resolve(dirname(fileURLToPath(import.meta.url)), "../../../../config/brand.json"),
  resolve(process.cwd(), "../config/brand.json"),
  resolve(process.cwd(), "../../config/brand.json"),
];

let cached: BrandConfig | null = null;

export function loadBrandConfig(): BrandConfig {
  if (cached) return cached;
  for (const path of candidates) {
    try {
      cached = JSON.parse(readFileSync(path, "utf8")) as BrandConfig;
      return cached;
    } catch {
      /* try next */
    }
  }
  cached = {
    COMPANY_NAME: "Halloway Associates",
    SITE_URL: "https://hallowayassociates.com",
    CONTACT_EMAIL: "jadisselantaki@hallowayassociates.com",
    FOUNDER_NAME: "Jadiss Elantaki",
    CITY: "Greece",
    CITY_FR: "Grèce",
  };
  return cached;
}

/** Env overrides win; brand.json fills gaps */
export function brandDefaults() {
  const b = loadBrandConfig();
  return {
    brand: process.env.BRAND || b.COMPANY_NAME,
    founderName: process.env.FOUNDER_NAME || b.FOUNDER_NAME,
    city: process.env.CITY || b.CITY_FR || b.CITY,
    hqCountry: b.HQ_COUNTRY || b.CITY || "Greece",
    targetMarkets: Array.isArray(b.TARGET_MARKETS) ? b.TARGET_MARKETS : [],
    contactEmail: process.env.CONTACT_EMAIL || b.CONTACT_EMAIL,
    contactPhone: process.env.CONTACT_PHONE || process.env.PHONE || b.PHONE || "",
    siteUrl: process.env.SITE_URL || b.SITE_URL,
    packageName: b.PACKAGE_NAME_FR || b.PACKAGE_NAME || "Kit présence digitale",
    promiseDays: b.PROMISE_DAYS || "7–14 jours",
    pricing: b.PRICING,
  };
}
