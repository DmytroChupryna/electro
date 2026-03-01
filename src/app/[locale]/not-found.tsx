'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Home, ArrowLeft, Search, Zap } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="relative mb-8">
            <div className="text-[180px] md:text-[240px] font-bold text-slate-100 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-2xl">
                <Zap className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t('title')}
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
            {t('description')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5" />
              {t('goHome')}
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              {t('goBack')}
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 mb-4">{t('helpfulLinks')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/services"
                className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
              >
                <Search className="w-4 h-4" />
                {t('services')}
              </Link>
              <Link
                href="/portfolio"
                className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
              >
                <Search className="w-4 h-4" />
                {t('portfolio')}
              </Link>
              <Link
                href="/contact"
                className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
              >
                <Search className="w-4 h-4" />
                {t('contact')}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
