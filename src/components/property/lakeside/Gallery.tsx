'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import type { Photo } from '@/content'

/**
 * An even grid of photos with the template's 6px corners. Each photo is a link
 * to the full image (so it works without JS); with JS it opens an accessible
 * full-screen viewer instead.
 */
export default function Gallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const thumbs = useRef<(HTMLAnchorElement | null)[]>([])

  const show = (i: number) => (e: MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (new tab etc.) do their normal thing.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    setOpen(i)
  }

  const close = useCallback(() => {
    setOpen((i) => {
      if (i !== null) {
        const thumb = thumbs.current[i]
        // After the dialog unmounts, put focus back on the photo it showed.
        requestAnimationFrame(() => thumb?.focus({ preventScroll: true }))
      }
      return null
    })
  }, [])

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <li key={photo.src} data-reveal="wipe" className="lk-card lk-zoom relative aspect-[4/3] overflow-hidden rounded-md">
            <a
              ref={(el) => {
                thumbs.current[i] = el
              }}
              href={photo.src}
              onClick={show(i)}
              aria-label={`View photo ${i + 1} of ${photos.length}: ${photo.alt}`}
              className="absolute inset-0 block cursor-zoom-in rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lake-spruce"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1440px) 294px, (min-width: 1024px) 22vw, (min-width: 768px) 30vw, 50vw"
                className="object-cover"
              />
            </a>
          </li>
        ))}
      </ul>
      {open !== null && <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={close} />}
    </>
  )
}

interface LightboxProps {
  photos: Photo[]
  index: number
  onIndex: (i: number) => void
  onClose: () => void
}

function Lightbox({ photos, index, onIndex, onClose }: LightboxProps) {
  const dialog = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const touch = useRef<{ x: number; y: number } | null>(null)
  const n = photos.length
  const photo = photos[index]
  const prev = useCallback(() => onIndex((index - 1 + n) % n), [index, n, onIndex])
  const next = useCallback(() => onIndex((index + 1) % n), [index, n, onIndex])

  // Lock page scroll (compensating for the scrollbar so nothing shifts) and focus the close button.
  useEffect(() => {
    const html = document.documentElement
    const gap = window.innerWidth - html.clientWidth
    const prevOverflow = html.style.overflow
    const prevPad = document.body.style.paddingRight
    html.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
    closeBtn.current?.focus()
    return () => {
      html.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPad
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        next()
      } else if (e.key === 'Tab' && dialog.current) {
        // Keep focus inside the dialog.
        const f = Array.from(dialog.current.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])'))
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        const active = document.activeElement
        if (e.shiftKey && (active === first || !dialog.current.contains(active))) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && (active === last || !dialog.current.contains(active))) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, prev, next])

  const btn =
    'inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

  return createPortal(
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${n}`}
      className="lk-lightbox fixed inset-0 z-[10050] flex flex-col bg-[#0E1411]/95 font-lake-sans text-white"
      onTouchStart={(e) => {
        const t = e.touches[0]
        touch.current = { x: t.clientX, y: t.clientY }
      }}
      onTouchEnd={(e) => {
        const start = touch.current
        touch.current = null
        if (!start) return
        const t = e.changedTouches[0]
        const dx = t.clientX - start.x
        const dy = t.clientY - start.y
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? next : prev)()
        else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) onClose()
      }}
    >
      <div className="flex items-center justify-between px-4 pt-[max(12px,env(safe-area-inset-top))] md:px-8 md:pt-6">
        <p className="text-sm tabular-nums tracking-[0.08em] text-white/80" aria-live="polite">
          {index + 1} / {n}
        </p>
        <button ref={closeBtn} type="button" onClick={onClose} className={btn} aria-label="Close photo viewer">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div
        className="relative mx-auto my-3 min-h-0 w-full flex-1 px-4 md:px-24"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <div key={photo.src} className="lk-lightbox-photo relative h-full w-full">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) calc(100vw - 192px), 100vw" className="object-contain" />
        </div>
        {n > 1 && (
          <>
            <button type="button" onClick={prev} className={`${btn} absolute left-4 top-1/2 hidden -translate-y-1/2 md:inline-flex`} aria-label="Previous photo">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button type="button" onClick={next} className={`${btn} absolute right-4 top-1/2 hidden -translate-y-1/2 md:inline-flex`} aria-label="Next photo">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="flex items-center gap-3 px-4 pb-[max(16px,env(safe-area-inset-bottom))] md:justify-center md:px-8 md:pb-8">
        {n > 1 && (
          <button type="button" onClick={prev} className={`${btn} shrink-0 md:hidden`} aria-label="Previous photo">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
        )}
        <p className="min-w-0 flex-1 text-center text-[15px] leading-[1.5] text-white/90 md:max-w-[720px] md:flex-none">{photo.alt}</p>
        {n > 1 && (
          <button type="button" onClick={next} className={`${btn} shrink-0 md:hidden`} aria-label="Next photo">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        )}
      </div>
    </div>,
    // Inside the Lakeside root so the template fonts apply; it is fixed, so position is unaffected.
    document.querySelector("[data-lakeside]") ?? document.body,
  )
}
