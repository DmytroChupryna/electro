'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import PageWrapper, { Section, Heading, Text } from '@/components/PageWrapper';
import { Quote, Star, ArrowRight, Building2 } from 'lucide-react';

export default function ReviewsClient() {
  const t = useTranslations('Reviews');
  const tCTA = useTranslations('CTA');

  const reviews = [
    { key: 'review1' },
    { key: 'review2' },
    { key: 'review3' },
  ];

  const additionalReviews = [
    {
      text: 'Excellent technical skills and professional approach. The team completed our warehouse electrical installation ahead of schedule.',
      author: 'Marc Van den Berg',
      company: 'Logistics Plus NV',
      role: 'Operations Director',
    },
    {
      text: 'We have been impressed by the quality of work and attention to detail. Highly recommend for any industrial electrical project.',
      author: 'Katarzyna Wiśniewska',
      company: 'PolBuild Construction',
      role: 'Project Coordinator',
    },
  ];

  const ReviewCard = ({ text, author, company, role }: { text: string; author: string; company: string; role: string }) => (
    <div className="p-8 rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-orange-200/30 hover:-translate-y-1 transition-all duration-300">
      <Quote className="w-10 h-10 mb-6 text-orange-200" />

      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-current text-amber-500" />
        ))}
      </div>

      <p className="leading-relaxed mb-8 text-lg text-slate-600">
        &ldquo;{text}&rdquo;
      </p>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/25">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="font-semibold text-slate-900">{author}</div>
          <Text variant="muted" className="text-sm">{role}, {company}</Text>
        </div>
      </div>
    </div>
  );

  return (
    <PageWrapper>
      {/* Hero */}
      <Section variant="primary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <Text variant="accent" className="font-medium mb-4 tracking-wide uppercase text-sm">
              Testimonials
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

      {/* Reviews Grid */}
      <Section variant="secondary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <ReviewCard
                key={review.key}
                text={t(`reviews.${review.key}.text`)}
                author={t(`reviews.${review.key}.author`)}
                company={t(`reviews.${review.key}.company`)}
                role={t(`reviews.${review.key}.role`)}
              />
            ))}
            {additionalReviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </div>
      </Section>

      {/* Trust Indicators */}
      <Section variant="primary" className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-12 text-center">
            {[
              { value: '50+', labelKey: 'projects' },
              { value: '100%', labelKey: 'satisfaction' },
              { value: 'VCA', labelKey: 'certified' },
              { value: '2', labelKey: 'countries' },
            ].map((stat) => (
              <div key={stat.labelKey} className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 px-8 py-6">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <Text variant="muted">{t(`stats.${stat.labelKey}`)}</Text>
              </div>
            ))}
          </div>
        </div>
      </Section>

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
