'use client'

import { useState, useEffect } from 'react'

type ChatState = 'idle' | 'greeting' | 'chatting'

export default function TreekoChat() {
  const [state, setState] = useState<ChatState>('idle')
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: 'treeko' | 'user'; text: string }>>([])
  const [input, setInput] = useState('')

  const greeting = "Hi there! I'm Treeko, your BA Services assistant. How can I help you today?"

  const handleClick = () => {
    if (state === 'idle') {
      setState('greeting')
      setIsTyping(true)
      typeText(greeting, () => {
        setIsTyping(false)
        setMessages([{ role: 'treeko', text: greeting }])
        setState('chatting')
      })
    } else if (state === 'chatting') {
      // Toggle chat panel visibility handled by CSS
    }
  }

  const typeText = (text: string, onDone: () => void) => {
    let i = 0
    setDisplayedText('')
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        onDone()
      }
    }, 30)
  }

  const handleClose = () => {
    setState('idle')
    setDisplayedText('')
    setMessages([])
    setIsTyping(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* Chat Panel */}
      {state === 'chatting' && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 sm:w-96 mb-2 overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-forest-DEFAULT px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center">
                <TreeIcon size={18} />
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
          <div className="p-4 max-h-72 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-forest-DEFAULT text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 p-3">
            <form onSubmit={(e) => {
              e.preventDefault()
              if (!input.trim()) return
              setMessages(prev => [...prev, { role: 'user', text: input }])
              const userMsg = input
              setInput('')
              // Simple auto-response for now
              setTimeout(() => {
                setMessages(prev => [...prev, {
                  role: 'treeko',
                  text: "Thanks for your question! For the best assistance, please call us at (207) 307-7903 or email info@baserves.com. We're happy to help!"
                }])
              }, 1000)
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
                  className="w-9 h-9 bg-forest-DEFAULT text-white rounded-full flex items-center justify-center hover:bg-forest-dark transition-colors flex-shrink-0"
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
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 max-w-72 mb-2 animate-slideUp relative">
          <div className="text-sm text-gray-800 leading-relaxed">{displayedText}</div>
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45" />
        </div>
      )}

      {/* Treeko Character */}
      <button
        onClick={handleClick}
        className="relative group cursor-pointer focus:outline-none"
        aria-label="Chat with Treeko"
      >
        {/* Notification dot when idle */}
        {state === 'idle' && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center z-10 animate-bounce">
            <span className="text-white text-[10px] font-bold">1</span>
          </div>
        )}

        {/* Tree character */}
        <div className={`w-16 h-16 rounded-full bg-forest-DEFAULT shadow-lg flex items-center justify-center transition-transform ${
          state === 'idle' ? 'animate-treeko-idle group-hover:scale-110' : ''
        } ${isTyping ? 'animate-treeko-talk' : ''}`}>
          <TreeIcon size={36} />
        </div>
      </button>

      <style jsx global>{`
        @keyframes treeko-idle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(1deg); }
          50% { transform: translateY(-1px) rotate(-1deg); }
          75% { transform: translateY(-4px) rotate(0.5deg); }
        }
        @keyframes treeko-talk {
          0%, 100% { transform: scale(1) rotate(0deg); }
          10% { transform: scale(1.05) rotate(-2deg); }
          20% { transform: scale(0.98) rotate(1deg); }
          30% { transform: scale(1.04) rotate(-1deg); }
          40% { transform: scale(0.97) rotate(2deg); }
          50% { transform: scale(1.03) rotate(-1.5deg); }
          60% { transform: scale(0.99) rotate(1deg); }
          70% { transform: scale(1.02) rotate(-0.5deg); }
          80% { transform: scale(1) rotate(1deg); }
          90% { transform: scale(1.01) rotate(-0.5deg); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-treeko-idle {
          animation: treeko-idle 3s ease-in-out infinite;
        }
        .animate-treeko-talk {
          animation: treeko-talk 0.6s ease-in-out infinite;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

function TreeIcon({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Trunk */}
      <rect x="27" y="44" width="10" height="12" rx="2" fill="#8B5E3C" />
      {/* Tree body - layered triangles */}
      <path d="M32 6L48 28H16L32 6Z" fill="#4CAF50" />
      <path d="M32 14L50 36H14L32 14Z" fill="#388E3C" />
      <path d="M32 22L52 46H12L32 22Z" fill="#2E7D32" />
      {/* Face - eyes */}
      <circle cx="25" cy="33" r="2.5" fill="white" />
      <circle cx="39" cy="33" r="2.5" fill="white" />
      <circle cx="25.8" cy="33.5" r="1.2" fill="#1B5E20" />
      <circle cx="39.8" cy="33.5" r="1.2" fill="#1B5E20" />
      {/* Smile */}
      <path d="M27 38C27 38 30 42 32 42C34 42 37 38 37 38" stroke="#1B5E20" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Cheeks */}
      <circle cx="22" cy="37" r="2" fill="#A5D6A7" opacity="0.6" />
      <circle cx="42" cy="37" r="2" fill="#A5D6A7" opacity="0.6" />
      {/* Waving hand/branch */}
      <g className="treeko-wave-hand">
        <path d="M50 30C52 28 55 26 56 28C57 30 54 32 52 33L50 30Z" fill="#4CAF50" />
      </g>
    </svg>
  )
}
