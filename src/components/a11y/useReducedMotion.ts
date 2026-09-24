'use client'

import { useEffect, useState } from 'react'
import { REDUCE_MOTION_EVENT } from './settings'

function readReducedMotion(): boolean {
  if (typeof document === 'undefined') return false
  if (document.documentElement.classList.contains('a11y-reduce-motion')) return true
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * True when the visitor wants less motion — either the OS-level
 * prefers-reduced-motion media query, or our own "Stop animations" panel
 * toggle. Any component driving motion outside CSS (GSAP timelines, rAF
 * count-ups, setInterval carousels, autoplaying video) should read this
 * instead of checking prefers-reduced-motion alone, and include it in a
 * dependency array so it reacts instantly when the toggle flips — no reload.
 *
 * Lazily reads the DOM on first render rather than defaulting to `false`:
 * the panel's inline pre-paint script (src/components/a11y/prepaint.ts) has
 * already set the html class before hydration, so this is accurate
 * immediately. Safe because the value is only ever read inside effects /
 * dependency arrays here, never used to change rendered JSX, so there is no
 * hydration mismatch risk.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(readReducedMotion)

  useEffect(() => {
    const recompute = () => setReduced(readReducedMotion())
    recompute()

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    mq.addEventListener('change', recompute)
    window.addEventListener(REDUCE_MOTION_EVENT, recompute)
    return () => {
      mq.removeEventListener('change', recompute)
      window.removeEventListener(REDUCE_MOTION_EVENT, recompute)
    }
  }, [])

  return reduced
}
