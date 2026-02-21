'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useDesign } from '@/context/DesignContext';
import PageWrapper, { Section, Heading, Text } from '@/components/PageWrapper';
import { cn } from '@/lib/utils';
import {
  MapPin,
  Users,
  TrendingUp,
  GraduationCap,
  Globe,
  ArrowRight,
  Mail,
  Clock,
} from 'lucide-react';

export default function CareersClient() {
  const t = useTranslations('Careers');
  const { design } = useDesign();

  const benefits = [
    { key: 'salary', icon: TrendingUp },
    { key: 'growth', icon: Users },
    { key: 'training', icon: GraduationCap },
    { key: 'international', icon: Globe },
  ];

  const positions = ['electrician', 'foreman', 'technician'];

  return (
    <PageWrapper>
      {/* Hero */}
      <Section variant="primary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            {design === 'industrial' ? (
              <div className="inline-block bg-amber-500 text-slate-900 font-black px-4 py-2 mb-4 uppercase tracking-widest text-sm">
                Careers
              </div>
            ) : (
              <Text variant="accent" className="font-medium mb-4 tracking-wide uppercase text-sm">
                Careers
              </Text>
            )}
            <Heading level={1} className="mb-6 leading-tight">
              {t('title')}
            </Heading>
            <Text variant="body" className="text-xl leading-relaxed">
              {t('description')}
            </Text>
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section variant="secondary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <Heading level={2} className="mb-12">{t('benefits.title')}</Heading>

          <div className={cn(
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
            design === 'industrial' && 'gap-0 border-4 border-slate-900'
          )}>
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.key}
                  className={cn(
                    'p-6',
                    design === 'corporate' && 'rounded-2xl bg-slate-900 border border-slate-800',
                    design === 'industrial' && cn(
                      'bg-white',
                      i < 3 && 'border-r-4 border-slate-900'
                    ),
                    design === 'minimal' && 'rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-orange-200/30 hover:-translate-y-1 transition-all duration-300'
                  )}
                >
                  <div className={cn(
                    'w-12 h-12 flex items-center justify-center mb-4',
                    design === 'corporate' && 'rounded-xl bg-orange-500/10',
                    design === 'industrial' && 'bg-slate-900',
                    design === 'minimal' && 'rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/25'
                  )}>
                    <Icon className={cn(
                      'w-6 h-6',
                      design === 'corporate' && 'text-orange-400',
                      design === 'industrial' && 'text-amber-500',
                      design === 'minimal' && 'text-white'
                    )} />
                  </div>
                  <h3 className={cn(
                    'text-lg font-semibold',
                    design === 'corporate' && 'text-white',
                    design === 'industrial' && 'text-slate-900 font-black uppercase',
                    design === 'minimal' && 'text-slate-900'
                  )}>
                    {t(`benefits.${benefit.key}`)}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Open Positions */}
      <Section variant="primary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <Heading level={2} className="mb-12">{t('positions.title')}</Heading>

          <div className="space-y-4">
            {positions.map((position) => (
              <div
                key={position}
                className={cn(
                  'p-6 transition-colors',
                  design === 'corporate' && 'rounded-2xl bg-slate-950 border border-slate-800 hover:border-orange-500/30',
                  design === 'industrial' && 'bg-white border-4 border-slate-900 hover:bg-amber-50',
                  design === 'minimal' && 'rounded-3xl bg-white shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300'
                )}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className={cn(
                      'text-xl font-semibold mb-2',
                      design === 'corporate' && 'text-white',
                      design === 'industrial' && 'text-slate-900 font-black uppercase',
                      design === 'minimal' && 'text-slate-900'
                    )}>
                      {t(`positions.${position}.title`)}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className={cn(
                        'flex items-center gap-1',
                        design === 'corporate' && 'text-slate-400',
                        design !== 'corporate' && 'text-slate-500'
                      )}>
                        <MapPin className="w-4 h-4" />
                        {t(`positions.${position}.location`)}
                      </span>
                      <span className={cn(
                        'flex items-center gap-1',
                        design === 'corporate' && 'text-slate-400',
                        design !== 'corporate' && 'text-slate-500'
                      )}>
                        <Clock className="w-4 h-4" />
                        {t(`positions.${position}.type`)}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className={cn(
                      'inline-flex items-center gap-2 px-6 py-3 font-medium transition-colors',
                      design === 'corporate' && 'rounded-full bg-orange-600 text-white hover:bg-orange-700',
                      design === 'industrial' && 'bg-amber-500 text-slate-900 hover:bg-amber-400 font-black uppercase',
                      design === 'minimal' && 'rounded-full bg-orange-600 text-white hover:bg-orange-700'
                    )}
                  >
                    {t('cta')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Open application */}
          <div className={cn(
            'mt-12 p-8',
            design === 'corporate' && 'rounded-2xl bg-gradient-to-r from-orange-600/10 to-slate-950 border border-orange-500/20',
            design === 'industrial' && 'bg-amber-500 border-4 border-slate-900',
            design === 'minimal' && 'rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 shadow-xl shadow-orange-100/50'
          )}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className={cn(
                  'text-xl font-semibold mb-2',
                  design === 'corporate' && 'text-white',
                  design === 'industrial' && 'text-slate-900 font-black uppercase',
                  design === 'minimal' && 'text-slate-900'
                )}>
                  {t('noPosition')}
                </h3>
                <a
                  href="mailto:info@technogroop.com"
                  className={cn(
                    'flex items-center gap-2 transition-colors',
                    design === 'corporate' && 'text-orange-400 hover:text-orange-300',
                    design === 'industrial' && 'text-slate-900 hover:text-slate-700',
                    design === 'minimal' && 'text-orange-600 hover:text-orange-500'
                  )}
                >
                  <Mail className="w-5 h-5" />
                  info@technogroop.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Why Join Us */}
      <Section variant="secondary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Heading level={2} className="mb-8">Why Join Techno Groop?</Heading>
            <div className={cn(
              'grid grid-cols-1 md:grid-cols-3 gap-8',
              design === 'industrial' && 'border-4 border-slate-900'
            )}>
              {[
                { value: '22→50+', label: 'Growing team' },
                { value: 'PL+BE', label: 'International projects' },
                { value: 'VCA', label: 'Certified safety' },
              ].map((stat, i) => (
                <div 
                  key={stat.label} 
                  className={cn(
                    'p-6',
                    design === 'industrial' && 'bg-white',
                    design === 'industrial' && i < 2 && 'border-r-4 border-slate-900'
                  )}
                >
                  <div className={cn(
                    'text-4xl font-bold mb-2',
                    design === 'corporate' && 'text-orange-400',
                    design === 'industrial' && 'text-slate-900 font-black',
                    design === 'minimal' && 'text-orange-600'
                  )}>
                    {stat.value}
                  </div>
                  <Text variant="muted">{stat.label}</Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </PageWrapper>
  );
}
