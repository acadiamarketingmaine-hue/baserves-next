/**
 * Which pages the website editor may actually publish to.
 *
 * One list, and everything facing the editor derives from it: the placeholder
 * endpoint, the publish webhook, and anything else that advertises what can be
 * edited.
 *
 * It is deliberately NOT "every property the content layer has defaults for".
 * The content layer holds defaults for all eight properties; only three PAGES
 * render from it. The other five have bespoke pages with their copy written
 * into the JSX, so an override published against one of them would validate,
 * store, and change nothing on the live site — a camp typing into a box that
 * does nothing, and finding out by looking at their own page. Advertising a
 * page we cannot actually change is the worst failure available here, because
 * it is the one nobody gets an error about.
 *
 * When a page is converted to read from `getPropertyContent`, add its slug
 * here in the same commit. That is the whole ceremony.
 *
 * PURE: no imports at all.
 */

/**
 *   long-lake-outdoor-center        src/app/long-lake-outdoor-center/page.tsx
 *   yankee-springs-recreation-area  src/app/yankee-springs-recreation-area/page.tsx
 *   chief-noonday-outdoor-center    src/app/[slug]/page.tsx
 */
export const CONVERTED_SLUGS: readonly string[] = [
  'long-lake-outdoor-center',
  'yankee-springs-recreation-area',
  'chief-noonday-outdoor-center',
]

/** The reserved slug the site-wide settings live under. */
export const SITE_SETTINGS_SLUG = '_settings'

/**
 * Is this a page the editor may publish to today?
 *
 * `_settings` counts: the site-wide facts are read by the converted pages, so
 * an edit to them does reach the live site.
 */
export function isEditableSlug(slug: string): boolean {
  return slug === SITE_SETTINGS_SLUG || CONVERTED_SLUGS.includes(slug)
}
