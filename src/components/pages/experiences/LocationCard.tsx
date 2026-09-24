import Image from 'next/image'
import Link from 'next/link'
import type { Cta, Photo } from '@/content'
import Arrow from '@/components/property/lakeside/Arrow'
import { externalProps, eyebrow as eyebrowClass, h3, textLink } from '@/components/property/lakeside'

export interface LocationCardProps {
  photo: Photo
  title: string
  /** Small caps line above the title, e.g. the state/location. */
  meta?: string
  body?: string
  /** The property's own page — the "Explore" action. */
  exploreHref: string
  /** The property's real booking destination — the "Book" action. */
  book: Cta
  sizes: string
}

/**
 * A photo-led card for the /experiences index and category grids
 * (docs/ux-pass/kit-v2.md: "photo-led card grids with clear Explore and Book
 * actions"). Built page-local because the shared CardRow only supports one
 * link per card; everything else here reuses the Lakeside kit's own classes
 * so it reads as the same system.
 */
export default function LocationCard({ photo, title, meta, body, exploreHref, book, sizes }: LocationCardProps) {
  return (
    <li className="lk-card flex flex-col">
      <Link
        href={exploreHref}
        className="lk-zoom relative block aspect-[3/2] overflow-hidden rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
      >
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
      </Link>
      {meta && <p className={`${eyebrowClass} mt-6 text-lake-moss`}>{meta}</p>}
      <h3 className={`${h3} ${meta ? 'mt-2' : 'mt-5'} text-lake-ink`}>
        <Link href={exploreHref} className="hover:underline hover:decoration-lake-line hover:underline-offset-4">
          {title}
        </Link>
      </h3>
      {body && <p className="mt-3 text-[15px] leading-[1.6] text-lake-mute md:text-base">{body}</p>}
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        <Link href={exploreHref} className={textLink}>
          Explore
          <Arrow className="h-4 w-4" />
        </Link>
        <a href={book.url} {...externalProps(book.url)} className={textLink}>
          Book
          <Arrow className="h-4 w-4" />
        </a>
      </div>
    </li>
  )
}
