'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useDesign } from '@/context/DesignContext';
import PageWrapper, { Section, Heading, Text } from '@/components/PageWrapper';
import { cn } from '@/lib/utils';
import { Quote, Star, ArrowRight, Building2 } from 'lucide-react';

export default function ReviewsPage() {
  const t = useTranslations('Reviews');
  const tCTA = useTranslations('CTA');
  const { design } = useDesign();

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
    <div className={cn(
      'p-8 transition-colors',
      design === 'corporate' && 'rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/30',
      design === 'industrial' && 'bg-white border-4 border-slate-900 hover:bg-amber-50',
      design === 'minimal' && 'rounded-2xl bg-slate-50 hover:bg-slate-100'
    )}>
      <Quote className={cn(
        'w-10 h-10 mb-6',
        design === 'corporate' && 'text-blue-500/30',
        design === 'industrial' && 'text-amber-500',
        design === 'minimal' && 'text-slate-200'
      )} />

      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={cn(
            'w-5 h-5 fill-current',
            design === 'corporate' && 'text-amber-400',
            design === 'industrial' && 'text-amber-500',
            design === 'minimal' && 'text-amber-400'
          )} />
        ))}
      </div>

      <p className={cn(
        'leading-relaxed mb-8 text-lg',
        design === 'corporate' && 'text-slate-300',
        design === 'industrial' && 'text-slate-700',
        design === 'minimal' && 'text-slate-600'
      )}>
        &ldquo;{text}&rdquo;
      </p>

      <div className="flex items-center gap-4">
        <div className={cn(
          'w-12 h-12 flex items-center justify-center',
          design === 'corporate' && 'rounded-full bg-blue-500/10',
          design === 'industrial' && 'bg-slate-900',
          design === 'minimal' && 'rounded-full bg-blue-100'
        )}>
          <Building2 className={cn(
            'w-6 h-6',
            design === 'corporate' && 'text-blue-400',
            design === 'industrial' && 'text-amber-500',
            design === 'minimal' && 'text-blue-600'
          )} />
        </div>
        <div>
          <div className={cn(
            'font-semibold',
            design === 'corporate' && 'text-white',
            design !== 'corporate' && 'text-slate-900'
          )}>
            {author}
          </div>
          <Text variant="muted" className="text-sm">
            {role}, {company}
          </Text>
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
            {design === 'industrial' ? (
              <div className="inline-block bg-amber-500 text-slate-900 font-black px-4 py-2 mb-4 uppercase tracking-widest text-sm">
                Testimonials
              </div>
            ) : (
              <Text variant="accent" className="font-medium mb-4 tracking-wide uppercase text-sm">
                Testimonials
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
          <div className={cn(
            'flex flex-wrap justify-center items-center gap-12 text-center',
            design === 'industrial' && 'border-4 border-slate-900 bg-white p-8'
          )}>
            {[
              { value: '50+', label: 'Completed Projects' },
              { value: '100%', label: 'Client Satisfaction' },
              { value: 'VCA', label: 'Certified Team' },
              { value: '2', label: 'Countries' },
            ].map((stat, i) => (
              <>
                <div key={stat.label}>
                  <div className={cn(
                    'text-4xl font-bold mb-2',
                    design === 'corporate' && 'text-white',
                    design === 'industrial' && 'text-slate-900 font-black',
                    design === 'minimal' && 'text-slate-900'
                  )}>
                    {stat.value}
                  </div>
                  <Text variant="muted">{stat.label}</Text>
                </div>
                {i < 3 && design === 'corporate' && (
                  <div className="w-px h-16 bg-slate-800 hidden md:block" />
                )}
              </>
            ))}
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
            Ready to start your project?
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
