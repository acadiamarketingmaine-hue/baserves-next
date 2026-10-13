import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Cormorant_Garamond, EB_Garamond, Pinyon_Script } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { BOOKING_URL, photos, included, tiers, faqs, history } from '@/data/long-lake-weddings'
import { og } from '@/lib/seo'
import s from './weddings.module.css'

const cormorant = Cormorant_Garamond({
  weight: ['500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
})

const garamond = EB_Garamond({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-garamond',
})

const pinyon = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pinyon',
})

const PATH = '/long-lake-outdoor-center/weddings'

export const metadata: Metadata = {
  title: { absolute: 'Weddings at Long Lake Outdoor Center | Yankee Springs, Michigan' },
  description:
    'A rustic lakeside camp wedding venue in Yankee Springs, Michigan, between Grand Rapids and Kalamazoo. Say your vows at the lake, celebrate in the 1939 lodge, and keep up to 120 guests in the cabins. Weekends from $3,800.',
  alternates: { canonical: PATH },
  openGraph: { ...og(PATH), images: [photos.coupleLakeshore.src] },
}

type Pic = { src: string; alt: string }

function Photo({ pic, className, sizes }: { pic: Pic; className: string; sizes: string }) {
  return (
    <div className={`${s.photo} ${className}`}>
      <Image src={pic.src} alt={pic.alt} fill sizes={sizes} />
    </div>
  )
}

function Arch({ pic, caption, priority }: { pic: Pic; caption?: string; priority?: boolean }) {
  return (
    <div className={s.archSticky}>
      <div className={s.archWrap}>
        <div className={s.arch}>
          <Image src={pic.src} alt={pic.alt} fill sizes="(max-width: 1040px) 340px, 340px" priority={priority} />
        </div>
      </div>
      {caption && <span className={`${s.script} ${s.archCaption}`}>{caption}</span>}
    </div>
  )
}

const spaces = [
  {
    name: 'The Lakefront',
    pic: photos.coupleDock,
    body: 'Say your vows down at the lake, by the dock, with the water and the treeline behind you.',
  },
  {
    name: 'The Lodge',
    pic: photos.diningHall,
    body: 'The reception moves up to the timber-frame lodge: vaulted trusses, two stone fireplaces, and a full kitchen for your caterer.',
  },
  {
    name: 'The Cabins',
    pic: photos.cabinPorch,
    body: 'Nobody has to drive home. Your guests sleep in the cabins and bunkhouses, a short walk from the party.',
  },
]

export default function LongLakeWeddings() {
  return (
    <>
      <Navigation ctaLabel="Check Availability" ctaHref={BOOKING_URL} />

      <main className={`${s.page} ${cormorant.variable} ${garamond.variable} ${pinyon.variable}`}>
        {/* Hero */}
        <section className={s.hero}>
          <Photo pic={photos.lakeDockWide} className={s.heroA} sizes="230px" />
          <Photo pic={photos.brideCabin} className={s.heroB} sizes="230px" />

          <div className={s.heroBox}>
            <span className={s.caps}>Weddings at</span>
            <h1 className={s.display}>Long Lake Outdoor Center</h1>
            <span className={s.script}>where memories take root</span>
            <p>
              A rustic 1939 camp on a lake in the Michigan pines, between Grand Rapids and Kalamazoo.
              For your wedding weekend, the whole property is yours.
            </p>
            <div className={s.btnRow}>
              <a href={BOOKING_URL} className={`${s.outline} ${s.solid}`}>
                Check Availability
              </a>
              <Link href="/contact" className={s.outline}>
                Schedule a Tour
              </Link>
            </div>
          </div>

          <Photo pic={photos.coupleLakeshore} className={s.heroC} sizes="(max-width: 720px) 100vw, 320px" />
        </section>

        {/* The spaces, on deep green */}
        <section className={s.kraft}>
          <span className={`${s.script} ${s.kraftIntro}`}>a glimpse into the pines</span>
          <div className={s.kraftGrid}>
            {spaces.map((space) => (
              <div key={space.name} className={s.kraftCard}>
                <h2 className={s.display}>{space.name}</h2>
                <div className={s.kraftFrame}>
                  <Image src={space.pic.src} alt={space.pic.alt} fill sizes="(max-width: 1040px) 100vw, 340px" />
                </div>
                <p>{space.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The package */}
        <section className={s.section}>
          <div className={s.inner}>
            <div className={s.sectionHead}>
              <span className={s.script}>The weekend is yours</span>
              <h2 className={s.display}>The Wedding Package</h2>
              <p>The whole camp is yours from Friday at 3pm until 11am Sunday. Or book one evening, 3pm to midnight.</p>
            </div>

            <div className={`${s.withArch} ${s.withArchLeft}`}>
              <Arch pic={photos.brideCanoe} caption="friday to sunday" />
              <div className={s.packageStack}>
                <div className={s.packageBox}>
                  <h3 className={s.display}>What’s Included</h3>
                  <ul className={s.list}>
                    {included.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={s.priceBox}>
                  <h3 className={s.display}>Pricing</h3>
                  <div className={s.tiers}>
                    {tiers.map((tier) => (
                      <div key={tier.year} className={s.tier}>
                        <span className={s.tierYear}>{tier.year}</span>
                        <span className={s.tierPrice}>{tier.price}</span>
                        <span className={s.tierNote}>{tier.note}</span>
                      </div>
                    ))}
                  </div>
                  <p className={s.priceFoot}>Cleaning is included. Pricing follows the year of your wedding.</p>
                  <a href={BOOKING_URL} className={`${s.outline} ${s.outlineLight}`}>
                    Check Availability
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* History */}
        <section className={s.section} style={{ paddingTop: 0 }}>
          <div className={`${s.inner} ${s.withArch}`}>
            <div className={s.historyText}>
              <span className={s.script}>Since 1939</span>
              <h2 className={s.display}>Built by the Civilian Conservation Corps</h2>
              {history.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
              <div className={s.historyPhotos}>
                <div className={s.historyPhoto}>
                  <Image src={photos.lodgePorch.src} alt={photos.lodgePorch.alt} fill sizes="(max-width: 1040px) 50vw, 360px" />
                </div>
                <div className={s.historyPhoto}>
                  <Image src={photos.lodgeFront.src} alt={photos.lodgeFront.alt} fill sizes="(max-width: 1040px) 50vw, 360px" />
                </div>
              </div>
            </div>
            <Arch pic={photos.diningHallTall} caption="the lodge" />
          </div>
        </section>

        {/* Camp map */}
        <section className={s.section} style={{ paddingTop: 0 }}>
          <div className={s.inner}>
            <div className={s.sectionHead}>
              <span className={s.script}>Find your way</span>
              <h2 className={s.display}>The Camp Map</h2>
              <p>The ceremony spot by the lake, the lodge and kitchen, the bath house, and where everyone sleeps.</p>
            </div>
            <div className={s.mapFrame}>
              <Image
                src={photos.campMap.src}
                alt={photos.campMap.alt}
                width={2000}
                height={1125}
                sizes="(max-width: 1120px) 100vw, 1120px"
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={s.section} style={{ paddingTop: 0 }}>
          <div className={s.inner}>
            <div className={s.sectionHead}>
              <span className={s.script}>Good to know</span>
              <h2 className={s.display}>Questions Couples Ask</h2>
            </div>
            <div className={`${s.withArch} ${s.withArchLeft}`}>
              <Arch pic={photos.canoeVeil} caption="by the water" />
              <div>
                {faqs.map((faq) => (
                  <div key={faq.q} className={s.faqItem}>
                    <h3>{faq.q}</h3>
                    <p>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Your story */}
        <section className={s.story}>
          <Photo pic={photos.fireplaceTall} className={s.storyA} sizes="120px" />
          <Photo pic={photos.cabinsLawn} className={s.storyB} sizes="220px" />
          <Photo pic={photos.firePit} className={s.storyC} sizes="180px" />
          <Photo pic={photos.pinePathTall} className={s.storyD} sizes="170px" />
          <Photo pic={photos.cabinFront} className={s.storyE} sizes="140px" />
          <Photo pic={photos.lakeDock} className={s.storyF} sizes="190px" />

          <div className={s.storyText}>
            <span className={s.script}>Your story belongs here</span>
            <p>
              Every love story is its own, and we can’t wait to host yours. Book your weekend, or reach
              out to schedule a tour of Long Lake Outdoor Center.
            </p>
            <p className={s.credit}>Wedding photos by Elle with Ellis and Indigo</p>
            <div className={s.btnRow}>
              <a href={BOOKING_URL} className={`${s.outline} ${s.solid}`}>
                Check Availability
              </a>
              <Link href="/contact" className={s.outline}>
                Inquire
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
