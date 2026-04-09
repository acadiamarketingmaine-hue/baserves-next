'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { tourStops } from '@/data/property-tour'

type ChatState = 'idle' | 'greeting' | 'chatting'

export default function TreekoChat() {
  const [state, setState] = useState<ChatState>('idle')
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: 'treeko' | 'user'; text: string }>>([])
  const [input, setInput] = useState('')
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [touring, setTouring] = useState(false)
  const [tourChoosing, setTourChoosing] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [tourIndex, setTourIndex] = useState(0)
  const [tourPaused, setTourPaused] = useState(false)
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const tourPausedRef = useRef(false)
  const tourAbortRef = useRef(false)
  const audioEnabledRef = useRef(false)

  const greeting = "Hi there! I'm Treeko, your BA Services assistant. How can I help you today?"

  useEffect(() => {
    let loaded = 0
    const check = () => { loaded++; if (loaded >= 3) setImagesLoaded(true) }
    const i1 = new window.Image(); i1.onload = check; i1.src = '/images/treeko-idle.png'
    const i2 = new window.Image(); i2.onload = check; i2.src = '/images/treeko-talking.png'
    const i3 = new window.Image(); i3.onload = check; i3.src = '/images/treeko-thumb.png'
    setTimeout(() => setImagesLoaded(true), 2000)
  }, [])

  useEffect(() => { tourPausedRef.current = tourPaused }, [tourPaused])
  useEffect(() => { audioEnabledRef.current = audioEnabled }, [audioEnabled])

  const pathname = usePathname()

  // Auto-scroll chat
  useEffect(() => {
    const el = document.getElementById('treeko-messages')
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  const handleClick = () => {
    if (state === 'idle') {
      setState('greeting')
      setIsTyping(true)
      typeText(greeting, () => {
        setIsTyping(false)
        setMessages([{ role: 'treeko', text: greeting }])
        setState('chatting')
      })
    }
  }

  const typeText = (text: string, onDone: () => void) => {
    let i = 0
    setDisplayedText('')
    if (typingRef.current) clearInterval(typingRef.current)
    typingRef.current = setInterval(() => {
      if (i < text.length) { setDisplayedText(text.slice(0, i + 1)); i++ }
      else { if (typingRef.current) clearInterval(typingRef.current); onDone() }
    }, 60)
  }

  const handleClose = () => {
    if (typingRef.current) clearInterval(typingRef.current)
    stopTour()
    setState('idle'); setDisplayedText(''); setMessages([]); setIsTyping(false)
  }

  const sendMessage = useCallback(async (userText: string) => {
    setMessages(prev => [...prev, { role: 'user', text: userText }])
    setInput('')
    setIsTyping(true); setIsSpeaking(true)
    try {
      const apiMessages = [...messages.map(m => ({ role: m.role === 'treeko' ? 'assistant' as const : 'user' as const, content: m.text })), { role: 'user' as const, content: userText }]
      const res = await fetch('/api/treeko', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: apiMessages }) })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'treeko', text: data.reply }])
      if (data.intakeData) {
        const allMsgs = [...messages, { role: 'user', text: userText }, { role: 'treeko', text: data.reply }]
        fetch('/api/treeko/send-intake', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ intakeData: data.intakeData, conversation: allMsgs }) }).catch(console.error)
      }
    } catch {
      setMessages(prev => [...prev, { role: 'treeko', text: "I'm having trouble connecting. Please call us at (207) 307-7903 or email info@baserves.com!" }])
    } finally { setIsTyping(false); setIsSpeaking(false) }
  }, [messages])

  // Tour helpers
  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
  const waitWhilePaused = async () => { while (tourPausedRef.current && !tourAbortRef.current) await sleep(200) }

  const speakAndWait = async (text: string): Promise<void> => {
    if (!audioEnabledRef.current) return
    try {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
      setIsSpeaking(true)
      const res = await fetch('/api/treeko/speak', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) })
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
    // Hide the section header/text and remove container padding during tour
    const sectionText = section?.querySelector('.text-center')
    if (sectionText) (sectionText as HTMLElement).style.display = 'none'
    const containerParent = section?.querySelector('.container-custom') as HTMLElement
    if (containerParent) { containerParent.style.padding = '0'; containerParent.style.maxWidth = 'none'; containerParent.style.width = '100vw' }

    // Also force the Leaflet map div itself to fill
    const leafletDiv = container?.querySelector('.leaflet-container') as HTMLElement
    if (leafletDiv) {
      leafletDiv.style.height = '100vh'
      leafletDiv.style.width = '100vw'
      leafletDiv.style.borderRadius = '0'
    }

    window.dispatchEvent(new CustomEvent('treeko-tour-start'))
  }

  const startTour = useCallback(async () => {
    // If not on homepage, navigate there first
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

    // Show sound choice
    setTourChoosing(true)
  }, [pathname])

  // Auto-start tour if ?tour=1 is in URL (e.g. navigated from another page)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('tour') === '1' && pathname === '/') {
      window.history.replaceState({}, '', '/')
      setState('chatting')
      setMessages([{ role: 'treeko', text: greeting }])
      setTimeout(() => startTour(), 500)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    window.dispatchEvent(new CustomEvent('treeko-tour-end'))
  }

  const beginTourLoop = async (withSound: boolean) => {
    setAudioEnabled(withSound)
    audioEnabledRef.current = withSound
    setTourChoosing(false)

    for (let i = 0; i < tourStops.length; i++) {
      if (tourAbortRef.current) break
      await waitWhilePaused()
      if (tourAbortRef.current) break

      const stop = tourStops[i]
      setTourIndex(i)
      window.dispatchEvent(new CustomEvent('treeko-tour-focus', { detail: { lat: stop.lat, lng: stop.lng, slug: stop.slug, index: i } }))
      setMessages(prev => [...prev, { role: 'treeko', text: `📍 [${stop.name}](/${stop.slug}): ${stop.summary}` }])

      // Wait for fly animation
      await sleep(1500)

      if (audioEnabledRef.current) {
        await speakAndWait(`${stop.name}. ${stop.summary}`)
        await sleep(500)
      } else {
        setIsSpeaking(true)
        await sleep(3500)
        setIsSpeaking(false)
      }
      await waitWhilePaused()
    }

    if (!tourAbortRef.current) {
      setMessages(prev => [...prev, { role: 'treeko', text: "That's the full tour! Want to learn more about any of these properties? Just ask!" }])
    }
    closeTourMap()
    setTouring(false)
  }

  const stopTour = () => {
    tourAbortRef.current = true
    setTouring(false)
    setIsSpeaking(false)
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
    closeTourMap()
  }

  const toggleTourPause = () => {
    setTourPaused(p => {
      const next = !p
      if (audioRef.current) { next ? audioRef.current.pause() : audioRef.current.play().catch(() => {}) }
      return next
    })
  }

  // Linkify URLs, phones, emails, and [text](url) markdown links
  const linkify = (text: string) => {
    const parts: Array<string | { type: string; text: string; href: string }> = []
    const regex = /(\[([^\]]+)\]\(([^)]+)\)|https?:\/\/[^\s,)]+|(?:baserves\.com|escape\.baserves\.com|mostateparks\.com|canalbridgeme\.com)[^\s,)]*|\b[\w.-]+@[\w.-]+\.\w+\b|\b\d{3}[-.]?\d{3}[-.]?\d{4}\b)/gi
    let lastIndex = 0; let match
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
      const m = match[0]
      if (m.startsWith('[') && match[2] && match[3]) {
        // Markdown link [text](url)
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

  const treekoIsTalking = isTyping || isSpeaking

  if (!imagesLoaded) return null

  return (
    <div className={`fixed z-[9999] flex flex-col items-end gap-2 ${touring ? 'bottom-2 right-2 md:bottom-4 md:right-4' : 'bottom-4 right-4'}`}>
      {/* Sound choice overlay — shown before tour starts */}
      {tourChoosing && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm mx-4 text-center animate-slideUp">
            <div className="w-16 h-16 mx-auto mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/treeko-idle.png" alt="Treeko" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ready for the tour!</h3>
            <p className="text-gray-600 text-sm mb-6">How would you like to experience it?</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => beginTourLoop(true)} className="w-full py-3 px-6 bg-forest-DEFAULT text-white font-semibold rounded-xl hover:bg-forest-dark transition-colors flex items-center justify-center gap-2">
                🔊 Tour with Sound
              </button>
              <button onClick={() => beginTourLoop(false)} className="w-full py-3 px-6 bg-gray-100 text-gray-800 font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                🔇 Tour without Sound
              </button>
              <button onClick={() => { setTourChoosing(false); closeTourMap(); setTouring(false) }} className="text-sm text-gray-400 hover:text-gray-600 mt-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tour controls bar — shown during tour */}
      {touring && !tourChoosing && (
        <div className="fixed top-0 left-0 right-0 z-[10000] bg-white/95 backdrop-blur-sm shadow-md text-gray-900 px-3 md:px-6 py-2 md:py-3 flex items-center justify-between animate-slideDown">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-bold text-sm md:text-base whitespace-nowrap text-forest-DEFAULT">{tourIndex + 1}/{tourStops.length}</span>
            <span className="text-gray-600 text-xs md:text-sm truncate">{tourStops[tourIndex]?.name}</span>
          </div>
          <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
            <button onClick={() => { setAudioEnabled(a => !a); audioEnabledRef.current = !audioEnabledRef.current }} className="p-1.5 md:px-3 md:py-1 bg-gray-100 rounded-lg text-xs md:text-sm hover:bg-gray-200">
              {audioEnabled ? '🔊' : '🔇'}<span className="hidden md:inline"> {audioEnabled ? 'Audio On' : 'Audio Off'}</span>
            </button>
            <button onClick={toggleTourPause} className="p-1.5 md:px-3 md:py-1 bg-gray-100 rounded-lg text-xs md:text-sm hover:bg-gray-200">
              {tourPaused ? '▶' : '⏸'}<span className="hidden md:inline"> {tourPaused ? 'Resume' : 'Pause'}</span>
            </button>
            <button onClick={stopTour} className="p-1.5 md:px-3 md:py-1 bg-red-100 text-red-700 rounded-lg text-xs md:text-sm hover:bg-red-200">
              ✕<span className="hidden md:inline"> End Tour</span>
            </button>
          </div>
        </div>
      )}

      {/* Chat Panel */}
      {state === 'chatting' && (
        <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 mb-2 overflow-hidden animate-slideUp ${touring ? 'w-72 sm:w-80' : 'w-80 sm:w-96'}`}>
          <div className="bg-forest-DEFAULT px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/treeko-thumb.png" alt="Treeko" width={32} height={32} className="w-8 h-8 object-contain" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Treeko</p>
                <p className="text-green-300 text-xs">BA Services Assistant</p>
              </div>
            </div>
            <button onClick={handleClose} className="text-white/60 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className={`p-4 overflow-y-auto space-y-3 ${touring ? 'max-h-40 md:max-h-56' : 'max-h-72'}`} id="treeko-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-forest-DEFAULT text-white rounded-br-md' : 'bg-gray-100 text-gray-800 rounded-bl-md'}`}>
                  {i === 0 && msg.role === 'treeko' ? (
                    <span>{greeting} Would you like to <button onClick={startTour} className="text-forest-DEFAULT font-semibold underline hover:text-forest-dark">tour our properties</button>?</span>
                  ) : linkify(msg.text)}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-md px-3 py-2 flex items-center gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
          <div className="border-t border-gray-100 p-3">
            <form onSubmit={async (e) => { e.preventDefault(); if (!input.trim() || isTyping) return; await sendMessage(input) }}>
              <div className="flex gap-2">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." className="flex-1 px-3 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-forest-DEFAULT/30 focus:border-forest-DEFAULT" />
                <button type="submit" disabled={isTyping} className="w-9 h-9 bg-forest-DEFAULT text-white rounded-full flex items-center justify-center hover:bg-forest-dark transition-colors flex-shrink-0 disabled:opacity-50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Speech Bubble (greeting) */}
      {state === 'greeting' && displayedText && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 max-w-72 mb-2 mr-2 animate-slideUp relative">
          <div className="text-sm text-gray-800 leading-relaxed">{displayedText}</div>
          <div className="absolute -bottom-2 right-10 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45" />
        </div>
      )}

      {/* Soundwave */}
      {treekoIsTalking && (
        <div className="absolute bottom-20 right-10 pointer-events-none">
          <div className="flex gap-[3px] -rotate-45 origin-bottom-right">
            {[0,1,2,3,4].map((i) => (<div key={i} className="w-[3px] bg-forest-DEFAULT/60 rounded-full animate-soundwave" style={{ animationDelay: `${i*100}ms`, height: '12px' }} />))}
          </div>
        </div>
      )}

      {/* Treeko */}
      <button onClick={handleClick} className="relative group cursor-pointer focus:outline-none" aria-label="Chat with Treeko">
        {state === 'idle' && (
          <div className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center z-10 animate-bounce">
            <span className="text-white text-[10px] font-bold">1</span>
          </div>
        )}
        <div className={`w-24 h-28 relative transition-transform ${treekoIsTalking ? 'animate-treeko-talk' : 'animate-treeko-sway group-hover:scale-105'}`}>
          <Image src="/images/treeko-idle.png" alt="Treeko" width={96} height={112} className={`w-full h-full object-contain object-bottom drop-shadow-lg absolute inset-0 transition-opacity duration-200 ${treekoIsTalking ? 'opacity-0' : 'opacity-100'}`} priority />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/treeko-talking.png" alt="Treeko talking" className={`w-full h-full object-contain object-bottom drop-shadow-lg absolute inset-0 transition-opacity duration-200 ${treekoIsTalking ? 'opacity-100' : 'opacity-0'}`} />
        </div>
      </button>

      <style jsx global>{`
        @keyframes treeko-sway { 0%, 100% { transform: rotate(0deg); transform-origin: center top; } 25% { transform: rotate(2.5deg); transform-origin: center top; } 75% { transform: rotate(-2.5deg); transform-origin: center top; } }
        @keyframes treeko-talk { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes soundwave { 0%, 100% { transform: scaleY(0.4); opacity: 0.3; } 50% { transform: scaleY(1.8); opacity: 1; } }
        .animate-treeko-sway { animation: treeko-sway 4s ease-in-out infinite; transform-origin: center top; }
        .animate-treeko-talk { animation: treeko-talk 1s ease-in-out infinite; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        .animate-soundwave { animation: soundwave 0.6s ease-in-out infinite; }
      `}</style>
    </div>
  )
}
