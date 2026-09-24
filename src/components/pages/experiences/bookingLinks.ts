import type { Cta } from '@/content'
import { getPropertyContent } from '@/content'

/**
 * Real booking destinations for the four experience pages that are NOT on
 * the content layer (photo-audit.md finding 6 / src/content/slugs.ts:
 * canal-bridge, clear-creek-recreation-area, corinth-recreation-area and
 * burlingame-state-park all have bespoke pages, not `sections` content).
 * Copied verbatim from each page's own booking CTA — never invented here.
 */
const BESPOKE_BOOKING: Record<string, Cta> = {
  '/experiences/canal-bridge': { label: 'Book Your Stay', url: 'https://canalbridgeme.com/', kind: 'booking' },
  '/experiences/clear-creek-recreation-area': { label: 'Book on Recreation.gov', url: 'https://www.recreation.gov/camping/campgrounds/231990', kind: 'booking' },
  '/experiences/corinth-recreation-area': { label: 'Book on Recreation.gov', url: 'https://www.recreation.gov/camping/campgrounds/232423', kind: 'booking' },
  '/experiences/burlingame-state-park': { label: 'Reserve Burlingame', url: 'https://www.reserveamerica.com/explore/burlingame-state-park/RI/252711/overview', kind: 'booking' },
}

/**
 * The real "Book" destination for a property page's internal href, for the
 * /experiences index and category card grids (docs/ux-pass/kit-v2.md: "every
 * destination must already exist on the site — never invent a URL").
 *
 * Content-layer properties (bankhead-national-forest, tipsaw, hardin-ridge,
 * yankee-springs, long-lake, meramec, washington, monongahela, indian-celina,
 * hoosier, chief-noonday…) are looked up live, so an edit in the website
 * editor is reflected here too. The four bespoke pages above are hardcoded
 * from their own page source. Anything else falls back to the property's own
 * page — always a real, already-published link, never a guess.
 */
export async function resolveBookingCta(href: string): Promise<Cta> {
  const bespoke = BESPOKE_BOOKING[href]
  if (bespoke) return bespoke

  const slug = href.replace(/^\/(experiences\/)?/, '')
  const content = await getPropertyContent(slug)
  if (content?.ctas.hero) return content.ctas.hero

  return { label: 'View Details', url: href, kind: 'internal' }
}
