import type { Metadata } from 'next'
import './globals.css'
import AssistantChat from '@/components/AssistantChat'

export const metadata: Metadata = {
  title: {
    default: 'BA Services | Recreation Area Management & DOT Rest Areas Across 7 States',
    template: '%s | BA Services',
  },
  description: 'BA Services, Inc. manages campgrounds, national forests, state parks, and DOT rest areas across 7 states. Professional recreation management in AL, IN, ME, MI, MO, RI, WV, IA & UT.',
  keywords: 'recreation area management, campground management, DOT rest areas, national forest campgrounds, state park management, outdoor recreation, BA Services, camping, hiking',
  metadataBase: new URL('https://baserves.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'BA Services | Recreation Area Management & DOT Rest Areas',
    description: 'Professional campground, national forest, state park, and DOT rest area management across 7 states. Well-maintained facilities and exceptional visitor experiences.',
    url: 'https://baserves.com',
    siteName: 'BA Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://baserves.com/images/logo.png',
        width: 800,
        height: 600,
        alt: 'BA Services - Recreation Area Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BA Services | Recreation Area Management & DOT Rest Areas',
    description: 'Professional campground, national forest, state park, and DOT rest area management across 7 states.',
    images: ['https://baserves.com/images/logo.png'],
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
        <AssistantChat />
      </body>
    </html>
  )
}
