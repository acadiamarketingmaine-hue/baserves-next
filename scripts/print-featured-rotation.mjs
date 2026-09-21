#!/usr/bin/env node
/**
 * print-featured-rotation.mjs — no test runner in this repo (see
 * package.json), so this is the "tiny script" stand-in: it prints the
 * Featured Destinations order for the next 14 UTC calendar days, using the
 * *actual* rotateFeatured() from src/lib/featured-rotation.ts against the
 * *actual* `allLocations` list parsed out of src/components/HomeClient.tsx
 * (not a hand-copied duplicate, so it can't drift from the real data).
 *
 *   node scripts/print-featured-rotation.mjs
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { rotateFeatured, utcDateKey } from '../src/lib/featured-rotation.ts'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const homeClientSrc = readFileSync(join(ROOT, 'src/components/HomeClient.tsx'), 'utf8')

// Pull out just the `const allLocations = [ ... ]` block (the array this
// script must mirror), then read off each entry's `name` and `location`
// fields in source order — that's all rotateFeatured() needs.
const blockMatch = homeClientSrc.match(/const allLocations = \[([\s\S]*?)\n\]\n/)
if (!blockMatch) {
  throw new Error('Could not find `const allLocations = [...]` in HomeClient.tsx')
}
const block = blockMatch[1]
const names = [...block.matchAll(/\bname:\s*'([^']+)'/g)].map((m) => m[1])
const locations = [...block.matchAll(/\blocation:\s*'([^']+)'/g)].map((m) => m[1])
if (names.length === 0 || names.length !== locations.length) {
  throw new Error(`Parsed ${names.length} names but ${locations.length} locations — check the regexes still match HomeClient.tsx`)
}
const allLocations = names.map((name, i) => ({ name, location: locations[i] }))

console.log(`Parsed ${allLocations.length} destinations from HomeClient.tsx\n`)

const today = new Date()
for (let i = 0; i < 14; i++) {
  const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + i))
  const dateKey = utcDateKey(d)
  const order = rotateFeatured(dateKey, allLocations)
  const leading = order.slice(0, 3).map((l) => `${l.name} (${l.location.match(/,\s*([A-Z]{2})\b/)?.[1] ?? '??'})`)
  console.log(`${dateKey}  leading: ${leading.join(' | ')}`)
}
