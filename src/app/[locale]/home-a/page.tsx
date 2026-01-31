'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
  Building2,
  Factory,
  Users,
} from 'lucide-react';

// Hero Section - Corporate Dark Theme
function HeroSection() {
  const t = useTranslations('Hero');

  return (
    <section className="relative min-h-screen flex items-center bg-slate-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-amber-500/10 blur-[80px] rounded-full" />
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 animate-fade-in">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">{t('tagline')}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up">
            {t('title')}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed animate-fade-in-up delay-100">
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16 animate-fade-in-up delay-200">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400 transition-all hover:gap-3"
            >
              {t('cta')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-all border border-white/10"
            >
              {t('ctaSecondary')}
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up delay-300">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">50+</div>
              <div className="text-sm text-slate-400">{t('stats.projects')}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">22+</div>
              <div className="text-sm text-slate-400">{t('stats.employees')}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">2</div>
              <div className="text-sm text-slate-400">{t('stats.countries')}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">2023</div>
              <div className="text-sm text-slate-400">{t('stats.since')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Services Section
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
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.key}
                className="group p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <Icon className="w-7 h-7 text-blue-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {t(`${service.key}.title`)}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {t(`${service.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            {t('learnMore')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Portfolio Highlights Section
function PortfolioSection() {
  const t = useTranslations('Portfolio');

  const projects = [
    {
      key: 'logistics',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
      category: 'industrial',
    },
    {
      key: 'office',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      category: 'commercial',
    },
    {
      key: 'residential',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      category: 'residential',
    },
  ];

  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('title')}</h2>
            <p className="text-slate-400 max-w-xl">{t('subtitle')}</p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.key} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3]">
                {/* Image from Unsplash - Free to use */}
                <img
                  src={project.image}
                  alt={t(`projects.${project.key}.title`)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-500/80 text-white text-xs font-medium mb-2">
                    {t(`categories.${project.category}`)}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {t(`projects.${project.key}.title`)}
              </h3>
              <p className="text-slate-400 text-sm flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {t(`projects.${project.key}.location`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Certificates Section
function CertificatesSection() {
  const t = useTranslations('Certificates');

  const certificates = [
    { key: 'vca', icon: Award },
    { key: 'insurance', icon: Shield },
    { key: 'heights', icon: HardHat },
    { key: 'quality', icon: CheckCircle },
  ];

  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert) => {
            const Icon = cert.icon;
            return (
              <div
                key={cert.key}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{t(`${cert.key}.title`)}</h3>
                <p className="text-slate-400 text-sm">{t(`${cert.key}.description`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Locations Section
function LocationsSection() {
  const t = useTranslations('Locations');

  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-slate-400">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Poland */}
          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <span className="text-2xl">🇵🇱</span>
              </div>
              <h3 className="text-xl font-semibold text-white">{t('poland.title')}</h3>
            </div>
            <p className="text-slate-400 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              {t('poland.cities')}
            </p>
          </div>

          {/* Belgium */}
          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <span className="text-2xl">🇧🇪</span>
              </div>
              <h3 className="text-xl font-semibold text-white">{t('belgium.title')}</h3>
            </div>
            <p className="text-slate-400 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              {t('belgium.cities')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const t = useTranslations('CTA');

  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('title')}</h2>
        <p className="text-blue-100 mb-8 max-w-xl mx-auto">{t('subtitle')}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
          >
            {t('button')}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="tel:+48578992316"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-400 transition-colors"
          >
            {t('call')}: +48 578 992 316
          </a>
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function HomeAPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header variant="transparent" />
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
