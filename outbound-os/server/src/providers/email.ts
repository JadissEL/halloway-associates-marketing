import nodemailer from "nodemailer";
import { env } from "../lib/env.js";

export type SendEmailInput = {
  fromName: string;
  fromEmail: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  idempotencyKey: string;
};

export type SendEmailResult = {
  providerId: string;
  dryRun: boolean;
};

export interface EmailProvider {
  name: string;
  send(input: SendEmailInput): Promise<SendEmailResult>;
}

export class DryRunEmailProvider implements EmailProvider {
  name = "dry-run";
  async send(input: SendEmailInput): Promise<SendEmailResult> {
    if (env.LOG_EMAIL_BODIES && env.NODE_ENV !== "production") {
      console.info(`[dry-run] to=${input.to} subject=${input.subject}`);
    } else {
      console.info(`[dry-run] queued send to=${input.to} key=${input.idempotencyKey}`);
    }
    return { providerId: `dry_${input.idempotencyKey.slice(0, 16)}`, dryRun: true };
  }
}

export class ResendEmailProvider implements EmailProvider {
  name = "resend";
  constructor(private apiKey: string) {}
  async send(input: SendEmailInput): Promise<SendEmailResult> {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": input.idempotencyKey,
      },
      body: JSON.stringify({
        from: `${input.fromName} <${input.fromEmail}>`,
        to: [input.to],
        subject: input.subject,
        html: input.html,
        text: input.text,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Resend error ${res.status}: ${body.slice(0, 200)}`);
    }
    const data = (await res.json()) as { id?: string };
    return { providerId: data.id ?? `resend_${Date.now()}`, dryRun: false };
  }
}

export class SmtpEmailProvider implements EmailProvider {
  name = "smtp";
  private transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
  });

  async send(input: SendEmailInput): Promise<SendEmailResult> {
    const info = await this.transporter.sendMail({
      from: `"${input.fromName}" <${input.fromEmail}>`,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      headers: { "X-Idempotency-Key": input.idempotencyKey },
    });
    return { providerId: String(info.messageId ?? `smtp_${Date.now()}`), dryRun: false };
  }
}

export function getEmailProvider(preferred?: string): EmailProvider {
  const mode = preferred ?? env.EMAIL_PROVIDER;
  if (env.DRY_RUN || mode === "dry-run") return new DryRunEmailProvider();
  if (mode === "resend") {
    if (!env.RESEND_API_KEY) return new DryRunEmailProvider();
    return new ResendEmailProvider(env.RESEND_API_KEY);
  }
  if (mode === "smtp") {
    if (!env.SMTP_HOST) return new DryRunEmailProvider();
    return new SmtpEmailProvider();
  }
  return new DryRunEmailProvider();
}
