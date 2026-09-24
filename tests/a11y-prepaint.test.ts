/**
 * The pre-paint bootstrap (src/components/a11y/prepaint.ts) is hand-written
 * plain JS — it can't import settings.ts because it has to run standalone as
 * inline <script> text before any module code. These tests run that exact
 * script string (via `new Function`) against the same fixtures used for
 * settings.ts, and assert it produces the same <html> classes / zoom
 * variable as applySettings(sanitizeSettings(...)) would. Catches drift
 * between the two without needing a browser.
 */
import test from 'node:test'
import assert from 'node:assert/strict'

import { A11Y_PREPAINT_SCRIPT } from '../src/components/a11y/prepaint.ts'
import { ALL_TOGGLE_CLASSES, STORAGE_KEY, ZOOM_VAR, applySettings, sanitizeSettings } from '../src/components/a11y/settings.ts'
import { fakeDocument, fakeStorage } from './fake-dom.ts'

function runPrepaint(storedValue: string | undefined) {
  const doc = fakeDocument()
  const storage = fakeStorage(storedValue === undefined ? {} : { [STORAGE_KEY]: storedValue })
  const fn = new Function('window', 'document', A11Y_PREPAINT_SCRIPT)
  fn({ localStorage: storage }, doc)
  return doc
}

function expected(storedValue: string | undefined) {
  const parsed = storedValue === undefined ? undefined : JSON.parse(storedValue)
  const doc = fakeDocument()
  applySettings(sanitizeSettings(parsed), doc as any)
  return doc
}

test('prepaint: nothing persisted -> no classes, no zoom var set (matches applySettings defaults being a no-op)', () => {
  const doc = runPrepaint(undefined)
  assert.deepEqual([...doc.classes], [])
  // Nothing stored means the script returns early rather than writing
  // --a11y-zoom: 1 — cheaper for the common (first-ever-visit) case, and
  // globals.css already defaults the var to 1 via `var(--a11y-zoom, 1)`.
  assert.equal(doc.styles.get(ZOOM_VAR), undefined)
})

test('prepaint: matches applySettings for every toggle on, largest text size', () => {
  const stored = JSON.stringify({
    textScale: 1.5,
    reduceMotion: true,
    highContrast: true,
    underlineLinks: true,
    lineSpacing: 'relaxed',
    readableFont: true,
  })
  const doc = runPrepaint(stored)
  const exp = expected(stored)
  assert.deepEqual([...doc.classes].sort(), [...exp.classes].sort())
  assert.equal(doc.styles.get(ZOOM_VAR), exp.styles.get(ZOOM_VAR))
  assert.deepEqual([...doc.classes].sort(), [...ALL_TOGGLE_CLASSES].sort())
})

test('prepaint: an invalid textScale falls back to 1, same as sanitizeSettings', () => {
  const stored = JSON.stringify({ textScale: 999 })
  const doc = runPrepaint(stored)
  assert.equal(doc.styles.get(ZOOM_VAR), '1')
  assert.equal(expected(stored).styles.get(ZOOM_VAR), '1')
})

test('prepaint: corrupted JSON in localStorage is swallowed, not thrown', () => {
  const doc = runPrepaint('{not json')
  assert.deepEqual([...doc.classes], [])
})

test('prepaint: a localStorage.getItem that throws (private mode) is swallowed', () => {
  const doc = fakeDocument()
  const throwingWindow = {
    localStorage: {
      getItem: () => {
        throw new Error('blocked')
      },
    },
  }
  const fn = new Function('window', 'document', A11Y_PREPAINT_SCRIPT)
  assert.doesNotThrow(() => fn(throwingWindow, doc))
  assert.deepEqual([...doc.classes], [])
})

test('prepaint: partial settings (only reduceMotion) match applySettings exactly', () => {
  const stored = JSON.stringify({ reduceMotion: true })
  const doc = runPrepaint(stored)
  const exp = expected(stored)
  assert.deepEqual([...doc.classes], [...exp.classes])
})
