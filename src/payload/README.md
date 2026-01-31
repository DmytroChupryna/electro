# Payload CMS - Techno Groop

## Overview

This project uses **Payload CMS v3** integrated into the Next.js application.

Admin panel is available at `/admin`.

## Collections

| Collection | Description |
|------------|-------------|
| `users` | Admin users for CMS authentication |
| `media` | Image uploads (stored in Vercel Blob) |
| `projects` | Portfolio projects |
| `services` | Company services |
| `reviews` | Client testimonials |
| `vacancies` | Job openings |

## Globals

| Global | Description |
|--------|-------------|
| `settings` | Site-wide configuration (contact info, company details) |

## Localization

Supported languages:
- `en` (English) - default
- `pl` (Polski)

Localized fields:
- `title`, `description`, `content` in most collections

## Environment Variables

Required for CMS to work:

```bash
DATABASE_URL=postgresql://...          # PostgreSQL connection string
PAYLOAD_SECRET=your-secret-key         # JWT secret
BLOB_READ_WRITE_TOKEN=vercel_blob_...  # Vercel Blob token
NEXT_PUBLIC_SITE_URL=https://...       # Site URL
```

## Setup for Development

1. Create a PostgreSQL database (Neon recommended)
2. Copy `.env.example` to `.env.local`
3. Fill in the environment variables
4. Run `npm run dev`
5. Go to `http://localhost:3000/admin`
6. Create your first admin user

## Setup for Production (Vercel)

1. Create Neon PostgreSQL database
2. Create Vercel Blob storage
3. Set environment variables in Vercel Dashboard
4. Deploy

## API Endpoints

- `GET/POST /api/[collection]` - REST API
- `POST /api/graphql` - GraphQL API
- `GET /api/graphql-playground` - GraphQL Playground (dev only)

## Creating Admin User

On first run, go to `/admin` and create an account.
Only email + password authentication is enabled.
