'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import PageWrapper, { Section, Heading, Text } from '@/components/PageWrapper';
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
            <Text variant="accent" className="font-medium mb-4 tracking-wide uppercase text-sm">
              Careers
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

      {/* Benefits */}
      <Section variant="secondary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <Heading level={2} className="mb-12">{t('benefits.title')}</Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.key}
                  className="p-6 rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-orange-200/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 flex items-center justify-center mb-4 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/25">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
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
                className="p-6 rounded-3xl bg-white shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-900">
                      {t(`positions.${position}.title`)}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-4 h-4" />
                        {t(`positions.${position}.location`)}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-4 h-4" />
                        {t(`positions.${position}.type`)}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 font-medium rounded-full bg-orange-600 text-white hover:bg-orange-700 transition-colors"
                  >
                    {t('cta')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Open application */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 shadow-xl shadow-orange-100/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  {t('noPosition')}
                </h3>
                <a
                  href="mailto:info@technogroop.com"
                  className="flex items-center gap-2 text-orange-600 hover:text-orange-500 transition-colors"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { value: '22→50+', label: 'Growing team' },
                { value: 'PL+BE', label: 'International projects' },
                { value: 'VCA', label: 'Certified safety' },
              ].map((stat) => (
                <div key={stat.label} className="p-6">
                  <div className="text-4xl font-bold mb-2 text-orange-600">{stat.value}</div>
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
