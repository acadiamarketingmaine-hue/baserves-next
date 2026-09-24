import Image from 'next/image'
import Link from 'next/link'
import type { Cta, Photo } from '@/content'
import { externalProps, pillGhost, pillGhostLight, pillLight, pillPrimary, telHref } from './styles'

export interface ClosingCtaProps {
  photo?: Photo
  heading: string
  text?: string
  primary: Cta
  phone?: string
  /** A quieter text link under the buttons. */
  secondary?: Cta
}

/**
 * The last word: a centred serif line and two pills. On desktop it sits over
 * a full-bleed photo; on phones it is set on paper, as in the design.
 */
export default function ClosingCta({ photo, heading, text, primary, phone, secondary }: ClosingCtaProps) {
  return (
    <section
      data-lk-closing=""
      // Desktop sets the heading and pills in white for the photo behind
      // them. Without a photo that white landed on paper and vanished, so a
      // photo-less closing section gets a spruce band on desktop instead.
      className={`relative isolate overflow-hidden py-14 md:flex md:min-h-[640px] md:items-center md:py-24 ${photo ? '' : 'md:bg-lake-spruce'}`}
    >
      {photo && (
        <div className="absolute inset-0 -z-10 hidden overflow-hidden md:block">
          {/* Spare photo above and below for the scrubbed parallax. */}
          <div data-parallax="" className="absolute inset-x-0 -bottom-[8%] -top-[8%]">
            <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-cover" />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-black/45" />
        </div>
      )}
      <div data-reveal="up" className="mx-auto w-full max-w-[880px] px-5 text-center md:px-12 md:text-white">
        <h2 className="font-lake-serif text-[44px] leading-[1.05] tracking-[-0.01em] md:text-[72px] lg:text-[88px]">
          {heading}
        </h2>
        {text && <p className="mx-auto mt-4 max-w-[720px] text-[16px] leading-[1.6] text-lake-mute md:mt-6 md:text-[18px] md:text-white/95">{text}</p>}
        <div className="mt-8 flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-center md:gap-4">
          <a href={primary.url} {...externalProps(primary.url)} className={`${pillPrimary} md:hidden`}>
            {primary.label}
          </a>
          <a href={primary.url} {...externalProps(primary.url)} className={`${pillLight} hidden md:inline-flex`}>
            {primary.label}
          </a>
          {phone && (
            <>
              <a href={telHref(phone)} className={`${pillGhost} md:hidden`}>
                Call {phone}
              </a>
              <a href={telHref(phone)} className={`${pillGhostLight} hidden md:inline-flex`}>
                Call {phone}
              </a>
            </>
          )}
        </div>
        {secondary && (
          <p className="mt-6">
            <Link
              href={secondary.url}
              className="inline-flex min-h-[44px] items-center font-medium underline decoration-1 underline-offset-[6px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce md:focus-visible:outline-white"
            >
              {secondary.label}
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}
