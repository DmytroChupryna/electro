/**
 * Terms of Service Page - Server Component
 * Polish law compliant terms and conditions
 */

import TermsClient from './TermsClient';
import JsonLd from '@/components/JsonLd';
import { siteConfig, generateBreadcrumbSchema } from '@/lib/seo';
import { getSettings } from '@/lib/payload';

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  const settings = await getSettings(locale);

  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/${locale}` },
    { name: locale === 'pl' ? 'Regulamin' : 'Terms of Service', url: `${siteConfig.url}/${locale}/terms` },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbData]} />
      <TermsClient settings={settings} />
    </>
  );
}

export async function generateMetadata({ params }: TermsPageProps) {
  const { locale } = await params;

  const titles = {
    en: 'Terms of Service | Techno Groop',
    pl: 'Regulamin | Techno Groop',
  };

  const descriptions = {
    en: 'Terms of Service of Techno Groop website. Read the rules for using our services and website.',
    pl: 'Regulamin serwisu Techno Groop. Zapoznaj się z zasadami korzystania z naszych usług i strony internetowej.',
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `${siteConfig.url}/${locale}/terms`,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/terms`,
      languages: {
        en: `${siteConfig.url}/en/terms`,
        pl: `${siteConfig.url}/pl/terms`,
      },
    },
  };
}
