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

// Projects data from prototypes
const projectsData = [
  {
    title: { en: 'Logistics Center', pl: 'Centrum logistyczne' },
    description: {
      en: 'Complete electrical and lighting installation for a 15,000 m² warehouse facility.',
      pl: 'Kompletna instalacja elektryczna i oświetleniowa hali magazynowej 15 000 m².',
    },
    location: { en: 'Antwerp, Belgium', pl: 'Antwerpia, Belgia' },
    category: 'industrial',
    country: 'BE',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    imageName: 'logistics-center.jpg',
    featured: true,
    order: 1,
  },
  {
    title: { en: 'Class A Office Building', pl: 'Biurowiec klasy A' },
    description: {
      en: 'Low-current installations, access control, and BMS system.',
      pl: 'Instalacje niskoprądowe, kontrola dostępu i system BMS.',
    },
    location: { en: 'Warsaw, Poland', pl: 'Warszawa, Polska' },
    category: 'commercial',
    country: 'PL',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    imageName: 'office-building.jpg',
    featured: true,
    order: 2,
  },
  {
    title: { en: 'Residential Complex', pl: 'Osiedle mieszkaniowe' },
    description: {
      en: 'Electrical installations and smart home systems in 48 apartments.',
      pl: 'Elektroinstalacje i systemy smart home w 48 apartamentach.',
    },
    location: { en: 'Bruges, Belgium', pl: 'Brugia, Belgia' },
    category: 'residential',
    country: 'BE',
    year: '2023',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    imageName: 'residential-complex.jpg',
    featured: true,
    order: 3,
  },
  {
    title: { en: 'Shopping Mall Electrical', pl: 'Centrum handlowe' },
    description: {
      en: 'Complete electrical infrastructure for a 25,000 m² shopping center.',
      pl: 'Kompletna infrastruktura elektryczna centrum handlowego 25 000 m².',
    },
    location: { en: 'Brussels, Belgium', pl: 'Bruksela, Belgia' },
    category: 'commercial',
    country: 'BE',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1567449303078-57ad995bd17f?w=800&q=80',
    imageName: 'shopping-mall.jpg',
    featured: false,
    order: 4,
  },
  {
    title: { en: 'Solar Farm Installation', pl: 'Farma fotowoltaiczna' },
    description: {
      en: 'Photovoltaic system installation for agricultural complex.',
      pl: 'Montaż instalacji fotowoltaicznej dla kompleksu rolniczego.',
    },
    location: { en: 'Warsaw Region, Poland', pl: 'Okolice Warszawy, Polska' },
    category: 'industrial',
    country: 'PL',
    year: '2023',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    imageName: 'solar-farm.jpg',
    featured: false,
    order: 5,
  },
  {
    title: { en: 'Smart Building Automation', pl: 'Automatyka inteligentnego budynku' },
    description: {
      en: 'KNX and BMS integration for modern office complex.',
      pl: 'Integracja KNX i BMS dla nowoczesnego kompleksu biurowego.',
    },
    location: { en: 'Antwerp, Belgium', pl: 'Antwerpia, Belgia' },
    category: 'commercial',
    country: 'BE',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    imageName: 'smart-building.jpg',
    featured: false,
    order: 6,
  },
  {
    title: { en: 'Antwerp Prison - Government Project', pl: 'Wiezienie w Antwerpii - Projekt Rzadowy' },
    description: {
      en: 'Complete electrical and low-current installation for a new government correctional facility. High-security infrastructure including power distribution, structured cabling (Cat6a), control panels, cable tray systems, and building automation.',
      pl: 'Kompleksowa instalacja elektryczna i niskopradowa dla nowego rzadowego zakladu karnego. Infrastruktura wysokiego bezpieczenstwa obejmujaca dystrybucje mocy, okablowanie strukturalne (Cat6a), rozdzielnie, systemy korytek kablowych i automatyke budynkowa.',
    },
    location: { en: 'Antwerp, Belgium', pl: 'Antwerpia, Belgia' },
    category: 'industrial',
    country: 'BE',
    year: '2024',
    imageUrl: '/projects/antwerp-prison/switchboard.png',
    imageName: 'antwerp-prison.png',
    featured: true,
    order: 7,
    gallery: [
      '/projects/antwerp-prison/cable-routing-1.png',
      '/projects/antwerp-prison/conduit-installation.png',
      '/projects/antwerp-prison/switchboard.png',
      '/projects/antwerp-prison/control-panel.png',
      '/projects/antwerp-prison/data-cabling.png',
      '/projects/antwerp-prison/cable-routing-2.png',
      '/projects/antwerp-prison/team-planning.png',
      '/projects/antwerp-prison/team-work.png',
    ],
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
      const response = await fetch(imageUrl);
      if (!response.ok) {
        console.error(`Failed to fetch image: ${imageUrl}`);
        return null;
      }

      const arrayBuffer = await response.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
      contentType = response.headers.get('content-type') || 'image/jpeg';
    }

    // Create media entry with file
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

    return media.id;
  } catch (error) {
    console.error(`Error uploading image ${filename}:`, error);
    return null;
  }
}

export async function POST(request: Request) {
  // Check for secret key (basic protection)
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  
  if (secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = await getPayload({ config });
    const results: string[] = [];

    // 1. Clear existing projects FIRST (they reference media)
    const existingProjects = await payload.find({
      collection: 'projects',
      limit: 100,
    });
    for (const project of existingProjects.docs) {
      await payload.delete({
        collection: 'projects',
        id: project.id,
      });
    }
    results.push(`Deleted ${existingProjects.docs.length} existing projects`);

    // 2. Clear existing services (they might reference media)
    const existingServices = await payload.find({
      collection: 'services',
      limit: 100,
    });
    for (const service of existingServices.docs) {
      await payload.delete({
        collection: 'services',
        id: service.id,
      });
    }
    results.push(`Deleted ${existingServices.docs.length} existing services`);

    // 3. Clear existing media LAST (after references are removed)
    const existingMedia = await payload.find({
      collection: 'media',
      limit: 100,
    });
    for (const media of existingMedia.docs) {
      await payload.delete({
        collection: 'media',
        id: media.id,
      });
    }
    results.push(`Deleted ${existingMedia.docs.length} existing media`);

    // Create services with localization
    for (const serviceData of servicesData) {
      // Create with English locale
      const service = await payload.create({
        collection: 'services',
        data: {
          title: serviceData.title.en,
          description: serviceData.description.en,
          icon: serviceData.icon,
          image: serviceData.image,
          order: serviceData.order,
          isActive: true,
        },
        locale: 'en',
      });

      // Update with Polish locale
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

    // Create projects with localization and uploaded images
    for (const projectData of projectsData) {
      // Upload image first
      const imageId = await uploadImageFromUrl(
        payload,
        projectData.imageUrl,
        projectData.imageName,
        projectData.title.en
      );

      if (!imageId) {
        results.push(`⚠️ Skipped project (no image): ${projectData.title.en}`);
        continue;
      }

      // Upload gallery images if present
      const galleryItems: { image: string | number }[] = [];
      if (projectData.gallery && Array.isArray(projectData.gallery)) {
        for (let i = 0; i < projectData.gallery.length; i++) {
          const galleryUrl = projectData.gallery[i];
          const galleryImageId = await uploadImageFromUrl(
            payload,
            galleryUrl,
            `gallery-${projectData.imageName.replace('.png', '')}-${i + 1}.png`,
            `${projectData.title.en} - Gallery ${i + 1}`
          );
          if (galleryImageId) {
            galleryItems.push({ image: galleryImageId });
          }
        }
      }

      // Create with English locale
      const project = await payload.create({
        collection: 'projects',
        data: {
          title: projectData.title.en,
          description: projectData.description.en,
          location: projectData.location.en,
          category: projectData.category,
          country: projectData.country,
          year: projectData.year,
          image: imageId,
          gallery: galleryItems.length > 0 ? galleryItems : undefined,
          featured: projectData.featured,
          order: projectData.order,
        },
        locale: 'en',
      });

      // Update with Polish locale
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

      results.push(`Created project: ${projectData.title.en} (with image)`);
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
    usage: 'POST /api/seed?secret=YOUR_PAYLOAD_SECRET',
  });
}
