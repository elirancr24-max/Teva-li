#!/usr/bin/env node
// Run a Postgres migration via Supabase pg-meta or direct SQL.
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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
const SQL_FILE = process.argv[2];
if (!SQL_FILE) { console.error('usage: node run-migration.mjs <sql-file>'); process.exit(1); }
const sql = readFileSync(resolve(SQL_FILE), 'utf8');

// Use REST: POST /rest/v1/rpc/exec_sql doesn't exist by default.
// Use Postgres connection via pg.
import pg from 'pg';
const { Client } = pg;

const projectRef = new URL(env.NEXT_PUBLIC_SUPABASE_URL).hostname.split('.')[0];
const password = env.SUPABASE_DB_PASSWORD || env.SUPABASE_SERVICE_ROLE_KEY; // fallback won't work
const connectionString = env.SUPABASE_DB_URL || `postgresql://postgres.${projectRef}:${password}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`;

console.log('Running migration:', SQL_FILE);
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
await client.connect();
const r = await client.query(sql);
console.log('OK:', r.command ?? 'multi-stmt');
await client.end();
