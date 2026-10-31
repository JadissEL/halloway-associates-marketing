import { test, expect } from "@playwright/test";

const API = process.env.E2E_API_URL || "http://localhost:3001";

test("login → start dry-run campaign → outbox progresses", async ({ page, request }) => {
  // API health
  const health = await request.get(`${API}/api/health`);
  expect(health.ok()).toBeTruthy();

  await page.goto("/login");
  await page.getByLabel("Email").fill("jadisselantaki@hallowayassociates.com");
  await page.getByLabel("Mot de passe").fill("change-me-now");
  await page.getByRole("button", { name: "Se connecter" }).click();
  await expect(page.getByRole("heading", { name: "Tableau de bord" })).toBeVisible({ timeout: 15000 });

  await page.goto("/campaigns");
  await page.getByRole("button", { name: "Créer une campagne" }).click();
  await page.locator('input').first().fill(`E2E ${Date.now()}`);
  await page.getByRole("button", { name: "Créer" }).click();
  await expect(page.getByRole("button", { name: /Démarrer|Reprendre/ })).toBeVisible({ timeout: 15000 });

  // Attach a lead via API using token from localStorage
  const token = await page.evaluate(() => localStorage.getItem("lp_outbound_token"));
  expect(token).toBeTruthy();

  const leadsRes = await request.get(`${API}/api/leads?hasEmail=true&take=5`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const leads = await leadsRes.json();
  const campaignUrl = page.url();
  const campaignId = campaignUrl.split("/").pop();

  await request.post(`${API}/api/campaigns/${campaignId}/leads`, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    data: { leadIds: leads.items.slice(0, 3).map((l: { id: string }) => l.id) },
  });

  await page.getByRole("button", { name: /Démarrer|Reprendre/ }).click();
  await page.getByRole("button", { name: "Traiter outbox" }).click();
  await expect(page.getByText(/dry_run_sent|sent|queued|scheduled/)).toBeVisible({ timeout: 20000 });
});
