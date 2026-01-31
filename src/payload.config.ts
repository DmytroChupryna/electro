import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import path from 'path';
import { fileURLToPath } from 'url';

// Collections
import { Users, Media, Projects, Services, Reviews, Vacancies } from './payload/collections';

// Globals
import { Settings } from './payload/globals';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Payload CMS Configuration
 * Techno Groop - Admin Panel
 */
export default buildConfig({
  // Admin panel settings
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' | Techno Groop Admin',
      // favicon: '/favicon.ico',
      // ogImage: '/og-image.png',
    },
  },

  // Collections (database tables)
  collections: [
    Users,
    Media,
    Projects,
    Services,
    Reviews,
    Vacancies,
  ],

  // Global settings (singletons)
  globals: [
    Settings,
  ],

  // Rich text editor
  editor: lexicalEditor({}),

  // Secret for encrypting tokens
  secret: process.env.PAYLOAD_SECRET || 'CHANGE_ME_IN_PRODUCTION',

  // TypeScript output path
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // Database adapter (PostgreSQL for Vercel)
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

  // Localization config
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

  // File upload & storage
  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
  },

  // Vercel Blob storage for media
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],

  // GraphQL settings (optional, disable if not needed)
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },

  // Serverless-friendly settings
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  // CORS for API access
  cors: [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ],

  // CSRF protection
  csrf: [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ],
});
