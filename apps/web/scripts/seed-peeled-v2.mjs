#!/usr/bin/env node
// seed-peeled-v2.mjs
// Replaces the `peeled` category catalog with 11 new products from the user's image.
// Deactivates the prior 10 box-* products and upserts 11 new peeled-* products.
//
// Optional: if `peeled-source.jpg` (the 4x3 grid composite) exists at the
// project root, this script will crop each cell with `sharp` and upload to
// Supabase Storage. Otherwise products are inserted with no image (logo
// fallback via lib/data/products.ts kicks in).
//
// Usage: node scripts/seed-peeled-v2.mjs

import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = resolve(__dirname, '..');
const PROJECT_ROOT = resolve(WEB_ROOT, '..', '..');
const ENV_PATH = resolve(WEB_ROOT, '.env.local');
const SOURCE_IMG = resolve(PROJECT_ROOT, 'peeled-source.jpg');
const BUCKET = 'product-images';
const STORAGE_PREFIX = 'peeled/';

function loadEnv(file) {
  const txt = readFileSync(file, 'utf8');
  const out = {};
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/i);
    if (!m) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    out[m[1]] = v;
  }
  return out;
}

const env = loadEnv(ENV_PATH);
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// ─── New product list ───────────────────────────────────────────────────────
// gridCell: [col 0-3, row 0-2] in the 4×3 source composite
// Row 0: col0=סברס col1=אננס col2=מלון-כתום col3=מלון
// Row 1: col0=אבטיח col1=קוקוס col2=פומלה-אדומה col3=פומלה-צהובה
// Row 2: col0=קיווי col1=אגוזים+תמרים col2=מנגו (only 3 items)
const PRODUCTS = [
  { slug: 'peeled-sabra',       name_he: 'סברס',                       kind: 'cactus-pear', price_cents: 3500, gridCell: [0, 0] },
  { slug: 'peeled-pineapple',   name_he: 'אננס',                       kind: 'pineapple',   price_cents: 3500, gridCell: [1, 0] },
  { slug: 'peeled-melon-orange',name_he: 'מלון כתום',                  kind: 'melon',       price_cents: 2800, gridCell: [2, 0] },
  { slug: 'peeled-melon-green', name_he: 'מלון',                       kind: 'melon',       price_cents: 2800, gridCell: [3, 0] },
  { slug: 'peeled-watermelon',  name_he: 'אבטיח מקולף',                kind: 'watermelon',  price_cents: 2200, gridCell: [0, 1] },
  { slug: 'peeled-coconut',     name_he: 'קוקוס מקולף (בעונה)',         kind: 'coconut',     price_cents: 4000, gridCell: [1, 1] },
  { slug: 'peeled-pomelo-red',  name_he: 'פומלה אדומה',                kind: 'pomelo',      price_cents: 3500, gridCell: [2, 1] },
  { slug: 'peeled-pomelo-yellow',name_he: 'פומלה צהובה',               kind: 'pomelo',      price_cents: 3500, gridCell: [3, 1] },
  { slug: 'peeled-kiwi',        name_he: 'קיווי',                      kind: 'kiwi',        price_cents: 3200, gridCell: [0, 2] },
  { slug: 'peeled-nuts-dates',  name_he: 'אגוזי מלך עם תמרים',          kind: 'extra',       price_cents: 3500, gridCell: [1, 2] },
  { slug: 'peeled-mango',       name_he: 'מנגו',                       kind: 'mango',       price_cents: 4000, gridCell: [2, 2] },
];

// ─── Deactivate previous peeled box products ────────────────────────────────
async function getPeeledCategoryId() {
  const { data, error } = await sb
    .from('categories')
    .select('id')
    .eq('slug', 'peeled')
    .single();
  if (error) throw error;
  return data.id;
}

async function deactivatePrior(peeledCatId) {
  const newSlugs = PRODUCTS.map((p) => p.slug);
  // Set active=false for any product in peeled category whose slug is NOT in new list.
  const { data: existing, error } = await sb
    .from('products')
    .select('id, slug')
    .eq('category_id', peeledCatId);
  if (error) throw error;
  const toDeactivate = (existing ?? []).filter((p) => !newSlugs.includes(p.slug));
  if (toDeactivate.length === 0) {
    console.log('[seed] no prior peeled products to deactivate');
    return;
  }
  const ids = toDeactivate.map((p) => p.id);
  const { error: upErr } = await sb.from('products').update({ active: false }).in('id', ids);
  if (upErr) throw upErr;
  console.log('[seed] deactivated:', toDeactivate.map((p) => p.slug).join(', '));
}

// ─── Crop + upload ──────────────────────────────────────────────────────────
// Source image dims: 1402 × 1122.
// Grid: 4 cols × 3 rows (rows 0,1). Row 2 has only 3 items, evenly distributed.
// For each cell crop the top ~62% (the cup, dropping the price label below).
async function uploadCrops() {
  if (!existsSync(SOURCE_IMG)) {
    console.log(`[seed] source image not found at ${SOURCE_IMG} — skipping image upload`);
    return new Map();
  }
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.warn('[seed] sharp not installed — skipping crops');
    return new Map();
  }
  const meta = await sharp(SOURCE_IMG).metadata();
  const W = meta.width;
  const H = meta.height;
  const rowH = Math.floor(H / 3);
  const cellH = Math.floor(rowH * 0.76); // captures full cup, stops above price label
  const col4W = Math.floor(W / 4);
  const cropW = Math.floor(col4W * 0.78); // tighter — no neighbor bleed
  const insetX = Math.floor((col4W - cropW) / 2);
  const insetY = 0;

  // Row 2 has 3 items centered: each W/4 wide, offset W/8 from left.
  function leftFor(col, row) {
    if (row < 2) return col * col4W;
    return Math.floor(W / 8) + col * col4W;
  }

  const slugToUrl = new Map();
  for (const p of PRODUCTS) {
    const [col, row] = p.gridCell;
    const cellLeft = leftFor(col, row);
    const cellTop = row * rowH;
    const extract = {
      left: cellLeft + insetX,
      top: cellTop + insetY,
      width: cropW,
      height: cellH,
    };
    const buf = await sharp(SOURCE_IMG)
      .extract(extract)
      .jpeg({ quality: 88 })
      .toBuffer();
    const storagePath = `${STORAGE_PREFIX}${p.slug}.jpg`;
    const { error: upErr } = await sb.storage
      .from(BUCKET)
      .upload(storagePath, buf, { contentType: 'image/jpeg', cacheControl: '31536000', upsert: true });
    if (upErr) {
      console.warn(`[seed] upload failed for ${p.slug}:`, upErr.message);
      continue;
    }
    const { data } = sb.storage.from(BUCKET).getPublicUrl(storagePath);
    // Append a version param so the CDN/browser refetch the new bytes.
    const versioned = `${data.publicUrl}?v=${Date.now()}`;
    slugToUrl.set(p.slug, versioned);
    console.log('[seed] uploaded:', storagePath, `[${extract.left},${extract.top} ${extract.width}x${extract.height}]`);
  }
  return slugToUrl;
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const peeledCatId = await getPeeledCategoryId();
  console.log('[seed] peeled category:', peeledCatId);

  await deactivatePrior(peeledCatId);

  const slugToUrl = await uploadCrops();

  const rows = PRODUCTS.map((p) => ({
    slug: p.slug,
    name_he: p.name_he,
    category_id: peeledCatId,
    kind: p.kind,
    price_cents: p.price_cents,
    weight: 'מגש',
    tag: null,
    active: true,
    image_url: slugToUrl.get(p.slug) ?? null,
  }));

  const { error } = await sb.from('products').upsert(rows, { onConflict: 'slug' });
  if (error) {
    console.error('[seed] upsert failed:', error);
    process.exit(1);
  }
  console.log(`[seed] done — ${rows.length} peeled products active.`);
}

main().catch((e) => {
  console.error('[seed] fatal:', e);
  process.exit(1);
});
