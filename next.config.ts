import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
 
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
