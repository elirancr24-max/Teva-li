// Mirror catalog images into Supabase Storage bucket `product-images`.
// Reads scripts/meshek-dahan-catalog.json, downloads each image, uploads to
// Supabase under meshek/{md5hash}.jpg, and writes
// scripts/meshek-dahan-catalog-mirrored.json with a `mirroredUrl` field.
//
// Usage: node scripts/mirror-images.mjs

import { createClient } from '@supabase/supabase-js';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CATALOG_PATH = join(__dirname, 'meshek-dahan-catalog.json');
const OUTPUT_PATH = join(__dirname, 'meshek-dahan-catalog-mirrored.json');
const ENV_PATH = join(__dirname, '..', '.env.local');
const BUCKET = 'product-images';
const PREFIX = 'meshek/';
const BATCH_SIZE = 10;

function parseEnvFile(text) {
  const out = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry(fn, label, attempts = 3) {
  let lastErr;
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i < attempts) {
        console.warn(`  [retry ${i}/${attempts}] ${label}: ${err.message}`);
        await sleep(500 * i);
      }
    }
  }
  throw lastErr;
}

async function fetchImage(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Referer': 'https://www.meshek-dahan.co.il/',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  let contentType = (res.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  // CDN sometimes returns application/octet-stream — trust file extension instead.
  if (!contentType || contentType === 'application/octet-stream' || !contentType.startsWith('image/')) {
    const lower = url.toLowerCase().split('?')[0];
    if (lower.endsWith('.png')) contentType = 'image/png';
    else if (lower.endsWith('.webp')) contentType = 'image/webp';
    else if (lower.endsWith('.gif')) contentType = 'image/gif';
    else if (lower.endsWith('.svg')) contentType = 'image/svg+xml';
    else contentType = 'image/jpeg';
  }
  return { buf, contentType };
}

function inferExtension(contentType, url) {
  if (contentType.includes('png')) return 'png';
  if (contentType.includes('webp')) return 'webp';
  if (contentType.includes('gif')) return 'gif';
  if (contentType.includes('svg')) return 'svg';
  // fallback by url
  const lower = (url || '').toLowerCase();
  if (lower.endsWith('.png')) return 'png';
  if (lower.endsWith('.webp')) return 'webp';
  if (lower.endsWith('.gif')) return 'gif';
  return 'jpg';
}

const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

async function ensureBucket(supabase) {
  // Try to list — if it errors with "not found" we create it.
  const { data: list, error: listErr } = await supabase.storage.listBuckets();
  if (listErr) {
    console.warn(`  [bucket] listBuckets error: ${listErr.message}`);
  } else {
    const found = list?.find((b) => b.name === BUCKET);
    if (found) {
      // Always update to ensure public + correct allowedMimeTypes
      console.log(`  [bucket] '${BUCKET}' exists — updating to public + allow image/*`);
      const { error: upErr } = await supabase.storage.updateBucket(BUCKET, {
        public: true,
        allowedMimeTypes: ALLOWED_MIMES,
        fileSizeLimit: 1024 * 1024 * 10,
      });
      if (upErr) console.warn(`  [bucket] updateBucket: ${upErr.message}`);
      return;
    }
  }
  console.log(`  [bucket] creating '${BUCKET}' as public`);
  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    allowedMimeTypes: ALLOWED_MIMES,
    fileSizeLimit: 1024 * 1024 * 10,
  });
  if (error && !/already exists/i.test(error.message)) {
    throw new Error(`createBucket failed: ${error.message}`);
  }
}

async function listExistingPaths(supabase) {
  // Page through everything under meshek/. Supabase list returns up to 1000 per call.
  const existing = new Set();
  let offset = 0;
  const limit = 1000;
  while (true) {
    const { data, error } = await supabase.storage.from(BUCKET).list('meshek', {
      limit,
      offset,
      sortBy: { column: 'name', order: 'asc' },
    });
    if (error) {
      console.warn(`  [list] error: ${error.message}`);
      break;
    }
    if (!data || data.length === 0) break;
    for (const f of data) existing.add(f.name);
    if (data.length < limit) break;
    offset += data.length;
  }
  return existing;
}

async function processProduct(product, ctx) {
  const { supabase, existing, supabaseUrl } = ctx;
  if (!product.imageUrl) {
    return { ...product, mirroredUrl: null, mirrorError: 'no image url' };
  }
  try {
    const hash = createHash('md5').update(product.imageUrl).digest('hex');
    // For dedup we need to know the extension before we download.
    // Strategy: if any file starts with the hash, treat as cached.
    let cachedName = null;
    for (const name of existing) {
      if (name.startsWith(hash + '.')) {
        cachedName = name;
        break;
      }
    }

    let storagePath;
    if (cachedName) {
      storagePath = `meshek/${cachedName}`;
    } else {
      const { buf, contentType } = await withRetry(() => fetchImage(product.imageUrl), `fetch ${product.id}`);
      const ext = inferExtension(contentType, product.imageUrl);
      const fileName = `${hash}.${ext}`;
      storagePath = `meshek/${fileName}`;

      const { error: upErr } = await withRetry(
        () => supabase.storage.from(BUCKET).upload(storagePath, buf, {
          contentType,
          upsert: false,
        }),
        `upload ${product.id}`,
      );
      if (upErr && !/exists|duplicate/i.test(upErr.message || '')) {
        throw new Error(upErr.message);
      }
      existing.add(fileName);
    }

    const publicUrl = `${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/public/${BUCKET}/${storagePath}`;
    return { ...product, mirroredUrl: publicUrl };
  } catch (err) {
    return { ...product, mirroredUrl: null, mirrorError: err.message };
  }
}

async function main() {
  const envText = await readFile(ENV_PATH, 'utf8').catch(() => '');
  const env = parseEnvFile(envText);
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  }
  console.log(`[mirror] supabase url: ${supabaseUrl}`);

  const catalogJson = JSON.parse(await readFile(CATALOG_PATH, 'utf8'));
  const products = catalogJson.products || [];
  console.log(`[mirror] catalog has ${products.length} products`);

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  await ensureBucket(supabase);

  console.log(`[mirror] listing existing files in '${BUCKET}/${PREFIX}'...`);
  const existing = await listExistingPaths(supabase);
  console.log(`[mirror] ${existing.size} files already in bucket`);

  const ctx = { supabase, existing, supabaseUrl };
  const out = new Array(products.length);
  let done = 0;
  let errors = 0;

  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(batch.map((p) => processProduct(p, ctx)));
    for (let j = 0; j < results.length; j++) {
      out[i + j] = results[j];
      if (results[j].mirrorError) errors++;
    }
    done += batch.length;
    if (done % 50 === 0 || done === products.length) {
      console.log(`  [mirror] ${done}/${products.length} (errors so far: ${errors})`);
    }
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    sourceCatalogAt: catalogJson.generatedAt,
    perCategoryCount: catalogJson.perCategoryCount,
    totalUnique: out.length,
    mirrorErrors: errors,
    products: out,
  };
  await writeFile(OUTPUT_PATH, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`[mirror] wrote ${out.length} products (${errors} errors) to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error('[mirror] fatal:', err);
  process.exit(1);
});
