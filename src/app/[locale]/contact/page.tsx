/**
 * Contact Page - Server Component
 * Provides SEO metadata and structured data
 */

import ContactClient from './ContactClient';
import JsonLd from '@/components/JsonLd';
import { siteConfig, generateBreadcrumbSchema, generateContactPageSchema } from '@/lib/seo';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/${locale}` },
    { name: locale === 'pl' ? 'Kontakt' : 'Contact', url: `${siteConfig.url}/${locale}/contact` },
  ]);

  const contactPageData = generateContactPageSchema();

  return (
    <>
      <JsonLd data={[breadcrumbData, contactPageData]} />
      <ContactClient />
    </>
  );
}

export async function generateMetadata({ params }: ContactPageProps) {
  const { locale } = await params;

  const titles = {
    en: 'Contact Us - Request a Quote | Techno Groop',
    pl: 'Kontakt - Zapytaj o Wycenę | Techno Groop',
  };

  const descriptions = {
    en: 'Contact Techno Groop for electrical installation services. Get a free quote for residential, industrial, or commercial projects. Warsaw office: +48 578 992 316.',
    pl: 'Skontaktuj się z Techno Groop w sprawie usług instalacji elektrycznych. Uzyskaj bezpłatną wycenę dla projektów mieszkaniowych, przemysłowych lub komercyjnych. Biuro Warszawa: +48 578 992 316.',
  };

  const keywords = {
    en: ['contact electrician', 'electrical quote', 'request quote electrical', 'electrician Warsaw', 'electrical contractor contact', 'hire electrician Poland Belgium'],
    pl: ['kontakt elektryk', 'wycena elektryczna', 'zapytanie ofertowe elektryczne', 'elektryk Warszawa', 'kontakt wykonawca elektryczny', 'zatrudnij elektryka Polska Belgia'],
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: keywords[locale as keyof typeof keywords] || keywords.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `${siteConfig.url}/${locale}/contact`,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/contact`,
      languages: {
        en: `${siteConfig.url}/en/contact`,
        pl: `${siteConfig.url}/pl/contact`,
      },
    },
  };
}
