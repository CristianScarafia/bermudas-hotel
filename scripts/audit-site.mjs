import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:5175";
const expectIndexable = process.env.EXPECT_INDEXABLE === "true";
const label = process.env.AUDIT_LABEL || "release";
await mkdir(`outputs/${label}-audit`, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: "reduce" });
// Test traffic should not create synthetic Analytics conversions.
await context.route(/googletagmanager\.com|google-analytics\.com/, route => route.abort());
const sitemap = await (await context.request.get(`${base}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
const pages = []; const links = new Set(); const failures = [];
for (const width of [360, 768, 1440]) {
  const page = await context.newPage();
  await page.setViewportSize({ width, height: 960 });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("response", response => { if (response.status() >= 400 && response.url().startsWith(base)) errors.push(`${response.status()} ${response.url()}`); });
  for (const path of routes) {
    const start = errors.length;
    const response = await page.goto(`${base}${path}`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    for (let y = 0; y < await page.locator("body").evaluate(el => el.scrollHeight); y += 900) {
      await page.evaluate(y => scrollTo({ top: y, behavior: "instant" }), y);
      await page.waitForTimeout(45);
    }
    await page.locator("main img").evaluateAll(images => Promise.race([Promise.all(images.filter(img => img.getClientRects().length).map(img => img.decode().catch(() => null))), new Promise(resolve => setTimeout(resolve, 10000))]));
    const state = await page.evaluate(() => ({
      h1: document.querySelectorAll("h1").length,
      title: document.title,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      robots: document.querySelector('meta[name="robots"]')?.content || "",
      description: document.querySelector('meta[name="description"]')?.content || "",
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      broken: [...document.querySelectorAll("main img")].filter(img => img.getClientRects().length && (!img.complete || !img.naturalWidth)).map(img => img.currentSrc),
      links: [...document.querySelectorAll('a[href]')].map(a => a.href),
      schemaValid: [...document.querySelectorAll('script[type="application/ld+json"]')].every(script => { try { JSON.parse(script.textContent); return true; } catch { return false; } }),
    }));
    for (const href of state.links) {
      const url = new URL(href);
      if ([new URL(base).origin, "https://bermudashotel.com"].includes(url.origin)) links.add(url.pathname + url.search);
    }
    delete state.links;
    const issues = [];
    if (response.status() !== 200) issues.push(`HTTP ${response.status()}`);
    if (state.h1 !== 1 || !state.description || !state.title) issues.push("Heading/title/description");
    if (state.canonical?.replace(/\/$/, "") !== `https://bermudashotel.com${path === "/" ? "" : path}`) issues.push("Canonical");
    if (expectIndexable && state.robots.includes("noindex")) issues.push("Unexpected noindex");
    if (!state.schemaValid || state.overflow || state.broken.length || errors.length > start) issues.push("Layout/image/schema/runtime failure");
    pages.push({ path, width, issues, ...state, errors: errors.slice(start) });
    if (issues.length) failures.push({ path, width, issues });
    if (width === 1440 || ["/", "/habitaciones/doble", "/ubicacion", "/guias/la-perla-a-pie"].includes(path)) {
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await page.screenshot({ path: `outputs/${label}-audit/${path.replaceAll("/", "_") || "home"}-${width}.png`, fullPage: true });
    }
  }
  await page.close();
}
const badLinks = [];
for (const path of links) {
  const response = await context.request.get(`${base}${path}`);
  if (!response.ok()) badLinks.push({ path, status: response.status() });
}
const robotsResponse = await context.request.get(`${base}/robots.txt`);
const robots = await robotsResponse.text();
if (expectIndexable && /Disallow:\s*\/\s*$/im.test(robots)) failures.push({ path: "/robots.txt", issues: ["Blocked crawl"] });
await browser.close();
await writeFile(`outputs/${label}-audit/report.json`, JSON.stringify({ base, routes: routes.length, pages, checkedLinks: links.size, badLinks, failures, robots }, null, 2));
console.log(JSON.stringify({ base, routes: routes.length, viewports: pages.length, checkedLinks: links.size, badLinks, failures }));
if (failures.length || badLinks.length) process.exitCode = 1;
