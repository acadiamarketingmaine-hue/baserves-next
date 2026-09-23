import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Page Not Found | BA Services',
  robots: { index: false, follow: true },
}

const destinations = [
  { href: '/experiences', label: 'All experiences' },
  { href: '/long-lake-outdoor-center', label: 'Long Lake Outdoor Center' },
  { href: '/chief-noonday-outdoor-center', label: 'Chief Noonday Outdoor Center' },
  { href: '/yankee-springs-recreation-area', label: 'Yankee Springs Recreation Area' },
  { href: '/services', label: 'Our services' },
  { href: '/contact', label: 'Contact us' },
]

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="relative pt-32 pb-16 bg-forest-DEFAULT overflow-hidden">
        <div className="container-custom px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="badge bg-white/10 text-white mb-4">404</span>
            <h1 className="font-display headline-xl text-white mb-6">
              We couldn&apos;t find that <span className="text-green-400">page</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              The link may be old or mistyped. Try one of these, or call us at{' '}
              <a href="tel:+12073077903" className="underline underline-offset-4 hover:text-white">207-307-7903</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom px-6">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
            {destinations.map((d) => (
              <li key={d.href}>
                <Link
                  href={d.href}
                  className="flex items-center justify-between min-h-[52px] px-5 py-3 rounded-xl border border-gray-200 text-forest-DEFAULT font-semibold hover:bg-gray-50 transition-colors"
                >
                  {d.label}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link href="/" className="btn-primary">Back to the home page</Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
