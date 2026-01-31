/**
 * Portfolio Page - Server Component
 * Fetches projects data from Payload CMS and passes to client component
 */

import { getProjects } from '@/lib/payload';
import PortfolioClient from './PortfolioClient';

interface PortfolioPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { locale } = await params;
  
  // Fetch projects from CMS with current locale
  const projects = await getProjects(locale);

  return <PortfolioClient projects={projects} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PortfolioPageProps) {
  const { locale } = await params;
  
  const titles = {
    en: 'Our Projects | Techno Groop',
    pl: 'Nasze Realizacje | Techno Groop',
  };

  const descriptions = {
    en: 'View our completed electrical installation projects in Poland and Belgium.',
    pl: 'Zobacz nasze zrealizowane projekty elektroinstalacyjne w Polsce i Belgii.',
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  };
}
