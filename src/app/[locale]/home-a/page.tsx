/**
 * Home A (Corporate) Page - Server Component
 * Provides SEO metadata and structured data for corporate design homepage
 */

import HomeAClient from './HomeAClient';
import JsonLd from '@/components/JsonLd';
import { siteConfig, generateFAQSchema } from '@/lib/seo';

interface HomeAPageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomeAPage({ params }: HomeAPageProps) {
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
      <HomeAClient />
    </>
  );
}

export async function generateMetadata({ params }: HomeAPageProps) {
  const { locale } = await params;

  const titles = {
    en: 'Techno Groop - Professional Electrical Contractor Poland & Belgium | VCA Certified',
    pl: 'Techno Groop - Profesjonalny Wykonawca Elektryczny Polska i Belgia | Certyfikat VCA',
  };

  const descriptions = {
    en: 'Techno Groop - professional electrical installation, low-current systems & building automation for general contractors. 22+ VCA certified specialists. Operating in Poland and Belgium.',
    pl: 'Techno Groop - profesjonalne instalacje elektryczne, systemy niskoprądowe i automatyka budynkowa dla generalnych wykonawców. 22+ certyfikowanych specjalistów VCA. Działamy w Polsce i Belgii.',
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `${siteConfig.url}/${locale}/home-a`,
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
