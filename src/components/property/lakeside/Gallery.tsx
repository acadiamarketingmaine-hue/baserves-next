import Image from 'next/image'
import type { Photo } from '@/content'

/** An even grid of photos with the template's 6px corners. */
export default function Gallery({ photos }: { photos: Photo[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
      {photos.map((photo) => (
        <li key={photo.src} className="relative aspect-[4/3] overflow-hidden rounded-md">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1440px) 294px, (min-width: 1024px) 22vw, (min-width: 768px) 30vw, 50vw"
            className="object-cover"
          />
        </li>
      ))}
    </ul>
  )
}
