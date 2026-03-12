'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { CMSPost, CMSSettings } from '@/lib/payload';
import { Calendar, ArrowLeft, Tag, User } from 'lucide-react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from 'lexical';

interface ArticleClientProps {
  post: CMSPost;
  settings?: CMSSettings;
}

const categoryColors: Record<string, string> = {
  guides: 'bg-blue-100 text-blue-700',
  news: 'bg-green-100 text-green-700',
  tips: 'bg-purple-100 text-purple-700',
  projects: 'bg-orange-100 text-orange-700',
};

export default function ArticleClient({ post, settings }: ArticleClientProps) {
  const t = useTranslations('Blog');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-12 bg-gradient-to-br from-white via-orange-50/30 to-amber-50/40">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-orange-600 transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('backToBlog')}
              </Link>

              <div className="flex items-center gap-3 mb-6">
                <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${categoryColors[post.category] || 'bg-slate-100 text-slate-700'}`}>
                  {t(`categories.${post.category}`)}
                </span>
                <span className="flex items-center gap-1 text-sm text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-xl text-slate-600 mb-8">{post.excerpt}</p>
              )}

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="container mx-auto px-4 lg:px-8 -mt-4 mb-12">
            <div className="max-w-4xl mx-auto">
              <div className="aspect-[2/1] rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50 ring-1 ring-slate-200">
                <img
                  src={post.coverImage.url}
                  alt={post.coverImage.alt || post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-lg">
                {post.content ? (
                  <RichText data={post.content as SerializedEditorState} />
                ) : null}
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-200">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="w-4 h-4 text-slate-400" />
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-full bg-slate-100 text-sm text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to blog */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-medium shadow-lg shadow-orange-500/25 hover:shadow-xl hover:bg-orange-600 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('backToBlog')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </div>
  );
}
