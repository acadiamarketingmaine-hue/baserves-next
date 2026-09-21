import HomeClient from '@/components/HomeClient'
import { PageSchema } from '@/components/SchemaMarkup'
import { videoObject } from '@/lib/schema'
import { utcDateKey } from '@/lib/featured-rotation'

// Metadata (title/description/canonical/OG) is inherited from app/layout.tsx.

// This page is statically generated (no dynamic APIs used), so without a
// revalidate window the HTML — including the Featured Destinations order —
// would be baked in once at build time and never change until the next
// deploy. ISR regenerates it in the background at most once an hour, which
// is how the day-based rotation (src/lib/featured-rotation.ts) actually
// changes over time in production while the page stays cacheable.
export const revalidate = 3600

export default function HomePage() {
  const featuredDateKey = utcDateKey(new Date())
  return (
    <>
      <PageSchema
        url="/"
        name="BA Services | Recreation Area Management & DOT Rest Areas Across 7 States"
        description="BA Services, Inc. manages campgrounds, national forests, state parks, and DOT rest areas across 7 states. Professional recreation management in AL, IN, ME, MI, MO, RI, WV, IA & UT."
        image={{ url: '/videos/hero-poster.jpg', caption: 'BA Services managed recreation areas' }}
        nodes={[
          videoObject({
            url: '/',
            name: 'Find Your Adventure — BA Services',
            description:
              'Hero video: from the rockbound coast of Maine to the salt flats of Utah, BA Services managed sites offer well-kept facilities, unspoiled scenery, and seamless experiences for every visitor.',
            thumbnailUrl: '/videos/hero-poster.jpg',
            uploadDate: '2026-03-18',
            duration: 'PT21S',
            contentUrl: '/videos/hero.mp4',
          }),
        ]}
      />
      <HomeClient featuredDateKey={featuredDateKey} />
    </>
  )
}
