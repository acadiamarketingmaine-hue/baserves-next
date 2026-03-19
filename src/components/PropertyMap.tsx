'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import Link from 'next/link'
import { useRef } from 'react'
import 'leaflet/dist/leaflet.css'

const properties = [
  // Alabama
  { name: 'Bankhead National Forest', slug: 'bankhead-national-forest', lat: 34.20, lng: -87.35, image: '/images/bankhead-forest.jpg', excerpt: '180,000 acres of canyons, waterfalls, and the Sipsey Wilderness — Alabama\'s birding paradise.' },
  { name: 'Clear Creek Recreation Area', slug: 'experiences/clear-creek-recreation-area', lat: 34.27, lng: -87.33, image: '/images/clear-creek-overview.jpg', excerpt: '102 campsites on Lewis Smith Lake with swimming beach, boat ramps, and hiking trails.' },
  { name: 'Corinth Recreation Area', slug: 'experiences/corinth-recreation-area', lat: 34.15, lng: -87.15, image: '/images/corinth-campground.jpg', excerpt: '52 full-hookup sites on Lewis Smith Lake with swimming beach, pavilion, and Bobwhite Trail.' },
  // Rhode Island
  { name: 'Burlingame State Park', slug: 'experiences/burlingame-state-park', lat: 41.38, lng: -71.72, image: '/images/Burlingame1-2048x1365.jpg', excerpt: 'Rhode Island\'s largest campground since 1934 — 755 sites, 20 cabins on Watchaug Pond.' },
  // Maine
  { name: 'Canal Bridge Campground', slug: 'experiences/canal-bridge', lat: 44.02, lng: -70.97, image: '/images/Canal-Bridge-Entrance-1-2048x1365.jpg', excerpt: 'Family campground on the Saco River with 36 sites, river access, and White Mountain views.' },
  // Indiana
  { name: 'Tipsaw Lake Recreation Area', slug: 'tipsaw-lake-recreation-area', lat: 38.23, lng: -86.62, image: '/images/DSC_0001-2048x1365.jpg', excerpt: 'Scenic 131-acre lake in Hoosier National Forest with camping, fishing, and 8+ miles of trails.' },
  { name: 'Hardin Ridge Recreation Area', slug: 'hardin-ridge-recreation-area', lat: 39.07, lng: -86.47, image: '/images/DSC_0103-2048x1365.jpg', excerpt: '200+ campsites on Monroe Lake — Indiana\'s largest — with beach, boat ramp, and hiking.' },
  // Michigan
  { name: 'Yankee Springs Recreation Area', slug: 'yankee-springs-recreation-area', lat: 42.62, lng: -85.32, image: '/images/yankee-springs/hill-cabins.jpg', excerpt: '5,200 acres with 200+ campsites, 30+ miles of trails, and year-round outdoor adventure.' },
  { name: 'Long Lake Outdoor Center', slug: 'long-lake-outdoor-center', lat: 42.55, lng: -85.40, image: '/images/long-lake/fall-aerial.jpg', excerpt: 'CCC-built retreat center with 16 cabins, a private lake, lodge, and wedding venue.' },
  // West Virginia
  { name: 'Monongahela National Forest', slug: 'monongahela-national-forest', lat: 38.70, lng: -79.80, image: '/images/DSC_0110-2048x1365.jpg', excerpt: '900,000+ acres across the Alleghenies with 800+ miles of trails and 5 wilderness areas.' },
  // Missouri
  { name: 'Washington State Park', slug: 'washington-state-park', lat: 38.09, lng: -90.68, image: '/images/washington-state-park/cabin-11-exterior.png', excerpt: 'Ancient petroglyphs, cabins, and 10+ miles of trails along the Big River in the Ozarks.' },
  { name: 'Meramec State Park', slug: 'experiences/meramec-state-park', lat: 38.22, lng: -91.08, image: '/images/meramec-state-park/ccc-monument.jpg', excerpt: '6,896 acres along the Meramec River with 19 cabins, motel, float trips, and Fisher Cave.' },
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

export default function PropertyMap() {
  return (
    <div className="relative z-0 w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg">
      <MapContainer
        center={[39.5, -96.0]}
        zoom={4}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', minHeight: '400px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {properties.map((property) => (
          <HoverMarker key={property.slug} property={property} />
        ))}
      </MapContainer>
    </div>
  )
}
