'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import Link from 'next/link'
import { useRef, useState, useEffect, useCallback } from 'react'
import 'leaflet/dist/leaflet.css'
import { utahRestAreas } from '@/data/utah-rest-areas'
import { iowaRestAreas } from '@/data/iowa-rest-areas'

const properties = [
  // Alabama
  { name: 'Bankhead National Forest', slug: 'bankhead-national-forest', lat: 34.20, lng: -87.35, image: '/images/bankhead-forest.jpg', excerpt: '180,000 acres of canyons, waterfalls, and the Sipsey Wilderness — Alabama\'s birding paradise.' },
  { name: 'Clear Creek Recreation Area', slug: 'experiences/clear-creek-recreation-area', lat: 34.27, lng: -87.33, image: '/images/clear-creek-overview.jpg', excerpt: '102 campsites on Lewis Smith Lake with swimming beach, boat ramps, and hiking trails.' },
  { name: 'Corinth Recreation Area', slug: 'experiences/corinth-recreation-area', lat: 34.15, lng: -87.15, image: '/images/corinth-boat-ramp.jpg', excerpt: '52 full-hookup sites on Lewis Smith Lake with swimming beach, pavilion, and Bobwhite Trail.' },
  // Rhode Island
  { name: 'Burlingame State Park', slug: 'experiences/burlingame-state-park', lat: 41.38, lng: -71.72, image: '/images/burlingame-entrance-sign.jpg', excerpt: 'Rhode Island\'s largest campground since 1934 — 755 sites, 20 cabins on Watchaug Pond.' },
  // Maine
  { name: 'Canal Bridge Campground', slug: 'experiences/canal-bridge', lat: 44.02, lng: -70.97, image: '/images/Canal-Bridge-Entrance-1-2048x1365.jpg', excerpt: 'Family campground on the Saco River with 36 sites, river access, and White Mountain views.' },
  // Indiana
  { name: 'Tipsaw Lake Recreation Area', slug: 'tipsaw-lake-recreation-area', lat: 38.23, lng: -86.62, image: '/images/tipsaw-lake/lake-view.jpg', excerpt: 'Scenic 131-acre lake in Hoosier National Forest with camping, fishing, and 8+ miles of trails.' },
  { name: 'Hardin Ridge Recreation Area', slug: 'hardin-ridge-recreation-area', lat: 39.07, lng: -86.47, image: '/images/hardin-ridge-entrance-sign.jpg', excerpt: '200+ campsites on Monroe Lake — Indiana\'s largest — with beach, boat ramp, and hiking.' },
  { name: 'Indian-Celina Lakes Recreation Area', slug: 'indian-celina-lakes-recreation-area', lat: 38.35, lng: -86.60, image: '/images/indian-celina-entrance-sign.jpg', excerpt: 'Twin lakes with accessible fishing pier, camping, boat launch, and hiking in Hoosier National Forest.' },
  // Michigan
  { name: 'Yankee Springs Recreation Area', slug: 'yankee-springs-recreation-area', lat: 42.62, lng: -85.32, image: '/images/yankee-springs/hill-cabins.jpg', excerpt: '5,200 acres with 200+ campsites, 30+ miles of trails, and year-round outdoor adventure.' },
  { name: 'Long Lake Outdoor Center', slug: 'long-lake-outdoor-center', lat: 42.55, lng: -85.40, image: '/images/long-lake/fall-aerial.jpg', excerpt: 'CCC-built retreat center with 16 cabins, a private lake, lodge, and wedding venue.' },
  // West Virginia
  { name: 'Monongahela National Forest', slug: 'monongahela-national-forest', lat: 38.70, lng: -79.80, image: '/images/monongahela/entrance-sign.jpg', excerpt: '900,000+ acres across the Alleghenies with 800+ miles of trails and 5 wilderness areas.' },
  // Missouri
  { name: 'Washington State Park', slug: 'washington-state-park', lat: 38.09, lng: -90.68, image: '/images/washington-thunderbird-lodge.png', excerpt: 'Ancient petroglyphs, cabins, and 10+ miles of trails along the Big River in the Ozarks.' },
  { name: 'Meramec State Park', slug: 'experiences/meramec-state-park', lat: 38.22, lng: -91.08, image: '/images/meramec-entrance-sign.jpg', excerpt: '6,896 acres along the Meramec River with 19 cabins, motel, float trips, and Fisher Cave.' },
]

const pinIcon = new L.DivIcon({
  className: '',
  html: `<svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.268 21.732 0 14 0z" fill="#1B5E20"/>
    <circle cx="14" cy="14" r="6" fill="white"/>
  </svg>`,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
  popupAnchor: [0, -40],
})

const dotPinIcon = new L.DivIcon({
  className: '',
  html: `<svg width="20" height="30" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.268 21.732 0 14 0z" fill="#1565C0"/>
    <circle cx="14" cy="14" r="6" fill="white"/>
  </svg>`,
  iconSize: [20, 30],
  iconAnchor: [10, 30],
  popupAnchor: [0, -30],
})

const allRestAreas = [
  ...utahRestAreas.map(ra => ({ ...ra, state: 'Utah' })),
  ...iowaRestAreas.map(ra => ({ ...ra, state: 'Iowa' })),
]

function HoverMarker({ property }: { property: typeof properties[number] }) {
  const markerRef = useRef<L.Marker>(null)

  return (
    <Marker
      ref={markerRef}
      position={[property.lat, property.lng]}
      icon={pinIcon}
      eventHandlers={{
        mouseover: () => markerRef.current?.openPopup(),
        mouseout: (e) => {
          const popup = markerRef.current?.getPopup()
          if (popup) {
            const popupEl = popup.getElement()
            if (popupEl && popupEl.matches(':hover')) return
            markerRef.current?.closePopup()
          }
        },
      }}
    >
      <Popup
        className="property-card-popup"
        closeButton={false}
        autoPan={false}
        eventHandlers={{
          mouseout: () => markerRef.current?.closePopup(),
        }}
      >
        <div style={{ width: 260, overflow: 'hidden', borderRadius: 12, margin: -14, marginBottom: -24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={property.image}
            alt={property.name}
            style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }}
          />
          <div style={{ padding: '12px 14px 14px' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#111', marginBottom: 4, lineHeight: 1.3 }}>
              {property.name}
            </div>
            <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5, marginBottom: 10 }}>
              {property.excerpt}
            </div>
            <Link
              href={`/${property.slug}`}
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '8px 16px',
                backgroundColor: '#1a472a',
                color: 'white',
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              View Property
            </Link>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}

function RestAreaMarker({ restArea }: { restArea: typeof allRestAreas[number] }) {
  const markerRef = useRef<L.Marker>(null)
  const dotPage = restArea.state === 'Iowa' ? '/services/iowa-dot' : '/services/utah-dot'

  return (
    <Marker
      ref={markerRef}
      position={[restArea.lat, restArea.lng]}
      icon={dotPinIcon}
      eventHandlers={{
        mouseover: () => markerRef.current?.openPopup(),
        mouseout: (e) => {
          const popup = markerRef.current?.getPopup()
          if (popup) {
            const popupEl = popup.getElement()
            if (popupEl && popupEl.matches(':hover')) return
            markerRef.current?.closePopup()
          }
        },
      }}
    >
      <Popup className="property-card-popup" closeButton={false} autoPan={false}
        eventHandlers={{ mouseout: () => markerRef.current?.closePopup() }}>
        <div style={{ width: 220, overflow: 'hidden', borderRadius: 12, margin: -14, marginBottom: -24 }}>
          <div style={{ padding: '12px 14px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span style={{ display: 'inline-block', padding: '2px 8px', backgroundColor: '#E3F2FD', color: '#1565C0', fontSize: 10, fontWeight: 700, borderRadius: 12 }}>
                {restArea.state} DOT
              </span>
            </div>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#111', marginBottom: 4, lineHeight: 1.3 }}>
              {restArea.name}
            </div>
            <div style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.5, marginBottom: 4 }}>
              {restArea.route}{restArea.direction ? ` ${restArea.direction}` : ''} &middot; {restArea.city}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href={restArea.googleMapsLink} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 11, color: '#1565C0', fontWeight: 600, textDecoration: 'none' }}>
                Directions &rarr;
              </a>
              <Link href={dotPage}
                style={{ fontSize: 11, color: '#1a472a', fontWeight: 600, textDecoration: 'none' }}>
                View Contract &rarr;
              </Link>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}

function ScrollZoomHandler({ onScrollAttempt }: { onScrollAttempt: () => void }) {
  const map = useMap()

  useEffect(() => {
    const container = map.getContainer()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) map.scrollWheelZoom.enable()
    }
    const handleKeyUp = () => {
      map.scrollWheelZoom.disable()
    }
    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) onScrollAttempt()
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    container.addEventListener('wheel', handleWheel, { passive: true })

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      container.removeEventListener('wheel', handleWheel)
    }
  }, [map, onScrollAttempt])

  return null
}

export default function PropertyMap() {
  const [showScrollMsg, setShowScrollMsg] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.userAgent)

  const handleScrollAttempt = useCallback(() => {
    setShowScrollMsg(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setShowScrollMsg(false), 1500)
  }, [])

  return (
    <div className="relative z-10 w-full h-full min-h-[400px]">
      <MapContainer
        center={[39.5, -96.0]}
        zoom={4}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', minHeight: '400px', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {properties.map((property) => (
          <HoverMarker key={property.slug} property={property} />
        ))}
        {allRestAreas.map((ra) => (
          <RestAreaMarker key={`${ra.name}-${ra.direction}`} restArea={ra} />
        ))}
        <ScrollZoomHandler onScrollAttempt={handleScrollAttempt} />
      </MapContainer>
      {/* Legend */}
      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg shadow-md px-4 py-3 z-[1000] text-xs space-y-2">
        <div className="flex items-center gap-2">
          <svg width="14" height="20" viewBox="0 0 28 40" fill="none"><path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.268 21.732 0 14 0z" fill="#1B5E20"/><circle cx="14" cy="14" r="6" fill="white"/></svg>
          <span className="text-gray-700 font-medium">Recreation Areas</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="14" height="20" viewBox="0 0 28 40" fill="none"><path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.268 21.732 0 14 0z" fill="#1565C0"/><circle cx="14" cy="14" r="6" fill="white"/></svg>
          <span className="text-gray-700 font-medium">DOT Rest Areas</span>
        </div>
      </div>
      <div
        className={`absolute inset-0 flex items-center justify-center rounded-2xl z-[1000] pointer-events-none transition-opacity duration-300 ${
          showScrollMsg ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
      >
        <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg text-sm font-medium text-gray-800">
          Use {isMac ? '⌘' : 'Ctrl'} + scroll to zoom the map
        </div>
      </div>
    </div>
  )
}
