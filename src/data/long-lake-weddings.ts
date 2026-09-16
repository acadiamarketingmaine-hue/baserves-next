// Shared copy and photos for the Long Lake Outdoor Center wedding page drafts
// (/noindex1 and /noindex2). Facts come from the Long Lake wedding packet,
// Elle's Aug 25 2026 pricing email, and the Long Lake property page. Photos are
// from Elle's May 2026 Long Lake shoot.

export const BOOKING_URL = 'https://escape.baserves.com/long-lake-outdoor-center'

const P = '/images/long-lake/weddings/'

export const photos = {
  lakeDock: { src: `${P}lake-dock.jpg`, alt: 'The dock reaching into Long Lake under a blue sky' },
  lakeDockWide: { src: `${P}lake-dock-wide.jpg`, alt: 'Long Lake and its dock from the shore' },
  cabinsLawn: { src: `${P}cabins-lawn.jpg`, alt: 'Cabins along an open lawn under tall pines' },
  pinesCabinTall: { src: `${P}pines-cabin-tall.jpg`, alt: 'A cabin at the foot of tall white pines' },
  pinesCabinTall2: { src: `${P}pines-cabin-tall-2.jpg`, alt: 'Tall pines rising over a cabin' },
  canoesTall: { src: `${P}canoes-tall.jpg`, alt: 'Canoes resting under the pines by the lake' },
  canoesPines: { src: `${P}canoes-pines.jpg`, alt: 'Canoes under the pines at the water' },
  diningHall: { src: `${P}dining-hall.jpg`, alt: 'The dining hall, with timber trusses and a stone fireplace' },
  diningHallTall: { src: `${P}dining-hall-tall.jpg`, alt: 'Timber trusses over the dining hall tables' },
  lodgeChimney: { src: `${P}lodge-chimney.jpg`, alt: 'The lodge and its stone chimney' },
  lodgeFront: { src: `${P}lodge-front.jpg`, alt: 'The front of the lodge' },
  lodgePorch: { src: `${P}lodge-porch.jpg`, alt: 'The long porch of the lodge' },
  cabinPorch: { src: `${P}cabin-porch.jpg`, alt: 'A hill side cabin and its porch' },
  cabinFront: { src: `${P}cabin-front.jpg`, alt: 'A lake side cabin in the woods' },
  fireplaceTall: { src: `${P}fireplace-tall.jpg`, alt: 'Stone fireplace inside the Mansion House' },
  pinePathTall: { src: `${P}pine-path-tall.jpg`, alt: 'A path through the pines' },
  firePit: { src: `${P}fire-pit.jpg`, alt: 'A fire pit outside one of the bunkhouses' },
} as const

export const included = [
  'Exclusive use of the entire property: no other guests, nothing shared',
  'Two nights and three days, with additional nights available on either end',
  'The lodge and dining hall, seating 120 at hand-crafted tables',
  'A full commercial kitchen for your caterer',
  'All 16 cabins and 4 bunkhouses, sleeping up to 120',
  'Lakefront, dock, and wooded grounds for your ceremony',
  'Bath house with hot showers, tiled floors, and lighted vanities',
  'Camp clean-up package',
]

export const tiers = [
  { year: '2026 Weddings', price: '$3,300', note: 'Additional nights $1,050 each' },
  { year: '2027 Weddings', price: '$3,800', note: 'Additional nights $1,500 each' },
  { year: '2028 Weddings', price: '$4,300', note: 'Additional nights $1,500 each' },
]

export const faqs = [
  {
    q: 'How many guests can Long Lake host?',
    a: 'The camp is sized for intimate weddings, with a maximum total capacity of 120. The dining hall seats all 120, and the cabins and bunkhouses together sleep up to 120 on the property.',
  },
  {
    q: 'What does the wedding package include?',
    a: 'Two nights and three days of exclusive use of the entire property (lodge, kitchen, all 16 cabins, all 4 bunkhouses, the bath house, and the grounds) along with the camp clean-up package.',
  },
  {
    q: 'Can we add days before or after?',
    a: 'Yes. Additional nights can be added to either end for setup, a rehearsal, or a slower goodbye: $1,050 per night for 2026 weddings, and $1,500 per night for 2027 and 2028 weddings.',
  },
  {
    q: 'What is the kitchen like for our caterer?',
    a: 'It’s a full commercial kitchen: a six-burner South Bend gas range with a griddle and four ovens, stainless prep counters and island, prep, dish, and hand sinks, a walk-in cooler, pantry, beverage cooler, and a kitchen porch that doubles as a loading dock.',
  },
  {
    q: 'When is Long Lake available?',
    a: 'Long Lake Outdoor Center is a year-round facility. Check the calendar online, or contact us to ask about a specific weekend.',
  },
]

export const history = [
  'The Civilian Conservation Corps built this camp in 1939, and it’s listed on the National Register of Historic Places. Every building on the property is original.',
  'The lodge is timber frame, its vaulted ceiling carried on mortise-and-tenon beams, and the stone in both fireplaces came from right here, quarried and cut on site. The camp sits in a glacial moraine: sandy ridges, mature white pine, hardwoods, and the lake at the center of it.',
  'Decorate it however you like. It’ll still feel like an old-fashioned summer camp, and that’s the whole point.',
]
