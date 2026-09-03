/**
 * Site → manager routing for BA Services.
 *
 * Source: Andrew Dalton, 17 April 2025, "Google Meet Yesterday" — a table of
 * area managers per site. Andrew was asked on 1 Sep 2026 whether it is still
 * current and has not yet confirmed, so treat the addresses as provisional and
 * update them here when he replies. This file is the only place they live.
 */

export interface Manager {
  name: string
  email: string
  role: string
}

// --- UDOT rest areas -------------------------------------------------------

export const UDOT_AREA_MANAGERS = {
  bill: { name: 'Bill Peterson', email: 'Bill@BAServes.com', role: 'Area Manager' },
  frank: { name: 'Frank King', email: 'D.Frank.King.BAS@gmail.com', role: 'Area Manager' },
  chris: { name: 'Chris Harrison', email: 'Chris.Harrison.BAS@gmail.com', role: 'Area Manager' },
} as const satisfies Record<string, Manager>

export type UdotAreaManagerKey = keyof typeof UDOT_AREA_MANAGERS

/** Jay Palmer covers every UDOT rest area alongside the area manager. */
export const UDOT_PROJECT_MANAGER: Manager = {
  name: 'Jay Palmer',
  email: 'Jay@BAServes.com',
  role: 'Project Manager',
}

/**
 * The rest areas offered on the feedback form, in the order they appear in the
 * dropdown. `label` is the submitted value, so it must not be reworded without
 * updating anything that stores past submissions.
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
  { label: 'Lunt Park Northbound - I-15S - Paragonah, Utah', manager: 'chris' },
  { label: 'Lunt Park Southbound - I-15N - Paragonah, Utah', manager: 'chris' },
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

// --- Campgrounds and recreation areas --------------------------------------

/**
 * Used to route employment applications. Labels are what the applicant picks on
 * the careers form, so they read as a person would describe the place.
 */
export const RECREATION_SITES: { label: string; manager: Manager }[] = [
  {
    label: 'Bankhead National Forest — Clear Creek & Corinth',
    manager: { name: 'Tammy Proffitt', email: 'Tammy@BAServes.com', role: 'Area Manager' },
  },
  {
    label: 'Hoosier National Forest — Hardin Ridge, Indian-Celina & Tipsaw Lake',
    manager: { name: 'Karen Arthur', email: 'HardenRidge@outlook.com', role: 'Area Manager' },
  },
  {
    label: 'Monongahela National Forest — Seneca Shadows, Stuart, Big Bend & Spruce Knob Lake',
    manager: { name: 'Pete Hantzis', email: 'SenecaShadowsCG@gmail.com', role: 'Area Manager' },
  },
  {
    label: 'Meramec State Park',
    manager: { name: 'Kevin French', email: 'Kevin@BAServes.com', role: 'Area Manager' },
  },
  {
    label: 'Washington State Park',
    manager: { name: 'Kevin French', email: 'Kevin@BAServes.com', role: 'Area Manager' },
  },
  {
    label: 'Burlingame State Campground',
    manager: { name: 'Luke Gardiner', email: 'Luke@BAServes.com', role: 'Area Manager' },
  },
  {
    label: 'Canal Bridge Campground',
    manager: { name: 'Dallas McCue', email: 'Dallas@BAServes.com', role: 'Owner' },
  },
  {
    label: 'Yankee Springs Recreation Area — Chief Noonday & Long Lake Outdoor Center',
    manager: { name: 'Nathan Nugent', email: 'YankeeSpringsRA@gmail.com', role: 'Area Manager' },
  },
  { label: 'UDOT Rest Areas (Utah)', manager: UDOT_PROJECT_MANAGER },
]

// --- Lookups ---------------------------------------------------------------

/** Andrew asked to be copied on every site's feedback. */
export const ALWAYS_NOTIFY: Manager[] = [
  { name: 'Andrew Dalton', email: 'andrew@baserves.com', role: 'Contract Sales & Marketing' },
]

/**
 * Everyone who should receive feedback about a rest area: the area manager, the
 * UDOT project manager, and Andrew. Returns just the always-notify list when the
 * label is unrecognised, so a renamed dropdown option degrades to "Andrew still
 * gets it" rather than silently emailing nobody.
 */
export function recipientsForRestArea(label: string): Manager[] {
  const entry = REST_AREAS.find(a => a.label === label)
  if (!entry) return [...ALWAYS_NOTIFY]
  return [UDOT_AREA_MANAGERS[entry.manager], UDOT_PROJECT_MANAGER, ...ALWAYS_NOTIFY]
}

/** The manager for a recreation site label, or undefined if it isn't one we map. */
export function managerForSite(label: string | undefined): Manager | undefined {
  if (!label) return undefined
  return RECREATION_SITES.find(s => s.label === label)?.manager
}
