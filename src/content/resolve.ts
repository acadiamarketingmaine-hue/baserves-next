/**
 * Merging an override onto the built-in defaults.
 *
 * Lifted out of `index.ts` so that it has no runtime imports at all: it is a
 * pure function over plain data, it is the one rule the whole content layer
 * turns on, and a file with nothing but pure functions in it can be loaded by
 * the test runner without pulling a Next.js page graph in behind it.
 * `index.ts` re-exports it, so nothing that imported `resolve` from
 * `@/content` has to change.
 */

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
