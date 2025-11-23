import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dinnerdeal.backendless.com',
      },
      {
        protocol: 'https',
        hostname: 'demo.eccdn.com.au',
      },
    ],
  },
};

export default nextConfig;
