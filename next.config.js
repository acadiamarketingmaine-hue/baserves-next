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
        // FareHarbor's post-stay emails still point at the survey URL from the
        // old site. Those messages are already in guests' inboxes and can't be
        // recalled, so send them to the feedback form instead of the catch-all
        // "Location Not Found" page. Every FareHarbor booking is a campground
        // stay, so the form opens on that category.
        source: '/customer-comment-survey',
        destination: '/leave-a-review?type=campground',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
