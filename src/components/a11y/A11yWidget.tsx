'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useReader } from '@/components/reader'
import { AccessibilityIcon, CheckIcon, CloseIcon } from './icons'
import {
  A11ySettings,
  DEFAULT_SETTINGS,
  LineSpacing,
  REDUCE_MOTION_EVENT,
  TEXT_SCALES,
  TextScale,
  applySettings,
  loadSettings,
  saveSettings,
} from './settings'

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean
  onChange: (next: boolean) => void
  label: string
  description?: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full min-h-[44px] items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-lake-tint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
    >
      <span>
        <span className="block text-sm font-medium text-lake-ink">{label}</span>
        {description && <span className="block text-xs text-lake-mute">{description}</span>}
      </span>
      <span
        aria-hidden="true"
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
          checked ? 'bg-lake-spruce' : 'bg-lake-line'
        }`}
      >
        <span
          className={`inline-block transform rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-[22px]' : 'translate-x-[3px]'
          }`}
          style={{ height: 18, width: 18 }}
        />
      </span>
    </button>
  )
}

/**
 * The floating accessibility & reader-control button and its panel.
 * Mounted once from the root layout (src/app/layout.tsx) so it's on every
 * page. Placement: a small round tab on the left edge, vertically centred —
 * see docs/ux-pass/kit-v2.md "Accessibility" section for why (keeps it clear
 * of the bottom-right chat launcher, the bottom-left phone booking pill, and
 * the top-right desktop sticky booking pill at every breakpoint).
 */
export default function A11yWidget() {
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState<A11ySettings>(DEFAULT_SETTINGS)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const reader = useReader()

  // The pre-paint script already applied whatever was persisted, before this
  // component ever rendered. Pick that up into React state once mounted so
  // the panel's controls show the true current state as soon as it can open.
  useEffect(() => {
    setSettings(loadSettings())
  }, [])

  const update = useCallback((patch: Partial<A11ySettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch }
      applySettings(next)
      saveSettings(next)
      if (prev.reduceMotion !== next.reduceMotion) {
        window.dispatchEvent(new CustomEvent(REDUCE_MOTION_EVENT, { detail: { reduceMotion: next.reduceMotion } }))
      }
      return next
    })
  }, [])

  const resetAll = useCallback(() => update(DEFAULT_SETTINGS), [update])

  const close = useCallback(() => {
    setOpen(false)
    launcherRef.current?.focus()
  }, [])

  // Focus the dialog on open; Escape closes; Tab is trapped inside. Same
  // pattern as AssistantPanel's dialog (src/components/AssistantPanel.tsx).
  useEffect(() => {
    if (!open) return
    closeBtnRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      } else if (e.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input, [tabindex]:not([tabindex="-1"])')
        ).filter((el) => !el.hasAttribute('disabled'))
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        const active = document.activeElement
        if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && (active === last || !dialogRef.current.contains(active))) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  const setTextScale = (value: TextScale) => update({ textScale: value })
  const setLineSpacing = (value: LineSpacing) => update({ lineSpacing: value })

  const listenLabel =
    reader.status === 'playing' ? 'Playing' : reader.status === 'paused' ? 'Paused' : 'Not reading'

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label="Accessibility and reading options"
        className="fixed z-40 flex items-center justify-center rounded-full bg-lake-spruce text-lake-paper shadow-[0_10px_24px_-8px_rgba(20,30,24,0.55)] transition-[box-shadow,transform] duration-200 hover:bg-lake-spruce-dark motion-safe:hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
        style={{
          height: 52,
          width: 52,
          left: 'calc(0.5rem + env(safe-area-inset-left, 0px))',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <AccessibilityIcon className="h-6 w-6" />
      </button>

      {open && (
        <div
          id="a11y-panel"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-panel-title"
          // Anchored beside the launcher from `lg` up only (not `md`): the
          // property template's desktop sticky booking pill can run wide —
          // "<name> · call · Book Now" — and at 768-1023px a left-anchored
          // 380px panel would reach far enough right to clip its left edge.
          // The inset bottom sheet has no such ceiling (nothing else lives
          // in that part of the viewport at any width), so it's used all
          // the way up through `lg`.
          className="fixed z-50 flex max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-lake-line bg-lake-paper shadow-2xl left-3 right-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] lg:left-[76px] lg:right-auto lg:top-1/2 lg:bottom-auto lg:w-[380px] lg:max-h-[calc(100vh-2rem)] lg:-translate-y-1/2"
        >
          <div className="flex items-center justify-between bg-lake-spruce px-4 py-3">
            <p id="a11y-panel-title" className="text-sm font-semibold text-lake-paper">
              Accessibility &amp; reading
            </p>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={close}
              aria-label="Close accessibility options"
              className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-lake-paper/80 transition-colors hover:text-lake-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-5 overflow-y-auto p-4">
            {/* Text size */}
            <section>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-lake-mute">Text size</p>
              <div role="group" aria-label="Text size" className="grid grid-cols-4 gap-2">
                {TEXT_SCALES.map((t) => {
                  const active = settings.textScale === t.value
                  return (
                    <button
                      key={t.value}
                      type="button"
                      aria-pressed={active}
                      aria-label={t.description}
                      onClick={() => setTextScale(t.value)}
                      className={`min-h-[44px] rounded-lg border px-1 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce ${
                        active
                          ? 'border-lake-spruce bg-lake-spruce text-lake-paper'
                          : 'border-lake-line bg-white text-lake-ink hover:border-lake-spruce/50'
                      }`}
                    >
                      {t.label}
                    </button>
                  )
                })}
              </div>
            </section>

            {/* Reading tools (Listen) — reuses the Reader's own engine/store. */}
            {reader.supported && (
              <section>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-lake-mute">
                  Reading tools &middot; {listenLabel}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={reader.status === 'idle' ? () => reader.play() : reader.status === 'playing' ? reader.pause : reader.resume}
                    className="min-h-[44px] flex-1 rounded-lg border border-lake-line bg-white px-3 text-sm font-medium text-lake-ink transition-colors hover:border-lake-spruce/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
                  >
                    {reader.status === 'idle' ? 'Listen to this page' : reader.status === 'playing' ? 'Pause' : 'Resume'}
                  </button>
                  <button
                    type="button"
                    onClick={reader.stop}
                    disabled={reader.status === 'idle'}
                    aria-label="Stop reading"
                    className="min-h-[44px] rounded-lg border border-lake-line bg-white px-3 text-sm font-medium text-lake-ink transition-colors hover:border-lake-spruce/50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
                  >
                    Stop
                  </button>
                  <button
                    type="button"
                    onClick={reader.cycleRate}
                    aria-label={`Reading speed ${reader.rate} times. Tap to change speed.`}
                    className="min-h-[44px] rounded-lg border border-lake-line bg-white px-3 text-sm font-medium text-lake-ink transition-colors hover:border-lake-spruce/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
                  >
                    {reader.rate}&times;
                  </button>
                </div>
              </section>
            )}

            {/* Motion */}
            <section>
              <Toggle
                checked={settings.reduceMotion}
                onChange={(v) => update({ reduceMotion: v })}
                label="Stop animations"
                description="Freezes scroll reveals, parallax, auto-playing video and carousels"
              />
            </section>

            {/* Contrast & links */}
            <section className="space-y-1">
              <Toggle
                checked={settings.highContrast}
                onChange={(v) => update({ highContrast: v })}
                label="Higher contrast"
                description="Darker text, stronger borders"
              />
              <Toggle
                checked={settings.underlineLinks}
                onChange={(v) => update({ underlineLinks: v })}
                label="Underline links"
              />
              <Toggle
                checked={settings.readableFont}
                onChange={(v) => update({ readableFont: v })}
                label="Readable font"
                description="Plain system text instead of the headline style"
              />
            </section>

            {/* Line spacing */}
            <section>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-lake-mute">Line spacing</p>
              <div role="group" aria-label="Line spacing" className="grid grid-cols-2 gap-2">
                {(['normal', 'relaxed'] as LineSpacing[]).map((v) => {
                  const active = settings.lineSpacing === v
                  return (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setLineSpacing(v)}
                      className={`flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg border px-2 text-sm font-medium capitalize transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce ${
                        active
                          ? 'border-lake-spruce bg-lake-spruce text-lake-paper'
                          : 'border-lake-line bg-white text-lake-ink hover:border-lake-spruce/50'
                      }`}
                    >
                      {active && <CheckIcon className="h-3.5 w-3.5" />}
                      {v}
                    </button>
                  )
                })}
              </div>
            </section>

            <button
              type="button"
              onClick={resetAll}
              className="min-h-[44px] w-full rounded-lg border border-lake-line bg-white text-sm font-medium text-lake-ink transition-colors hover:border-lake-spruce/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
            >
              Reset all
            </button>
          </div>
        </div>
      )}
    </>
  )
}
