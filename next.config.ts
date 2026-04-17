import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['sanity', '@sanity/ui', '@sanity/vision', 'next-sanity'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
