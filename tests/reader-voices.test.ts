import test from 'node:test'
import assert from 'node:assert/strict'

import { pickVoice } from '../src/components/reader/voices.ts'

test('pickVoice: empty list returns null', () => {
  assert.equal(pickVoice([]), null)
})

test('pickVoice: prefers a known natural voice over a generic English one', () => {
  const voices = [
    { name: 'Fred', lang: 'en-US' },
    { name: 'Google US English', lang: 'en-US' },
    { name: 'Daniel', lang: 'en-GB' },
  ]
  const picked = pickVoice(voices)
  assert.equal(picked?.name, 'Google US English')
})

test('pickVoice: matches a preferred name case-insensitively and as a substring', () => {
  const voices = [{ name: 'Microsoft Aria Online (Natural) - English (United States)', lang: 'en-US' }]
  assert.equal(pickVoice(voices)?.name, voices[0].name)
})

test('pickVoice: falls back to any English voice when no preferred name matches', () => {
  const voices = [
    { name: 'Amélie', lang: 'fr-CA' },
    { name: 'Fiona', lang: 'en-GB' },
  ]
  assert.equal(pickVoice(voices)?.name, 'Fiona')
})

test('pickVoice: falls back to the first voice when nothing is English', () => {
  const voices = [
    { name: 'Amélie', lang: 'fr-CA' },
    { name: 'Yuki', lang: 'ja-JP' },
  ]
  assert.equal(pickVoice(voices)?.name, 'Amélie')
})
