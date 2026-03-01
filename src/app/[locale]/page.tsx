import HomeCClient from './home-c/HomeCClient';
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
  
  return <HomeCClient projects={projects} settings={settings} />;
}
