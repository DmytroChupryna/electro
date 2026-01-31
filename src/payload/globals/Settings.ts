import type { GlobalConfig } from 'payload';

/**
 * Global Settings
 * Site-wide configuration singleton
 */
export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site Settings',
  admin: {
    description: 'Global site settings and contact information',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact',
          fields: [
            {
              name: 'phone',
              type: 'text',
              required: true,
              defaultValue: '+48 578 992 316',
              admin: {
                description: 'Primary phone number',
              },
            },
            {
              name: 'email',
              type: 'email',
              required: true,
              defaultValue: 'info@technogroop.com',
              admin: {
                description: 'Primary email address',
              },
            },
            {
              name: 'address',
              type: 'textarea',
              defaultValue: 'Ul. Biala 4/87\n00-895 Warszawa, Poland',
              admin: {
                description: 'Company address',
              },
            },
          ],
        },
        {
          label: 'Locations',
          fields: [
            {
              name: 'countries',
              type: 'array',
              label: 'Countries of Operation',
              fields: [
                {
                  name: 'code',
                  type: 'select',
                  options: [
                    { label: 'Poland', value: 'PL' },
                    { label: 'Belgium', value: 'BE' },
                  ],
                  required: true,
                },
                {
                  name: 'cities',
                  type: 'array',
                  label: 'Cities',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Company',
          fields: [
            {
              name: 'companyName',
              type: 'text',
              defaultValue: 'Techno Groop Sp. z o.o.',
            },
            {
              name: 'nip',
              type: 'text',
              defaultValue: '1231527015',
              admin: {
                description: 'VAT ID / NIP',
              },
            },
            {
              name: 'regon',
              type: 'text',
              defaultValue: '524314939',
            },
            {
              name: 'krs',
              type: 'text',
              defaultValue: '0001016431',
            },
            {
              name: 'director',
              type: 'text',
              defaultValue: 'Vadym Lapin',
            },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'facebook',
              type: 'text',
              admin: {
                description: 'Facebook page URL',
              },
            },
            {
              name: 'linkedin',
              type: 'text',
              admin: {
                description: 'LinkedIn company URL',
              },
            },
            {
              name: 'instagram',
              type: 'text',
              admin: {
                description: 'Instagram profile URL',
              },
            },
          ],
        },
      ],
    },
  ],
};
