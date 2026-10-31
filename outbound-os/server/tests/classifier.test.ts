import { describe, expect, it } from "vitest";
import { classifyReply } from "../src/providers/ai.js";

describe("reply classifier routing (mock)", () => {
  it("labels interested replies", async () => {
    const r = await classifyReply("Oui je suis intéressé, on peut faire un appel ?", "Alex");
    expect(r.classification).toBe("interested");
    expect(r.suggestedReply).toContain("Alex");
  });

  it("labels unsubscribe", async () => {
    const r = await classifyReply("Merci de me désinscrire de votre liste", "Alex");
    expect(r.classification).toBe("unsubscribe");
  });

  it("labels questions", async () => {
    const r = await classifyReply("Combien ça coûte ? Quels sont vos tarifs ?", "Alex");
    expect(["question", "interested"]).toContain(r.classification);
  });

  it("labels bounce-like text", async () => {
    const r = await classifyReply("Mailbox unavailable — undeliverable bounce", "Alex");
    expect(r.classification).toBe("bounce");
  });
});
