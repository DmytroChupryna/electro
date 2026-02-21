/**
 * Reviews Page - Server Component
 * Provides SEO metadata and structured data
 */

import ReviewsClient from './ReviewsClient';
import JsonLd from '@/components/JsonLd';
import { siteConfig, generateBreadcrumbSchema } from '@/lib/seo';

interface ReviewsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ReviewsPage({ params }: ReviewsPageProps) {
  const { locale } = await params;

  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/${locale}` },
    { name: locale === 'pl' ? 'Opinie' : 'Reviews', url: `${siteConfig.url}/${locale}/reviews` },
  ]);

  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '50',
      reviewCount: '50',
    },
  };

  return (
    <>
      <JsonLd data={[breadcrumbData, aggregateRatingSchema]} />
      <ReviewsClient />
    </>
  );
}

export async function generateMetadata({ params }: ReviewsPageProps) {
  const { locale } = await params;

  const titles = {
    en: 'Client Reviews & Testimonials | Techno Groop',
    pl: 'Opinie Klientów i Referencje | Techno Groop',
  };

  const descriptions = {
    en: 'Read reviews from satisfied clients of Techno Groop. 100% client satisfaction rate across 50+ completed electrical projects in Poland and Belgium.',
    pl: 'Przeczytaj opinie zadowolonych klientów Techno Groop. 100% satysfakcji klientów w ponad 50 zrealizowanych projektach elektrycznych w Polsce i Belgii.',
  };

  const keywords = {
    en: ['electrician reviews', 'electrical contractor testimonials', 'client feedback', 'Techno Groop reviews', 'trusted electrician Poland', 'recommended electrical company'],
    pl: ['opinie elektryk', 'referencje wykonawca elektryczny', 'opinie klientów', 'recenzje Techno Groop', 'zaufany elektryk Polska', 'polecana firma elektryczna'],
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: keywords[locale as keyof typeof keywords] || keywords.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `${siteConfig.url}/${locale}/reviews`,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/reviews`,
      languages: {
        en: `${siteConfig.url}/en/reviews`,
        pl: `${siteConfig.url}/pl/reviews`,
      },
    },
  };
}
