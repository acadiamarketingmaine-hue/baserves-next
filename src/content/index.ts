/**
 * The content layer.
 *
 * SERVER ONLY. `getPropertyContent` / `getSiteSettings` fetch a published
 * override from the website editor and merge it onto the built-in defaults.
 *
 * The one rule this file exists to keep: THE SITE NEVER BREAKS BECAUSE THE
 * EDITOR IS DOWN. An unset `CONTENT_API_URL`, a dead host, a timeout, a 500, a
 * body that is not JSON, a body that is JSON but the wrong shape, and a field
 * that fails validation all end the same way — the built-in default renders.
 * There is no code path here that can throw into a page.
 *
 * Kill switch: set CONTENT_OVERRIDES=off to ignore every override and render
 * the built-in defaults, without redeploying and without unsetting anything
 * else.
 *
 * Caching: each fetch is tagged `content:<slug>` and revalidates on the policy
 * interval. A publish calls POST /api/revalidate, which drops that one tag and
 * the change is live in seconds; if that webhook never arrives, the interval
 * picks it up anyway.
 */

import type { PropertyContent, SiteSettings } from './types'

import { resolve } from './resolve'
import { CONVERTED_SLUGS, SITE_SETTINGS_SLUG } from './slugs'
import { loadOverrideWith, type FailureKind } from './fetch-override'
import {
  CONTENT_POLICY,
  imageHostAllowList,
  sanitisePropertyOverride,
  sanitiseSettingsOverride,
} from './overrides'
import { siteSettings } from './defaults/site'
import { longLakeOutdoorCenter } from './defaults/long-lake-outdoor-center'
import { chiefNoondayOutdoorCenter } from './defaults/chief-noonday-outdoor-center'
import { yankeeSpringsRecreationArea } from './defaults/yankee-springs-recreation-area'
import { tipsawLakeRecreationArea } from './defaults/tipsaw-lake-recreation-area'
import { hardinRidgeRecreationArea } from './defaults/hardin-ridge-recreation-area'
import { monongahelaNationalForest } from './defaults/monongahela-national-forest'
import { washingtonStatePark } from './defaults/washington-state-park'
import { bankheadNationalForest } from './defaults/bankhead-national-forest'
import { meramecStatePark } from './defaults/meramec-state-park'

export * from './types'
export { resolve } from './resolve'
export { CONTENT_POLICY } from './overrides'
export { CONVERTED_SLUGS, SLUG_TEMPLATE_SLUGS, SITE_SETTINGS_SLUG, isEditableSlug } from './slugs'

/** The cache tag a slug's fetched override is filed under. */
export function contentTag(slug: string): string {
  return `content:${slug}`
}

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
  'meramec-state-park': meramecStatePark,
}

/**
 * The built-in defaults for one slug, with NOTHING merged onto them.
 *
 * For the editor's placeholder endpoint, which has to show a camp what is on
 * the page today rather than what they have already changed it to. Only the
 * converted pages answer: a placeholder for a page that would ignore the edit
 * is worse than no placeholder at all.
 */
export function propertyDefaults(slug: string): PropertyContent | undefined {
  if (!CONVERTED_SLUGS.includes(slug)) return undefined
  return PROPERTY_DEFAULTS[slug]
}

/** The built-in site settings, with nothing merged onto them. */
export function settingsDefaults(): SiteSettings {
  return siteSettings
}

// ─────────────────────────── override source ───────────────────────────

/** True unless the kill switch is set. Read per call so it is never baked in. */
function overridesEnabled(): boolean {
  return process.env.CONTENT_OVERRIDES !== 'off'
}

/** The editor's public read API, or undefined when none is configured. */
function overrideBaseUrl(): string | undefined {
  const configured = process.env.CONTENT_API_URL?.trim()
  if (!configured) return undefined
  return configured.replace(/\/+$/, '')
}

/**
 * Each kind of failure is logged ONCE per process.
 *
 * A property page that cannot reach the editor cannot reach it for any
 * visitor, and a log line per render turns one broken environment variable
 * into a bill. The first occurrence is worth knowing about; the ten thousandth
 * says nothing the first did not.
 */
const reported = new Set<FailureKind>()

function reportOnce(kind: FailureKind, detail: string): void {
  if (reported.has(kind)) return
  reported.add(kind)
  console.warn(`[content] ${kind}: ${detail} (further "${kind}" reports suppressed)`)
}

/**
 * The last answer the editor gave us for a slug, per instance.
 *
 * Why this exists rather than "on failure, render the defaults" is written out
 * in fetch-override.ts. Short version: Next only caches 200s, so without this
 * an editor outage silently un-publishes every edit a camp has made — a live
 * closure notice included — and the page looks fine while saying the wrong
 * thing.
 */
const lastGood = new Map<string, Record<string, unknown>>()

/** Test seam and operational escape hatch: forget every remembered answer. */
export function forgetLastGoodOverrides(): void {
  lastGood.clear()
  reported.clear()
}

/** Today's override if we can get it, the last good one if we cannot. */
async function loadOverride(slug: string): Promise<Record<string, unknown> | undefined> {
  const base = overrideBaseUrl()
  if (!base) return undefined

  const hosts = imageHostAllowList(process.env)
  return loadOverrideWith({
    slug,
    url: `${base}/api/site-content/${encodeURIComponent(slug)}`,
    timeoutMs: CONTENT_POLICY.fetchTimeoutMs,
    // The tag is what a publish drops; the interval is what happens when the
    // publish webhook never arrives.
    next: { tags: [contentTag(slug)], revalidate: CONTENT_POLICY.revalidateSeconds },
    sanitise: (input) =>
      slug === SITE_SETTINGS_SLUG
        ? sanitiseSettingsOverride(input, { imageHosts: hosts })
        : sanitisePropertyOverride(input, { imageHosts: hosts }),
    fetchImpl: fetch,
    report: reportOnce,
    lastGood,
  })
}

// ───────────────────────────── public API ─────────────────────────────

/** The content for one property page, or undefined if the slug is unknown. */
export async function getPropertyContent(
  slug: string,
): Promise<PropertyContent | undefined> {
  const fallback = PROPERTY_DEFAULTS[slug]
  if (!fallback) return undefined
  if (!overridesEnabled()) return fallback
  const override = await loadOverride(slug)
  return resolve(override, fallback)
}

/** The facts that are the same on every page. */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!overridesEnabled()) return siteSettings
  const override = await loadOverride(SITE_SETTINGS_SLUG)
  return resolve(override, siteSettings)
}
