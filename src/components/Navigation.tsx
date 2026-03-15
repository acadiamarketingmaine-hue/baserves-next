'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const topNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Rewards', href: '/rewards' },
  { name: 'Careers', href: '/careers' },
]

const secondaryNavLinks = [
  { name: 'Book', href: 'https://escape.baserves.com', external: true },
  { name: 'My Reservations', href: 'https://escape.baserves.com/customer/login', external: true },
  { name: 'Locations', href: '/experiences' },
{ name: 'Campgrounds', href: '/experiences/categories/campground-rentals' },
  { name: 'Watercraft', href: '/experiences/categories/kayak-and-watercraft-rentals' },
]

interface SearchItem {
  title: string
  description: string
  href: string
  category: string
  keywords: string[]
}

const searchIndex: SearchItem[] = [
  // Pages
  { title: 'Home', description: 'BA Serves homepage — outdoor recreation management', href: '/', category: 'Pages', keywords: ['home', 'main', 'recreation', 'outdoor'] },
  { title: 'About Us', description: 'Our mission, values, and team', href: '/about', category: 'Pages', keywords: ['about', 'mission', 'team', 'values', 'company', 'who'] },
  { title: 'Contact', description: 'Get in touch with our team', href: '/contact', category: 'Pages', keywords: ['contact', 'email', 'phone', 'message', 'help', 'support'] },
  { title: 'Careers', description: 'Job openings and employment application', href: '/careers', category: 'Pages', keywords: ['careers', 'jobs', 'hiring', 'employment', 'apply', 'work', 'application'] },
  { title: 'Rewards', description: 'BA Serves rewards program — coming soon', href: '/rewards', category: 'Pages', keywords: ['rewards', 'loyalty', 'points', 'perks', 'program'] },
  { title: 'Leave a Review', description: 'Share feedback about your visit', href: '/leave-a-review', category: 'Pages', keywords: ['review', 'feedback', 'rating', 'experience'] },
  { title: 'Privacy Policy', description: 'Our privacy and data practices', href: '/privacy', category: 'Pages', keywords: ['privacy', 'policy', 'data'] },

  // Services
  { title: 'Our Services', description: 'Recreation area management services', href: '/services', category: 'Services', keywords: ['services', 'management'] },
  { title: 'Campground & Park Maintenance', description: 'Comprehensive campground and park facility maintenance', href: '/services/campground-park-maintenance', category: 'Services', keywords: ['campground', 'park', 'maintenance', 'facility', 'grounds'] },
  { title: 'Landscaping & Groundskeeping', description: 'Professional landscaping for recreation areas', href: '/services/landscaping-and-groundskeeping', category: 'Services', keywords: ['landscaping', 'groundskeeping', 'lawn', 'mowing', 'trees'] },
  { title: 'Rest Area Cleaning & Upkeep', description: 'Rest area and restroom cleaning services', href: '/services/rest-area-cleaning-and-upkeep', category: 'Services', keywords: ['rest area', 'cleaning', 'restroom', 'bathroom', 'upkeep', 'janitorial'] },
  { title: 'Preventive Maintenance & Repairs', description: 'Equipment and infrastructure repair services', href: '/services/preventive-maintenance-and-repairs', category: 'Services', keywords: ['maintenance', 'repairs', 'preventive', 'equipment', 'infrastructure', 'plumbing', 'electrical'] },

  // Locations
  { title: 'All Locations', description: 'Explore all our recreation areas', href: '/experiences', category: 'Locations', keywords: ['locations', 'all', 'explore', 'recreation areas'] },
  { title: 'Tipsaw Lake Recreation Area', description: 'Hoosier National Forest, Indiana — boating, fishing, swimming, camping', href: '/tipsaw-lake', category: 'Locations', keywords: ['tipsaw', 'lake', 'indiana', 'hoosier', 'boating', 'fishing', 'swimming', 'camping'] },
  { title: 'Yankee Springs Recreation Area', description: 'Gun Lake, Michigan — camping, hiking, mountain biking, horseback riding', href: '/yankee-springs', category: 'Locations', keywords: ['yankee springs', 'michigan', 'gun lake', 'camping', 'hiking', 'mountain biking', 'horseback'] },
  { title: 'Hardin Ridge Recreation Area', description: 'Monroe Lake, Indiana — hiking, swimming, boating, camping', href: '/hardin-ridge', category: 'Locations', keywords: ['hardin ridge', 'indiana', 'monroe lake', 'hiking', 'swimming', 'boating', 'camping'] },
  { title: 'Monongahela National Forest', description: 'West Virginia — hiking, fishing, wildlife, fall foliage', href: '/monongahela', category: 'Locations', keywords: ['monongahela', 'west virginia', 'hiking', 'fishing', 'wildlife', 'forest', 'foliage'] },
  { title: 'Washington State Park', description: 'De Soto, Missouri — cabins, watercraft rentals, hiking', href: '/washington-state-park', category: 'Locations', keywords: ['washington', 'missouri', 'de soto', 'cabins', 'watercraft', 'kayak', 'canoe', 'hiking'] },
  { title: 'Long Lake Outdoor Center', description: 'Michigan — cabins, campgrounds, outdoor activities', href: '/long-lake-outdoor-center', category: 'Locations', keywords: ['long lake', 'michigan', 'cabins', 'campground', 'outdoor'] },
  { title: 'Chief Noonday Outdoor Center', description: 'Michigan — cabins, camping, outdoor recreation', href: '/chief-noonday', category: 'Locations', keywords: ['chief noonday', 'michigan', 'cabins', 'camping', 'outdoor'] },
  { title: 'Bankhead National Forest', description: 'Alabama — Sipsey Wilderness, hiking, waterfalls, canyons', href: '/bankhead', category: 'Locations', keywords: ['bankhead', 'alabama', 'sipsey', 'wilderness', 'hiking', 'waterfalls', 'canyons'] },

  // Experience Categories
  { title: 'Campground Rentals', description: 'Browse campground and cabin rentals', href: '/experiences/categories/campground-rentals', category: 'Experiences', keywords: ['campground', 'camping', 'cabin', 'rentals', 'tent', 'rv'] },
  { title: 'Kayak & Watercraft Rentals', description: 'Kayak, canoe, and raft rentals', href: '/experiences/categories/kayak-and-watercraft-rentals', category: 'Experiences', keywords: ['kayak', 'watercraft', 'canoe', 'raft', 'boat', 'floating', 'paddle', 'river'] },
  { title: 'Hiking Trails', description: 'Explore scenic hiking trails', href: '/experiences/categories/hiking', category: 'Experiences', keywords: ['hiking', 'trails', 'walking', 'nature', 'scenic'] },
  { title: 'Scenic Drives', description: 'Discover beautiful scenic drives', href: '/experiences/categories/scenic-drives', category: 'Experiences', keywords: ['scenic', 'drives', 'driving', 'tour', 'views'] },
  { title: 'Conference Center Rentals', description: 'Event and meeting space rentals', href: '/experiences/categories/conference-center-rentals', category: 'Experiences', keywords: ['conference', 'center', 'meeting', 'event', 'rental', 'pavilion'] },

  // Booking
  { title: 'Book a Reservation', description: 'Book cabins, campsites, and watercraft', href: 'https://escape.baserves.com', category: 'Booking', keywords: ['book', 'reserve', 'reservation', 'booking'] },
  { title: 'My Reservations', description: 'View and manage your reservations', href: 'https://escape.baserves.com/customer/login', category: 'Booking', keywords: ['reservations', 'my bookings', 'manage', 'login', 'account'] },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const results = useMemo(() => {
    if (!query.trim()) return []
    const terms = query.toLowerCase().split(/\s+/)
    return searchIndex
      .map((item) => {
        const haystack = [item.title, item.description, ...item.keywords].join(' ').toLowerCase()
        let score = 0
        for (const term of terms) {
          if (item.title.toLowerCase().includes(term)) score += 3
          else if (item.keywords.some(k => k.includes(term))) score += 2
          else if (haystack.includes(term)) score += 1
        }
        return { ...item, score }
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
  }, [query])

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [searchOpen])

  // Close on Escape, open on Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleResultClick = (href: string) => {
    setSearchOpen(false)
    setMobileMenuOpen(false)
    if (href.startsWith('http')) {
      window.open(href, '_blank')
    } else {
      router.push(href)
    }
  }

  const categoryColors: Record<string, string> = {
    Pages: 'bg-gray-100 text-gray-600',
    Services: 'bg-blue-100 text-blue-700',
    Locations: 'bg-green-100 text-green-700',
    Experiences: 'bg-amber-100 text-amber-700',
    Booking: 'bg-purple-100 text-purple-700',
  }

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

            {/* Right Side - Search, Sign In, Log In Button */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-gray-400 hover:text-forest-DEFAULT border border-gray-200 rounded-md hover:border-gray-300 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden xl:inline">Search</span>
                <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono bg-gray-100 rounded text-gray-400">⌘K</kbd>
              </button>

              <a
                href="https://escape.baserves.com/customer/login"
                className="px-4 py-2 text-forest-DEFAULT hover:text-forest-dark font-medium text-sm transition-colors"
              >
                Sign In
              </a>

              <a
                href="https://escape.baserves.com/customer/login"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-5 py-2 bg-forest-DEFAULT text-white font-semibold text-sm rounded-md hover:bg-forest-dark transition-colors"
              >
                Log In
              </a>
            </div>

            {/* Mobile: Search + Menu */}
            <div className="flex lg:hidden items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button
                type="button"
                className="p-2 text-gray-700"
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
              <a
                href="https://escape.baserves.com/customer/login"
                className="block py-2 text-forest-DEFAULT font-medium"
              >
                Sign In
              </a>
              <a
                href="https://escape.baserves.com/customer/login"
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

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100]" onClick={() => setSearchOpen(false)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Search Modal */}
          <div className="relative max-w-xl mx-auto mt-20 px-4" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search locations, services, experiences..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-xs text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 hover:text-gray-600"
                >
                  ESC
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {query.trim() && results.length === 0 && (
                  <div className="px-4 py-8 text-center text-gray-400 text-sm">
                    No results for &ldquo;{query}&rdquo;
                  </div>
                )}

                {results.length > 0 && (
                  <div className="py-2">
                    {results.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleResultClick(item.href)}
                        className="w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 text-left transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">{item.title}</span>
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${categoryColors[item.category] || 'bg-gray-100 text-gray-600'}`}>
                              {item.category}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5 truncate">{item.description}</p>
                        </div>
                        <svg className="w-4 h-4 text-gray-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ))}
                  </div>
                )}

                {!query.trim() && (
                  <div className="py-3 px-4">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Quick Links</p>
                    {[
                      { title: 'All Locations', href: '/experiences' },
                      { title: 'Book a Reservation', href: 'https://escape.baserves.com' },
                      { title: 'Careers', href: '/careers' },
                      { title: 'Contact Us', href: '/contact' },
                    ].map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleResultClick(item.href)}
                        className="w-full flex items-center justify-between py-2 text-sm text-gray-600 hover:text-forest-DEFAULT transition-colors"
                      >
                        {item.title}
                        <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
