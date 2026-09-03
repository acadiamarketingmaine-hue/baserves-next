/**
 * Site → manager routing for BA Services.
 *
 * Recreation-site contacts started from Andrew Dalton, 17 April 2025
 * ("contacts for employee applications"). Operational addresses that the
 * booking system already uses take precedence over that table when they
 * disagree — Yankee Springs is yankee@baserves.com, not the inferred
 * elle@ address, and Washington State Park's on-site manager is Devyn Harmon.
 *
 * Rest-area clusters are Andrew's UDOT table (Bill / Frank / Chris + Jay).
 * Iowa rest areas are not in that table, so they reach Andrew until a
 * manager is named.
 */

export interface Manager {
  name: string
  email: string
  role: string
}

export interface RoutedSite {
  label: string
  manager: Manager
  alsoNotify?: Manager[]
}

function uniqueManagers(managers: Manager[]): Manager[] {
  const seen = new Set<string>()
  return managers.filter(m => {
    const key = m.email.trim().toLowerCase()
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

// --- People ----------------------------------------------------------------

const ANDREW: Manager = {
  name: 'Andrew Dalton',
  email: 'andrew@baserves.com',
  role: 'Contract Sales & Marketing',
}

const JAY: Manager = {
  name: 'Jay Palmer',
  email: 'Jay@BAServes.com',
  role: 'Project Manager',
}

const ELLE: Manager = {
  name: 'Elle Brousseau',
  email: 'Elle@BAServes.com',
  role: 'Site Manager',
}

/** Inbox the booking system already uses for Chief Noonday and Long Lake. */
const YANKEE_INBOX: Manager = {
  name: 'Elle Brousseau',
  email: 'yankee@baserves.com',
  role: 'Site Manager',
}

const KEVIN: Manager = {
  name: 'Kevin French',
  email: 'Kevin@BAServes.com',
  role: 'Area Manager',
}

const DEVYN: Manager = {
  name: 'Devyn Harmon',
  email: 'devyn@washingtonstateparkmo.com',
  role: 'Property Manager',
}

const TAMMY: Manager = {
  name: 'Tammy Proffitt',
  email: 'Tammy@BAServes.com',
  role: 'Area Manager',
}

const KAREN: Manager = {
  name: 'Karen Arthur',
  email: 'HardenRidge@outlook.com',
  role: 'Area Manager',
}

const PETE: Manager = {
  name: 'Pete Hantzis',
  email: 'SenecaShadowsCG@gmail.com',
  role: 'Area Manager',
}

const LUKE: Manager = {
  name: 'Luke Gardiner',
  email: 'Luke@BAServes.com',
  role: 'Area Manager',
}

const DALLAS: Manager = {
  name: 'Dallas McCue',
  email: 'Dallas@BAServes.com',
  role: 'Owner',
}

// --- UDOT rest areas -------------------------------------------------------

export const UDOT_AREA_MANAGERS = {
  bill: { name: 'Bill Peterson', email: 'Bill@BAServes.com', role: 'Area Manager' },
  frank: { name: 'Frank King', email: 'D.Frank.King.BAS@gmail.com', role: 'Area Manager' },
  chris: { name: 'Chris Harrison', email: 'Chris.Harrison.BAS@gmail.com', role: 'Area Manager' },
} as const satisfies Record<string, Manager>

export type UdotAreaManagerKey = keyof typeof UDOT_AREA_MANAGERS

export const UDOT_PROJECT_MANAGER: Manager = JAY

/**
 * Utah rest areas on the feedback form. `label` is the submitted value.
 * Highway letters on Lunt Park match utah-rest-areas.ts (Northbound is I-15 N).
 */
export const REST_AREAS: { label: string; manager: UdotAreaManagerKey }[] = [
  { label: 'Bear Lake - SR-30 - Laketown, Utah', manager: 'bill' },
  { label: 'Bear Lake Overlook - SR-89 - Garden City, Utah', manager: 'bill' },
  { label: 'Brigham City - I-15 - Brigham City, Utah', manager: 'bill' },
  { label: 'Crescent Junction - I-70 - Crescent Junction, Utah', manager: 'frank' },
  { label: 'Echo Canyon Eastbound - I-80S - Coalville, Utah', manager: 'bill' },
  { label: 'Echo Canyon Westbound - I-80N - Echo, Utah', manager: 'bill' },
  { label: 'Grassy Mountain Eastbound - I-80S - Wendover, Utah', manager: 'bill' },
  { label: 'Grassy Mountain Westbound - I-80N - Wendover, Utah', manager: 'bill' },
  { label: "Hoover's - US-89 - Sevier, Utah", manager: 'chris' },
  { label: 'Ivie Creek - I-70 - Salina, Utah', manager: 'frank' },
  { label: 'Jensen Welcome Center - US-40 - Jensen, Utah', manager: 'frank' },
  { label: 'Kanarraville Northbound - I-15N - Cedar City, Utah', manager: 'chris' },
  { label: 'Kanarraville Southbound - I-15S - Cedar City, Utah', manager: 'chris' },
  { label: 'Kane Springs - US-191 - Monticello, Utah', manager: 'frank' },
  { label: 'Lunt Park Northbound - I-15N - Paragonah, Utah', manager: 'chris' },
  { label: 'Lunt Park Southbound - I-15S - Paragonah, Utah', manager: 'chris' },
  { label: 'Mountain Green - I-84 - Morgan, Utah', manager: 'bill' },
  { label: 'Oak Springs - SR-24 - Richfield, Utah', manager: 'chris' },
  { label: 'Perry - I-15 - Perry, Utah', manager: 'bill' },
  { label: 'Pinion Ridge - US-40 - Duchesne, Utah', manager: 'frank' },
  { label: 'Salt Flats Eastbound - I-80N - Wendover, Utah', manager: 'bill' },
  { label: 'Salt Flats Westbound - I-80S - Wendover, Utah', manager: 'bill' },
  { label: 'Shingle Creek - US-89 - Glendale, Utah', manager: 'chris' },
  { label: 'Silver City - US-6 - Jericho Junction, Utah', manager: 'frank' },
  { label: 'The Pines - SR-12 - Bryce Canyon City, Utah', manager: 'chris' },
  { label: 'Thompson Springs - I-70 - Thompson Springs, Utah', manager: 'frank' },
  { label: 'Tie-Fork - US-6 - Spanish Fork, Utah', manager: 'frank' },
  { label: 'Weber Canyon - I-84 - Morgan, Utah', manager: 'bill' },
]

/** Iowa DOT rest areas — not in Andrew's UDOT table, so they reach Andrew only. */
export const IOWA_REST_AREAS: { label: string }[] = [
  { label: 'Sergeant Bluff Northbound - I-29 - Sergeant Bluff, Iowa' },
  { label: 'Sergeant Bluff Southbound - I-29 - Sergeant Bluff, Iowa' },
]

export const ALL_REST_AREAS: { label: string; group: 'Utah' | 'Iowa' }[] = [
  ...REST_AREAS.map(a => ({ label: a.label, group: 'Utah' as const })),
  ...IOWA_REST_AREAS.map(a => ({ label: a.label, group: 'Iowa' as const })),
]

// --- Campgrounds and recreation areas --------------------------------------

/**
 * Employment-application picker. Labels stay grouped the way Andrew's table
 * reads, because that's what applicants pick.
 */
export const RECREATION_SITES: RoutedSite[] = [
  {
    label: 'Bankhead National Forest — Clear Creek & Corinth',
    manager: TAMMY,
  },
  {
    label: 'Hoosier National Forest — Hardin Ridge, Indian-Celina & Tipsaw Lake',
    manager: KAREN,
  },
  {
    label: 'Monongahela National Forest — Seneca Shadows, Stuart, Big Bend & Spruce Knob Lake',
    manager: PETE,
  },
  {
    label: 'Meramec State Park',
    manager: KEVIN,
  },
  {
    label: 'Washington State Park',
    manager: KEVIN,
    alsoNotify: [DEVYN],
  },
  {
    label: 'Burlingame State Campground',
    manager: LUKE,
  },
  {
    label: 'Canal Bridge Campground',
    manager: DALLAS,
  },
  {
    label: 'Yankee Springs Recreation Area — Chief Noonday & Long Lake Outdoor Center',
    manager: YANKEE_INBOX,
    alsoNotify: [ELLE],
  },
  { label: 'UDOT Rest Areas (Utah)', manager: JAY },
]

/**
 * Guest feedback picker — one option per place a guest actually stayed.
 * Chief Noonday and Long Lake are separate properties in the booking system;
 * grouping them forced Yankee Springs guests to pick a combined forest name.
 */
export const CAMPGROUND_SITES: RoutedSite[] = [
  {
    label: 'Chief Noonday Outdoor Center',
    manager: YANKEE_INBOX,
    alsoNotify: [ELLE],
  },
  {
    label: 'Long Lake Outdoor Center',
    manager: YANKEE_INBOX,
    alsoNotify: [ELLE],
  },
  {
    label: 'Meramec State Park',
    manager: KEVIN,
  },
  {
    label: 'Washington State Park',
    manager: DEVYN,
    alsoNotify: [KEVIN],
  },
  {
    label: 'Bankhead National Forest — Clear Creek & Corinth',
    manager: TAMMY,
  },
  {
    label: 'Hoosier National Forest — Hardin Ridge, Indian-Celina & Tipsaw Lake',
    manager: KAREN,
  },
  {
    label: 'Monongahela National Forest — Seneca Shadows, Stuart, Big Bend & Spruce Knob Lake',
    manager: PETE,
  },
  {
    label: 'Burlingame State Campground',
    manager: LUKE,
  },
  {
    label: 'Canal Bridge Campground',
    manager: DALLAS,
  },
]

/**
 * FareHarbor post-stay emails pass `?item=<fareharborItemId>`. These IDs are
 * from the live booking-system units table. Ranges cover cabins added later
 * in the same block.
 */
const WASHINGTON_FAREHARBOR_ITEMS = new Set([
  444753, 444788, 444826, 444830, 444839, 444847, 444854, 444858, 444864, 444867, 444871, 444880,
])

const MERAMEC_FAREHARBOR_ITEMS = new Set([
  305135,
  436319, 436333, 436336, 436337, 436342, 436345, 436347, 436349, 436353, 436357,
  436361, 436363, 436366, 436370, 436376, 436378, 436380, 436382, 436384, 436420,
  436424, 436429, 436434, 436440, 436441, 436442, 436443, 436444, 436445, 436446,
  436447, 436449, 436450, 436451, 436452, 436453, 436454, 436455, 436458,
  439069, 439072, 439074, 685309,
])

export function siteForFareharborItem(item: string | null): string | undefined {
  if (!item) return undefined
  const id = Number(item)
  if (!Number.isFinite(id)) return undefined
  if (WASHINGTON_FAREHARBOR_ITEMS.has(id) || (id >= 444753 && id <= 444880)) {
    return 'Washington State Park'
  }
  if (MERAMEC_FAREHARBOR_ITEMS.has(id) || (id >= 436319 && id <= 439074) || id === 305135 || id === 685309) {
    return 'Meramec State Park'
  }
  return undefined
}

// --- Lookups ---------------------------------------------------------------

export const ALWAYS_NOTIFY: Manager[] = [ANDREW]

function matchRestAreaLabel(haystack: string, submitted: string): boolean {
  if (haystack === submitted) return true
  // Contact-form short names: "Bear Lake" matches "Bear Lake - SR-30 - ..."
  // and not "Bear Lake Overlook".
  if (haystack.startsWith(`${submitted} -`)) return true
  // Old Lunt Park labels had I-15N/S swapped; still route by the place name.
  return haystack.split(' - ')[0] === submitted.split(' - ')[0]
}

/**
 * Everyone who should receive feedback about a rest area.
 * Utah: area manager + Jay + Andrew. Iowa: Andrew, until a manager is named.
 * Unrecognised labels still reach Andrew rather than nobody.
 */
export function recipientsForRestArea(label: string): Manager[] {
  const utah = REST_AREAS.find(a => matchRestAreaLabel(a.label, label))
  if (utah) {
    return uniqueManagers([UDOT_AREA_MANAGERS[utah.manager], JAY, ANDREW])
  }
  const iowa = IOWA_REST_AREAS.find(a => matchRestAreaLabel(a.label, label))
  if (iowa) return [ANDREW]
  return [ANDREW]
}

/** The manager for a recreation site label, or undefined if it isn't one we map. */
export function managerForSite(label: string | undefined): Manager | undefined {
  if (!label) return undefined
  return RECREATION_SITES.find(s => s.label === label)?.manager
}

function recipientsForRoutedSite(site: RoutedSite | undefined): Manager[] {
  if (!site) return [...ALWAYS_NOTIFY]
  return uniqueManagers([site.manager, ...(site.alsoNotify || []), ...ALWAYS_NOTIFY])
}

/**
 * Everyone who should receive an employment application for a recreation site:
 * its area manager, any extra on-site contacts, plus the office list the
 * careers route adds separately.
 */
export function extraRecipientsForSite(label: string | undefined): Manager[] {
  if (!label) return []
  const site = RECREATION_SITES.find(s => s.label === label)
  return site?.alsoNotify || []
}

/**
 * Everyone who should receive feedback about a campground or park: its
 * manager, any extra on-site contacts, and Andrew.
 */
export function recipientsForSite(label: string): Manager[] {
  return recipientsForRoutedSite(CAMPGROUND_SITES.find(s => s.label === label))
}
