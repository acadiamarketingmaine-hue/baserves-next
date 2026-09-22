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
 *   bankhead-national-forest        src/app/bankhead-national-forest/page.tsx
 *   washington-state-park           src/app/washington-state-park/page.tsx
 *   meramec-state-park              src/app/experiences/meramec-state-park/page.tsx
 *   tipsaw-lake-recreation-area     src/app/tipsaw-lake-recreation-area/page.tsx
 *   hardin-ridge-recreation-area    src/app/hardin-ridge-recreation-area/page.tsx
 *   indian-celina-lakes-recreation-area
 *                                   src/app/indian-celina-lakes-recreation-area/page.tsx
 *   hoosier-national-forest         src/app/hoosier-national-forest/page.tsx
 *   monongahela-national-forest     src/app/monongahela-national-forest/page.tsx
 *   big-bend-campground
 *                                   src/app/monongahela-national-forest/big-bend-campground/page.tsx
 *   jess-judy-group-campground
 *                                   src/app/monongahela-national-forest/jess-judy-group-campground/page.tsx
 *   seneca-shadows-campground
 *                                   src/app/monongahela-national-forest/seneca-shadows-campground/page.tsx
 *   spruce-knob-lake-campground
 *                                   src/app/monongahela-national-forest/spruce-knob-lake-campground/page.tsx
 *   gatewood-group-campground
 *                                   src/app/monongahela-national-forest/gatewood-group-campground/page.tsx
 *   stuart-recreation-area
 *                                   src/app/monongahela-national-forest/stuart-recreation-area/page.tsx
 */
export const CONVERTED_SLUGS: readonly string[] = [
  'long-lake-outdoor-center',
  'yankee-springs-recreation-area',
  'chief-noonday-outdoor-center',
  'bankhead-national-forest',
  'washington-state-park',
  'meramec-state-park',
  'tipsaw-lake-recreation-area',
  'hardin-ridge-recreation-area',
  'indian-celina-lakes-recreation-area',
  'hoosier-national-forest',
  'monongahela-national-forest',
  'big-bend-campground',
  'jess-judy-group-campground',
  'seneca-shadows-campground',
  'spruce-knob-lake-campground',
  'gatewood-group-campground',
  'stuart-recreation-area',
]

/**
 * Which slugs the shared template at src/app/[slug]/page.tsx is allowed to
 * render.
 *
 * `[slug]` is a dynamic route with no generateStaticParams, so it answers for
 * ANY slug the content layer has defaults for. That was harmless while every
 * property either had a bespoke page at /<slug> that won the route or was
 * meant to be served by the template. It stops being harmless the moment the
 * content layer learns about a page whose real URL is somewhere else -
 * /experiences/meramec-state-park, or a campground under
 * /monongahela-national-forest/ - because /<slug> would quietly start
 * answering 200 where it answers 404 today, and the site would have two URLs
 * for the same words with nothing pointing at the second one.
 *
 * So the template renders this list and nothing else. A slug converted in
 * place, on a page of its own, does not belong here.
 *
 * PURE: no imports at all.
 */
export const SLUG_TEMPLATE_SLUGS: readonly string[] = ['chief-noonday-outdoor-center']

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
