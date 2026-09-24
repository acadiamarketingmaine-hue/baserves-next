'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { tourStops } from '@/data/property-tour'
import { SpeakerOnIcon, SpeakerOffIcon, PlayIcon, PauseIcon, CloseIcon } from '@/components/Icons'
import { PinIcon } from '@/components/Icons'

type Message = { role: 'assistant' | 'user'; text: string }

const GREETING = 'Hello! I can help with places to stay, dates, group and event bookings, and directions. What are you planning?'

export default function AssistantPanel({
  autoStartTour,
  onClose,
}: {
  autoStartTour: boolean
  onClose: () => void
}) {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', text: GREETING }])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [touring, setTouring] = useState(false)
  const [tourChoosing, setTourChoosing] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [tourIndex, setTourIndex] = useState(0)
  const [tourPaused, setTourPaused] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const tourPausedRef = useRef(false)
  const tourAbortRef = useRef(false)
  const audioEnabledRef = useRef(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const pathname = usePathname()

  useEffect(() => { tourPausedRef.current = tourPaused }, [tourPaused])
  useEffect(() => { audioEnabledRef.current = audioEnabled }, [audioEnabled])

  // Focus the dialog on mount; Escape closes; Tab is trapped inside.
  useEffect(() => {
    closeBtnRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'Tab' && dialogRef.current) {
        const f = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input, [tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled'))
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        const active = document.activeElement
        if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && (active === last || !dialogRef.current.contains(active))) {
          e.preventDefault(); first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-scroll chat
  useEffect(() => {
    const el = document.getElementById('assistant-messages')
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  const sendMessage = useCallback(async (userText: string) => {
    setMessages(prev => [...prev, { role: 'user', text: userText }])
    setInput('')
    setIsTyping(true)
    try {
      const apiMessages = [...messages.map(m => ({ role: m.role, content: m.text })), { role: 'user' as const, content: userText }]
      const res = await fetch('/api/treeko', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: apiMessages }) })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply }])
      if (data.intakeData) {
        const allMsgs = [...messages, { role: 'user', text: userText }, { role: 'assistant', text: data.reply }]
        fetch('/api/treeko/send-intake', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ intakeData: data.intakeData, conversation: allMsgs }) }).catch(console.error)
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: "I'm having trouble connecting. Please call us at (207) 307-7903 or email info@baserves.com." }])
    } finally { setIsTyping(false) }
  }, [messages])

  // Tour helpers
  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
  const waitWhilePaused = async () => { while (tourPausedRef.current && !tourAbortRef.current) await sleep(200) }

  const speakAndWait = async (text: string): Promise<void> => {
    if (!audioEnabledRef.current) return
    try {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
      const res = await fetch('/api/treeko/speak', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) })
      if (!res.ok) return
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audioRef.current = audio
      return new Promise((resolve) => {
        audio.onplay = () => setIsSpeaking(true)
        audio.onended = () => { URL.revokeObjectURL(url); setIsSpeaking(false); resolve() }
        audio.onerror = () => { URL.revokeObjectURL(url); setIsSpeaking(false); resolve() }
        audio.play().catch(() => { setIsSpeaking(false); resolve() })
      })
    } catch { setIsSpeaking(false) }
  }

  const expandMap = () => {
    document.body.style.overflow = 'hidden'
    const section = document.getElementById('property-map-section')
    const container = document.getElementById('property-map-container')
    if (section) {
      section.style.position = 'fixed'
      section.style.inset = '0'
      section.style.zIndex = '9998'
      section.style.padding = '0'
      section.style.margin = '0'
      section.style.background = '#fff'
      section.style.transition = 'all 0.4s ease-in-out'
    }
    if (container) {
      container.style.height = '100vh'
      container.style.width = '100vw'
      container.style.borderRadius = '0'
      container.style.maxWidth = 'none'
    }
    const sectionText = section?.querySelector('.text-center')
    if (sectionText) (sectionText as HTMLElement).style.display = 'none'
    const containerParent = section?.querySelector('.container-custom') as HTMLElement
    if (containerParent) { containerParent.style.padding = '0'; containerParent.style.maxWidth = 'none'; containerParent.style.width = '100vw' }

    const leafletDiv = container?.querySelector('.leaflet-container') as HTMLElement
    if (leafletDiv) {
      leafletDiv.style.height = '100vh'
      leafletDiv.style.width = '100vw'
      leafletDiv.style.borderRadius = '0'
    }

    window.dispatchEvent(new CustomEvent('assistant-tour-start'))
  }

  const startTour = useCallback(async () => {
    if (pathname !== '/') {
      window.location.href = '/?tour=1'
      return
    }

    setTouring(true)
    setTourPaused(false)
    tourAbortRef.current = false

    const mapEl = document.getElementById('property-map-section')
    if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    await sleep(800)

    expandMap()
    await sleep(600)

    setTourChoosing(true)
  }, [pathname])

  const closeTourMap = () => {
    document.body.style.overflow = ''
    const section = document.getElementById('property-map-section')
    const container = document.getElementById('property-map-container')
    if (section) { section.style.position = ''; section.style.inset = ''; section.style.zIndex = ''; section.style.padding = ''; section.style.margin = ''; section.style.background = '' }
    if (container) { container.style.height = ''; container.style.width = ''; container.style.borderRadius = ''; container.style.maxWidth = '' }
    const sectionText = section?.querySelector('.text-center')
    if (sectionText) (sectionText as HTMLElement).style.display = ''
    const containerParent = section?.querySelector('.container-custom') as HTMLElement
    if (containerParent) { containerParent.style.padding = ''; containerParent.style.maxWidth = ''; containerParent.style.width = '' }
    const leafletDiv = container?.querySelector('.leaflet-container') as HTMLElement
    if (leafletDiv) { leafletDiv.style.height = ''; leafletDiv.style.width = ''; leafletDiv.style.borderRadius = '' }
    window.dispatchEvent(new CustomEvent('assistant-tour-end'))
  }

  const stopTour = useCallback(() => {
    tourAbortRef.current = true
    setTouring(false)
    setIsSpeaking(false)
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
    closeTourMap()
  }, [])

  const beginTourLoop = async (withSound: boolean) => {
    setAudioEnabled(withSound)
    audioEnabledRef.current = withSound
    setTourChoosing(false)

    for (let i = 0; i < tourStops.length; i++) {
      if (tourAbortRef.current) break
      await waitWhilePaused()
      if (tourAbortRef.current) break

      const stop = tourStops[i]
      const prevState = i > 0 ? tourStops[i - 1].state : stop.state
      const changingState = stop.state !== prevState
      setTourIndex(i)
      window.dispatchEvent(new CustomEvent('assistant-tour-focus', { detail: { lat: stop.lat, lng: stop.lng, slug: stop.slug, index: i, changingState } }))
      setMessages(prev => [...prev, { role: 'assistant', text: `[${stop.name}](/${stop.slug}): ${stop.summary}` }])

      await sleep(audioEnabledRef.current ? 800 : 1500)

      if (audioEnabledRef.current) {
        await speakAndWait(`${stop.name}. ${stop.summary}`)
        await sleep(300)
      } else {
        setIsSpeaking(true)
        await sleep(3500)
        setIsSpeaking(false)
      }
      await waitWhilePaused()
    }

    if (!tourAbortRef.current) {
      setMessages(prev => [...prev, { role: 'assistant', text: "That's the full tour. Want to learn more about any of these properties? Just ask." }])
    }
    closeTourMap()
    setTouring(false)
  }

  const toggleTourPause = () => {
    setTourPaused(p => {
      const next = !p
      if (audioRef.current) { next ? audioRef.current.pause() : audioRef.current.play().catch(() => {}) }
      return next
    })
  }

  // Auto-start the tour when opened via ?tour=1
  useEffect(() => {
    if (autoStartTour) { const t = setTimeout(() => startTour(), 400); return () => clearTimeout(t) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStartTour])

  useEffect(() => () => { stopTour() }, [stopTour])

  // Linkify URLs, phones, emails, and [text](url) markdown links
  const linkify = (text: string) => {
    const parts: Array<string | { type: string; text: string; href: string }> = []
    const regex = /(\[([^\]]+)\]\(([^)]+)\)|https?:\/\/[^\s,)]+|(?:baserves\.com|escape\.baserves\.com|mostateparks\.com|canalbridgeme\.com)[^\s,)]*|\b[\w.-]+@[\w.-]+\.\w+\b|\b\d{3}[-.]?\d{3}[-.]?\d{4}\b)/gi
    let lastIndex = 0; let match
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
      const m = match[0]
      if (m.startsWith('[') && match[2] && match[3]) {
        parts.push({ type: 'link', text: match[2], href: match[3] })
      } else if (m.includes('@') && !m.startsWith('http')) parts.push({ type: 'email', text: m, href: `mailto:${m}` })
      else if (/^\d{3}[-.]?\d{3}[-.]?\d{4}$/.test(m)) parts.push({ type: 'phone', text: m, href: `tel:${m.replace(/[-.]/g, '')}` })
      else { const href = m.startsWith('http') ? m : `https://${m}`; parts.push({ type: 'link', text: m, href }) }
      lastIndex = regex.lastIndex
    }
    if (lastIndex < text.length) parts.push(text.slice(lastIndex))
    return parts.map((part, i) => {
      if (typeof part === 'string') return <span key={i}>{part}</span>
      return <a key={i} href={part.href} target={part.type === 'link' ? '_blank' : undefined} rel={part.type === 'link' ? 'noopener noreferrer' : undefined} className="underline font-semibold hover:opacity-80" style={{ color: 'inherit' }}>{part.text}</a>
    })
  }

  return (
    <>
      {/* Sound choice overlay — shown before tour starts */}
      {tourChoosing && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="animate-assistant-fade mx-4 max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-lake-spruce text-lake-paper">
              <PinIcon className="h-7 w-7" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">Ready for the tour</h3>
            <p className="mb-6 text-sm text-gray-600">How would you like to experience it?</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => beginTourLoop(true)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-lake-spruce px-6 py-3 font-semibold text-lake-paper transition-colors hover:bg-lake-spruce-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce">
                <SpeakerOnIcon className="h-5 w-5" /> Tour with sound
              </button>
              <button onClick={() => beginTourLoop(false)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-100 px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce">
                <SpeakerOffIcon className="h-5 w-5" /> Tour without sound
              </button>
              <button onClick={() => { setTourChoosing(false); closeTourMap(); setTouring(false) }} className="mt-1 min-h-[44px] text-sm text-gray-500 hover:text-gray-600">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tour controls bar — shown during tour */}
      {touring && !tourChoosing && (
        <div className="animate-assistant-fade fixed left-0 right-0 top-0 z-[10000] flex items-center justify-between bg-white/95 px-3 py-2 text-gray-900 shadow-md backdrop-blur-sm md:px-6 md:py-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="whitespace-nowrap text-sm font-bold text-lake-spruce md:text-base">{tourIndex + 1}/{tourStops.length}</span>
            <span className="truncate text-xs text-gray-600 md:text-sm">{tourStops[tourIndex]?.name}</span>
          </div>
          <div className="flex flex-shrink-0 items-center gap-1 md:gap-3">
            <button onClick={() => { setAudioEnabled(a => !a); audioEnabledRef.current = !audioEnabledRef.current }} className="flex items-center gap-1 rounded-lg bg-gray-100 p-1.5 text-xs hover:bg-gray-200 md:px-3 md:py-1 md:text-sm">
              {audioEnabled ? <SpeakerOnIcon className="h-4 w-4" /> : <SpeakerOffIcon className="h-4 w-4" />}<span className="hidden md:inline"> {audioEnabled ? 'Audio on' : 'Audio off'}</span>
            </button>
            <button onClick={toggleTourPause} className="flex items-center gap-1 rounded-lg bg-gray-100 p-1.5 text-xs hover:bg-gray-200 md:px-3 md:py-1 md:text-sm">
              {tourPaused ? <PlayIcon className="h-4 w-4" /> : <PauseIcon className="h-4 w-4" />}<span className="hidden md:inline"> {tourPaused ? 'Resume' : 'Pause'}</span>
            </button>
            <button onClick={stopTour} className="flex items-center gap-1 rounded-lg bg-red-100 p-1.5 text-xs text-red-700 hover:bg-red-200 md:px-3 md:py-1 md:text-sm">
              <CloseIcon className="h-4 w-4" /><span className="hidden md:inline"> End tour</span>
            </button>
          </div>
        </div>
      )}

      {/* Chat panel */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="assistant-panel-title"
        className={`animate-assistant-fade mb-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl ${touring ? 'w-72 sm:w-80' : 'w-80 sm:w-96'}`}
      >
        <div className="flex items-center justify-between bg-lake-spruce px-4 py-3">
          <div>
            <p id="assistant-panel-title" className="text-sm font-semibold text-lake-paper">BA Services</p>
            <p className="text-xs text-lake-paper/70">Trip planning assistant</p>
          </div>
          <button ref={closeBtnRef} onClick={onClose} aria-label="Close chat" className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-lake-paper/80 transition-colors hover:text-lake-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <p className="border-b border-gray-100 bg-gray-50 px-4 py-2 text-xs text-gray-500">
          Automated assistant. For bookings or anything urgent, call{' '}
          <a href="tel:+12073077903" className="font-medium underline hover:text-gray-700">(207) 307-7903</a>.
        </p>
        <div className={`space-y-3 overflow-y-auto p-4 ${touring ? 'max-h-40 md:max-h-56' : 'max-h-72'}`} id="assistant-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${msg.role === 'user' ? 'rounded-br-md bg-lake-spruce text-lake-paper' : 'rounded-bl-md bg-gray-100 text-gray-800'}`}>
                {i === 0 && msg.role === 'assistant' ? (
                  <span>{GREETING} Would you like to <button onClick={startTour} className="font-semibold text-lake-spruce underline hover:text-lake-spruce-dark">tour our properties</button>?</span>
                ) : linkify(msg.text)}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-gray-100 px-3 py-2">
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-gray-100 p-3">
          <form onSubmit={async (e) => { e.preventDefault(); if (!input.trim() || isTyping) return; await sendMessage(input) }}>
            <div className="flex gap-2">
              <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." aria-label="Message" className="min-h-[44px] flex-1 rounded-full border border-gray-200 px-3 py-2 text-sm focus:border-lake-spruce focus:outline-none focus:ring-2 focus:ring-lake-spruce/30" />
              <button type="submit" disabled={isTyping} aria-label="Send message" className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-lake-spruce text-lake-paper transition-colors hover:bg-lake-spruce-dark disabled:opacity-50">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @keyframes assistantFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-assistant-fade { animation: assistantFadeIn 200ms ease-out both; }
        @media (prefers-reduced-motion: no-preference) {
          @keyframes assistantFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        }
      `}</style>
    </>
  )
}
