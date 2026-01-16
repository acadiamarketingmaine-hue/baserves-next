'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const topNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Careers', href: '/careers' },
]

const secondaryNavLinks = [
  { name: 'Book', href: 'https://escape.baserves.com', external: true },
  { name: 'My Reservations', href: 'https://escape.baserves.com/customer/login', external: true },
  { name: 'Locations', href: '/experiences' },
  { name: 'Cave Tours', href: '/experiences/categories/cave-tours' },
  { name: 'Campgrounds', href: '/experiences/categories/campground-rentals' },
  { name: 'Watercraft', href: '/experiences/categories/kayak-and-watercraft-rentals' },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar - White */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-14 px-6">
            {/* Logo + Primary Nav */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="BA Serves"
                  width={140}
                  height={47}
                  className="h-9 w-auto"
                  priority
                />
              </Link>

              {/* Primary Nav Links */}
              <nav className="hidden lg:flex items-center gap-1">
                {topNavLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-2 text-forest-DEFAULT hover:text-forest-dark font-medium text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right Side - Search, Rewards, Sign In, Log In Button */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Search Icon */}
              <button className="p-2 text-gray-500 hover:text-forest-DEFAULT transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <Link
                href="/rewards"
                className="px-4 py-2 text-forest-DEFAULT hover:text-forest-dark font-medium text-sm transition-colors"
              >
                Rewards
              </Link>

              <a
                href="https://escape.baserves.com/customer/login"
                className="px-4 py-2 text-forest-DEFAULT hover:text-forest-dark font-medium text-sm transition-colors"
              >
                Sign In
              </a>

              <a
                href="https://escape.baserves.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-5 py-2 bg-forest-DEFAULT text-white font-semibold text-sm rounded-md hover:bg-forest-dark transition-colors"
              >
                Log In
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

      {/* Secondary Bar - Green */}
      <div className="hidden lg:block bg-forest-DEFAULT">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-12 px-6">
            {/* Branding */}
            <span className="text-white font-bold text-sm tracking-wide">EXPERIENCES</span>

            {/* Secondary Nav Links */}
            <nav className="flex items-center gap-1">
              {secondaryNavLinks.map((item) => (
                item.external ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-white/90 hover:text-white font-medium text-sm transition-colors"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-2 text-white/90 hover:text-white font-medium text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 shadow-lg">
          <div className="px-6 py-4 space-y-1">
            {/* Primary Links */}
            {topNavLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 text-gray-800 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Divider */}
            <div className="border-t border-gray-100 my-2"></div>

            {/* Secondary Links */}
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide pt-2 pb-1">Experiences</p>
            {secondaryNavLinks.map((item) => (
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 text-gray-600 text-sm"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-gray-600 text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}

            {/* Divider */}
            <div className="border-t border-gray-100 my-2"></div>

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <Link
                href="/rewards"
                className="block py-2 text-forest-DEFAULT font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Rewards
              </Link>
              <a
                href="https://escape.baserves.com/customer/login"
                className="block py-2 text-forest-DEFAULT font-medium"
              >
                Sign In
              </a>
              <a
                href="https://escape.baserves.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 bg-forest-DEFAULT text-white font-semibold rounded-md mt-2"
              >
                Log In
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
