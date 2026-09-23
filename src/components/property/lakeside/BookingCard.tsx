import type { Cta } from '@/content'
import { externalProps, pillPrimary, telHref } from './styles'

export interface BookingCardProps {
  title: string
  text?: string
  cta: Cta
  phone?: string
  className?: string
}

/** The floating paper card in the hero: title, one sentence, book, or call. */
export default function BookingCard({ title, text, cta, phone, className = '' }: BookingCardProps) {
  return (
    <div
      className={`w-[380px] rounded-2xl bg-lake-paper/95 p-8 text-lake-ink shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] backdrop-blur ${className}`}
    >
      <h2 className="font-lake-serif text-[32px] leading-[1.1]">{title}</h2>
      {text && <p className="mt-4 text-[15px] leading-[1.6] text-lake-mute">{text}</p>}
      <a href={cta.url} {...externalProps(cta.url)} className={`${pillPrimary} mt-6 w-full`}>
        {cta.label}
      </a>
      {phone && (
        <p className="mt-3 text-sm text-lake-mute">
          or call{' '}
          <a
            href={telHref(phone)}
            className="inline-flex min-h-[44px] items-center font-medium text-lake-ink underline decoration-lake-line underline-offset-4 hover:decoration-lake-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-lake-spruce"
          >
            {phone}
          </a>
        </p>
      )}
    </div>
  )
}
