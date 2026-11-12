// Regenerate the local vector map from the checked-in OSM extract. No network at build/runtime.
// To refresh source data first, supply bounded Overpass + OSRM foot results in work/.
import { readFile, writeFile, mkdir } from "node:fs/promises";

const folder = "public/maps";
await mkdir(folder, { recursive: true });
const sourceFile = `${folder}/neighborhood-source.json`;
const round = n => Math.round(n * 100) / 100;
let source;
if (process.argv.includes("--refresh")) {
  const osm = JSON.parse(await readFile("work/neighborhood-osm.json", "utf8"));
  const walks = JSON.parse(await readFile("work/walking-geometry.json", "utf8"));
  const metersPerDegree = 111195;
  const projection = { center: [-57.550, -37.996], spanMeters: 3000, size: 1000 };
  const project = ([lon, lat]) => [round(500 + (lon - projection.center[0]) * metersPerDegree * Math.cos(projection.center[1] * Math.PI / 180) / 3), round(500 - (lat - projection.center[1]) * metersPerDegree / 3)];
  const near = ([x, y]) => x > -80 && x < 1080 && y > -80 && y < 1080;
  // Clip long ways to local runs, keeping one vertex either side of the frame.
  const trim = points => {
    const runs = []; let run = [];
    for (let i = 0; i < points.length; i++) {
      if (near(points[i]) || near(points[i - 1] || points[i]) || near(points[i + 1] || points[i])) run.push(points[i]);
      else if (run.length) { if (run.length > 1) runs.push(run); run = []; }
    }
    if (run.length > 1) runs.push(run);
    return runs;
  };
  const features = osm.elements.flatMap(element => {
    const points = element.geometry.map(p => project([p.lon, p.lat]));
    return trim(points).map((geometry, index) => ({ id: `${element.id}-${index}`, tags: element.tags, geometry }));
  });
  const routes = Object.fromEntries(Object.entries(walks).map(([id, walk]) => [id, {
    coordinates: walk.geometry.coordinates,
    points: walk.geometry.coordinates.map(project),
    meters: Math.round(walk.distance / 50) * 50,
    measuredMeters: walk.distance,
    destination: walk.waypoints.at(-1).location,
    streets: [...new Set(walk.legs[0].steps.map(step => step.name).filter(Boolean))],
    source: walk.source,
  }]));
  source = { attribution: "© OpenStreetMap contributors", license: "https://opendatacommons.org/licenses/odbl/1-0/", checkedAt: "2026-11-11", projection, features, routes };
  await writeFile(sourceFile, JSON.stringify(source));
} else source = JSON.parse(await readFile(sourceFile, "utf8"));

const path = points => points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join("");
const features = source.features;
// The two local coastline ways meet at the Punta Iglesia curve. Order by endpoints,
// never sort individual vertices (which would flatten the real shoreline).
const coasts = features.filter(f => f.tags.natural === "coastline").map(f => f.geometry);
let coast = coasts.shift();
while (coasts.length) {
  const next = coasts.shift();
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  if (dist(coast.at(-1), next[0]) < 1) coast.push(...next.slice(1));
  else if (dist(next.at(-1), coast[0]) < 1) coast = [...next.slice(0, -1), ...coast];
  else throw new Error("Coastline has a gap; inspect the local extract before generating.");
}
if (coast[0][1] > coast.at(-1)[1]) coast.reverse();
const land = `${path(coast)}L-150 ${coast.at(-1)[1]}L-150 ${coast[0][1]}Z`;
const polygons = (test, fill) => features.filter(test).map(f => `<path d="${path(f.geometry)}Z" fill="${fill}"/>`).join("");
const highways = features.filter(f => f.tags.highway && !["corridor", "ladder"].includes(f.tags.highway));
const street = f => !["footway", "steps", "path", "cycleway", "pedestrian"].includes(f.tags.highway);
const major = f => ["primary", "secondary", "tertiary", "primary_link"].includes(f.tags.highway);
const roadPaths = (test, extra, width) => highways.filter(test).map(f => `<path d="${path(f.geometry)}" stroke-width="${typeof width === "function" ? width(f) : width}" ${extra}/>`).join("");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000"><title>La Perla, centro y terminal de Mar del Plata</title><desc>Cartografía local de OpenStreetMap, simplificada para Hotel Bermudas. Norte hacia arriba.</desc><defs><clipPath id="land"><path d="${land}"/></clipPath><pattern id="water" width="70" height="70" patternUnits="userSpaceOnUse"><path d="M12 35q6-4 12 0t12 0" fill="none" stroke="#c1dcd4" stroke-width=".8" opacity=".65"/></pattern></defs><path fill="#7fb4b5" d="M0 0H1000V1000H0Z"/><path fill="url(#water)" d="M0 0H1000V1000H0Z"/><path fill="#e0e6d7" d="${land}"/><g clip-path="url(#land)">${polygons(f => f.tags.natural === "beach", "#eddaad")}${polygons(f => f.tags.leisure === "park", "#b8cdb0")}${polygons(f => f.tags.building || f.tags.amenity === "bus_station", "#b5c2b3")}<g fill="none" stroke-linejoin="round" stroke-linecap="round">${roadPaths(street, 'stroke="#c3cfc0"', f => major(f) ? 9 : 6)}${roadPaths(street, 'stroke="#fafbf5"', f => major(f) ? 6.5 : 4.2)}${roadPaths(f => !street(f), 'stroke="#f8f8e9"', f => f.tags.highway === "pedestrian" ? 3.3 : 1.1)}${features.filter(f => f.tags.railway === "rail").map(f => `<path d="${path(f.geometry)}" stroke="#8d9d90" stroke-width="1.2" stroke-dasharray="3 2"/>`).join("")}</g></g><path d="${path(coast)}" stroke="#f6edcd" stroke-width="1.8" fill="none"/></svg>`;
await writeFile(`${folder}/la-perla-base.svg`, svg);

// Label candidates follow actual street segments. The client keeps a legible subset
// inside the chosen camera, using screen-space collision checks.
const names = ["3 de Febrero", "Santa Fe", "Santiago del Estero", "San Luis", "Avenida Independencia", "Avenida Pedro Luro", "Avenida Libertad", "San Juan", "Bartolomé Mitre", "Peatonal San Martín", "9 de Julio", "Avenida Patricio Peralta Ramos"];
const labels = highways.filter(f => names.includes(f.tags.name)).flatMap(f => f.geometry.slice(1).flatMap((end, i) => {
  let start = f.geometry[i];
  if (Math.hypot(end[0] - start[0], end[1] - start[1]) < 15) return [];
  if (start[0] > end[0]) [start, end] = [end, start];
  return [{ name: f.tags.name.replace("Avenida ", "Av. ").replace("Patricio Peralta Ramos", "Peralta Ramos").replace("Santiago del Estero", "Sgo. del Estero"), x: round((start[0] + end[0]) / 2), y: round((start[1] + end[1]) / 2), angle: round(Math.atan2(end[1] - start[1], end[0] - start[0]) * 180 / Math.PI), priority: names.indexOf(f.tags.name) }];
}));
const points = { hotel: source.routes.beach.points[0], ...Object.fromEntries(Object.entries(source.routes).map(([id, route]) => [id, route.points.at(-1)])) };
const routes = Object.fromEntries(Object.entries(source.routes).map(([id, route]) => [id, { points: route.points, meters: route.meters, measuredMeters: route.measuredMeters, destination: route.destination, streets: route.streets }]));
await writeFile("lib/neighborhood-geography.json", JSON.stringify({ checkedAt: source.checkedAt, metersPerUnit: source.projection.spanMeters / source.projection.size, points, labels, routes }));
console.log(JSON.stringify({ features: features.length, baseBytes: svg.length, routes: Object.fromEntries(Object.entries(routes).map(([id, r]) => [id, r.meters])) }));
