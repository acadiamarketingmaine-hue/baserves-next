import Image from 'next/image'
import type { ReactNode } from 'react'
import type { Photo } from '@/content'
import Eyebrow from './Eyebrow'
import { body, h2 } from './styles'

export interface SplitFeatureProps {
  photo?: Photo
  eyebrow?: string
  /** Adds the short ember rule above the eyebrow — see Eyebrow. */
  eyebrowRule?: boolean
  heading: string
  paragraphs?: string[]
  /** Photo on the right instead of the left. */
  reverse?: boolean
  children?: ReactNode
}

/** A photo beside a serif heading and prose, on paper. */
export default function SplitFeature({
  photo,
  eyebrow,
  eyebrowRule = false,
  heading,
  paragraphs = [],
  reverse = false,
  children,
}: SplitFeatureProps) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      {photo && (
        <div data-reveal="fade" className={`relative aspect-[4/3] overflow-hidden rounded-md ${reverse ? 'lg:order-2' : ''}`}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1440px) 612px, (min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div data-reveal="up">
        {eyebrow && <Eyebrow label={eyebrow} rule={eyebrowRule} className="mb-4" />}
        <h2 className={`${h2} text-lake-ink`}>{heading}</h2>
        {paragraphs.map((p) => (
          <p key={p} className={`${body} mt-5`}>
            {p}
          </p>
        ))}
        {children}
      </div>
    </div>
  )
}
