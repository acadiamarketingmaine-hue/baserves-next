'use client'

import { useEffect, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * All motion for the Lakeside template, ported from the house GSAP runtime
 * (Garden Guys MotionRuntime) and calmed down. Renders nothing.
 *
 * Markers it looks for inside [data-lakeside]:
 *   [data-lk-hero-img]      hero photo wrapper: settles 1.06 -> 1
 *   [data-lk-hero]          hero words and booking card: rise + fade, staggered
 *   [data-lk-hero-title]    the H1: split into lines that rise in turn
 *   [data-reveal="up"]      headers, leads, prose: fade up 20px once
 *   [data-reveal="card"]    card row items: staggered fade up
 *   [data-reveal="wipe"]    small photos: clip-path wipe from the bottom
 *   [data-reveal="fade"]    large photos: soft fade up
 *   [data-count]            purely numeric facts: count up from 0
 *   [data-parallax]         heritage + closing photos: scrubbed yPercent +-6
 *
 * Server HTML shows everything. Hidden states are only ever set here, after
 * hydration, and only on elements that are below the fold at that moment.
 * Reduced motion: no transforms at all, only short (<= 300ms) opacity fades.
 */
export default function LakesideMotion() {
  useIsoLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-lakeside]')
    const html = document.documentElement
    if (!root) {
      html.classList.remove('lk-pre')
      return
    }

    gsap.registerPlugin(ScrollTrigger, SplitText)
    const mm = gsap.matchMedia()
    const splits: SplitText[] = []

    const q = <T extends HTMLElement = HTMLElement>(sel: string) =>
      Array.from(root.querySelectorAll<T>(sel))
    const belowFold = (el: HTMLElement) => el.getBoundingClientRect().top >= window.innerHeight
    // First load: the pre-paint class hid the hero; if the CSS failsafe has already
    // shown it (very slow hydration), don't hide it again. Client-side navigation:
    // this layout effect runs before the first paint, so hiding it is flash-free.
    const heroStillHidden = () => {
      if (!html.classList.contains('lk-pre')) return true
      const first = root.querySelector<HTMLElement>('[data-lk-hero]')
      return !!first && parseFloat(getComputedStyle(first).opacity) < 0.05
    }

    let heroPlayed = false
    root.classList.add('lk-armed')
    root.dataset.motion = 'on'

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (ctx) => {
        const { motion } = ctx.conditions as { motion: boolean; reduce: boolean }
        const heroImg = q('[data-lk-hero-img]')
        const heroBits = q('[data-lk-hero]')
        const heroTitle = root.querySelector<HTMLElement>('[data-lk-hero-title]')
        const doHero = !heroPlayed && heroStillHidden()
        heroPlayed = true

        // ---- 1. Hero entrance -------------------------------------------------
        if (doHero) {
          if (motion) {
            gsap.set(heroImg, { scale: 1.06 })
            gsap.set(heroBits, { autoAlpha: 0, y: 20 })
          } else {
            gsap.set(heroBits, { autoAlpha: 0 })
          }
        }
        // Inline states are in place; the pre-paint CSS can step aside.
        html.classList.remove('lk-pre')

        if (doHero) {
          if (motion) {
            gsap.to(heroImg, { scale: 1, duration: 1.8, ease: 'expo.out', clearProps: 'transform' })
            const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 }, delay: 0.15 })
            heroBits.forEach((el, i) => {
              const at = i * 0.08
              if (el === heroTitle) {
                gsap.set(el, { autoAlpha: 1, y: 0 })
                const split = SplitText.create(el, {
                  type: 'lines',
                  autoSplit: true,
                  onSplit: (self) =>
                    gsap.from(self.lines, {
                      autoAlpha: 0,
                      y: 24,
                      duration: 1.1,
                      stagger: 0.08,
                      ease: 'power3.out',
                      delay: 0.15 + at,
                      // Hand the plain heading back once it has landed.
                      onComplete: () => self.revert(),
                    }),
                })
                splits.push(split)
              } else {
                tl.to(el, { autoAlpha: 1, y: 0, clearProps: 'transform,opacity,visibility' }, at)
              }
            })
          } else {
            gsap.to(heroBits, { autoAlpha: 1, duration: 0.3, ease: 'none', clearProps: 'opacity,visibility' })
          }
        }

        // ---- 2. Scroll reveals (once) ----------------------------------------
        const ups = q('[data-reveal="up"], [data-reveal="fade"]').filter(belowFold)
        ups.forEach((el) => {
          gsap.set(el, motion ? { autoAlpha: 0, y: 20 } : { autoAlpha: 0 })
          ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            once: true,
            onEnter: () =>
              gsap.to(el, {
                autoAlpha: 1,
                y: 0,
                duration: motion ? 1 : 0.3,
                ease: motion ? 'power3.out' : 'none',
                clearProps: 'transform,opacity,visibility',
              }),
          })
        })

        const cards = q('[data-reveal="card"]').filter(belowFold)
        if (cards.length) {
          gsap.set(cards, motion ? { autoAlpha: 0, y: 24 } : { autoAlpha: 0 })
          ScrollTrigger.batch(cards, {
            start: 'top 92%',
            once: true,
            interval: 0.1,
            batchMax: 4,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: motion ? 0.9 : 0.3,
                stagger: motion ? 0.08 : 0,
                ease: motion ? 'power3.out' : 'none',
                overwrite: true,
                clearProps: 'transform,opacity,visibility',
              }),
          })
        }

        // Wipes: photos inside a card ride along with the card in reduced mode.
        const wipes = q('[data-reveal="wipe"]').filter(belowFold)
        if (motion) {
          wipes.forEach((el) => {
            gsap.set(el, { clipPath: 'inset(100% 0% 0% 0% round 6px)' })
            ScrollTrigger.create({
              trigger: el,
              start: 'top 92%',
              once: true,
              onEnter: () =>
                gsap.to(el, {
                  clipPath: 'inset(0% 0% 0% 0% round 6px)',
                  duration: 1.2,
                  ease: 'expo.out',
                  delay: el.closest('[data-reveal="card"]') ? 0.08 : 0,
                  clearProps: 'clipPath',
                }),
            })
          })
        } else {
          const loose = wipes.filter((el) => !el.closest('[data-reveal="card"]'))
          if (loose.length) {
            gsap.set(loose, { autoAlpha: 0 })
            ScrollTrigger.batch(loose, {
              start: 'top 92%',
              once: true,
              onEnter: (batch) =>
                gsap.to(batch, { autoAlpha: 1, duration: 0.3, ease: 'none', clearProps: 'opacity,visibility' }),
            })
          }
        }

        // Count-ups: only purely numeric values; the final text is the original string.
        if (motion) {
          q('[data-count]')
            .filter(belowFold)
            .forEach((el) => {
              const raw = el.dataset.count ?? ''
              if (!/^\d+$/.test(raw)) return
              const end = Number(raw)
              const obj = { n: 0 }
              el.textContent = '0'
              ScrollTrigger.create({
                trigger: el,
                start: 'top 92%',
                once: true,
                onEnter: () =>
                  gsap.to(obj, {
                    n: end,
                    duration: 1.4,
                    ease: 'power2.out',
                    onUpdate: () => {
                      el.textContent = String(Math.round(obj.n))
                    },
                    onComplete: () => {
                      el.textContent = raw
                    },
                  }),
              })
            })
        }

        // ---- 3. Parallax: heritage band + closing photo only ------------------
        if (motion) {
          q('[data-parallax]').forEach((el) => {
            gsap.fromTo(
              el,
              { yPercent: -6 },
              {
                yPercent: 6,
                ease: 'none',
                scrollTrigger: {
                  trigger: el.parentElement ?? el,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.6,
                },
              },
            )
          })
        }

        return () => {
          // Put back any count text a revert might leave mid-count.
          q('[data-count]').forEach((el) => {
            if (el.dataset.count) el.textContent = el.dataset.count
          })
        }
      },
    )

    // Swapped-in web fonts can move trigger positions.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => {
      splits.forEach((s) => s.revert())
      mm.revert()
      root.classList.remove('lk-armed')
      delete root.dataset.motion
    }
  }, [])

  return null
}
