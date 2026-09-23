import Image from 'next/image'
import type { Photo } from '@/content'
import BookingCard, { type BookingCardProps } from './BookingCard'
import { externalProps, eyebrow as eyebrowClass, frame, pillLight } from './styles'

export interface HeroProps {
  photo: Photo
  eyebrow?: string
  /** The page's one <h1>. */
  title: string
  subline?: string
  booking: BookingCardProps
}

/**
 * Full-bleed photo with the name set large at the bottom left. On desktop the
 * booking card floats bottom right; below `lg` it collapses to one full-width
 * pill under the subline.
 */
export default function Hero({ photo, eyebrow, title, subline, booking }: HeroProps) {
  return (
    <section className="relative isolate flex h-[720px] items-end overflow-hidden bg-lake-spruce md:h-[880px]">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* Shade: dark at the bottom where the words sit, light at the top. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/35 to-black/10"
      />
      <div aria-hidden="true" className="absolute inset-y-0 left-0 -z-10 w-2/3 bg-gradient-to-r from-black/35 to-transparent" />

      <div className={`${frame} flex items-end justify-between gap-12 pb-8 md:pb-10 lg:!px-14`}>
        <div className="max-w-[760px] text-white">
          {eyebrow && <p className={`${eyebrowClass} text-white/90`}>{eyebrow}</p>}
          <h1 className="mt-4 font-lake-serif text-[52px] leading-[0.98] tracking-[-0.015em] [text-wrap:balance] md:text-[88px] lg:text-[120px]">
            {title}
          </h1>
          {subline && (
            <p className="mt-5 max-w-[560px] text-[16px] leading-[1.55] text-white/95 md:mt-7 md:text-[19px]">
              {subline}
            </p>
          )}
          <a
            href={booking.cta.url}
            {...externalProps(booking.cta.url)}
            className={`${pillLight} mt-6 w-full lg:hidden`}
          >
            {booking.cta.label}
          </a>
        </div>
        <BookingCard {...booking} className="mb-0 hidden shrink-0 lg:block" />
      </div>
    </section>
  )
}
