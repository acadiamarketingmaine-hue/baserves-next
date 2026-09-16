import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { BOOKING_URL, photos, tiers, faqs, history } from '@/data/long-lake-weddings'
import s from './editorial.module.css'

const cormorant = Cormorant_Garamond({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
})

const jost = Jost({
  weight: ['300', '400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jost',
})

export const metadata: Metadata = {
  title: 'Weddings at Long Lake Outdoor Center | Yankee Springs, Michigan',
  description:
    'A historic lakeside wedding venue in Yankee Springs, Michigan. Two nights of exclusive use, a 120-seat timber-frame lodge, on-site lodging for every guest, and a commercial kitchen for your caterer.',
  openGraph: { images: [photos.diningHall.src] },
}

const included = [
  { title: 'The whole camp', body: 'Exclusive use of the property. No other guests, nothing shared.' },
  { title: 'Two nights, three days', body: 'Additional nights available on either end.' },
  { title: 'The lodge', body: 'A timber-frame dining hall seating 120.' },
  { title: 'Sleeps 120', body: 'Sixteen cabins and four bunkhouses on site.' },
  { title: 'Commercial kitchen', body: 'A full kitchen and loading porch for your caterer.' },
  { title: 'The lakefront', body: 'Dock, shoreline, and wooded grounds for the ceremony.' },
  { title: 'The bath house', body: 'Hot showers, tiled floors, and lighted vanities.' },
  { title: 'Clean-up included', body: 'The camp clean-up package comes with every wedding.' },
]

export default function LongLakeWeddingsEditorial() {
  return (
    <>
      <Navigation ctaLabel="Check Availability" ctaHref={BOOKING_URL} />

      <main className={`${s.page} ${cormorant.variable} ${jost.variable}`}>
        {/* 1 — hero */}
        <section className={s.hero}>
          <Image src={photos.diningHall.src} alt={photos.diningHall.alt} fill priority sizes="100vw" />
          <div className={s.heroShade} />
          <div className={s.heroInner}>
            <span className={s.caps}>Weddings &middot; Yankee Springs, Michigan</span>
            <h1 className={s.serif} style={{ marginTop: 18 }}>
              Long Lake Outdoor Center
            </h1>
            <span className={s.rule} />
            <span className={s.caps}>A whole camp on a private lake</span>
            <div className={s.btnRow}>
              <a href={BOOKING_URL} className={`${s.btn} ${s.btnLight}`}>
                Check Availability
              </a>
              <Link href="/contact" className={`${s.btn} ${s.btnLight}`}>
                Schedule a Tour
              </Link>
            </div>
            <div className={s.heroFoot}>
              <span className={s.num}>1</span>
              <span>
                Rethinking
                <br />
                the wedding venue
              </span>
            </div>
          </div>
        </section>

        {/* 2 — statement + half circle */}
        <section className={`${s.panel} ${s.statement}`}>
          <div className={s.inner}>
            <h2 className={s.serif}>
              A weekend,
              <br />
              not an afternoon.
            </h2>
            <span className={s.ruleV} />
            <p>
              Most venues rent you a room for a few hours. At Long Lake, the whole camp is yours for two
              nights and three days: the lake, the lodge, and every cabin in the pines.
            </p>
          </div>
          <div className={s.halfCircle}>
            <Image src={photos.lakeDock.src} alt={photos.lakeDock.alt} fill sizes="(max-width: 900px) 100vw, 900px" />
            <span className={`${s.num} ${s.halfCircleNum}`}>2</span>
          </div>
        </section>

        {/* 3 — split */}
        <section className={s.split}>
          <div className={s.splitPhoto}>
            <Image src={photos.canoesTall.src} alt={photos.canoesTall.alt} fill sizes="(max-width: 1000px) 100vw, 50vw" />
          </div>
          <div className={s.splitText}>
            <h2 className={s.serif}>
              Everyone
              <br />
              stays the night
            </h2>
            <span className={s.rule} />
            <div className={s.lines}>
              <span>Sixteen cabins.</span>
              <span>Four bunkhouses.</span>
              <span>Room for 120 guests.</span>
            </div>
            <p>
              Nobody’s driving back to a hotel at midnight. Your guests wake up in the pines, walk to
              breakfast in the lodge, and spend the morning on the dock.
            </p>
            <span className={`${s.num} ${s.panelNum}`}>3</span>
          </div>
        </section>

        {/* 4 — pillars + arch */}
        <section className={s.panel}>
          <div className={`${s.inner} ${s.withArch}`}>
            <div>
              <div className={s.pillarsHead}>
                <h2 className={s.serif}>What the wedding package includes</h2>
                <span className={s.rule} />
              </div>
              <ul className={s.pillars}>
                {included.map((item) => (
                  <li key={item.title} className={s.pillar}>
                    <b>{item.title}</b>
                    <span>{item.body}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.arch}>
              <Image src={photos.pinesCabinTall.src} alt={photos.pinesCabinTall.alt} fill sizes="380px" />
            </div>
          </div>
          <span className={`${s.num} ${s.panelNum}`}>4</span>
        </section>

        {/* 5 — dark pricing panel */}
        <section className={s.dark}>
          <Image src={photos.lodgeFront.src} alt={photos.lodgeFront.alt} fill sizes="100vw" />
          <div className={s.darkShade} />
          <div className={s.darkInner}>
            <h2 className={s.serif}>
              Pricing isn’t complicated.
              <br />
              It’s one package.
            </h2>
            <span className={s.rule} />
            <p>Two nights and three days, camp clean-up included. The rate follows the year of your wedding.</p>
            <div className={s.tiers}>
              {tiers.map((tier) => (
                <div key={tier.year} className={s.tier}>
                  <span className={s.caps}>{tier.year}</span>
                  <span className={s.tierPrice}>{tier.price}</span>
                  <span className={s.tierNote}>{tier.note}</span>
                </div>
              ))}
            </div>
            <div className={s.btnRow}>
              <a href={BOOKING_URL} className={`${s.btn} ${s.btnLight}`}>
                Check Availability
              </a>
            </div>
          </div>
          <span className={`${s.num} ${s.darkNum}`}>5</span>
        </section>

        {/* 6 — history + quarter arch */}
        <section className={s.history}>
          <div className={s.historyText}>
            <h2 className={s.serif}>
              Built in 1939.
              <br />
              And beautiful.
            </h2>
            <span className={s.rule} />
            {history.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
          <div className={s.quarter}>
            <Image src={photos.lodgeChimney.src} alt={photos.lodgeChimney.alt} fill sizes="(max-width: 1000px) 90vw, 50vw" />
          </div>
        </section>

        {/* 7 — faq + arch */}
        <section className={s.panel} style={{ background: 'var(--paper-2)' }}>
          <div className={`${s.inner} ${s.withArch} ${s.withArchLeft}`}>
            <div className={s.arch}>
              <Image src={photos.diningHallTall.src} alt={photos.diningHallTall.alt} fill sizes="380px" />
            </div>
            <div>
              <h2 className={s.serif} style={{ fontSize: 'clamp(38px, 4.2vw, 56px)' }}>
                Questions
                <br />
                couples ask
              </h2>
              <span className={s.rule} />
              {faqs.map((faq) => (
                <div key={faq.q} className={s.faqItem}>
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
          <span className={`${s.num} ${s.panelNum}`}>7</span>
        </section>

        {/* 8 — close */}
        <section className={`${s.panel} ${s.close}`}>
          <div className={s.inner}>
            <h2 className={s.serif}>
              Your weekend
              <br />
              at Long Lake.
            </h2>
            <span className={s.ruleV} />
            <p>
              Check the calendar and book your dates at Long Lake Outdoor Center, or reach out and we’ll
              walk you through the weekend.
            </p>
            <div className={s.btnRow}>
              <a href={BOOKING_URL} className={`${s.btn} ${s.btnDark}`}>
                Check Availability
              </a>
              <Link href="/contact" className={s.btn}>
                Schedule a Tour
              </Link>
            </div>
            <div className={s.closeStrip}>
              {[photos.pinePathTall, photos.cabinFront, photos.fireplaceTall, photos.lakeDockWide].map((pic) => (
                <div key={pic.src}>
                  <Image src={pic.src} alt={pic.alt} fill sizes="(max-width: 640px) 50vw, 25vw" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
