#!/usr/bin/env node
// gen-image-dims.mjs — writes src/data/image-dims.json ({"/images/x.jpg": [w,h]}) for every raster under public/,
// so JSON-LD ImageObject nodes carry real width/height. Uses macOS `sips` (dev machine) — falls back to keeping
// the existing file if sips is unavailable (CI/Vercel), so commit the generated JSON.
import { execSync } from 'node:child_process';
import { readdirSync, statSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUB = join(ROOT, 'public'); const OUT = join(ROOT, 'src', 'data', 'image-dims.json');
let hasSips = true; try { execSync('which sips', { stdio: 'ignore' }); } catch { hasSips = false; }
if (!hasSips) { console.log('sips not available; keeping existing image-dims.json'); process.exit(0); }
const prev = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};
const out = {};
const walk = (d) => { for (const e of readdirSync(d)) { const p = join(d, e); if (statSync(p).isDirectory()) walk(p); else if (/\.(jpe?g|png|webp|gif)$/i.test(e)) { const key = '/' + relative(PUB, p); try { const t = execSync(`sips -g pixelWidth -g pixelHeight "${p}"`, { encoding: 'utf8' }); const w = +(t.match(/pixelWidth: (\d+)/) || [])[1], h = +(t.match(/pixelHeight: (\d+)/) || [])[1]; if (w && h) out[key] = [w, h]; } catch { if (prev[key]) out[key] = prev[key]; } } } };
walk(PUB);
writeFileSync(OUT, JSON.stringify(out, null, 0).replace(/\],"/g, '],\n"') + '\n');
console.log(`image-dims.json: ${Object.keys(out).length} images`);
