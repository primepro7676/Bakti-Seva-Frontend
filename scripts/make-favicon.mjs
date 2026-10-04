import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const input = path.join(root, "logo", "SriLNS Logo w.png");
const outDir = path.join(root, "src", "app");

async function main() {
  const meta = await sharp(input).metadata();
  if (!meta.width || !meta.height) {
    throw new Error("Could not read logo dimensions");
  }

  // Logo sits on the left of a wide transparent strip (e.g. 630x140).
  const side = Math.min(meta.width, meta.height);
  const padded = await sharp(input)
    .extract({ left: 0, top: 0, width: side, height: side })
    .resize(256, 256, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const sizes = [16, 32, 48];
  const pngBuffers = [];
  for (const size of sizes) {
    pngBuffers.push(await sharp(padded).resize(size, size).png().toBuffer());
  }

  await sharp(padded).resize(256, 256).png().toFile(path.join(outDir, "icon.png"));
  await sharp(padded).resize(180, 180).png().toFile(path.join(outDir, "apple-icon.png"));

  // Build a multi-size ICO (PNG-compressed entries — supported by modern browsers)
  const ico = buildIco(pngBuffers, sizes);
  fs.writeFileSync(path.join(outDir, "favicon.ico"), ico);

  console.log("Wrote favicon.ico, icon.png, apple-icon.png from", meta.width, "x", meta.height, "crop", side);
}

function buildIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = [];

  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const data = pngBuffers[i];
    entries.push({
      width: size >= 256 ? 0 : size,
      height: size >= 256 ? 0 : size,
      size: data.length,
      offset,
      data,
    });
    offset += data.length;
  }

  const buf = Buffer.alloc(offset);
  // ICONDIR
  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2); // icon type
  buf.writeUInt16LE(count, 4);

  for (let i = 0; i < count; i++) {
    const e = entries[i];
    const o = 6 + i * 16;
    buf.writeUInt8(e.width, o);
    buf.writeUInt8(e.height, o + 1);
    buf.writeUInt8(0, o + 2); // color palette
    buf.writeUInt8(0, o + 3);
    buf.writeUInt16LE(1, o + 4); // planes
    buf.writeUInt16LE(32, o + 6); // bit count
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
