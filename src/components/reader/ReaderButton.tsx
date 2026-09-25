'use client'

import { useReader } from './ReaderProvider'
import { HeadphonesIcon } from './icons'

export interface ReaderButtonProps {
  /** Icon-only with an aria-label, for the mobile header row. */
  compact?: boolean
  className?: string
}

/**
 * Site header control. Renders nothing once mounted if speechSynthesis
 * turns out to be unavailable. Starts reading on click; while active, the
 * same button stops it (pause/resume/speed live on the floating ReaderPill
 * once playing).
 */
export default function ReaderButton({ compact = false, className = '' }: ReaderButtonProps) {
  const { supported, mounted, status, play, stop } = useReader()
  // Before mount, support isn't known yet (server always guesses
  // unsupported — see ReaderProvider). Reserve this button's exact
  // footprint with `invisible` (out of paint/hit-testing/tab order, but
  // still occupies its box) instead of `null`, so the header/hero doesn't
  // jump once speechSynthesis is confirmed available a beat later. Once
  // mounted, a genuinely unsupported browser still renders nothing.
  if (mounted && !supported) return null

  const active = status !== 'idle'
  const onClick = () => (active ? stop() : play())
  const label = active ? 'Stop reading this page aloud' : 'Listen to this page'
  const reserving = !mounted

  if (compact) {
    return (
      <button
        type="button"
        data-reader-skip=""
        onClick={onClick}
        aria-pressed={active}
        aria-label={label}
        aria-hidden={reserving || undefined}
        tabIndex={reserving ? -1 : undefined}
        className={`p-3 transition-colors ${active ? 'text-forest-DEFAULT' : 'text-gray-700'} ${className} ${reserving ? 'invisible pointer-events-none' : ''}`}
      >
        <HeadphonesIcon className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      type="button"
      data-reader-skip=""
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      aria-hidden={reserving || undefined}
      tabIndex={reserving ? -1 : undefined}
      className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors ${
        active
          ? 'border-forest-DEFAULT/40 bg-forest-DEFAULT/10 text-forest-DEFAULT'
          : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-forest-DEFAULT'
      } ${className} ${reserving ? 'invisible pointer-events-none' : ''}`}
    >
      <HeadphonesIcon className="h-4 w-4" />
      <span className="hidden xl:inline">{active ? 'Stop' : 'Listen'}</span>
    </button>
  )
}
