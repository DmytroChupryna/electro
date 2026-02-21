import type { CollectionConfig } from 'payload';

/**
 * Projects Collection
 * Portfolio projects for Techno Groop
 */
export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'country', 'featured', 'updatedAt'],
    description: 'Portfolio projects and case studies',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Project title',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-friendly slug (e.g., "smart-building-automation")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'Project description',
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      admin: {
        description: 'City or region (e.g., "Antwerp", "Warsaw")',
      },
    },
    {
      name: 'country',
      type: 'select',
      required: true,
      options: [
        { label: 'Poland', value: 'PL' },
        { label: 'Belgium', value: 'BE' },
      ],
      admin: {
        description: 'Country where project was completed',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Industrial', value: 'industrial' },
        { label: 'Commercial', value: 'commercial' },
        { label: 'Residential', value: 'residential' },
      ],
      defaultValue: 'commercial',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Project Gallery',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      admin: {
        description: 'Upload project images (1-10)',
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
    {
      name: 'year',
      type: 'number',
      required: true,
      min: 2020,
      max: 2030,
      admin: {
        description: 'Year of completion',
        position: 'sidebar',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      required: false,
      defaultValue: 0,
      admin: {
        description: 'Display order (lower = first)',
        position: 'sidebar',
      },
    },
  ],
};
