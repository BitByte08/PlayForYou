import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['img.youtube.com','i.ytimg.com'],
  },
};
export default nextConfig;
