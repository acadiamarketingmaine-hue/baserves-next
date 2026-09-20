import type { Metadata } from 'next'

/** Canonical site origin (apex, https, no trailing slash). */
export const SITE_URL = 'https://baserves.com'

/** Site-wide OG image, rendered by app/opengraph-image.tsx. */
const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'BA Services - Recreation Area Management & Outdoor Experiences',
}

/**
 * Per-page Open Graph block. Next.js replaces (not merges) a parent
 * `openGraph` object, so every inner page must supply its own `url`
 * (or it inherits the homepage's og:url from the root layout) and its
 * own image (the file-based opengraph-image only merges at the root).
 * Title/description are inherited from the page's own metadata.
 */
export function og(path: string): NonNullable<Metadata['openGraph']> {
  return {
    url: path,
    siteName: 'BA Services',
    locale: 'en_US',
    type: 'website',
    images: [OG_IMAGE],
  }
}
