import { NextResponse } from 'next/server'
import { CONVERTED_SLUGS, propertyDefaults, settingsDefaults, SITE_SETTINGS_SLUG } from '@/content'

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

/**
 * The pages that actually read the content layer, and nothing else.
 *
 * A slug that has defaults here but a bespoke page that ignores them would
 * hand the editor a full set of placeholders for a form whose Save button
 * changes nothing on the live site. Answering 404 is what stops a camp typing
 * into a dead end.
 */
export function generateStaticParams() {
  return [...CONVERTED_SLUGS, SITE_SETTINGS_SLUG].map((slug) => ({ slug }))
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
    // outcome for a slug this site does not render from the content layer.
    //
    // `no-store` matters: a 404 here is a statement about what this deployment
    // has been converted so far, and converting the next page is a deploy, not
    // an hour's wait. A cached 404 would outlive the reason for it.
    return NextResponse.json(
      { error: 'Unknown page' },
      { status: 404, headers: { 'cache-control': 'no-store' } },
    )
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
