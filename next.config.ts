import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev-only: allow LAN origin so /_next/hmr is not blocked (blocked HMR full-reloads the page).
  allowedDevOrigins: ["192.168.31.69"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
