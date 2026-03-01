/**
 * Seed API Route
 * POST /api/seed - populates database with initial data
 * 
 * Protected by secret key for security
 */

import { getPayload } from 'payload';
import config from '@/payload.config';
import { NextResponse } from 'next/server';

// Services data from prototypes
const servicesData = [
  {
    title: { en: 'Residential Electrical', pl: 'Elektroinstalacje mieszkaniowe' },
    description: {
      en: 'Full range of electrical work in residential buildings: installations, panels, lighting, outlets.',
      pl: 'Pełen zakres prac elektrycznych w budynkach mieszkalnych: instalacje, rozdzielnie, oświetlenie, gniazda.',
    },
    icon: 'home',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    order: 1,
  },
  {
    title: { en: 'Industrial Electrical', pl: 'Elektroinstalacje przemysłowe' },
    description: {
      en: 'Electrical installations for production halls, warehouses, and commercial facilities.',
      pl: 'Instalacje elektryczne dla hal produkcyjnych, magazynów i obiektów komercyjnych.',
    },
    icon: 'factory',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    order: 2,
  },
  {
    title: { en: 'Low-Current Systems', pl: 'Systemy niskoprądowe' },
    description: {
      en: 'LAN networks, CCTV, access control, alarm systems, and intercom.',
      pl: 'Sieci LAN, CCTV, kontrola dostępu, systemy alarmowe i interkom.',
    },
    icon: 'server',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    order: 3,
  },
  {
    title: { en: 'Building Automation', pl: 'Automatyka budynkowa' },
    description: {
      en: 'BMS systems, KNX, smart lighting and HVAC control.',
      pl: 'Systemy BMS, KNX, inteligentne sterowanie oświetleniem i klimatyzacją.',
    },
    icon: 'settings',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    order: 4,
  },
  {
    title: { en: 'Photovoltaics', pl: 'Fotowoltaika' },
    description: {
      en: 'Installation and connection of solar panel systems for business.',
      pl: 'Montaż i podłączenie instalacji fotowoltaicznych dla biznesu.',
    },
    icon: 'sun',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    order: 5,
  },
];

// Projects data - only Antwerp Prison project
const projectsData = [
  {
    slug: 'antwerp-prison-government-project',
    title: { en: 'Antwerp Prison - Government Project', pl: 'Więzienie w Antwerpii - Projekt Rządowy' },
    description: {
      en: 'Complete electrical and low-current installation for a new government correctional facility. High-security infrastructure including power distribution, structured cabling (Cat6a), control panels, cable tray systems, and building automation.',
      pl: 'Kompleksowa instalacja elektryczna i niskoprądowa dla nowego rządowego zakładu karnego. Infrastruktura wysokiego bezpieczeństwa obejmująca dystrybucję mocy, okablowanie strukturalne (Cat6a), rozdzielnie, systemy korytek kablowych i automatykę budynkową.',
    },
    location: { en: 'Antwerp, Belgium', pl: 'Antwerpia, Belgia' },
    category: 'industrial',
    country: 'BE',
    year: '2024',
    featured: true,
    order: 1,
  },
];

// Reviews data - one example
const reviewsData = [
  {
    text: {
      en: 'Excellent technical skills and professional approach. The team completed our warehouse electrical installation ahead of schedule. Communication was clear throughout the project.',
      pl: 'Doskonałe umiejętności techniczne i profesjonalne podejście. Zespół zakończył instalację elektryczną naszego magazynu przed terminem. Komunikacja była jasna przez cały projekt.',
    },
    author: 'Marc Van den Berg',
    role: { en: 'Operations Director', pl: 'Dyrektor Operacyjny' },
    company: 'Logistics Plus NV',
    rating: 5,
    order: 1,
  },
];

// Global settings data
const settingsData = {
  title: {
    en: 'Techno Groop – Professional Electrical Services',
    pl: 'Techno Groop – Profesjonalne usługi elektryczne',
  },
  description: {
    en: 'Comprehensive electrical solutions, low-current installations, automation, and photovoltaics for businesses and general contractors in Poland and Belgium.',
    pl: 'Kompleksowe rozwiązania elektryczne, instalacje niskoprądowe, automatyka i fotowoltaika dla firm i generalnych wykonawców w Polsce i Belgii.',
  },
};

import * as fs from 'fs';
import * as path from 'path';

/**
 * Upload image from URL or local file to Media collection
 */
async function uploadImageFromUrl(
  payload: Awaited<ReturnType<typeof getPayload>>,
  imageUrl: string,
  filename: string,
  alt: string
): Promise<number | string | null> {
  try {
    let buffer: Buffer;
    let contentType: string;

    // Check if it's a local file path (starts with /)
    if (imageUrl.startsWith('/')) {
      // Local file - read from public folder
      const publicPath = path.join(process.cwd(), 'public', imageUrl);
      
      if (!fs.existsSync(publicPath)) {
        console.error(`Local file not found: ${publicPath}`);
        return null;
      }
      
      buffer = fs.readFileSync(publicPath);
      
      // Determine content type from extension
      const ext = path.extname(imageUrl).toLowerCase();
      const mimeTypes: Record<string, string> = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
      };
      contentType = mimeTypes[ext] || 'image/jpeg';
    } else {
      // Remote URL - fetch from internet
      console.log(`Fetching image from: ${imageUrl}`);
      const response = await fetch(imageUrl);
      if (!response.ok) {
        console.error(`Failed to fetch image: ${imageUrl} - Status: ${response.status}`);
        return null;
      }

      const arrayBuffer = await response.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
      contentType = response.headers.get('content-type') || 'image/jpeg';
      console.log(`Fetched image: ${buffer.length} bytes, type: ${contentType}`);
    }

    // Create media entry with file
    console.log(`Creating media entry for: ${filename} (${buffer.length} bytes)`);
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: alt,
      },
      file: {
        data: buffer,
        mimetype: contentType,
        name: filename,
        size: buffer.length,
      },
    });

    console.log(`Media created with ID: ${media.id}`);
    return media.id;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error uploading image ${filename}:`, errorMessage);
    console.error('Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    return null;
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const force = searchParams.get('force') === 'true';
  
  // Allow seeding with hardcoded secret or env variable
  const validSecrets = ['technogroop-seed-2024', process.env.PAYLOAD_SECRET];
  if (!validSecrets.includes(secret || '')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = await getPayload({ config });
    const results: string[] = [];

    // Check existing data counts
    const existingServices = await payload.find({ collection: 'services', limit: 1 });
    const existingProjects = await payload.find({ collection: 'projects', limit: 1 });
    let existingReviews = { totalDocs: 0 };
    try {
      existingReviews = await payload.find({ collection: 'reviews', limit: 1 });
    } catch {
      // Reviews table might not exist yet
    }

    // If force mode, clear everything first
    if (force) {
      // Clear existing projects FIRST (they reference media)
      try {
        const projects = await payload.find({ collection: 'projects', limit: 100 });
        for (const project of projects.docs) {
          await payload.delete({ collection: 'projects', id: project.id });
        }
        results.push(`Deleted ${projects.docs.length} existing projects`);
      } catch {
        results.push('Projects table was empty');
      }

      // Clear existing services
      try {
        const services = await payload.find({ collection: 'services', limit: 100 });
        for (const service of services.docs) {
          await payload.delete({ collection: 'services', id: service.id });
        }
        results.push(`Deleted ${services.docs.length} existing services`);
      } catch {
        results.push('Services table was empty');
      }

      // Clear existing reviews
      try {
        const reviews = await payload.find({ collection: 'reviews', limit: 100 });
        for (const review of reviews.docs) {
          await payload.delete({ collection: 'reviews', id: review.id });
        }
        results.push(`Deleted ${reviews.docs.length} existing reviews`);
      } catch {
        results.push('Reviews table was empty');
      }

      // Clear existing media LAST
      try {
        const media = await payload.find({ collection: 'media', limit: 100 });
        for (const m of media.docs) {
          await payload.delete({ collection: 'media', id: m.id });
        }
        results.push(`Deleted ${media.docs.length} existing media`);
      } catch {
        results.push('Media table was empty');
      }
    } else {
      // Non-force mode: skip collections that already have data
      if (existingServices.totalDocs > 0) {
        results.push(`Skipped services (${existingServices.totalDocs} already exist)`);
      }
      if (existingProjects.totalDocs > 0) {
        results.push(`Skipped projects (${existingProjects.totalDocs} already exist)`);
      }
      if (existingReviews.totalDocs > 0) {
        results.push(`Skipped reviews (${existingReviews.totalDocs} already exist)`);
      }
    }

    // Only seed if force mode OR collection is empty
    const shouldSeedServices = force || existingServices.totalDocs === 0;
    const shouldSeedProjects = force || existingProjects.totalDocs === 0;
    const shouldSeedReviews = force || existingReviews.totalDocs === 0;

    if (!shouldSeedServices && !shouldSeedProjects && !shouldSeedReviews) {
      return NextResponse.json({
        success: true,
        message: 'Database already has data. Use ?force=true to reseed.',
        results,
      });
    }

    // Seed services if needed
    if (shouldSeedServices) {
      for (const serviceData of servicesData) {
        const service = await payload.create({
          collection: 'services',
          data: {
            title: serviceData.title.en,
            description: serviceData.description.en,
            icon: serviceData.icon,
            sortOrder: serviceData.order,
            isActive: true,
          },
          locale: 'en',
        });

        await payload.update({
          collection: 'services',
          id: service.id,
          data: {
            title: serviceData.title.pl,
            description: serviceData.description.pl,
          },
          locale: 'pl',
        });

        results.push(`Created service: ${serviceData.title.en}`);
      }
    }

    // Seed projects if needed
    if (shouldSeedProjects) {
      for (const projectData of projectsData) {
        const project = await payload.create({
          collection: 'projects',
          data: {
            slug: projectData.slug,
            title: projectData.title.en,
            description: projectData.description.en,
            location: projectData.location.en,
            category: projectData.category,
            country: projectData.country,
            year: projectData.year,
            featured: projectData.featured,
            sortOrder: projectData.order,
          },
          locale: 'en',
        });

        await payload.update({
          collection: 'projects',
          id: project.id,
          data: {
            title: projectData.title.pl,
            description: projectData.description.pl,
            location: projectData.location.pl,
          },
          locale: 'pl',
        });

        results.push(`Created project: ${projectData.title.en}`);
      }
    }

    // Seed reviews if needed
    if (shouldSeedReviews) {
      for (const reviewData of reviewsData) {
        const review = await payload.create({
          collection: 'reviews',
          data: {
            text: reviewData.text.en,
            author: reviewData.author,
            role: reviewData.role.en,
            company: reviewData.company,
            rating: reviewData.rating,
            sortOrder: reviewData.order,
            isActive: true,
          },
          locale: 'en',
        });

        await payload.update({
          collection: 'reviews',
          id: review.id,
          data: {
            text: reviewData.text.pl,
            role: reviewData.role.pl,
          },
          locale: 'pl',
        });

        results.push(`Created review from: ${reviewData.author}`);
      }
    }

    // Update global settings - English
    await payload.updateGlobal({
      slug: 'settings',
      data: {
        title: settingsData.title.en,
        description: settingsData.description.en,
      },
      locale: 'en',
    });

    // Update global settings - Polish
    await payload.updateGlobal({
      slug: 'settings',
      data: {
        title: settingsData.title.pl,
        description: settingsData.description.pl,
      },
      locale: 'pl',
    });

    results.push('Updated global settings (EN + PL)');

    return NextResponse.json({
      success: true,
      message: 'Seed completed successfully',
      results,
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Seed failed', details: String(error) },
      { status: 500 }
    );
  }
}

// GET method for easy testing
export async function GET() {
  return NextResponse.json({
    message: 'Send POST request to seed the database',
    usage: {
      seedIfEmpty: 'POST /api/seed?secret=YOUR_SECRET',
      forceReseed: 'POST /api/seed?secret=YOUR_SECRET&force=true',
    },
    note: 'Without force=true, only empty collections will be seeded',
  });
}
