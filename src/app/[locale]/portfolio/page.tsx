/**
 * Portfolio Page - Server Component
 * Fetches projects data from Payload CMS and passes to client component
 */

import { getProjects } from '@/lib/payload';
import PortfolioClient from './PortfolioClient';
import JsonLd from '@/components/JsonLd';
import { siteConfig, generateBreadcrumbSchema, generateProjectSchema } from '@/lib/seo';

interface PortfolioPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { locale } = await params;
  
  const projects = await getProjects(locale);

  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/${locale}` },
    { name: locale === 'pl' ? 'Portfolio' : 'Portfolio', url: `${siteConfig.url}/${locale}/portfolio` },
  ]);

  const projectSchemas = projects.slice(0, 10).map((project) =>
    generateProjectSchema({
      name: project.title,
      description: project.description,
      image: project.image || `${siteConfig.url}/og-image.png`,
      location: project.location,
      year: project.year,
    })
  );

  return (
    <>
      <JsonLd data={[breadcrumbData, ...projectSchemas]} />
      <PortfolioClient projects={projects} />
    </>
  );
}

export async function generateMetadata({ params }: PortfolioPageProps) {
  const { locale } = await params;
  
  const titles = {
    en: 'Portfolio - Completed Electrical Projects Poland & Belgium | Techno Groop',
    pl: 'Portfolio - Zrealizowane Projekty Elektryczne Polska i Belgia | Techno Groop',
  };

  const descriptions = {
    en: 'Explore our portfolio of completed electrical installation projects: industrial facilities, commercial buildings, government projects in Poland and Belgium. 50+ successful projects.',
    pl: 'Zobacz nasze portfolio zrealizowanych projektów instalacji elektrycznych: obiekty przemysłowe, budynki komercyjne, projekty rządowe w Polsce i Belgii. 50+ zakończonych projektów.',
  };

  const keywords = {
    en: ['electrical projects portfolio', 'completed installations', 'industrial electrical projects', 'commercial electrical work', 'government construction projects', 'Poland Belgium electrical contractor'],
    pl: ['portfolio projektów elektrycznych', 'zrealizowane instalacje', 'projekty elektryczne przemysłowe', 'prace elektryczne komercyjne', 'projekty budowlane rządowe', 'wykonawca elektryczny Polska Belgia'],
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: keywords[locale as keyof typeof keywords] || keywords.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `${siteConfig.url}/${locale}/portfolio`,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/portfolio`,
      languages: {
        en: `${siteConfig.url}/en/portfolio`,
        pl: `${siteConfig.url}/pl/portfolio`,
      },
    },
  };
}
