/**
 * Pure-function tests for the Reader's sentence splitter and chunker. Run
 * with `npm test` (node's own runner; see tests/content-overrides.test.ts for
 * the pattern this follows).
 */

import test from 'node:test'
import assert from 'node:assert/strict'

import { chunkSentences, splitIntoSentences } from '../src/components/reader/chunker.ts'

test('splitIntoSentences: splits on plain sentence boundaries', () => {
  const out = splitIntoSentences('Swimming, fishing and hiking. Contact us for dates.')
  assert.deepEqual(out, ['Swimming, fishing and hiking.', 'Contact us for dates.'])
})

test('splitIntoSentences: does not split on an abbreviation', () => {
  const out = splitIntoSentences('The lodge was built by Dr. Smith in 1939. It still stands today.')
  assert.deepEqual(out, ['The lodge was built by Dr. Smith in 1939.', 'It still stands today.'])
})

test('splitIntoSentences: does not split a decimal number', () => {
  const out = splitIntoSentences('The lake covers 146.5 acres. It is stocked yearly.')
  assert.deepEqual(out, ['The lake covers 146.5 acres.', 'It is stocked yearly.'])
})

test('splitIntoSentences: handles ? and ! and runs of punctuation', () => {
  const out = splitIntoSentences('Ready for a retreat? Book today! Cabins fill fast.')
  assert.deepEqual(out, ['Ready for a retreat?', 'Book today!', 'Cabins fill fast.'])
})

test('splitIntoSentences: a trailing period with no following text still ends the sentence', () => {
  const out = splitIntoSentences('Open in season.')
  assert.deepEqual(out, ['Open in season.'])
})

test('splitIntoSentences: empty or whitespace-only text returns no sentences', () => {
  assert.deepEqual(splitIntoSentences(''), [])
  assert.deepEqual(splitIntoSentences('   \n\t  '), [])
})

test('splitIntoSentences: collapses internal whitespace/newlines', () => {
  const out = splitIntoSentences('Line one.\n   Line   two continues.')
  assert.deepEqual(out, ['Line one.', 'Line two continues.'])
})

test('chunkSentences: a short sentence is returned as one chunk', () => {
  const out = chunkSentences('Open in season.')
  assert.deepEqual(out, ['Open in season.'])
})

test('chunkSentences: every chunk stays at or under maxLen', () => {
  const longSentence =
    'Long Lake Outdoor Center is a historic group retreat facility located within Yankee Springs Recreation Area in Barry County, Michigan, situated along the eastern shore of a quiet, 146-acre private lake used for swimming, fishing and canoeing.'
  const out = chunkSentences(longSentence, 180)
  assert.ok(out.length > 1, 'expected the long sentence to be split into more than one chunk')
  for (const chunk of out) {
    assert.ok(chunk.length <= 180, `chunk exceeded 180 chars: "${chunk}" (${chunk.length})`)
  }
  // Rejoining the chunks (chunks are trimmed, originally space-separated) recovers the sentence.
  assert.equal(out.join(' '), longSentence)
})

test('chunkSentences: prefers a clause boundary over a mid-word cut', () => {
  const sentence =
    'Cabins and bunkhouses for up to 120 guests, with the lodge and kitchen available for groups, weddings, and family reunions all season long.'
  const out = chunkSentences(sentence, 60)
  for (const chunk of out) {
    assert.ok(chunk.length <= 61, `chunk too long: "${chunk}"`)
    assert.ok(!/[a-z]-$/.test(chunk), `chunk cut mid-word: "${chunk}"`)
  }
})

test('chunkSentences: multi-sentence paragraph produces one chunk per short sentence', () => {
  const text = 'Swimming, fishing and hiking through the warmer months. Fall color comes before the season closes. Contact us for dates.'
  const out = chunkSentences(text)
  assert.equal(out.length, 3)
})

test('chunkSentences: empty text produces no chunks', () => {
  assert.deepEqual(chunkSentences(''), [])
})
