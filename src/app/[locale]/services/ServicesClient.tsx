'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import PageWrapper, { Section, Heading, Text } from '@/components/PageWrapper';
import {
  Server,
  Settings,
  Sun,
  Home,
  Factory,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';
import type { CMSService, IconName } from '@/lib/payload';

const serviceImages: Record<IconName, string> = {
  home: '/projects/residential-complex.jpg',
  factory: '/projects/logistics-center.jpg',
  server: '/projects/antwerp-prison/data-cabling.png',
  settings: '/projects/antwerp-prison/control-panel.png',
  sun: '/projects/solar-farm.jpg',
};

const iconComponents: Record<IconName, LucideIcon> = {
  home: Home,
  factory: Factory,
  server: Server,
  settings: Settings,
  sun: Sun,
};

interface ServicesClientProps {
  services: CMSService[];
}

export default function ServicesClient({ services }: ServicesClientProps) {
  const t = useTranslations('Services');
  const tCTA = useTranslations('CTA');
  const tLoc = useTranslations('Locations');
  const ui = useTranslations('UI');

  return (
    <PageWrapper>
      {/* Hero */}
      <Section variant="primary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <Text variant="accent" className="font-medium mb-4 tracking-wide uppercase text-sm">
              {ui('servicesLabel')}
            </Text>
            <Heading level={1} className="mb-6 leading-tight">
              {t('title')}
            </Heading>
            <Text variant="body" className="text-xl leading-relaxed">
              {t('subtitle')}
            </Text>
          </div>
        </div>
      </Section>

      {/* Services Grid */}
      <Section variant="secondary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const Icon = iconComponents[service.icon] || Home;
              const bgImage = serviceImages[service.icon] || '/projects/logistics-center.jpg';
              return (
                <div
                  key={service.id}
                  className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 aspect-[3/1]"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={bgImage}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/20" />
                  </div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-bold text-orange-300 bg-slate-900/60 px-3 py-1 rounded-full backdrop-blur-sm border border-orange-500/30">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors drop-shadow-lg">
                      {service.title}
                    </h3>
                    <p className="text-slate-100 text-base md:text-lg leading-relaxed line-clamp-2 drop-shadow-md">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Locations */}
      <Section variant="primary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">{tLoc('title')}</Heading>
            <Text variant="muted">{tLoc('subtitle')}</Text>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100">
              <img src="/coats/poland.png" alt="Poland" className="w-10 h-6 object-cover rounded" />
              <span className="font-semibold text-slate-900">{tLoc('poland')}</span>
            </div>
            <div className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100">
              <img src="/coats/belgium.png" alt="Belgium" className="w-10 h-6 object-cover rounded" />
              <span className="font-semibold text-slate-900">{tLoc('belgium')}</span>
            </div>
            <div className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100">
              <img src="/coats/eu-flag.png" alt="EU" className="w-10 h-6 object-cover rounded" />
              <span className="font-semibold text-slate-900">{tLoc('eu')}</span>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="accent" className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{tCTA('title')}</h2>
          <p className="mb-8 max-w-xl mx-auto text-slate-300">{tCTA('subtitle')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full bg-white text-orange-600 shadow-xl shadow-orange-900/20 hover:shadow-2xl hover:scale-105 transition-all"
            >
              {tCTA('button')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+48578992316"
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 transition-all"
            >
              +48 578 992 316
            </a>
          </div>
        </div>
      </Section>
    </PageWrapper>
  );
}
