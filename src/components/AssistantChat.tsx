'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { ChatBubbleIcon } from '@/components/Icons'

// Pages that keep a quieter, editorial look and shouldn't show the assistant.
const HIDDEN_ON = ['/noindex1', '/noindex2']

// The panel (chat UI, tour logic) only loads once a visitor opens it, so the
// launcher itself stays a few bytes of inline SVG on every page.
const AssistantPanel = dynamic(() => import('@/components/AssistantPanel'), { ssr: false })

export default function AssistantChat() {
  const [open, setOpen] = useState(false)
  const [autoStartTour, setAutoStartTour] = useState(false)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  // Auto-open (and start the tour) if ?tour=1 is in the URL.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('tour') === '1' && pathname === '/') {
      window.history.replaceState({}, '', '/')
      setAutoStartTour(true)
      setOpen(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const close = () => {
    setOpen(false)
    setAutoStartTour(false)
    launcherRef.current?.focus()
  }

  if (HIDDEN_ON.includes(pathname)) return null

  return (
    <div
      data-assistant-dock
      className="fixed z-[9999] flex flex-col items-end gap-2 bottom-[calc(0.5rem+env(safe-area-inset-bottom,0px))] right-2 sm:bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:right-4"
    >
      {open && (
        <Suspense fallback={null}>
          <AssistantPanel autoStartTour={autoStartTour} onClose={close} />
        </Suspense>
      )}

      <div className="flex items-center gap-3">
        {!open && (
          <span className="hidden rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-lake-ink shadow-sm md:inline-flex">
            Questions? Ask us
          </span>
        )}
        <button
          ref={launcherRef}
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close chat' : 'Open chat'}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-lake-spruce text-lake-paper shadow-[0_10px_24px_-8px_rgba(20,30,24,0.55)] transition-[box-shadow,transform] duration-200 [@media(hover:hover)]:hover:shadow-[0_14px_28px_-8px_rgba(20,30,24,0.6)] motion-safe:[@media(hover:hover)]:hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
        >
          <ChatBubbleIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
