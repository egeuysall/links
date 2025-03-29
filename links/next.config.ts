import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  typescript: {
    ignoreBuildErrors: process.env.CI === "true",
  },
};

export default nextConfig;