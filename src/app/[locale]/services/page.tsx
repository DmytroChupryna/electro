/**
 * Services Page - Server Component
 * Fetches services data from Payload CMS and passes to client component
 */

import { getServices } from '@/lib/payload';
import ServicesClient from './ServicesClient';
import JsonLd from '@/components/JsonLd';
import {
  siteConfig,
  generateBreadcrumbSchema,
  generateServiceSchema,
} from '@/lib/seo';

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  
  const services = await getServices(locale);

  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/${locale}` },
    { name: locale === 'pl' ? 'Usługi' : 'Services', url: `${siteConfig.url}/${locale}/services` },
  ]);

  const serviceSchemas = services.map((service) =>
    generateServiceSchema(service.title, service.description, locale)
  );

  return (
    <>
      <JsonLd data={[breadcrumbData, ...serviceSchemas]} />
      <ServicesClient services={services} />
    </>
  );
}

export async function generateMetadata({ params }: ServicesPageProps) {
  const { locale } = await params;
  
  const titles = {
    en: 'Electrical Services - Residential, Industrial, Low-Current | Techno Groop',
    pl: 'Usługi Elektryczne - Mieszkaniowe, Przemysłowe, Niskoprądowe | Techno Groop',
  };

  const descriptions = {
    en: 'Professional electrical installation services in Poland and Belgium: residential wiring, industrial installations, Cat6 cabling, KNX automation, BMS systems, photovoltaics. VCA certified team.',
    pl: 'Profesjonalne usługi instalacji elektrycznych w Polsce i Belgii: instalacje mieszkaniowe, przemysłowe, okablowanie Cat6, automatyka KNX, systemy BMS, fotowoltaika. Certyfikowany zespół VCA.',
  };

  const keywords = {
    en: ['electrical services', 'residential electrician', 'industrial electrical installation', 'low-current systems', 'Cat6 cabling', 'KNX automation', 'BMS installation', 'photovoltaic installation', 'VCA certified electrician Poland Belgium'],
    pl: ['usługi elektryczne', 'elektryk mieszkaniowy', 'instalacje elektryczne przemysłowe', 'systemy niskoprądowe', 'okablowanie Cat6', 'automatyka KNX', 'instalacja BMS', 'instalacje fotowoltaiczne', 'elektryk VCA Polska Belgia'],
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: keywords[locale as keyof typeof keywords] || keywords.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `${siteConfig.url}/${locale}/services`,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/services`,
      languages: {
        en: `${siteConfig.url}/en/services`,
        pl: `${siteConfig.url}/pl/services`,
      },
    },
  };
}
