const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const srcPath = path.join(root, "public", "logo.png");
const appDir = path.join(root, "src", "app");
const publicDir = path.join(root, "public");

function dilate(raw, w, h, radius) {
  const out = Buffer.alloc(raw.length);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let minV = 255;
      let maxA = 0;
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const i = (ny * w + nx) * 4;
          if (raw[i + 3] > 20) {
            maxA = Math.max(maxA, raw[i + 3]);
            minV = Math.min(minV, raw[i]);
          }
        }
      }
      const o = (y * w + x) * 4;
      if (maxA > 20) {
        out[o] = out[o + 1] = out[o + 2] = minV;
        out[o + 3] = 255;
      }
    }
  }
  return out;
}

function recolor(raw, rgb) {
  const out = Buffer.from(raw);
  for (let i = 0; i < out.length; i += 4) {
    if (out[i + 3] > 20) {
      out[i] = rgb[0];
      out[i + 1] = rgb[1];
      out[i + 2] = rgb[2];
      out[i + 3] = 255;
    } else {
      out[i + 3] = 0;
    }
  }
  return out;
}

function pngToIco(buffers) {
  const count = buffers.length;
  let offset = 6 + count * 16;
  const entries = [];
  for (const buf of buffers) {
    entries.push({ w: buf.readUInt32BE(16), h: buf.readUInt32BE(20), buf, offset });
    offset += buf.length;
  }
  const out = Buffer.alloc(offset);
  out.writeUInt16LE(0, 0);
  out.writeUInt16LE(1, 2);
  out.writeUInt16LE(count, 4);
  let eo = 6;
  for (const e of entries) {
    out.writeUInt8(e.w >= 256 ? 0 : e.w, eo);
    out.writeUInt8(e.h >= 256 ? 0 : e.h, eo + 1);
    out.writeUInt8(0, eo + 2);
    out.writeUInt8(0, eo + 3);
    out.writeUInt16LE(1, eo + 4);
    out.writeUInt16LE(32, eo + 6);
    out.writeUInt32LE(e.buf.length, eo + 8);
    out.writeUInt32LE(e.offset, eo + 12);
    e.buf.copy(out, e.offset);
    eo += 16;
  }
  return out;
}

async function main() {
  const { data, info } = await sharp(srcPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const cols = new Array(info.width).fill(0);
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4;
      if (data[i + 3] > 20 && data[i] < 80) cols[x]++;
    }
  }

  let gapStart = info.width;
  for (let x = 50; x < cols.length - 10; x++) {
    if (cols[x] === 0) {
      let end = x;
      while (end < cols.length && cols[end] === 0) end++;
      if (end - x >= 12) {
        gapStart = x;
        break;
      }
      x = end;
    }
  }

  let minX = gapStart;
  let minY = info.height;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < gapStart; x++) {
      const i = (y * info.width + x) * 4;
      if (data[i + 3] > 30 && data[i] < 180) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  const ee = { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };

  async function makeTransparent(size, color, dilateRadius) {
    const pad = Math.round(size * 0.04);
    const inner = size - pad * 2;
    const work = 320;
    const emblem = await sharp(srcPath)
      .extract(ee)
      .resize(work, work, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    let pixels = dilate(emblem.data, work, work, dilateRadius);
    pixels = recolor(pixels, color);

    const emblemPng = await sharp(pixels, { raw: { width: work, height: work, channels: 4 } })
      .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    return sharp({
      create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
    })
      .composite([{ input: emblemPng, gravity: "centre" }])
      .png()
      .toBuffer();
  }

  const black512 = await makeTransparent(512, [0, 0, 0], 3);
  const black180 = await makeTransparent(180, [0, 0, 0], 3);
  const white512 = await makeTransparent(512, [255, 255, 255], 3);

  await sharp(black512).toFile(path.join(appDir, "icon.png"));
  await sharp(black180).toFile(path.join(appDir, "apple-icon.png"));
  await sharp(black512).toFile(path.join(publicDir, "icon.png"));
  await sharp(black180).toFile(path.join(publicDir, "apple-icon.png"));
  await sharp(white512).toFile(path.join(publicDir, "icon-dark.png"));
  await sharp(black512).toFile(path.join(publicDir, "icon-light.png"));

  const pngs = [];
  for (const s of [16, 32, 48]) {
    pngs.push(await makeTransparent(s, [0, 0, 0], s <= 16 ? 4 : 3));
  }
  const ico = pngToIco(pngs);
  fs.writeFileSync(path.join(appDir, "favicon.ico"), ico);
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), ico);

  const lightB64 = (await makeTransparent(128, [0, 0, 0], 3)).toString("base64");
  const darkB64 = (await makeTransparent(128, [255, 255, 255], 3)).toString("base64");
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <style>
    .dark { display: none }
    @media (prefers-color-scheme: dark) {
      .light { display: none }
      .dark { display: block }
    }
  </style>
  <image class="light" width="128" height="128" href="data:image/png;base64,${lightB64}"/>
  <image class="dark" width="128" height="128" href="data:image/png;base64,${darkB64}"/>
</svg>`;
  fs.writeFileSync(path.join(publicDir, "favicon.svg"), svg);

  console.log("transparent favicons ready");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
