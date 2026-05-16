// Diagnose what products are currently active and what categories they're in
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const env = Object.fromEntries(
  readFileSync(resolve(__dirname, '..', '.env.local'), 'utf8')
    .split(/\r?\n/).filter(l => l && !l.startsWith('#') && l.includes('='))
    .map(l => { const i = l.indexOf('='); return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^"|"$/g,'')]; })
);
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});

const { data: cats } = await sb.from('categories').select('id, slug, name_he, sort_order').order('sort_order');
console.log('--- Categories ---');
for (const c of cats) console.log(`${c.slug.padEnd(15)} | ${c.name_he.padEnd(25)} | sort=${c.sort_order} | ${c.id}`);

const { count: totalActive } = await sb.from('products').select('id', { count: 'exact', head: true }).eq('active', true);
const { count: totalInactive } = await sb.from('products').select('id', { count: 'exact', head: true }).eq('active', false);
console.log(`\n--- Counts ---\nActive: ${totalActive}\nInactive: ${totalInactive}`);

const { data: byCat } = await sb.from('products').select('category_id, slug, name_he, image_url, active');
const groups = {};
for (const p of byCat) {
  const cid = p.category_id || 'null';
  const cat = cats.find(c => c.id === cid)?.slug || 'unknown';
  groups[cat] = groups[cat] || { active: 0, inactive: 0, withImage: 0, withSbImage: 0 };
  groups[cat][p.active ? 'active' : 'inactive']++;
  if (p.image_url) groups[cat].withImage++;
  if (p.image_url?.includes('supabase.co')) groups[cat].withSbImage++;
}
console.log('\n--- Per category ---');
for (const [cat, g] of Object.entries(groups)) {
  console.log(`${cat.padEnd(15)} active=${g.active} inactive=${g.inactive} withImage=${g.withImage} (supabase=${g.withSbImage})`);
}

console.log('\n--- Sample active vegetables ---');
const vegId = cats.find(c => c.slug === 'vegetables')?.id;
const { data: veg } = await sb.from('products').select('slug, name_he, image_url, price_cents').eq('category_id', vegId).eq('active', true).limit(8);
for (const p of veg) console.log(`${p.slug.padEnd(30)} | ${p.name_he.padEnd(20)} | ₪${p.price_cents/100} | img=${p.image_url ? (p.image_url.includes('supabase')?'SB':'OLD') : 'NONE'}`);
