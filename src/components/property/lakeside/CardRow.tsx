import Image from 'next/image'
import type { Photo } from '@/content'
import Arrow from './Arrow'
import { externalProps, eyebrow as eyebrowClass, h3 } from './styles'

export interface CardRowItem {
  key: string
  title?: string
  body?: string
  /** Small caps line above the title, e.g. "Sleeps 8". */
  meta?: string
  photo?: Photo
  href?: string
  /** Visible link text; the card title is added for screen readers. */
  linkLabel?: string
}

export interface CardRowProps {
  items: CardRowItem[]
  /** Columns at desktop width. */
  columns?: 2 | 3 | 4
  /** Photo shape. Tall suits 3-4 columns, wide suits 2. */
  shape?: 'tall' | 'wide'
}

const cols = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
}
const sizes = {
  2: '(min-width: 1440px) 612px, (min-width: 768px) 45vw, 100vw',
  3: '(min-width: 1440px) 400px, (min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw',
  4: '(min-width: 1440px) 294px, (min-width: 1024px) 22vw, (min-width: 768px) 45vw, 100vw',
}

/** A row of photo cards: photo, serif title, one sentence, "Learn more". */
export default function CardRow({ items, columns = 3, shape = 'tall' }: CardRowProps) {
  return (
    <ul className={`grid gap-x-6 gap-y-12 ${cols[columns]}`}>
      {items.map((item) => (
        <li key={item.key} data-reveal="card" className="lk-card flex flex-col">
          {item.photo && (
            <div
              data-reveal="wipe"
              className={`lk-zoom relative overflow-hidden rounded-md ${shape === 'tall' ? 'aspect-[350/240] md:aspect-[4/5]' : 'aspect-[3/2]'}`}
            >
              <Image src={item.photo.src} alt={item.photo.alt} fill sizes={sizes[columns]} className="object-cover" />
            </div>
          )}
          {item.meta && <p className={`${eyebrowClass} mt-6 text-lake-moss`}>{item.meta}</p>}
          {item.title && (
            <h3 className={`${h3} ${item.meta ? 'mt-2' : 'mt-5'} text-lake-ink`}>{item.title}</h3>
          )}
          {item.body && <p className="mt-3 text-[15px] leading-[1.6] text-lake-mute md:text-base">{item.body}</p>}
          {item.href && (
            <a
              href={item.href}
              {...externalProps(item.href)}
              className="mt-3 inline-flex min-h-[44px] w-fit items-center gap-1.5 text-[15px] font-medium text-lake-ink hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
            >
              {item.linkLabel ?? 'Learn more'}
              {item.title && <span className="sr-only">: {item.title}</span>}
              <Arrow className="lk-nudge h-4 w-4" />
            </a>
          )}
        </li>
      ))}
    </ul>
  )
}
