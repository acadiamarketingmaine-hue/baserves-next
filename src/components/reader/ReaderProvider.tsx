'use client'

import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { ReaderEngine, type ReaderSnapshot } from './engine'

interface ReaderContextValue extends ReaderSnapshot {
  play: () => void
  pause: () => void
  resume: () => void
  stop: () => void
  cycleRate: () => void
}

const EngineContext = createContext<ReaderEngine | null>(null)
/** True once the client has mounted. Feature-detection (`supported`) is
 * gated on this so the server render and the FIRST client render always
 * agree (server has no `window`, so it would otherwise flip on hydration and
 * pop the button in, which React also logs as a mismatch). */
const MountedContext = createContext(false)

/**
 * Mount once from the root layout, wrapping `children`. Everything else
 * (ReaderButton, ListenButton, ReaderPill) reads state through useReader().
 */
export function ReaderProvider({ children }: { children: ReactNode }) {
  const engineRef = useRef<ReaderEngine | null>(null)
  if (!engineRef.current) engineRef.current = new ReaderEngine()
  const engine = engineRef.current

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const pathname = usePathname()
  const prevPathname = useRef(pathname)
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname
      engine.stop()
    }
  }, [pathname, engine])

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') engine.stop()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      engine.stop()
    }
  }, [engine])

  return (
    <EngineContext.Provider value={engine}>
      <MountedContext.Provider value={mounted}>{children}</MountedContext.Provider>
    </EngineContext.Provider>
  )
}

/** Reader state and controls. `supported` is false until speechSynthesis is
 * confirmed available on the mounted client, so callers can safely render
 * nothing (`if (!supported) return null`) without a hydration mismatch. */
export function useReader(): ReaderContextValue {
  const engine = useContext(EngineContext)
  const mounted = useContext(MountedContext)
  if (!engine) throw new Error('useReader must be used inside <ReaderProvider>')
  const snapshot = useSyncExternalStore(engine.subscribe, engine.getSnapshot, engine.getSnapshot)
  return {
    ...snapshot,
    supported: snapshot.supported && mounted,
    play: () => engine.play(),
    pause: () => engine.pause(),
    resume: () => engine.resume(),
    stop: () => engine.stop(),
    cycleRate: () => engine.cycleRate(),
  }
}
