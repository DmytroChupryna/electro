import { getPostBySlug, getSettings } from '@/lib/payload';
import { notFound } from 'next/navigation';
import ArticleClient from './ArticleClient';
import JsonLd from '@/components/JsonLd';
import { siteConfig, generateBreadcrumbSchema, generateArticleSchema } from '@/lib/seo';

interface ArticlePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params;

  const [post, settings] = await Promise.all([
    getPostBySlug(slug, locale),
    getSettings(locale),
  ]);

  if (!post) {
    notFound();
  }

  const articleUrl = `${siteConfig.url}/${locale}/blog/${slug}`;

  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/${locale}` },
    { name: 'Blog', url: `${siteConfig.url}/${locale}/blog` },
    { name: post.title, url: articleUrl },
  ]);

  const articleData = generateArticleSchema({
    title: post.title,
    excerpt: post.excerpt,
    url: articleUrl,
    image: post.coverImage?.url,
    datePublished: post.publishedAt,
    author: post.author,
    locale,
  });

  return (
    <>
      <JsonLd data={[breadcrumbData, articleData]} />
      <ArticleClient post={post} settings={settings} />
    </>
  );
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    return {
      title: locale === 'pl' ? 'Artykuł nie znaleziony' : 'Article Not Found',
    };
  }

  return {
    title: `${post.title} | Techno Groop Blog`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/${locale}/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.coverImage?.url ? [{ url: post.coverImage.url, alt: post.coverImage.alt || post.title }] : undefined,
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/blog/${slug}`,
      languages: {
        en: `${siteConfig.url}/en/blog/${slug}`,
        pl: `${siteConfig.url}/pl/blog/${slug}`,
      },
    },
  };
}
