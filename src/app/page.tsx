'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// Sample data - will be replaced by Sanity
const locations = [
  {
    name: 'Tipsaw Lake Recreation Area',
    tagline: 'Scenic Lakeside Camping & Outdoor Adventure in Indiana',
    description: 'A perfect getaway for families, anglers, and outdoor enthusiasts',
    location: 'Perry County, IN | Hoosier National Forest',
    features: ['Boating', 'Fishing', 'Hiking', 'Swimming', 'RV & Tent Camping'],
    stats: { campsites: '35+', lakeSize: '131 acres', trails: '8+ miles' },
    image: '/images/DSC_0001-2048x1365.jpg',
    slug: 'tipsaw-lake-recreation-area'
  },
  {
    name: 'Yankee Springs Recreation Area',
    tagline: "Michigan's Ultimate Outdoor Escape",
    description: 'A year-round haven for outdoor lovers, families, and adventure seekers',
    location: 'Barry County, MI',
    features: ['Boating', 'Fishing', 'Hiking', 'Mountain Biking', 'RV & Tent Camping'],
    stats: { campsites: '200+', trails: '30+ miles', acres: '5,200+' },
    image: '/images/Burlingame1-2048x1365.jpg',
    slug: 'yankee-springs-recreation-area'
  },
  {
    name: 'Canal Bridge Campground',
    tagline: 'Scenic Riverside Camping in Maine',
    description: 'A peaceful retreat for paddlers, anglers, and nature lovers',
    location: 'Fryeburg, ME',
    features: ['Kayaking', 'Fishing', 'Hiking', 'Wildlife Viewing', 'RV & Tent Camping'],
    stats: { sites: 'Multiple', waterfront: 'Waterfront Access', river: 'Saco River' },
    image: '/images/Canal-Bridge-Entrance-1-2048x1365.jpg',
    slug: 'experiences/canal-bridge'
  },
]

const experienceCategories = [
  { name: 'Cave Tours', icon: '🦇', count: 5, slug: 'cave-tours' },
  { name: 'Kayak & Watercraft', icon: '🚣', count: 12, slug: 'kayak-and-watercraft-rentals' },
  { name: 'Campground Rentals', icon: '⛺', count: 25, slug: 'campground-rentals' },
  { name: 'Scenic Drives', icon: '🚗', count: 8, slug: 'scenic-drives' },
  { name: 'Hiking Trails', icon: '🥾', count: 30, slug: 'hiking' },
  { name: 'Conference Centers', icon: '🏛️', count: 4, slug: 'conference-center-rentals' },
]

const services = [
  {
    title: 'Campground & Park Maintenance',
    description: 'Comprehensive maintenance services ensuring pristine facilities and grounds year-round.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: 'Landscaping & Groundskeeping',
    description: 'Professional landscaping services maintaining natural beauty and visitor safety.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: 'Rest Area Cleaning',
    description: 'Thorough cleaning and upkeep of rest areas ensuring visitor comfort and hygiene.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
  },
  {
    title: 'Preventive Maintenance',
    description: 'Proactive maintenance and repairs preventing issues before they impact visitors.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

const stats = [
  { number: '15+', label: 'Recreation Areas' },
  { number: '500+', label: 'Campsites' },
  { number: '100+', label: 'Miles of Trails' },
  { number: '10K+', label: 'Happy Visitors' },
]

function AnimatedCounter({ target, suffix = '', isActive }: { target: number; suffix?: string; isActive: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setCount(0)
      return
    }

    let startTime: number
    let animationFrame: number
    const duration = 2000

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [target, isActive])

  return <span>{count}{suffix}</span>
}

export default function HomePage() {
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/DSC_0110-2048x1365.jpg"
            alt="Beautiful recreation area"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom px-6 pt-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8 animate-fade-in">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +1 207 307-7903
            </div>

            <h1 className="font-display headline-xl text-white mb-6 animate-fade-in-up">
              Find Your<br />
              <span className="text-green-400">Adventure.</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-10 max-w-2xl animate-fade-in-up delay-200">
              From <span className="text-white font-medium">the rolling forests of Alabama</span> to{' '}
              <span className="text-white font-medium">the rugged landscapes of Missouri</span>, our
              managed sites provide <span className="text-green-400 font-medium">well-maintained facilities</span>,{' '}
              <span className="text-green-400 font-medium">pristine landscapes</span>, and{' '}
              <span className="text-green-400 font-medium">seamless visitor experiences</span>.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <a
                href="https://escape.baserves.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-lg"
              >
                Book Your Adventure
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <Link href="/experiences" className="btn-outline-white text-lg">
                Explore Locations
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-forest-DEFAULT">
        <div className="container-custom px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {statsVisible ? (
                    <AnimatedCounter
                      target={parseInt(stat.number)}
                      suffix={stat.number.includes('+') ? '+' : stat.number.includes('K') ? 'K+' : ''}
                      isActive={statsVisible}
                    />
                  ) : (
                    '0'
                  )}
                </div>
                <div className="text-white/70 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Locations */}
      <section className="section bg-gray-50">
        <div className="container-custom px-6">
          <div className="text-center mb-16">
            <span className="badge badge-forest mb-4">Featured Destinations</span>
            <h2 className="headline-lg text-gray-900 mb-4">
              Discover Our <span className="text-forest-DEFAULT">Recreation Areas</span>
            </h2>
            <p className="subheadline max-w-2xl mx-auto">
              Each location offers unique experiences, from lakeside camping to mountain adventures
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <Link
                key={location.name}
                href={`/${location.slug}`}
                className="location-card group"
              >
                <div className="location-card-image">
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="location-card-overlay" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full mb-2">
                      {location.tagline}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {location.features.slice(0, 4).map((feature) => (
                      <span key={feature} className="text-xs text-gray-500">
                        {feature} •
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-forest-DEFAULT transition-colors">
                    {location.name}
                  </h3>
                  <p className="text-gray-600 text-sm italic mb-3">{location.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    {location.location}
                  </div>
                  <div className="flex justify-between text-sm border-t pt-4">
                    {Object.entries(location.stats).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-semibold text-forest-DEFAULT">{value}</span>
                        <span className="text-gray-500 ml-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/experiences" className="btn-secondary">
              View All Locations
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Experience Categories */}
      <section className="section bg-white">
        <div className="container-custom px-6">
          <div className="text-center mb-16">
            <span className="badge badge-forest mb-4">What We Offer</span>
            <h2 className="headline-lg text-gray-900 mb-4">
              Explore by <span className="text-forest-DEFAULT">Experience</span>
            </h2>
            <p className="subheadline max-w-2xl mx-auto">
              Whether you're seeking adventure or relaxation, we have something for everyone
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {experienceCategories.map((category) => (
              <Link
                key={category.name}
                href={`/experiences/categories/${category.slug}`}
                className="group p-6 bg-gray-50 rounded-2xl text-center hover:bg-forest-DEFAULT transition-all duration-300 card-hover"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-white transition-colors mb-1">
                  {category.name}
                </h3>
                <span className="text-sm text-gray-500 group-hover:text-white/70 transition-colors">
                  {category.count} locations
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-gray-900 text-white">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="badge bg-white/10 text-white mb-4">Our Services</span>
              <h2 className="headline-lg mb-6">
                Professional Recreation Area <span className="text-green-400">Management</span>
              </h2>
              <p className="text-xl text-white/70 leading-relaxed mb-8">
                Beyond providing unforgettable outdoor experiences, we offer comprehensive management
                services to keep recreation areas pristine and welcoming for all visitors.
              </p>
              <Link href="/services" className="btn-primary">
                Learn About Our Services
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-white/60 text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/Playground-Gallery-Pic-2048x1365.jpg"
            alt="Adventure awaits"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-forest-DEFAULT/90" />
        </div>

        <div className="relative z-10 container-custom px-6 text-center">
          <h2 className="font-display headline-lg text-white mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Book your stay at one of our pristine recreation areas and create memories that last a lifetime.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://escape.baserves.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-forest-DEFAULT hover:bg-gray-100"
            >
              Book Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="tel:+12073077903" className="btn-outline-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
