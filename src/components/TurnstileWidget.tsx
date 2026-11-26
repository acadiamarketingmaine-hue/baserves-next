'use client'

import { useEffect, useRef } from 'react'

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string
  remove: (widgetId: string) => void
  reset: (widgetId?: string) => void
}

declare global {
  interface Window { turnstile?: TurnstileApi }
}

export default function TurnstileWidget({ onToken, resetKey = 0 }: { onToken: (token: string) => void; resetKey?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | undefined>(undefined)
  const callbackRef = useRef(onToken)
  callbackRef.current = onToken

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (!siteKey || !containerRef.current) return

    let widgetId: string | undefined
    let cancelled = false
    const render = () => {
      if (cancelled || widgetId || !window.turnstile || !containerRef.current) return
      widgetId = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => callbackRef.current(token),
        'expired-callback': () => callbackRef.current(''),
        'error-callback': () => callbackRef.current(''),
      })
      widgetIdRef.current = widgetId
    }

    let script = document.querySelector<HTMLScriptElement>('script[data-ba-turnstile]')
    if (!script) {
      script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.dataset.baTurnstile = 'true'
      document.head.appendChild(script)
    }
    script.addEventListener('load', render)
    render()

    return () => {
      cancelled = true
      script?.removeEventListener('load', render)
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId)
      widgetIdRef.current = undefined
    }
  }, [])

  useEffect(() => {
    if (resetKey && widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current)
      callbackRef.current('')
    }
  }, [resetKey])

  if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    return <p role="alert" className="text-sm text-red-700">This form is temporarily unavailable. Please contact BA Services directly.</p>
  }
  return <div ref={containerRef} className="flex justify-start" />
}
