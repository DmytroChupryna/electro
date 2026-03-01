/**
 * Privacy Policy Page - Server Component
 * GDPR/RODO compliant privacy policy
 */

import PrivacyClient from './PrivacyClient';
import JsonLd from '@/components/JsonLd';
import { siteConfig, generateBreadcrumbSchema } from '@/lib/seo';
import { getSettings } from '@/lib/payload';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const settings = await getSettings(locale);

  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/${locale}` },
    { name: locale === 'pl' ? 'Polityka prywatności' : 'Privacy Policy', url: `${siteConfig.url}/${locale}/privacy` },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbData]} />
      <PrivacyClient settings={settings} />
    </>
  );
}

export async function generateMetadata({ params }: PrivacyPageProps) {
  const { locale } = await params;

  const titles = {
    en: 'Privacy Policy | Techno Groop',
    pl: 'Polityka Prywatności | Techno Groop',
  };

  const descriptions = {
    en: 'Privacy Policy of Techno Groop. Learn how we collect, process and protect your personal data in accordance with GDPR regulations.',
    pl: 'Polityka Prywatności Techno Groop. Dowiedz się, jak zbieramy, przetwarzamy i chronimy Twoje dane osobowe zgodnie z RODO.',
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `${siteConfig.url}/${locale}/privacy`,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/privacy`,
      languages: {
        en: `${siteConfig.url}/en/privacy`,
        pl: `${siteConfig.url}/pl/privacy`,
      },
    },
  };
}
