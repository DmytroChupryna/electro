import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Payload CMS Configuration
 * With localization support (EN + PL)
 */
export default buildConfig({
  // Admin panel
  admin: {
    user: 'users',
    meta: {
      titleSuffix: ' | Techno Groop Admin',
    },
  },

  // Localization - English and Polish
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Polski',
        code: 'pl',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },

  // Collections
  collections: [
    // Users for auth
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    // Media collection for file uploads (stored in Vercel Blob)
    {
      slug: 'media',
      labels: {
        singular: 'Media',
        plural: 'Media',
      },
      access: {
        read: () => true, // Public read access
        create: ({ req }) => !!req.user, // Only authenticated users can create
        update: ({ req }) => !!req.user,
        delete: ({ req }) => !!req.user,
      },
      upload: {
        mimeTypes: ['image/*'],
        staticDir: 'media',
      },
      admin: {
        description: 'Upload images for projects, services, etc.',
      },
      fields: [
        {
          name: 'alt',
          label: 'Alt Text',
          type: 'text',
          localized: true,
          admin: {
            description: 'Description for accessibility and SEO',
          },
        },
      ],
    },
    // Services collection - "Nasze usługi" section
    {
      slug: 'services',
      labels: {
        singular: 'Service',
        plural: 'Services',
      },
      access: {
        read: () => true, // Public read access for frontend
        create: ({ req }) => !!req.user,
        update: ({ req }) => !!req.user,
        delete: ({ req }) => !!req.user,
      },
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'icon', 'order'],
        description: 'Manage services displayed on the website (Nasze usługi)',
      },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          localized: true, // EN + PL
          admin: {
            description: 'Service name (e.g., "Residential Electrical", "Elektryka mieszkaniowa")',
          },
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
          localized: true, // EN + PL
          admin: {
            description: 'Brief description of the service',
          },
        },
        {
          name: 'icon',
          label: 'Icon',
          type: 'select',
          required: true,
          defaultValue: 'home',
          options: [
            { label: '🏠 Home (Residential)', value: 'home' },
            { label: '🏭 Factory (Industrial)', value: 'factory' },
            { label: '🖥️ Server (Low Current)', value: 'server' },
            { label: '⚙️ Settings (Automation)', value: 'settings' },
            { label: '☀️ Sun (Solar)', value: 'sun' },
          ],
          admin: {
            description: 'Icon displayed next to the service',
          },
        },
        {
          name: 'image',
          label: 'Background Image',
          type: 'text', // URL for now, can switch to upload later
          admin: {
            description: 'URL to background image (Unsplash/Pexels)',
          },
        },
        {
          name: 'sortOrder',
          label: 'Display Order',
          type: 'number',
          required: true,
          defaultValue: 0,
          admin: {
            description: 'Order in which service appears (lower = first)',
          },
        },
        {
          name: 'isActive',
          label: 'Active',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show this service on the website',
          },
        },
      ],
    },
    // Projects collection - "Nasze realizacje" section
    {
      slug: 'projects',
      labels: {
        singular: 'Project',
        plural: 'Projects',
      },
      access: {
        read: () => true, // Public read access for frontend
        create: ({ req }) => !!req.user,
        update: ({ req }) => !!req.user,
        delete: ({ req }) => !!req.user,
      },
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'country', 'year', 'featured'],
        description: 'Manage portfolio projects (Nasze realizacje)',
      },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Project name (e.g., "Logistics Center", "Centrum logistyczne")',
          },
        },
        {
          name: 'slug',
          label: 'URL Slug',
          type: 'text',
          required: true,
          unique: true,
          index: true,
          admin: {
            description: 'SEO-friendly URL slug (e.g., "logistics-center-antwerp")',
          },
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
          localized: true,
          admin: {
            description: 'Brief project description',
          },
        },
        {
          name: 'location',
          label: 'Location',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Project location (e.g., "Antwerp, Belgium", "Antwerpia, Belgia")',
          },
        },
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          options: [
            { label: '🏭 Industrial', value: 'industrial' },
            { label: '🏢 Commercial', value: 'commercial' },
            { label: '🏠 Residential', value: 'residential' },
          ],
          admin: {
            description: 'Project category for filtering',
          },
        },
        {
          name: 'country',
          label: 'Country',
          type: 'select',
          required: true,
          options: [
            { label: '🇵🇱 Poland', value: 'PL' },
            { label: '🇧🇪 Belgium', value: 'BE' },
          ],
          admin: {
            description: 'Country where project was completed',
          },
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          required: true,
          admin: {
            description: 'Year of completion (e.g., "2024")',
          },
        },
        {
          name: 'image',
          label: 'Main Image URL',
          type: 'text',
          required: true,
          admin: {
            description: 'URL to main project image (e.g., /projects/project-name/image.jpg)',
          },
        },
        {
          name: 'gallery',
          label: 'Gallery URLs',
          type: 'array',
          admin: {
            description: 'Additional project image URLs (optional)',
          },
          fields: [
            {
              name: 'url',
              label: 'Image URL',
              type: 'text',
              required: true,
            },
            {
              name: 'caption',
              label: 'Caption',
              type: 'text',
              localized: true,
              admin: {
                description: 'Optional image caption',
              },
            },
          ],
        },
        {
          name: 'featured',
          label: 'Featured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show on homepage highlights',
          },
        },
        {
          name: 'sortOrder',
          label: 'Display Order',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Order in portfolio (lower = first)',
          },
        },
      ],
    },
  ],

  // Global settings with localized Title field
  globals: [
    {
      slug: 'settings',
      label: 'Site Settings',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true, // Enable localization for this field
          defaultValue: 'Techno Groop',
          admin: {
            description: 'The main title of the website (supports multiple languages)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true, // Enable localization
          admin: {
            description: 'Site description for SEO',
          },
        },
      ],
    },
  ],

  // Rich text editor
  editor: lexicalEditor({}),

  // Secret
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',

  // TypeScript
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // Database - PostgreSQL (Neon)
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: true, // Auto-sync schema in development
  }),

  // Plugins - Vercel Blob for media storage
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],

  // Server URL - must match the deployment URL exactly
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  // CORS settings for production
  cors: [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    'https://electro-a453.vercel.app',
  ].filter(Boolean),

  // CSRF protection
  csrf: [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    'https://electro-a453.vercel.app',
  ].filter(Boolean),
});
