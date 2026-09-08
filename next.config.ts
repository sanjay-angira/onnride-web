import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.amazonaws.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/locations',
        destination: '/bike-rental',
        permanent: true,
      },
      {
        source: '/locations/:path*',
        destination: '/bike-rental/:path*',
        permanent: true,
      },
      // Common city spelling aliases → canonical slugs
      {
        source: '/bike-rental/bangalore',
        destination: '/bike-rental/bengaluru',
        permanent: true,
      },
      {
        source: '/bike-rental/bangalore/:path*',
        destination: '/bike-rental/bengaluru/:path*',
        permanent: true,
      },
      {
        source: '/car-rental/bangalore',
        destination: '/car-rental/bengaluru',
        permanent: true,
      },
      {
        source: '/car-rental/bangalore/:path*',
        destination: '/car-rental/bengaluru/:path*',
        permanent: true,
      },
      {
        source: '/bike-rental/bombay',
        destination: '/bike-rental/mumbai',
        permanent: true,
      },
      {
        source: '/bike-rental/madras',
        destination: '/bike-rental/chennai',
        permanent: true,
      },
      {
        source: '/bike-rental/calcutta',
        destination: '/bike-rental/kolkata',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
