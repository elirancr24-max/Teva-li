#!/usr/bin/env node
// Download FAL-generated images and upload to Supabase + update product image_url.
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = resolve(__dirname, '..');
const ENV_PATH = resolve(WEB_ROOT, '.env.local');

function loadEnv(file) {
  const txt = readFileSync(file, 'utf8');
  const out = {};
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/i);
    if (!m) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    out[m[1]] = v;
  }
  return out;
}

const env = loadEnv(ENV_PATH);
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const BUCKET = 'product-images';

// slug -> fal URL
const IMAGES = JSON.parse(process.env.IMAGES_JSON || '{}');

async function main() {
  if (!Object.keys(IMAGES).length) { console.error('IMAGES_JSON empty'); process.exit(1); }
  for (const [slug, falUrl] of Object.entries(IMAGES)) {
    const res = await fetch(falUrl);
    if (!res.ok) { console.warn('fetch fail', slug, res.status); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    const folder = slug.startsWith('cup-') ? 'cups-ai' : 'peeled-ai';
    const path = `${folder}/${slug}.jpg`;
    const up = await sb.storage.from(BUCKET).upload(path, buf, {
      contentType: 'image/jpeg', cacheControl: '31536000', upsert: true,
    });
    if (up.error) { console.warn('upload fail', slug, up.error.message); continue; }
    const { data } = sb.storage.from(BUCKET).getPublicUrl(path);
    const versioned = `${data.publicUrl}?v=${Date.now()}`;
    const upd = await sb.from('products').update({ image_url: versioned }).eq('slug', slug);
    if (upd.error) { console.warn('db fail', slug, upd.error.message); continue; }
    console.log('done', slug, '->', path);
  }
  console.log('all done.');
}
main().catch((e) => { console.error(e); process.exit(1); });
