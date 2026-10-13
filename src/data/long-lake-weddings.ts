// Copy and photos for the Long Lake Outdoor Center wedding page
// (/long-lake-outdoor-center/weddings). Facts come from the Long Lake wedding
// packet, Elle's camp-wedding page (Oct 2026 prices) and the Long Lake property
// page. Property photos are from Elle's May 2026 Long Lake shoot; the wedding
// photos and camp map are from Elle's camp-wedding page.

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
  coupleLakeshore: { src: `${P}couple-lakeshore.jpg`, alt: 'A bride and groom on the grassy shore of Long Lake at sunset' },
  coupleDock: { src: `${P}couple-dock.jpg`, alt: 'A bride and groom kissing beside the dock on Long Lake' },
  brideCabin: { src: `${P}bride-cabin.jpg`, alt: 'A bride under her veil beside a stone-chimney cabin in the pines' },
  canoeVeil: { src: `${P}canoe-veil.jpg`, alt: 'A wedding veil draped across a canoe on the water' },
  brideCanoe: { src: `${P}bride-canoe.jpg`, alt: 'A bride sitting in a canoe at the edge of Long Lake' },
  campMap: { src: `${P}camp-map.jpg`, alt: 'Map of Long Lake Outdoor Center: lakefront ceremony site, cabins 1 to 16, lodge and kitchen, bath house, and the bunkhouses' },
} as const

export const included = [
  'Exclusive use of the entire property: no other guests, nothing shared',
  'Friday at 3pm through Sunday at 11am, with a third day available on either end',
  'The lodge and dining hall, seating 120 at hand-crafted tables',
  'A full commercial kitchen for your caterer',
  'All 16 cabins and 4 bunkhouses, sleeping up to 120',
  'Lakefront, dock, and wooded grounds for your ceremony',
  'Bath house with hot showers, tiled floors, and lighted vanities',
  'Camp clean-up package',
]

export const tiers = [
  { year: 'Wedding weekend, 2027', price: '$3,800', note: 'Friday 3pm setup and rehearsal, Saturday wedding, out by 11am Sunday' },
  { year: 'Wedding weekend, 2028', price: '$4,300', note: 'Friday 3pm setup and rehearsal, Saturday wedding, out by 11am Sunday' },
  { year: 'One evening, 2027', price: '$1,500', note: '3pm arrival, party until midnight, out by 11am' },
  { year: 'Add a third day', price: '$1,500', note: 'Before or after your weekend' },
]

export const faqs = [
  {
    q: 'How many guests can Long Lake host?',
    a: 'The camp is sized for intimate weddings, with a maximum total capacity of 120. The dining hall seats all 120, and the cabins and bunkhouses together sleep up to 120 on the property.',
  },
  {
    q: 'Where do couples get married?',
    a: 'Down at the lake. Vows happen on the lakefront by the dock, with the water and the pines behind you, and the reception moves up to the lodge.',
  },
  {
    q: 'When do we arrive and leave?',
    a: 'A wedding weekend starts Friday at 3pm for setup and the rehearsal, the wedding is Saturday, and everyone heads out by 11am Sunday. A one-evening booking runs 3pm to midnight, and guests can stay over and leave by 11am.',
  },
  {
    q: 'Can we add a day?',
    a: 'Yes. A third day is $1,500, added before or after your weekend for more setup time or a slower goodbye.',
  },
  {
    q: 'What is the kitchen like for our caterer?',
    a: 'It’s a full commercial kitchen: a six-burner South Bend gas range with a griddle and four ovens, stainless prep counters and island, prep, dish, and hand sinks, a walk-in cooler, pantry, beverage cooler, and a kitchen porch that doubles as a loading dock.',
  },
  {
    q: 'When is Long Lake available?',
    a: 'Long Lake Outdoor Center is a seasonal facility. Check the calendar online, or contact us for this season’s opening and closing dates and to ask about a specific weekend.',
  },
]

export const history = [
  'The Civilian Conservation Corps built this camp in 1939, and it’s listed on the National Register of Historic Places. Every building on the property is original.',
  'The lodge is timber frame, its vaulted ceiling carried on mortise-and-tenon beams, and the stone in both fireplaces came from right here, quarried and cut on site. The camp sits in a glacial moraine: sandy ridges, mature white pine, hardwoods, and the lake at the center of it.',
  'Decorate it however you like. It’ll still feel like an old-fashioned summer camp, and that’s the whole point.',
]
