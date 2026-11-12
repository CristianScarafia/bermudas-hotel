import { chromium } from "@playwright/test";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";
const inventory = JSON.parse(await readFile("source-images/hotel-originals/inventory.json", "utf8"));
const manifest = JSON.parse(await readFile("lib/image-manifest.json", "utf8"));
const assets = [];
for (const item of inventory) {
  for (const name of item.sources) {
    const original = await readFile(`source-images/hotel-originals/${name}`);
    if (createHash("sha256").update(original).digest("hex") !== item.hash) throw new Error(`Original altered: ${name}`);
    const current = await readFile(`public/images/${name}`);
    if (createHash("sha256").update(current).digest("hex") === item.hash) throw new Error(`Photo was not updated: ${name}`);
    const info = manifest[`/images/${name}`];
    for (const [src, expectedWidth] of [[`/images/${name}`, info.width], ...info.variants.map(v => [v.src, v.width])]) {
      const meta = await sharp(`public${src}`).metadata();
      await sharp(`public${src}`).stats(); // Decode pixels, not only headers.
      if (meta.width !== expectedWidth) throw new Error(`Wrong responsive width: ${src}`);
      assets.push({ src, width: meta.width, height: meta.height });
    }
  }
}
await mkdir("outputs/screenshots", { recursive: true });
const browser = await chromium.launch();
const pages = [];
for (const width of [360, 768, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 960 } });
  const errors = []; const failures = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("response", response => { if (response.status() >= 400 && response.url().startsWith("http://127.0.0.1:5173")) failures.push(`${response.status()} ${response.url()}`); });
  for (const route of ["/", "/habitaciones/doble", "/habitaciones/triple", "/habitaciones/cuadruple", "/habitaciones/quintuple", "/servicios"]) {
    await page.goto(`http://127.0.0.1:5173${route}`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    for (let y = 0; y < await page.locator("body").evaluate(el => el.scrollHeight); y += 850) {
      await page.evaluate(y => scrollTo({ top: y, behavior: "instant" }), y);
      await page.waitForTimeout(70);
    }
    await page.locator("main img").evaluateAll(images => Promise.race([
      Promise.all(images.filter(img => img.getClientRects().length).map(img => img.decode().catch(() => null))),
      new Promise(resolve => setTimeout(resolve, 10000)),
    ]));
    const broken = await page.locator("main img").evaluateAll(images => images.filter(img => img.getClientRects().length && (!img.complete || img.naturalWidth === 0)).map(img => img.currentSrc));
    pages.push({ route, width, broken, overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), errors: [...errors], failures: [...failures] });
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    if (route === "/") {
      await page.locator(".hero-main-photo img").evaluate(img => img.decode());
      await page.screenshot({ path: `outputs/screenshots/retouched-home-${width}.png` });
      await page.locator(".hero-depth").evaluate(el => scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + scrollY - 130), behavior: "instant" }));
      await page.locator(".hero-depth").screenshot({ path: `outputs/screenshots/facade-map-hero-${width}.png` });
    } else if (width === 1440) await page.screenshot({ path: `outputs/screenshots/retouched-${route.split("/").at(-1)}.png` });
  }
  await page.close();
}
await browser.close();
const report = { originalBackupsVerified: inventory.length, variantsDecoded: assets.length, assets, pages };
await writeFile("outputs/image-enhancement/verification.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify({ originalBackupsVerified: inventory.length, variantsDecoded: assets.length, pages }));
