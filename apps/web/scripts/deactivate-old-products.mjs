// Deactivate products that don't have Supabase Storage image URLs.
// These are old teva-li seed products with broken /products/*.jpg local paths.
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

// Find all active products WITHOUT a Supabase-hosted image
const { data: all } = await sb.from('products').select('id, slug, name_he, image_url').eq('active', true);
const toDeactivate = (all || []).filter(p => !p.image_url || !p.image_url.includes('supabase.co'));
console.log(`Active products: ${all?.length}, to deactivate: ${toDeactivate.length}`);
console.log('Sample:', toDeactivate.slice(0, 5).map(p => p.slug));

if (toDeactivate.length > 0) {
  const ids = toDeactivate.map(p => p.id);
  // batch update of 50
  for (let i = 0; i < ids.length; i += 50) {
    const batch = ids.slice(i, i + 50);
    const { error } = await sb.from('products').update({ active: false }).in('id', batch);
    if (error) { console.error('Error:', error); break; }
  }
  console.log('Deactivated.');
}

// Re-check
const { count: nowActive } = await sb.from('products').select('id', { count: 'exact', head: true }).eq('active', true);
console.log(`Active now: ${nowActive}`);
