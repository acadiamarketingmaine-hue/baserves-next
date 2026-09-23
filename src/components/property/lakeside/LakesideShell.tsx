import type { ReactNode } from 'react'
import { lakeSans, lakeSerif } from './fonts'

/**
 * Scopes the Lakeside look (fonts, paper background, ink text) to one page.
 * Everything in src/components/property/lakeside expects to sit inside this.
 */
export default function LakesideShell({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${lakeSerif.variable} ${lakeSans.variable} bg-lake-paper font-lake-sans text-lake-ink antialiased`}
    >
      {children}
    </div>
  )
}
