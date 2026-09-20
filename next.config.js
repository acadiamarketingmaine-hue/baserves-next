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
