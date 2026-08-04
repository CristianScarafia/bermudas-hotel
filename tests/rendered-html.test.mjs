import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

function request(path) {
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders production SEO metadata and structured data", async () => {
  const response = await request("/");

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.doesNotMatch(html, /codex-preview/i);
  assert.match(html, /<link[^>]+rel=["']canonical["'][^>]+bermudashotel\.com/i);
  assert.match(html, /"@type":"Hotel"/);
  assert.match(html, /"@type":"WebSite"/);
  assert.match(html, /favicon-bermudas\.svg/);
  assert.match(html, /href="\/hotel-en-la-perla"/);
});

test("renders individual room pages with room and FAQ structured data", async () => {
  for (const slug of ["doble", "triple", "cuadruple"]) {
    const response = await request(`/habitaciones/${slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /"@type":"HotelRoom"/);
    assert.match(html, /"@type":"FAQPage"/);
    assert.match(html, new RegExp(`bermudashotel\\.com/habitaciones/${slug}`));
  }
});

test("publishes expanded sitemap and FAQ page", async () => {
  const sitemap = await request("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  assert.match(xml, /habitaciones\/doble/);
  assert.match(xml, /grupos-y-contingentes/);
  assert.match(xml, /guias\/la-perla-a-pie/);

  const faq = await request("/preguntas-frecuentes");
  assert.equal(faq.status, 200);
  assert.match(await faq.text(), /"@type":"FAQPage"/);
});
