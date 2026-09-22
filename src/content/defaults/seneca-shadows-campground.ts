import type { PropertyContent } from '../types'

/**
 * Moved verbatim out of
 * src/app/monongahela-national-forest/seneca-shadows-campground/page.tsx.
 *
 * One of the six Cheat-Potomac campground pages, which all share a single
 * bespoke layout. The page is at /monongahela-national-forest/seneca-shadows-campground,
 * not at /<slug>, so SLUG_TEMPLATE_SLUGS keeps /seneca-shadows-campground answering 404
 * exactly as it does today.
 *
 * `locationLine` is empty and `gallery` is empty because this layout renders
 * neither: the entrance-sign photograph behind the hero (with an empty alt,
 * as a decorative background) is its only image.
 *
 * VERBATIM WART, do not "fix": the SEO description is cut off mid-sentence in
 * the source and really does end that way in the rendered <meta> tag and in
 * the page's JSON-LD. Recorded in design-audit/website-editor-inventory.md.
 */
export const senecaShadowsCampground: PropertyContent = {
  slug: 'seneca-shadows-campground',
  name: 'Seneca Shadows Campground',
  tagline: 'Camp Beneath the Iconic Seneca Rocks',
  locationLine: '',
  summary: 'Seneca Shadows Campground sits in the shadow of the iconic Seneca Rocks — one of the most famous rock climbing destinations in the eastern United States. Locate',
  seo: {
    title: 'Seneca Shadows Campground | Monongahela National Forest | BA Services',
    description: 'Seneca Shadows Campground sits in the shadow of the iconic Seneca Rocks — one of the most famous rock climbing destinations in the eastern United States. Locate',
  },
  hero: {
    src: '/images/monongahela/entrance-sign.jpg',
    alt: '',
  },
  gallery: [],
  paragraphs: [
    'Seneca Shadows Campground is set beneath the dramatic backdrop of Seneca Rocks, one of the most iconic climbing destinations in the eastern United States. Located within the Spruce Knob–Seneca Rocks National Recreation Area and near the North Fork of the South Branch of the Potomac River, the campground offers sweeping views of the 900-foot quartzite formation, visible from many campsites. Surrounded by mountains on both the east and west, the setting provides a striking and immersive Appalachian landscape.',
    'As the newest campground in the recreation area, Seneca Shadows combines modern amenities with exceptional access to outdoor recreation. Visitors are drawn to the area for hiking, rock climbing, fishing, and nature study, with nearby attractions including Seneca Rocks, local cave systems, and scenic river corridors.',
    'The campground accommodates a wide range of camping styles. Facilities include 11 standard sites with electric hookups, 2 double sites with electric, 23 standard non-electric sites, and 2 double non-electric sites. In addition, there are 40 walk-in tent sites and 3 group tent areas. Standard sites are equipped with paved spurs, picnic tables, fire rings, and lantern posts, while drinking water is available throughout the campground. An outdoor amphitheater with lighting, sound equipment, and seating supports interpretive programs and group gatherings.',
    'Sanitary facilities are extensive and include two four-toilet vault restrooms, one double-toilet vault restroom, and four flush restroom buildings with showers. Trash dumpsters are conveniently located throughout the campground for waste disposal. An RV dump station is located adjacent to the host site, and the campground is supported by an on-site wastewater treatment system utilizing a recirculating sand filter.',
    'Seneca Shadows Campground typically operates from early April through late October, aligning with peak seasonal demand.',
  ],
  features: [
    'Views of Seneca Rocks',
    'River access for fishing',
    'Tent and RV sites',
    'Flush restrooms and showers',
    'Seneca Rocks Discovery Center nearby',
    'Rock climbing access',
  ],
  stats: [
    { key: 'sites', value: '52', label: 'Sites' },
    { key: 'landmark', value: 'Seneca Rocks', label: 'Landmark' },
    { key: 'season', value: 'Apr–Nov', label: 'Season' },
  ],
  season: {
    isSeasonal: true,
    note: 'Seneca Shadows Campground typically operates from early April through late October, aligning with peak seasonal demand.',
  },
  notices: [],
  ctas: {
    parentForest: {
      label: 'Monongahela National Forest',
      url: '/monongahela-national-forest',
      kind: 'internal',
    },
    hero: {
      label: 'Book on Recreation.gov',
      url: 'https://www.recreation.gov/camping/campgrounds/232095',
      kind: 'booking',
    },
    reserve: {
      label: 'Reserve Your Site',
      url: 'https://www.recreation.gov/camping/campgrounds/232095',
      kind: 'booking',
    },
    footer: {
      label: 'Book on Recreation.gov',
      url: 'https://www.recreation.gov/camping/campgrounds/232095',
      kind: 'booking',
    },
    footerBack: {
      label: 'Back to Monongahela NF',
      url: '/monongahela-national-forest',
      kind: 'internal',
    },
  },
  sections: {
    about: {
      heading: 'About Seneca Shadows Campground',
    },
    features: {
      heading: 'Features & Amenities',
    },
    closingCta: {
      heading: 'Ready to Visit?',
      intro:
        'Reservations are managed through Recreation.gov. Book your campsite today and experience the Monongahela National Forest.',
    },
  },
}
