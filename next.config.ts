import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['sanity', '@sanity/ui', '@sanity/vision', 'next-sanity'],
};

export default nextConfig;
