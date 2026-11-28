/**
 * Hosts a photograph published through the website editor may be served from.
 *
 * The same `CONTENT_IMAGE_HOSTS` list that src/content/overrides.ts checks an
 * override's `src` against. Two lists that have to agree should be one list:
 * a host the validator accepts but the image optimiser will not load is a
 * broken picture on a live page, and a host the optimiser will load but the
 * validator rejects is dead configuration.
 *
 * Empty by default — with nothing configured, no image override is accepted
 * and nothing is added here.
 */
const contentImageHosts = (process.env.CONTENT_IMAGE_HOSTS || '')
  .split(',')
  .map((host) => host.trim().toLowerCase())
  .filter(Boolean)
  .map((hostname) => ({ protocol: 'https', hostname, port: '', pathname: '/**' }))

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  deploymentId: process.env.NEXT_DEPLOYMENT_ID || 'dev',
  images: {
    // Pictures are served and resized by Cloudflare Images; see cloudflare-image-loader.js.
    // Source photos are at most 2048px wide; never advertise a candidate larger than that.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    loader: 'custom',
    loaderFile: './cloudflare-image-loader.js',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'baserves.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
      ...contentImageHosts,
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // Keep the *.vercel.app preview/production alias out of the index.
        source: '/:path*',
        has: [{ type: 'host', value: '(.*)\\.(vercel\\.app|fly\\.dev)' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ]
  },
  async redirects() {
    return [
      {
        // Canonical host is the apex; 308 www -> apex (also set at the Vercel domain layer).
        source: '/:path*',
        has: [{ type: 'host', value: 'www.baserves.com' }],
        destination: 'https://baserves.com/:path*',
        permanent: true,
      },
      {
        // FareHarbor post-stay emails still point at the old survey path.
        // Query params (item, booking, start-at) pass through; leave-a-review
        // maps `item` to the park they stayed at.
        source: '/customer-comment-survey',
        destination: '/leave-a-review?type=campground',
        permanent: false,
      },
      {
        // Short park URLs guests and old links use; the real pages live elsewhere.
        source: '/meramec-state-park',
        destination: '/experiences/meramec-state-park',
        permanent: true,
      },
      {
        source: '/:old(canal-bridge|canal-bridge-campground)',
        destination: '/experiences/canal-bridge',
        permanent: true,
      },
      {
        source: '/experiences/washington-state-park',
        destination: '/washington-state-park',
        permanent: true,
      },
      {
        // The two wedding-page drafts Elle reviewed; /noindex1 became the live page.
        source: '/:draft(noindex1|noindex2)',
        destination: '/long-lake-outdoor-center/weddings',
        permanent: true,
      },
      {
        // High-intent plural/short category aliases guests and searchers type directly.
        source: '/:alias(campgrounds|campground|camping|cabins)',
        destination: '/experiences/categories/campground-rentals',
        permanent: true,
      },
      {
        source: '/parks',
        destination: '/experiences',
        permanent: true,
      },
      {
        source: '/:alias(kayaks|watercraft)',
        destination: '/experiences/categories/kayak-and-watercraft-rentals',
        permanent: true,
      },
      {
        source: '/:alias(hiking|trails)',
        destination: '/experiences/categories/hiking',
        permanent: true,
      },
      {
        source: '/scenic-drives',
        destination: '/experiences/categories/scenic-drives',
        permanent: true,
      },
      {
        source: '/pavilions',
        destination: '/experiences/categories/lookout-pavillions',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
