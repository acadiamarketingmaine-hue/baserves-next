import type { SiteSettings } from '../types'

/**
 * Site-wide defaults. Values moved verbatim from `SITE` in src/lib/schema.ts
 * and from the phone rendering in src/app/[slug]/page.tsx.
 *
 * The three phone fields are not a mistake: the codebase writes the one number
 * three different ways and this records all three rather than picking one.
 *
 * `emails.alternates` records the company addresses that are live elsewhere in
 * the codebase and do NOT agree with `primary`. They are recorded, not
 * reconciled - see design-audit/website-editor-inventory.md.
 */
export const siteSettings: SiteSettings = {
  legalName: 'BA Services, Inc.',
  phone: '207-307-7903',
  phoneDisplay: '+1 207 307-7903',
  phoneE164: '+1-207-307-7903',
  address: {
    street: '1257 Hammond Street',
    locality: 'Bangor',
    region: 'ME',
    postalCode: '04401',
    country: 'US',
  },
  emails: {
    primary: 'email@BAServes.com',
    alternates: ['info@baserves.com', 'andrew@baserves.com'],
  },
  notices: [],
}
