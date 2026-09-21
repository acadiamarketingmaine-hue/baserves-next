import { NextResponse } from 'next/server'
import { propertyDefaults, propertySlugs, settingsDefaults, SITE_SETTINGS_SLUG } from '@/content'

/**
 * What this site would render if nobody had overridden anything.
 *
 * The website editor fetches this (booking-system `lib/site-defaults.ts`,
 * `SITE_DEFAULTS_URL` + `/<slug>`) so that every box in the form can show
 * today's wording as a placeholder, and so that clearing a box visibly puts
 * the built-in text back. Without it the editor still works; the placeholders
 * just go quiet.
 *
 * Two things are deliberately true of the response:
 *
 *   * It is exactly the RELEASE-1 EDITABLE FIELDS and nothing else. The slug,
 *     the page name, the SEO block and the hand-built page sections are not
 *     editable, so they are not here — a placeholder for a box that does not
 *     exist is at best confusing and at worst an invitation.
 *   * It is a flat object shaped like an override, because that is what the
 *     editor lays the saved override on top of.
 *
 * All of this is already public: it is the words and the photographs on a page
 * anybody can open. That is not a reason to be careless — no environment, no
 * internal notes, no list of what has been published — but it is the reason
 * this needs no authentication and can be cached hard at the edge.
 */

export const runtime = 'nodejs'
/** Defaults change when this repository is deployed, which is rarely. */
export const revalidate = 3600

/** Prerender the slugs this site knows about; anything else is a 404. */
export function generateStaticParams() {
  return [...propertySlugs, SITE_SETTINGS_SLUG].map((slug) => ({ slug }))
}

const CACHE_CONTROL = 'public, s-maxage=3600, stale-while-revalidate=86400'

export function GET(_request: Request, { params }: { params: { slug: string } }) {
  if (params.slug === SITE_SETTINGS_SLUG) {
    const site = settingsDefaults()
    return NextResponse.json(
      {
        phone: site.phone,
        phoneDisplay: site.phoneDisplay,
        phoneE164: site.phoneE164,
        address: site.address,
        emails: site.emails,
        notices: site.notices,
      },
      { headers: { 'cache-control': CACHE_CONTROL } },
    )
  }

  const content = propertyDefaults(params.slug)
  if (!content) {
    // The editor reads any non-200 as "no placeholders", which is the right
    // outcome for a slug this site does not have.
    return NextResponse.json({ error: 'Unknown page' }, { status: 404 })
  }

  return NextResponse.json(
    {
      tagline: content.tagline,
      summary: content.summary,
      hero: content.hero,
      gallery: content.gallery,
      paragraphs: content.paragraphs,
      features: content.features,
      stats: content.stats,
      season: content.season,
      notices: content.notices,
      ctas: content.ctas,
    },
    { headers: { 'cache-control': CACHE_CONTROL } },
  )
}
