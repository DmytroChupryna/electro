/**
 * Home C (Minimal) Page - Server Component
 * Provides SEO metadata and structured data for minimal design homepage
 */

import HomeCClient from './HomeCClient';
import JsonLd from '@/components/JsonLd';
import { siteConfig, generateFAQSchema } from '@/lib/seo';
import { getProjects, getSettings } from '@/lib/payload';
import { getTranslations } from 'next-intl/server';

interface HomeCPageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomeCPage({ params }: HomeCPageProps) {
  const { locale } = await params;
  
  const [projects, settings] = await Promise.all([
    getProjects(locale, true),
    getSettings(locale),
  ]);

  const faqT = await getTranslations({ locale, namespace: 'FAQ' });

  const faqData = generateFAQSchema(
    Array.from({ length: 10 }, (_, i) => ({
      question: faqT(`q${i + 1}`),
      answer: faqT(`a${i + 1}`),
    }))
  );

  return (
    <>
      <JsonLd data={faqData} />
      <HomeCClient projects={projects} settings={settings} />
    </>
  );
}

export async function generateMetadata({ params }: HomeCPageProps) {
  const { locale } = await params;

  const titles = {
    en: 'Techno Groop - Modern Electrical Solutions for General Contractors | VCA Certified',
    pl: 'Techno Groop - Nowoczesne Rozwiązania Elektryczne dla Generalnych Wykonawców | Certyfikat VCA',
  };

  const descriptions = {
    en: 'Modern electrical solutions by Techno Groop. Smart home systems, building automation, low-current infrastructure. Serving general contractors in Poland and Belgium.',
    pl: 'Nowoczesne rozwiązania elektryczne od Techno Groop. Inteligentne domy, automatyka budynkowa, infrastruktura niskoprądowa. Obsługujemy generalnych wykonawców w Polsce i Belgii.',
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `${siteConfig.url}/${locale}/home-c`,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        en: `${siteConfig.url}/en`,
        pl: `${siteConfig.url}/pl`,
      },
    },
  };
}
