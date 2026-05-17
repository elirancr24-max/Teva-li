#!/usr/bin/env node
// seed-cups-and-peeled.mjs
// Adds:
//   - 10 cut-fruit boxes (500g) to existing `peeled` category
//   - 12 fruit-cup products to new `cups` category
//
// Uploads jar/can photos from ../פחיות/ to Supabase Storage under cups/{hash}.jpg.
// Idempotent — safe to re-run.
//
// Usage: node scripts/seed-cups-and-peeled.mjs

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = resolve(__dirname, '..');
const PROJECT_ROOT = resolve(WEB_ROOT, '..', '..');
const ENV_PATH = resolve(WEB_ROOT, '.env.local');
const IMAGES_DIR = resolve(PROJECT_ROOT, 'פחיות');
const BUCKET = 'product-images';
const STORAGE_PREFIX = 'cups/';

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
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('[seed] missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// ─── 1. Ensure `cups` category ───────────────────────────────────────────────
async function ensureCupsCategory() {
  const { data: existing, error: selErr } = await sb
    .from('categories')
    .select('id, slug, name_he, sort_order')
    .eq('slug', 'cups')
    .maybeSingle();
  if (selErr) throw selErr;
  if (existing) {
    console.log('[seed] cups category exists:', existing.id);
    return existing.id;
  }
  const { data, error } = await sb
    .from('categories')
    .insert({ slug: 'cups', name_he: 'פחיות פירות', sort_order: 7 })
    .select('id')
    .single();
  if (error) throw error;
  console.log('[seed] created cups category:', data.id);
  return data.id;
}

async function getPeeledCategoryId() {
  const { data, error } = await sb
    .from('categories')
    .select('id')
    .eq('slug', 'peeled')
    .single();
  if (error) throw error;
  return data.id;
}

// ─── 2. Upload images, return map filename -> publicUrl ─────────────────────
async function uploadImage(filename) {
  const localPath = join(IMAGES_DIR, filename);
  if (!existsSync(localPath)) {
    console.warn('[seed] missing local image:', filename);
    return null;
  }
  const buf = await readFile(localPath);
  const hash = createHash('md5').update(buf).digest('hex');
  const storagePath = `${STORAGE_PREFIX}${hash}.jpg`;

  // Check existence first to skip redundant upload
  const { data: list } = await sb.storage.from(BUCKET).list(STORAGE_PREFIX.replace(/\/$/, ''), {
    search: `${hash}.jpg`,
  });
  const found = list?.find((f) => f.name === `${hash}.jpg`);
  if (!found) {
    const { error: upErr } = await sb.storage.from(BUCKET).upload(storagePath, buf, {
      contentType: 'image/jpeg',
      cacheControl: '31536000',
      upsert: true,
    });
    if (upErr) throw new Error(`upload ${filename}: ${upErr.message}`);
    console.log('[seed] uploaded:', filename, '->', storagePath);
  } else {
    console.log('[seed] image exists:', storagePath);
  }
  const { data } = sb.storage.from(BUCKET).getPublicUrl(storagePath);
  return data.publicUrl;
}

// ─── 3. Product definitions ─────────────────────────────────────────────────

// 10 cut-fruit boxes (500g) → peeled category
const BOXES = [
  { slug: 'box-cut-watermelon',      name_he: 'אבטיח חתוך — 500 גרם',         kind: 'watermelon',  price_cents: 4000, imageFile: 'WhatsApp Image 2026-05-16 at 22.00.41 (3).jpeg' },
  { slug: 'box-cut-melon-orange',    name_he: 'מלון כתום חתוך — 500 גרם',     kind: 'melon',       price_cents: 4000, imageFile: null },
  { slug: 'box-cut-melon-green',     name_he: 'מלון ירוק חתוך — 500 גרם',     kind: 'melon',       price_cents: 4000, imageFile: null },
  { slug: 'box-pomelo-red',          name_he: 'פומלה אדומה — 500 גרם',        kind: 'pomelo',      price_cents: 3500, imageFile: null },
  { slug: 'box-pomelo-yellow',       name_he: 'פומלה צהובה — 500 גרם',        kind: 'pomelo',      price_cents: 3500, imageFile: null },
  { slug: 'box-cut-kiwi',            name_he: 'קיווי חתוך — 500 גרם',         kind: 'kiwi',        price_cents: 3900, imageFile: null },
  { slug: 'box-cut-mango',           name_he: 'מנגו חתוך — 500 גרם',          kind: 'mango',       price_cents: 4500, imageFile: null },
  { slug: 'box-peeled-pineapple',    name_he: 'אננס מקולף וחתוך — 500 גרם',   kind: 'pineapple',   price_cents: 4900, imageFile: 'WhatsApp Image 2026-05-16 at 22.00.41 (5).jpeg' },
  { slug: 'box-peeled-coconut',      name_he: 'קוקוס מקולף — 500 גרם (בעונה)', kind: 'coconut',    price_cents: 5500, imageFile: null },
  { slug: 'box-strawberries',        name_he: 'תותים — 500 גרם (בעונה)',      kind: 'strawberry',  price_cents: 5500, imageFile: null },
];

// 12 cup products (₪25 each) → cups category
const POPULAR = new Set(['cup-rainbow', 'cup-tropical-refresh', 'cup-watermelon']);
const CUPS = [
  { slug: 'cup-rainbow',             name_he: 'פחית קשת צבעים',              kind: 'mixed-salad', imageFile: null },
  { slug: 'cup-kiwi-grape-berry',    name_he: 'פחית קיווי ענבים ותותים',     kind: 'mixed-salad', imageFile: null },
  { slug: 'cup-mango-grape',         name_he: 'פחית מנגו וענבים',            kind: 'mango',       imageFile: 'WhatsApp Image 2026-05-16 at 21.59.26.jpeg' },
  { slug: 'cup-mango-cherry',        name_he: 'פחית מנגו ודובדבן',           kind: 'mango',       imageFile: 'WhatsApp Image 2026-05-16 at 21.59.26 (2).jpeg' },
  { slug: 'cup-mango-grape-papaya',  name_he: 'פחית מנגו ענבים ופפאיה',       kind: 'mango',       imageFile: 'WhatsApp Image 2026-05-16 at 21.59.27.jpeg' },
  { slug: 'cup-tropical-refresh',    name_he: 'פחית טרופי מרענן',            kind: 'mixed-salad', imageFile: 'WhatsApp Image 2026-05-16 at 21.59.26 (3).jpeg' },
  { slug: 'cup-summer-sweet',        name_he: 'פחית פירות קיץ מתוקים',        kind: 'mixed-salad', imageFile: 'WhatsApp Image 2026-05-16 at 21.59.27 (1).jpeg' },
  { slug: 'cup-watermelon',          name_he: 'פחית אבטיח',                  kind: 'watermelon',  imageFile: 'WhatsApp Image 2026-05-16 at 22.00.41 (3).jpeg' },
  { slug: 'cup-pineapple',           name_he: 'פחית אננס',                   kind: 'pineapple',   imageFile: 'WhatsApp Image 2026-05-16 at 22.00.41 (5).jpeg' },
  { slug: 'cup-pineapple-cherry',    name_he: 'פחית אננס ודובדבן',           kind: 'pineapple',   imageFile: 'WhatsApp Image 2026-05-16 at 22.00.41 (4).jpeg' },
  { slug: 'cup-kiwi-pineapple',      name_he: 'פחית קיווי ואננס',            kind: 'kiwi',        imageFile: 'WhatsApp Image 2026-05-16 at 22.00.41 (6).jpeg' },
  { slug: 'cup-mango',               name_he: 'פחית מנגו',                   kind: 'mango',       imageFile: null },
];

// ─── 4. Main ─────────────────────────────────────────────────────────────────
async function main() {
  const cupsCatId = await ensureCupsCategory();
  const peeledCatId = await getPeeledCategoryId();

  // Collect unique image files needed
  const filesNeeded = new Set();
  for (const p of [...BOXES, ...CUPS]) {
    if (p.imageFile) filesNeeded.add(p.imageFile);
  }
  console.log(`[seed] uploading ${filesNeeded.size} unique images...`);
  const fileToUrl = new Map();
  for (const f of filesNeeded) {
    const url = await uploadImage(f);
    if (url) fileToUrl.set(f, url);
  }

  // Upsert boxes
  const boxRows = BOXES.map((b) => ({
    slug: b.slug,
    name_he: b.name_he,
    category_id: peeledCatId,
    kind: b.kind,
    price_cents: b.price_cents,
    weight: '500 גרם',
    tag: 'פרימיום',
    active: true,
    image_url: b.imageFile ? fileToUrl.get(b.imageFile) ?? null : null,
  }));

  const cupRows = CUPS.map((c) => ({
    slug: c.slug,
    name_he: c.name_he,
    category_id: cupsCatId,
    kind: c.kind,
    price_cents: 2500,
    weight: 'פחית',
    tag: POPULAR.has(c.slug) ? 'פופולרי' : null,
    active: true,
    image_url: c.imageFile ? fileToUrl.get(c.imageFile) ?? null : null,
  }));

  const all = [...boxRows, ...cupRows];
  console.log(`[seed] upserting ${all.length} products...`);
  const { error } = await sb.from('products').upsert(all, { onConflict: 'slug' });
  if (error) {
    console.error('[seed] upsert failed:', error);
    process.exit(1);
  }
  console.log('[seed] done. boxes:', boxRows.length, ' cups:', cupRows.length);
}

main().catch((e) => {
  console.error('[seed] fatal:', e);
  process.exit(1);
});
