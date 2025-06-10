/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'm.media-amazon.com',
            hostname: 'image.tmdb.org',
          },
        ],
      },
};

export default nextConfig;

