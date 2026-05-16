// Rebrand: פרי לי → טבע לי, peri-li → teva-li, Peri Li → Teva Li
// Skips: .next/, node_modules/, scripts/scrape*, this script itself
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const ROOT = resolve(process.cwd());
const SKIP = new Set(['.next', 'node_modules', '.git', 'public']);
const SKIP_FILES = new Set(['rebrand-to-teva-li.mjs', 'package-lock.json', 'pnpm-lock.yaml', 'meshek-dahan-catalog.json', 'meshek-dahan-catalog-mirrored.json']);
const EXTS = ['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.html', '.mjs', '.css'];

const REPLACEMENTS = [
  [/פרי לי/g, 'טבע לי'],
  [/פרי-לי/g, 'טבע-לי'],
  [/Peri Li/g, 'Teva Li'],
  [/peri-li/g, 'teva-li'],
  [/periLi/g, 'tevaLi'],
  [/PeriLi/g, 'TevaLi'],
];

async function walk(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (SKIP.has(e.name)) continue;
    if (SKIP_FILES.has(e.name)) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) await walk(full, files);
    else if (EXTS.some(ext => e.name.endsWith(ext))) files.push(full);
  }
  return files;
}

const files = await walk(ROOT);
let changedCount = 0;
const changedFiles = [];

for (const file of files) {
  let txt;
  try { txt = readFileSync(file, 'utf8'); } catch { continue; }
  let modified = txt;
  for (const [re, replacement] of REPLACEMENTS) modified = modified.replace(re, replacement);
  if (modified !== txt) {
    writeFileSync(file, modified, 'utf8');
    changedCount++;
    changedFiles.push(file.replace(ROOT, '.'));
  }
}
console.log(`Changed ${changedCount} files:`);
for (const f of changedFiles) console.log('  ', f);
