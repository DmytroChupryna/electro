'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('Nav');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/portfolio', label: t('portfolio') },
    { href: '/reviews', label: t('reviews') },
    { href: '/careers', label: t('careers') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm shadow-slate-100/50">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <img 
              src="/logo.png" 
              alt="Techno Groop" 
              className="h-10 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1 bg-slate-50 rounded-full px-2 py-1">
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 hover:text-slate-900 hover:bg-white px-4 py-2 rounded-full transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher variant="light" />
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-medium shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 transition-all"
            >
              {t('getQuote')}
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 text-slate-900 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-6 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-6 pt-4 border-t border-slate-100 mt-2">
              <LanguageSwitcher variant="light" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
