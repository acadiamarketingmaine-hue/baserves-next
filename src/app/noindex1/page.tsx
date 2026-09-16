import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Cormorant_Garamond, EB_Garamond, Pinyon_Script } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { BOOKING_URL, photos, included, tiers, faqs, history } from '@/data/long-lake-weddings'
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

export const metadata: Metadata = {
  title: 'Weddings at Long Lake Outdoor Center | Yankee Springs, Michigan',
  description:
    'A historic lakeside wedding venue in Yankee Springs, Michigan. Two nights of exclusive use, a 120-seat timber-frame lodge, on-site lodging for every guest, and a commercial kitchen for your caterer.',
  openGraph: { images: [photos.lakeDock.src] },
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
    pic: photos.lakeDock,
    body: 'Vows at the water’s edge, with the lake and the treeline behind you. The dock and shoreline are yours all weekend.',
  },
  {
    name: 'The Lodge',
    pic: photos.diningHall,
    body: 'A timber-frame dining hall seating 120, with vaulted trusses, a stone fireplace at either end, and a long front porch.',
  },
  {
    name: 'The Cabins',
    pic: photos.cabinPorch,
    body: 'Sixteen cabins and four bunkhouses sleep up to 120, so every guest stays the night on the property.',
  },
]

export default function LongLakeWeddingsForest() {
  return (
    <>
      <Navigation ctaLabel="Check Availability" ctaHref={BOOKING_URL} />

      <main className={`${s.page} ${cormorant.variable} ${garamond.variable} ${pinyon.variable}`}>
        {/* Hero */}
        <section className={s.hero}>
          <Photo pic={photos.canoesPines} className={s.heroA} sizes="220px" />
          <Photo pic={photos.pinesCabinTall} className={s.heroB} sizes="240px" />

          <div className={s.heroBox}>
            <span className={s.caps}>Weddings at</span>
            <h1 className={s.display}>Long Lake Outdoor Center</h1>
            <span className={s.script}>where memories take root</span>
            <p>
              A 1939 camp on a private lake in the Michigan pines, and for your wedding weekend, the
              whole property is yours.
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

          <Photo pic={photos.lakeDockWide} className={s.heroC} sizes="(max-width: 720px) 100vw, 320px" />
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
              <p>One package, and it’s the whole camp: two nights and three days with the entire property to yourselves.</p>
            </div>

            <div className={`${s.withArch} ${s.withArchLeft}`}>
              <Arch pic={photos.pinesCabinTall2} caption="two nights, three days" />
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
                  <p className={s.priceFoot}>
                    Two nights and three days, camp clean-up included. Pricing follows the year of your wedding.
                  </p>
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
              <div className={s.facts}>
                <span>Seats 120</span>
                <span>Sleeps 120</span>
                <span>National Register</span>
                <span>Year-Round</span>
              </div>
            </div>
            <Arch pic={photos.diningHallTall} caption="the lodge" />
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
              <Arch pic={photos.canoesTall} caption="by the water" />
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
