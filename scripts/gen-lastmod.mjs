#!/usr/bin/env node
/**
 * gen-lastmod.mjs — writes src/data/lastmod.json from git history so
 * app/sitemap.ts can emit a truthful <lastmod> per route instead of one
 * build-time date for everything.
 *
 *   routes: "/service-areas/[town]" -> "YYYY-MM-DD"  (last commit touching that page.tsx)
 *   files:  "src/data/serviceAreas.ts" -> "YYYY-MM-DD" (data files that feed dynamic routes)
 *
 * A file with uncommitted changes gets today's date. Run before committing
 * content changes:  node scripts/gen-lastmod.mjs   (also: npm run lastmod)
 */
import { execSync } from 'node:child_process';
import { readdirSync, statSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const APP = join(ROOT, 'src', 'app');
const DATA_DIRS = ['src/data', 'src/content', 'src/lib/data'].map((d) => join(ROOT, d)).filter(existsSync);
const OUT = join(ROOT, 'src', 'data', 'lastmod.json');
const TODAY = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10); // local date

const sh = (cmd) => { try { return execSync(cmd, { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch { return ''; } };

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) { if (e !== 'node_modules') walk(p, out); }
    else out.push(p);
  }
  return out;
}

function dateFor(file) {
  const rel = relative(ROOT, file);
  if (sh(`git status --porcelain -- ":(literal)${rel}"`)) return TODAY; // uncommitted edit
  // Markup-only commits (message starts with "schema:") do not change page content — skip them.
  const d = sh(`git log -1 --format=%cs --invert-grep --grep='^schema:' -- ":(literal)${rel}"`);
  return d || TODAY; // untracked file
}

const routes = {};
for (const f of walk(APP).filter((p) => /\/page\.(tsx|ts|jsx|js|mdx)$/.test(p))) {
  let key = '/' + relative(APP, dirname(f)).split('/').filter((s) => s && !/^\(.*\)$/.test(s)).join('/');
  if (key === '/') key = '/';
  routes[key] = dateFor(f);
}

const files = {};
for (const dir of DATA_DIRS) {
  for (const f of walk(dir)) {
    const rel = relative(ROOT, f);
    if (rel.endsWith('lastmod.json')) continue;
    files[rel] = dateFor(f);
  }
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify({ generatedAt: TODAY, routes, files }, null, 2) + '\n');
console.log(`lastmod.json: ${Object.keys(routes).length} routes, ${Object.keys(files).length} data files -> ${relative(ROOT, OUT)}`);
