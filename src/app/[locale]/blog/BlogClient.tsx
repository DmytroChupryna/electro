'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { CMSPost, CMSSettings } from '@/lib/payload';
import { BookOpen, Calendar, ArrowRight, Tag, Filter } from 'lucide-react';

interface BlogClientProps {
  posts: CMSPost[];
  settings?: CMSSettings;
}

const categoryColors: Record<string, string> = {
  guides: 'bg-blue-100 text-blue-700',
  news: 'bg-green-100 text-green-700',
  tips: 'bg-purple-100 text-purple-700',
  projects: 'bg-orange-100 text-orange-700',
};

export default function BlogClient({ posts, settings }: BlogClientProps) {
  const t = useTranslations('Blog');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'guides', 'news', 'tips', 'projects'];

  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-white via-orange-50/30 to-amber-50/40">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                {t('title')}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {t('title')}
              </h1>
              <p className="text-xl text-slate-600">{t('subtitle')}</p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white border-b border-slate-100 sticky top-[72px] z-40 backdrop-blur-xl bg-white/95">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t(`categories.${cat}`)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-lg text-slate-500">{t('noPosts')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <article className="h-full flex flex-col">
                      {/* Cover Image */}
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-slate-100 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200">
                        {post.coverImage ? (
                          <img
                            src={post.coverImage.url}
                            alt={post.coverImage.alt || post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                            <BookOpen className="w-12 h-12 text-orange-300" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${categoryColors[post.category] || 'bg-slate-100 text-slate-700'}`}>
                            {t(`categories.${post.category}`)}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                        </div>

                        <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-slate-600 mb-4 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag, i) => (
                              <span key={i} className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                                <Tag className="w-3 h-3" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 group-hover:gap-2 transition-all">
                          {t('readMore')}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </div>
  );
}
