import type { CollectionConfig } from 'payload';

/**
 * Vacancies Collection
 * Job openings at Techno Groop
 */
export const Vacancies: CollectionConfig = {
  slug: 'vacancies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'active', 'updatedAt'],
    description: 'Job vacancies and career opportunities',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Job title',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true,
      admin: {
        description: 'Full job description',
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      admin: {
        description: 'Job location (e.g., "Warsaw / Belgium")',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
      ],
      defaultValue: 'full-time',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'department',
      type: 'select',
      options: [
        { label: 'Electrical', value: 'electrical' },
        { label: 'Plumbing', value: 'plumbing' },
        { label: 'Automation', value: 'automation' },
        { label: 'Management', value: 'management' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Is this position currently open?',
        position: 'sidebar',
      },
    },
  ],
};
