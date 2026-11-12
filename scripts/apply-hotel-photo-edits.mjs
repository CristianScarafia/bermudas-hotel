// Encoding/integration only. All photographic retouching is performed with OpenAI image_gen.
import { readFile, writeFile, copyFile, mkdir, rename } from "node:fs/promises";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import path from "node:path";
import sharp from "sharp";

const originalFolder = "source-images/hotel-originals";
const masters = "source-images/hotel-retouched";
const inventory = JSON.parse(await readFile(`${originalFolder}/inventory.json`, "utf8"));
const edits = JSON.parse(await readFile(`${originalFolder}/ai-retouch-manifest.json`, "utf8"));
if (edits.images.length !== inventory.length) throw new Error("Incomplete photo retouch set");
await mkdir(masters, { recursive: true });
await mkdir("outputs/image-enhancement/comparisons", { recursive: true });
const report = [];
for (const item of inventory) {
  const edit = edits.images.find(edit => edit.id === item.id && edit.source === item.source && edit.status === "approved");
  if (!edit) throw new Error(`Unreviewed photo: ${item.id}`);
  for (const source of item.sources) {
    const bytes = await readFile(`${originalFolder}/${source}`);
    if (createHash("sha256").update(bytes).digest("hex") !== item.hash) throw new Error(`Original backup changed: ${source}`);
  }
  const master = path.join(masters, item.source.replace(/\.webp$/, ".png"));
  await copyFile(edit.draft, master);
  const metadata = await sharp(master).metadata();
  const originalMetadata = await sharp(`${originalFolder}/${item.source}`).metadata();
  if (Math.abs(metadata.width / metadata.height - originalMetadata.width / originalMetadata.height) > .015) throw new Error(`Framing ratio mismatch: ${item.source}`);
  for (const source of item.sources) {
    // Preserve original public URLs/alt text and replace all responsive versions together.
    const mainOutput = `public/images/${source}`;
    await sharp(master).webp({ quality: 89, effort: 6 }).toFile(`${mainOutput}.tmp`);
    await rename(`${mainOutput}.tmp`, mainOutput);
    for (const width of [480, 768, 1200].filter(width => width < metadata.width)) {
      const variantOutput = `public/images/${source.replace(/\.webp$/, `-${width}.webp`)}`;
      await sharp(master).resize({ width, withoutEnlargement: true }).webp({ quality: 84, effort: 6 }).toFile(`${variantOutput}.tmp`);
      await rename(`${variantOutput}.tmp`, variantOutput);
    }
  }
  // Side-by-side evidence only; no additional photographic edits.
  const before = await sharp(`${originalFolder}/${item.source}`).resize({ width: 600, height: 450, fit: "contain", background: "#f4f4ee" }).toBuffer();
  const after = await sharp(master).resize({ width: 600, height: 450, fit: "contain", background: "#f4f4ee" }).toBuffer();
  await sharp({ create: { width: 1200, height: 450, channels: 3, background: "#f4f4ee" } }).composite([{ input: before, left: 0, top: 0 }, { input: after, left: 600, top: 0 }]).jpeg({ quality: 93 }).toFile(`outputs/image-enhancement/comparisons/${item.id}.jpg`);
  report.push({ id: item.id, files: item.sources, master, width: metadata.width, height: metadata.height, originalHash: item.hash });
}
await writeFile("outputs/image-enhancement/applied.json", JSON.stringify(report, null, 2));
const result = spawnSync(process.execPath, ["scripts/prepare-images.mjs"], { stdio: "inherit" });
if (result.status !== 0) throw new Error("Responsive image manifest generation failed");
console.log(JSON.stringify({ editedPhotos: report.length, publicFiles: report.reduce((sum, item) => sum + item.files.length, 0), report: "outputs/image-enhancement/applied.json" }));
