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
  { name: 'Contact Us', href: '/contact' },
]

const secondaryNavLinks = [
  { name: 'Book', href: 'https://escape.baserves.com', external: true },
  { name: 'My Reservations', href: 'https://escape.baserves.com/customer/login', external: true },
  { name: 'Campgrounds', href: '/experiences/categories/campground-rentals' },
  { name: 'Watercraft', href: '/experiences/categories/kayak-and-watercraft-rentals' },
]

interface LocationItem {
  name: string
  href: string
  image: string
  children?: LocationItem[]
}

const locationsByState: { state: string; icon: string; locations: LocationItem[
,
] }[] = [
  {
    state: 'Alabama',
    icon: '/images/states/alabama.png',
    locations: [
      { name: 'Bankhead National Forest', href: '/bankhead-national-forest', image: '/images/bankhead-forest.jpg', children: [
        { name: 'Clear Creek Recreation Area', href: '/experiences/clear-creek-recreation-area', image: '/images/clear-creek-overview.jpg' },
        { name: 'Corinth Recreation Area', href: '/experiences/corinth-recreation-area', image: '/images/corinth-boat-ramp.jpg' },
      ]},
    ],
  },
  {
    state: 'Indiana',
    icon: '/images/states/indiana.png',
    locations: [
      { name: 'Hoosier National Forest', href: '/hoosier-national-forest', image: '/images/hardin-ridge/aerial.jpg', children: [
        { name: 'Hardin Ridge Recreation Area', href: '/hardin-ridge-recreation-area', image: '/images/hardin-ridge-entrance-sign.jpg' },
        { name: 'Indian-Celina Lakes Recreation Area', href: '/indian-celina-lakes-recreation-area', image: '/images/indian-celina-entrance-sign.jpg' },
        { name: 'Tipsaw Lake Recreation Area', href: '/tipsaw-lake-recreation-area', image: '/images/tipsaw-lake/lake-view.jpg' },
      ]},
    ],
  },
  {
    state: 'Maine',
    icon: '/images/states/maine.png',
    locations: [
      { name: 'Canal Bridge Campground', href: '/experiences/canal-bridge', image: '/images/Canal-Bridge-Entrance-1-2048x1365.jpg' },
    ],
  },
  {
    state: 'Michigan',
    icon: '/images/states/michigan.png',
    locations: [
      { name: 'Yankee Springs Recreation Area', href: '/yankee-springs-recreation-area', image: '/images/yankee-springs/hill-cabins.jpg', children: [
        { name: 'Chief Noonday Outdoor Center', href: '/chief-noonday-outdoor-center', image: '/images/chief-noonday/deer-lodge.jpg' },
        { name: 'Long Lake Outdoor Center', href: '/long-lake-outdoor-center', image: '/images/long-lake/fall-aerial.jpg' },
      ]},
    ],
  },
  {
    state: 'Missouri',
    icon: '/images/states/missouri.png',
    locations: [
      { name: 'Washington State Park', href: '/washington-state-park', image: '/images/washington-thunderbird-lodge.png' },
      { name: 'Meramec State Park', href: '/experiences/meramec-state-park', image: '/images/meramec-entrance-sign.jpg' },
    ],
  },
  {
    state: 'Rhode Island',
    icon: '/images/states/rhode-island.png',
    locations: [
      { name: 'Burlingame State Park', href: '/experiences/burlingame-state-park', image: '/images/burlingame-entrance-sign.jpg', children: [
        { name: 'Burlingame State Campground', href: '/experiences/burlingame-state-park', image: '/images/burlingame-aerial.jpg' },
      ]},
    ],
  },
  {
    state: 'West Virginia',
    icon: '/images/states/west-virginia.png',
    locations: [
      { name: 'Monongahela National Forest', href: '/monongahela-national-forest', image: '/images/monongahela/entrance-sign.jpg', children: [
        { name: 'Big Bend Campground', href: '/monongahela-national-forest/big-bend-campground', image: '/images/monongahela/scenic-drive.jpg' },
        { name: 'Jess Judy Group Campground', href: '/monongahela-national-forest/jess-judy-group-campground', image: '/images/monongahela/spruce-treetops.jpg' },
        { name: 'Seneca Shadows Campground', href: '/monongahela-national-forest/seneca-shadows-campground', image: '/images/monongahela/seneca-rocks-sign.jpg' },
        { name: 'Spruce Knob Lake Campground', href: '/monongahela-national-forest/spruce-knob-lake-campground', image: '/images/monongahela/spruce-knob-sign.jpg' },
        { name: 'Gatewood Group Campground', href: '/monongahela-national-forest/gatewood-group-campground', image: '/images/monongahela/spruce-knob-panorama.jpg' },
        { name: 'Stuart Recreation Area', href: '/monongahela-national-forest/stuart-recreation-area', image: '/images/monongahela/entrance-sign.jpg' },
      ]},
    ],
  },
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
  { title: 'Home', description: 'BA Services homepage — outdoor recreation management', href: '/', category: 'Pages', keywords: ['home', 'main', 'recreation', 'outdoor'] },
  { title: 'About Us', description: 'Our mission, values, and team', href: '/about', category: 'Pages', keywords: ['about', 'mission', 'team', 'values', 'company', 'who'] },
  { title: 'Contact', description: 'Get in touch with our team', href: '/contact', category: 'Pages', keywords: ['contact', 'email', 'phone', 'message', 'help', 'support'] },
  { title: 'Careers', description: 'Job openings and employment application', href: '/careers', category: 'Pages', keywords: ['careers', 'jobs', 'hiring', 'employment', 'apply', 'work', 'application'] },
  { title: 'Rewards', description: 'BA Services rewards program — coming soon', href: '/rewards', category: 'Pages', keywords: ['rewards', 'loyalty', 'points', 'perks', 'program'] },
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
  { title: 'Hoosier National Forest', description: 'Southern Indiana — 200,000 acres with 3 recreation areas, trails, and camping', href: '/hoosier-national-forest', category: 'Locations', keywords: ['hoosier', 'indiana', 'national forest', 'southern indiana', 'hiking', 'camping'] },
  { title: 'Tipsaw Lake Recreation Area', description: 'Hoosier National Forest, Indiana — boating, fishing, swimming, camping', href: '/tipsaw-lake-recreation-area', category: 'Locations', keywords: ['tipsaw', 'lake', 'indiana', 'hoosier', 'boating', 'fishing', 'swimming', 'camping'] },
  { title: 'Indian-Celina Lakes Recreation Area', description: 'Hoosier National Forest, Indiana — twin lakes, fishing pier, camping', href: '/indian-celina-lakes-recreation-area', category: 'Locations', keywords: ['indian', 'celina', 'lakes', 'indiana', 'hoosier', 'fishing', 'camping', 'boating'] },
  { title: 'Yankee Springs Recreation Area', description: 'Gun Lake, Michigan — camping, hiking, mountain biking, horseback riding', href: '/yankee-springs', category: 'Locations', keywords: ['yankee springs', 'michigan', 'gun lake', 'camping', 'hiking', 'mountain biking', 'horseback'] },
  { title: 'Hardin Ridge Recreation Area', description: 'Monroe Lake, Indiana — hiking, swimming, boating, camping', href: '/hardin-ridge-recreation-area', category: 'Locations', keywords: ['hardin ridge', 'indiana', 'monroe lake', 'hiking', 'swimming', 'boating', 'camping'] },
  { title: 'Monongahela National Forest', description: 'West Virginia — hiking, fishing, wildlife, fall foliage', href: '/monongahela', category: 'Locations', keywords: ['monongahela', 'west virginia', 'hiking', 'fishing', 'wildlife', 'forest', 'foliage'] },
  { title: 'Washington State Park', description: 'De Soto, Missouri — cabins, watercraft rentals, hiking', href: '/washington-state-park', category: 'Locations', keywords: ['washington', 'missouri', 'de soto', 'cabins', 'watercraft', 'kayak', 'canoe', 'hiking'] },
  { title: 'Long Lake Outdoor Center', description: 'Michigan — cabins, campgrounds, outdoor activities', href: '/long-lake-outdoor-center', category: 'Locations', keywords: ['long lake', 'michigan', 'cabins', 'campground', 'outdoor'] },
  { title: 'Chief Noonday Outdoor Center', description: 'Michigan — cabins, camping, outdoor recreation', href: '/chief-noonday', category: 'Locations', keywords: ['chief noonday', 'michigan', 'cabins', 'camping', 'outdoor'] },
  { title: 'Bankhead National Forest', description: 'Alabama — Sipsey Wilderness, birding, waterfalls, shooting range', href: '/bankhead-national-forest', category: 'Locations', keywords: ['bankhead', 'alabama', 'sipsey', 'wilderness', 'hiking', 'waterfalls', 'canyons', 'birding', 'shooting range'] },

  // Experiences (detailed pages)
  { title: 'Clear Creek Recreation Area', description: '102 campsites on Lewis Smith Lake — swimming, trails, group camping', href: '/experiences/clear-creek-recreation-area', category: 'Experiences', keywords: ['clear creek', 'lewis smith', 'alabama', 'bankhead', 'swimming', 'camping', 'boat ramp', 'hiking'] },
  { title: 'Corinth Recreation Area', description: '52 full-hookup sites on Lewis Smith Lake — pavilion, Bobwhite Trail', href: '/experiences/corinth-recreation-area', category: 'Experiences', keywords: ['corinth', 'lewis smith', 'alabama', 'bankhead', 'full hookup', 'pavilion', 'bobwhite', 'tent camping'] },
  { title: 'Burlingame State Park', description: '755 campsites & 20 cabins on Watchaug Pond — Rhode Island since 1934', href: '/experiences/burlingame-state-park', category: 'Experiences', keywords: ['burlingame', 'rhode island', 'watchaug', 'cabins', 'camping', 'swimming', 'wildlife', 'history'] },
  { title: 'Canal Bridge Campground', description: '36 campsites on the Saco River — kayaking, fishing, pet friendly', href: '/experiences/canal-bridge', category: 'Experiences', keywords: ['canal bridge', 'maine', 'saco river', 'kayaking', 'fishing', 'tent', 'camping', 'fryeburg'] },
  { title: 'Meramec State Park', description: 'Cabins, motel, and watercraft on the Meramec River', href: '/experiences/meramec-state-park', category: 'Experiences', keywords: ['meramec', 'missouri', 'cabins', 'motel', 'watercraft', 'canoe', 'kayak'] },

  // Experience Categories
  { title: 'Campground Rentals', description: 'Browse campground and cabin rentals', href: '/experiences/categories/campground-rentals', category: 'Experiences', keywords: ['campground', 'camping', 'cabin', 'rentals', 'tent', 'rv'] },
  { title: 'Kayak & Watercraft Rentals', description: 'Kayak, canoe, and raft rentals', href: '/experiences/categories/kayak-and-watercraft-rentals', category: 'Experiences', keywords: ['kayak', 'watercraft', 'canoe', 'raft', 'boat', 'floating', 'paddle', 'river'] },
  { title: 'Hiking Trails', description: 'Explore scenic hiking trails', href: '/experiences/categories/hiking', category: 'Experiences', keywords: ['hiking', 'trails', 'walking', 'nature', 'scenic'] },
  { title: 'Scenic Drives', description: 'Discover beautiful scenic drives', href: '/experiences/categories/scenic-drives', category: 'Experiences', keywords: ['scenic', 'drives', 'driving', 'tour', 'views'] },
  { title: 'Conference Center Rentals', description: 'Event and meeting space rentals', href: '/experiences/categories/conference-center-rentals', category: 'Experiences', keywords: ['conference', 'center', 'meeting', 'event', 'rental', 'pavilion'] },
  { title: 'Lookout Pavilions', description: 'Scenic overlooks and covered pavilions', href: '/experiences/categories/lookout-pavillions', category: 'Experiences', keywords: ['lookout', 'pavilion', 'overlook', 'picnic', 'gathering'] },

  // Booking
  { title: 'Book a Reservation', description: 'Book cabins, campsites, and watercraft', href: 'https://escape.baserves.com', category: 'Booking', keywords: ['book', 'reserve', 'reservation', 'booking'] },
  { title: 'My Reservations', description: 'View and manage your reservations', href: 'https://escape.baserves.com/customer/login', category: 'Booking', keywords: ['reservations', 'my bookings', 'manage', 'login', 'account'] },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [locationsOpen, setLocationsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const locationsRef = useRef<HTMLDivElement>(null)
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
      if (e.key === 'Escape') { setSearchOpen(false); setLocationsOpen(false) }
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
                  alt="BA Services"
                  width={140}
                  height={47}
                  className="h-9 w-auto"
                  priority
                />
              </Link>

              {/* Primary Nav Links */}
              <nav className="hidden lg:flex items-center gap-1">
                {topNavLinks.map((item) => (
                  item.name === 'Services' ? (
                    <div key={item.name} className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-1 px-4 py-2 text-forest-DEFAULT hover:text-forest-dark font-medium text-sm transition-colors"
                      >
                        {item.name}
                        <svg className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Link>
                      <div className={`absolute top-full -left-20 pt-2 z-50 transition-all duration-300 ease-out ${
                        servicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}>
                        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-[700px]">
                          <div className="grid grid-cols-2 gap-6">
                            {/* DOT / Government */}
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">Government</span>
                                <span className="text-sm font-bold text-gray-900">DOT Rest Areas</span>
                              </div>
                              <div className="space-y-1">
                                <Link href="/services/iowa-dot" onClick={() => setServicesOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
                                  <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                    <Image src="/images/bankhead-forest.jpg" alt="Iowa" fill className="object-cover" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-semibold text-gray-900 group-hover:text-forest-DEFAULT">Iowa DOT</div>
                                    <div className="text-xs text-gray-500">I-29 corridor — Sergeant Bluff</div>
                                  </div>
                                </Link>
                                <Link href="/services/utah-dot" onClick={() => setServicesOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
                                  <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                    <Image src="/images/monongahela/spruce-knob-panorama.jpg" alt="Utah" fill className="object-cover" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-semibold text-gray-900 group-hover:text-forest-DEFAULT">Utah DOT</div>
                                    <div className="text-xs text-gray-500">28 rest areas — 3 regions statewide</div>
                                  </div>
                                </Link>
                              </div>
                              <div className="mt-4 pt-3 border-t border-gray-100">
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Services</div>
                                <div className="space-y-1">
                                  {[
                                    { name: 'Campground & Park Maintenance', href: '/services/campground-park-maintenance' },
                                    { name: 'Landscaping & Groundskeeping', href: '/services/landscaping-and-groundskeeping' },
                                    { name: 'Preventive Maintenance & Repairs', href: '/services/preventive-maintenance-and-repairs' },
                                    { name: 'Rest Area Cleaning & Upkeep', href: '/services/rest-area-cleaning-and-upkeep' },
                                  ].map((s) => (
                                    <Link key={s.href} href={s.href} onClick={() => setServicesOpen(false)} className="block px-3 py-1.5 text-sm text-gray-600 hover:text-forest-DEFAULT hover:bg-gray-50 rounded-lg transition-colors">
                                      {s.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Recreation Management */}
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-700">Concessions</span>
                                <span className="text-sm font-bold text-gray-900">Recreation Management</span>
                              </div>
                              <div className="space-y-1">
                                {[
                                  { name: 'Bankhead National Forest', href: '/bankhead-national-forest', image: '/images/bankhead-forest.jpg', sub: 'Alabama — 2 Recreation Areas' },
                                  { name: 'Burlingame State Park', href: '/experiences/burlingame-state-park', image: '/images/burlingame-entrance-sign.jpg', sub: 'Rhode Island — 755 sites, 20 cabins' },
                                  { name: 'Canal Bridge Campground', href: '/experiences/canal-bridge', image: '/images/Canal-Bridge-Entrance-1-2048x1365.jpg', sub: 'Maine — 36 sites on the Saco River' },
                                  { name: 'Hoosier National Forest', href: '/hoosier-national-forest', image: '/images/hardin-ridge-entrance-sign.jpg', sub: 'Indiana — 3 recreation areas' },
                                  { name: 'Meramec State Park', href: '/experiences/meramec-state-park', image: '/images/meramec-entrance-sign.jpg', sub: 'Missouri — lodging, dining, watercraft' },
                                  { name: 'Monongahela National Forest', href: '/monongahela-national-forest', image: '/images/monongahela/entrance-sign.jpg', sub: 'West Virginia — 6 campgrounds' },
                                  { name: 'Washington State Park', href: '/washington-state-park', image: '/images/washington-thunderbird-lodge.png', sub: 'Missouri — cabins, pool, trails' },
                                  { name: 'Yankee Springs Recreation Area', href: '/yankee-springs-recreation-area', image: '/images/yankee-springs/hill-cabins.jpg', sub: 'Michigan — 200+ sites, 30+ miles of trails' },
                                ].map((p) => (
                                  <Link key={p.href} href={p.href} onClick={() => setServicesOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors group">
                                    <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-semibold text-gray-900 group-hover:text-forest-DEFAULT">{p.name}</div>
                                      <div className="text-xs text-gray-500">{p.sub}</div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <Link href="/services" onClick={() => setServicesOpen(false)} className="text-sm font-semibold text-forest-DEFAULT hover:underline">
                              View All Services &rarr;
                            </Link>
                            <Link href="/contact?topic=partnership" onClick={() => setServicesOpen(false)} className="text-sm font-semibold text-white bg-forest-DEFAULT px-4 py-2 rounded-lg hover:bg-forest-dark transition-colors">
                              Partnership Inquiries
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="px-4 py-2 text-forest-DEFAULT hover:text-forest-dark font-medium text-sm transition-colors"
                    >
                      {item.name}
                    </Link>
                  )
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
              {/* Locations Dropdown */}
              <div ref={locationsRef} className="relative" onMouseEnter={() => setLocationsOpen(true)} onMouseLeave={() => setLocationsOpen(false)}>
                <button
                  className="flex items-center gap-1 px-4 py-2 text-white/90 hover:text-white font-medium text-sm transition-colors"
                >
                  Locations
                  <svg className={`w-3.5 h-3.5 transition-transform ${locationsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                  <div className={`absolute top-full left-0 pt-1 w-80 z-50 transition-all duration-300 ease-out ${
                    locationsOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}><div className="bg-white rounded-xl shadow-2xl border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <Link
                        href="/experiences"
                        onClick={() => setLocationsOpen(false)}
                        className="text-xs font-semibold text-forest-DEFAULT hover:underline uppercase tracking-wide"
                      >
                        View All Locations
                      </Link>
                    </div>
                    <div className="max-h-[28rem] overflow-y-auto py-1">
                      {locationsByState.map((group) => (
                        <div key={group.state}>
                          <div className="px-4 pt-3 pb-1.5">
                            <span className="inline-flex items-center gap-2 px-2.5 py-1 bg-gray-100 rounded-full">
                              <Image src={group.icon} alt={group.state} width={18} height={18} className="opacity-70" />
                              <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{group.state}</span>
                            </span>
                          </div>
                          {group.locations.map((loc) => (
                            <div key={loc.href}>
                              <Link
                                href={loc.href}
                                onClick={() => setLocationsOpen(false)}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                                  <Image src={loc.image} alt={loc.name} fill className="object-cover" />
                                </div>
                                {loc.name}
                              </Link>
                              {loc.children?.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setLocationsOpen(false)}
                                  className="flex items-center gap-3 pl-8 pr-4 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                                >
                                  <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                                    <Image src={child.image} alt={child.name} fill className="object-cover" />
                                  </div>
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div></div>
              </div>
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

      {/* Mobile menu - slide out drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Fixed Top - Header + Log In + Phone */}
          <div className="bg-stone-100 border-b border-stone-200">
            <div className="flex items-center justify-between px-6 py-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/images/logo.png"
                  alt="BA Services"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 pb-4 space-y-2">
              <a
                href="https://escape.baserves.com/customer/login"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors"
              >
                Log In
              </a>
              <a
                href="tel:+12073077903"
                className="flex items-center justify-center gap-2 py-1.5 text-gray-500 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 207 307-7903
              </a>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto bg-white">
            <div className="px-6 py-4 space-y-1">
              {/* Primary Links */}
              {topNavLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-between py-3 text-gray-800 font-medium border-b border-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                  <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

            {/* Locations Section */}
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Locations</p>
              <div className="space-y-0">
                {locationsByState.map((group) => (
                  <div key={group.state}>
                    <div className="pt-3 pb-1.5">
                      <span className="inline-flex items-center gap-2 px-2.5 py-1 bg-gray-200 rounded-full">
                        <Image src={group.icon} alt={group.state} width={18} height={18} className="opacity-70" />
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{group.state}</span>
                      </span>
                    </div>
                    {group.locations.map((loc) => (
                      <div key={loc.href}>
                        <Link
                          href={loc.href}
                          className="flex items-center gap-3 py-2 pl-2 text-gray-600 text-sm"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                            <Image src={loc.image} alt={loc.name} fill className="object-cover" />
                          </div>
                          {loc.name}
                        </Link>
                        {loc.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-3 py-1.5 pl-6 text-gray-500 text-sm"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                              <Image src={child.image} alt={child.name} fill className="object-cover" />
                            </div>
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
                <Link
                  href="/experiences"
                  className="flex items-center justify-between pt-4 pb-2 text-forest-DEFAULT text-sm font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  View All Locations
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Experiences Section */}
            <div className="px-6 py-4">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Quick Links</p>
              <div className="space-y-1">
                {secondaryNavLinks.map((item) => (
                  item.external ? (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-2.5 text-gray-600 text-sm"
                    >
                      {item.name}
                      <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-between py-2.5 text-gray-600 text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                      <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="px-6 py-4">
              <button
                onClick={() => { setMobileMenuOpen(false); setTimeout(() => setSearchOpen(true), 200) }}
                className="flex items-center gap-3 w-full py-3 px-4 bg-gray-100 rounded-lg text-gray-500 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search the site...
              </button>
            </div>
          </div>

          {/* Bottom safe area padding */}
          <div className="pb-6" />
        </div>
      </div>

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
