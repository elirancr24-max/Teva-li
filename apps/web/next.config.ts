import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  // sharp ships native binaries — keep it external so Next doesn't try to
  // bundle it into server components.
  serverExternalPackages: ['sharp'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'iyjxsdxebxmbrrquxbnw.supabase.co' },
      { protocol: 'https', hostname: 'images-il-cdn.rexail.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js', '@stripe/stripe-js'],
  },
};

export default config;
