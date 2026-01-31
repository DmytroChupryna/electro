import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Enable experimental features for Payload
  experimental: {
    reactCompiler: false,
  },

  // Image domains for external images (Unsplash, etc.)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },

  // Webpack configuration for SCSS in Payload admin
  webpack: (config) => {
    return config;
  },
};

// Wrap with both next-intl and Payload
export default withPayload(withNextIntl(nextConfig));
