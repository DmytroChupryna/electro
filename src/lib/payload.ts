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

// Media type from CMS
export interface CMSMedia {
  id: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

// Service type from CMS
export interface CMSService {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  image?: CMSMedia | null;
  order: number;
  isActive: boolean;
}

// Project category type
export type ProjectCategory = 'industrial' | 'commercial' | 'residential';

// Gallery item type
export interface CMSGalleryItem {
  image: CMSMedia;
  caption?: string;
}

// Project type from CMS
export interface CMSProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: string;
  category: ProjectCategory;
  country: 'PL' | 'BE';
  year: string;
  image: CMSMedia | null;
  gallery?: CMSGalleryItem[];
  featured: boolean;
  order: number;
}

// Review type from CMS
export interface CMSReview {
  id: string;
  text: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  order: number;
  isActive: boolean;
}

// Address type
export interface CMSAddress {
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

// Social links type
export interface CMSSocialLinks {
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
}

// Company info type
export interface CMSCompanyPL {
  name?: string;
  nip?: string;
  regon?: string;
  krs?: string;
}

export interface CMSCompanyBE {
  name?: string;
  vat?: string;
  companyNumber?: string;
}

// Working hours type
export interface CMSWorkingHours {
  weekdays?: string;
  saturday?: string;
  sunday?: string;
  note?: string;
}

// Global settings type
export interface CMSSettings {
  // General
  title: string;
  description?: string | null;
  tagline?: string | null;
  // Contacts
  contactEmail?: string;
  salesEmail?: string;
  phonePL?: string;
  phoneBE?: string;
  whatsapp?: string;
  // Addresses
  addressPL?: CMSAddress;
  addressBE?: CMSAddress;
  // Social
  socialLinks?: CMSSocialLinks;
  // Company info
  companyPL?: CMSCompanyPL;
  companyBE?: CMSCompanyBE;
  // Working hours
  workingHours?: CMSWorkingHours;
}

/**
 * Helper to extract media URL from upload field
 */
function extractMedia(media: unknown): CMSMedia | null {
  if (!media) return null;
  if (typeof media === 'object' && media !== null) {
    const m = media as Record<string, unknown>;
    if (m.url) {
      return {
        id: String(m.id || ''),
        url: m.url as string,
        alt: (m.alt as string) || '',
        width: m.width as number | undefined,
        height: m.height as number | undefined,
      };
    }
  }
  return null;
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
      depth: 1,
    });

    return result.docs.map((doc) => ({
      id: String(doc.id),
      title: doc.title as string,
      description: doc.description as string,
      icon: doc.icon as IconName,
      image: extractMedia(doc.image),
      order: doc.sortOrder as number,
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
      depth: 2,
    };

    // Add featured filter if needed
    if (featuredOnly) {
      queryOptions.where = {
        featured: { equals: true },
      };
    }

    const result = await payload.find(queryOptions);

    return result.docs.map((doc) => {
      // Extract gallery items
      const galleryItems: CMSGalleryItem[] = [];
      if (doc.gallery && Array.isArray(doc.gallery)) {
        for (const item of doc.gallery) {
          const media = extractMedia((item as Record<string, unknown>).image);
          if (media) {
            galleryItems.push({
              image: media,
              caption: (item as Record<string, unknown>).caption as string | undefined,
            });
          }
        }
      }

      return {
        id: String(doc.id),
        slug: (doc.slug as string) || String(doc.id),
        title: doc.title as string,
        description: doc.description as string,
        location: doc.location as string,
        category: doc.category as ProjectCategory,
        country: doc.country as 'PL' | 'BE',
        year: doc.year as string,
        image: extractMedia(doc.image),
        featured: doc.featured as boolean,
        order: (doc.sortOrder as number) || 0,
        gallery: galleryItems,
      };
    });
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
      depth: 2,
    });

    if (!doc) return null;

    // Extract gallery items
    const galleryItems: CMSGalleryItem[] = [];
    if (doc.gallery && Array.isArray(doc.gallery)) {
      for (const item of doc.gallery) {
        const media = extractMedia((item as Record<string, unknown>).image);
        if (media) {
          galleryItems.push({
            image: media,
            caption: (item as Record<string, unknown>).caption as string | undefined,
          });
        }
      }
    }

    return {
      id: String(doc.id),
      slug: (doc.slug as string) || String(doc.id),
      title: doc.title as string,
      description: doc.description as string,
      location: doc.location as string,
      category: doc.category as ProjectCategory,
      country: doc.country as 'PL' | 'BE',
      year: doc.year as string,
      image: extractMedia(doc.image),
      gallery: galleryItems,
      featured: doc.featured as boolean,
      order: (doc.sortOrder as number) || 0,
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

/**
 * Get single project by slug from CMS
 */
export async function getProjectBySlug(slug: string, locale: string = 'en'): Promise<CMSProject | null> {
  const payload = await getPayload({ config });

  try {
    const result = await payload.find({
      collection: 'projects',
      where: {
        slug: { equals: slug },
      },
      locale: locale as 'en' | 'pl',
      depth: 2,
      limit: 1,
    });

    if (!result.docs || result.docs.length === 0) return null;

    const doc = result.docs[0];

    // Extract gallery items
    const galleryItems: CMSGalleryItem[] = [];
    if (doc.gallery && Array.isArray(doc.gallery)) {
      for (const item of doc.gallery) {
        const media = extractMedia((item as Record<string, unknown>).image);
        if (media) {
          galleryItems.push({
            image: media,
            caption: (item as Record<string, unknown>).caption as string | undefined,
          });
        }
      }
    }

    return {
      id: String(doc.id),
      slug: (doc.slug as string) || String(doc.id),
      title: doc.title as string,
      description: doc.description as string,
      location: doc.location as string,
      category: doc.category as ProjectCategory,
      country: doc.country as 'PL' | 'BE',
      year: doc.year as string,
      image: extractMedia(doc.image),
      gallery: galleryItems,
      featured: doc.featured as boolean,
      order: (doc.sortOrder as number) || 0,
    };
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }
}

/**
 * Get all reviews from CMS
 */
export async function getReviews(locale: string = 'en'): Promise<CMSReview[]> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: 'reviews',
      sort: 'sortOrder',
      locale: locale as 'en' | 'pl',
      limit: 100,
      where: {
        isActive: { equals: true },
      },
    });

    return result.docs.map((doc) => ({
      id: String(doc.id),
      text: doc.text as string,
      author: doc.author as string,
      role: doc.role as string,
      company: doc.company as string,
      rating: (doc.rating as number) || 5,
      order: (doc.sortOrder as number) || 0,
      isActive: doc.isActive as boolean,
    }));
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
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

    const s = settings as Record<string, unknown>;

    return {
      // General
      title: (s.title as string) || 'Techno Groop',
      description: s.description as string | null,
      tagline: s.tagline as string | null,
      // Contacts
      contactEmail: s.contactEmail as string | undefined,
      salesEmail: s.salesEmail as string | undefined,
      phonePL: s.phonePL as string | undefined,
      phoneBE: s.phoneBE as string | undefined,
      whatsapp: s.whatsapp as string | undefined,
      // Addresses
      addressPL: s.addressPL as CMSAddress | undefined,
      addressBE: s.addressBE as CMSAddress | undefined,
      // Social
      socialLinks: s.socialLinks as CMSSocialLinks | undefined,
      // Company info
      companyPL: s.companyPL as CMSCompanyPL | undefined,
      companyBE: s.companyBE as CMSCompanyBE | undefined,
      // Working hours
      workingHours: s.workingHours as CMSWorkingHours | undefined,
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {
      title: 'Techno Groop',
      description: null,
    };
  }
}
