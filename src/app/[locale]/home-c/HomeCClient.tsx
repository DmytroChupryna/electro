'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {
  ArrowUpRight,
  ArrowRight,
  Zap,
  Server,
  Settings,
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

// Enhanced Minimal Header with subtle shadow and gradient
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
            {navLinks.map((link) => (
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
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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

// Enhanced Minimal Hero with gradient background and better cards
function HeroSection() {
  const t = useTranslations('Hero');
  const ui = useTranslations('UI');

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-amber-50/40 pt-32 flex items-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-slate-200/30 to-slate-100/30 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg shadow-slate-200/50 border border-slate-100 mb-8">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-slate-600">{ui('vcaBadge')}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-[1.1] mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">{t('title')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-slate-600 max-w-xl mb-12 leading-relaxed">
              {t('subtitle')}
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 mb-16">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 transition-all"
              >
                {t('cta')}
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-700 font-semibold shadow-lg shadow-slate-200/50 border border-slate-200 hover:border-orange-300 hover:text-orange-600 transition-all"
              >
                {t('ctaSecondary')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Stats with cards */}
            <div className="flex gap-4">
              <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 px-6 py-4">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">22+</div>
                <div className="text-sm text-slate-500">{t('stats.employees')}</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 px-6 py-4">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">50+</div>
                <div className="text-sm text-slate-500">{t('stats.projects')}</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 px-6 py-4">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">2</div>
                <div className="text-sm text-slate-500">{t('stats.countries')}</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-slate-100 shadow-2xl shadow-slate-300/50 ring-1 ring-slate-200">
                <img
                  src="/hero-main.webp"
                  alt="Professional electrician working on electrical panel installation"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex flex-wrap" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl shadow-slate-300/50 p-6 max-w-xs border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">{ui('vcaCertified')}</span>
                    <p className="text-xs text-slate-500">{ui('safetyExcellence')}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600">{ui('safetyCompliance')}</p>
              </div>
              {/* Top right floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl shadow-xl p-4">
                <div className="text-2xl font-bold">7+</div>
                <div className="text-xs text-slate-400">{ui('yearsExp')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Enhanced Minimal Services with cards and shadows
function ServicesSection() {
  const t = useTranslations('Services');
  const ui = useTranslations('UI');

  const services = [
    { key: 'residential', icon: Home, image: '/projects/residential-complex.jpg' },
    { key: 'industrial', icon: Factory, image: '/projects/logistics-center.jpg' },
    { key: 'lowCurrent', icon: Server, image: '/projects/antwerp-prison/data-cabling.png' },
    { key: 'automation', icon: Settings, image: '/projects/antwerp-prison/control-panel.png' },
    { key: 'solar', icon: Sun, image: '/projects/solar-farm.jpg' },
  ];

  return (
    <section className="py-32 bg-slate-50 relative">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            {ui('servicesLabel')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
            {t('title')}
          </h2>
          <p className="text-slate-600">{ui('comprehensiveSolutions')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 3).map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.key}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 aspect-[2/1]"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={service.image}
                    alt={t(`${service.key}.title`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/20" />
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-bold text-orange-400 bg-orange-500/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors drop-shadow-lg">
                    {t(`${service.key}.title`)}
                  </h3>
                  <p className="text-slate-100 text-base md:text-lg leading-relaxed line-clamp-2 drop-shadow-md">
                    {t(`${service.key}.description`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
          {services.slice(3).map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.key}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 aspect-[2/1]"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={service.image}
                    alt={t(`${service.key}.title`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/20" />
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-bold text-orange-400 bg-orange-500/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                      0{index + 4}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors drop-shadow-lg">
                    {t(`${service.key}.title`)}
                  </h3>
                  <p className="text-slate-100 text-base md:text-lg leading-relaxed line-clamp-2 drop-shadow-md">
                    {t(`${service.key}.description`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Enhanced Portfolio with cards
function PortfolioSection() {
  const t = useTranslations('Portfolio');
  const ui = useTranslations('UI');

  const projects = [
    {
      key: 'prison',
      image: '/projects/antwerp-prison/switchboard.png',
      categoryKey: 'industrial',
    },
    {
      key: 'logistics',
      image: '/projects/antwerp-prison/control-panel.png',
      categoryKey: 'commercial',
    },
    {
      key: 'office',
      image: '/projects/antwerp-prison/team-planning.png',
      categoryKey: 'automation',
    },
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-6">
              <Factory className="w-4 h-4" />
              {ui('portfolioLabel')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t('title')}</h2>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-700 font-medium shadow-lg shadow-slate-200/50 border border-slate-200 hover:border-orange-300 hover:text-orange-600 transition-all"
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={project.key} className="group">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-slate-100 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200">
                <img
                  src={project.image}
                  alt={t(`projects.${project.key}.title`)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-slate-700 shadow-lg">
                    {t(`categories.${project.categoryKey}`)}
                  </span>
                </div>
                {/* View button on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-6 py-3 rounded-full bg-white text-slate-900 font-medium shadow-xl">
                    {ui('viewProject')}
                  </span>
                </div>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
                    {t(`projects.${project.key}.title`)}
                  </h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    {t(`projects.${project.key}.location`)}
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">0{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Enhanced Certificates with gradient background
function CertificatesSection() {
  const t = useTranslations('Certificates');
  const ui = useTranslations('UI');

  const certs = [
    { key: 'vca', icon: Award, color: 'from-orange-500 to-amber-500' },
    { key: 'insurance', icon: Shield, color: 'from-slate-600 to-slate-700' },
    { key: 'heights', icon: HardHat, color: 'from-orange-500 to-amber-500' },
    { key: 'quality', icon: CheckCircle, color: 'from-slate-600 to-slate-700' },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-slate-700/30 to-slate-600/30 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-orange-400 text-sm font-medium mb-6 backdrop-blur-sm">
            <Shield className="w-4 h-4" />
            {ui('safetyQuality')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t('title')}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {certs.map((cert) => {
            const Icon = cert.icon;
            return (
              <div key={cert.key} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all group">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">{t(`${cert.key}.title`)}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Enhanced Locations with cards
function LocationsSection() {
  const t = useTranslations('Locations');
  const ui = useTranslations('UI');

  const countries = [
    { 
      key: 'poland', 
      coat: '/coats/poland.png',
      gradient: 'from-red-50 to-white',
      border: 'border-red-100',
      shadow: 'shadow-red-100/30 hover:shadow-red-200/40'
    },
    { 
      key: 'belgium', 
      coat: '/coats/belgium.png',
      gradient: 'from-yellow-50 to-white',
      border: 'border-yellow-100',
      shadow: 'shadow-yellow-100/30 hover:shadow-yellow-200/40'
    },
    { 
      key: 'eu', 
      coat: '/coats/eu-flag.png',
      gradient: 'from-blue-50 to-white',
      border: 'border-blue-100',
      shadow: 'shadow-blue-100/30 hover:shadow-blue-200/40'
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            {ui('locationsLabel')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t('title')}</h2>
          <p className="mt-4 text-lg text-slate-600">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {countries.map((country) => (
            <div 
              key={country.key}
              className={`group p-8 rounded-3xl bg-gradient-to-br ${country.gradient} border ${country.border} shadow-xl ${country.shadow} hover:shadow-2xl transition-all text-center`}
            >
              <div className="w-20 h-24 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <img 
                  src={country.coat} 
                  alt={t(country.key)}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{t(country.key)}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Enhanced Partners with better cards
function PartnersSection() {
  const ui = useTranslations('UI');
  const p = useTranslations('Partners');

  const partners = [
    {
      key: 'eegGroup',
      logo: '/partners/eeg-logo.png',
      url: 'https://eeg.be/en/',
    },
    {
      key: 'netlink',
      logo: '/partners/netlink-logo.png',
      url: 'https://www.netlink.be/',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            {ui('partnersLabel')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            {ui('trustedCollaborations')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {partners.map((partner) => (
            <a
              key={partner.key}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-orange-200/30 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Logo */}
              <div className="mb-8 h-28 flex items-center">
                <div className="bg-slate-400 border border-slate-500 rounded-2xl p-6 group-hover:bg-slate-500 transition-colors">
                  <img
                    src={partner.logo}
                    alt={`${p(`${partner.key}.name`)} logo`}
                    className="h-20 w-auto max-w-[260px] object-contain"
                  />
                </div>
              </div>

              <div className="mb-3">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {p(`${partner.key}.name`)}
                </h3>
                <span className="text-sm font-medium text-orange-500">{p(`${partner.key}.role`)}</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {p(`${partner.key}.description`)}
              </p>
              {/* Arrow indicator */}
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-400 group-hover:text-orange-500 transition-colors">
                {ui('visitWebsite')}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Enhanced CTA with gradient
function CTASection() {
  const t = useTranslations('CTA');
  const ui = useTranslations('UI');

  return (
    <section className="py-24 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
            <Zap className="w-4 h-4" />
            {ui('readyToStart')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('title')}</h2>
          <p className="text-white/80 mb-10 text-lg max-w-xl mx-auto">{t('subtitle')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-orange-600 font-semibold shadow-xl shadow-orange-900/20 hover:shadow-2xl hover:scale-105 transition-all"
            >
              {t('button')}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+48578992316"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium border border-white/30 hover:bg-white/20 transition-colors"
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
export default function HomeCClient() {
  return (
    <div className="min-h-screen bg-white">
      <MinimalHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <CertificatesSection />
        <LocationsSection />
        <PartnersSection />
        <CTASection />
      </main>
      <Footer variant="light" />
    </div>
  );
}
