/**
 * Home B (Industrial) Page - Server Component
 * Provides SEO metadata and structured data for industrial design homepage
 */

import HomeBClient from './HomeBClient';
import JsonLd from '@/components/JsonLd';
import { siteConfig, generateFAQSchema } from '@/lib/seo';

interface HomeBPageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomeBPage({ params }: HomeBPageProps) {
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
      <HomeBClient />
    </>
  );
}

export async function generateMetadata({ params }: HomeBPageProps) {
  const { locale } = await params;

  const titles = {
    en: 'Techno Groop - Industrial Electrical Solutions Poland & Belgium | VCA Certified',
    pl: 'Techno Groop - Przemysłowe Rozwiązania Elektryczne Polska i Belgia | Certyfikat VCA',
  };

  const descriptions = {
    en: 'Industrial electrical installation services by Techno Groop. Factory wiring, heavy machinery connections, control panels. VCA certified team serving Poland and Belgium.',
    pl: 'Przemysłowe usługi instalacji elektrycznych od Techno Groop. Okablowanie fabryk, podłączenia maszyn, rozdzielnice. Certyfikowany zespół VCA obsługujący Polskę i Belgię.',
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `${siteConfig.url}/${locale}/home-b`,
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
