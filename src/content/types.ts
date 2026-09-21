/**
 * Content layer types.
 *
 * These describe the content the client is allowed to edit in release 1.
 * Everything here must stay PLAIN and SERIALISABLE: no React nodes, no JSX,
 * no functions, no Dates. A later step will fetch the same shapes as JSON from
 * the booking admin's API and overlay them on the built-in defaults, so any
 * value that cannot survive `JSON.parse(JSON.stringify(x))` does not belong.
 */

/** How a call-to-action's destination should be treated by an editor UI. */
export type CtaKind = 'booking' | 'external' | 'internal'

/** A single image. width/height are only set where the page already has them. */
export interface Photo {
  src: string
  alt: string
  width?: number
  height?: number
}

/** A button or link: its words, its destination, and what kind of thing it is. */
export interface Cta {
  label: string
  url: string
  kind: CtaKind
}

/**
 * One entry in a stats bar.
 * `key` is the stable identifier (also used as the React key).
 * `label` is the exact text rendered today - it is stored verbatim rather than
 * derived, because some pages derive it from the key and some do not.
 */
export interface Stat {
  key: string
  value: string
  label: string
}

/**
 * A dated notice banner. Nothing on the site sets one today: every property
 * ships with an empty `notices` array and the banner slot renders nothing.
 * `startsOn` / `endsOn` are ISO-8601 dates (YYYY-MM-DD).
 */
export interface Notice {
  id: string
  message: string
  severity: 'info' | 'warning' | 'closure'
  startsOn?: string
  endsOn?: string
  href?: string
  linkLabel?: string
}

/** Season / "open" wording, kept separate from prose so it can be edited alone. */
export interface Season {
  isSeasonal: boolean
  /** Short wording, e.g. "Seasonal" or "Year-Round". */
  label?: string
  /** A sentence of season wording, e.g. "Contact us for this season's dates." */
  note?: string
  opensOn?: string
  closesOn?: string
}

/**
 * A repeated card / list item. Deliberately loose: the pages render these in
 * several different shapes and the point of release 1 is that the WORDS are
 * editable, not the layout.
 */
export interface Blurb {
  key: string
  title?: string
  body?: string
  /** Pill text, e.g. "Historic CCC Property". */
  badge?: string
  /** Secondary value, e.g. the "8" in "Sleeps 8". */
  meta?: string
  photo?: Photo
  href?: string
  items?: string[]
}

/** A named block of a page: its headings, its prose, and its repeated items. */
export interface Section {
  heading?: string
  intro?: string
  paragraphs?: string[]
  items?: Blurb[]
}

/** Everything one property page renders that the client may edit in release 1. */
export interface PropertyContent {
  slug: string
  /** The <h1> and the name used in JSON-LD. */
  name: string
  /** The pill above the <h1>. */
  tagline: string
  /** The line beside the map pin, e.g. "Barry County, Michigan". */
  locationLine: string
  /** One-line summary; used as a metadata fallback on some pages. */
  summary: string
  seo: {
    title: string
    description: string
  }
  hero: Photo
  gallery: Photo[]
  /** The descriptive paragraphs of the main "About" block. */
  paragraphs: string[]
  /** The feature / amenity / activity checklist. */
  features: string[]
  stats: Stat[]
  season: Season
  /** Empty today. A non-empty array renders a dated banner. */
  notices: Notice[]
  /** Buttons, keyed by the slot they fill (e.g. "hero", "sidebar", "footer"). */
  ctas: Record<string, Cta>
  /** Named page blocks beyond the shared hero/about/gallery skeleton. */
  sections: Record<string, Section>
  /** Per-property phone, where the page overrides the company number. */
  phone?: string
}

/** The one postal address the company publishes. */
export interface PostalAddress {
  street: string
  locality: string
  region: string
  postalCode: string
  country: string
}

/** Facts that are the same on every page. */
export interface SiteSettings {
  legalName: string
  /** Canonical form, e.g. "207-307-7903". tel: hrefs are built from this. */
  phone: string
  /** How the "Call ..." links read it today, e.g. "+1 207 307-7903". */
  phoneDisplay: string
  /** How JSON-LD states it today, e.g. "+1-207-307-7903". */
  phoneE164: string
  address: PostalAddress
  emails: {
    /** The address the site should present. */
    primary: string
    /**
     * Other company addresses that are live in the codebase today and do NOT
     * agree with `primary`. Recorded, not reconciled - see
     * design-audit/website-editor-inventory.md.
     */
    alternates: string[]
  }
  /** Site-wide banner slot. Empty today. */
  notices: Notice[]
}

/**
 * A partial override arriving from outside (later: the booking admin's API).
 * Every field is optional and every nested object is itself partial.
 */
export type Override<T> = {
  [K in keyof T]?: T[K] extends Array<infer _U>
    ? T[K]
    : T[K] extends object | undefined
      ? Override<NonNullable<T[K]>>
      : T[K]
}

export type PropertyContentOverride = Override<PropertyContent>
export type SiteSettingsOverride = Override<SiteSettings>
