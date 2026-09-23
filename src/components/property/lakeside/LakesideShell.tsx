import type { ReactNode } from 'react'
import { lakeSans, lakeSerif } from './fonts'
import LakesideMotion from './LakesideMotion'
import './lakeside.css'

/*
 * Runs before the hero is parsed, so the hero words can start hidden and rise
 * in without a visible-then-hidden flash. Without JS it never runs and the
 * page shows everything; lakeside.css has a 2.5s failsafe if the runtime
 * never arrives.
 */
const prePaint = "document.documentElement.classList.add('lk-pre')"

/**
 * Scopes the Lakeside look (fonts, paper background, ink text) to one page.
 * Everything in src/components/property/lakeside expects to sit inside this.
 * It also hosts the template's motion runtime (see LakesideMotion).
 */
export default function LakesideShell({ children }: { children: ReactNode }) {
  return (
    <div
      data-lakeside=""
      className={`${lakeSerif.variable} ${lakeSans.variable} bg-lake-paper font-lake-sans text-lake-ink antialiased`}
    >
      <script dangerouslySetInnerHTML={{ __html: prePaint }} />
      {children}
      <LakesideMotion />
    </div>
  )
}
