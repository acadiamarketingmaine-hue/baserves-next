'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useRef, useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import type { RestArea } from '@/data/utah-rest-areas'

const regionColors: Record<number, string> = {
  1: '#1565C0', // blue
  2: '#E65100', // orange
  3: '#2E7D32', // green
}

function createPinIcon(region: number) {
  const color = regionColors[region] || '#1565C0'
  return new L.DivIcon({
    className: '',
    html: `<svg width="24" height="36" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.268 21.732 0 14 0z" fill="${color}"/>
      <circle cx="14" cy="14" r="6" fill="white"/>
    </svg>`,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
  })
}

function ScrollZoomHandler() {
  const map = useMap()
  useEffect(() => {
    map.scrollWheelZoom.disable()
    const el = map.getContainer()
    const handler = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        map.scrollWheelZoom.enable()
        setTimeout(() => map.scrollWheelZoom.disable(), 1000)
      }
    }
    el.addEventListener('wheel', handler)
    return () => el.removeEventListener('wheel', handler)
  }, [map])
  return null
}

function FitBounds({ restAreas }: { restAreas: RestArea[] }) {
  const map = useMap()
  useEffect(() => {
    if (restAreas.length > 0) {
      const bounds = L.latLngBounds(restAreas.map(ra => [ra.lat, ra.lng]))
      map.fitBounds(bounds, { padding: [40, 40] })
    }
  }, [map, restAreas])
  return null
}

interface RestAreaMapProps {
  restAreas: RestArea[]
  center: [number, number]
  zoom: number
  showRegionColors?: boolean
}

export default function RestAreaMap({ restAreas, center, zoom, showRegionColors = false }: RestAreaMapProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      <MapContainer
        center={center}
        zoom={zoom}
        className="w-full h-[500px] md:h-[600px] z-0"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <ScrollZoomHandler />
        <FitBounds restAreas={restAreas} />
        {restAreas.map((ra) => (
          <RestAreaMarker key={`${ra.name}-${ra.direction}`} restArea={ra} showRegionColor={showRegionColors} />
        ))}
      </MapContainer>
      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-gray-500 z-[1000] pointer-events-none">
        Ctrl + scroll to zoom
      </div>
    </div>
  )
}

function RestAreaMarker({ restArea, showRegionColor }: { restArea: RestArea; showRegionColor: boolean }) {
  const markerRef = useRef<L.Marker>(null)
  const icon = showRegionColor ? createPinIcon(restArea.region) : createPinIcon(1)

  return (
    <Marker
      ref={markerRef}
      position={[restArea.lat, restArea.lng]}
      icon={icon}
      eventHandlers={{
        mouseover: () => markerRef.current?.openPopup(),
      }}
    >
      <Popup>
        <div className="min-w-[200px] p-1">
          <h3 className="font-bold text-sm text-gray-900 mb-1">{restArea.name}</h3>
          <div className="space-y-0.5 text-xs text-gray-600">
            <p><span className="font-medium">Route:</span> {restArea.route}{restArea.direction ? ` ${restArea.direction}` : ''}</p>
            <p><span className="font-medium">Location:</span> {restArea.location}</p>
            <p><span className="font-medium">City:</span> {restArea.city}</p>
          </div>
          <a
            href={restArea.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-blue-600 hover:text-blue-800"
          >
            Get Directions
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </Popup>
    </Marker>
  )
}
