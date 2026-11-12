import { readdir, access, readFile, writeFile, rename } from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const directory = new URL("../public/images/", import.meta.url);
const manifest = {};
for (const name of (await readdir(directory)).filter(name => name.endsWith(".webp") && !/-(480|768|1200)\.webp$/.test(name))) {
  const input = new URL(name, directory);
  const { width, height } = await sharp(fileURLToPath(input)).metadata();
  if (!width || !height) continue;
  const variants = [];
  const digest = createHash("sha256").update(await readFile(input));
  for (const size of [480, 768, 1200].filter(size => size < width)) {
    const variant = name.replace(/\.webp$/, `-${size}.webp`);
    const output = new URL(variant, directory);
    try { await access(output); }
    catch { await sharp(fileURLToPath(input)).resize({ width: size, withoutEnlargement: true }).webp({ quality: 82 }).toFile(fileURLToPath(output)); }
    const metadata = await sharp(fileURLToPath(output)).metadata();
    variants.push({ src: `/images/${variant}`, width: metadata.width });
    digest.update(await readFile(output));
  }
  manifest[`/images/${name}`] = { width, height, version: digest.digest("hex").slice(0, 12), variants };
}
const temporary = new URL("../lib/image-manifest.json.tmp", import.meta.url);
await writeFile(temporary, `${JSON.stringify(manifest, null, 2)}\n`);
await rename(temporary, new URL("../lib/image-manifest.json", import.meta.url));
console.log(`Prepared ${Object.keys(manifest).length} originals and their responsive variants.`);
