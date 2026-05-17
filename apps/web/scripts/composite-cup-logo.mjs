#!/usr/bin/env node
// Composite teva-li logo onto cup images, write to .crops-preview/cup-*.jpg
import { writeFileSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = resolve(__dirname, '..');
const PROJECT_ROOT = resolve(WEB_ROOT, '..', '..');
const LOGO = resolve(WEB_ROOT, 'public/logo-teva-trans.png');
const OUT_DIR = resolve(PROJECT_ROOT, '.crops-preview');

const CUPS = JSON.parse(process.env.CUPS_JSON || '{}');

async function main() {
  if (!Object.keys(CUPS).length) { console.error('CUPS_JSON empty'); process.exit(1); }
  // Pre-resize logo to ~38% of 1024 = 390 wide.
  const logoBuf = await sharp(LOGO).resize({ width: 390 }).png().toBuffer();
  for (const [slug, url] of Object.entries(CUPS)) {
    const res = await fetch(url);
    const imgBuf = Buffer.from(await res.arrayBuffer());
    // Composite logo at center (vertically slightly lower-mid) of 1024x1024 image.
    const out = await sharp(imgBuf)
      .composite([{ input: logoBuf, gravity: 'center' }])
      .jpeg({ quality: 92 })
      .toBuffer();
    const file = join(OUT_DIR, `${slug}.jpg`);
    writeFileSync(file, out);
    console.log('wrote', file);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
