'use client'

import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import Link from 'next/link'
import Image from 'next/image'
import 'leaflet/dist/leaflet.css'
import { tourStops } from '@/data/property-tour'

const pinIcon = new L.DivIcon({
  className: '',
  html: `<svg width="28" height="40" viewBox="0 0 28 40" fill="none"><path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.268 21.732 0 14 0z" fill="#1B5E20"/><circle cx="14" cy="14" r="6" fill="white"/></svg>`,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
  popupAnchor: [0, -40],
})

const activePinIcon = new L.DivIcon({
  className: '',
  html: `<svg width="36" height="52" viewBox="0 0 28 40" fill="none"><path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.268 21.732 0 14 0z" fill="#E65100"/><circle cx="14" cy="14" r="6" fill="white"/></svg>`,
  iconSize: [36, 52],
  iconAnchor: [18, 52],
  popupAnchor: [0, -52],
})

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo([lat, lng], 10, { duration: 1.2 })
  }, [map, lat, lng])
  return null
}

function OpenPopup({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()
  useEffect(() => {
    const timer = setTimeout(() => {
      map.eachLayer((layer: any) => {
        if (layer.getPopup && layer.getLatLng) {
          const pos = layer.getLatLng()
          if (Math.abs(pos.lat - lat) < 0.01 && Math.abs(pos.lng - lng) < 0.01) {
            layer.openPopup()
          }
        }
      })
    }, 1300)
    return () => clearTimeout(timer)
  }, [map, lat, lng])
  return null
}

interface TourModalProps {
  onClose: () => void
  onNarration: (text: string) => void
  audioEnabled: boolean
}

export default function TourModal({ onClose, onNarration, audioEnabled }: TourModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const pausedRef = useRef(false)
  const abortRef = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioEnabledRef = useRef(audioEnabled)

  useEffect(() => { audioEnabledRef.current = audioEnabled }, [audioEnabled])
  useEffect(() => { pausedRef.current = paused }, [paused])

  const current = tourStops[currentIndex]

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
  const waitWhilePaused = async () => {
    while (pausedRef.current && !abortRef.current) await sleep(200)
  }

  const speakAndWait = async (text: string): Promise<void> => {
    if (!audioEnabledRef.current) return
    try {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
      setIsSpeaking(true)
      const res = await fetch('/api/treeko/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      if (!res.ok) { setIsSpeaking(false); return }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audioRef.current = audio
      return new Promise((resolve) => {
        audio.onended = () => { URL.revokeObjectURL(url); setIsSpeaking(false); resolve() }
        audio.onerror = () => { URL.revokeObjectURL(url); setIsSpeaking(false); resolve() }
        audio.play().catch(() => { setIsSpeaking(false); resolve() })
      })
    } catch { setIsSpeaking(false) }
  }

  useEffect(() => {
    const runTour = async () => {
      for (let i = 0; i < tourStops.length; i++) {
        if (abortRef.current) break
        await waitWhilePaused()
        if (abortRef.current) break

        setCurrentIndex(i)
        const stop = tourStops[i]
        onNarration(`📍 ${stop.name}: ${stop.summary}`)

        // Wait for map fly animation
        await sleep(1500)

        if (audioEnabledRef.current) {
          await speakAndWait(`${stop.name}. ${stop.summary}`)
          await sleep(500)
        } else {
          await sleep(4000)
        }
        await waitWhilePaused()
      }

      if (!abortRef.current) {
        onNarration("That's the full tour! Want to learn more about any of these properties? Just ask!")
        await sleep(2000)
        onClose()
      }
    }
    runTour()
    return () => { abortRef.current = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    abortRef.current = true
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
    setIsSpeaking(false)
    onClose()
  }

  const togglePause = () => {
    setPaused(p => {
      const next = !p
      if (audioRef.current) { next ? audioRef.current.pause() : audioRef.current.play().catch(() => {}) }
      return next
    })
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 flex flex-col">
      {/* Tour header */}
      <div className="flex items-center justify-between px-6 py-3 bg-forest-DEFAULT text-white">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">Property Tour</span>
          <span className="text-sm text-green-300">{currentIndex + 1} / {tourStops.length}</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={togglePause} className="px-3 py-1 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition-colors">
            {paused ? '▶ Resume' : '⏸ Pause'}
          </button>
          <button onClick={handleClose} className="px-3 py-1 bg-red-500/80 rounded-lg text-sm hover:bg-red-500 transition-colors">
            ✕ Close Tour
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapContainer
          center={[current.lat, current.lng]}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {tourStops.map((stop, i) => (
            <Marker
              key={stop.slug}
              position={[stop.lat, stop.lng]}
              icon={i === currentIndex ? activePinIcon : pinIcon}
            >
              <Popup>
                <div style={{ width: 240, margin: '-14px -14px -24px', borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ padding: '12px 14px 14px' }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#111', marginBottom: 4 }}>{stop.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5, marginBottom: 10 }}>{stop.summary.slice(0, 120)}...</div>
                    <Link href={`/${stop.slug}`} style={{ display: 'block', textAlign: 'center', padding: '8px', backgroundColor: '#1a472a', color: 'white', fontSize: 13, fontWeight: 600, borderRadius: 8, textDecoration: 'none' }}>
                      View Property
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
          <FlyTo lat={current.lat} lng={current.lng} />
          <OpenPopup lat={current.lat} lng={current.lng} />
        </MapContainer>

        {/* Treeko in bottom-left of map */}
        <div className="absolute bottom-4 left-4 z-[10000] flex items-end gap-3">
          <div className={`w-20 h-24 relative ${isSpeaking ? 'animate-treeko-talk' : 'animate-treeko-sway'}`}>
            <Image
              src="/images/treeko-idle.png" alt="Treeko" width={80} height={96}
              className={`w-full h-full object-contain object-bottom drop-shadow-lg absolute inset-0 transition-opacity duration-200 ${isSpeaking ? 'opacity-0' : 'opacity-100'}`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/treeko-talking.png" alt="Treeko talking"
              className={`w-full h-full object-contain object-bottom drop-shadow-lg absolute inset-0 transition-opacity duration-200 ${isSpeaking ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
          {/* Speech bubble */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl px-4 py-3 max-w-sm animate-slideUp">
            <p className="text-sm font-bold text-gray-900 mb-1">{current.name}</p>
            <p className="text-xs text-gray-600 leading-relaxed">{current.summary.slice(0, 150)}{current.summary.length > 150 ? '...' : ''}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
