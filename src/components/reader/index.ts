/**
 * "Listen to this page" — reads a page's <main> aloud with the browser's
 * speechSynthesis. See docs/ux-pass/kit-v2.md for the full writeup.
 */
export { ReaderProvider, useReader } from './ReaderProvider'
export { default as ReaderButton } from './ReaderButton'
export { default as ListenButton } from './ListenButton'
export { default as ReaderPill } from './ReaderPill'
export { extractReadableBlocks, type ReadableBlock } from './extractor'
export { chunkSentences, splitIntoSentences } from './chunker'
export { pickVoice, type VoiceLike } from './voices'
export { ReaderEngine, HIGHLIGHT_CLASS, type ReaderStatus, type ReaderRate, type ReaderSnapshot } from './engine'
