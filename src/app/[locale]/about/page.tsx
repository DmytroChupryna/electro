/**
 * About Page - Server Component
 * Provides SEO metadata and structured data
 */

import AboutClient from './AboutClient';
import JsonLd from '@/components/JsonLd';
import { siteConfig, generateBreadcrumbSchema, generateAboutPageSchema } from '@/lib/seo';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/${locale}` },
    { name: locale === 'pl' ? 'O nas' : 'About Us', url: `${siteConfig.url}/${locale}/about` },
  ]);

  const aboutPageData = generateAboutPageSchema(locale);

  return (
    <>
      <JsonLd data={[breadcrumbData, aboutPageData]} />
      <AboutClient />
    </>
  );
}

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params;

  const titles = {
    en: 'About Us - VCA Certified Electrical Contractor | Techno Groop',
    pl: 'O Nas - Certyfikowany Wykonawca Elektryczny VCA | Techno Groop',
  };

  const descriptions = {
    en: 'Techno Groop - professional electrical contractor founded in 2023. 22+ VCA certified specialists serving Poland and Belgium. Industrial, commercial & residential installations.',
    pl: 'Techno Groop - profesjonalny wykonawca elektryczny założony w 2023. 22+ certyfikowanych specjalistów VCA obsługujących Polskę i Belgię. Instalacje przemysłowe, komercyjne i mieszkaniowe.',
  };

  const keywords = {
    en: ['about Techno Groop', 'VCA certified electrician', 'electrical contractor Poland', 'electrical contractor Belgium', 'professional electricians team', 'company history'],
    pl: ['o Techno Groop', 'elektryk certyfikat VCA', 'wykonawca elektryczny Polska', 'wykonawca elektryczny Belgia', 'zespół profesjonalnych elektryków', 'historia firmy'],
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: keywords[locale as keyof typeof keywords] || keywords.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `${siteConfig.url}/${locale}/about`,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/about`,
      languages: {
        en: `${siteConfig.url}/en/about`,
        pl: `${siteConfig.url}/pl/about`,
      },
    },
  };
}
