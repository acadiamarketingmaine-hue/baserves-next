'use client'

import { useEffect, useRef } from 'react'
import { TURNSTILE_SITE_KEY } from '@/lib/turnstile'

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      reset: (id?: string) => void
      remove: (id?: string) => void
    }
  }
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve()
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
  return new Promise((resolve, reject) => {
    const s = existing ?? document.createElement('script')
    s.addEventListener('load', () => resolve())
    s.addEventListener('error', () => reject(new Error('turnstile script failed')))
    if (!existing) {
      s.src = SCRIPT_SRC
      s.async = true
      s.defer = true
      document.head.appendChild(s)
    }
  })
}

/**
 * Cloudflare's "verify you are human" check. Most visitors never see a
 * puzzle; the box ticks itself. `resetKey` changes force a fresh token (a
 * token is good for one submission).
 *
 * The challenge script is only loaded once the box is about to come on
 * screen (or the visitor interacts with the page). Visitors who just read
 * never pull Cloudflare's challenge connections at all, so the page settles
 * instantly, images finish loading, and the challenge's own console noise
 * only ever appears next to a form someone is actually using.
 */
export default function TurnstileWidget({ onToken, resetKey = 0 }: { onToken: (token: string) => void; resetKey?: number }) {
  const box = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)
  const started = useRef(false)
  const latest = useRef(onToken)
  latest.current = onToken

  useEffect(() => {
    let cancelled = false
    const start = () => {
      if (cancelled || started.current) return
      started.current = true
      loadScript()
        .then(() => {
          if (cancelled || !box.current || !window.turnstile) return
          widgetId.current = window.turnstile.render(box.current, {
            sitekey: TURNSTILE_SITE_KEY,
            callback: (t: string) => latest.current(t),
            'expired-callback': () => latest.current(''),
            'error-callback': () => latest.current(''),
          })
        })
        .catch(() => latest.current(''))
    }

    const el = box.current
    let io: IntersectionObserver | null = null
    const wake = () => start()
    if (el && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            io?.disconnect()
            io = null
            start()
          }
        },
        { rootMargin: '400px 0px' }
      )
      io.observe(el)
    } else {
      start()
    }
    // A click or keystroke anywhere means the visitor is doing something —
    // make sure a token can be ready before they hit Submit.
    window.addEventListener('pointerdown', wake, { once: true, passive: true })
    window.addEventListener('keydown', wake, { once: true })

    return () => {
      cancelled = true
      io?.disconnect()
      window.removeEventListener('pointerdown', wake)
      window.removeEventListener('keydown', wake)
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current)
      widgetId.current = null
    }
  }, [])

  useEffect(() => {
    if (resetKey && widgetId.current && window.turnstile) {
      window.turnstile.reset(widgetId.current)
      latest.current('')
    }
  }, [resetKey])

  return <div ref={box} className="min-h-[65px]" />
}
