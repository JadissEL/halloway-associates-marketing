import { describe, expect, it } from "vitest";
import { renderTemplate, appendUnsubscribe } from "../src/lib/templates.js";
import { mockDiscoverLeads } from "../src/providers/leads.js";

describe("sequence templating", () => {
  it("renders placeholders", () => {
    const out = renderTemplate("Bonjour {{BUSINESS_NAME}} à {{CITY}}", {
      BUSINESS_NAME: "Salon Martin",
      CITY: "Lyon",
    });
    expect(out).toBe("Bonjour Salon Martin à Lyon");
  });

  it("always appends unsubscribe", () => {
    const { text, html } = appendUnsubscribe("<p>Hi</p>", "Hi", "https://example.com/unsub");
    expect(text).toContain("https://example.com/unsub");
    expect(html).toContain("désinscrire");
  });
});

describe("mock discover", () => {
  it("creates realistic sample businesses", () => {
    const leads = mockDiscoverLeads("coiffeurs", "Lyon", 20);
    expect(leads).toHaveLength(20);
    expect(leads[0]?.city).toBe("Lyon");
    expect(leads[0]?.source).toBe("mock_discover");
    expect(leads.some((l) => l.email)).toBe(true);
  });
});
