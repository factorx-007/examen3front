import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/products',
        destination: 'https://examen3awa.onrender.com/api/products',
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
