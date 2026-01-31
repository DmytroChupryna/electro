'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {
  ArrowUpRight,
  ArrowRight,
  Zap,
  Server,
  Settings,
  Droplets,
  Sun,
  Home,
  Shield,
  Award,
  HardHat,
  CheckCircle,
  MapPin,
  Factory,
  Menu,
  X,
  Quote,
} from 'lucide-react';
import { useState } from 'react';

// Minimal Light Header
function MinimalHeader() {
  const t = useTranslations('Nav');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/portfolio', label: t('portfolio') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-4 lg:px-8 py-5">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="text-lg font-medium tracking-tight text-slate-900">
              Techno Groop
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
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
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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

// Minimal Hero
function HeroSection() {
  const t = useTranslations('Hero');

  return (
    <section className="min-h-screen bg-white pt-32 flex items-center">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-slate-900 leading-[1.1] mb-8 tracking-tight">
              Engineering
              <br />
              <span className="font-medium">The Future.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-slate-500 max-w-xl mb-12 font-light leading-relaxed">
              {t('subtitle')}
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-6 mb-16">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-lg font-medium text-slate-900 border-b-2 border-slate-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors"
              >
                {t('cta')}
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 text-lg text-slate-500 hover:text-slate-900 transition-colors"
              >
                {t('ctaSecondary')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Minimal Stats */}
            <div className="flex gap-12 border-t border-slate-200 pt-8">
              <div>
                <div className="text-3xl font-light text-slate-900">22+</div>
                <div className="text-sm text-slate-400">{t('stats.employees')}</div>
              </div>
              <div>
                <div className="text-3xl font-light text-slate-900">50+</div>
                <div className="text-sm text-slate-400">{t('stats.projects')}</div>
              </div>
              <div>
                <div className="text-3xl font-light text-slate-900">2</div>
                <div className="text-sm text-slate-400">{t('stats.countries')}</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80"
                  alt="Electrical engineering"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating element */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-slate-900">VCA Certified</span>
                </div>
                <p className="text-sm text-slate-500">European safety standards compliance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Minimal Services
function ServicesSection() {
  const t = useTranslations('Services');

  const services = [
    { key: 'residential', icon: Home, number: '01' },
    { key: 'industrial', icon: Factory, number: '02' },
    { key: 'lowCurrent', icon: Server, number: '03' },
    { key: 'automation', icon: Settings, number: '04' },
    { key: 'plumbing', icon: Droplets, number: '05' },
    { key: 'solar', icon: Sun, number: '06' },
  ];

  return (
    <section className="py-32 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="text-sm text-blue-600 font-medium mb-4 tracking-wide uppercase">Services</p>
          <h2 className="text-3xl md:text-4xl font-light text-slate-900 leading-tight">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.key}
                className="group bg-white p-10 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-8">
                  <Icon className="w-8 h-8 text-slate-300 group-hover:text-blue-600 transition-colors" />
                  <span className="text-sm text-slate-300 font-light">{service.number}</span>
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-3">
                  {t(`${service.key}.title`)}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {t(`${service.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Portfolio
function PortfolioSection() {
  const t = useTranslations('Portfolio');

  const projects = [
    {
      key: 'logistics',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    },
    {
      key: 'office',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    },
    {
      key: 'residential',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-xl">
            <p className="text-sm text-blue-600 font-medium mb-4 tracking-wide uppercase">Portfolio</p>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900">{t('title')}</h2>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={project.key} className="group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-slate-100">
                <img
                  src={project.image}
                  alt={t(`projects.${project.key}.title`)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {t(`projects.${project.key}.title`)}
                  </h3>
                  <p className="text-sm text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {t(`projects.${project.key}.location`)}
                  </p>
                </div>
                <span className="text-sm text-slate-300 font-light">0{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Certificates
function CertificatesSection() {
  const t = useTranslations('Certificates');

  const certs = [
    { key: 'vca', icon: Award },
    { key: 'insurance', icon: Shield },
    { key: 'heights', icon: HardHat },
    { key: 'quality', icon: CheckCircle },
  ];

  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm text-blue-400 font-medium mb-4 tracking-wide uppercase">Safety & Quality</p>
          <h2 className="text-3xl md:text-4xl font-light text-white">{t('title')}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {certs.map((cert) => {
            const Icon = cert.icon;
            return (
              <div key={cert.key} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-sm font-medium text-white mb-1">{t(`${cert.key}.title`)}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Locations
function LocationsSection() {
  const t = useTranslations('Locations');

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm text-blue-600 font-medium mb-4 tracking-wide uppercase">Locations</p>
          <h2 className="text-3xl md:text-4xl font-light text-slate-900">{t('title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="p-10 rounded-3xl bg-slate-50 text-center">
            <div className="text-5xl mb-6">🇵🇱</div>
            <h3 className="text-xl font-medium text-slate-900 mb-2">{t('poland.title')}</h3>
            <p className="text-slate-500">{t('poland.cities')}</p>
          </div>
          <div className="p-10 rounded-3xl bg-slate-50 text-center">
            <div className="text-5xl mb-6">🇧🇪</div>
            <h3 className="text-xl font-medium text-slate-900 mb-2">{t('belgium.title')}</h3>
            <p className="text-slate-500">{t('belgium.cities')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA
function CTASection() {
  const t = useTranslations('CTA');

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6">{t('title')}</h2>
          <p className="text-slate-500 mb-10 text-lg">{t('subtitle')}</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              {t('button')}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+48578992316"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-900 font-medium border border-slate-200 hover:border-slate-300 transition-colors"
            >
              +48 578 992 316
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Page
export default function HomeCPage() {
  return (
    <div className="min-h-screen bg-white">
      <MinimalHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <CertificatesSection />
        <LocationsSection />
        <CTASection />
      </main>
      <Footer variant="light" />
    </div>
  );
}
