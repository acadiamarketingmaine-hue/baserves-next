import Image from 'next/image'
import type { Photo } from '@/content'
import Eyebrow from './Eyebrow'
import { frame } from './styles'

export interface HeritageBandProps {
  id?: string
  photo?: Photo
  eyebrow?: string
  /** Adds the short ember rule above the eyebrow — see Eyebrow. */
  eyebrowRule?: boolean
  heading: string
  paragraphs?: string[]
}

/** Spruce band: photo on the left, caps label, serif headline and story on the right. */
export default function HeritageBand({ id, photo, eyebrow, eyebrowRule = false, heading, paragraphs = [] }: HeritageBandProps) {
  return (
    <section id={id} className="bg-lake-spruce py-14 text-lake-paper md:py-24 lg:py-[120px]">
      <div className={`${frame} grid items-center gap-8 lg:grid-cols-12 lg:gap-12`}>
        <div data-reveal="up" className="lg:order-2lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8">
          {eyebrow && <Eyebrow label={eyebrow} tone="ember-light" rule={eyebrowRule} />}
          <h2 className="mt-4 font-lake-serif text-[36px] leading-[1.08] tracking-[-0.01em] [text-wrap:balance] md:text-[52px] lg:text-[60px]">
            {heading}
          </h2>
          {paragraphs.map((p) => (
            <p key={p} className="mt-6 text-[16px] leading-[1.65] text-lake-paper/85 md:text-[17px]">
              {p}
            </p>
          ))}
        </div>
        {photo && (
          <div className="relative aspect-[350/260] overflow-hidden rounded-md lg:order-1 lg:col-span-6 lg:aspect-[600/520]">
            {/* 8% of spare photo above and below, so the scrubbed parallax never shows an edge. */}
            <div data-parallax="" className="absolute inset-x-0 -bottom-[8%] -top-[8%]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1440px) 600px, (min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
