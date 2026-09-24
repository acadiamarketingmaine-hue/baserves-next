/**
 * Splits page text into short, speakable chunks for the Reader.
 *
 * Chrome silently stops a single speechSynthesis utterance after roughly 15s
 * of audio, so no one chunk may run that long. Every chunk is a whole
 * sentence when the sentence fits under `maxLen` characters; a longer
 * sentence is broken again at a clause boundary (", " or "; ") near the
 * limit, and failing that at a word boundary, never mid-word.
 *
 * Pure string functions, no DOM: unit-tested directly with node's test
 * runner (see tests/reader-chunker.test.ts).
 */

/** Trailing words that end in "." without ending a sentence. */
const ABBREVIATIONS = new Set([
  'mr', 'mrs', 'ms', 'mx', 'dr', 'prof', 'sr', 'jr', 'st', 'ave', 'blvd', 'rd',
  'inc', 'co', 'corp', 'ltd', 'vs', 'etc', 'approx', 'no', 'ft', 'ca', 'dept',
  'est', 'fig', 'vol', 'pp',
])

const DEFAULT_MAX_LEN = 180

/**
 * Splits `text` into sentences. Keeps abbreviations ("Dr. Smith", "Est.
 * 1939") and decimals ("146.5 acres") from being treated as sentence ends.
 */
export function splitIntoSentences(text: string): string[] {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (!clean) return []

  const sentences: string[] = []
  let start = 0

  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i]
    if (ch !== '.' && ch !== '!' && ch !== '?') continue

    // A period between two digits is a decimal, never a sentence end.
    if (ch === '.' && /\d/.test(clean[i - 1] ?? '') && /\d/.test(clean[i + 1] ?? '')) continue

    // A period ending a known abbreviation ("Dr.", "St.", "approx.") doesn't
    // end the sentence either.
    if (ch === '.') {
      const wordStart = clean.lastIndexOf(' ', i - 1) + 1
      const word = clean.slice(wordStart, i).replace(/[^a-zA-Z]/g, '').toLowerCase()
      if (ABBREVIATIONS.has(word)) continue
    }

    // A run of terminal punctuation ("?!", "...") ends together.
    let end = i + 1
    while (end < clean.length && '.!?'.includes(clean[end])) end++

    // Only a real sentence break if what follows is whitespace then a
    // capital letter/digit/quote (or nothing at all, i.e. end of text).
    const after = clean.slice(end)
    const trimmedAfter = after.replace(/^\s+/, '')
    const hadSpace = after.length === 0 || /^\s/.test(after)
    const looksLikeNewSentence = trimmedAfter.length === 0 || /^[A-Z0-9"'“‘(]/.test(trimmedAfter)
    if (!hadSpace || !looksLikeNewSentence) continue

    sentences.push(clean.slice(start, end).trim())
    start = end
    i = end - 1
  }

  if (start < clean.length) {
    const rest = clean.slice(start).trim()
    if (rest) sentences.push(rest)
  }
  return sentences
}

/** Breaks one long sentence into pieces under `maxLen`, at clause/word bounds. */
function splitLong(sentence: string, maxLen: number): string[] {
  if (sentence.length <= maxLen) return [sentence]
  const pieces: string[] = []
  let rest = sentence.trim()
  while (rest.length > maxLen) {
    const window = rest.slice(0, maxLen + 1)
    let cut = Math.max(window.lastIndexOf(', '), window.lastIndexOf('; '))
    if (cut < Math.floor(maxLen * 0.4)) {
      // No clause break in a useful spot: fall back to the last space.
      cut = window.lastIndexOf(' ')
    }
    if (cut <= 0) cut = maxLen // no space at all in the window: hard cut
    pieces.push(rest.slice(0, cut + 1).trim())
    rest = rest.slice(cut + 1).trim()
  }
  if (rest) pieces.push(rest)
  return pieces
}

/** Text -> an ordered list of speakable chunks, each at most ~maxLen chars. */
export function chunkSentences(text: string, maxLen: number = DEFAULT_MAX_LEN): string[] {
  const chunks: string[] = []
  for (const sentence of splitIntoSentences(text)) {
    for (const piece of splitLong(sentence, maxLen)) {
      if (piece) chunks.push(piece)
    }
  }
  return chunks
}
