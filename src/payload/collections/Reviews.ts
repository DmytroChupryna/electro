import type { CollectionConfig } from 'payload';

/**
 * Reviews Collection
 * Client testimonials and reviews
 */
export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'company', 'rating', 'updatedAt'],
    description: 'Client reviews and testimonials',
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the reviewer',
      },
    },
    {
      name: 'company',
      type: 'text',
      required: true,
      admin: {
        description: 'Company name',
      },
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        description: 'Job title (e.g., "Project Manager")',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'Review text',
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: {
        description: 'Rating (1-5 stars)',
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show on homepage',
        position: 'sidebar',
      },
    },
  ],
};
