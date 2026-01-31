import type { CollectionConfig } from 'payload';

/**
 * Users Collection
 * Admin users for CMS authentication
 */
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    description: 'Admin users who can access the CMS',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
      ],
      defaultValue: 'admin',
      required: true,
    },
  ],
};
