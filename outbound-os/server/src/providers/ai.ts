import { env } from "../lib/env.js";
import type { ReplyClassification } from "@prisma/client";

export type PersonalizeInput = {
  businessName: string;
  niche: string;
  city: string;
  website?: string | null;
  subjectTemplate: string;
  bodyTemplate: string;
  brand: string;
  founderName: string;
};

export type PersonalizeResult = {
  subject: string;
  body: string;
  provider: "openai" | "mock";
};

export type ClassifyResult = {
  classification: ReplyClassification;
  confidence: number;
  suggestedReply: string;
  provider: "openai" | "mock";
};

function mockPersonalize(input: PersonalizeInput): PersonalizeResult {
  const websiteNote = input.website
    ? `J'ai regardé ${input.website} —`
    : `Je n'ai pas trouvé de site clair pour ${input.businessName} —`;
  const body = input.bodyTemplate
    .replace(/\{\{BUSINESS_NAME\}\}/g, input.businessName)
    .replace(/\{\{NICHE\}\}/g, input.niche)
    .replace(/\{\{CITY\}\}/g, input.city)
    .replace(/\{\{WEBSITE_NOTE\}\}/g, websiteNote)
    .replace(/\{\{BRAND\}\}/g, input.brand)
    .replace(/\{\{FOUNDER_NAME\}\}/g, input.founderName);
  const subject = input.subjectTemplate
    .replace(/\{\{BUSINESS_NAME\}\}/g, input.businessName)
    .replace(/\{\{CITY\}\}/g, input.city)
    .replace(/\{\{BRAND\}\}/g, input.brand);
  return { subject, body, provider: "mock" };
}

function heuristicClassify(raw: string): ClassifyResult {
  const t = raw.toLowerCase();
  let classification: ReplyClassification = "unknown";
  let confidence = 0.55;
  if (/désinscri|unsubscribe|retirez|stop|ne plus/.test(t)) {
    classification = "unsubscribe";
    confidence = 0.95;
  } else if (/bounce|undeliverable|mailbox unavailable|does not exist/.test(t)) {
    classification = "bounce";
    confidence = 0.9;
  } else if (/out of office|ooo|absent|congés|vacation/.test(t)) {
    classification = "ooo";
    confidence = 0.85;
  } else if (/intéressé|interested|oui|call|appel|rdv|demo|audit|dispo/.test(t)) {
    classification = "interested";
    confidence = 0.8;
  } else if (/\?|combien|prix|tarifs|comment|quel/.test(t)) {
    classification = "question";
    confidence = 0.7;
  } else if (/pas intéress|not interested|non merci|no thanks|déjà/.test(t)) {
    classification = "not_interested";
    confidence = 0.8;
  }

  const suggested =
    classification === "interested" || classification === "question"
      ? `Bonjour,\n\nMerci pour votre retour. Je propose un audit gratuit de 15 minutes pour voir si un Kit présence digitale (Halloway Associates) a du sens pour vous.\n\nhttps://hallowayassociates.com/audit\n\nQuand êtes-vous disponible cette semaine ?\n\nBien à vous,\n{{FOUNDER_NAME}}`
      : classification === "unsubscribe"
        ? "Confirmation : vous avez été retiré de notre liste. Aucun nouvel email ne sera envoyé."
        : "Merci pour votre message. Je reviens vers vous rapidement.";

  return { classification, confidence, suggestedReply: suggested, provider: "mock" };
}

async function openaiChat(system: string, user: string): Promise<string | null> {
  if (!env.OPENAI_API_KEY || process.env.VITEST || process.env.FORCE_AI_MOCK === "true") {
    return null;
  }
  try {
    const res = await fetch(`${env.OPENAI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: env.OPENAI_MODEL,
        temperature: 0.3,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    return data.choices?.[0]?.message?.content?.trim() ?? null;
  } catch {
    return null;
  }
}


export async function personalizeMessage(input: PersonalizeInput): Promise<PersonalizeResult> {
  const fallback = mockPersonalize(input);
  const content = await openaiChat(
    "Tu personnalises des emails B2B en français, ton professionnel et concis. Réponds en JSON {subject, body}.",
    JSON.stringify(input),
  );
  if (!content) return fallback;
  try {
    const parsed = JSON.parse(content.replace(/```json|```/g, "").trim()) as {
      subject?: string;
      body?: string;
    };
    if (parsed.subject && parsed.body) {
      return { subject: parsed.subject, body: parsed.body, provider: "openai" };
    }
  } catch {
    /* fall through */
  }
  return fallback;
}

export async function classifyReply(rawText: string, founderName: string): Promise<ClassifyResult> {
  const fallback = heuristicClassify(rawText);
  fallback.suggestedReply = fallback.suggestedReply.replace(/\{\{FOUNDER_NAME\}\}/g, founderName);
  const content = await openaiChat(
    'Classe cette réponse email B2B. JSON strict: {"classification":"interested|question|not_interested|unsubscribe|bounce|ooo|unknown","confidence":0-1,"suggestedReply":"..."}',
    rawText.slice(0, 4000),
  );
  if (!content) return fallback;
  try {
    const parsed = JSON.parse(content.replace(/```json|```/g, "").trim()) as {
      classification?: ReplyClassification;
      confidence?: number;
      suggestedReply?: string;
    };
    if (parsed.classification && parsed.suggestedReply) {
      return {
        classification: parsed.classification,
        confidence: parsed.confidence ?? 0.7,
        suggestedReply: parsed.suggestedReply,
        provider: "openai",
      };
    }
  } catch {
    /* fall through */
  }
  return fallback;
}
