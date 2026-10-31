import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "../e2e",
  timeout: 90_000,
  use: {
    baseURL: process.env.E2E_BASE_URL || "http://localhost:5173",
    headless: true,
  },
  webServer: process.env.E2E_SKIP_WEBSERVER
    ? undefined
    : {
        command: "npm run dev -w web",
        url: "http://localhost:5173",
        reuseExistingServer: true,
        cwd: "..",
      },
});
