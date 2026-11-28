import type { Metadata } from 'next'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: { absolute: 'Leave a Review for a BA Services Park' },
  description: 'Share feedback about a BA Services rest area in Utah or Iowa, or a campground and park we manage. Your note helps the crew keep facilities ready.',
  alternates: {
    canonical: '/leave-a-review',
  },
  openGraph: og('/leave-a-review'),
}

export default function LeaveReviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PageSchema
        url="/leave-a-review"
        name="Leave a Review for a BA Services Park"
        crumbName="Leave a Review"
        description="Share feedback about a BA Services rest area in Utah or Iowa, or a campground and park we manage. Your note helps the crew keep facilities ready."
        type="ContactPage"
        image="/images/Burlingame1-2048x1365.jpg"
      />
      {children}
    </>
  )
}
