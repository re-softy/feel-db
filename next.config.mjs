/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 3600,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
    loader: 'default',
    path: '/_next/image',
  },
  experimental: {
    optimizePackageImports: ['swiper']
  }
};

export default nextConfig;
