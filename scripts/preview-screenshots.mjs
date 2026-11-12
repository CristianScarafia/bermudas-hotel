import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir("outputs/screenshots", { recursive: true });
const browser = await chromium.launch({ headless: true });
for (const width of [360, 768, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 960 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("http://127.0.0.1:5173", { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.locator(".coast-hero h1").waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.locator(".hero-main-photo img").evaluate(image => image.decode());
  for (let y = 0; y < await page.locator("body").evaluate(el => el.scrollHeight); y += 800) {
    await page.evaluate(y => scrollTo({ top: y, behavior: "instant" }), y);
    await page.waitForTimeout(100);
  }
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await page.locator("main img").evaluateAll(images => Promise.race([
    Promise.all(images.filter(image => image.getClientRects().length > 0).map(image => image.decode().catch(() => null))),
    new Promise(resolve => setTimeout(resolve, 5000)),
  ]));
  await page.screenshot({ path: `outputs/screenshots/home-${width}.png`, fullPage: true });
  console.log(JSON.stringify({ width, overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), errors }));
  await page.close();
}
await browser.close();
