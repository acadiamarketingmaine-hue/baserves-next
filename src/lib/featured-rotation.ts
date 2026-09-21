// Pure, deterministic "Featured Destinations" rotation.
//
// The homepage carousel (src/components/HomeClient.tsx, `allLocations`) used
// to always render in the same fixed alphabetical-by-state order, so the
// first cards a visitor saw (before the carousel's own 6s auto-advance had a
// chance to run) were always the same Alabama/Indiana properties. This
// reorders that same list — same count, same cards, same design — so a
// different destination leads each UTC calendar day, and every destination
// gets a turn in front over a full cycle.
//
// Deterministic by design: given the same UTC date string and the same
// input list, `rotateFeatured` always returns the same order. No RNG, no
// wall-clock reads inside this function — the caller supplies "today" so
// server-rendered HTML and the client hydration pass can agree exactly.

export interface RotatableLocation {
  name: string
  location: string
}

/** Pulls the state abbreviation out of a `location` string like
 *  "Bankhead National Forest, AL" or "Middleville, MI | Yankee Springs".
 *  Falls back to the whole string (grouped as its own bucket) if no
 *  ", XX" pattern is found, so an unexpected format never throws. */
export function stateOf(location: string): string {
  const match = location.match(/,\s*([A-Z]{2})\b/)
  return match ? match[1] : location
}

/** UTC calendar day, formatted YYYY-MM-DD (stable across timezones/DST). */
export function utcDateKey(date: Date): string {
  return date.toISOString().slice(0, 10)
}

/** Small, dependency-free deterministic hash of a date key into a day index. */
function dayIndexFromKey(dateKey: string, cycleLength: number): number {
  if (cycleLength <= 0) return 0
  // Days since the Unix epoch (UTC) — a plain incrementing counter, so the
  // rotation advances by exactly one slot per calendar day rather than
  // jumping around like a hash would.
  const days = Math.floor(Date.parse(`${dateKey}T00:00:00Z`) / 86_400_000)
  return ((days % cycleLength) + cycleLength) % cycleLength
}

/** Interleaves locations round-robin by state (preserving each state's
 *  internal order) so that adjacent entries are rarely the same state —
 *  e.g. [AL, AL, IN, IN, IN, ME, MI, MI, MI, MO, MO, RI] becomes
 *  [AL, IN, ME, MI, MO, RI, AL, IN, MI, MO, IN, MI]. This is the base order
 *  the daily rotation then rotates, so "one day is not all one state" holds
 *  for the leading cards on most days. */
function interleaveByState<T extends RotatableLocation>(locations: T[]): T[] {
  const buckets = new Map<string, T[]>()
  for (const loc of locations) {
    const state = stateOf(loc.location)
    const bucket = buckets.get(state)
    if (bucket) bucket.push(loc)
    else buckets.set(state, [loc])
  }
  const stateGroups = Array.from(buckets.values())
  const interleaved: T[] = []
  let remaining = locations.length
  let round = 0
  while (remaining > 0) {
    for (const group of stateGroups) {
      if (round < group.length) {
        interleaved.push(group[round])
        remaining--
      }
    }
    round++
  }
  return interleaved
}

/**
 * Pure function: (date, locations) -> the same locations, reordered.
 *
 * - Deterministic: same `dateKey` + same `locations` always yields the same
 *   order (no Math.random, no live Date.now() reads).
 * - Every destination gets a turn leading the carousel: the cycle length
 *   equals the number of destinations, so after N days every one has led.
 * - Spreads states: rotates a state-interleaved base order, so adjacent
 *   (and therefore the first-N-visible) cards are rarely the same state.
 * - Same count, same items, same design — a pure reorder, nothing added or
 *   removed, so there's no layout shift.
 */
export function rotateFeatured<T extends RotatableLocation>(
  dateKey: string,
  locations: readonly T[]
): T[] {
  if (locations.length === 0) return []
  const base = interleaveByState(locations as T[])
  const offset = dayIndexFromKey(dateKey, base.length)
  return [...base.slice(offset), ...base.slice(0, offset)]
}
