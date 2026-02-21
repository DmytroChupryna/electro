'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useDesign } from '@/context/DesignContext';
import PageWrapper, { Section, Heading, Text } from '@/components/PageWrapper';
import { cn } from '@/lib/utils';
import { MapPin, ArrowRight, Building2, Factory, Home, LucideIcon } from 'lucide-react';
import type { CMSProject, ProjectCategory } from '@/lib/payload';

// Category icon mapping
const categoryIcons: Record<ProjectCategory, LucideIcon> = {
  industrial: Factory,
  commercial: Building2,
  residential: Home,
};

interface PortfolioClientProps {
  projects: CMSProject[];
}

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const t = useTranslations('Portfolio');
  const tCTA = useTranslations('CTA');
  const { design } = useDesign();

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

      {/* Projects Grid - Data from CMS */}
      <Section variant="secondary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={cn(
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
            design === 'industrial' && 'gap-4'
          )}>
            {projects.map((project) => {
              const Icon = categoryIcons[project.category] || Building2;

              return (
                <Link key={project.id} href={`/portfolio/${project.slug}`} className={cn(
                  'group cursor-pointer block',
                  design === 'minimal' && 'bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-orange-200/30 hover:-translate-y-1 transition-all duration-300'
                )}>
                  <div className={cn(
                    'relative overflow-hidden',
                    design === 'corporate' && 'rounded-2xl aspect-[4/3] mb-5',
                    design === 'industrial' && 'border-4 border-slate-900 aspect-[4/3] mb-5',
                    design === 'minimal' && 'aspect-[4/3]'
                  )}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={cn(
                      'absolute inset-0',
                      design === 'corporate' && 'bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent',
                      design === 'industrial' && 'bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity',
                      design === 'minimal' && 'bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent'
                    )} />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={cn(
                        'inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium',
                        design === 'corporate' && 'rounded-full bg-slate-900/80 backdrop-blur-sm text-white',
                        design === 'industrial' && 'bg-amber-500 text-slate-900 font-black uppercase',
                        design === 'minimal' && 'rounded-full bg-white/95 backdrop-blur-md text-slate-800 shadow-lg shadow-slate-900/10'
                      )}>
                        <Icon className={cn('w-3.5 h-3.5', design === 'minimal' && 'text-orange-500')} />
                        {t(`categories.${project.category}`)}
                      </span>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={cn(
                        'px-3 py-1.5 text-xs font-medium',
                        design === 'corporate' && 'rounded-full bg-orange-600/80 backdrop-blur-sm text-white',
                        design === 'industrial' && 'bg-slate-900 text-amber-500 font-black',
                        design === 'minimal' && 'rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      )}>
                        {project.year}
                      </span>
                    </div>

                    {/* Industrial overlay */}
                    {design === 'industrial' && (
                      <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <h3 className="text-xl font-black text-white uppercase mb-2">{project.title}</h3>
                        <p className="text-amber-500 font-bold flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {project.location}
                        </p>
                      </div>
                    )}
                  </div>

                  {design !== 'industrial' && (
                    <div className={cn(design === 'minimal' && 'p-5')}>
                      <h3 className={cn(
                        'text-xl font-semibold mb-2 transition-colors',
                        design === 'corporate' && 'text-white group-hover:text-orange-400',
                        design === 'minimal' && 'text-slate-900 font-bold group-hover:text-orange-600'
                      )}>
                        {project.title}
                      </h3>
                      <p className={cn(
                        'text-sm flex items-center gap-1.5 mb-3',
                        design === 'corporate' && 'text-slate-400',
                        design === 'minimal' && 'text-slate-500'
                      )}>
                        <MapPin className={cn('w-4 h-4', design === 'minimal' && 'text-orange-500')} />
                        {project.location}
                      </p>
                      <Text variant="muted" className="text-sm leading-relaxed line-clamp-2">{project.description}</Text>
                    </div>
                  )}

                  {design === 'industrial' && (
                    <div className="px-2">
                      <h3 className="text-xl font-black text-slate-900 uppercase mb-2">{project.title}</h3>
                      <p className="text-slate-600 text-sm flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </p>
                    </div>
                  )}
                </Link>
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
            {t('interestedCta')}
          </h2>
          <p className={cn(
            'mb-8 max-w-xl mx-auto',
            design === 'corporate' && 'text-orange-100',
            design === 'industrial' && 'text-slate-700',
            design === 'minimal' && 'text-slate-300'
          )}>
            {tCTA('subtitle')}
          </p>
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
        </div>
      </Section>
    </PageWrapper>
  );
}
