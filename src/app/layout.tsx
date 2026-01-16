import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BA Serves | Recreation Area Management & Outdoor Experiences',
  description: 'Discover pristine recreation areas across America. From the rolling forests of Alabama to the rugged landscapes of Missouri, our managed sites provide well-maintained facilities, pristine landscapes, and seamless visitor experiences.',
  keywords: 'recreation areas, camping, hiking, outdoor experiences, national forests, state parks, campground management',
  metadataBase: new URL('https://baserves.com'),
  openGraph: {
    title: 'BA Serves | Recreation Area Management & Outdoor Experiences',
    description: 'Discover pristine recreation areas across America. Well-maintained facilities, pristine landscapes, and seamless visitor experiences.',
    url: 'https://baserves.com',
    siteName: 'BA Serves',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BA Serves | Recreation Area Management & Outdoor Experiences',
    description: 'Discover pristine recreation areas across America. Well-maintained facilities, pristine landscapes, and seamless visitor experiences.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
