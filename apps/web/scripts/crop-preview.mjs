#!/usr/bin/env node
// Local crop preview — no upload. Writes crops to .crops-preview/ for Read review.
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = resolve(__dirname, '..');
const PROJECT_ROOT = resolve(WEB_ROOT, '..', '..');
const SOURCE_IMG = resolve(PROJECT_ROOT, 'peeled-source.jpg');
const OUT_DIR = resolve(PROJECT_ROOT, '.crops-preview');

const PRODUCTS = [
  { slug: 'sabra',        gridCell: [0, 0] },
  { slug: 'pineapple',    gridCell: [1, 0] },
  { slug: 'melon-orange', gridCell: [2, 0] },
  { slug: 'melon-green',  gridCell: [3, 0] },
  { slug: 'watermelon',   gridCell: [0, 1] },
  { slug: 'coconut',      gridCell: [1, 1] },
  { slug: 'pomelo-red',   gridCell: [2, 1] },
  { slug: 'pomelo-yellow',gridCell: [3, 1] },
  { slug: 'kiwi',         gridCell: [0, 2] },
  { slug: 'nuts-dates',   gridCell: [1, 2] },
  { slug: 'mango',        gridCell: [2, 2] },
];

const CELL_H_PCT = parseFloat(process.env.CELL_H || '0.68');
const CROP_W_PCT = parseFloat(process.env.CROP_W || '0.72');
const INSET_Y_PCT = parseFloat(process.env.INSET_Y || '0.04');

async function main() {
  if (!existsSync(SOURCE_IMG)) {
    console.error('source missing:', SOURCE_IMG);
    process.exit(1);
  }
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  const meta = await sharp(SOURCE_IMG).metadata();
  const W = meta.width, H = meta.height;
  const rowH = Math.floor(H / 3);
  const cellH = Math.floor(rowH * CELL_H_PCT);
  const col4W = Math.floor(W / 4);
  const cropW = Math.floor(col4W * CROP_W_PCT);
  const insetX = Math.floor((col4W - cropW) / 2);
  const insetY = Math.floor(rowH * INSET_Y_PCT);

  console.log(`source: ${W}x${H} | row=${rowH} cell=${cellH} col=${col4W} cropW=${cropW} insetX=${insetX} insetY=${insetY}`);
  console.log(`params: CELL_H=${CELL_H_PCT} CROP_W=${CROP_W_PCT} INSET_Y=${INSET_Y_PCT}`);

  function leftFor(col, row) {
    if (row < 2) return col * col4W;
    return Math.floor(W / 8) + col * col4W;
  }

  for (const p of PRODUCTS) {
    const [col, row] = p.gridCell;
    const left = leftFor(col, row) + insetX;
    const top = row * rowH + insetY;
    const extract = { left, top, width: cropW, height: cellH };
    const out = join(OUT_DIR, `${p.slug}.jpg`);
    await sharp(SOURCE_IMG).extract(extract).jpeg({ quality: 88 }).toFile(out);
    console.log(`${p.slug.padEnd(15)} [${left},${top} ${cropW}x${cellH}] -> ${out}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
