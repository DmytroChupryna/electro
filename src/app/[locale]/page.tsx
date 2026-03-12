import HomeCClient from './home-c/HomeCClient';
import JsonLd from '@/components/JsonLd';
import { siteConfig, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { getProjects, getSettings } from '@/lib/payload';
import { getTranslations } from 'next-intl/server';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const [projects, settings] = await Promise.all([
    getProjects(locale, true),
    getSettings(locale),
  ]);

  const faqT = await getTranslations({ locale, namespace: 'FAQ' });

  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/${locale}` },
  ]);

  const faqData = generateFAQSchema(
    Array.from({ length: 10 }, (_, i) => ({
      question: faqT(`q${i + 1}`),
      answer: faqT(`a${i + 1}`),
    }))
  );

  return (
    <>
      <JsonLd data={[breadcrumbData, faqData]} />
      <HomeCClient projects={projects} settings={settings} />
    </>
  );
}
