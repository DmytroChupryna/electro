/**
 * Services Page - Server Component
 * Fetches services data from Payload CMS and passes to client component
 */

import { getServices } from '@/lib/payload';
import ServicesClient from './ServicesClient';

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  
  // Fetch services from CMS with current locale
  const services = await getServices(locale);

  return <ServicesClient services={services} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ServicesPageProps) {
  const { locale } = await params;
  
  const titles = {
    en: 'Our Services | Techno Groop',
    pl: 'Nasze Usługi | Techno Groop',
  };

  const descriptions = {
    en: 'Professional electrical services: residential, industrial, low-current systems, automation, plumbing, and solar panels.',
    pl: 'Profesjonalne usługi elektryczne: mieszkaniowe, przemysłowe, niskoprądowe, automatyka, hydraulika i fotowoltaika.',
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  };
}
