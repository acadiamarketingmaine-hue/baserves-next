import { getPropertyContent } from '@/content'

/**
 * The six Cheat-Potomac campground pages under /monongahela-national-forest.
 * Each slug matches both its content-layer key and its URL segment
 * (/monongahela-national-forest/<slug>) — see src/content/defaults/*-campground.ts
 * and src/content/defaults/stuart-recreation-area.ts.
 */
export const CAMPGROUND_SLUGS = [
  'big-bend-campground',
  'gatewood-group-campground',
  'jess-judy-group-campground',
  'seneca-shadows-campground',
  'spruce-knob-lake-campground',
  'stuart-recreation-area',
] as const

export interface SiblingCampground {
  slug: string
  name: string
  tagline: string
  href: string
  /** The campground's own first published stat (e.g. "46 Sites"), if it has one. */
  stat?: { value: string; label: string }
}

/**
 * The other five campground pages, for the "more campgrounds" links each
 * campground page and the forest index carry (kit-v2.md: "each campground
 * should link back and to its siblings"). Reads each sibling's own published
 * content through the same content layer every page on the site already
 * uses — real, existing words, nothing invented.
 */
export async function getSiblingCampgrounds(currentSlug: string): Promise<SiblingCampground[]> {
  const others = CAMPGROUND_SLUGS.filter((slug) => slug !== currentSlug)
  const siblings = await Promise.all(
    others.map(async (slug): Promise<SiblingCampground | null> => {
      const content = await getPropertyContent(slug)
      if (!content) return null
      const [stat] = content.stats
      return {
        slug,
        name: content.name,
        tagline: content.tagline,
        href: `/monongahela-national-forest/${slug}`,
        stat,
      }
    }),
  )
  return siblings.filter((s): s is SiblingCampground => s !== null)
}
