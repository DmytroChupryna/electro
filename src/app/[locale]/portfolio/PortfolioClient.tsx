'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import PageWrapper, { Section, Heading, Text } from '@/components/PageWrapper';
import { MapPin, ArrowRight, Building2, Factory, Home, LucideIcon } from 'lucide-react';
import type { CMSProject, ProjectCategory } from '@/lib/payload';

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

  return (
    <PageWrapper>
      {/* Hero */}
      <Section variant="primary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <Text variant="accent" className="font-medium mb-4 tracking-wide uppercase text-sm">
              Our Work
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

      {/* Projects Grid */}
      <Section variant="secondary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const Icon = categoryIcons[project.category] || Building2;

              return (
                <Link 
                  key={project.id} 
                  href={`/portfolio/${project.slug}`} 
                  className="group cursor-pointer block bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-orange-200/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full bg-white/95 backdrop-blur-md text-slate-800 shadow-lg shadow-slate-900/10">
                        <Icon className="w-3.5 h-3.5 text-orange-500" />
                        {t(`categories.${project.category}`)}
                      </span>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/30">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-orange-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm flex items-center gap-1.5 mb-3 text-slate-500">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      {project.location}
                    </p>
                    <Text variant="muted" className="text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </Text>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="accent" className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('interestedCta')}</h2>
          <p className="mb-8 max-w-xl mx-auto text-slate-300">{tCTA('subtitle')}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full bg-white text-orange-600 shadow-xl shadow-orange-900/20 hover:shadow-2xl hover:scale-105 transition-all"
          >
            {tCTA('button')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </Section>
    </PageWrapper>
  );
}
