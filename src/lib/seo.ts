import type { Metadata } from 'next'

/** Canonical site origin (apex, https, no trailing slash). */
export const SITE_URL = 'https://baserves.com'

/**
 * Per-page Open Graph block. Next.js replaces (not merges) a parent
 * `openGraph` object, so every inner page must supply its own `url`
 * or it inherits the homepage's og:url from the root layout.
 * Title/description are inherited from the page's own metadata and
 * the image comes from the file-based app/opengraph-image.tsx.
 */
export function og(path: string): NonNullable<Metadata['openGraph']> {
  return {
    url: path,
    siteName: 'BA Services',
    locale: 'en_US',
    type: 'website',
  }
}
