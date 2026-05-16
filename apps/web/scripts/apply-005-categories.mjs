// Apply migration 005's data part via REST (categories INSERT only).
// Skips ALTER TABLE / UPDATE existing — handled separately.
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
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});

const cats = [
  { slug: 'vegetables',  name_he: 'ירקניה',              sort_order: 1 },
  { slug: 'fruits',      name_he: 'פירות',               sort_order: 2 },
  { slug: 'mushrooms',   name_he: 'פטריות ונבטים',       sort_order: 3 },
  { slug: 'dried',       name_he: 'פירות יבשים במשקל',   sort_order: 4 },
  { slug: 'spreads',     name_he: 'ממרחים ורטבים',       sort_order: 5 },
  { slug: 'grocery',     name_he: 'מוצרים כלליים',       sort_order: 6 },
];

console.log('Upserting 6 new categories...');
const { data, error } = await supabase.from('categories').upsert(cats, { onConflict: 'slug' }).select();
if (error) { console.error('Error:', error); process.exit(1); }
console.log('Success:', data?.map(c => `${c.slug} → ${c.id}`));

console.log('\nDeactivating legacy categories products...');
const { data: legacy } = await supabase.from('categories').select('id, slug')
  .in('slug', ['boxes','peeled','extras','citrus','berries','salads','whole-fruit']);
const legacyIds = (legacy || []).map(c => c.id);
console.log('Legacy category IDs:', legacyIds);
if (legacyIds.length > 0) {
  const { error: upErr, count } = await supabase.from('products')
    .update({ active: false })
    .in('category_id', legacyIds)
    .select('id', { count: 'exact', head: true });
  if (upErr) console.error('Update error:', upErr);
  else console.log('Deactivated', count, 'legacy products');
}

console.log('\nDone.');
