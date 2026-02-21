import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';
import { getPayload } from 'payload';
import config from '@/payload.config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const locales = ['en', 'pl'];
  const now = new Date();

  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/home-a', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/home-b', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/home-c', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/portfolio', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/reviews', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/careers', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  const staticSitemapEntries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const locale of locales) {
      staticSitemapEntries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page.path}`,
            pl: `${baseUrl}/pl${page.path}`,
          },
        },
      });
    }
  }

  const dynamicSitemapEntries: MetadataRoute.Sitemap = [];

  try {
    const payload = await getPayload({ config });

    const projects = await payload.find({
      collection: 'projects',
      limit: 1000,
      depth: 0,
    });

    for (const project of projects.docs) {
      for (const locale of locales) {
        dynamicSitemapEntries.push({
          url: `${baseUrl}/${locale}/portfolio/${project.id}`,
          lastModified: project.updatedAt ? new Date(project.updatedAt) : now,
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: {
            languages: {
              en: `${baseUrl}/en/portfolio/${project.id}`,
              pl: `${baseUrl}/pl/portfolio/${project.id}`,
            },
          },
        });
      }
    }
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error);
  }

  return [...staticSitemapEntries, ...dynamicSitemapEntries];
}
