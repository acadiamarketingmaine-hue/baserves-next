import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | BA Serves',
  description: 'Get in touch with BA Serves. Contact us about recreation areas, reservations, or partnership opportunities.',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
