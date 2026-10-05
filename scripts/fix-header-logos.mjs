import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const source = path.join(root, "logo", "SriLNS Logo w.png");
const outDir = path.join(root, "public", "images");

async function main() {
  const meta = await sharp(source).metadata();
  if (!meta.width || !meta.height) throw new Error("Bad source logo");

  // Logo sits on the left of a wide canvas (e.g. 630x140)
  const side = Math.min(meta.width, meta.height);
  const square = await sharp(source)
    .extract({ left: 0, top: 0, width: side, height: side })
    .resize(512, 512, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const targets = [
    "srilns_logo.png",
    "srilns_logo_w.png",
    "srilns_logo_white.png",
    "srilns_logo_dark.png",
    "SriLNS Logo w.png",
  ];

  for (const name of targets) {
    const dest = path.join(outDir, name);
    fs.writeFileSync(dest, square);
    console.log("Wrote", dest);
  }

  // Also refresh app icons from the same crop
  const appDir = path.join(root, "src", "app");
  await sharp(square).resize(32, 32).png().toFile(path.join(appDir, "icon.png"));
  await sharp(square).resize(180, 180).png().toFile(path.join(appDir, "apple-icon.png"));

  const sizes = [16, 32, 48];
  const pngBuffers = [];
  for (const size of sizes) {
    pngBuffers.push(await sharp(square).resize(size, size).png().toBuffer());
  }
  fs.writeFileSync(path.join(appDir, "favicon.ico"), buildIco(pngBuffers, sizes));
  console.log("Updated favicon/icon assets");
}

function buildIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  let offset = 6 + count * 16;
  const entries = [];
  for (let i = 0; i < count; i++) {
    entries.push({
      width: sizes[i] >= 256 ? 0 : sizes[i],
      height: sizes[i] >= 256 ? 0 : sizes[i],
      size: pngBuffers[i].length,
      offset,
      data: pngBuffers[i],
    });
    offset += pngBuffers[i].length;
  }
  const buf = Buffer.alloc(offset);
  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2);
  buf.writeUInt16LE(count, 4);
  for (let i = 0; i < count; i++) {
    const e = entries[i];
    const o = 6 + i * 16;
    buf.writeUInt8(e.width, o);
    buf.writeUInt8(e.height, o + 1);
    buf.writeUInt8(0, o + 2);
    buf.writeUInt8(0, o + 3);
    buf.writeUInt16LE(1, o + 4);
    buf.writeUInt16LE(32, o + 6);
    buf.writeUInt32LE(e.size, o + 8);
    buf.writeUInt32LE(e.offset, o + 12);
    e.data.copy(buf, e.offset);
  }
  return buf;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
