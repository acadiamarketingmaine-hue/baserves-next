import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import {
  NEW_FORESTS_PUBLIC,
  NEW_FOREST_PATHS,
  ROGUE_RIVER_PUBLIC,
  isListed,
  listedNewForests,
  newForestRobots,
  onlyListed,
  withNewForestStates,
} from '../src/data/new-forests.ts'
import { CAMPGROUND_SITES, RECREATION_SITES } from '../src/data/managers.ts'

test('the preview ships closed: noindex and listed nowhere', () => {
  assert.equal(NEW_FORESTS_PUBLIC, false)
  assert.equal(ROGUE_RIVER_PUBLIC, false)
  for (const path of NEW_FOREST_PATHS) {
    assert.equal(isListed(path), false, path)
    assert.deepEqual(newForestRobots(path), { index: false, follow: false }, path)
  }
  assert.deepEqual(listedNewForests(), [])
  assert.deepEqual(onlyListed(['/about', ...NEW_FOREST_PATHS], (p) => p), ['/about'])
  const labels = [...RECREATION_SITES, ...CAMPGROUND_SITES].map((s) => s.label).join(' ')
  assert.doesNotMatch(labels, /Allegheny|Ozark|Rogue/)
})

test('switched on: listed, indexable, states in alphabetical order', () => {
  for (const path of NEW_FOREST_PATHS) {
    assert.equal(isListed(path, true), true, path)
    assert.equal(newForestRobots(path, true), undefined, path)
  }
  const groups = withNewForestStates([{ state: 'Alabama' }, { state: 'West Virginia' }], (f) => ({ state: f.state }), true)
  assert.deepEqual(groups.map((g) => g.state), ['Alabama', 'Arkansas', 'Oregon', 'Pennsylvania', 'West Virginia'])
})

test('every gated path has a page and every listed picture exists', () => {
  for (const path of NEW_FOREST_PATHS) assert.equal(existsSync(`src/app${path}/page.tsx`), true, path)
  for (const forest of listedNewForests(true)) {
    for (const src of [forest.icon, forest.image, ...(forest.children?.map((c) => c.image) ?? [])]) {
      assert.equal(existsSync(`public${src}`), true, src)
    }
  }
})
