/**
 * The content layer.
 *
 * SERVER ONLY. `getPropertyContent` / `getSiteSettings` are async on purpose:
 * today they only return the built-in defaults, but a later step will fetch an
 * override from the booking admin's API inside `loadPropertyOverride` /
 * `loadSiteOverride` without any page having to change.
 *
 * Kill switch: set CONTENT_OVERRIDES=off to ignore every override and render
 * the built-in defaults. It is a no-op today because there are no overrides.
 */

import type {
  PropertyContent,
  PropertyContentOverride,
  SiteSettings,
  SiteSettingsOverride,
} from './types'

import { siteSettings } from './defaults/site'
import { longLakeOutdoorCenter } from './defaults/long-lake-outdoor-center'
import { chiefNoondayOutdoorCenter } from './defaults/chief-noonday-outdoor-center'
import { yankeeSpringsRecreationArea } from './defaults/yankee-springs-recreation-area'
import { tipsawLakeRecreationArea } from './defaults/tipsaw-lake-recreation-area'
import { hardinRidgeRecreationArea } from './defaults/hardin-ridge-recreation-area'
import { monongahelaNationalForest } from './defaults/monongahela-national-forest'
import { washingtonStatePark } from './defaults/washington-state-park'
import { bankheadNationalForest } from './defaults/bankhead-national-forest'

export * from './types'

/** Every property the content layer knows about, keyed by URL slug. */
const PROPERTY_DEFAULTS: Record<string, PropertyContent> = {
  'tipsaw-lake-recreation-area': tipsawLakeRecreationArea,
  'yankee-springs-recreation-area': yankeeSpringsRecreationArea,
  'hardin-ridge-recreation-area': hardinRidgeRecreationArea,
  'monongahela-national-forest': monongahelaNationalForest,
  'washington-state-park': washingtonStatePark,
  'long-lake-outdoor-center': longLakeOutdoorCenter,
  'chief-noonday-outdoor-center': chiefNoondayOutdoorCenter,
  'bankhead-national-forest': bankheadNationalForest,
}

export const propertySlugs = Object.keys(PROPERTY_DEFAULTS)

// ───────────────────────────── resolve ─────────────────────────────

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Merge an override onto a fallback, field by field.
 *
 * Rules, in order:
 *  - `undefined` or `null`  -> fallback
 *  - empty string, or a string that is only whitespace -> fallback
 *  - empty array -> fallback; a non-empty array REPLACES the fallback whole
 *    (no element-by-element merging: reordering and deletion must be possible)
 *  - plain object -> merged key by key, recursively
 *  - anything else (number, boolean) -> the override wins
 *
 * The consequence that matters: an override that is missing, blank, or
 * unreachable renders exactly what the built-in default renders.
 */
export function resolve<T>(override: unknown, fallback: T): T {
  if (override === undefined || override === null) return fallback

  if (typeof override === 'string') {
    return (override.trim() === '' ? fallback : override) as unknown as T
  }

  if (Array.isArray(override)) {
    return (override.length === 0 ? fallback : override) as unknown as T
  }

  if (isPlainObject(override)) {
    if (!isPlainObject(fallback)) return override as unknown as T
    const merged: Record<string, unknown> = { ...fallback }
    for (const key of Object.keys(override)) {
      merged[key] = resolve(override[key], (fallback as Record<string, unknown>)[key])
    }
    return merged as unknown as T
  }

  return override as unknown as T
}

// ─────────────────────────── override source ───────────────────────────

/** True unless the kill switch is set. Read per call so it is never baked in. */
function overridesEnabled(): boolean {
  return process.env.CONTENT_OVERRIDES !== 'off'
}

/**
 * Where a remote override will come from. Returns undefined today.
 * When this starts fetching it must swallow every error and return undefined
 * on failure, so a dead API renders the built-in defaults rather than nothing.
 */
async function loadPropertyOverride(
  _slug: string,
): Promise<PropertyContentOverride | undefined> {
  return undefined
}

async function loadSiteOverride(): Promise<SiteSettingsOverride | undefined> {
  return undefined
}

// ───────────────────────────── public API ─────────────────────────────

/** The content for one property page, or undefined if the slug is unknown. */
export async function getPropertyContent(
  slug: string,
): Promise<PropertyContent | undefined> {
  const fallback = PROPERTY_DEFAULTS[slug]
  if (!fallback) return undefined
  if (!overridesEnabled()) return fallback
  const override = await loadPropertyOverride(slug)
  return resolve(override, fallback)
}

/** The facts that are the same on every page. */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!overridesEnabled()) return siteSettings
  const override = await loadSiteOverride()
  return resolve(override, siteSettings)
}
