'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useDesign } from '@/context/DesignContext';
import PageWrapper, { Section, Heading, Text } from '@/components/PageWrapper';
import { cn } from '@/lib/utils';
import { MapPin, ArrowRight, Building2, Factory, Home } from 'lucide-react';

export default function PortfolioPage() {
  const t = useTranslations('Portfolio');
  const tCTA = useTranslations('CTA');
  const { design } = useDesign();

  const projects = [
    {
      id: 1,
      titleKey: 'logistics',
      category: 'industrial',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
      icon: Factory,
      year: '2024',
    },
    {
      id: 2,
      titleKey: 'office',
      category: 'commercial',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      icon: Building2,
      year: '2024',
    },
    {
      id: 3,
      titleKey: 'residential',
      category: 'residential',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      icon: Home,
      year: '2023',
    },
    {
      id: 4,
      title: 'Shopping Mall Electrical',
      location: 'Brussels, Belgium',
      description: 'Complete electrical infrastructure for a 25,000 m² shopping center.',
      category: 'commercial',
      image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd17f?w=800&q=80',
      icon: Building2,
      year: '2024',
    },
    {
      id: 5,
      title: 'Solar Farm Installation',
      location: 'Warsaw Region, Poland',
      description: 'Photovoltaic system installation for agricultural complex.',
      category: 'industrial',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
      icon: Factory,
      year: '2023',
    },
    {
      id: 6,
      title: 'Smart Building Automation',
      location: 'Antwerp, Belgium',
      description: 'KNX and BMS integration for modern office complex.',
      category: 'commercial',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      icon: Building2,
      year: '2024',
    },
  ];

  return (
    <PageWrapper>
      {/* Hero */}
      <Section variant="primary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            {design === 'industrial' ? (
              <div className="inline-block bg-amber-500 text-slate-900 font-black px-4 py-2 mb-4 uppercase tracking-widest text-sm">
                Our Work
              </div>
            ) : (
              <Text variant="accent" className="font-medium mb-4 tracking-wide uppercase text-sm">
                Our Work
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

      {/* Category Filter */}
      <Section variant="secondary" className="py-8 border-b border-slate-800">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-4">
            {['all', 'industrial', 'commercial', 'residential'].map((cat, i) => (
              <button
                key={cat}
                className={cn(
                  'px-6 py-2 text-sm font-medium transition-colors',
                  design === 'corporate' && cn(
                    'rounded-full',
                    i === 0 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                  ),
                  design === 'industrial' && cn(
                    'border-4 border-slate-900',
                    i === 0 ? 'bg-amber-500 text-slate-900' : 'bg-white text-slate-900 hover:bg-amber-50'
                  ),
                  design === 'minimal' && cn(
                    'rounded-full',
                    i === 0 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  )
                )}
              >
                {t(`categories.${cat}`)}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Projects Grid */}
      <Section variant="secondary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={cn(
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
            design === 'industrial' && 'gap-4'
          )}>
            {projects.map((project, index) => {
              const Icon = project.icon;
              const title = project.titleKey
                ? t(`projects.${project.titleKey}.title`)
                : project.title;
              const location = project.titleKey
                ? t(`projects.${project.titleKey}.location`)
                : project.location;
              const description = project.titleKey
                ? t(`projects.${project.titleKey}.description`)
                : project.description;

              return (
                <div key={project.id} className="group cursor-pointer">
                  <div className={cn(
                    'relative overflow-hidden mb-5',
                    design === 'corporate' && 'rounded-2xl aspect-[4/3]',
                    design === 'industrial' && 'border-4 border-slate-900 aspect-[4/3]',
                    design === 'minimal' && 'rounded-2xl aspect-[4/3]'
                  )}>
                    <img
                      src={project.image}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={cn(
                      'absolute inset-0',
                      design === 'corporate' && 'bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent',
                      design === 'industrial' && 'bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity',
                      design === 'minimal' && 'bg-gradient-to-t from-white/90 via-transparent to-transparent'
                    )} />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={cn(
                        'inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium',
                        design === 'corporate' && 'rounded-full bg-slate-900/80 backdrop-blur-sm text-white',
                        design === 'industrial' && 'bg-amber-500 text-slate-900 font-black uppercase',
                        design === 'minimal' && 'rounded-full bg-white/80 backdrop-blur-sm text-slate-700'
                      )}>
                        <Icon className="w-3.5 h-3.5" />
                        {t(`categories.${project.category}`)}
                      </span>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={cn(
                        'px-3 py-1.5 text-xs font-medium',
                        design === 'corporate' && 'rounded-full bg-blue-600/80 backdrop-blur-sm text-white',
                        design === 'industrial' && 'bg-slate-900 text-amber-500 font-black',
                        design === 'minimal' && 'rounded-full bg-blue-100 text-blue-700'
                      )}>
                        {project.year}
                      </span>
                    </div>

                    {/* Industrial overlay */}
                    {design === 'industrial' && (
                      <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <h3 className="text-xl font-black text-white uppercase mb-2">{title}</h3>
                        <p className="text-amber-500 font-bold flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {location}
                        </p>
                      </div>
                    )}
                  </div>

                  {design !== 'industrial' && (
                    <>
                      <h3 className={cn(
                        'text-xl font-semibold mb-2 transition-colors',
                        design === 'corporate' && 'text-white group-hover:text-blue-400',
                        design === 'minimal' && 'text-slate-900 group-hover:text-blue-600'
                      )}>
                        {title}
                      </h3>
                      <p className={cn(
                        'text-sm flex items-center gap-1 mb-3',
                        design === 'corporate' && 'text-slate-400',
                        design === 'minimal' && 'text-slate-400'
                      )}>
                        <MapPin className="w-4 h-4" />
                        {location}
                      </p>
                      <Text variant="muted" className="text-sm leading-relaxed">{description}</Text>
                    </>
                  )}

                  {design === 'industrial' && (
                    <div className="px-2">
                      <h3 className="text-xl font-black text-slate-900 uppercase mb-2">{title}</h3>
                      <p className="text-slate-600 text-sm flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {location}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
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
            Interested in working with us?
          </h2>
          <p className={cn(
            'mb-8 max-w-xl mx-auto',
            design === 'corporate' && 'text-blue-100',
            design === 'industrial' && 'text-slate-700',
            design === 'minimal' && 'text-slate-300'
          )}>
            {tCTA('subtitle')}
          </p>
          <Link
            href="/contact"
            className={cn(
              'inline-flex items-center gap-2 px-8 py-4 font-semibold transition-colors',
              design === 'corporate' && 'rounded-full bg-white text-blue-600 hover:bg-blue-50',
              design === 'industrial' && 'bg-slate-900 text-amber-500 hover:bg-slate-800 font-black uppercase',
              design === 'minimal' && 'rounded-full bg-white text-slate-900 hover:bg-slate-100'
            )}
          >
            {tCTA('button')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </Section>
    </PageWrapper>
  );
}
