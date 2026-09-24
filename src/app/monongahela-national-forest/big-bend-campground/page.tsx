import type { Metadata } from 'next'
import { og } from '@/lib/seo'
import { getPropertyContent, getSiteSettings } from '@/content'
import CampgroundTemplate from '@/components/pages/monongahela/CampgroundTemplate'
import { getSiblingCampgrounds } from '@/components/pages/monongahela/siblings'

const SLUG = 'big-bend-campground'

/**
 * This page reads the content layer, so it must not be frozen at build time:
 * once a camp publishes an edit, a page that only changes when somebody
 * deploys is a page the editor cannot reach. Five minutes is the floor — the
 * publish webhook (POST /api/revalidate) drops this slug's cache tag and makes
 * a change visible in seconds, and this is what happens when that webhook does
 * not arrive. Kept as a literal because Next.js reads it statically; the same
 * number is CONTENT_POLICY.revalidateSeconds.
 */
export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPropertyContent(SLUG)
  return {
    title: content?.seo.title ? { absolute: content?.seo.title } : undefined,
    description: content?.seo.description,
    alternates: { canonical: '/monongahela-national-forest/big-bend-campground' },
    openGraph: og('/monongahela-national-forest/big-bend-campground'),
  }
}

// The words live in src/content/defaults/big-bend-campground.ts. Layout is
// the shared Lakeside campground template (kit-v2 rollout) — see
// src/components/pages/monongahela/CampgroundTemplate.tsx.

export default async function BigBendCampgroundPage() {
  const content = (await getPropertyContent(SLUG))!
  const [settings, siblings] = await Promise.all([getSiteSettings(), getSiblingCampgrounds(SLUG)])
  const phone = content.phone ?? settings.phone

  return <CampgroundTemplate content={content} phone={phone} siblings={siblings} />
}
