import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles SSR/SSG natively, no need for static export
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
