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
import {
  CONTENT_POLICY,
  SITE_SETTINGS_SLUG,
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

export * from './types'
export { resolve } from './resolve'
export { CONTENT_POLICY, SITE_SETTINGS_SLUG } from './overrides'

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
}

export const propertySlugs = Object.keys(PROPERTY_DEFAULTS)

/**
 * The built-in defaults for one slug, with NOTHING merged onto them.
 *
 * For the editor's placeholder endpoint, which has to show a camp what is on
 * the page today rather than what they have already changed it to.
 */
export function propertyDefaults(slug: string): PropertyContent | undefined {
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
 * Why an override could not be used. Each one is logged ONCE per process.
 *
 * A property page that cannot reach the editor cannot reach it for every
 * visitor, and a log line per render turns one broken environment variable
 * into a bill. The first occurrence is worth knowing about; the ten thousandth
 * says nothing the first did not.
 */
type FailureKind = 'unreachable' | 'timeout' | 'status' | 'json' | 'shape' | 'dropped'

const reported = new Set<FailureKind>()

function reportOnce(kind: FailureKind, detail: string): void {
  if (reported.has(kind)) return
  reported.add(kind)
  console.warn(`[content] ${kind}: ${detail} (further "${kind}" reports suppressed)`)
}

/**
 * Fetch one slug's published override, or undefined.
 *
 * Every failure is swallowed deliberately. The caller cannot tell "there is no
 * override" from "we could not get one", and it does not need to: both render
 * the built-in defaults, which is always a correct page.
 */
async function loadOverride(slug: string): Promise<Record<string, unknown> | undefined> {
  const base = overrideBaseUrl()
  if (!base) return undefined

  const url = `${base}/api/site-content/${encodeURIComponent(slug)}`
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), CONTENT_POLICY.fetchTimeoutMs)

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { accept: 'application/json' },
      // The tag is what a publish drops; the interval is what happens when the
      // publish webhook never arrives.
      next: { tags: [contentTag(slug)], revalidate: CONTENT_POLICY.revalidateSeconds },
    })

    if (!response.ok) {
      reportOnce('status', `${url} answered ${response.status}`)
      return undefined
    }

    let body: unknown
    try {
      body = await response.json()
    } catch {
      reportOnce('json', `${url} did not answer JSON`)
      return undefined
    }

    // The contract: { slug, override, publishedAt, version }. An unknown slug
    // and an unpublished page both answer 200 with an empty override, which is
    // not an error on either side.
    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
      reportOnce('shape', `${url} answered something that is not an object`)
      return undefined
    }
    const override = (body as Record<string, unknown>).override
    if (override === undefined || override === null) return undefined
    if (typeof override !== 'object' || Array.isArray(override)) {
      reportOnce('shape', `${url} answered an override that is not an object`)
      return undefined
    }

    // Defence in depth: the editor validated this on the way in, and we do not
    // assume the thing that answered was the editor.
    const hosts = imageHostAllowList(process.env)
    const cleaned =
      slug === SITE_SETTINGS_SLUG
        ? sanitiseSettingsOverride(override, { imageHosts: hosts })
        : sanitisePropertyOverride(override, { imageHosts: hosts })

    if (cleaned.dropped.length > 0) {
      reportOnce('dropped', `${slug} sent fields this site will not render: ${cleaned.dropped.join(', ')}`)
    }
    return cleaned.value
  } catch (error) {
    const aborted = error instanceof Error && error.name === 'AbortError'
    reportOnce(
      aborted ? 'timeout' : 'unreachable',
      aborted ? `${url} took longer than ${CONTENT_POLICY.fetchTimeoutMs}ms` : `${url} could not be reached`,
    )
    return undefined
  } finally {
    clearTimeout(timer)
  }
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
