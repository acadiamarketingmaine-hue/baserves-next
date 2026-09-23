import Image from 'next/image'
import type { Photo } from '@/content'
import { frame } from './styles'

export interface MosaicProps {
  /** One large photo and two smaller ones; extra photos are ignored. */
  photos: Photo[]
  caption?: string
  className?: string
}

/** One large photo beside two stacked ones, with an italic caption. */
export default function Mosaic({ photos, caption, className = '' }: MosaicProps) {
  const [large, a, b] = photos
  if (!large) return null
  const small = [a, b].filter(Boolean) as Photo[]
  return (
    <figure className={`${frame} ${className}`}>
      <div className="grid grid-cols-2 gap-3 md:gap-6 lg:h-[620px] lg:grid-cols-[1.75fr_1fr] lg:grid-rows-2">
        <div className="relative col-span-2 aspect-[350/260] overflow-hidden rounded-md lg:col-span-1 lg:row-span-2 lg:aspect-auto">
          <Image
            src={large.src}
            alt={large.alt}
            fill
            sizes="(min-width: 1440px) 780px, (min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        </div>
        {small.map((photo) => (
          <div key={photo.src} className="relative aspect-[170/200] overflow-hidden rounded-md md:aspect-[4/3] lg:aspect-auto">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1440px) 444px, (min-width: 1024px) 34vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="mt-4 font-lake-serif text-[18px] italic text-lake-mute md:mt-6">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
