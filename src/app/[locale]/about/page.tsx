'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useDesign } from '@/context/DesignContext';
import PageWrapper, { Section, Card, Heading, Text } from '@/components/PageWrapper';
import { cn } from '@/lib/utils';
import {
  Users,
  Target,
  Shield,
  CheckCircle,
  Award,
  ArrowRight,
  Zap,
} from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('About');
  const tCTA = useTranslations('CTA');
  const { design } = useDesign();

  const iconBgClass = {
    corporate: 'bg-blue-500/10',
    industrial: 'bg-slate-900',
    minimal: 'bg-blue-100',
  }[design];

  const iconColorClass = {
    corporate: 'text-blue-400',
    industrial: 'text-amber-500',
    minimal: 'text-blue-600',
  }[design];

  return (
    <PageWrapper>
      {/* Hero Section */}
      <Section variant="primary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <Text variant="accent" className="font-medium mb-4 tracking-wide uppercase text-sm">
              About Us
            </Text>
            <Heading level={1} className="mb-6 leading-tight">
              {t('title')}
            </Heading>
            <Text variant="body" className="text-xl leading-relaxed">
              {t('description')}
            </Text>
          </div>
        </div>
      </Section>

      {/* Stats Section */}
      <Section variant="secondary" className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={cn(
            'grid grid-cols-2 md:grid-cols-4 gap-8',
            design === 'industrial' && 'border-4 border-slate-900'
          )}>
            {[
              { value: '2023', label: 'Founded' },
              { value: '22+', label: 'Specialists' },
              { value: '50+', label: 'Projects' },
              { value: '2', label: 'Countries' },
            ].map((stat, i) => (
              <div 
                key={i} 
                className={cn(
                  'text-center',
                  design === 'industrial' && 'p-6 bg-white',
                  design === 'industrial' && i < 3 && 'border-r-4 border-slate-900'
                )}
              >
                <div className={cn(
                  'text-4xl md:text-5xl font-bold mb-2',
                  design === 'corporate' && 'text-white',
                  design === 'industrial' && 'text-slate-900 font-black',
                  design === 'minimal' && 'text-slate-900 font-light'
                )}>
                  {stat.value}
                </div>
                <Text variant="muted">{stat.label}</Text>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Mission & Team */}
      <Section variant="primary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <Card>
              <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center mb-6', iconBgClass)}>
                <Target className={cn('w-7 h-7', iconColorClass)} />
              </div>
              <Heading level={3} className="mb-4">{t('mission.title')}</Heading>
              <Text variant="body" className="leading-relaxed">{t('mission.description')}</Text>
            </Card>

            {/* Team */}
            <Card>
              <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center mb-6', iconBgClass)}>
                <Users className={cn('w-7 h-7', iconColorClass)} />
              </div>
              <Heading level={3} className="mb-4">{t('team.title')}</Heading>
              <Text variant="body" className="leading-relaxed">{t('team.description')}</Text>
            </Card>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section variant="secondary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <Heading level={2}>{t('values.title')}</Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { key: 'quality', icon: CheckCircle, color: 'blue' },
              { key: 'safety', icon: Shield, color: 'amber' },
              { key: 'reliability', icon: Award, color: 'green' },
            ].map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.key} className="text-center p-8">
                  <div className={cn(
                    'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6',
                    design === 'corporate' && `bg-${value.color}-500/10`,
                    design === 'industrial' && 'bg-slate-900',
                    design === 'minimal' && 'bg-slate-100'
                  )}>
                    <Icon className={cn(
                      'w-8 h-8',
                      design === 'corporate' && `text-${value.color}-400`,
                      design === 'industrial' && 'text-amber-500',
                      design === 'minimal' && 'text-slate-600'
                    )} />
                  </div>
                  <Heading level={3} className="mb-3">{t(`values.${value.key}`)}</Heading>
                  <Text variant="muted">{t(`values.${value.key}Desc`)}</Text>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Director Info */}
      <Section variant="primary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className={cn(
              design === 'corporate' && 'bg-gradient-to-br from-blue-600/10 to-slate-950 border-blue-500/20'
            )}>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className={cn(
                  'w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0',
                  iconBgClass
                )}>
                  <Zap className={cn('w-12 h-12', iconColorClass)} />
                </div>
                <div className="text-center md:text-left">
                  <Heading level={3} className="mb-2">Vadym Lapin</Heading>
                  <Text variant="accent" className="font-medium mb-4">Director / CEO</Text>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="tel:+48578992316" className={cn(
                      'transition-colors',
                      design === 'corporate' && 'text-slate-400 hover:text-white',
                      design === 'industrial' && 'text-slate-600 hover:text-slate-900',
                      design === 'minimal' && 'text-slate-500 hover:text-slate-900'
                    )}>
                      +48 578 992 316
                    </a>
                    <a href="mailto:info@technogroop.com" className={cn(
                      'transition-colors',
                      design === 'corporate' && 'text-slate-400 hover:text-white',
                      design === 'industrial' && 'text-slate-600 hover:text-slate-900',
                      design === 'minimal' && 'text-slate-500 hover:text-slate-900'
                    )}>
                      info@technogroop.com
                    </a>
                  </div>
                </div>
              </div>
            </Card>
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
