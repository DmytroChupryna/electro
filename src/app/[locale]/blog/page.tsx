import { getPosts, getSettings } from '@/lib/payload';
import BlogClient from './BlogClient';
import JsonLd from '@/components/JsonLd';
import { siteConfig, generateBreadcrumbSchema } from '@/lib/seo';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;

  const [posts, settings] = await Promise.all([
    getPosts(locale),
    getSettings(locale),
  ]);

  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/${locale}` },
    { name: 'Blog', url: `${siteConfig.url}/${locale}/blog` },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbData]} />
      <BlogClient posts={posts} settings={settings} />
    </>
  );
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { locale } = await params;

  const titles = {
    en: 'Blog - Electrical Installation Guides & Industry Insights | Techno Groop',
    pl: 'Blog - Poradniki Instalacji Elektrycznych i Branżowe Artykuły | Techno Groop',
  };

  const descriptions = {
    en: 'Expert articles about electrical installations, structured cabling, KNX automation, photovoltaics, and industry best practices. Learn from VCA certified professionals.',
    pl: 'Eksperckie artykuły o instalacjach elektrycznych, okablowaniu strukturalnym, automatyce KNX, fotowoltaice i najlepszych praktykach branżowych. Wiedza od certyfikowanych specjalistów VCA.',
  };

  const keywords = {
    en: ['electrical blog', 'installation guides', 'KNX automation guide', 'structured cabling tips', 'VCA certification', 'electrical contractor insights'],
    pl: ['blog elektryczny', 'poradniki instalacyjne', 'poradnik automatyka KNX', 'porady okablowanie strukturalne', 'certyfikat VCA', 'artykuły wykonawca elektryczny'],
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: keywords[locale as keyof typeof keywords] || keywords.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `${siteConfig.url}/${locale}/blog`,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/blog`,
      languages: {
        en: `${siteConfig.url}/en/blog`,
        pl: `${siteConfig.url}/pl/blog`,
      },
    },
  };
}
