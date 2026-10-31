import type { PrismaClient } from "@prisma/client";

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "mail.com",
  "gmx.com",
  "yandex.com",
]);

export function emailDomain(email: string): string | null {
  const parts = email.trim().toLowerCase().split("@");
  return parts.length === 2 ? parts[1]! : null;
}

export function isFreeEmailDomain(email: string): boolean {
  const domain = emailDomain(email);
  return domain ? FREE_EMAIL_DOMAINS.has(domain) : false;
}

export async function isSuppressed(
  prisma: PrismaClient,
  opts: { email?: string | null; phone?: string | null },
): Promise<{ suppressed: boolean; reason?: string }> {
  const checks: Array<{ type: "email" | "domain" | "phone"; value: string }> = [];
  if (opts.email) {
    const email = opts.email.trim().toLowerCase();
    checks.push({ type: "email", value: email });
    const domain = emailDomain(email);
    if (domain) checks.push({ type: "domain", value: domain });
  }
  if (opts.phone) {
    checks.push({ type: "phone", value: opts.phone.replace(/\s+/g, "") });
  }
  if (!checks.length) return { suppressed: false };

  for (const check of checks) {
    const hit = await prisma.suppression.findUnique({
      where: { type_value: { type: check.type, value: check.value } },
    });
    if (hit) {
      return { suppressed: true, reason: hit.reason ?? `${hit.type}:${hit.value}` };
    }
  }
  return { suppressed: false };
}

export async function addSuppression(
  prisma: PrismaClient,
  input: { type: "email" | "domain" | "phone"; value: string; reason?: string },
) {
  const value =
    input.type === "phone" ? input.value.replace(/\s+/g, "") : input.value.trim().toLowerCase();
  return prisma.suppression.upsert({
    where: { type_value: { type: input.type, value } },
    create: { type: input.type, value, reason: input.reason },
    update: { reason: input.reason },
  });
}
