import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
const root = process.cwd();
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (/\.(tsx?|css)$/.test(entry.name)) files.push(full);
  }
}
for (const dir of ["app", "components", "lib"]) await walk(path.join(root, dir));
const text = (await Promise.all(files.map(file => readFile(file, "utf8")))).join("\n");
const names = [...new Set([...text.matchAll(/\/images\/([^"'`\s)]+\.webp)/g)].map(match => match[1]))].filter(name => !name.includes("${") && !/^(?:logo|mapa-|costa-|mar-del-plata|casino-|catedral-|playa-)/.test(name)).sort();
const groups = new Map();
for (const name of names) {
  const bytes = await readFile(path.join(root, "public/images", name));
  const hash = createHash("sha256").update(bytes).digest("hex");
  const group = groups.get(hash) || { hash, sources: [], source: name };
  group.sources.push(name); groups.set(hash, group);
}
const inventory = [...groups.values()].map((item, index) => ({ id: String(index + 1).padStart(2, "0"), ...item, status: "pending" }));
await mkdir("outputs/image-enhancement", { recursive: true });
await writeFile("outputs/image-enhancement/inventory.json", JSON.stringify(inventory, null, 2));
console.log(JSON.stringify({ referencedFiles: names.length, uniquePhotos: inventory.length, inventory }));
