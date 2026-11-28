import { Instrument_Sans, Source_Serif_4 } from 'next/font/google'

/**
 * The Lakeside template's two typefaces. They are exposed as CSS variables and
 * only switched on inside <LakesideShell>, so every other page keeps Inter and
 * Playfair Display.
 */
export const lakeSerif = Source_Serif_4({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-lake-serif',
})

export const lakeSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-lake-sans',
})
