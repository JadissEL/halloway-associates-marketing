import type { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { env } from "../lib/env.js";
import { getEmailProvider } from "../providers/email.js";
import { brandDefaults } from "../lib/brandConfig.js";

export async function notifyOperator(opts: {
  type: string;
  title: string;
  body: string;
  meta?: Prisma.InputJsonValue;
}) {
  const notification = await prisma.notification.create({
    data: {
      type: opts.type,
      title: opts.title,
      body: opts.body,
      meta: opts.meta ?? undefined,
    },
  });

  const brand = brandDefaults();
  const canEmail =
    !env.DRY_RUN &&
    env.EMAIL_PROVIDER !== "dry-run" &&
    (Boolean(env.RESEND_API_KEY) || Boolean(env.SMTP_HOST));

  if (canEmail) {
    try {
      const provider = getEmailProvider();
      await provider.send({
        fromName: `${brand.founderName} · ${brand.brand}`,
        fromEmail: brand.contactEmail,
        to: env.OPERATOR_EMAIL,
        subject: `[OS] ${opts.title}`,
        text: opts.body,
        html: `<p>${opts.body.replace(/\n/g, "<br/>")}</p>`,
        idempotencyKey: `notify_${notification.id}`,
      });
    } catch (err) {
      console.warn("[notify] email failed — UI inbox still has the notification", err);
    }
  }

  return notification;
}
