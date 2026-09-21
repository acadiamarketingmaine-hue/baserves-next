import type { Metadata } from 'next'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: { absolute: 'Leave a Review | BA Services' },
  description: 'Submit your feedback about BA Services rest areas and recreation facilities.',
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
        name="Leave a Review | BA Services"
        crumbName="Leave a Review"
        description="Submit your feedback about BA Services rest areas and recreation facilities."
        type="ContactPage"
        image="/images/Burlingame1-2048x1365.jpg"
      />
      {children}
    </>
  )
}
