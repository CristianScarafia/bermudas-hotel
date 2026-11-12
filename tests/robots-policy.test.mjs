import { test } from "node:test";
import assert from "node:assert/strict";
import { canCrawlPath } from "../scripts/robots-policy.mjs";

test("training crawler restrictions do not block search engines", () => {
  const text = "User-agent: *\nContent-Signal: search=yes,ai-train=no\nAllow: /\n\nUser-agent: GPTBot\nDisallow: /\nUser-agent: Google-Extended\nDisallow: /\n\nUser-Agent: *\nAllow: /";
  assert.equal(canCrawlPath(text, "Googlebot", "/habitaciones"), true);
  assert.equal(canCrawlPath(text, "Bingbot"), true);
  assert.equal(canCrawlPath(text, "GPTBot"), false);
  assert.equal(canCrawlPath(text, "Google-Extended"), false);
});

test("specific crawler groups override global groups and merge repeated groups", () => {
  const text = "User-agent: *\nDisallow: /\nUser-agent: Googlebot\nAllow: /\nUser-agent: Googlebot\nDisallow: /privado";
  assert.equal(canCrawlPath(text, "Googlebot"), true);
  assert.equal(canCrawlPath(text, "Googlebot", "/privado"), false);
  assert.equal(canCrawlPath(text, "Bingbot"), false);
});

test("shared agent groups, comments, empty rules and case-insensitive fields", () => {
  const text = "uSeR-aGeNt: Googlebot\nUser-agent: Bingbot\ndisallow: / # block search\nUser-agent: Otherbot\nDisallow:";
  assert.equal(canCrawlPath(text, "Googlebot"), false);
  assert.equal(canCrawlPath(text, "Bingbot"), false);
  assert.equal(canCrawlPath(text, "Otherbot"), true);
});

test("longer paths win, equal rules allow, wildcard and end anchor work", () => {
  const text = "User-agent: *\nDisallow: /\nAllow: /$\nAllow: /guias\nDisallow: /guias/privado\nAllow: /guias/privado\nDisallow: /*.pdf$";
  assert.equal(canCrawlPath(text, "Googlebot"), true);
  assert.equal(canCrawlPath(text, "Googlebot", "/contacto"), false);
  assert.equal(canCrawlPath(text, "Googlebot", "/guias/la-perla"), true);
  assert.equal(canCrawlPath(text, "Googlebot", "/guias/privado"), true);
  const files = "User-agent: *\nAllow: /\nDisallow: /*.pdf$";
  assert.equal(canCrawlPath(files, "Googlebot", "/ficha.pdf"), false);
  assert.equal(canCrawlPath(files, "Googlebot", "/fichaXpdf"), true);
  assert.equal(canCrawlPath(files, "Googlebot", "/ficha.pdf?descargar"), true);
});
