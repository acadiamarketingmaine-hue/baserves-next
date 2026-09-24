import test from 'node:test'
import assert from 'node:assert/strict'

import {
  ALL_TOGGLE_CLASSES,
  DEFAULT_SETTINGS,
  STORAGE_KEY,
  ZOOM_VAR,
  applySettings,
  classesFor,
  loadSettings,
  sanitizeSettings,
  saveSettings,
} from '../src/components/a11y/settings.ts'
import { fakeDocument, fakeStorage, throwingStorage } from './fake-dom.ts'

// ---- sanitizeSettings --------------------------------------------------

test('sanitizeSettings: passes through a fully valid object', () => {
  const input = {
    textScale: 1.25,
    reduceMotion: true,
    highContrast: true,
    underlineLinks: true,
    lineSpacing: 'relaxed',
    readableFont: true,
  }
  assert.deepEqual(sanitizeSettings(input), input)
})

test('sanitizeSettings: null/undefined/non-object falls back to defaults', () => {
  assert.deepEqual(sanitizeSettings(null), DEFAULT_SETTINGS)
  assert.deepEqual(sanitizeSettings(undefined), DEFAULT_SETTINGS)
  assert.deepEqual(sanitizeSettings('garbage'), DEFAULT_SETTINGS)
  assert.deepEqual(sanitizeSettings(42), DEFAULT_SETTINGS)
})

test('sanitizeSettings: rejects an out-of-range textScale, keeps the rest', () => {
  const result = sanitizeSettings({ textScale: 999, reduceMotion: true })
  assert.equal(result.textScale, DEFAULT_SETTINGS.textScale)
  assert.equal(result.reduceMotion, true)
})

test('sanitizeSettings: coerces non-boolean toggle values to booleans, not just truthy passthrough', () => {
  const result = sanitizeSettings({ reduceMotion: 'yes', highContrast: 1, underlineLinks: {} })
  assert.equal(result.reduceMotion, false)
  assert.equal(result.highContrast, false)
  assert.equal(result.underlineLinks, false)
})

test('sanitizeSettings: an unknown lineSpacing value falls back to "normal"', () => {
  assert.equal(sanitizeSettings({ lineSpacing: 'huge' }).lineSpacing, 'normal')
  assert.equal(sanitizeSettings({ lineSpacing: 'relaxed' }).lineSpacing, 'relaxed')
})

// ---- loadSettings / saveSettings (try/catch, private-mode safety) -----

test('loadSettings: no persisted value returns defaults', () => {
  assert.deepEqual(loadSettings(fakeStorage()), DEFAULT_SETTINGS)
})

test('loadSettings: round-trips whatever saveSettings wrote', () => {
  const storage = fakeStorage()
  const settings = { ...DEFAULT_SETTINGS, textScale: 1.5 as const, reduceMotion: true }
  saveSettings(settings, storage)
  assert.equal(storage.raw.get(STORAGE_KEY), JSON.stringify(settings))
  assert.deepEqual(loadSettings(storage), settings)
})

test('loadSettings: corrupted JSON falls back to defaults instead of throwing', () => {
  const storage = fakeStorage({ [STORAGE_KEY]: '{not json' })
  assert.deepEqual(loadSettings(storage), DEFAULT_SETTINGS)
})

test('loadSettings: a storage that throws (private mode / blocked) falls back to defaults', () => {
  assert.deepEqual(loadSettings(throwingStorage()), DEFAULT_SETTINGS)
})

test('saveSettings: a storage that throws is swallowed, not propagated', () => {
  assert.doesNotThrow(() => saveSettings(DEFAULT_SETTINGS, throwingStorage()))
})

// ---- classesFor ---------------------------------------------------------

test('classesFor: defaults produce no classes', () => {
  assert.deepEqual(classesFor(DEFAULT_SETTINGS), [])
})

test('classesFor: every toggle maps to its documented class, textScale never does', () => {
  const all = {
    textScale: 1.5 as const,
    reduceMotion: true,
    highContrast: true,
    underlineLinks: true,
    lineSpacing: 'relaxed' as const,
    readableFont: true,
  }
  const classes = classesFor(all)
  for (const c of ALL_TOGGLE_CLASSES) assert.ok(classes.includes(c), `missing ${c}`)
  assert.equal(classes.length, ALL_TOGGLE_CLASSES.length)
})

test('classesFor: lineSpacing "normal" does not add the relaxed class', () => {
  assert.ok(!classesFor({ ...DEFAULT_SETTINGS, lineSpacing: 'normal' }).includes('a11y-spacing-relaxed'))
})

// ---- applySettings --------------------------------------------------------

test('applySettings: sets the zoom custom property from textScale', () => {
  const doc = fakeDocument()
  applySettings({ ...DEFAULT_SETTINGS, textScale: 1.25 }, doc as any)
  assert.equal(doc.styles.get(ZOOM_VAR), '1.25')
})

test('applySettings: is idempotent and re-applying a different settings object clears stale classes', () => {
  const doc = fakeDocument()
  applySettings({ ...DEFAULT_SETTINGS, reduceMotion: true, highContrast: true }, doc as any)
  assert.ok(doc.classes.has('a11y-reduce-motion'))
  assert.ok(doc.classes.has('a11y-contrast'))

  applySettings(DEFAULT_SETTINGS, doc as any)
  assert.ok(!doc.classes.has('a11y-reduce-motion'), 'reduce-motion should be cleared on reset')
  assert.ok(!doc.classes.has('a11y-contrast'), 'contrast should be cleared on reset')
  assert.equal(doc.styles.get(ZOOM_VAR), '1')
})

test('applySettings: never adds classes it does not know about', () => {
  const doc = fakeDocument()
  applySettings({ ...DEFAULT_SETTINGS, underlineLinks: true }, doc as any)
  assert.deepEqual([...doc.classes], ['a11y-underline-links'])
})
