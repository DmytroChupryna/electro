import type { CollectionConfig } from 'payload';

/**
 * Services Collection
 * Company services offered by Techno Groop
 */
export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'updatedAt'],
    description: 'Services offered by the company',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Service name',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'Service description',
      },
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'Residential (Home)', value: 'home' },
        { label: 'Industrial (Factory)', value: 'factory' },
        { label: 'Low Current (Server)', value: 'server' },
        { label: 'Automation (Settings)', value: 'settings' },
        { label: 'Solar (Sun)', value: 'sun' },
      ],
      admin: {
        description: 'Icon to display for this service',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional service image',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      min: 1,
      max: 100,
      defaultValue: 10,
      admin: {
        description: 'Display order (lower = first)',
        position: 'sidebar',
      },
    },
  ],
};
