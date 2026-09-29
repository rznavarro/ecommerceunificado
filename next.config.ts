import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
    localPatterns: [{ pathname: '/images/**', search: '' }],
  },
  // Fase 5: redirecciones 301 desde las URLs de Shopify.
};

export default nextConfig;
