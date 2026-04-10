'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { KayakIcon, CampIcon, CarIcon, HikeIcon, BuildingIcon } from '@/components/Icons'

const PropertyMap = dynamic(() => import('@/components/PropertyMap'), { ssr: false })
import ScopeAccordion from '@/components/ScopeAccordion'

// All featured destinations — 3 shown at a time, rotating every 6 seconds
const allLocations = [
  {
    name: 'Tipsaw Lake Recreation Area',
    tagline: 'Scenic Lakeside Camping & Outdoor Adventure in Indiana',
    description: 'A perfect getaway for families, anglers, and outdoor enthusiasts',
    location: 'Perry County, IN | Hoosier National Forest',
    features: ['Boating', 'Fishing', 'Hiking', 'Swimming', 'RV & Tent Camping'],
    stats: { campsites: '35+', lakeSize: '131 acres', trails: '8+ miles' },
    image: '/images/tipsaw-entrance-sign.jpg',
    slug: 'tipsaw-lake-recreation-area'
  },
  {
    name: 'Yankee Springs Recreation Area',
    tagline: "Michigan's Ultimate Outdoor Escape",
    description: 'A year-round haven for outdoor lovers, families, and adventure seekers',
    location: 'Barry County, MI',
    features: ['Boating', 'Fishing', 'Hiking', 'Mountain Biking', 'RV & Tent Camping'],
    stats: { campsites: '200+', trails: '30+ miles', acres: '5,200+' },
    image: '/images/yankee-springs/hill-cabins.jpg',
    slug: 'yankee-springs-recreation-area'
  },
  {
    name: 'Canal Bridge Campground',
    tagline: 'Scenic Riverside Camping in Maine',
    description: 'A peaceful retreat for paddlers, anglers, and nature lovers',
    location: 'Fryeburg, ME',
    features: ['Kayaking', 'Fishing', 'Hiking', 'Wildlife Viewing', 'RV & Tent Camping'],
    stats: { sites: '36', waterfront: 'Saco River', views: 'White Mtns' },
    image: '/images/Canal-Bridge-Entrance-1-2048x1365.jpg',
    slug: 'experiences/canal-bridge'
  },
  {
    name: 'Meramec State Park',
    tagline: 'Premier Camping & Caving on the Meramec River',
    description: 'Cabins, camping, float trips, and cave tours in the Ozarks',
    location: 'Sullivan, MO',
    features: ['Cabins', 'Float Trips', 'Cave Tours', 'Fishing', 'Hiking'],
    stats: { acres: '6,896', cabins: '19', river: 'Meramec' },
    image: '/images/meramec-entrance-sign.jpg',
    slug: 'experiences/meramec-state-park'
  },
  {
    name: 'Washington State Park',
    tagline: 'Ancient Petroglyphs & Ozark Trails',
    description: 'Historic petroglyphs, rustic cabins, and trails along the Big River',
    location: 'De Soto, MO',
    features: ['Hiking', 'Cabins', 'Swimming', 'Historic Sites', 'Watercraft'],
    stats: { campsites: '50+', trails: '10+ mi', acres: '2,147+' },
    image: '/images/washington-thunderbird-lodge.png',
    slug: 'washington-state-park'
  },
  {
    name: 'Burlingame State Park',
    tagline: "Rhode Island's Largest Campground Since 1934",
    description: '755 campsites and 20 rustic cabins on the shores of Watchaug Pond',
    location: 'Charlestown, RI',
    features: ['Swimming', 'Fishing', 'Boating', 'Hiking', 'Cabins'],
    stats: { campsites: '755', cabins: '20', acres: '3,100+' },
    image: '/images/burlingame-entrance-sign.jpg',
    slug: 'experiences/burlingame-state-park'
  },
  {
    name: 'Hardin Ridge Recreation Area',
    tagline: "Indiana's Largest Lake Campground",
    description: '200+ campsites on Monroe Lake with beach, boat ramp, and hiking',
    location: 'Bloomington, IN | Hoosier National Forest',
    features: ['Boating', 'Fishing', 'Hiking', 'Swimming', 'RV & Tent Camping'],
    stats: { campsites: '200+', lake: '10,750 ac', trails: '12+ mi' },
    image: '/images/hardin-ridge-entrance-sign.jpg',
    slug: 'hardin-ridge-recreation-area'
  },
  {
    name: 'Clear Creek Recreation Area',
    tagline: '102 Campsites on Lewis Smith Lake',
    description: 'Swimming beach, boat ramps, and hiking trails in Bankhead NF',
    location: 'Bankhead National Forest, AL',
    features: ['Camping', 'Swimming', 'Boat Ramp', 'Hiking', 'Group Camping'],
    stats: { campsites: '102', loops: '4', trails: '2' },
    image: '/images/clear-creek-overview.jpg',
    slug: 'experiences/clear-creek-recreation-area'
  },
  {
    name: 'Monongahela National Forest',
    tagline: 'Untamed Wilderness in West Virginia',
    description: '900,000+ acres across the Alleghenies with 800+ miles of trails',
    location: 'West Virginia',
    features: ['Hiking', 'Scenic Drives', 'Fishing', 'Rock Climbing', 'Camping'],
    stats: { acres: '921,000+', trails: '800+ mi', peaks: '4,863 ft' },
    image: '/images/monongahela/entrance-sign.jpg',
    slug: 'monongahela-national-forest'
  },
  {
    name: 'Long Lake Outdoor Center',
    tagline: 'Year-Round Outdoor Education & Recreation',
    description: 'CCC-built retreat center with cabins, a private lake, and lodge',
    location: 'Middleville, MI',
    features: ['Group Camping', 'Outdoor Education', 'Team Building', 'Lake Activities'],
    stats: { cabins: '16', capacity: '200+', lake: 'Private' },
    image: '/images/long-lake/fall-foliage.jpg',
    slug: 'long-lake-outdoor-center'
  },
  {
    name: 'Indian-Celina Lakes Recreation Area',
    tagline: 'Twin Lakes in the Heart of Hoosier National Forest',
    description: 'Accessible fishing pier, camping, boat launch, and hiking trails',
    location: 'Perry County, IN | Hoosier National Forest',
    features: ['Fishing', 'Kayaking', 'Hiking', 'Swimming', 'RV & Tent Camping'],
    stats: { lakes: '2', campsites: '80+', trails: 'Multiple' },
    image: '/images/indian-celina-entrance-sign.jpg',
    slug: 'indian-celina-lakes-recreation-area'
  },
  {
    name: 'Bankhead National Forest',
    tagline: 'The Land of a Thousand Waterfalls',
    description: '180,000 acres of canyons, waterfalls, and the Sipsey Wilderness',
    location: 'Northwest Alabama',
    features: ['Birding', 'Waterfall Hikes', 'Sipsey Wilderness', 'Scenic Drives'],
    stats: { acres: '180,000+', species: '84 birds', wilderness: 'Sipsey' },
    image: '/images/bankhead-forest.jpg',
    slug: 'bankhead-national-forest'
  },
  {
    name: 'Corinth Recreation Area',
    tagline: 'Modern Full-Hookup Campground',
    description: '52 full-hookup sites on Lewis Smith Lake with pavilion and beach',
    location: 'Bankhead National Forest, AL',
    features: ['Full Hookup Camping', 'Swimming', 'Boat Ramp', 'Pavilion'],
    stats: { sites: '52 + 10 tent', pavilion: '100-person', trail: '1.3 mi' },
    image: '/images/corinth-boat-ramp.jpg',
    slug: 'experiences/corinth-recreation-area'
  },
]

const experienceCategories = [
  { name: 'Kayak & Watercraft', icon: <KayakIcon className="w-8 h-8" />, count: 12, slug: 'kayak-and-watercraft-rentals' },
  { name: 'Campground Rentals', icon: <CampIcon className="w-8 h-8" />, count: 25, slug: 'campground-rentals' },
  { name: 'Scenic Drives', icon: <CarIcon className="w-8 h-8" />, count: 8, slug: 'scenic-drives' },
  { name: 'Hiking Trails', icon: <HikeIcon className="w-8 h-8" />, count: 30, slug: 'hiking' },
  { name: 'Conference Centers', icon: <BuildingIcon className="w-8 h-8" />, count: 4, slug: 'conference-center-rentals' },
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
  { target: 15, suffix: '+', label: 'Recreation Areas' },
  { target: 500, suffix: '+', label: 'Campsites' },
  { target: 100, suffix: '+', label: 'Miles of Trails' },
  { target: 10, suffix: 'K+', label: 'Happy Visitors' },
]

const statesData = [
  {
    name: 'Alabama',
    icon: '/images/states/alabama.png',
    heading: 'Camping, Birding & Waterfalls in Alabama',
    properties: [
      {
        name: 'Clear Creek Recreation Area',
        tagline: '102 Campsites on Lewis Smith Lake',
        location: 'Bankhead National Forest, AL',
        stats: { campsites: '102', loops: '4', trails: '2' },
        activities: ['Camping', 'Swimming Beach', 'Boat Ramp', 'Hiking Trails', 'Group Camping'],
        href: '/experiences/clear-creek-recreation-area',
        image: '/images/clear-creek-overview.jpg',
      },
      {
        name: 'Corinth Recreation Area',
        tagline: 'Modern Full-Hookup Campground',
        location: 'Bankhead National Forest, AL',
        stats: { sites: '52 + 10 tent', pavilion: '100-person', trail: '1.3 mi' },
        activities: ['Full Hookup Camping', 'Swimming', 'Boat Ramp', 'Bobwhite Trail', 'Pavilion'],
        href: '/experiences/corinth-recreation-area',
        image: '/images/corinth-boat-ramp.jpg',
      },
      {
        name: 'Bankhead National Forest',
        tagline: 'The Land of a Thousand Waterfalls',
        location: 'Northwest Alabama',
        stats: { acres: '180,000+', birdSpecies: '84', wilderness: 'Sipsey' },
        activities: ['Birding', 'Waterfall Hikes', 'Sipsey Wilderness', 'Shooting Range', 'Scenic Drives'],
        href: '/bankhead-national-forest',
        image: '/images/bankhead-forest.jpg',
      },
    ],
  },
  {
    name: 'Indiana',
    icon: '/images/states/indiana.png',
    heading: 'Lakeside Adventures in Indiana',
    properties: [
      {
        name: 'Hardin Ridge Recreation Area',
        tagline: 'Scenic Lakeside Camping & Outdoor Fun in Indiana',
        location: 'Bloomington, IN | Hoosier National Forest',
        stats: { campsites: '200+', trails: 'Multiple', lake: 'Monroe Lake' },
        activities: ['Hiking', 'Boating', 'Fishing', 'Swimming', 'RV & Tent Camping'],
        href: '/hardin-ridge-recreation-area',
        image: '/images/hardin-ridge-entrance-sign.jpg',
      },
      {
        name: 'Indian-Celina Lakes Recreation Area',
        tagline: 'Lakeside Adventure & Tranquil Camping in Indiana',
        location: 'Perry County, IN | Hoosier National Forest',
        stats: { campsites: '60+', lakes: '2', trails: '10+ miles' },
        activities: ['Fishing', 'Kayaking', 'Hiking', 'Swimming', 'RV & Tent Camping'],
        href: '/indian-celina-lakes-recreation-area',
        image: '/images/indian-celina-entrance-sign.jpg',
      },
      {
        name: 'Tipsaw Lake Recreation Area',
        tagline: 'Scenic Lakeside Camping & Outdoor Adventure in Indiana',
        location: 'Perry County, IN | Hoosier National Forest',
        stats: { campsites: '35+', lake: '131 acres', trails: '8+ miles' },
        activities: ['Boating', 'Fishing', 'Hiking', 'Swimming', 'RV & Tent Camping'],
        href: '/tipsaw-lake-recreation-area',
        image: '/images/tipsaw-entrance-sign.jpg',
      },
    ],
  },
  {
    name: 'Maine',
    icon: '/images/states/maine.png',
    heading: 'Scenic Riverside Camping in Maine',
    properties: [
      {
        name: 'Canal Bridge Campground',
        tagline: '36 Campsites & 5 Tent Sites on the Saco River',
        location: 'Fryeburg, ME',
        stats: { campsites: '36', tentSites: '5', river: 'Saco River' },
        activities: ['Kayaking', 'Fishing', 'River Access', 'Pet Friendly', 'RV & Tent Camping'],
        href: '/experiences/canal-bridge',
        image: '/images/Canal-Bridge-Entrance-1-2048x1365.jpg',
      },
    ],
  },
  {
    name: 'Michigan',
    icon: '/images/states/michigan.png',
    logo: '/images/states/michigan-dnr.png',
    heading: "Michigan's Ultimate Outdoor Escape",
    properties: [
      {
        name: 'Yankee Springs Recreation Area',
        tagline: "Michigan's Ultimate Outdoor Escape",
        location: 'Barry County, MI',
        stats: { campsites: '200+', trails: '30+ miles', acres: '5,200+' },
        activities: ['Boating', 'Fishing', 'Hiking', 'Mountain Biking', 'RV & Tent Camping'],
        href: '/yankee-springs-recreation-area',
        image: '/images/yankee-springs/hill-cabins.jpg',
      },
      {
        name: 'Long Lake Outdoor Center',
        tagline: 'Year-Round Outdoor Education & Recreation',
        location: 'Middleville, MI',
        stats: { capacity: '200+', cabins: '20', lake: 'Private Lake' },
        activities: ['Group Camping', 'Outdoor Education', 'Team Building', 'Lake Activities'],
        href: '/long-lake-outdoor-center',
        image: '/images/long-lake/fall-foliage.jpg',
      },
      {
        name: 'Chief Noonday Outdoor Center',
        tagline: 'Rustic Group Camp & Retreat Center',
        location: 'Middleville, MI | Yankee Springs',
        stats: { lodges: '3', cabins: '10+', capacity: '150+' },
        activities: ['Group Camping', 'Team Building', 'Nature Education', 'Retreats'],
        href: '/chief-noonday-outdoor-center',
        image: '/images/chief-noonday/deer-lodge.jpg',
      },
    ],
  },
  {
    name: 'Missouri',
    icon: '/images/states/missouri.png',
    heading: 'Historic & Scenic Outdoor Escape in Missouri',
    properties: [
      {
        name: 'Washington State Park',
        tagline: 'Historic & Scenic Outdoor Escape in Missouri',
        location: 'De Soto, MO',
        stats: { campsites: '50+', trails: '10+ miles', acres: '2,147+' },
        activities: ['Hiking', 'Camping', 'Swimming', 'Historic Sites', 'Watercraft Rentals'],
        href: '/washington-state-park',
        image: '/images/Burlingame2-1536x1152.jpg',
      },
      {
        name: 'Meramec State Park',
        tagline: 'Premier Camping & Caving Destination on the Meramec River',
        location: 'Sullivan, MO',
        stats: { campsites: 'Multiple', river: 'Meramec River', acres: '6,800+' },
        activities: ['Watercraft Rentals', 'Camping', 'Hiking', 'Fishing', 'Swimming'],
        href: '/experiences/meramec-state-park',
        image: '/images/meramec-entrance-sign.jpg',
      },
    ],
  },
  {
    name: 'Rhode Island',
    icon: '/images/states/rhode-island.png',
    heading: 'Rhode Island\'s Premier Campground Since 1934',
    properties: [
      {
        name: 'Burlingame State Park',
        tagline: '755 Campsites & 20 Cabins on Watchaug Pond',
        location: 'Charlestown, RI',
        stats: { campsites: '755', cabins: '20', acres: '3,100+' },
        activities: ['Swimming', 'Fishing', 'Boating', 'Hiking', 'Wildlife Viewing'],
        href: '/experiences/burlingame-state-park',
        image: '/images/burlingame-entrance-sign.jpg',
      },
    ],
  },
  {
    name: 'West Virginia',
    icon: '/images/states/west-virginia.png',
    heading: 'Untamed Wilderness in West Virginia',
    properties: [
      {
        name: 'Monongahela National Forest',
        tagline: 'Untamed Wilderness in West Virginia',
        location: 'West Virginia',
        stats: { acres: '921,000+', trails: '800+ miles', elevation: '4,863 ft' },
        activities: ['Hiking', 'Scenic Drives', 'Fishing', 'Rock Climbing', 'Camping'],
        href: '/monongahela-national-forest',
        image: '/images/monongahela/entrance-sign.jpg',
      },
    ],
  },
]

const partnershipSteps = [
  {
    number: 1,
    title: 'Initial Assessment',
    description: 'We evaluate your recreation area\'s unique needs, challenges, and opportunities.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: 2,
    title: 'Custom Management Plan',
    description: 'A tailored strategy designed to maximize visitor satisfaction and operational efficiency.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    number: 3,
    title: 'Expert Operations',
    description: 'Our trained professionals handle day-to-day management, maintenance, and visitor services.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    number: 4,
    title: 'Results & Savings',
    description: 'Reduced costs, improved visitor experiences, and complete peace of mind.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

const partnershipStats = [
  { number: 35, suffix: '%', label: 'Average Cost Savings' },
  { number: 98, suffix: '%', label: 'Partner Satisfaction' },
  { number: 24, suffix: '/7', label: 'Support Available' },
  { number: 0, suffix: '', label: 'Hassles For You', display: 'Zero' },
]

function PartnershipJourney() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          let step = 0
          const interval = setInterval(() => {
            step++
            setActiveStep(step)
            if (step >= partnershipSteps.length) {
              clearInterval(interval)
            }
          }, 500)
          return () => clearInterval(interval)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative container-custom px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-sm font-semibold tracking-wide uppercase">Partnership Opportunities</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Your Success Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">Our Mission</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We handle the complexities of recreation area management so you can focus on growth.
            Here's how partnering with <Link href="/about">BA Services</Link> transforms your operations.
          </p>
        </div>

        {/* Journey Timeline - Desktop */}
        <div className="hidden lg:block relative max-w-6xl mx-auto mb-24">
          {/* Connection Line */}
          <div className="absolute top-24 left-[10%] right-[10%] h-0.5 bg-slate-700" />
          <div
            className="absolute top-24 left-[10%] h-0.5 bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-1000 ease-out"
            style={{ width: isVisible ? `${(activeStep / partnershipSteps.length) * 80}%` : '0%' }}
          />

          {/* Steps */}
          <div className="grid grid-cols-4 gap-6">
            {partnershipSteps.map((step, index) => (
              <div
                key={step.number}
                className={`relative transition-all duration-700 ${
                  index < activeStep ? 'opacity-100' : 'opacity-40'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Number Circle */}
                <div className="flex justify-center mb-8">
                  <div
                    className={`relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      index < activeStep
                        ? 'bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30 rotate-0'
                        : 'bg-slate-800 border border-slate-700 -rotate-3'
                    }`}
                  >
                    {index < activeStep ? (
                      <div className="text-white">{step.icon}</div>
                    ) : (
                      <span className="text-2xl font-bold text-slate-500">{step.number}</span>
                    )}
                    {index < activeStep && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                        <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Card */}
                <div className={`p-6 rounded-2xl transition-all duration-500 ${
                  index < activeStep
                    ? 'bg-slate-800/80 border border-slate-700'
                    : 'bg-transparent'
                }`}>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Timeline - Mobile */}
        <div className="lg:hidden mb-16">
          <div className="space-y-6">
            {partnershipSteps.map((step, index) => (
              <div
                key={step.number}
                className={`flex gap-4 transition-all duration-500 ${
                  index < activeStep ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                  index < activeStep
                    ? 'bg-gradient-to-br from-emerald-500 to-green-600'
                    : 'bg-slate-800 border border-slate-700'
                }`}>
                  {index < activeStep ? (
                    <div className="text-white scale-75">{step.icon}</div>
                  ) : (
                    <span className="text-lg font-bold text-slate-500">{step.number}</span>
                  )}
                </div>
                <div className="flex-1 pb-6 border-b border-slate-800">
                  <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-slate-400 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats & Benefits */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Stats Panel */}
          <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-3xl p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                The Numbers Speak
              </h3>
              <p className="text-emerald-100/80 mb-8">Real results from real partnerships</p>

              <div className="grid grid-cols-2 gap-6">
                {partnershipStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-4xl lg:text-5xl font-bold text-white mb-1">
                      {stat.display ? (
                        <span>{isVisible ? stat.display : '—'}</span>
                      ) : isVisible ? (
                        <PartnershipCounter target={stat.number} suffix={stat.suffix} isActive={isVisible} />
                      ) : (
                        <span>—</span>
                      )}
                    </div>
                    <div className="text-emerald-100/70 text-sm font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits List */}
          <div className="space-y-6">
            <div className="flex gap-5 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-emerald-500/30 transition-colors">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Significant Cost Reduction</h4>
                <p className="text-slate-400 leading-relaxed">Our economies of scale and operational expertise translate to major savings on staffing, equipment, and supplies—without sacrificing quality.</p>
              </div>
            </div>

            <div className="flex gap-5 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-emerald-500/30 transition-colors">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Complete Peace of Mind</h4>
                <p className="text-slate-400 leading-relaxed">Full liability coverage, compliance management, and trained staff mean you can rest easy knowing your recreation area is in expert hands.</p>
              </div>
            </div>

            <div className="flex gap-5 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-emerald-500/30 transition-colors">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">5-Star Visitor Experiences</h4>
                <p className="text-slate-400 leading-relaxed">Professional management, pristine facilities, and attentive service create memorable experiences that keep visitors coming back.</p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link
                href="/contact?topic=partnership"
                className="group flex items-center justify-center gap-3 w-full py-5 px-8 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold text-lg rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-500/25"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Let&apos;s Discuss Your Needs
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PartnershipCounter({ target, suffix, isActive }: { target: number; suffix: string; isActive: boolean }) {
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

function BookingWidgets() {
  useEffect(() => {
    const loadAndInitWidgets = () => {
      // Check if script already loaded and BAServesWidget is available
      if (typeof (window as any).BAServesWidget !== 'undefined') {
        // Use manual init for each widget
        const widget = (window as any).BAServesWidget
        if (widget.init) {
          widget.init('chief-noonday-widget', { property: 'chief-noonday-outdoor-center', showPrice: true })
          widget.init('long-lake-widget', { property: 'long-lake-outdoor-center', showPrice: true })
        }
        return
      }

      // Check if script is already being loaded
      if (document.querySelector('script[src="https://escape.baserves.com/embed/widget.js"]')) {
        // Script exists but may not be loaded yet, wait and retry
        setTimeout(loadAndInitWidgets, 100)
        return
      }

      // Create and load the script
      const script = document.createElement('script')
      script.src = 'https://escape.baserves.com/embed/widget.js'
      script.async = true
      script.onload = () => {
        // Give the script a moment to set up, then init
        setTimeout(loadAndInitWidgets, 100)
      }
      document.body.appendChild(script)
    }

    loadAndInitWidgets()
  }, [])

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-center text-2xl font-bold text-forest-DEFAULT mb-5 uppercase tracking-[3px]">
              Chief Noonday Outdoor Center
            </h3>
            <div
              id="chief-noonday-widget"
              className="min-h-[300px]"
            />
          </div>
          <div>
            <h3 className="text-center text-2xl font-bold text-forest-DEFAULT mb-5 uppercase tracking-[3px]">
              Long Lake
            </h3>
            <div
              id="long-lake-widget"
              className="min-h-[300px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatesGrid() {
  const [selectedState, setSelectedState] = useState<typeof statesData[0] | null>(null)

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container-custom px-6">
          <div className="text-center mb-12">
            <span className="badge badge-forest mb-4">Browse by State</span>
            <h2 className="headline-lg text-gray-900 mb-4">
              Outdoor Experiences & Bookings <span className="text-forest-DEFAULT">By State</span>
            </h2>
            <p className="subheadline max-w-2xl mx-auto">
              Click a state to explore our recreation areas and book your next adventure
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {statesData.map((state) => (
              <button
                key={state.name}
                onClick={() => setSelectedState(state)}
                className="group flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 cursor-pointer"
              >
                <div className="relative w-24 h-24 md:w-28 md:h-28 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={state.icon}
                    alt={state.name}
                    fill
                    className="object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-forest-DEFAULT transition-colors">
                  {state.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* State Modal */}
      {selectedState && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedState(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedState(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="bg-forest-DEFAULT px-8 py-6 rounded-t-2xl">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={selectedState.icon}
                    alt={selectedState.name}
                    fill
                    className="object-contain brightness-0 invert opacity-80"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedState.name}</h3>
                  <p className="text-white/80 text-sm">{selectedState.heading}</p>
                </div>
              </div>
            </div>

            {/* Properties */}
            <div className="p-8">
              {selectedState.logo && (
                <div className="flex justify-center mb-6">
                  <Image
                    src={selectedState.logo}
                    alt={`${selectedState.name} DNR`}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              )}
              <div className={`grid gap-6 ${selectedState.properties.length > 1 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                {selectedState.properties.map((property) => (
                  <div key={property.name} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Property Image */}
                    <div className="relative h-48">
                      <Image
                        src={property.image}
                        alt={property.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="inline-block px-2.5 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                          {property.tagline}
                        </span>
                      </div>
                    </div>

                    {/* Property Info */}
                    <div className="p-5">
                      <h4 className="text-lg font-bold text-gray-900 mb-1">{property.name}</h4>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        {property.location}
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mb-3 pb-3 border-b">
                        {Object.entries(property.stats).map(([key, value]) => (
                          <span key={key}>
                            <span className="font-semibold text-forest-DEFAULT">{value}</span>{' '}
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          </span>
                        ))}
                      </div>

                      {/* Activities */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {property.activities.map((activity) => (
                          <span
                            key={activity}
                            className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={property.href}
                        onClick={() => setSelectedState(null)}
                        className="block w-full text-center py-2.5 border-2 border-forest-DEFAULT text-forest-DEFAULT font-semibold rounded-lg hover:bg-forest-DEFAULT hover:text-white transition-colors text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

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
  const [loading, setLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  // Carousel state — 1 card on mobile, 3 on desktop, smooth translateX sliding
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedLocation, setSelectedLocation] = useState<typeof allLocations[0] | null>(null)
  const [cardsPerView, setCardsPerView] = useState(3)
  const touchStartRef = useRef(0)
  const touchDeltaRef = useRef(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const autoAdvanceRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const maxIndex = Math.max(0, allLocations.length - cardsPerView)
  const totalDots = Math.ceil(allLocations.length / cardsPerView)
  const activeDot = Math.min(Math.floor(currentIndex / cardsPerView), totalDots - 1)

  // Loading screen — runs once per session
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('ba-loaded')
    if (hasLoaded) {
      setLoading(false)
      setLoadProgress(100)
      return
    }
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setLoadProgress(100)
        setTimeout(() => {
          setFadeOut(true)
          setTimeout(() => {
            setLoading(false)
            sessionStorage.setItem('ba-loaded', '1')
          }, 600)
        }, 400)
      } else {
        setLoadProgress(progress)
      }
    }, 200)
    return () => clearInterval(interval)
  }, [])

  // Detect screen size for cards per view
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setCardsPerView(w < 768 ? 1 : w < 1024 ? 2 : 3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const goTo = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
  }, [maxIndex])

  const next = useCallback(() => {
    setCurrentIndex(prev => prev >= maxIndex ? 0 : Math.min(prev + cardsPerView, maxIndex))
  }, [maxIndex, cardsPerView])

  const prev = useCallback(() => {
    setCurrentIndex(prev => prev <= 0 ? maxIndex : Math.max(prev - cardsPerView, 0))
  }, [maxIndex, cardsPerView])

  // Touch / swipe handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX
    touchDeltaRef.current = 0
    setIsDragging(true)
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return
    const delta = e.touches[0].clientX - touchStartRef.current
    touchDeltaRef.current = delta
    setDragOffset(delta)
  }, [isDragging])

  const onTouchEnd = useCallback(() => {
    setIsDragging(false)
    setDragOffset(0)
    const threshold = 50
    if (touchDeltaRef.current < -threshold) next()
    else if (touchDeltaRef.current > threshold) prev()
  }, [next, prev])

  // Auto-advance, resets on interaction
  useEffect(() => {
    if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current)
    autoAdvanceRef.current = setInterval(next, 6000)
    return () => { if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current) }
  }, [currentIndex, next])

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
    <>
      {/* Loading Screen */}
      {loading && (
        <div
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-600 ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="flex flex-col items-center">
            <Image
              src="/images/logo.png"
              alt="BA Services"
              width={200}
              height={80}
              className="mb-8"
              priority
            />
            <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-forest-DEFAULT rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom px-6 pt-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-8 animate-fade-in">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +1 207 307-7903
            </div>

            <h1 className="font-display headline-xl text-white mb-6 animate-fade-in-up drop-shadow-lg">
              Find Your<br />
              <span className="text-green-400 drop-shadow-lg">Adventure.</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-10 max-w-2xl animate-fade-in-up delay-200 drop-shadow-md">
              From <span className="text-white font-semibold">the rolling forests of Alabama</span> to{' '}
              <span className="text-white font-semibold">the rugged landscapes of Missouri</span>, our
              managed sites provide <span className="text-green-400 font-semibold">well-maintained facilities</span>,{' '}
              <span className="text-green-400 font-semibold">pristine landscapes</span>, and{' '}
              <span className="text-green-400 font-semibold">seamless visitor experiences</span>.
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
              <Link href="/contact?topic=partnership" className="btn-outline-white">
                Partnership Inquiries
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

      {/* Featured Properties Booking Widgets */}
      <BookingWidgets />

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-forest-DEFAULT">
        <div className="container-custom px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {statsVisible ? (
                    <AnimatedCounter
                      target={stat.target}
                      suffix={stat.suffix}
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

      {/* Explore by State */}
      <StatesGrid />

      {/* Featured Locations */}
      <section className="section bg-gray-50">
        <div className="container-custom px-6">
          <div className="text-center mb-16">
            <span className="badge badge-forest mb-4">Featured Destinations</span>
            <h2 className="headline-lg text-gray-900 mb-4">
              Discover Our <span className="text-forest-DEFAULT">Recreation Areas</span>
            </h2>
            <p className="subheadline max-w-2xl mx-auto">
              Each location offers unique experiences, from lakeside camping to mountain adventures. Visitors are encouraged to <Link href="/leave-a-review" className="text-forest-DEFAULT underline hover:text-forest-light transition-colors">leave a review</Link> after their stay.
            </p>
          </div>

          {/* Carousel with arrows */}
          <div className="relative group/carousel">
            {/* Left arrow */}
            <button
              onClick={prev}
              className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all duration-200 border border-gray-200"
              aria-label="Previous destinations"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right arrow */}
            <button
              onClick={next}
              className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all duration-200 border border-gray-200"
              aria-label="Next destinations"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Sliding track */}
            <div
              className="overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="flex gap-8"
                style={{
                  transform: `translateX(calc(-${currentIndex} * (100% / ${cardsPerView} + ${32 / cardsPerView}px) + ${dragOffset}px))`,
                  transition: isDragging ? 'none' : 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {allLocations.map((location) => (
                  <button
                    key={location.name}
                    onClick={() => setSelectedLocation(location)}
                    className="location-card group text-left cursor-pointer flex-shrink-0"
                    style={{ width: `calc((100% - ${(cardsPerView - 1) * 32}px) / ${cardsPerView})` }}
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
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Page dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalDots }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i * cardsPerView)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === activeDot ? 'bg-forest-DEFAULT w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Show destinations page ${i + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://escape.baserves.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Book Your Stay
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Map */}
      <section id="property-map-section" className="relative z-10 py-16 bg-white">
        <div className="container-custom px-6">
          <div className="text-center mb-10">
            <span className="badge badge-forest mb-4">Our Locations</span>
            <h2 className="headline-lg text-gray-900 mb-4">
              Find Us Across <span className="text-forest-DEFAULT">America</span>
            </h2>
            <p className="subheadline max-w-2xl mx-auto">
              Click a pin to explore our recreation areas
            </p>
          </div>
          <div id="property-map-container" className="h-[500px] transition-all duration-700">
            <PropertyMap />
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
                className="group p-6 bg-gray-50 rounded-2xl text-center hover:bg-forest-DEFAULT hover:shadow-lg transition-all duration-300"
              >
                <div className="text-gray-700 group-hover:text-white transition-colors mb-4 flex justify-center">{category.icon}</div>
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

      {/* Government Contracts */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="text-center mb-10">
            <span className="badge bg-forest-DEFAULT/10 text-forest-DEFAULT mb-4">Government Contracts</span>
            <h2 className="headline-lg text-gray-900 mb-4">DOT Rest Area Management</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We partner with state Departments of Transportation to operate and maintain rest area facilities, ensuring safe and welcoming stops for millions of travelers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/services/iowa-dot" className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-forest-DEFAULT transition-colors">Iowa DOT</h3>
                    <p className="text-sm text-gray-500">Department of Transportation</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Rest area facilities along the I-29 corridor near Sioux City, serving northbound and southbound travelers.</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">2</span> Rest Areas
                  <span className="text-gray-300">|</span>
                  <span className="font-semibold text-gray-900">I-29</span> Corridor
                </div>
              </div>
            </Link>
            <Link href="/services/utah-dot" className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-forest-DEFAULT transition-colors">Utah DOT</h3>
                    <p className="text-sm text-gray-500">Department of Transportation</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Statewide rest area management across 28 facilities spanning I-15, I-80, I-70, and scenic byways through three regions.</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">28</span> Rest Areas
                  <span className="text-gray-300">|</span>
                  <span className="font-semibold text-gray-900">3</span> Regions
                  <span className="text-gray-300">|</span>
                  <span className="font-semibold text-gray-900">Statewide</span>
                </div>
              </div>
            </Link>
          </div>
          <ScopeAccordion />
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
                services to keep recreation areas pristine and welcoming for all visitors. Our <Link href="/careers" className="text-green-400 underline hover:text-green-300 transition-colors">dedicated team</Link> makes it all possible.
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

      {/* Partnership Benefits - Animated Journey */}
      <PartnershipJourney />

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/long-lake/fall-foliage.jpg"
            alt="Adventure awaits"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-forest-DEFAULT/70" />
        </div>

        <div className="relative z-10 container-custom px-6 text-center">
          <h2 className="font-display headline-lg text-white mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Book your stay at one of our pristine recreation areas and create memories that last a lifetime. <Link href="/contact" className="underline hover:text-white transition-colors">Contact us</Link> to plan your trip.
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

      {/* Property Quick View Modal */}
      {selectedLocation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedLocation(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-in-up"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedLocation(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative h-64 w-full">
              <Image
                src={selectedLocation.image}
                alt={selectedLocation.name}
                fill
                className="object-cover rounded-t-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-2xl" />
              <div className="absolute bottom-4 left-4">
                <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                  {selectedLocation.tagline}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedLocation.name}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {selectedLocation.location}
              </div>
              <p className="text-gray-600 mb-5">{selectedLocation.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-5">
                {selectedLocation.features.map((feature) => (
                  <span key={feature} className="px-3 py-1 bg-forest-DEFAULT/10 text-forest-DEFAULT text-xs font-medium rounded-full">
                    {feature}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                {Object.entries(selectedLocation.stats).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="font-bold text-forest-DEFAULT text-lg">{value}</div>
                    <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={`/${selectedLocation.slug}`}
                className="block w-full text-center py-3.5 bg-forest-DEFAULT text-white font-semibold rounded-xl hover:bg-forest-dark transition-colors"
                onClick={() => setSelectedLocation(null)}
              >
                Go to Property
                <svg className="w-4 h-4 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
    </>
  )
}
