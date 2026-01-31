'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {
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
} from 'lucide-react';
import { useState } from 'react';

// Industrial Bold Header
function IndustrialHeader() {
  const t = useTranslations('Nav');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/portfolio', label: t('portfolio') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-amber-500 border-b-4 border-slate-900">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-slate-900 p-2">
              <Zap className="w-8 h-8 text-amber-500 fill-current" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
              Techno Groop
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
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

// Industrial Hero
function HeroSection() {
  const t = useTranslations('Hero');

  return (
    <section className="min-h-screen bg-slate-100 pt-32 flex items-center relative overflow-hidden">
      {/* Industrial Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Diagonal Stripe */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-500 transform skew-x-[-12deg] translate-x-1/4" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Badge */}
            <div className="inline-block bg-amber-500 text-slate-900 font-black px-4 py-2 mb-8 uppercase tracking-widest text-sm transform -rotate-2">
              Industrial & Engineering
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9] mb-8">
              BUILDING
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">
                POWER
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-slate-600 max-w-lg mb-10 border-l-4 border-amber-500 pl-6 font-medium">
              {t('subtitle')}
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-4 bg-slate-900 text-white text-lg font-bold px-10 py-5 hover:bg-slate-800 transition-all hover:gap-6"
              >
                {t('cta')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-4 bg-transparent border-2 border-slate-900 text-slate-900 text-lg font-bold px-10 py-5 hover:bg-slate-900 hover:text-white transition-all"
              >
                {t('ctaSecondary')}
              </Link>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative hidden lg:block">
            <div className="w-full aspect-square bg-slate-200 border-4 border-slate-900 relative overflow-hidden">
              {/* Image from Unsplash - industrial construction */}
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Industrial electrical work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />

              {/* Stats overlay */}
              <div className="absolute bottom-0 right-0 bg-amber-500 p-8">
                <p className="text-5xl font-black text-slate-900">2023</p>
                <p className="font-bold uppercase text-slate-900">Est.</p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-4 border-amber-500" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-slate-900" />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-0 border-4 border-slate-900">
          <div className="p-6 bg-white border-r border-slate-900">
            <div className="text-4xl font-black text-slate-900">50+</div>
            <div className="text-sm font-bold uppercase text-slate-600">{t('stats.projects')}</div>
          </div>
          <div className="p-6 bg-white border-r border-slate-900">
            <div className="text-4xl font-black text-slate-900">22+</div>
            <div className="text-sm font-bold uppercase text-slate-600">{t('stats.employees')}</div>
          </div>
          <div className="p-6 bg-white border-r border-slate-900">
            <div className="text-4xl font-black text-slate-900">2</div>
            <div className="text-sm font-bold uppercase text-slate-600">{t('stats.countries')}</div>
          </div>
          <div className="p-6 bg-amber-500">
            <div className="text-4xl font-black text-slate-900">VCA</div>
            <div className="text-sm font-bold uppercase text-slate-900">Certified</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Industrial Services
function ServicesSection() {
  const t = useTranslations('Services');

  const services = [
    { key: 'residential', icon: Home },
    { key: 'industrial', icon: Factory },
    { key: 'lowCurrent', icon: Server },
    { key: 'automation', icon: Settings },
    { key: 'plumbing', icon: Droplets },
    { key: 'solar', icon: Sun },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16">
          <div className="inline-block bg-amber-500 text-slate-900 font-black px-4 py-2 mb-4 uppercase tracking-widest text-sm">
            What We Do
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-4 border-slate-900">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.key}
                className={`p-8 bg-white hover:bg-amber-50 transition-colors ${
                  index < 3 ? 'border-b-4 border-slate-900' : ''
                } ${index % 3 !== 2 ? 'border-r-4 border-slate-900' : ''}`}
              >
                <div className="w-16 h-16 bg-slate-900 flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3 uppercase">
                  {t(`${service.key}.title`)}
                </h3>
                <p className="text-slate-600">{t(`${service.key}.description`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Portfolio Grid
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
    <section className="py-24 bg-slate-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="inline-block bg-slate-900 text-amber-500 font-black px-4 py-2 mb-4 uppercase tracking-widest text-sm">
              Our Work
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              {t('title')}
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 bg-slate-900 text-white font-bold px-6 py-4 hover:bg-slate-800 transition-colors uppercase tracking-wide"
          >
            {t('viewAll')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project.key} className="group relative overflow-hidden border-4 border-slate-900">
              <div className="aspect-[4/3]">
                <img
                  src={project.image}
                  alt={t(`projects.${project.key}.title`)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-black text-white uppercase mb-2">
                    {t(`projects.${project.key}.title`)}
                  </h3>
                  <p className="text-amber-500 font-bold flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {t(`projects.${project.key}.location`)}
                  </p>
                </div>
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
          <div className="inline-block bg-amber-500 text-slate-900 font-black px-4 py-2 mb-4 uppercase tracking-widest text-sm">
            Safety First
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {certs.map((cert) => {
            const Icon = cert.icon;
            return (
              <div
                key={cert.key}
                className="p-8 bg-slate-800 border-l-4 border-amber-500"
              >
                <Icon className="w-12 h-12 text-amber-500 mb-4" />
                <h3 className="text-lg font-black text-white uppercase mb-2">
                  {t(`${cert.key}.title`)}
                </h3>
                <p className="text-slate-400 text-sm">{t(`${cert.key}.description`)}</p>
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
    <section className="py-24 bg-amber-500">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div className="p-8 bg-white border-4 border-slate-900">
            <div className="text-4xl mb-4">🇵🇱</div>
            <h3 className="text-2xl font-black text-slate-900 uppercase mb-4">{t('poland.title')}</h3>
            <p className="text-slate-600 font-medium flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {t('poland.cities')}
            </p>
          </div>
          <div className="p-8 bg-slate-900 border-4 border-slate-900">
            <div className="text-4xl mb-4">🇧🇪</div>
            <h3 className="text-2xl font-black text-amber-500 uppercase mb-4">{t('belgium.title')}</h3>
            <p className="text-slate-400 font-medium flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-500" />
              {t('belgium.cities')}
            </p>
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
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          {t('title')}
        </h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg">{t('subtitle')}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-4 bg-amber-500 text-slate-900 text-lg font-black px-10 py-5 hover:bg-amber-400 transition-colors uppercase tracking-wide"
          >
            {t('button')}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="tel:+48578992316"
            className="inline-flex items-center gap-4 border-4 border-amber-500 text-amber-500 text-lg font-black px-10 py-5 hover:bg-amber-500 hover:text-slate-900 transition-colors uppercase tracking-wide"
          >
            +48 578 992 316
          </a>
        </div>
      </div>
    </section>
  );
}

// Main Page
export default function HomeBPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <IndustrialHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <CertificatesSection />
        <LocationsSection />
        <CTASection />
      </main>
      <Footer variant="dark" />
    </div>
  );
}
