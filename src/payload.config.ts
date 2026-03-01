import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { ru } from '@payloadcms/translations/languages/ru';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL 
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

/**
 * Payload CMS Configuration
 * With localization support (EN + PL)
 */
export default buildConfig({
  // Admin panel in Russian
  admin: {
    user: 'users',
    meta: {
      titleSuffix: ' | Techno Groop Admin',
    },
  },

  // Admin UI language - Russian
  i18n: {
    fallbackLanguage: 'ru',
    supportedLanguages: { ru },
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
        singular: 'Медіа',
        plural: 'Медіа',
      },
      access: {
        read: () => true, // Public read access
        create: ({ req }) => !!req.user, // Only authenticated users can create
        update: ({ req }) => !!req.user,
        delete: ({ req }) => !!req.user,
      },
      upload: {
        mimeTypes: ['image/*'],
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
        singular: 'Послуга',
        plural: 'Послуги',
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
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Upload background image for this service',
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
        singular: 'Проект',
        plural: 'Проекти',
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
          label: 'Main Image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            description: 'Upload main project image',
          },
        },
        {
          name: 'gallery',
          label: 'Gallery Images',
          type: 'array',
          admin: {
            description: 'Additional project images (optional)',
          },
          fields: [
            {
              name: 'image',
              label: 'Image',
              type: 'upload',
              relationTo: 'media',
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
    // Reviews collection - "Opinie klientów" section
    {
      slug: 'reviews',
      labels: {
        singular: 'Відгук',
        plural: 'Відгуки',
      },
      access: {
        read: () => true,
        create: ({ req }) => !!req.user,
        update: ({ req }) => !!req.user,
        delete: ({ req }) => !!req.user,
      },
      admin: {
        useAsTitle: 'author',
        defaultColumns: ['author', 'company', 'rating', 'isActive'],
        description: 'Manage client reviews (Opinie klientów)',
      },
      fields: [
        {
          name: 'text',
          label: 'Review Text',
          type: 'textarea',
          required: true,
          localized: true,
          admin: {
            description: 'The review content',
          },
        },
        {
          name: 'author',
          label: 'Author Name',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the person who wrote the review',
          },
        },
        {
          name: 'role',
          label: 'Author Role',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Job title or role (e.g., "Operations Director")',
          },
        },
        {
          name: 'company',
          label: 'Company Name',
          type: 'text',
          required: true,
          admin: {
            description: 'Company or organization name',
          },
        },
        {
          name: 'rating',
          label: 'Rating',
          type: 'number',
          required: true,
          defaultValue: 5,
          min: 1,
          max: 5,
          admin: {
            description: 'Rating from 1 to 5 stars',
          },
        },
        {
          name: 'sortOrder',
          label: 'Display Order',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Order in which review appears (lower = first)',
          },
        },
        {
          name: 'isActive',
          label: 'Active',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show this review on the website',
          },
        },
      ],
    },
  ],

  // Global settings with localized Title field
  globals: [
    {
      slug: 'settings',
      label: 'Налаштування сайту',
      fields: [
        // General Info
        {
          type: 'tabs',
          tabs: [
            {
              label: 'Загальне',
              fields: [
                {
                  name: 'title',
                  label: 'Назва сайту',
                  type: 'text',
                  required: true,
                  localized: true,
                  defaultValue: 'Techno Groop',
                  admin: {
                    description: 'Головна назва сайту (підтримує багато мов)',
                  },
                },
                {
                  name: 'description',
                  label: 'Опис сайту',
                  type: 'textarea',
                  localized: true,
                  admin: {
                    description: 'Опис для SEO',
                  },
                },
                {
                  name: 'tagline',
                  label: 'Слоган',
                  type: 'text',
                  localized: true,
                  admin: {
                    description: 'Короткий слоган компанії',
                  },
                },
              ],
            },
            {
              label: 'Контакти',
              fields: [
                {
                  name: 'contactEmail',
                  label: 'Email для контактів',
                  type: 'email',
                  required: true,
                  defaultValue: 'info@technogroop.com',
                },
                {
                  name: 'salesEmail',
                  label: 'Email для замовлень',
                  type: 'email',
                },
                {
                  name: 'phonePL',
                  label: 'Телефон (Польща)',
                  type: 'text',
                  admin: {
                    description: 'Формат: +48 XXX XXX XXX',
                  },
                },
                {
                  name: 'phoneBE',
                  label: 'Телефон (Бельгія)',
                  type: 'text',
                  admin: {
                    description: 'Формат: +32 XXX XX XX XX',
                  },
                },
                {
                  name: 'whatsapp',
                  label: 'WhatsApp',
                  type: 'text',
                  admin: {
                    description: 'Номер для WhatsApp (з кодом країни)',
                  },
                },
              ],
            },
            {
              label: 'Адреси',
              fields: [
                {
                  name: 'addressPL',
                  label: 'Адреса офісу (Польща)',
                  type: 'group',
                  fields: [
                    { name: 'street', label: 'Вулиця', type: 'text' },
                    { name: 'city', label: 'Місто', type: 'text' },
                    { name: 'postalCode', label: 'Поштовий індекс', type: 'text' },
                    { name: 'country', label: 'Країна', type: 'text', defaultValue: 'Polska' },
                  ],
                },
                {
                  name: 'addressBE',
                  label: 'Адреса офісу (Бельгія)',
                  type: 'group',
                  fields: [
                    { name: 'street', label: 'Вулиця', type: 'text' },
                    { name: 'city', label: 'Місто', type: 'text' },
                    { name: 'postalCode', label: 'Поштовий індекс', type: 'text' },
                    { name: 'country', label: 'Країна', type: 'text', defaultValue: 'België' },
                  ],
                },
              ],
            },
            {
              label: 'Соцмережі',
              fields: [
                {
                  name: 'socialLinks',
                  label: 'Посилання на соцмережі',
                  type: 'group',
                  fields: [
                    { name: 'facebook', label: 'Facebook', type: 'text' },
                    { name: 'linkedin', label: 'LinkedIn', type: 'text' },
                    { name: 'instagram', label: 'Instagram', type: 'text' },
                    { name: 'youtube', label: 'YouTube', type: 'text' },
                  ],
                },
              ],
            },
            {
              label: 'Реквізити',
              fields: [
                {
                  name: 'companyPL',
                  label: 'Компанія (Польща)',
                  type: 'group',
                  fields: [
                    { name: 'name', label: 'Назва компанії', type: 'text' },
                    { name: 'nip', label: 'NIP', type: 'text' },
                    { name: 'regon', label: 'REGON', type: 'text' },
                    { name: 'krs', label: 'KRS', type: 'text' },
                  ],
                },
                {
                  name: 'companyBE',
                  label: 'Компанія (Бельгія)',
                  type: 'group',
                  fields: [
                    { name: 'name', label: 'Назва компанії', type: 'text' },
                    { name: 'vat', label: 'VAT / BTW', type: 'text' },
                    { name: 'companyNumber', label: 'Номер підприємства', type: 'text' },
                  ],
                },
              ],
            },
            {
              label: 'Години роботи',
              fields: [
                {
                  name: 'workingHours',
                  label: 'Робочі години',
                  type: 'group',
                  fields: [
                    { 
                      name: 'weekdays', 
                      label: 'Пн-Пт', 
                      type: 'text',
                      localized: true,
                      admin: {
                        description: 'Наприклад: "08:00 - 18:00" або "8:00 AM - 6:00 PM"',
                      },
                    },
                    { 
                      name: 'saturday', 
                      label: 'Субота', 
                      type: 'text',
                      localized: true,
                      admin: {
                        description: 'Наприклад: "Zamknięte" / "Closed"',
                      },
                    },
                    { 
                      name: 'sunday', 
                      label: 'Неділя', 
                      type: 'text',
                      localized: true,
                      admin: {
                        description: 'Наприклад: "Zamknięte" / "Closed"',
                      },
                    },
                    {
                      name: 'note',
                      label: 'Примітка',
                      type: 'text',
                      localized: true,
                      admin: {
                        description: 'Наприклад: "Możliwy wyjazd w weekendy po uzgodnieniu"',
                      },
                    },
                  ],
                },
              ],
            },
          ],
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

  serverURL: siteUrl,

  cors: [
    siteUrl,
    'https://electro-rho.vercel.app',
  ].filter(Boolean),

  csrf: [
    siteUrl,
    'https://electro-rho.vercel.app',
  ].filter(Boolean),

  sharp,
});
