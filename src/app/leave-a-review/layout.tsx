import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Leave a Review | BA Services',
  description: 'Submit your feedback about BA Services rest areas and recreation facilities.',
  alternates: {
    canonical: '/leave-a-review',
  },
}

export default function LeaveReviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
