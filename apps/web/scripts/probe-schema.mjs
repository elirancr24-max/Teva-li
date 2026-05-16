// Probe Supabase schema: what columns DO exist
import fs from 'node:fs';
import path from 'node:path';

const envPath = path.resolve(process.cwd(), '.env.local');
const env = Object.fromEntries(
  fs.readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(l => l && !l.startsWith('#') && l.includes('='))
    .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, '')]; })
);

const URL = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const headers = { apikey: KEY, Authorization: `Bearer ${KEY}` };

async function getOne(table) {
  const r = await fetch(`${URL}/rest/v1/${table}?select=*&limit=1`, { headers });
  if (!r.ok) return { table, error: await r.text() };
  const j = await r.json();
  return { table, columns: j[0] ? Object.keys(j[0]) : [], sample: j[0] };
}

console.log(JSON.stringify(await getOne('products'), null, 2));
console.log(JSON.stringify(await getOne('product_images'), null, 2));
console.log(JSON.stringify(await getOne('categories'), null, 2));
