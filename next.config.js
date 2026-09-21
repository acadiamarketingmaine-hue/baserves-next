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
  images: {
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
        // Keep the *.vercel.app preview/production alias out of the index.
        source: '/:path*',
        has: [{ type: 'host', value: '(.*)\\.vercel\\.app' }],
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
    ]
  },
}

module.exports = nextConfig
