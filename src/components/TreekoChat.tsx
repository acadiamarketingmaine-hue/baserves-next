'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { tourStops } from '@/data/property-tour'
import dynamic from 'next/dynamic'
const TourModal = dynamic(() => import('@/components/TourModal'), { ssr: false })

type ChatState = 'idle' | 'greeting' | 'chatting'

export default function TreekoChat() {
  const [state, setState] = useState<ChatState>('idle')
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: 'treeko' | 'user'; text: string }>>([])
  const [input, setInput] = useState('')
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [touring, setTouring] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const greeting = "Hi there! I'm Treeko, your BA Services assistant. How can I help you today?"

  useEffect(() => {
    let loaded = 0
    const check = () => { loaded++; if (loaded >= 3) setImagesLoaded(true) }
    const idle = new window.Image(); idle.onload = check; idle.src = '/images/treeko-idle.png'
    const talking = new window.Image(); talking.onload = check; talking.src = '/images/treeko-talking.png'
    const thumb = new window.Image(); thumb.onload = check; thumb.src = '/images/treeko-thumb.png'
    setTimeout(() => setImagesLoaded(true), 2000)
  }, [])

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
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1))
        i++
      } else {
        if (typingRef.current) clearInterval(typingRef.current)
        onDone()
      }
    }, 60)
  }

  const handleClose = () => {
    if (typingRef.current) clearInterval(typingRef.current)
    stopTour()
    setState('idle')
    setDisplayedText('')
    setMessages([])
    setIsTyping(false)
  }

  const sendMessage = useCallback(async (userText: string) => {
    setMessages(prev => [...prev, { role: 'user', text: userText }])
    setInput('')
    setIsTyping(true)

    try {
      const apiMessages = [
        ...messages.map(m => ({ role: m.role === 'treeko' ? 'assistant' as const : 'user' as const, content: m.text })),
        { role: 'user' as const, content: userText },
      ]
      const res = await fetch('/api/treeko', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'treeko', text: data.reply }])

      // If intake is complete, send the email
      if (data.intakeData) {
        const allMessages = [...messages, { role: 'user', text: userText }, { role: 'treeko', text: data.reply }]
        fetch('/api/treeko/send-intake', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ intakeData: data.intakeData, conversation: allMessages }),
        }).catch(console.error)
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'treeko',
        text: "I'm having trouble connecting. Please call us at (207) 307-7903 or email info@baserves.com!"
      }])
    } finally {
      setIsTyping(false)
    }
  }, [messages])

  // Auto-scroll chat to bottom when messages change
  useEffect(() => {
    const el = document.getElementById('treeko-messages')
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  const startTour = useCallback(() => {
    setTouring(true)
    // Scroll to map first so user sees the context
    const mapEl = document.getElementById('property-map-section')
    if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const stopTour = () => {
    setTouring(false)
  }

  // Auto-link URLs, phone numbers, and emails in message text
  const linkify = (text: string) => {
    const parts: Array<string | { type: 'link' | 'phone' | 'email'; text: string; href: string }> = []
    // Match URLs (with or without protocol), phone numbers, and emails
    const regex = /(https?:\/\/[^\s,)]+|(?:baserves\.com|escape\.baserves\.com|mostateparks\.com|canalbridgeme\.com)[^\s,)]*|\b[\w.-]+@[\w.-]+\.\w+\b|\b\d{3}[-.]?\d{3}[-.]?\d{4}\b)/gi
    let lastIndex = 0
    let match

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }
      const m = match[0]
      if (m.includes('@') && !m.startsWith('http')) {
        parts.push({ type: 'email', text: m, href: `mailto:${m}` })
      } else if (/^\d{3}[-.]?\d{3}[-.]?\d{4}$/.test(m)) {
        parts.push({ type: 'phone', text: m, href: `tel:${m.replace(/[-.]/g, '')}` })
      } else {
        const href = m.startsWith('http') ? m : `https://${m}`
        parts.push({ type: 'link', text: m, href })
      }
      lastIndex = regex.lastIndex
    }
    if (lastIndex < text.length) parts.push(text.slice(lastIndex))

    return parts.map((part, i) => {
      if (typeof part === 'string') return <span key={i}>{part}</span>
      return (
        <a key={i} href={part.href} target={part.type === 'link' ? '_blank' : undefined}
          rel={part.type === 'link' ? 'noopener noreferrer' : undefined}
          className="underline font-semibold hover:opacity-80 transition-opacity"
          style={{ color: 'inherit' }}>
          {part.text}
        </a>
      )
    })
  }

  if (!imagesLoaded) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* Chat Panel */}
      {state === 'chatting' && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 sm:w-96 mb-2 overflow-hidden animate-slideUp">
          {/* Header */}
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
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 max-h-72 overflow-y-auto space-y-3" id="treeko-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-forest-DEFAULT text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                }`}>
                  {/* Render tour link in greeting */}
                  {i === 0 && msg.role === 'treeko' ? (
                    <span>
                      {greeting} Would you like to{' '}
                      <button
                        onClick={startTour}
                        className="text-forest-DEFAULT font-semibold underline hover:text-forest-dark"
                      >
                        tour our properties
                      </button>
                      ?
                    </span>
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

          {/* Input */}
          <div className="border-t border-gray-100 p-3">
            <form onSubmit={async (e) => {
              e.preventDefault()
              if (!input.trim() || isTyping) return
              await sendMessage(input)
            }}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-forest-DEFAULT/30 focus:border-forest-DEFAULT"
                />
                <button
                  type="submit"
                  disabled={isTyping}
                  className="w-9 h-9 bg-forest-DEFAULT text-white rounded-full flex items-center justify-center hover:bg-forest-dark transition-colors flex-shrink-0 disabled:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Speech Bubble (greeting state) */}
      {state === 'greeting' && displayedText && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 max-w-72 mb-2 mr-2 animate-slideUp relative">
          <div className="text-sm text-gray-800 leading-relaxed">{displayedText}</div>
          <div className="absolute -bottom-2 right-10 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45" />
        </div>
      )}

      {/* Soundwave */}
      {isTyping && (
        <div className="absolute bottom-20 right-10 pointer-events-none">
          <div className="flex gap-[3px] -rotate-45 origin-bottom-right">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="w-[3px] bg-forest-DEFAULT/60 rounded-full animate-soundwave" style={{ animationDelay: `${i * 100}ms`, height: '12px' }} />
            ))}
          </div>
        </div>
      )}

      {/* Treeko Character */}
      <button
        onClick={handleClick}
        className="relative group cursor-pointer focus:outline-none"
        aria-label="Chat with Treeko"
      >
        {state === 'idle' && (
          <div className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center z-10 animate-bounce">
            <span className="text-white text-[10px] font-bold">1</span>
          </div>
        )}
        <div className={`w-24 h-28 relative transition-transform ${
          isTyping || touring ? 'animate-treeko-talk' : 'animate-treeko-sway group-hover:scale-105'
        }`}>
          <Image src="/images/treeko-idle.png" alt="Treeko" width={96} height={112}
            className={`w-full h-full object-contain object-bottom drop-shadow-lg absolute inset-0 transition-opacity duration-200 ${isTyping || touring ? 'opacity-0' : 'opacity-100'}`}
            priority />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/treeko-talking.png" alt="Treeko talking"
            className={`w-full h-full object-contain object-bottom drop-shadow-lg absolute inset-0 transition-opacity duration-200 ${isTyping || touring ? 'opacity-100' : 'opacity-0'}`} />
        </div>
      </button>

      {/* Tour Modal */}
      {touring && (
        <TourModal
          onClose={stopTour}
          onNarration={(text) => setMessages(prev => [...prev, { role: 'treeko', text }])}
          audioEnabled={audioEnabled}
        />
      )}

      <style jsx global>{`
        @keyframes treeko-sway {
          0%, 100% { transform: rotate(0deg); transform-origin: center top; }
          25% { transform: rotate(2.5deg); transform-origin: center top; }
          75% { transform: rotate(-2.5deg); transform-origin: center top; }
        }
        @keyframes treeko-talk {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes soundwave {
          0%, 100% { transform: scaleY(0.4); opacity: 0.3; }
          50% { transform: scaleY(1.8); opacity: 1; }
        }
        .animate-treeko-sway { animation: treeko-sway 4s ease-in-out infinite; transform-origin: center top; }
        .animate-treeko-talk { animation: treeko-talk 1s ease-in-out infinite; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
        .animate-soundwave { animation: soundwave 0.6s ease-in-out infinite; }
      `}</style>
    </div>
  )
}
