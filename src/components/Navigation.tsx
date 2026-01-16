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
      {/* Top Bar - Clean white like AmEx */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="BA Serves"
                width={160}
                height={53}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.submenu && setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-gray-700 hover:text-forest-DEFAULT font-medium text-sm flex items-center gap-1 transition-colors"
                  >
                    {item.name}
                    {item.submenu && (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.submenu && openDropdown === item.name && (
                    <div className="absolute top-full left-0 pt-1 w-64">
                      <div className="bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="block px-4 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-forest-DEFAULT text-sm transition-colors"
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

            {/* Right Side - Rewards, Sign In, Book Now */}
            <div className="hidden lg:flex items-center gap-2">
              <Link
                href="/rewards"
                className="px-4 py-2 text-gray-700 hover:text-forest-DEFAULT font-medium text-sm transition-colors"
              >
                Rewards
              </Link>
              <a
                href="https://escape.baserves.com/login"
                className="px-4 py-2 text-gray-700 hover:text-forest-DEFAULT font-medium text-sm transition-colors"
              >
                Sign In
              </a>
              <a
                href="https://escape.baserves.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-5 py-2 bg-forest-DEFAULT text-white font-semibold text-sm rounded-md hover:bg-forest-dark transition-colors"
              >
                Book Now
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 text-gray-700"
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
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 shadow-lg">
          <div className="px-6 py-4 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block py-3 text-gray-800 font-medium"
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
                        className="block py-2 text-gray-500 text-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <Link
                href="/rewards"
                className="block py-2 text-gray-700 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Rewards
              </Link>
              <a
                href="https://escape.baserves.com/login"
                className="block py-2 text-gray-700 font-medium"
              >
                Sign In
              </a>
              <a
                href="https://escape.baserves.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 bg-forest-DEFAULT text-white font-semibold rounded-md mt-2"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
