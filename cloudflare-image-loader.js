'use client'

// Every picture in public/ is hosted on Cloudflare Images under "baserves/<path>",
// so Cloudflare resizes and caches it at its edge and the Fly machine never does.
const DELIVERY = 'https://imagedelivery.net/guGnKFPGmNyl83A0zoJbdQ/baserves'

export default function cloudflareImageLoader({ src, width, quality }) {
    // Inline data, blobs, SVGs and AVIFs are not on Cloudflare Images: send them untouched.
    if (src.startsWith('data:') || src.startsWith('blob:') || /\.(svg|avif)($|\?)/i.test(src)) return src

    // Pictures on another host stay on that host. Sanity's CDN resizes its own.
    if (/^https?:\/\//i.test(src)) {
        if (src.includes('cdn.sanity.io')) {
            return `${src}${src.includes('?') ? '&' : '?'}w=${width}&q=${quality || 75}&auto=format&fit=max`
        }
        return src
    }

    // Build-time imports (/_next/static/...) are not in public/, so they are not uploaded.
    if (src.startsWith('/_next/')) return src

    // `next dev` reads straight from public/.
    if (process.env.NODE_ENV === 'development') return `${src}?w=${width}`

    // Flexible variant: Cloudflare picks AVIF/WebP per browser and never enlarges.
    const path = src.split('?')[0].replace(/^\//, '')
    return `${DELIVERY}/${path}/w=${width},q=${quality || 75},fit=scale-down`
}
