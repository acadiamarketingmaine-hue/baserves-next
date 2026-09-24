'use client'

import { useRef, type MouseEvent, type ReactNode } from 'react'

export interface SmoothDetailsProps {
  className?: string
  /** The <summary> element. */
  summary: ReactNode
  children: ReactNode
}

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

/**
 * A native <details> whose body glides open and closed. Without JS it is a
 * plain <details> and works as normal. With Reduce Motion on, the body just
 * fades (200ms) instead of changing height.
 */
export default function SmoothDetails({ className, summary, children }: SmoothDetailsProps) {
  const ref = useRef<HTMLDetailsElement>(null)
  const body = useRef<HTMLDivElement>(null)
  const anim = useRef<Animation | null>(null)

  const onClick = (e: MouseEvent<HTMLElement>) => {
    const details = ref.current
    const content = body.current
    // Only handle clicks on this details' own summary, not a nested one.
    if (!details || !content || (e.target as HTMLElement).closest('summary') !== details.querySelector(':scope > summary')) return
    if (typeof content.animate !== 'function') return
    // "Stop animations" in the accessibility panel: let the native <details>
    // open and close instantly instead of running the height animation.
    if (document.documentElement.classList.contains('a11y-reduce-motion')) return
    e.preventDefault()

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const wasClosing = details.dataset.closing === 'true'
    const opening = !details.open || wasClosing
    const from = details.open ? content.getBoundingClientRect().height : 0
    anim.current?.cancel()

    if (opening) {
      delete details.dataset.closing
      details.open = true
      const to = content.scrollHeight
      anim.current = reduce
        ? content.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: 'ease-out' })
        : content.animate(
            [
              { height: `${wasClosing ? from : 0}px`, opacity: wasClosing ? 0.5 : 0, overflow: 'hidden' },
              { height: `${to}px`, opacity: 1, overflow: 'hidden' },
            ],
            { duration: Math.min(700, 320 + to * 0.15), easing: EASE },
          )
    } else {
      details.dataset.closing = 'true'
      anim.current = reduce
        ? content.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150, easing: 'ease-in' })
        : content.animate(
            [
              { height: `${from}px`, opacity: 1, overflow: 'hidden' },
              { height: '0px', opacity: 0, overflow: 'hidden' },
            ],
            { duration: Math.min(500, 260 + from * 0.1), easing: EASE },
          )
      anim.current.onfinish = () => {
        details.open = false
        delete details.dataset.closing
      }
    }
  }

  return (
    <details ref={ref} className={className} onClick={onClick}>
      {summary}
      <div ref={body}>{children}</div>
    </details>
  )
}
