import HomeCClient from './home-c/HomeCClient';
import JsonLd from '@/components/JsonLd';
import { siteConfig, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { getProjects, getSettings } from '@/lib/payload';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const [projects, settings] = await Promise.all([
    getProjects(locale, true),
    getSettings(locale),
  ]);

  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/${locale}` },
  ]);

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
      <JsonLd data={[breadcrumbData, faqData]} />
      <HomeCClient projects={projects} settings={settings} />
    </>
  );
}
