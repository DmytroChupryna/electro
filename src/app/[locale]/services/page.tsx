'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useDesign } from '@/context/DesignContext';
import PageWrapper, { Section, Heading, Text } from '@/components/PageWrapper';
import { cn } from '@/lib/utils';
import {
  Server,
  Settings,
  Droplets,
  Sun,
  Home,
  Factory,
  ArrowRight,
} from 'lucide-react';

export default function ServicesPage() {
  const t = useTranslations('Services');
  const tCTA = useTranslations('CTA');
  const { design } = useDesign();

  const services = [
    {
      key: 'residential',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    },
    {
      key: 'industrial',
      icon: Factory,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    },
    {
      key: 'lowCurrent',
      icon: Server,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    },
    {
      key: 'automation',
      icon: Settings,
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    },
    {
      key: 'plumbing',
      icon: Droplets,
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&q=80',
    },
    {
      key: 'solar',
      icon: Sun,
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
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
                Our Services
              </div>
            ) : (
              <Text variant="accent" className="font-medium mb-4 tracking-wide uppercase text-sm">
                Our Services
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

      {/* Services Grid */}
      <Section variant="secondary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-8',
            design === 'industrial' && 'gap-0 border-4 border-slate-900'
          )}>
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.key}
                  className={cn(
                    'group relative overflow-hidden transition-all',
                    design === 'corporate' && 'rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50',
                    design === 'industrial' && cn(
                      'bg-white hover:bg-amber-50',
                      index < 4 && 'border-b-4 border-slate-900',
                      index % 2 === 0 && 'border-r-4 border-slate-900'
                    ),
                    design === 'minimal' && 'bg-white hover:bg-slate-50 rounded-2xl'
                  )}
                >
                  {/* Background Image - only for corporate */}
                  {design === 'corporate' && (
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
                        'w-16 h-16 flex items-center justify-center flex-shrink-0 transition-colors',
                        design === 'corporate' && 'rounded-xl bg-blue-500/10 group-hover:bg-blue-600',
                        design === 'industrial' && 'bg-slate-900',
                        design === 'minimal' && 'rounded-2xl bg-slate-100 group-hover:bg-blue-100'
                      )}>
                        <Icon className={cn(
                          'w-8 h-8 transition-colors',
                          design === 'corporate' && 'text-blue-400 group-hover:text-white',
                          design === 'industrial' && 'text-amber-500',
                          design === 'minimal' && 'text-slate-400 group-hover:text-blue-600'
                        )} />
                      </div>
                      <div>
                        <span className={cn(
                          'text-sm font-medium mb-2 block',
                          design === 'corporate' && 'text-slate-500',
                          design === 'industrial' && 'text-slate-400',
                          design === 'minimal' && 'text-slate-300'
                        )}>
                          0{index + 1}
                        </span>
                        <h3 className={cn(
                          'text-2xl font-bold mb-4',
                          design === 'corporate' && 'text-white',
                          design === 'industrial' && 'text-slate-900 font-black uppercase',
                          design === 'minimal' && 'text-slate-900'
                        )}>
                          {t(`${service.key}.title`)}
                        </h3>
                        <Text variant="body" className="leading-relaxed">
                          {t(`${service.key}.description`)}
                        </Text>
                      </div>
                    </div>
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
            <Heading level={2} className="mb-4">We Operate In</Heading>
            <Text variant="muted">Same services available in both countries</Text>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <div className={cn(
              'flex items-center gap-4 px-8 py-4',
              design === 'corporate' && 'rounded-full bg-slate-950 border border-slate-800',
              design === 'industrial' && 'bg-white border-4 border-slate-900',
              design === 'minimal' && 'rounded-full bg-slate-100'
            )}>
              <span className="text-3xl">🇵🇱</span>
              <span className={cn(
                'font-medium',
                design === 'corporate' && 'text-white',
                design !== 'corporate' && 'text-slate-900'
              )}>Poland (Warsaw)</span>
            </div>
            <div className={cn(
              'flex items-center gap-4 px-8 py-4',
              design === 'corporate' && 'rounded-full bg-slate-950 border border-slate-800',
              design === 'industrial' && 'bg-amber-500 border-4 border-slate-900',
              design === 'minimal' && 'rounded-full bg-slate-100'
            )}>
              <span className="text-3xl">🇧🇪</span>
              <span className={cn(
                'font-medium',
                design === 'corporate' && 'text-white',
                design !== 'corporate' && 'text-slate-900'
              )}>Belgium (Antwerp, Bruges, Brussels)</span>
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
            design === 'corporate' && 'text-blue-100',
            design === 'industrial' && 'text-slate-700',
            design === 'minimal' && 'text-slate-300'
          )}>
            {tCTA('subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
            <a
              href="tel:+48578992316"
              className={cn(
                'inline-flex items-center gap-2 px-8 py-4 font-semibold transition-colors',
                design === 'corporate' && 'rounded-full bg-blue-500 text-white hover:bg-blue-400',
                design === 'industrial' && 'border-4 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-amber-500 font-black uppercase',
                design === 'minimal' && 'rounded-full border border-white text-white hover:bg-white hover:text-slate-900'
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
