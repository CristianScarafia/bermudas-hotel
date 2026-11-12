import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
const source = JSON.parse(await readFile(new URL("../public/maps/neighborhood-source.json", import.meta.url)));
const geography = JSON.parse(await readFile(new URL("../lib/neighborhood-geography.json", import.meta.url)));
const streets = source.features.filter(f => f.tags.highway).flatMap(f => f.geometry.slice(1).map((b, i) => [f.geometry[i], b]));
function segmentDistance(p, [a, b]) {
  const dx = b[0] - a[0]; const dy = b[1] - a[1];
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)));
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy) * geography.metersPerUnit;
}
test("all walking routes follow mapped streets or pedestrian paths, including between vertices", () => {
  for (const [id, route] of Object.entries(geography.routes)) {
    assert.deepEqual(route.points[0], geography.points.hotel);
    assert.deepEqual(route.points.at(-1), geography.points[id]);
    const samples = route.points.slice(1).flatMap((b, i) => {
      const a = route.points[i];
      const count = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) * geography.metersPerUnit / 10));
      return Array.from({ length: count + 1 }, (_, j) => [a[0] + (b[0] - a[0]) * j / count, a[1] + (b[1] - a[1]) * j / count]);
    });
    for (const p of samples) {
      assert.ok(p.every(n => n >= 0 && n <= 1000), `${id}: route outside local map`);
      const offset = Math.min(...streets.map(street => segmentDistance(p, street)));
      assert.ok(offset < 15, `${id}: route cuts away from street by ${offset.toFixed(1)} m`);
    }
    const length = route.points.slice(1).reduce((sum, p, i) => sum + Math.hypot(p[0] - route.points[i][0], p[1] - route.points[i][1]) * geography.metersPerUnit, 0);
    assert.ok(Math.abs(length - route.measuredMeters) / route.measuredMeters < .025, `${id}: projection/distance mismatch`);
  }
});
test("terminal route contains the intervening blocks and coastline keeps its curves", () => {
  assert.ok(geography.routes.station.points.length > 40);
  assert.ok(geography.routes.station.meters >= 2400 && geography.routes.station.meters <= 2600);
  const coast = source.features.filter(f => f.tags.natural === "coastline").flatMap(f => f.geometry);
  assert.ok(coast.length > 100);
  assert.ok(Math.max(...coast.map(p => p[0])) - Math.min(...coast.map(p => p[0])) > 150);
});

test("nearby coastal Rambla and Casino Central are separate destinations and routes", () => {
  assert.equal(geography.routes.rambla.meters, 200);
  assert.equal(geography.routes.casino.meters, 1050);
  assert.notDeepEqual(geography.points.rambla, geography.points.casino);
  const distance = Math.hypot(geography.points.rambla[0] - geography.points.casino[0], geography.points.rambla[1] - geography.points.casino[1]) * geography.metersPerUnit;
  assert.ok(distance > 800, "Rambla must identify the nearby promenade, not the Casino building");
});
