/**
 * Picks the most natural-sounding voice available for the Reader. Pure
 * function over a plain array so it's testable without a real
 * speechSynthesis (see tests/reader-voices.test.ts) and reusable from the
 * engine against the real `speechSynthesis.getVoices()`.
 */

export interface VoiceLike {
  name: string
  lang: string
}

/** Checked in order; the first match wins. */
const PREFERRED_VOICE_NAMES = [
  'Google US English',
  'Microsoft Aria Online (Natural)',
  'Microsoft Jenny Online (Natural)',
  'Samantha',
  'Ava',
]

/**
 * Prefers a known natural English voice, then any English voice, then
 * whatever the platform offers first. Returns null only when the list is
 * empty (voices not loaded yet).
 */
export function pickVoice<T extends VoiceLike>(voices: T[]): T | null {
  if (!voices.length) return null
  for (const name of PREFERRED_VOICE_NAMES) {
    const hit = voices.find((v) => v.name?.toLowerCase().includes(name.toLowerCase()))
    if (hit) return hit
  }
  const english = voices.find((v) => v.lang?.toLowerCase().startsWith('en'))
  return english ?? voices[0]
}
