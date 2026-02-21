'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useDesign } from '@/context/DesignContext';
import PageWrapper, { Section, Heading, Text } from '@/components/PageWrapper';
import { cn } from '@/lib/utils';
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

// Service images for minimal design
const serviceImages: Record<IconName, string> = {
  home: '/projects/residential-complex.jpg',
  factory: '/projects/logistics-center.jpg',
  server: '/projects/antwerp-prison/data-cabling.png',
  settings: '/projects/antwerp-prison/control-panel.png',
  sun: '/projects/solar-farm.jpg',
};

// Icon components mapping
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
  const { design } = useDesign();

  return (
    <PageWrapper>
      {/* Hero */}
      <Section variant="primary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            {design === 'industrial' ? (
              <div className="inline-block bg-amber-500 text-slate-900 font-black px-4 py-2 mb-4 uppercase tracking-widest text-sm">
                {ui('servicesLabel')}
              </div>
            ) : (
              <Text variant="accent" className="font-medium mb-4 tracking-wide uppercase text-sm">
                {ui('servicesLabel')}
              </Text>
            )}
            <Heading level={1} className="mb-6 leading-tight">
              {t('title')}
            </Heading>
            <Text variant="body" className="text-xl leading-relaxed">
              {t('subtitle')}
            </Text>
          </div>
        </div>
      </Section>

      {/* Services Grid - Data from CMS */}
      <Section variant="secondary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Minimal design - with background images */}
          {design === 'minimal' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => {
                const Icon = iconComponents[service.icon] || Home;
                const bgImage = serviceImages[service.icon] || '/projects/logistics-center.jpg';
                return (
                  <div
                    key={service.id}
                    className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 aspect-[5/2]"
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
          )}

          {/* Corporate and Industrial designs */}
          {design !== 'minimal' && (
            <div className={cn(
              'grid grid-cols-1 lg:grid-cols-2 gap-8',
              design === 'industrial' && 'gap-0 border-4 border-slate-900'
            )}>
              {services.map((service, index) => {
                const Icon = iconComponents[service.icon] || Home;
                return (
                  <div
                    key={service.id}
                    className={cn(
                      'group relative overflow-hidden transition-all',
                      design === 'corporate' && 'rounded-2xl bg-slate-900 border border-slate-800 hover:border-orange-500/50',
                      design === 'industrial' && cn(
                        'bg-white hover:bg-amber-50',
                        index < 4 && 'border-b-4 border-slate-900',
                        index % 2 === 0 && 'border-r-4 border-slate-900'
                      )
                    )}
                  >
                    {/* Background Image - only for corporate */}
                    {design === 'corporate' && service.image && (
                      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                        <img
                          src={service.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="relative p-10">
                      <div className="flex items-start gap-6">
                        <div className={cn(
                          'w-16 h-16 flex items-center justify-center flex-shrink-0 transition-all',
                          design === 'corporate' && 'rounded-xl bg-orange-500/10 group-hover:bg-orange-600',
                          design === 'industrial' && 'bg-slate-900'
                        )}>
                          <Icon className={cn(
                            'w-8 h-8 transition-colors',
                            design === 'corporate' && 'text-orange-400 group-hover:text-white',
                            design === 'industrial' && 'text-amber-500'
                          )} />
                        </div>
                        <div>
                          <span className={cn(
                            'text-sm font-medium mb-2 block',
                            design === 'corporate' && 'text-slate-500',
                            design === 'industrial' && 'text-slate-400'
                          )}>
                            0{index + 1}
                          </span>
                          <h3 className={cn(
                            'text-2xl font-bold mb-4',
                            design === 'corporate' && 'text-white',
                            design === 'industrial' && 'text-slate-900 font-black uppercase'
                          )}>
                            {service.title}
                          </h3>
                          <Text variant="body" className="leading-relaxed">
                            {service.description}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
            <div className={cn(
              'flex items-center gap-4 px-8 py-4',
              design === 'corporate' && 'rounded-full bg-slate-950 border border-slate-800',
              design === 'industrial' && 'bg-white border-4 border-slate-900',
              design === 'minimal' && 'rounded-2xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100'
            )}>
              <img src="/coats/poland.png" alt="Poland" className="w-10 h-6 object-cover rounded" />
              <span className={cn(
                'font-semibold',
                design === 'corporate' && 'text-white',
                design !== 'corporate' && 'text-slate-900'
              )}>{tLoc('poland')}</span>
            </div>
            <div className={cn(
              'flex items-center gap-4 px-8 py-4',
              design === 'corporate' && 'rounded-full bg-slate-950 border border-slate-800',
              design === 'industrial' && 'bg-amber-500 border-4 border-slate-900',
              design === 'minimal' && 'rounded-2xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100'
            )}>
              <img src="/coats/belgium.png" alt="Belgium" className="w-10 h-6 object-cover rounded" />
              <span className={cn(
                'font-semibold',
                design === 'corporate' && 'text-white',
                design !== 'corporate' && 'text-slate-900'
              )}>{tLoc('belgium')}</span>
            </div>
            <div className={cn(
              'flex items-center gap-4 px-8 py-4',
              design === 'corporate' && 'rounded-full bg-slate-950 border border-slate-800',
              design === 'industrial' && 'bg-white border-4 border-slate-900',
              design === 'minimal' && 'rounded-2xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100'
            )}>
              <img src="/coats/eu-flag.png" alt="EU" className="w-10 h-6 object-cover rounded" />
              <span className={cn(
                'font-semibold',
                design === 'corporate' && 'text-white',
                design !== 'corporate' && 'text-slate-900'
              )}>{tLoc('eu')}</span>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="accent" className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className={cn(
            'text-3xl md:text-4xl font-bold mb-4',
            design === 'industrial' && 'text-slate-900 font-black uppercase'
          )}>
            {tCTA('title')}
          </h2>
          <p className={cn(
            'mb-8 max-w-xl mx-auto',
            design === 'corporate' && 'text-orange-100',
            design === 'industrial' && 'text-slate-700',
            design === 'minimal' && 'text-slate-300'
          )}>
            {tCTA('subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className={cn(
                'inline-flex items-center gap-2 px-8 py-4 font-semibold transition-all',
                design === 'corporate' && 'rounded-full bg-white text-orange-600 hover:bg-orange-50',
                design === 'industrial' && 'bg-slate-900 text-amber-500 hover:bg-slate-800 font-black uppercase',
                design === 'minimal' && 'rounded-full bg-white text-orange-600 shadow-xl shadow-orange-900/20 hover:shadow-2xl hover:scale-105'
              )}
            >
              {tCTA('button')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+48578992316"
              className={cn(
                'inline-flex items-center gap-2 px-8 py-4 font-semibold transition-all',
                design === 'corporate' && 'rounded-full bg-orange-500 text-white hover:bg-orange-400',
                design === 'industrial' && 'border-4 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-amber-500 font-black uppercase',
                design === 'minimal' && 'rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20'
              )}
            >
              +48 578 992 316
            </a>
          </div>
        </div>
      </Section>
    </PageWrapper>
  );
}
