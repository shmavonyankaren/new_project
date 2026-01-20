import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "test-api.updivision.work"
      },
      {
        protocol: "https",
        hostname: "picsum.photos"
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/api/:path*',
      },
    ];
  },
  allowedDevOrigins: ["http://localhost:4000/api/:path*"],
  // crossOrigin: "anonymous"
};

export default nextConfig;