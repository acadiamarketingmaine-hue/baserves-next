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
  async redirects() {
    return [
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
