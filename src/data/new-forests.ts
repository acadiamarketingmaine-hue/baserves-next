/**
 * Launch gate for the three new U.S. Forest Service contracts (Allegheny,
 * Ozark-St. Francis, Rogue River-Siskiyou).
 *
 * The staged preview BA was promised comes first, so both switches ship OFF.
 *
 *   false: the pages still render at their URLs (so BA can open the preview
 *     link) but carry robots noindex,nofollow, and they are left out of the
 *     main navigation, the footer, the site search, the /experiences list,
 *     sitemap.ts, the careers and leave-a-review location pickers, and the
 *     website assistant's prompt.
 *
 *   true: every one of those places lists them and the pages are indexable.
 *
 * NEW_FORESTS_PUBLIC covers Allegheny, Ozark-St. Francis and White Rock
 * Mountain (January 1, 2027). ROGUE_RIVER_PUBLIC covers Rogue River-Siskiyou,
 * which goes public on its own start date. To go live: change the line to
 * `true`, commit, and push.
 *
 * Not covered by the switch: the home page location list, the map, and the
 * experience category pages.
 *
 * PURE: no imports at all (tests load this file directly).
 */
export const NEW_FORESTS_PUBLIC: boolean = false
export const ROGUE_RIVER_PUBLIC: boolean = false

const ROGUE_RIVER_PATH = '/rogue-river-siskiyou-national-forest'

/** Is this gated page switched on? `override` is for tests. */
function isOpen(path: string, override?: boolean): boolean {
  return override ?? (path === ROGUE_RIVER_PATH ? ROGUE_RIVER_PUBLIC : NEW_FORESTS_PUBLIC)
}

/** Every URL path the gate controls. */
export const NEW_FOREST_PATHS: readonly string[] = [
  '/allegheny-national-forest',
  '/ozark-st-francis-national-forest',
  '/ozark-st-francis-national-forest/white-rock-mountain',
  '/rogue-river-siskiyou-national-forest',
]

/** True when `path` is one of the gated pages. */
export function isNewForestPath(path: string): boolean {
  return NEW_FOREST_PATHS.includes(path)
}

/**
 * Should `path` be listed in navigation, sitemap and pickers? Anything that is
 * not a gated page is always listed.
 */
export function isListed(path: string, isPublic?: boolean): boolean {
  return !isNewForestPath(path) || isOpen(path, isPublic)
}

/** Keep the entries whose `key(item)` path is listed. */
export function onlyListed<T>(items: readonly T[], key: (item: T) => string, isPublic?: boolean): T[] {
  return items.filter((item) => isListed(key(item), isPublic))
}

/**
 * The `robots` field for a gated page's metadata: noindex,nofollow while the
 * gate is closed, and nothing (the site default) once it is open.
 */
export function newForestRobots(path: string, isPublic?: boolean): { index: false; follow: false } | undefined {
  return isListed(path, isPublic) ? undefined : { index: false, follow: false }
}

export interface NewForestState {
  state: string
  icon: string
  name: string
  href: string
  image: string
  blurb: string
  tagline: string
  description: string
  children?: { name: string; href: string; image: string }[]
}

const NEW_FOREST_STATES: readonly NewForestState[] = [
  {
    state: 'Arkansas',
    icon: '/images/states/arkansas.png',
    name: 'Ozark-St. Francis National Forests',
    href: '/ozark-st-francis-national-forest',
    image: '/images/ozark-st-francis/blanchard-springs.jpg',
    blurb: 'White Rock Mountain',
    tagline: 'Mountaintops of the Ozarks',
    description: 'More than 1.2 million acres across Arkansas, with a stone lodge, cabins and campsites on White Rock Mountain',
    children: [
      { name: 'White Rock Mountain', href: '/ozark-st-francis-national-forest/white-rock-mountain', image: '/images/ozark-st-francis/white-rock-overlook-sunset.jpg' },
    ],
  },
  {
    state: 'Oregon',
    icon: '/images/states/oregon.png',
    name: 'Rogue River-Siskiyou National Forest',
    href: '/rogue-river-siskiyou-national-forest',
    image: '/images/rogue-river-siskiyou/fourmile-lake.jpg',
    blurb: 'Oregon and California',
    tagline: 'Southwestern Oregon and California',
    description: 'Nearly 1.8 million acres with eight wilderness areas and six Wild and Scenic Rivers',
  },
  {
    state: 'Pennsylvania',
    icon: '/images/states/pennsylvania.png',
    name: 'Allegheny National Forest',
    href: '/allegheny-national-forest',
    image: '/images/allegheny/willow-bay-boats.jpg',
    blurb: 'Campgrounds and cabins',
    tagline: 'Northwestern Pennsylvania',
    description: 'More than half a million acres with campgrounds and cabins on the Allegheny Reservoir',
  },
]

/** The new forests as the menus and lists should show them: none while the gate is closed. */
export function listedNewForests(isPublic?: boolean): readonly NewForestState[] {
  return NEW_FOREST_STATES.filter((f) => isOpen(f.href, isPublic))
}

/** Merge the listed new states into a menu's state groups, keeping alphabetical order. */
export function withNewForestStates<G extends { state: string }>(
  groups: readonly G[],
  toGroup: (forest: NewForestState) => G,
  isPublic?: boolean,
): G[] {
  const added = listedNewForests(isPublic).map(toGroup)
  if (added.length === 0) return [...groups]
  return [...groups, ...added].sort((a, b) => a.state.localeCompare(b.state))
}
