/**
 * Accessibility & reader-control panel settings — pure logic, framework-free
 * so it's directly unit-testable and so the pre-paint bootstrap script
 * (src/components/a11y/prepaint.ts) can mirror it exactly with no imports.
 *
 * Persisted to localStorage (wrapped in try/catch — private browsing /
 * blocked storage must never throw) and applied to <html> as classes plus
 * one CSS custom property (--a11y-zoom) that the page-content wrapper reads
 * for text scaling. See src/app/layout.tsx and src/app/globals.css.
 */

export type TextScale = 1 | 1.125 | 1.25 | 1.5
export type LineSpacing = 'normal' | 'relaxed'

export interface A11ySettings {
  textScale: TextScale
  reduceMotion: boolean
  highContrast: boolean
  underlineLinks: boolean
  lineSpacing: LineSpacing
  readableFont: boolean
}

export const STORAGE_KEY = 'ba-a11y-settings-v1'

/** Fired on `window` whenever reduceMotion changes, so motion sources that
 * live outside React state (GSAP timelines, rAF loops, setInterval
 * carousels) can react instantly without a reload. */
export const REDUCE_MOTION_EVENT = 'a11y:reduce-motion-change'

export const DEFAULT_SETTINGS: A11ySettings = {
  textScale: 1,
  reduceMotion: false,
  highContrast: false,
  underlineLinks: false,
  lineSpacing: 'normal',
  readableFont: false,
}

export const TEXT_SCALES: ReadonlyArray<{ value: TextScale; label: string; description: string }> = [
  { value: 1, label: 'A−', description: 'Text size: default (100%)' },
  { value: 1.125, label: 'A', description: 'Text size: large (112.5%)' },
  { value: 1.25, label: 'A+', description: 'Text size: larger (125%)' },
  { value: 1.5, label: 'A++', description: 'Text size: largest (150%)' },
]

/** Classes applied to <html>. Kept as a flat list so both applySettings()
 * and the standalone prepaint script can clear-then-reapply idempotently. */
export const ALL_TOGGLE_CLASSES = [
  'a11y-reduce-motion',
  'a11y-contrast',
  'a11y-underline-links',
  'a11y-readable-font',
  'a11y-spacing-relaxed',
] as const

export const ZOOM_VAR = '--a11y-zoom'

function isTextScale(value: unknown): value is TextScale {
  return typeof value === 'number' && TEXT_SCALES.some((t) => t.value === value)
}

/** Narrows an unknown (e.g. JSON.parse output) into a valid, complete
 * A11ySettings, falling back to defaults field-by-field so a corrupted or
 * partial localStorage value never produces an invalid state. */
export function sanitizeSettings(value: unknown): A11ySettings {
  const v = (value && typeof value === 'object' ? value : {}) as Record<string, unknown>
  return {
    textScale: isTextScale(v.textScale) ? v.textScale : DEFAULT_SETTINGS.textScale,
    reduceMotion: v.reduceMotion === true,
    highContrast: v.highContrast === true,
    underlineLinks: v.underlineLinks === true,
    lineSpacing: v.lineSpacing === 'relaxed' ? 'relaxed' : 'normal',
    readableFont: v.readableFont === true,
  }
}

export function loadSettings(storage?: Pick<Storage, 'getItem'>): A11ySettings {
  try {
    const store = storage ?? (typeof window === 'undefined' ? undefined : window.localStorage)
    if (!store) return DEFAULT_SETTINGS
    const raw = store.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SETTINGS
    return sanitizeSettings(JSON.parse(raw))
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(settings: A11ySettings, storage?: Pick<Storage, 'setItem'>): void {
  try {
    const store = storage ?? (typeof window === 'undefined' ? undefined : window.localStorage)
    store?.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch {
    // Private mode / blocked storage: settings simply don't persist this session.
  }
}

/** Which toggle classes a settings object implies. */
export function classesFor(settings: A11ySettings): string[] {
  const classes: string[] = []
  if (settings.reduceMotion) classes.push('a11y-reduce-motion')
  if (settings.highContrast) classes.push('a11y-contrast')
  if (settings.underlineLinks) classes.push('a11y-underline-links')
  if (settings.readableFont) classes.push('a11y-readable-font')
  if (settings.lineSpacing === 'relaxed') classes.push('a11y-spacing-relaxed')
  return classes
}

/** Applies `settings` to a document's root element: toggle classes + the
 * zoom custom property. Idempotent — safe to call on every change. Returns
 * whether reduceMotion flipped ON->OFF/OFF->ON vs `previous`, so callers can
 * decide whether to dispatch REDUCE_MOTION_EVENT. */
export function applySettings(settings: A11ySettings, doc: Document = document): void {
  const html = doc.documentElement
  ALL_TOGGLE_CLASSES.forEach((c) => html.classList.remove(c))
  classesFor(settings).forEach((c) => html.classList.add(c))
  html.style.setProperty(ZOOM_VAR, String(settings.textScale))
}
