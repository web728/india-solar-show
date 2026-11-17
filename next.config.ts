
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    formats: ["image/webp", "image/avif"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "iievshow.com",
      },
    ],
  },

  trailingSlash: false,
};

export default nextConfig;
