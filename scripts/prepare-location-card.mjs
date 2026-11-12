// Code-native map capture: uses the same real OSM geography as the interactive map.
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";
const geography = JSON.parse(await readFile("lib/neighborhood-geography.json", "utf8"));
const base = await readFile("public/maps/la-perla-base.svg");
const [x, y] = geography.points.hotel;
const span = 380; const left = x - 190; const top = y - 180;
const labelNames = ["3 de Febrero", "Santa Fe", "Sgo. del Estero"];
const labels = labelNames.map(name => geography.labels.filter(label => label.name === name).sort((a, b) => Math.hypot(a.x - x, a.y - y) - Math.hypot(b.x - x, b.y - y))[0]).filter(Boolean);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="760" viewBox="${left} ${top} ${span} ${span}"><title>Hotel Bermudas en La Perla</title><desc>Recorte de la cartografía real del barrio, con el hotel señalado en 3 de Febrero 2484. © OpenStreetMap contributors.</desc><image href="data:image/svg+xml;base64,${base.toString("base64")}" width="1000" height="1000"/><g font-family="sans-serif" font-size="8.5" font-weight="500" fill="#405749" stroke="#fafbf5" stroke-width="1.2" paint-order="stroke">${labels.map(label => `<text x="${label.x}" y="${label.y}" text-anchor="middle" transform="rotate(${label.angle} ${label.x} ${label.y})">${label.name}</text>`).join("")}</g><g transform="translate(${x} ${y})"><ellipse cx="0" cy="5" rx="15" ry="5" fill="#173e3b" opacity=".16"/><path d="M0 0C-7-9-17-20-17-30a17 17 0 1 1 34 0C17-20 7-9 0 0Z" fill="#f4ce64" stroke="#173e3b" stroke-width="1.4"/><circle cx="0" cy="-30" r="5" fill="#173e3b"/><rect x="-52" y="13" width="104" height="26" rx="6" fill="#fffdf4" stroke="#c5d4c8" stroke-width=".6"/><text x="0" y="31" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle" fill="#173e3b">Bermudas</text></g><text x="${left + 325}" y="${top + 260}" font-family="sans-serif" font-size="12" fill="#f4f4e8" text-anchor="middle" transform="rotate(-90 ${left + 325} ${top + 260})">Mar Argentino</text></svg>`;
await writeFile("public/maps/hotel-location-card.svg", svg);
await sharp(Buffer.from(svg)).webp({ quality: 90, effort: 6 }).toFile("public/images/mapa-ubicacion-hotel-bermudas.webp");
console.log("Prepared the real geographic location crop for the hero card (760 × 760).");
