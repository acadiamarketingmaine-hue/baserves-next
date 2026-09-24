'use client'

import { useReader } from './ReaderProvider'
import { HeadphonesIcon } from './icons'

export interface ListenButtonProps {
  /** 'light' for use on a photo (Lakeside hero); 'default' for paper/white. */
  variant?: 'light' | 'default'
  className?: string
}

/**
 * Inline "Listen to this page" pill a page can place under its H1. Same
 * engine as the header ReaderButton (one reading session at a time); renders
 * nothing when speechSynthesis isn't available.
 */
export default function ListenButton({ variant = 'default', className = '' }: ListenButtonProps) {
  const { supported, status, play, stop } = useReader()
  if (!supported) return null

  const active = status !== 'idle'
  const onClick = () => (active ? stop() : play())
  const label = active ? 'Stop reading this page aloud' : 'Listen to this page'
  const styles =
    variant === 'light'
      ? 'border-white/80 text-white hover:bg-white/10 focus-visible:outline-white'
      : 'border-lake-ink/40 text-lake-ink hover:bg-lake-ink/5 focus-visible:outline-lake-spruce'

  return (
    <button
      type="button"
      data-reader-skip=""
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 text-[14px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${styles} ${className}`}
    >
      <HeadphonesIcon className="h-4 w-4" />
      {active ? 'Stop reading' : 'Listen to this page'}
    </button>
  )
}
