/**
 * Project Detail Page - Server Component
 * Fetches single project from Payload CMS and passes to client component
 */

import { getProjectById } from '@/lib/payload';
import { notFound } from 'next/navigation';
import ProjectDetailClient from './ProjectDetailClient';
import JsonLd from '@/components/JsonLd';
import { siteConfig, generateBreadcrumbSchema, generateProjectSchema } from '@/lib/seo';

interface ProjectPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, id } = await params;
  
  const project = await getProjectById(id, locale);

  if (!project) {
    notFound();
  }

  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/${locale}` },
    { name: locale === 'pl' ? 'Portfolio' : 'Portfolio', url: `${siteConfig.url}/${locale}/portfolio` },
    { name: project.title, url: `${siteConfig.url}/${locale}/portfolio/${id}` },
  ]);

  const projectData = generateProjectSchema({
    name: project.title,
    description: project.description,
    image: project.image || `${siteConfig.url}/og-image.png`,
    location: project.location,
    year: project.year,
  });

  return (
    <>
      <JsonLd data={[breadcrumbData, projectData]} />
      <ProjectDetailClient project={project} />
    </>
  );
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { locale, id } = await params;
  const project = await getProjectById(id, locale);
  
  if (!project) {
    return {
      title: locale === 'pl' ? 'Projekt nie znaleziony' : 'Project Not Found',
    };
  }

  const categoryNames: Record<string, Record<string, string>> = {
    en: {
      residential: 'Residential',
      industrial: 'Industrial',
      commercial: 'Commercial',
      infrastructure: 'Infrastructure',
    },
    pl: {
      residential: 'Mieszkaniowy',
      industrial: 'Przemysłowy',
      commercial: 'Komercyjny',
      infrastructure: 'Infrastruktura',
    },
  };

  const category = categoryNames[locale]?.[project.category] || project.category;
  const title = `${project.title} - ${category} | Techno Groop`;
  const description = project.description;

  return {
    title,
    description,
    keywords: [
      project.title,
      category,
      project.location,
      locale === 'pl' ? 'projekt elektryczny' : 'electrical project',
      locale === 'pl' ? 'instalacja elektryczna' : 'electrical installation',
      project.country === 'PL' ? (locale === 'pl' ? 'Polska' : 'Poland') : (locale === 'pl' ? 'Belgia' : 'Belgium'),
    ],
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${locale}/portfolio/${id}`,
      type: 'article',
      images: project.image ? [{ url: project.image, alt: project.title }] : undefined,
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/portfolio/${id}`,
      languages: {
        en: `${siteConfig.url}/en/portfolio/${id}`,
        pl: `${siteConfig.url}/pl/portfolio/${id}`,
      },
    },
  };
}
