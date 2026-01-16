import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'BA Serves - Recreation Area Management & Outdoor Experiences'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f2d1a 0%, #1a472a 30%, #2d5a3c 70%, #3d6b4c 100%)',
          position: 'relative',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            zIndex: 10,
          }}
        >
          {/* Logo/Icon - Tree */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100px',
              height: '100px',
              marginBottom: '30px',
            }}
          >
            <svg width="80" height="80" viewBox="0 0 100 100">
              <circle cx="50" cy="70" r="20" fill="#3d6b4c" />
              <ellipse cx="50" cy="50" rx="30" ry="22" fill="#2d5a3c" />
              <ellipse cx="50" cy="35" rx="22" ry="16" fill="#3d6b4c" />
              <ellipse cx="50" cy="22" rx="14" ry="10" fill="#4a7c59" />
              <rect x="47" y="70" width="6" height="18" fill="#8B4513" />
            </svg>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: 800,
              color: 'white',
              textAlign: 'center',
              marginBottom: '16px',
              letterSpacing: '-1px',
            }}
          >
            BAServes.com
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '28px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'center',
              maxWidth: '800px',
              marginBottom: '40px',
            }}
          >
            Find Your Adventure
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '20px',
              color: 'rgba(255,255,255,0.7)',
              textAlign: 'center',
              maxWidth: '700px',
              lineHeight: 1.5,
            }}
          >
            Recreation Area Management & Outdoor Experiences across America
          </div>

          {/* Stats bar */}
          <div
            style={{
              display: 'flex',
              gap: '50px',
              marginTop: '40px',
              padding: '20px 40px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '32px', fontWeight: 700, color: 'white' }}>15+</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px' }}>Recreation Areas</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '32px', fontWeight: 700, color: 'white' }}>500+</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px' }}>Campsites</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '32px', fontWeight: 700, color: 'white' }}>100+</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px' }}>Miles of Trails</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
