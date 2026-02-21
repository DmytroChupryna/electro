/**
 * Careers Page - Server Component
 * Provides SEO metadata and structured data
 */

import CareersClient from './CareersClient';
import JsonLd from '@/components/JsonLd';
import { siteConfig, generateBreadcrumbSchema } from '@/lib/seo';

interface CareersPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CareersPage({ params }: CareersPageProps) {
  const { locale } = await params;

  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/${locale}` },
    { name: locale === 'pl' ? 'Kariera' : 'Careers', url: `${siteConfig.url}/${locale}/careers` },
  ]);

  const jobPostingSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: locale === 'pl' ? 'Elektryk' : 'Electrician',
      description: locale === 'pl' 
        ? 'Poszukujemy doświadczonych elektryków do pracy w Polsce i Belgii'
        : 'Looking for experienced electricians for projects in Poland and Belgium',
      datePosted: new Date().toISOString().split('T')[0],
      hiringOrganization: {
        '@type': 'Organization',
        name: siteConfig.name,
        sameAs: siteConfig.url,
        logo: siteConfig.logo,
      },
      jobLocation: [
        {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'PL',
          },
        },
        {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'BE',
          },
        },
      ],
      employmentType: 'FULL_TIME',
      industry: 'Electrical Installation',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: locale === 'pl' ? 'Brygadzista' : 'Foreman',
      description: locale === 'pl'
        ? 'Poszukujemy brygadzistów z doświadczeniem w zarządzaniu zespołem'
        : 'Looking for foremen with team management experience',
      datePosted: new Date().toISOString().split('T')[0],
      hiringOrganization: {
        '@type': 'Organization',
        name: siteConfig.name,
        sameAs: siteConfig.url,
        logo: siteConfig.logo,
      },
      jobLocation: [
        {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'PL',
          },
        },
        {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'BE',
          },
        },
      ],
      employmentType: 'FULL_TIME',
      industry: 'Electrical Installation',
    },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbData, ...jobPostingSchemas]} />
      <CareersClient />
    </>
  );
}

export async function generateMetadata({ params }: CareersPageProps) {
  const { locale } = await params;

  const titles = {
    en: 'Careers - Join Our Team of Electricians | Techno Groop',
    pl: 'Kariera - Dołącz do Naszego Zespołu Elektryków | Techno Groop',
  };

  const descriptions = {
    en: 'Join Techno Groop team! We are hiring electricians, foremen, and technicians for projects in Poland and Belgium. Competitive salary, international projects, VCA training.',
    pl: 'Dołącz do zespołu Techno Groop! Zatrudniamy elektryków, brygadzistów i techników do projektów w Polsce i Belgii. Konkurencyjne wynagrodzenie, projekty międzynarodowe, szkolenia VCA.',
  };

  const keywords = {
    en: ['electrician jobs', 'electrical jobs Poland', 'electrical jobs Belgium', 'foreman position', 'electrical technician vacancy', 'join electrical company', 'electrician career'],
    pl: ['praca elektryk', 'praca elektryczna Polska', 'praca elektryczna Belgia', 'stanowisko brygadzisty', 'wakat technik elektryk', 'dołącz do firmy elektrycznej', 'kariera elektryka'],
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: keywords[locale as keyof typeof keywords] || keywords.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `${siteConfig.url}/${locale}/careers`,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/careers`,
      languages: {
        en: `${siteConfig.url}/en/careers`,
        pl: `${siteConfig.url}/pl/careers`,
      },
    },
  };
}
