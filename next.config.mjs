/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'api.feeldb.com',
      },
      {
        protocol: 'http',
        hostname: 'api.feeldb.com',
      },
      {
        protocol: 'https',
        hostname: 'api.feedlb.com',
      },
    ],
  },
};

export default nextConfig;
