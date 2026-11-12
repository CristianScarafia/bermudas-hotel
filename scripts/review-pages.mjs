import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

await mkdir("outputs/screenshots", { recursive: true });
const browser = await chromium.launch();
const report = [];
for (const width of [360, 768, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 960 } });
  const errors = [];
  const failures = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("response", response => { if (response.status() >= 400 && response.url().startsWith("http://127.0.0.1:5173")) failures.push(`${response.status()} ${response.url()}`); });
  await page.goto("http://127.0.0.1:5173/ubicacion", { waitUntil: "domcontentloaded" });
  await page.locator('.neighborhood-section[data-ready="true"]').waitFor();
  await page.locator(".neighborhood-section").screenshot({ path: `outputs/screenshots/map-${width}.png` });
  report.push({ page: "/ubicacion", width, overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), errors: [...errors], failures: [...failures] });
  await page.goto("http://127.0.0.1:5173/grupos-y-contingentes", { waitUntil: "domcontentloaded" });
  await page.locator('.inquiry-form[data-ready="true"]').waitFor();
  await page.screenshot({ path: `outputs/screenshots/groups-${width}.png` });
  await page.locator("#consulta-grupal").screenshot({ path: `outputs/screenshots/group-inquiry-${width}.png` });
  report.push({ page: "/grupos-y-contingentes", width, overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), errors: [...errors], failures: [...failures] });
  await page.close();
}
await writeFile("outputs/visual-review.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));
await browser.close();
