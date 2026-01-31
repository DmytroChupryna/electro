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
  droplets: 'Droplets',
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
}

/**
 * Get all projects from CMS
 */
export async function getProjects(locale: string = 'en', featuredOnly: boolean = false): Promise<CMSProject[]> {
  const payload = await getPayload({ config });

  const where = featuredOnly ? { featured: { equals: true } } : {};

  const result = await payload.find({
    collection: 'projects',
    where,
    sort: 'order',
    locale: locale as 'en' | 'pl',
    limit: 100,
  });

  return result.docs.map((doc) => ({
    id: String(doc.id),
    title: doc.title as string,
    description: doc.description as string,
    location: doc.location as string,
    category: doc.category as ProjectCategory,
    country: doc.country as 'PL' | 'BE',
    year: doc.year as string,
    image: doc.image as string,
    featured: doc.featured as boolean,
    order: (doc.order as number) || 0,
  }));
}

/**
 * Get global settings from CMS
 */
export async function getSettings(locale: string = 'en'): Promise<CMSSettings> {
  const payload = await getPayload({ config });

  const settings = await payload.findGlobal({
    slug: 'settings',
    locale: locale as 'en' | 'pl',
  });

  return {
    title: settings.title as string,
    description: settings.description as string | null,
  };
}
