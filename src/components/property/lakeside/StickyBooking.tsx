'use client'

import { useEffect, useState } from 'react'
import type { Cta } from '@/content'
import Arrow from './Arrow'
import { externalProps, telHref } from './styles'

export interface StickyBookingProps {
  /** Short name shown in the desktop pill, e.g. "Long Lake". */
  name: string
  cta: Cta
  phone?: string
}

const phoneIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4h3l1.5 4.5-2 1.2a11 11 0 0 0 6.8 6.8l1.2-2L20 16v3a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z" />
  </svg>
)

/**
 * Appears once the hero has scrolled away and steps aside again when the
 * closing call-to-action comes into view. Desktop: a compact paper pill at the
 * top right, under the site header. Phone: one compact pill bottom-left (Check
 * availability + call), with the Treeko chat button lifted above it.
 * Nothing here is server-rendered as visible, so no-JS pages are unchanged.
 */
export default function StickyBooking({ name, cta, phone }: StickyBookingProps) {
  const [shown, setShown] = useState(false)
  const [top, setTop] = useState(88)

  useEffect(() => {
    const hero = document.querySelector('[data-lk-hero-section]')
    const closing = document.querySelector('[data-lk-closing]')
    if (!hero) return
    let pastHero = false
    let atClosing = false
    const sync = () => setShown(pastHero && !atClosing)

    const heroIo = new IntersectionObserver(([e]) => {
      pastHero = !e.isIntersecting && e.boundingClientRect.top < 0
      sync()
    })
    heroIo.observe(hero)

    // "Reached" stays true once the closing band is on screen or above it.
    const closingIo = new IntersectionObserver(([e]) => {
      atClosing = e.isIntersecting || e.boundingClientRect.top < 0
      sync()
    })
    if (closing) closingIo.observe(closing)

    const header = document.querySelector('header')
    const measure = () => setTop(Math.round((header?.getBoundingClientRect().bottom ?? 72) + 16))
    measure()
    window.addEventListener('resize', measure, { passive: true })

    return () => {
      heroIo.disconnect()
      closingIo.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  // inert keeps the hidden bar out of the tab order (React 18 passes it through as an attribute).
  const hiddenProps = (shown ? {} : { 'aria-hidden': true, inert: '' }) as Record<string, unknown>

  return (
    <>
      {/* Desktop: floating pill under the header. */}
      <div
        data-shown={shown}
        {...hiddenProps}
        style={{ top }}
        className="lk-sticky lk-sticky--top fixed right-6 z-40 hidden items-center gap-1 rounded-full bg-lake-paper/[0.97] py-1.5 pl-5 pr-1.5 text-lake-ink shadow-[0_12px_32px_-12px_rgba(0,0,0,0.35)] ring-1 ring-lake-line md:flex"
      >
        <span className="mr-2 font-lake-serif text-[18px] leading-none">{name}</span>
        {phone && (
          <a
            href={telHref(phone)}
            aria-label={`Call ${phone}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-lake-ink transition-colors hover:bg-lake-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
          >
            {phoneIcon}
          </a>
        )}
        <a
          href={cta.url}
          {...externalProps(cta.url)}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-lake-spruce px-5 text-[15px] font-medium text-lake-paper transition-colors hover:bg-lake-spruce-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
        >
          {cta.label}
          <Arrow className="lk-nudge h-4 w-4" />
        </a>
      </div>

      {/* Phone: one compact pill, bottom-left (John: no full-width phone bottom bar). Treeko keeps bottom-right. */}
      <a
        data-shown={shown}
        {...hiddenProps}
        href={cta.url}
        {...externalProps(cta.url)}
        className="lk-sticky lk-sticky--bottom fixed bottom-[calc(12px+env(safe-area-inset-bottom,0px))] left-4 z-40 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-lake-spruce px-5 text-[15px] font-medium text-lake-paper shadow-[0_12px_28px_-10px_rgba(20,30,24,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce md:hidden"
      >
        {cta.label}
        <Arrow className="h-4 w-4" />
      </a>
    </>
  )
}
