'use client'

import { useReader } from './ReaderProvider'
import { HeadphonesIcon } from './icons'

export interface ReaderButtonProps {
  /** Icon-only with an aria-label, for the mobile header row. */
  compact?: boolean
  className?: string
}

/**
 * Site header control. Renders nothing when speechSynthesis isn't
 * available. Starts reading on click; while active, the same button stops
 * it (pause/resume/speed live on the floating ReaderPill once playing).
 */
export default function ReaderButton({ compact = false, className = '' }: ReaderButtonProps) {
  const { supported, status, play, stop } = useReader()
  if (!supported) return null

  const active = status !== 'idle'
  const onClick = () => (active ? stop() : play())
  const label = active ? 'Stop reading this page aloud' : 'Listen to this page'

  if (compact) {
    return (
      <button
        type="button"
        data-reader-skip=""
        onClick={onClick}
        aria-pressed={active}
        aria-label={label}
        className={`p-3 transition-colors ${active ? 'text-forest-DEFAULT' : 'text-gray-700'} ${className}`}
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
      className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors ${
        active
          ? 'border-forest-DEFAULT/40 bg-forest-DEFAULT/10 text-forest-DEFAULT'
          : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-forest-DEFAULT'
      } ${className}`}
    >
      <HeadphonesIcon className="h-4 w-4" />
      <span className="hidden xl:inline">{active ? 'Stop' : 'Listen'}</span>
    </button>
  )
}
