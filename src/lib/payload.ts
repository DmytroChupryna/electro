/**
 * Payload CMS data fetching utilities
 * Server-side only functions to get data from CMS
 */

import { getPayload } from 'payload';
import config from '@/payload.config';

// Icon mapping from CMS value to component name
export const iconMap = {
  home: 'Home',
  factory: 'Factory',
  server: 'Server',
  settings: 'Settings',
  sun: 'Sun',
} as const;

export type IconName = keyof typeof iconMap;

// Service type from CMS
export interface CMSService {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  image?: string | null;
  order: number;
  isActive: boolean;
}

// Project category type
export type ProjectCategory = 'industrial' | 'commercial' | 'residential';

// Project type from CMS
export interface CMSProject {
  id: string;
  title: string;
  description: string;
  location: string;
  category: ProjectCategory;
  country: 'PL' | 'BE';
  year: string;
  image: string;
  gallery?: string[];
  featured: boolean;
  order: number;
}

// Global settings type
export interface CMSSettings {
  title: string;
  description?: string | null;
}

/**
 * Get all active services from CMS
 */
export async function getServices(locale: string = 'en'): Promise<CMSService[]> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: 'services',
      where: {
        isActive: { equals: true },
      },
      sort: 'order',
      locale: locale as 'en' | 'pl',
      limit: 100,
    });

    return result.docs.map((doc) => ({
      id: String(doc.id),
      title: doc.title as string,
      description: doc.description as string,
      icon: doc.icon as IconName,
      image: doc.image as string | null,
      order: doc.order as number,
      isActive: doc.isActive as boolean,
    }));
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

/**
 * Get all projects from CMS
 */
export async function getProjects(locale: string = 'en', featuredOnly: boolean = false): Promise<CMSProject[]> {
  try {
    const payload = await getPayload({ config });

    // Build query options
    const queryOptions: Parameters<typeof payload.find>[0] = {
      collection: 'projects',
      sort: 'order',
      locale: locale as 'en' | 'pl',
      limit: 100,
      depth: 1, // Include related media
    };

    // Add featured filter if needed
    if (featuredOnly) {
      queryOptions.where = {
        featured: { equals: true },
      };
    }

    const result = await payload.find(queryOptions);

    return result.docs.map((doc) => ({
      id: String(doc.id),
      title: doc.title as string,
      description: doc.description as string,
      location: doc.location as string,
      category: doc.category as ProjectCategory,
      country: doc.country as 'PL' | 'BE',
      year: doc.year as string,
      image: (doc.image as string) || '',
      featured: doc.featured as boolean,
      order: (doc.order as number) || 0,
      gallery: [], // Gallery loaded separately for detail page
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

/**
 * Get single project by ID from CMS
 */
export async function getProjectById(id: string, locale: string = 'en'): Promise<CMSProject | null> {
  const payload = await getPayload({ config });

  try {
    const doc = await payload.findByID({
      collection: 'projects',
      id: id,
      locale: locale as 'en' | 'pl',
      depth: 2, // Include nested media in gallery
    });

    if (!doc) return null;

    // Get gallery URLs from array
    const galleryUrls: string[] = [];
    if (doc.gallery && Array.isArray(doc.gallery)) {
      for (const item of doc.gallery) {
        if (item.url) {
          galleryUrls.push(item.url as string);
        }
      }
    }

    return {
      id: String(doc.id),
      title: doc.title as string,
      description: doc.description as string,
      location: doc.location as string,
      category: doc.category as ProjectCategory,
      country: doc.country as 'PL' | 'BE',
      year: doc.year as string,
      image: (doc.image as string) || '',
      gallery: galleryUrls,
      featured: doc.featured as boolean,
      order: (doc.order as number) || 0,
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

/**
 * Get global settings from CMS
 */
export async function getSettings(locale: string = 'en'): Promise<CMSSettings> {
  try {
    const payload = await getPayload({ config });

    const settings = await payload.findGlobal({
      slug: 'settings',
      locale: locale as 'en' | 'pl',
    });

    return {
      title: settings.title as string,
      description: settings.description as string | null,
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {
      title: 'Techno Groop',
      description: null,
    };
  }
}
