'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Experiences',
    href: '/experiences',
    submenu: [
      { name: 'All Experiences', href: '/experiences' },
      { name: 'Cave Tours', href: '/experiences/categories/cave-tours' },
      { name: 'Kayak & Watercraft', href: '/experiences/categories/kayak-and-watercraft-rentals' },
      { name: 'Campground Rentals', href: '/experiences/categories/campground-rentals' },
      { name: 'Hiking', href: '/experiences/categories/hiking' },
      { name: 'Scenic Drives', href: '/experiences/categories/scenic-drives' },
      { name: 'Conference Centers', href: '/experiences/categories/conference-center-rentals' },
    ]
  },
  {
    name: 'Services',
    href: '/services',
    submenu: [
      { name: 'All Services', href: '/services' },
      { name: 'Campground & Park Maintenance', href: '/services/campground-park-maintenance' },
      { name: 'Landscaping & Groundskeeping', href: '/services/landscaping-and-groundskeeping' },
      { name: 'Rest Area Cleaning', href: '/services/rest-area-cleaning-and-upkeep' },
      { name: 'Preventive Maintenance', href: '/services/preventive-maintenance-and-repairs' },
    ]
  },
  { name: 'About Us', href: '/about' },
  { name: 'Careers', href: '/careers' },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="glass-dark">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20 px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="BA Serves"
                width={180}
                height={60}
                className="h-12 w-auto brightness-0 invert"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.submenu && setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link href={item.href} className="nav-link py-2 flex items-center gap-1">
                    {item.name}
                    {item.submenu && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.submenu && openDropdown === item.name && (
                    <div className="absolute top-full left-0 pt-2 w-64">
                      <div className="bg-white rounded-xl shadow-2xl py-2 border border-gray-100">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="block px-4 py-3 text-gray-700 hover:bg-forest-DEFAULT/5 hover:text-forest-DEFAULT transition-colors"
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:+12073077903" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium">+1 207 307-7903</span>
              </a>
              <a
                href="https://escape.baserves.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-white text-forest-DEFAULT font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Book Now
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-forest-dark border-t border-white/10">
            <div className="px-6 py-4 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-3 text-white font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="pl-4 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block py-2 text-white/70 text-sm"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-white/10">
                <a href="tel:+12073077903" className="flex items-center gap-2 text-white py-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +1 207 307-7903
                </a>
                <a
                  href="https://escape.baserves.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 bg-white text-forest-DEFAULT font-semibold rounded-lg mt-2"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
