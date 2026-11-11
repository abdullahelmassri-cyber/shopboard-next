import { defineConfig, devices } from "@playwright/test";

const port = 3100;
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  timeout: 45_000,
  expect: { timeout: 8_000 },
  reporter: "list",
  use: {
    ...devices["Desktop Chrome"],
    baseURL,
    trace: "retain-on-failure",
  },
  webServer: [
    {
      command: "node tests/e2e/mock-api.mjs",
      url: "http://127.0.0.1:3101/api/products",
      reuseExistingServer: !process.env.CI,
      timeout: 10_000,
    },
    {
      command: "npm run dev -- --hostname 127.0.0.1 --port 3100",
      url: baseURL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      env: { NEXT_PUBLIC_SHOPBOARD_API_BASE_URL: "http://127.0.0.1:3101" },
    },
  ],
});
