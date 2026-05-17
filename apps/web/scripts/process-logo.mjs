// Remove near-white background from LOGO.png → transparent PNG.
// Output: public/logo-teva-trans.png
import sharp from 'sharp';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, '..', '..', '..', 'LOGO.png');
const OUT = resolve(__dirname, '..', 'public', 'logo-teva-trans.png');

// Threshold — pixels brighter than this become transparent
const THRESHOLD = 225;
// Soft edge — pixels in this range get partial alpha
const SOFT_LOW = 195;

const img = sharp(SRC).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const out = Buffer.from(data);

for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const min = Math.min(r, g, b);

  if (r >= THRESHOLD && g >= THRESHOLD && b >= THRESHOLD) {
    // Definitely white → fully transparent
    out[i + 3] = 0;
  } else if (min >= SOFT_LOW) {
    // Near-white → partial alpha (soft edge)
    const t = (min - SOFT_LOW) / (THRESHOLD - SOFT_LOW);
    out[i + 3] = Math.round(255 * (1 - t));
  }
}

await sharp(out, { raw: { width, height, channels } })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(`Wrote ${OUT} (${width}x${height}, ${channels} channels)`);
