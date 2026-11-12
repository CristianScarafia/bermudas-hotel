import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  workers: 1,
  outputDir: "outputs/browser-tests",
  reporter: [["list"]],
  use: { baseURL: process.env.TEST_BASE_URL || "http://127.0.0.1:5173", browserName: "chromium", locale: "es-AR", timezoneId: "America/Argentina/Buenos_Aires", trace: "retain-on-failure" },
});
