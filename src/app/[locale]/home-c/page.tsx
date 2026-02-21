/**
 * Home C (Minimal) Page - Server Component
 * Provides SEO metadata and structured data for minimal design homepage
 */

import HomeCClient from './HomeCClient';
import JsonLd from '@/components/JsonLd';
import { siteConfig, generateFAQSchema } from '@/lib/seo';

interface HomeCPageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomeCPage({ params }: HomeCPageProps) {
  const { locale } = await params;

  const faqData = generateFAQSchema([
    {
      question: locale === 'pl' 
        ? 'Jakie usługi elektryczne oferujecie?' 
        : 'What electrical services do you offer?',
      answer: locale === 'pl'
        ? 'Oferujemy kompleksowe usługi: instalacje mieszkaniowe i przemysłowe, systemy niskoprądowe (Cat6, fiber), automatykę budynkową (KNX, BMS), oraz fotowoltaikę.'
        : 'We offer comprehensive services: residential and industrial installations, low-current systems (Cat6, fiber), building automation (KNX, BMS), and photovoltaics.',
    },
    {
      question: locale === 'pl'
        ? 'W jakich krajach działacie?'
        : 'In which countries do you operate?',
      answer: locale === 'pl'
        ? 'Działamy w Polsce (Warszawa, Łódź, Wrocław) i Belgii (Antwerpia, Bruggia, Bruksela, Gandawa).'
        : 'We operate in Poland (Warsaw, Łódź, Wrocław) and Belgium (Antwerp, Bruges, Brussels, Ghent).',
    },
    {
      question: locale === 'pl'
        ? 'Czy macie certyfikat VCA?'
        : 'Do you have VCA certification?',
      answer: locale === 'pl'
        ? 'Tak, cały nasz zespół posiada certyfikat VCA, co gwarantuje najwyższe standardy bezpieczeństwa na budowie.'
        : 'Yes, our entire team is VCA certified, ensuring the highest safety standards on construction sites.',
    },
  ]);

  return (
    <>
      <JsonLd data={faqData} />
      <HomeCClient />
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
