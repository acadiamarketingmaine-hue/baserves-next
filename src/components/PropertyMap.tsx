'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import Link from 'next/link'
import 'leaflet/dist/leaflet.css'

const properties = [
  { name: 'Tipsaw Lake Recreation Area', slug: 'tipsaw-lake-recreation-area', lat: 38.23, lng: -86.62 },
  { name: 'Yankee Springs Recreation Area', slug: 'yankee-springs-recreation-area', lat: 42.62, lng: -85.32 },
  { name: 'Canal Bridge Campground', slug: 'experiences/canal-bridge', lat: 44.02, lng: -70.97 },
  { name: 'Hardin Ridge Recreation Area', slug: 'hardin-ridge-recreation-area', lat: 39.07, lng: -86.47 },
  { name: 'Long Lake Outdoor Center', slug: 'long-lake-outdoor-center', lat: 42.61, lng: -85.34 },
  { name: 'Monongahela National Forest', slug: 'monongahela-national-forest', lat: 38.70, lng: -79.80 },
  { name: 'Meramec State Park', slug: 'experiences/meramec-state-park', lat: 38.22, lng: -91.08 },
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

export default function PropertyMap() {
  return (
    <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg">
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
          <Marker key={property.slug} position={[property.lat, property.lng]} icon={pinIcon}>
            <Popup>
              <div className="text-center">
                <strong className="block text-sm mb-2">{property.name}</strong>
                <Link
                  href={`/${property.slug}`}
                  className="inline-block px-3 py-1 bg-green-800 text-white text-xs font-semibold rounded hover:bg-green-900 transition-colors"
                >
                  View Property
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
