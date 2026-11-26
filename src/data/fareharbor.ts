/**
 * BA Services' FareHarbor booking links, in one place.
 *
 * Every URL here was read off the "Book" buttons on BA's own FareHarbor park
 * sites (meramecpark.com, washingtonstateparkmo.com, canalbridgeme.com) on
 * Nov 26 2026 and answered HTTP 200. The `ref=` tracking parameter those sites
 * add is left off. If FareHarbor renumbers a flow, change it here only; the
 * booking site (escape.baserves.com) keeps the same list in
 * lib/fareharbor-links.ts.
 *
 * Parks that do not book on FareHarbor today (Recreation.gov, ReserveAmerica,
 * escape.baserves.com) are not listed. When BA moves another park onto
 * FareHarbor, add its shortname and flow here as a new entry and point that
 * page's CTA at it.
 */
const FH = 'https://fareharbor.com/embeds/book'

export const FAREHARBOR = {
  meramecpark: {
    site: 'https://www.meramecpark.com/',
    /** Everything Meramec sells (lodging, float trips). */
    all: `${FH}/meramecpark/?full-items=yes`,
    /** "Book Lodging" on meramecpark.com: cabins and the Hickory Ridge Motel. */
    lodging: `${FH}/meramecpark/?full-items=yes&flow=1196329`,
    /** "Make a Reservation" on meramecpark.com/cabins/. */
    cabins: `${FH}/meramecpark/?flow=889002`,
    /** "Make a Reservation" on meramecpark.com/hickory-ridge-motel/. */
    motel: `${FH}/meramecpark/?flow=891015`,
    /** "Book River Floating" on meramecpark.com: canoes, kayaks, rafts. */
    riverFloating: `${FH}/meramecpark/items/305135/?full-items=yes`,
  },
  washingtonstateparkmo: {
    site: 'https://www.washingtonstateparkmo.com/',
    /** "Book Online" on washingtonstateparkmo.com: cabins, float trips, pool. */
    all: `${FH}/washingtonstateparkmo/?full-items=yes&flow=924314`,
    /** "Book Online" on washingtonstateparkmo.com/cabin-rentals/. */
    cabins: `${FH}/washingtonstateparkmo/?full-items=yes&flow=926821`,
  },
  canalbridgeme: {
    site: 'https://canalbridgeme.com/',
    /** "Book Now" on canalbridgeme.com/campsites/. */
    campsites: `${FH}/canalbridgeme/?full-items=yes&flow=1064313`,
  },
} as const
