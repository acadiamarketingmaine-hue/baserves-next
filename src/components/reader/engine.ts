/**
 * Vanilla (framework-free) speechSynthesis driver for "Listen to this page".
 * One instance lives for the whole app (created once by ReaderProvider);
 * React only subscribes to its snapshots via useSyncExternalStore. Keeping
 * the speak -> onend -> speak chain out of React avoids stale-closure bugs,
 * and lets a test drive it directly against a fake `window.speechSynthesis`.
 */

import { extractReadableBlocks, type ReadableBlock } from './extractor'
import { chunkSentences } from './chunker'
import { pickVoice } from './voices'

export type ReaderStatus = 'idle' | 'playing' | 'paused'
export type ReaderRate = 0.85 | 1 | 1.25

export interface ReaderSnapshot {
  supported: boolean
  status: ReaderStatus
  rate: ReaderRate
  heading: string
  announcement: string
}

interface Chunk {
  text: string
  blockEl: Element
  heading: string
}

const RATE_CYCLE: ReaderRate[] = [1, 1.25, 0.85]
/** Chrome can silently stall mid-read; if no onend/onboundary fires within
 * this long, cancel and re-speak the current chunk. */
const WATCHDOG_MS = 12000
/** How long to wait for `voiceschanged` before giving up and using whatever
 * voice list (possibly empty) is already available. */
const VOICE_WAIT_MS = 1500

export const HIGHLIGHT_CLASS = 'reader-highlight'

function buildChunks(blocks: ReadableBlock[]): Chunk[] {
  const chunks: Chunk[] = []
  let currentHeading = ''
  for (const block of blocks) {
    if (block.isHeading) currentHeading = block.text
    const heading = currentHeading || block.text
    for (const piece of chunkSentences(block.text)) {
      chunks.push({ text: piece, blockEl: block.el, heading })
    }
  }
  return chunks
}

export class ReaderEngine {
  private status: ReaderStatus = 'idle'
  private rate: ReaderRate = 1
  private heading = ''
  private announcement = ''
  private chunks: Chunk[] = []
  private index = 0
  private session = 0
  private highlighted: Element | null = null
  private preferredVoice: SpeechSynthesisVoice | null = null
  private watchdog: ReturnType<typeof setTimeout> | null = null
  private listeners = new Set<() => void>()

  get supported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window
  }

  subscribe = (fn: () => void): (() => void) => {
    this.listeners.add(fn)
    return () => {
      this.listeners.delete(fn)
    }
  }

  getSnapshot = (): ReaderSnapshot => ({
    supported: this.supported,
    status: this.status,
    rate: this.rate,
    heading: this.heading,
    announcement: this.announcement,
  })

  private emit() {
    this.listeners.forEach((fn) => fn())
  }

  private setStatus(status: ReaderStatus, announcement?: string) {
    this.status = status
    if (announcement !== undefined) this.announcement = announcement
    this.emit()
  }

  private clearWatchdog() {
    if (this.watchdog) {
      clearTimeout(this.watchdog)
      this.watchdog = null
    }
  }

  private armWatchdog(session: number) {
    this.clearWatchdog()
    this.watchdog = setTimeout(() => {
      if (this.session !== session || this.status !== 'playing') return
      window.speechSynthesis.cancel()
      this.speakCurrent(session)
    }, WATCHDOG_MS)
  }

  private clearHighlight() {
    if (this.highlighted) {
      this.highlighted.classList.remove(HIGHLIGHT_CLASS)
      this.highlighted = null
    }
  }

  private highlightBlock(el: Element) {
    if (this.highlighted === el) return
    this.clearHighlight()
    el.classList.add(HIGHLIGHT_CLASS)
    this.highlighted = el
    const reduce =
      typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView?.({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
  }

  private finish(session: number) {
    if (this.session !== session) return
    this.clearWatchdog()
    this.clearHighlight()
    this.heading = ''
    this.setStatus('idle', 'Finished reading the page.')
  }

  private speakCurrent(session: number) {
    const chunk = this.chunks[this.index]
    if (!chunk) {
      this.finish(session)
      return
    }
    this.heading = chunk.heading
    this.highlightBlock(chunk.blockEl)
    this.emit()

    const utter = new SpeechSynthesisUtterance(chunk.text)
    utter.rate = this.rate
    if (this.preferredVoice) utter.voice = this.preferredVoice

    utter.onend = () => {
      if (this.session !== session) return
      this.clearWatchdog()
      this.index += 1
      this.speakCurrent(session)
    }
    utter.onerror = (e: SpeechSynthesisErrorEvent) => {
      if (this.session !== session) return
      this.clearWatchdog()
      // 'interrupted' / 'canceled' are our own stop()/cancel(); anything
      // else is a real synthesis error, so move on rather than go silent.
      if (e.error === 'interrupted' || e.error === 'canceled') return
      this.index += 1
      this.speakCurrent(session)
    }
    utter.onboundary = () => {
      if (this.session !== session) return
      this.armWatchdog(session)
    }

    this.armWatchdog(session)
    window.speechSynthesis.speak(utter)
  }

  /**
   * Starts reading `root` (defaults to the page's <main>). Must be called
   * synchronously from the triggering click handler — the first speak() call
   * happens before any await, so iOS Safari still sees it as user-gesture
   * triggered.
   */
  play(root?: Element | null) {
    if (!this.supported) return
    this.session += 1
    const session = this.session
    window.speechSynthesis.cancel()

    const scope = root !== undefined ? root : document.querySelector('main')
    const blocks = scope ? extractReadableBlocks(scope) : []
    this.chunks = buildChunks(blocks)
    this.index = 0

    if (this.chunks.length === 0) {
      this.setStatus('idle', 'Nothing to read on this page.')
      return
    }

    // Pick a natural voice synchronously first (many browsers already have
    // the list cached after the first page on the site); refine it if
    // voiceschanged fires within the wait window.
    const existingVoices = window.speechSynthesis.getVoices()
    this.preferredVoice = pickVoice(existingVoices)
    if (existingVoices.length === 0) {
      const onVoices = () => {
        if (this.session !== session) return
        this.preferredVoice = pickVoice(window.speechSynthesis.getVoices())
      }
      window.speechSynthesis.addEventListener('voiceschanged', onVoices, { once: true })
      setTimeout(() => window.speechSynthesis.removeEventListener('voiceschanged', onVoices), VOICE_WAIT_MS)
    }

    this.setStatus('playing', 'Reading started.')
    this.speakCurrent(session)
  }

  pause() {
    if (!this.supported || this.status !== 'playing') return
    this.clearWatchdog()
    window.speechSynthesis.pause()
    this.setStatus('paused', 'Reading paused.')
  }

  resume() {
    if (!this.supported || this.status !== 'paused') return
    window.speechSynthesis.resume()
    this.armWatchdog(this.session)
    this.setStatus('playing', 'Reading resumed.')
  }

  stop() {
    this.session += 1
    this.clearWatchdog()
    if (this.supported) window.speechSynthesis.cancel()
    this.clearHighlight()
    this.heading = ''
    this.setStatus('idle', 'Reading stopped.')
  }

  cycleRate() {
    const i = RATE_CYCLE.indexOf(this.rate)
    this.rate = RATE_CYCLE[(i + 1) % RATE_CYCLE.length]
    this.emit()
  }
}
