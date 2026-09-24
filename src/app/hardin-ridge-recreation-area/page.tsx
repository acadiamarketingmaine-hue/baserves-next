import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { getPropertyContent, getSiteSettings } from '@/content'
import NoticeBanner from '@/content/NoticeBanner'
import {
  CardRow,
  ClosingCta,
  Gallery,
  Hero,
  IconChipList,
  IntroFacts,
  LakesideShell,
  SectionActions,
  SectionHeader,
  StickyBooking,
  bandTint,
  bandWhite,
  body,
  frame,
  h3,
  mapsUrl,
} from '@/components/property/lakeside'

const SLUG = 'hardin-ridge-recreation-area'

// Matches the Hardin Ridge Recreation Area entry in
// src/components/PropertyMap.tsx — the only place this property's
// coordinates are published. Never invent a pair.
const COORDS = { lat: 39.07, lng: -86.47 }

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPropertyContent(SLUG)
  return {
    title: content?.seo.title ? { absolute: content?.seo.title } : undefined,
    description: content?.seo.description,
    alternates: { canonical: '/hardin-ridge-recreation-area' },
    openGraph: og('/hardin-ridge-recreation-area'),
  }
}

const block = 'pb-14 md:pb-24 lg:pb-[120px]'

// Every word and photo below comes from
// src/content/defaults/hardin-ridge-recreation-area.ts. Layout is the
// Lakeside template.
export default async function HardinRidgePage() {
  const content = (await getPropertyContent(SLUG))!
  const settings = await getSiteSettings()
  const { sections, ctas } = content
  const phone = content.phone ?? settings.phone

  const facilities = sections.facilities.items ?? []
  const activities = sections.activities.items ?? []

  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/hardin-ridge-recreation-area"
        name={content.seo.title}
        crumbName={content.name}
        description={content.seo.description}
        image={content.hero.src}
      />
      <NoticeBanner notices={content.notices} />

      <LakesideShell>
        <Hero
          photo={content.hero}
          eyebrow={content.locationLine}
          title={content.name}
          subline={content.tagline}
          booking={{
            title: sections.readyToVisit.heading ?? content.name,
            text: sections.readyToVisit.intro,
            cta: ctas.hero,
            phone,
          }}
        />

        <IntroFacts
          eyebrow={content.tagline}
          eyebrowRule
          heading={sections.about.heading}
          lead={content.summary}
          paragraphs={content.paragraphs}
          facts={content.stats}
        >
          <IconChipList items={content.features} className="mt-8" />
          <SectionActions
            className="mt-8 md:mt-10"
            primary={ctas.hero}
            secondary={[{ label: 'Get directions', url: mapsUrl(COORDS.lat, COORDS.lng), kind: 'external' }]}
          />
        </IntroFacts>

        {/* Camp details: campground facilities, recreation amenities,
            additional features, the surrounding Hoosier National Forest, and
            access and operations — the page's own "Overview" content,
            restyled and stacked, with the second and last ember rule marking
            this fresh start. */}
        <section className={`${block} ${bandWhite} pt-14 md:pt-24 lg:pt-[120px]`}>
          <div className={frame}>
            <SectionHeader eyebrowRule eyebrow={content.tagline} heading={sections.campgroundFacilities.heading ?? 'Campground Facilities'} />
            <div className="grid gap-5 md:grid-cols-2 md:gap-x-12">
              {(sections.campgroundFacilities.paragraphs ?? []).map((p) => (
                <p key={p} className={body}>
                  {p}
                </p>
              ))}
            </div>

            <h3 className={`${h3} mt-16 mb-4 text-lake-ink`}>{sections.recreationAmenities.heading ?? 'Recreation Amenities'}</h3>
            <div className="grid gap-5 md:grid-cols-2 md:gap-x-12">
              {(sections.recreationAmenities.paragraphs ?? []).map((p) => (
                <p key={p} className={body}>
                  {p}
                </p>
              ))}
            </div>

            <h3 className={`${h3} mt-16 mb-4 text-lake-ink`}>{sections.additionalFeatures.heading ?? 'Additional Features'}</h3>
            <div className="grid gap-5 md:grid-cols-2 md:gap-x-12">
              {(sections.additionalFeatures.paragraphs ?? []).map((p) => (
                <p key={p} className={body}>
                  {p}
                </p>
              ))}
            </div>

            <h3 className={`${h3} mt-16 mb-4 text-lake-ink`}>{sections.hoosierCallout.heading ?? 'Hoosier National Forest'}</h3>
            <div className="grid gap-5 md:grid-cols-2 md:gap-x-12">
              {(sections.hoosierCallout.paragraphs ?? []).map((p) => (
                <p key={p} className={body}>
                  {p}
                </p>
              ))}
            </div>

            <h3 className={`${h3} mt-16 mb-4 text-lake-ink`}>{sections.accessAndOperations.heading ?? 'Access and Operations'}</h3>
            <div className="grid gap-5 md:grid-cols-2 md:gap-x-12">
              {(sections.accessAndOperations.paragraphs ?? []).map((p) => (
                <p key={p} className={body}>
                  {p}
                </p>
              ))}
            </div>

            <SectionActions className="mt-12" primary={ctas.sidebar} />
          </div>
        </section>

        {/* Facilities */}
        <section className={`${block} ${bandTint} pt-14 md:pt-24 lg:pt-[120px]`}>
          <div className={frame}>
            <SectionHeader heading={sections.facilities.heading ?? 'Facilities'} intro={sections.facilities.intro} />
            <CardRow columns={2} shape="wide" items={facilities.map((f) => ({ key: f.key, title: f.title, body: f.body, photo: f.photo }))} />
            <SectionActions className="mt-10" primary={ctas.sidebar} />
          </div>
        </section>

        {/* Activities */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader heading={sections.activities.heading ?? 'Activities'} intro={sections.activities.intro} />
            <CardRow columns={3} items={activities.map((a) => ({ key: a.key, title: a.title, body: a.body }))} />
          </div>
        </section>

        {/* Photo Gallery */}
        <section className={`${bandWhite} py-14 md:py-24 lg:py-[120px]`}>
          <div className={frame}>
            <SectionHeader heading={sections.photoGallery.heading ?? 'Photo Gallery'} />
            <Gallery photos={content.gallery} />
          </div>
        </section>

        <ClosingCta
          photo={{ src: '/images/hardin-ridge/overlook.jpg', alt: 'Monroe Lake overlook and interpretive sign at Hardin Ridge' }}
          heading={sections.closingCta.heading ?? content.name}
          text={sections.closingCta.intro}
          primary={ctas.footer}
          phone={phone}
          secondary={ctas.footerForest}
        />
        <StickyBooking name={content.name} cta={ctas.hero} phone={phone} />
      </LakesideShell>

      <Footer />
    </main>
  )
}
