import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("outputs/screenshots", { recursive: true });
const browser = await chromium.launch();
const report = [];
for (const width of [360, 768, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 960 } });
  const errors = []; const failures = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("response", response => { if (response.status() >= 400 && response.url().startsWith("http://127.0.0.1:5173")) failures.push(`${response.status()} ${response.url()}`); });
  await page.goto("http://127.0.0.1:5173/ubicacion", { waitUntil: "domcontentloaded" });
  const section = page.locator('.neighborhood-section[data-ready="true"]');
  await section.waitFor();
  await page.evaluate(() => document.fonts.ready);
  await section.screenshot({ path: `outputs/screenshots/geographic-map-${width}.png` });
  for (const [name, file] of [["Rambla", "rambla"], ["Casino Central", "casino"]]) {
    await section.getByRole("button", { name, exact: true }).click();
    await section.screenshot({ path: `outputs/screenshots/${file}-separate-${width}.png` });
  }
  await section.getByRole("button", { name: "Terminal", exact: true }).click();
  await page.waitForTimeout(750);
  await section.screenshot({ path: `outputs/screenshots/terminal-route-${width}.png` });
  await section.getByRole("button", { name: "Ver desde arriba", exact: true }).click();
  await page.waitForTimeout(750);
  await section.locator(".neighborhood-scene").screenshot({ path: `outputs/screenshots/terminal-overhead-${width}.png` });
  await section.getByRole("button", { name: "Toda la zona", exact: true }).click();
  await section.locator(".neighborhood-scene").screenshot({ path: `outputs/screenshots/map-overview-${width}.png` });
  const pins = await section.locator(".neighborhood-pin").evaluateAll(elements => elements.map(element => { const r = element.getBoundingClientRect(); return { name: element.ariaLabel, x: r.x, y: r.y, w: r.width, h: r.height }; }));
  const overlaps = pins.flatMap((a, i) => pins.slice(i + 1).filter(b => Math.abs(a.x - b.x) < (a.w + b.w) / 2 && Math.abs(a.y - b.y) < (a.h + b.h) / 2).map(b => [a.name, b.name]));
  await section.getByRole("button", { name: "El mar", exact: true }).click();
  await section.locator(".neighborhood-scene").screenshot({ path: `outputs/screenshots/coast-route-${width}.png` });
  report.push({ width, overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), errors, failures, pins: pins.length, overlaps });
  await page.close();
}
await browser.close();
await writeFile("outputs/geographic-map-review.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));
