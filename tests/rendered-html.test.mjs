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
  assert.match(html, /favicon-bermudas\.png/);
  assert.match(html, /apple-touch-icon\.png/);
  assert.match(html, /href="\/hotel-en-la-perla"/);
});

test("renders individual room pages with room and FAQ structured data", async () => {
  for (const slug of ["doble", "triple", "cuadruple", "quintuple"]) {
    const response = await request(`/habitaciones/${slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /"@type":"HotelRoom"/);
    assert.match(html, /"@type":"FAQPage"/);
    assert.match(html, new RegExp(`bermudashotel\\.com/habitaciones/${slug}`));
  }
});

const routes = ["/", "/habitaciones", "/habitaciones/doble", "/habitaciones/triple", "/habitaciones/cuadruple", "/habitaciones/quintuple", "/servicios", "/ubicacion", "/contacto", "/preguntas-frecuentes", "/informacion-del-huesped", "/hotel-en-la-perla", "/alojamiento-familiar", "/grupos-y-contingentes", "/agencias-de-viajes", "/alojamiento-para-eventos", "/viajes-de-egresados", "/ficha-comercial", "/guias", "/guias/la-perla-a-pie", "/guias/playas-cerca-del-hotel", "/guias/centro-de-mar-del-plata"];

test("every public page renders its own canonical, heading and parseable schema", async () => {
  for (const path of routes) {
    const response = await request(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1];
    assert.equal(canonical?.replace(/\/$/, ""), `https://bermudashotel.com${path === "/" ? "" : path}`, path);
    assert.match(html, /<h1\b/, path);
    assert.match(html, /<html[^>]+lang="es-AR"/i, path);
    const scripts = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
    assert.ok(scripts.length >= 2, path);
    for (const script of scripts) assert.doesNotThrow(() => JSON.parse(script[1]), path);
    assert.doesNotMatch(html, /Huésped verificado|★★★★★/, path);
  }
});

test("sitemap includes every public route and unknown pages return 404", async () => {
  const response = await request("/sitemap.xml");
  const sitemap = await response.text();
  for (const route of routes) assert.ok(sitemap.includes(`https://bermudashotel.com${route === "/" ? "" : route}`), route);
  assert.equal((await request("/pagina-inexistente-de-prueba")).status, 404);
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

test("advertises consistent room count, breakfast and direct-stay hours", async () => {
  const paths = ["/habitaciones", "/ficha-comercial", "/grupos-y-contingentes",
    "/agencias-de-viajes", "/alojamiento-para-eventos", "/viajes-de-egresados"];
  for (const path of paths) {
    const html = await (await request(path)).text();
    assert.match(html, /23(?:<!-- -->)? habitaciones/, path);
    assert.match(html, /"numberOfRooms":23/, path);
    assert.doesNotMatch(html, /20(?:<!-- -->)? habitaciones/, path);
  }
  for (const path of routes) {
    assert.doesNotMatch(await (await request(path)).text(), /desayuno continental/i, path);
  }
  const faq = await (await request("/preguntas-frecuentes")).text();
  assert.match(faq, /desayuno buffet/i);
  assert.match(faq, /check-in es desde las 12:00 y el check-out hasta las 10:00/);
  assert.match(faq, /Si reservaste por un convenio, verificá los horarios en tu confirmación/);
});

test("WhatsApp links use the mobile prefix without changing the voice number", async () => {
  for (const path of routes) {
    const html = await (await request(path)).text();
    const links = [...html.matchAll(/href="(https:\/\/wa\.me\/[^"]+)"/g)];
    assert.ok(links.length > 0, path);
    for (const [, link] of links) {
      assert.equal(new URL(link).pathname, "/5492236076020", path);
    }
    assert.match(html, /href="tel:\+542236076020"/, path);
    assert.doesNotMatch(html, /href="tel:\+5492236076020"/, path);
  }
});
