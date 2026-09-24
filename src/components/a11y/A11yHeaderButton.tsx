'use client'

import { useRef } from 'react'
import { AccessibilityIcon } from './icons'
import { PANEL_ID, useA11yPanelTrigger } from './A11yWidget'

export interface A11yHeaderButtonProps {
  /** Icon-only with an aria-label, for the mobile header row — mirrors
   * ReaderButton's `compact` prop exactly (same size, same slot). */
  compact?: boolean
  className?: string
}

/**
 * Site header trigger for the accessibility & reader-control panel — sits
 * next to ReaderButton's headphones icon. Only needed below the `2xl`
 * breakpoint, where the floating launcher (A11yWidget) hides itself because
 * its fixed left-edge position lands on top of page content on some pages
 * at those widths (see docs/ux-pass/kit-v2.md "Accessibility"); `2xl:hidden`
 * here is the other half of that same threshold. Opens the exact same
 * dialog the floating launcher does, via useA11yPanelTrigger() — one panel,
 * two possible triggers.
 */
export default function A11yHeaderButton({ compact = false, className = '' }: A11yHeaderButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const panel = useA11yPanelTrigger()
  if (!panel) return null

  const onClick = () => panel.toggle(ref.current)

  if (compact) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        aria-haspopup="dialog"
        aria-expanded={panel.open}
        aria-controls={PANEL_ID}
        aria-label="Accessibility and reading options"
        data-a11y-trigger="header"
        className={`2xl:hidden p-3 text-gray-700 transition-colors ${className}`}
      >
        <AccessibilityIcon className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={panel.open}
      aria-controls={PANEL_ID}
      aria-label="Accessibility and reading options"
      data-a11y-trigger="header"
      className={`2xl:hidden flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-500 transition-colors hover:border-gray-300 hover:text-forest-DEFAULT ${className}`}
    >
      <AccessibilityIcon className="h-4 w-4" />
      <span className="hidden xl:inline">Accessibility</span>
    </button>
  )
}
