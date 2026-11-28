'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export interface ProSiteWidgetsProps {
  /** Brand primary hex color (e.g. "#c8102e", "#0f172a", "#f97316") */
  accentColor?: string;
  /** Privacy policy link for cookie consent */
  privacyHref?: string;
  /** Bottom offset in px on mobile so floating trigger clears sticky mobile call/booking bars */
  mobileBottomOffset?: number;
  /** Side for the floating reader-assist trigger ("left" avoids right-side chat bubbles) */
  position?: 'left' | 'right';
  /** Disable built-in cookie bar only if the site already renders a dedicated sleek consent bar */
  enableCookieConsent?: boolean;
}

interface A11yPrefs {
  scale: 0 | 1 | 2; // 100%, 112%, 125%
  readableFont: boolean;
  highContrast: boolean;
  highlightLinks: boolean;
  readingGuide: boolean;
  pauseMotion: boolean;
}

const DEFAULT_A11Y: A11yPrefs = {
  scale: 0,
  readableFont: false,
  highContrast: false,
  highlightLinks: false,
  readingGuide: false,
  pauseMotion: false,
};

const A11Y_KEY = 'pro_reader_assist_v1';
const CONSENT_KEY = 'pro_cookie_consent_v1';

export default function ProSiteWidgets({
  accentColor = '#111827',
  privacyHref = '/privacy',
  mobileBottomOffset = 76,
  position = 'left',
  enableCookieConsent = true,
}: ProSiteWidgetsProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Global Top-of-Page Guarantee: forces scrollY = 0 on cold load, refresh, AND every Next.js <Link> route change
  // (unless a #hash anchor is targeted or the user already started scrolling). Defeats CSS scroll-behavior: smooth,
  // Mobile Safari scroll restoration, Suspense layout shifts, and Lenis stale offsets.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
    } catch {}
    if (window.location.hash) return;

    let userInteracted = false;
    const markUser = () => { userInteracted = true; };
    window.addEventListener('wheel', markUser, { passive: true, once: true });
    window.addEventListener('touchstart', markUser, { passive: true, once: true });
    window.addEventListener('keydown', markUser, { passive: true, once: true });

    const snapTop = () => {
      if (userInteracted || window.location.hash) return;
      const html = document.documentElement;
      const prevBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      } catch {
        window.scrollTo(0, 0);
      }
      html.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      const w = window as unknown as { __lenis?: { scrollTo?: (t: number, o?: { immediate?: boolean }) => void } };
      if (w.__lenis && typeof w.__lenis.scrollTo === 'function') {
        w.__lenis.scrollTo(0, { immediate: true });
      }
      html.style.scrollBehavior = prevBehavior;
    };

    snapTop();
    const raf1 = requestAnimationFrame(snapTop);
    const t1 = setTimeout(snapTop, 60);
    const t2 = setTimeout(snapTop, 180);

    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('wheel', markUser);
      window.removeEventListener('touchstart', markUser);
      window.removeEventListener('keydown', markUser);
    };
  }, [pathname]);
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPrefs>(DEFAULT_A11Y);
  const [guideY, setGuideY] = useState<number>(280);
  const [speaking, setSpeaking] = useState<'idle' | 'playing' | 'paused'>('idle');

  const [showConsent, setShowConsent] = useState(false);
  const [customizeConsent, setCustomizeConsent] = useState(false);
  const [analyticsOk, setAnalyticsOk] = useState(true);
  const [marketingOk, setMarketingOk] = useState(true);

  const panelRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLElement>(null);

  // Shared lift so the chat pill and accessibility buttons sit above the
  // cookie banner instead of covering Accept All / Preferences.
  useEffect(() => {
    const root = document.documentElement;
    if (!showConsent) {
      root.style.setProperty('--ba-banner-lift', '0px');
      return;
    }
    const el = bannerRef.current;
    if (!el) return;
    const apply = () => {
      const top = el.getBoundingClientRect().top;
      const fromBottom = Math.ceil(window.innerHeight - top + 12);
      root.style.setProperty('--ba-banner-lift', `${Math.max(0, fromBottom)}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    window.addEventListener('resize', apply);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', apply);
      root.style.setProperty('--ba-banner-lift', '0px');
    };
  }, [showConsent, customizeConsent]);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(A11Y_KEY);
      if (saved) setPrefs({ ...DEFAULT_A11Y, ...JSON.parse(saved) });
    } catch {}

    if (enableCookieConsent) {
      try {
        const existingConsent = localStorage.getItem(CONSENT_KEY) || document.cookie.includes(`${CONSENT_KEY}=`);
        const otherBanner = document.querySelector('[data-cookie-banner]:not([data-pro-cookie]), #CybotCookiebotDialog');
        if (!existingConsent && !otherBanner) {
          const t = setTimeout(() => setShowConsent(true), 600);
          return () => clearTimeout(t);
        }
      } catch {}
    }
  }, [enableCookieConsent]);

  // Apply reader-assist preferences to <html> & <video> elements
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.dataset.proScale = String(prefs.scale);
    root.classList.toggle('pro-a11y-readable', prefs.readableFont);
    root.classList.toggle('pro-a11y-contrast', prefs.highContrast);
    root.classList.toggle('pro-a11y-links', prefs.highlightLinks);
    root.classList.toggle('pro-a11y-pause', prefs.pauseMotion);

    try {
      localStorage.setItem(A11Y_KEY, JSON.stringify(prefs));
    } catch {}

    if (prefs.pauseMotion) {
      document.querySelectorAll('video').forEach((v) => {
        try { v.pause(); } catch {}
      });
    } else {
      document.querySelectorAll('video[autoplay]').forEach((v) => {
        try { (v as HTMLVideoElement).play().catch(() => {}); } catch {}
      });
    }
  }, [prefs, mounted]);

  // Reading guide pointer tracker
  useEffect(() => {
    if (!prefs.readingGuide) return;
    const onMove = (e: MouseEvent) => setGuideY(e.clientY);
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) setGuideY(e.touches[0].clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, [prefs.readingGuide]);

  // Keyboard shortcuts (Alt+A toggles Reader Assist, Escape closes)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (open && panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [open]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    if (speaking === 'playing') {
      synth.pause();
      setSpeaking('paused');
      return;
    }
    if (speaking === 'paused') {
      synth.resume();
      setSpeaking('playing');
      return;
    }
    synth.cancel();
    const container = document.querySelector('main, article, [role="main"]') || document.body;
    const blocks = Array.from(container.querySelectorAll('h1, h2, h3, p, li'))
      .filter((el) => !el.closest('[data-pro-widgets]'))
      .map((el) => (el.textContent || '').replace(/\s+/g, ' ').trim())
      .filter((t) => t.length > 2)
      .slice(0, 80);
    const text = blocks.join('. ').slice(0, 9000);
    if (!text) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.0;
    utter.onend = () => setSpeaking('idle');
    utter.onerror = () => setSpeaking('idle');
    synth.speak(utter);
    setSpeaking('playing');
  };

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking('idle');
  };

  const resetAll = () => {
    setPrefs(DEFAULT_A11Y);
    stopSpeech();
  };

  const saveConsent = (mode: 'all' | 'essential' | 'custom') => {
    const analytics = mode === 'all' ? true : mode === 'essential' ? false : analyticsOk;
    const marketing = mode === 'all' ? true : mode === 'essential' ? false : marketingOk;
    const payload = { essential: true, analytics, marketing, ts: new Date().toISOString() };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
      document.cookie = `${CONSENT_KEY}=${encodeURIComponent(mode)}; path=/; max-age=31536000; SameSite=Lax`;
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      if (typeof w.gtag === 'function') {
        w.gtag('consent', 'update', {
          analytics_storage: analytics ? 'granted' : 'denied',
          ad_storage: marketing ? 'granted' : 'denied',
          ad_user_data: marketing ? 'granted' : 'denied',
          ad_personalization: marketing ? 'granted' : 'denied',
        });
      }
      window.dispatchEvent(new CustomEvent('site:consent-updated', { detail: payload }));
    } catch {}
    setShowConsent(false);
    setCustomizeConsent(false);
  };

  if (!mounted) return null;

  const activeCount =
    (prefs.scale > 0 ? 1 : 0) +
    (prefs.readableFont ? 1 : 0) +
    (prefs.highContrast ? 1 : 0) +
    (prefs.highlightLinks ? 1 : 0) +
    (prefs.readingGuide ? 1 : 0) +
    (prefs.pauseMotion ? 1 : 0) +
    (speaking !== 'idle' ? 1 : 0);

  return (
    <div data-pro-widgets="true" style={{ ['--psw-accent' as string]: accentColor }}>
      <style>{`
        html[data-pro-scale="1"] { font-size: 112% !important; }
        html[data-pro-scale="2"] { font-size: 125% !important; }
        html.pro-a11y-readable body,
        html.pro-a11y-readable p,
        html.pro-a11y-readable li,
        html.pro-a11y-readable a,
        html.pro-a11y-readable span {
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
          letter-spacing: 0.03em !important;
          word-spacing: 0.08em !important;
          line-height: 1.72 !important;
        }
        html.pro-a11y-contrast { filter: contrast(1.22) saturate(1.08); }
        html.pro-a11y-links a[href],
        html.pro-a11y-links button:not(.psw-ui) {
          text-decoration: underline !important;
          text-decoration-thickness: 2px !important;
          text-underline-offset: 3px !important;
          outline: 2px solid var(--psw-accent, #111827) !important;
          outline-offset: 2px !important;
        }
        html.pro-a11y-pause *,
        html.pro-a11y-pause *::before,
        html.pro-a11y-pause *::after {
          animation-duration: 0.001ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.001ms !important;
          scroll-behavior: auto !important;
        }
        .psw-trigger-wrap {
          position: fixed;
          z-index: 9990;
          bottom: max(20px, var(--ba-banner-lift, 0px));
          ${position === 'left' ? 'left: 18px;' : 'right: 18px;'}
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
        }
        @media (max-width: 767px) {
          .psw-trigger-wrap { bottom: max(${mobileBottomOffset}px, var(--ba-banner-lift, 0px)); ${position === 'left' ? 'left: 12px;' : 'right: 12px;'} }
        }
        .psw-trigger {
          width: 44px;
          height: 44px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.22);
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(10px);
          color: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
          transition: transform 0.16s ease, background 0.16s ease;
          position: relative;
          padding: 0;
        }
        .psw-trigger:hover { transform: translateY(-1px); background: var(--psw-accent, #111827); }
        .psw-trigger:focus-visible { outline: 2px solid var(--psw-accent, #2563eb); outline-offset: 3px; }
        .psw-badge {
          position: absolute;
          top: -3px;
          right: -3px;
          min-width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: var(--psw-accent, #2563eb);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #0f172a;
        }
        .psw-panel {
          position: absolute;
          bottom: 54px;
          ${position === 'left' ? 'left: 0;' : 'right: 0;'}
          width: min(336px, calc(100vw - 24px));
          background: rgba(15, 23, 42, 0.97);
          backdrop-filter: blur(16px);
          color: #f8fafc;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 20px 48px rgba(0,0,0,0.38);
        }
        .psw-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 12px;
        }
        .psw-tile {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #e2e8f0;
          border-radius: 10px;
          padding: 10px;
          font-size: 12.5px;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-height: 54px;
          justify-content: space-between;
        }
        .psw-tile[aria-pressed="true"] {
          background: var(--psw-accent, #2563eb);
          border-color: rgba(255,255,255,0.35);
          color: #ffffff;
        }
        .psw-cookie {
          position: fixed;
          z-index: 9989;
          bottom: 16px;
          right: 16px;
          left: auto;
          max-width: 440px;
          width: calc(100vw - 32px);
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(16px);
          color: #f1f5f9;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 14px;
          padding: 14px 16px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.3);
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
          font-size: 13px;
          line-height: 1.45;
        }
        @media (max-width: 767px) {
          .psw-cookie {
            left: 12px;
            right: 12px;
            width: auto;
            max-width: none;
            bottom: ${mobileBottomOffset}px;
          }
        }
        .psw-btn-primary {
          background: var(--psw-accent, #2563eb);
          color: #ffffff;
          border: none;
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          min-height: 36px;
        }
        .psw-btn-ghost {
          background: rgba(255,255,255,0.08);
          color: #e2e8f0;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 12.5px;
          font-weight: 500;
          cursor: pointer;
          min-height: 36px;
        }
      `}</style>

      {prefs.readingGuide && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            top: Math.max(0, guideY - 18),
            height: 36,
            borderTop: `2px solid ${accentColor}`,
            borderBottom: `2px solid ${accentColor}`,
            background: 'rgba(250, 204, 21, 0.10)',
            pointerEvents: 'none',
            zIndex: 9988,
          }}
        />
      )}

      <div ref={panelRef} className="psw-trigger-wrap">
        {open && (
          <div className="psw-panel" role="dialog" aria-label="Reader Assist and Accessibility Tools">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em' }}>Reader Assist</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>Reading &amp; display preferences (Alt+A)</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {activeCount > 0 && (
                  <button type="button" className="psw-ui psw-btn-ghost" style={{ padding: '4px 8px', minHeight: 28, fontSize: 11 }} onClick={resetAll}>
                    Reset
                  </button>
                )}
                <button
                  type="button"
                  className="psw-ui psw-btn-ghost"
                  style={{ padding: '4px 8px', minHeight: 28, fontSize: 12 }}
                  aria-label="Close Reader Assist"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Read Aloud bar */}
            <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
              <button
                type="button"
                className="psw-ui psw-btn-primary"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                onClick={toggleSpeech}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
                {speaking === 'playing' ? 'Pause Reading' : speaking === 'paused' ? 'Resume Reading' : 'Read Page Aloud'}
              </button>
              {speaking !== 'idle' && (
                <button type="button" className="psw-ui psw-btn-ghost" onClick={stopSpeech} aria-label="Stop Reading">
                  Stop
                </button>
              )}
            </div>

            <div className="psw-grid">
              <button
                type="button"
                className="psw-ui psw-tile"
                aria-pressed={prefs.scale > 0}
                onClick={() => setPrefs((p) => ({ ...p, scale: ((p.scale + 1) % 3) as 0 | 1 | 2 }))}
              >
                <span style={{ fontSize: 11, opacity: 0.8 }}>{prefs.scale === 0 ? '100%' : prefs.scale === 1 ? '112%' : '125%'}</span>
                <span>Text Size</span>
              </button>

              <button
                type="button"
                className="psw-ui psw-tile"
                aria-pressed={prefs.readableFont}
                onClick={() => setPrefs((p) => ({ ...p, readableFont: !p.readableFont }))}
              >
                <span style={{ fontSize: 11, opacity: 0.8 }}>Aa</span>
                <span>Readable Font</span>
              </button>

              <button
                type="button"
                className="psw-ui psw-tile"
                aria-pressed={prefs.highContrast}
                onClick={() => setPrefs((p) => ({ ...p, highContrast: !p.highContrast }))}
              >
                <span style={{ fontSize: 11, opacity: 0.8 }}>AAA</span>
                <span>High Contrast</span>
              </button>

              <button
                type="button"
                className="psw-ui psw-tile"
                aria-pressed={prefs.highlightLinks}
                onClick={() => setPrefs((p) => ({ ...p, highlightLinks: !p.highlightLinks }))}
              >
                <span style={{ fontSize: 11, opacity: 0.8 }}>Links</span>
                <span>Highlight Links</span>
              </button>

              <button
                type="button"
                className="psw-ui psw-tile"
                aria-pressed={prefs.readingGuide}
                onClick={() => setPrefs((p) => ({ ...p, readingGuide: !p.readingGuide }))}
              >
                <span style={{ fontSize: 11, opacity: 0.8 }}>Line</span>
                <span>Reading Guide</span>
              </button>

              <button
                type="button"
                className="psw-ui psw-tile"
                aria-pressed={prefs.pauseMotion}
                onClick={() => setPrefs((p) => ({ ...p, pauseMotion: !p.pauseMotion }))}
              >
                <span style={{ fontSize: 11, opacity: 0.8 }}>Still</span>
                <span>Pause Motion</span>
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          className="psw-ui psw-trigger"
          aria-label="Open Reader Assist and Accessibility Options"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          title="Reader Assist (Alt+A)"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="5" r="2" />
            <path d="M5 9h14" />
            <path d="M12 9v5" />
            <path d="M9 20l3-6 3 6" />
          </svg>
          {activeCount > 0 && <span className="psw-badge">{activeCount}</span>}
        </button>
      </div>

      {showConsent && (
        <aside ref={bannerRef} className="psw-cookie" data-cookie-banner="true" data-pro-cookie="true" role="region" aria-label="Cookie Preferences">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ color: '#cbd5e1' }}>
              <strong style={{ color: '#ffffff', fontWeight: 600 }}>Cookie Preferences.</strong>{' '}
              We use essential cookies to keep this site fast and reliable, plus optional analytics to improve your experience.{' '}
              <a href={privacyHref} style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                Privacy Policy
              </a>
            </div>

            {customizeConsent && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', fontSize: 12 }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, opacity: 0.75 }}>
                  <input type="checkbox" checked disabled /> Essential
                </label>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                  <input type="checkbox" checked={analyticsOk} onChange={(e) => setAnalyticsOk(e.target.checked)} /> Analytics
                </label>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                  <input type="checkbox" checked={marketingOk} onChange={(e) => setMarketingOk(e.target.checked)} /> Performance &amp; Ads
                </label>
              </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
              <button type="button" className="psw-ui psw-btn-primary" onClick={() => saveConsent('all')}>
                Accept All
              </button>
              <button type="button" className="psw-ui psw-btn-ghost" onClick={() => saveConsent('essential')}>
                Essential Only
              </button>
              {customizeConsent ? (
                <button type="button" className="psw-ui psw-btn-ghost" onClick={() => saveConsent('custom')}>
                  Save Choices
                </button>
              ) : (
                <button
                  type="button"
                  className="psw-ui psw-btn-ghost"
                  style={{ marginLeft: 'auto', border: 'none', background: 'transparent', color: '#94a3b8', padding: '6px 8px' }}
                  onClick={() => setCustomizeConsent(true)}
                >
                  Preferences
                </button>
              )}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
