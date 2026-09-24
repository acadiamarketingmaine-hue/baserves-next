import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import {
  ClosingCta,
  Gallery,
  Hero,
  IconChipList,
  IntroFacts,
  LakesideShell,
  SectionActions,
  SectionHeader,
  StickyBooking,
  bandWhite,
  frame,
} from '@/components/property/lakeside'

// The company number shown on every property in this template's sidebar
// ("Call +1 207 307-7903"), unchanged.
const COMPANY_PHONE = '+1 207 307-7903'

// Experience data - will be replaced with Sanity CMS
const experiences: Record<string, any> = {
  'canal-bridge': {
    name: 'Canal Bridge Campground',
    tagline: 'Scenic Riverside Camping in Maine',
    description: 'A peaceful family campground on the Saco River',
    longDescription: `Situated along the scenic Saco River in Fryeburg, Maine, Canal Bridge Campground is a family campground offering 36 campsites (including site 30a) plus 5 dedicated tent sites. With direct waterfront access and stunning views of the White Mountains, this location is perfect for those seeking both relaxation and adventure.

Kayakers and canoeists will find easy river access, while anglers can try their luck with the abundant trout and bass. The campground features a bath house that doubles as a storm shelter during severe weather, and firewood and ice are available for purchase at the office or through your camp host. Check-in is at 2:00 PM and check-out is at 12:00 PM. Quiet hours are from 10:00 PM to 7:00 AM, and all children under 17 must be on their campsite by 10:00 PM.

Two vehicles are allowed per campsite, with overflow parking available at the entrance. All pets must be on a leash at all times. Fires are permitted only in fire pits. No fireworks allowed. To make a reservation, call 207.935.2286.`,
    location: 'Fryeburg, ME',
    features: ['Kayaking', 'Fishing', 'Hiking', 'Wildlife Viewing', 'RV & Tent Camping', 'River Access', 'Mountain Views', 'Bath House', 'Pet Friendly'],
    stats: { campsites: '36', tentSites: '5', river: 'Saco River' },
    image: '/images/Canal-Bridge-Entrance-1-2048x1365.jpg',
    gallery: [
      '/images/Canal-Bridge-Entrance-1-2048x1365.jpg',
      '/images/Canal-Bridge-Entrance-10-2048x1365.jpg',
      '/images/Canal-Bridge-Entrance-11-2048x1365.jpg',
      '/images/canal-bridge-bath-house.jpg',
    ],
    bookingUrl: 'tel:+12079352286',
  },
  'corinth-recreation-area': {
    name: 'Corinth Recreation Area',
    tagline: 'Bankhead National Forest Camping',
    description: 'Modern state-of-the-art campground on Lewis Smith Lake',
    longDescription: `Corinth Recreation Area is a modern, state-of-the-art campground located on the shores of Lewis Smith Lake in the Bankhead National Forest. Two camping loops contain 52 campsites with full hookups (electric, water, and sewer), plus 10 tent-only sites. Four bathhouses with warm showers serve the camping areas.

The day-use area features a swimming beach, dressing rooms with warm showers, 29 picnic sites, a reservable 100-person pavilion, and a double-lane boat ramp. The lake provides excellent fishing for Kentucky Spotted Bass and Hybrid Striped Bass. Hikers can access the 1.3-mile Bobwhite Trail, and interpretive programs are hosted during the summer.

Nearby attractions within the Bankhead National Forest include the Little Natural Bridge, the 19th-century Pine Torch Church, and the Houston Civil War Jail. The forest is also home to the Sipsey Wilderness — "The Land of a Thousand Waterfalls."`,
    location: 'Bankhead National Forest, AL',
    features: ['Full Hookup Camping', 'Tent Camping', 'Swimming Beach', 'Boat Ramp', 'Group Pavilion', 'Hiking', 'Fishing', 'ADA Accessible'],
    stats: { sites: '52 + 10 tent', pavilion: '100-person', trail: '1.3 miles' },
    image: '/images/corinth-boat-ramp.jpg',
    gallery: [
      '/images/corinth-campground.jpg',
      '/images/corinth-swimming.jpg',
      '/images/corinth-boat-ramp.jpg',
      '/images/corinth-pavilion.jpg',
      '/images/corinth-camping-loop.jpg',
      '/images/corinth-firefly-loop.jpg',
    ],
    bookingUrl: 'https://www.recreation.gov/camping/campgrounds/232423',
  },
  'meramec-state-park': {
    name: 'Meramec State Park',
    tagline: 'Missouri\'s Scenic State Park',
    description: 'Over 6,800 acres of outdoor adventures along the Meramec River',
    longDescription: `Meramec State Park is one of Missouri's most scenic state parks, spanning more than 6,800 acres along the Meramec River. The park offers exceptional opportunities for hiking, fishing, camping, and paddling.

The campground provides a variety of camping options from basic tent sites to full-hookup RV sites. Visitors can explore miles of trails, paddle the river, or enjoy the park's diverse ecosystems that support abundant wildlife, making it a favorite destination for nature enthusiasts.`,
    location: 'Sullivan, MO',
    features: ['Camping', 'Hiking', 'Canoeing', 'Fishing', 'Swimming', 'Visitor Center'],
    stats: { acres: '6,800+', trails: '16 miles' },
    image: '/images/DSC_0103-2048x1365.jpg',
    gallery: [
      '/images/DSC_0103-2048x1365.jpg',
      '/images/monongahela/spruce-knob-panorama.jpg',
      '/images/DSC_0001-2048x1365.jpg',
    ],
    bookingUrl: 'https://escape.baserves.com',
  },
  'celina-lakes-recreation-area': {
    name: 'Indian-Celina Lakes Recreation Area',
    tagline: 'Twin Lakes in Hoosier National Forest',
    description: 'Peaceful lakeside camping in southern Indiana',
    longDescription: `Indian-Celina Lakes Recreation Area offers a tranquil escape in the heart of Hoosier National Forest. These twin lakes provide excellent fishing opportunities for bass, bluegill, and catfish, while the surrounding forest offers scenic hiking trails.

The campground features well-maintained sites with access to both lakes. Whether you prefer to spend your days fishing from the shore, paddling the calm waters, or exploring the forest trails, Indian-Celina Lakes provides a peaceful retreat from everyday life.`,
    location: 'Hoosier National Forest, IN',
    features: ['Fishing', 'Camping', 'Hiking', 'Boating', 'Wildlife Viewing', 'Picnic Areas', 'Swimming'],
    stats: { lakes: '2', sites: '59', forest: 'Hoosier NF' },
    image: '/images/indian-celina/boat-launch.jpg',
    gallery: [
      '/images/indian-celina/boat-launch.jpg',
      '/images/indian-celina/lake-view.jpg',
      '/images/indian-celina/campsite2.jpg',
      '/images/indian-celina/fall-road.jpg',
    ],
    bookingUrl: 'https://www.recreation.gov/camping/campgrounds/232027',
  },
  'clear-creek-recreation-area': {
    name: 'Clear Creek Recreation Area',
    tagline: 'Alabama\'s Premier Lakeside Campground',
    description: 'The Bankhead National Forest\'s largest recreation area on Lewis Smith Lake',
    longDescription: `Clear Creek Recreation Area is the Bankhead National Forest's largest recreation area, located on the shore of Lewis Smith Lake. With 102 campsites across four loops (Fox, Hoot Owl, Fawn, and Bear), it offers electric and water hookups, five bathhouses with warm showers, and ADA accessible facilities.

The day-use area features a swimming beach, three group shelters, a large picnic area, a double-lane boat ramp, and a children's playground with basketball and volleyball courts. Two group camping units each accommodate up to 25 persons.

Explore the 2.5-mile Raven Interpretive Trail or the 1.25-mile paved bicycle trail. Lewis Smith Lake boasts 500+ miles of shoreline with excellent fishing. Nearby attractions include the Sipsey Wilderness ("The Land of a Thousand Waterfalls"), the Little Natural Bridge, and the historic Pine Torch Church.`,
    location: 'Bankhead National Forest, AL',
    features: ['102 Campsites', 'Swimming Beach', 'Boat Ramp', 'Group Camping', 'Hiking Trails', 'Bicycle Trail', 'Playground', 'ADA Accessible'],
    stats: { campsites: '102', loops: '4', trails: '2', lake: 'Lewis Smith' },
    image: '/images/clear-creek-overview.jpg',
    gallery: [
      '/images/clear-creek-overview.jpg',
      '/images/clear-creek-swimming.jpg',
      '/images/clear-creek-boat-ramp.jpg',
      '/images/clear-creek-shelter.jpg',
      '/images/clear-creek-camping.jpg',
      '/images/clear-creek-hoot-owl-loop.jpg',
    ],
    bookingUrl: 'https://www.recreation.gov/camping/campgrounds/231990',
  },
  'burlingame-state-park': {
    name: 'Burlingame State Park & Campground',
    tagline: 'Rhode Island\'s Premier Camping Destination Since 1934',
    description: '755 campsites, 20 cabins, and a rich history on Watchaug Pond',
    longDescription: `Burlingame State Park encompasses over 3,100 acres in Charlestown, Rhode Island — the state's largest camping facility. Established in 1934 as Rhode Island's first campground, the park has roots dating to 1930 and was shaped by the Civilian Conservation Corps during the Depression era.

The park features 755 campsites across six areas (Main Camp, 400 Area, 500 Area, Legiontown, Mills Camp, and Fish Camp), plus 20 rustic cabins in the Legiontown area. Amenities include a freshwater beach and boat ramp on Watchaug Pond, hiking trails, a playground, recreation center, camp store, athletic field, and basketball and volleyball courts.

Wildlife is abundant: white-tailed deer, river otters, and 80+ nesting bird species including wintering bald eagles on Watchaug Pond. The area north of Buckeye Brook Road provides hunting opportunities along the Pawcatuck River.`,
    location: 'Charlestown, RI',
    features: ['755 Campsites', '20 Rustic Cabins', 'Swimming', 'Fishing', 'Boating', 'Hiking', 'Playground', 'Camp Store', 'Wildlife Viewing'],
    stats: { campsites: '755', cabins: '20', acres: '3,100+', established: '1934' },
    image: '/images/burlingame-entrance-sign.jpg',
    gallery: [
      '/images/burlingame-entrance-sign.jpg',
      '/images/Burlingame1-2048x1365.jpg',
      '/images/Burlingame2-1536x1152.jpg',
      '/images/burlingame-aerial.jpg',
    ],
    bookingUrl: 'https://www.reserveamerica.com/explore/burlingame-state-park/RI/252711/overview',
  },
}

/** "tentSites" -> "Tent Sites" (matches the stat-bar label this template has always shown). */
function humanizeStatKey(key: string): string {
  const spaced = key.replace(/([A-Z])/g, ' $1')
  return spaced
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ')
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const experience = experiences[params.slug]
  if (!experience) {
    return {
      title: { absolute: 'Experience Not Found | BA Services' },
      alternates: { canonical: `/experiences/${params.slug}` },
      openGraph: og(`/experiences/${params.slug}`),
    }
  }
  return {
    title: { absolute: `${experience.name} | BA Services` },
    description: experience.longDescription?.split('\n\n')[0] || experience.description,
    alternates: { canonical: `/experiences/${params.slug}` },
    openGraph: og(`/experiences/${params.slug}`),
  }
}

// NOTE: of the six entries above, only 'celina-lakes-recreation-area' actually
// renders here — every other slug has its own page folder
// (src/app/experiences/<slug>/page.tsx) that Next.js resolves first (see
// docs/ux-pass/photo-audit.md, finding 6). Kept as-is; not this pass's to fix.
export default function ExperiencePage({ params }: { params: { slug: string } }) {
  const experience = experiences[params.slug]

  if (!experience) notFound()

  const [lead, ...paragraphs] = (experience.longDescription as string).split('\n\n')
  const facts = Object.entries(experience.stats as Record<string, string>).map(([key, value]) => ({
    key,
    value,
    label: humanizeStatKey(key),
  }))
  const bookCta = { label: 'Book Your Stay', url: experience.bookingUrl, kind: 'booking' as const }
  const galleryPhotos = (experience.gallery as string[]).map((src, i) => ({
    src,
    alt: `${experience.name} gallery image ${i + 1}`,
  }))

  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url={`/experiences/${params.slug}`}
        routeKey="/experiences/[slug]"
        name={`${experience.name} | BA Services`}
        crumbName={experience.name}
        description={experience.longDescription?.split('\n\n')[0] || experience.description}
        image={experience.image}
        crumbs={[{ name: 'Experiences', url: '/experiences' }]}
      />

      <LakesideShell>
        <Hero
          photo={{ src: experience.image, alt: experience.name }}
          eyebrow={experience.location}
          title={experience.name}
          subline={experience.tagline}
          booking={{
            title: experience.name,
            text: experience.description,
            cta: bookCta,
            phone: COMPANY_PHONE,
          }}
        />

        <IntroFacts eyebrowRule heading="About This Experience" lead={lead} paragraphs={paragraphs} facts={facts}>
          <SectionActions className="mt-8 md:mt-10" primary={bookCta} />
        </IntroFacts>

        {/* Activities & Amenities */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader heading="Activities & Amenities" />
            <IconChipList items={experience.features as string[]} />
          </div>
        </section>

        {galleryPhotos.length > 0 && (
          <section className="py-14 md:py-24 lg:py-[120px]">
            <div className={frame}>
              <SectionHeader heading="Photo Gallery" />
              <Gallery photos={galleryPhotos} />
            </div>
          </section>
        )}

        <ClosingCta
          photo={{ src: experience.image, alt: experience.name }}
          heading={experience.name}
          text={`Book your stay and experience everything ${experience.name} has to offer.`}
          primary={bookCta}
          phone={COMPANY_PHONE}
        />
        <StickyBooking name={experience.name} cta={bookCta} phone={COMPANY_PHONE} />
      </LakesideShell>

      <Footer />
    </main>
  )
}
