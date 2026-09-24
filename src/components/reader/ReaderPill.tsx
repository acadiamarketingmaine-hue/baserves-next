'use client'

import { useEffect, useState } from 'react'
import { useReader } from './ReaderProvider'
import { PauseIcon, PlayIcon, StopIcon } from './icons'

/**
 * Floating control shown only while the Reader is playing or paused: a
 * compact inset pill (never full width) centred under the site header.
 * Mounted once from the root layout, so it works the same on every page.
 */
export default function ReaderPill() {
  const { supported, status, rate, heading, announcement, pause, resume, stop, cycleRate } = useReader()
  const [top, setTop] = useState(80)

  useEffect(() => {
    const header = document.querySelector('header')
    const measure = () => setTop(Math.round((header?.getBoundingClientRect().bottom ?? 64) + 12))
    measure()
    window.addEventListener('resize', measure, { passive: true })
    return () => window.removeEventListener('resize', measure)
  }, [])

  if (!supported || status === 'idle') return null

  return (
    <div data-reader-skip="" style={{ top }} className="fixed inset-x-0 z-40 flex justify-center px-4">
      <div className="flex max-w-full items-center gap-1 rounded-full bg-white/[0.98] py-1.5 pl-2 pr-3 text-gray-800 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.35)] ring-1 ring-black/10">
        <button
          type="button"
          onClick={status === 'playing' ? pause : resume}
          aria-label={status === 'playing' ? 'Pause reading' : 'Resume reading'}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-forest-DEFAULT transition-colors hover:bg-forest-DEFAULT/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-DEFAULT"
        >
          {status === 'playing' ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={stop}
          aria-label="Stop reading"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-DEFAULT"
        >
          <StopIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={cycleRate}
          aria-label={`Reading speed ${rate} times. Tap to change speed.`}
          className="h-9 shrink-0 rounded-full px-2.5 text-xs font-semibold text-gray-500 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-DEFAULT"
        >
          {rate}×
        </button>
        <p className="ml-1 min-w-0 truncate text-xs text-gray-500 sm:max-w-[240px]">
          {status === 'paused' ? 'Paused — ' : 'Reading: '}
          <span className="text-gray-700">{heading || 'this page'}</span>
        </p>
      </div>
      {/* Announces play/pause/resume/stop for screen readers; the pill text above is visual only. */}
      <span className="sr-only" role="status" aria-live="polite">
        {announcement}
      </span>
    </div>
  )
}
