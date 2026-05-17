// Replace `from '@/lib/theme'` → `from '@/lib/brand'` for files that only use BRAND/MESH (not theme).
import { readFileSync, writeFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const ROOT = resolve(process.cwd());
const SKIP = new Set(['.next', 'node_modules', '.git', 'public', 'scripts']);
const EXTS = ['.ts', '.tsx'];

async function walk(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (SKIP.has(e.name)) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) await walk(full, files);
    else if (EXTS.some(ext => e.name.endsWith(ext))) files.push(full);
  }
  return files;
}

const files = await walk(ROOT);
let changed = 0;

for (const file of files) {
  if (file.includes('lib/theme') || file.includes('lib/brand')) continue;
  let txt;
  try { txt = readFileSync(file, 'utf8'); } catch { continue; }
  if (!txt.includes("from '@/lib/theme'")) continue;
  // Only swap if the file uses BRAND/MESH but NOT `theme` itself (no `theme` named import)
  // Parse the import line to check
  const importLine = txt.match(/import\s*\{([^}]+)\}\s*from\s*['"]@\/lib\/theme['"]/);
  if (!importLine) continue;
  const imports = importLine[1].split(',').map(s => s.trim()).filter(Boolean);
  // If only BRAND or MESH (or both) → swap. If also `theme` → leave alone.
  const allBrand = imports.every(i => i === 'BRAND' || i === 'MESH');
  if (!allBrand) continue;
  const out = txt.replace(/from\s*['"]@\/lib\/theme['"]/g, "from '@/lib/brand'");
  if (out !== txt) {
    writeFileSync(file, out, 'utf8');
    changed++;
    console.log('  ✓', file.replace(ROOT, '.'));
  }
}
console.log(`Done. Changed ${changed} files.`);
