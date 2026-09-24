/** Icons for the accessibility & reader-control panel. All aria-hidden; the
 * controls around them carry the accessible label/text. */

export function AccessibilityIcon({ className = 'h-6 w-6' }: { className?: string }) {
  // Universal access ("wheelchair in a circle") glyph.
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9.25" />
      <circle cx="12" cy="7.1" r="1.15" fill="currentColor" stroke="none" />
      <path d="M8.3 10.2c1.2.5 2.4.75 3.7.75s2.5-.25 3.7-.75" />
      <path d="M12 10.9v3.1l2.9 3.9" />
      <path d="M12 14 9.1 17.9" />
    </svg>
  )
}

export function CloseIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12.5l5 5L20 7" />
    </svg>
  )
}
