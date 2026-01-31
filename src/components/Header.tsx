'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Menu, X, Zap } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useDesign } from '@/context/DesignContext';

interface HeaderProps {
  variant?: 'dark' | 'light' | 'transparent';
}

export default function Header({ variant }: HeaderProps) {
  const t = useTranslations('Nav');
  const { design } = useDesign();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auto-determine variant based on design context if not specified
  const effectiveVariant = variant || {
    corporate: 'dark' as const,
    industrial: 'light' as const,
    minimal: 'light' as const,
  }[design];

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
    { href: '/careers', label: t('careers') },
    { href: '/contact', label: t('contact') },
  ];

  const isDark = effectiveVariant === 'dark' || (effectiveVariant === 'transparent' && isScrolled);
  const isTransparent = effectiveVariant === 'transparent' && !isScrolled;

  // Industrial-specific header
  if (design === 'industrial') {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-amber-500 border-b-4 border-slate-900">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/home-b" className="flex items-center gap-3">
              <div className="bg-slate-900 p-2">
                <Zap className="w-8 h-8 text-amber-500 fill-current" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
                Techno Groop
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.slice(0, 4).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-bold uppercase tracking-wide text-slate-900 hover:text-slate-700 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <LanguageSwitcher variant="light" />
              <Link
                href="/contact"
                className="px-6 py-3 bg-slate-900 text-amber-500 font-bold uppercase tracking-wide hover:bg-slate-800 transition-colors"
              >
                {t('getQuote')}
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-900"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>

          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 py-4 bg-slate-900">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 px-4 text-amber-500 font-bold uppercase border-b border-slate-800"
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 pt-4">
                <LanguageSwitcher variant="dark" />
              </div>
            </div>
          )}
        </div>
      </header>
    );
  }

  // Minimal-specific header
  if (design === 'minimal') {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-4 lg:px-8 py-5">
          <nav className="flex items-center justify-between">
            <Link href="/home-c" className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              <span className="text-lg font-medium tracking-tight text-slate-900">
                Techno Groop
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-10">
              {navLinks.slice(0, 4).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <LanguageSwitcher variant="light" />
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm font-medium text-slate-900 border-b border-slate-900 pb-0.5 hover:text-blue-600 hover:border-blue-600 transition-colors"
              >
                {t('getQuote')}
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-900"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>

          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 py-4 bg-white rounded-2xl shadow-xl">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 px-6 text-slate-700 hover:bg-slate-50 transition-colors"
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

  // Corporate (default) header
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'py-3 shadow-lg' : 'py-5',
        isDark && 'bg-slate-900/95 backdrop-blur-md',
        effectiveVariant === 'light' && 'bg-white/95 backdrop-blur-md border-b border-slate-100',
        isTransparent && 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/home-a"
            className="flex items-center gap-3 group"
            aria-label="Techno Groop - Home"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center transition-transform group-hover:scale-105">
              <Zap className="w-6 h-6 text-white fill-current" />
            </div>
            <span
              className={cn(
                'text-xl font-bold tracking-tight transition-colors',
                isDark || isTransparent ? 'text-white' : 'text-slate-900'
              )}
            >
              TECHNO GROOP
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  isDark || isTransparent
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher variant={isDark || isTransparent ? 'dark' : 'light'} />
            <Link
              href="/contact"
              className={cn(
                'px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200',
                isDark || isTransparent
                  ? 'bg-amber-500 text-slate-900 hover:bg-amber-400'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              )}
            >
              {t('getQuote')}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <LanguageSwitcher variant={isDark || isTransparent ? 'dark' : 'light'} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'p-2 rounded-lg transition-colors',
                isDark || isTransparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-slate-900 hover:bg-slate-100'
              )}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={cn(
              'lg:hidden mt-4 py-4 rounded-2xl animate-fade-in',
              isDark ? 'bg-slate-800' : 'bg-white shadow-xl'
            )}
          >
            <div className="flex flex-col gap-2 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'py-3 px-4 rounded-lg text-base font-medium transition-colors',
                    isDark
                      ? 'text-slate-200 hover:bg-slate-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 py-3 px-4 rounded-lg text-base font-semibold text-center bg-amber-500 text-slate-900"
              >
                {t('getQuote')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
