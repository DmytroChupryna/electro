'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import PageWrapper, { Section, Card, Heading, Text } from '@/components/PageWrapper';
import {
  Users,
  Target,
  Shield,
  CheckCircle,
  Award,
  ArrowRight,
  ArrowUpRight,
  Zap,
} from 'lucide-react';

export default function AboutClient() {
  const t = useTranslations('About');
  const tCTA = useTranslations('CTA');
  const ui = useTranslations('UI');
  const p = useTranslations('Partners');

  return (
    <PageWrapper>
      {/* Hero Section */}
      <Section variant="primary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <Text variant="accent" className="font-medium mb-4 tracking-wide uppercase text-sm">
              {t('label')}
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '2023', labelKey: 'founded' },
              { value: '22+', labelKey: 'specialists' },
              { value: '50+', labelKey: 'projects' },
              { value: '2', labelKey: 'countries' },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="text-center bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <Text variant="muted">{t(`stats.${stat.labelKey}`)}</Text>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Mission & Team */}
      <Section variant="primary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/25">
                <Target className="w-7 h-7 text-white" />
              </div>
              <Heading level={3} className="mb-4">{t('mission.title')}</Heading>
              <Text variant="body" className="leading-relaxed">{t('mission.description')}</Text>
            </Card>

            <Card>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/25">
                <Users className="w-7 h-7 text-white" />
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
              { key: 'quality', icon: CheckCircle, gradient: 'from-orange-500 to-amber-500' },
              { key: 'safety', icon: Shield, gradient: 'from-slate-700 to-slate-800' },
              { key: 'reliability', icon: Award, gradient: 'from-orange-500 to-amber-500' },
            ].map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.key} className="text-center p-8 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-orange-200/30 hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br ${value.gradient} shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
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
            <Card>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/25">
                  <Zap className="w-12 h-12 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <Heading level={3} className="mb-2">Vadym Lapin</Heading>
                  <Text variant="accent" className="font-medium mb-4">{t('director.role')}</Text>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="tel:+48578992316" className="text-slate-500 hover:text-slate-900 transition-colors">
                      +48 578 992 316
                    </a>
                    <a href="mailto:info@technogroop.com" className="text-slate-500 hover:text-slate-900 transition-colors">
                      info@technogroop.com
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Partners */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              {ui('partnersLabel')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {ui('trustedCollaborations')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { key: 'eegGroup', logo: '/partners/eeg-logo.png', url: 'https://eeg.be/en/' },
              { key: 'netlink', logo: '/partners/netlink-logo.png', url: 'https://www.netlink.be/' },
            ].map((partner) => (
              <a
                key={partner.key}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-8 rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-orange-200/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mb-8 h-28 flex items-center">
                  <div className="bg-slate-400 border border-slate-500 rounded-2xl p-6 group-hover:bg-slate-500 transition-colors">
                    <img
                      src={partner.logo}
                      alt={`${p(`${partner.key}.name`)} logo`}
                      className="h-20 w-auto max-w-[260px] object-contain"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {p(`${partner.key}.name`)}
                  </h3>
                  <span className="text-sm font-medium text-orange-500">{p(`${partner.key}.role`)}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{p(`${partner.key}.description`)}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-400 group-hover:text-orange-500 transition-colors">
                  {ui('visitWebsite')}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <Section variant="accent" className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{tCTA('title')}</h2>
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
