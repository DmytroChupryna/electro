'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/portfolio', label: t('portfolio') },
    { href: '/reviews', label: t('reviews') },
    { href: '/contact', label: t('contact') },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-xl shadow-lg shadow-slate-900/5 border-b border-slate-100' 
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center group relative">
            <img 
              src="/logo.png" 
              alt="Techno Groop" 
              className={`w-auto transition-all duration-300 group-hover:scale-105 ${isScrolled ? 'h-9' : 'h-10'}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center gap-16">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-medium py-2 transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-orange-600'
                      : 'text-slate-700 hover:text-orange-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher variant="light" />
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 text-white text-sm font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {t('getQuote')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2.5 rounded-xl transition-all duration-200 ${
              isMobileMenuOpen 
                ? 'bg-orange-500 text-white' 
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-orange-50 text-orange-600 font-medium'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span>{link.label}</span>
                {isActive(link.href) && (
                  <span className="w-2 h-2 bg-orange-500 rounded-full" />
                )}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between px-4">
              <LanguageSwitcher variant="light" />
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold shadow-lg shadow-orange-500/25"
              >
                <Sparkles className="w-4 h-4" />
                {t('getQuote')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
