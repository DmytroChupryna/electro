import type { CollectionConfig } from 'payload';

/**
 * Media Collection
 * Handles image uploads via Vercel Blob
 */
export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    // Vercel Blob storage is configured in payload.config.ts
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 576,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
  },
  admin: {
    description: 'Upload images for projects, services, and other content',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Alternative text for accessibility',
      },
    },
  ],
};
