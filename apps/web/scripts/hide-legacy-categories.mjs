// Add an `active` column to categories then deactivate legacy ones, OR if no `active` column exists,
// set their sort_order to 999 so they appear at end / can be filtered.
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const env = Object.fromEntries(
  readFileSync(resolve(__dirname, '..', '.env.local'), 'utf8')
    .split(/\r?\n/).filter(l => l && !l.startsWith('#') && l.includes('='))
    .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, '')]; })
);
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

// Legacy slugs to hide
const LEGACY = ['boxes', 'peeled', 'salads', 'berries', 'whole-fruit', 'citrus', 'extras'];

// Bump their sort_order to 999 (front-end can filter / they show at end)
for (const slug of LEGACY) {
  const { error } = await sb.from('categories').update({ sort_order: 999 }).eq('slug', slug);
  if (error) console.error(slug, error.message);
  else console.log(`Bumped ${slug} sort_order → 999`);
}

// Also delete products with 0 active items per legacy category — verify counts
const { data: cats } = await sb.from('categories').select('id, slug').in('slug', LEGACY);
for (const c of cats || []) {
  const { count } = await sb.from('products').select('id', { count: 'exact', head: true }).eq('category_id', c.id).eq('active', true);
  console.log(`${c.slug}: ${count} active products`);
}
