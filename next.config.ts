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
  eslint: {
    // 👇 Ignora errores de ESLint durante el build en producción
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
