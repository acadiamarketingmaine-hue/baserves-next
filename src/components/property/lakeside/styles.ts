/**
 * Shared class strings for the Lakeside template. Kept as plain strings so
 * Tailwind can see every class at build time.
 */

/** Side padding and max width shared by every section. */
export const frame = 'mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-24'

/** Vertical rhythm: ~56px on phones, ~120px on desktop. */
export const sectionPad = 'py-14 md:py-24 lg:py-[120px]'

/** Small letterspaced caps label. Pair with a colour class. */
export const eyebrow = 'text-xs font-medium uppercase tracking-[0.18em]'

/** Section heading in the display serif. */
export const h2 =
  'font-lake-serif text-[40px] leading-[1.05] tracking-[-0.01em] md:text-[56px] lg:text-[64px]'

/** Card / sub-section title. */
export const h3 = 'font-lake-serif text-[26px] leading-[1.15] md:text-[32px]'

/** Body copy on paper. */
export const body = 'text-[16px] leading-[1.65] text-lake-mute md:text-[17px]'

/*
 * Hover: colour change plus a 2px lift and a soft shadow (lift only on a real
 * pointer and with motion allowed). Pills are never animated by GSAP, so the
 * transform transition here cannot fight a reveal.
 */
const pillBase =
  'inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full px-8 text-base font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out [@media(hover:hover)]:hover:shadow-[0_10px_24px_-14px_rgba(0,0,0,0.45)] motion-safe:[@media(hover:hover)]:hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

/** Solid spruce pill, for paper backgrounds. */
export const pillPrimary = `${pillBase} bg-lake-spruce text-lake-paper hover:bg-lake-spruce-dark focus-visible:outline-lake-spruce`

/** Solid paper pill, for photo or spruce backgrounds. */
export const pillLight = `${pillBase} bg-lake-paper text-lake-ink hover:bg-white focus-visible:outline-white`

/** Outlined pill, for photo or spruce backgrounds. */
export const pillGhostLight = `${pillBase} border border-white/80 text-white hover:bg-white/10 focus-visible:outline-white`

/** Outlined pill, for paper backgrounds. */
export const pillGhost = `${pillBase} border border-lake-ink/40 text-lake-ink hover:bg-lake-ink/5 focus-visible:outline-lake-spruce`

/** Inline text link on paper. */
export const textLink =
  'inline-flex min-h-[44px] items-center gap-1.5 font-medium text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce'

/** tel: href from a display number such as "616-644-9459". */
export function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return `tel:+${digits.length === 10 ? `1${digits}` : digits}`
}

/** Opens in a new tab only when the link leaves this site. */
export function externalProps(url: string) {
  return /^https?:\/\//.test(url) ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}
