'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useDesign } from '@/context/DesignContext';
import PageWrapper, { Section, Heading, Text } from '@/components/PageWrapper';
import { cn } from '@/lib/utils';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Check,
  Loader2,
  Building2,
  User,
} from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('Contact');
  const { design } = useDesign();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus('success');
    setTimeout(() => {
      setStatus('idle');
      (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  const inputClasses = cn(
    'w-full px-4 py-3 transition-colors focus:outline-none',
    design === 'corporate' && 'rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
    design === 'industrial' && 'bg-white border-4 border-slate-900 text-slate-900 placeholder-slate-400 focus:border-amber-500',
    design === 'minimal' && 'rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
  );

  const labelClasses = cn(
    'block text-sm font-medium mb-2',
    design === 'corporate' && 'text-slate-300',
    design === 'industrial' && 'text-slate-900 font-bold uppercase',
    design === 'minimal' && 'text-slate-600'
  );

  return (
    <PageWrapper>
      {/* Hero */}
      <Section variant="primary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            {design === 'industrial' ? (
              <div className="inline-block bg-amber-500 text-slate-900 font-black px-4 py-2 mb-4 uppercase tracking-widest text-sm">
                Contact
              </div>
            ) : (
              <Text variant="accent" className="font-medium mb-4 tracking-wide uppercase text-sm">
                Contact
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

      {/* Contact Section */}
      <Section variant="secondary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className={cn(
              'p-8 md:p-10',
              design === 'corporate' && 'rounded-2xl bg-slate-900 border border-slate-800',
              design === 'industrial' && 'bg-white border-4 border-slate-900',
              design === 'minimal' && 'rounded-2xl bg-white shadow-lg'
            )}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className={labelClasses}>
                    {t('form.name')} *
                  </label>
                  <div className="relative">
                    <User className={cn(
                      'absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5',
                      design === 'corporate' && 'text-slate-500',
                      design !== 'corporate' && 'text-slate-400'
                    )} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className={cn(inputClasses, 'pl-12')}
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className={labelClasses}>
                    {t('form.company')}
                  </label>
                  <div className="relative">
                    <Building2 className={cn(
                      'absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5',
                      design === 'corporate' && 'text-slate-500',
                      design !== 'corporate' && 'text-slate-400'
                    )} />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className={cn(inputClasses, 'pl-12')}
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    {t('form.email')} *
                  </label>
                  <div className="relative">
                    <Mail className={cn(
                      'absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5',
                      design === 'corporate' && 'text-slate-500',
                      design !== 'corporate' && 'text-slate-400'
                    )} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className={cn(inputClasses, 'pl-12')}
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className={labelClasses}>
                    {t('form.phone')}
                  </label>
                  <div className="relative">
                    <Phone className={cn(
                      'absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5',
                      design === 'corporate' && 'text-slate-500',
                      design !== 'corporate' && 'text-slate-400'
                    )} />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={cn(inputClasses, 'pl-12')}
                      placeholder="+48 XXX XXX XXX"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={labelClasses}>
                    {t('form.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className={cn(inputClasses, 'resize-none')}
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                  className={cn(
                    'w-full py-4 font-semibold flex items-center justify-center gap-2 transition-all',
                    status === 'success' && 'bg-green-500 text-white',
                    status === 'error' && 'bg-red-500 text-white',
                    status !== 'success' && status !== 'error' && design === 'corporate' && 'rounded-xl bg-amber-500 text-slate-900 hover:bg-amber-400',
                    status !== 'success' && status !== 'error' && design === 'industrial' && 'bg-slate-900 text-amber-500 hover:bg-slate-800 font-black uppercase',
                    status !== 'success' && status !== 'error' && design === 'minimal' && 'rounded-xl bg-blue-600 text-white hover:bg-blue-700',
                    design === 'industrial' && (status === 'success' || status === 'error') && 'font-black uppercase'
                  )}
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('form.submitting')}
                    </>
                  ) : status === 'success' ? (
                    <>
                      <Check className="w-5 h-5" />
                      {t('form.success')}
                    </>
                  ) : status === 'error' ? (
                    t('form.error')
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('form.submit')}
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Info Cards */}
              <div className={cn(
                'p-8',
                design === 'corporate' && 'rounded-2xl bg-slate-900 border border-slate-800',
                design === 'industrial' && 'bg-white border-4 border-slate-900',
                design === 'minimal' && 'rounded-2xl bg-white shadow-lg'
              )}>
                <h3 className={cn(
                  'text-xl font-semibold mb-6',
                  design === 'corporate' && 'text-white',
                  design === 'industrial' && 'text-slate-900 font-black uppercase',
                  design === 'minimal' && 'text-slate-900'
                )}>
                  {t('info.title')}
                </h3>

                <div className="space-y-6">
                  {[
                    { icon: MapPin, label: t('info.address'), value: 'Ul. Biala 4/87\n00-895 Warszawa, Poland' },
                    { icon: Phone, label: t('info.phone'), value: '+48 578 992 316', href: 'tel:+48578992316' },
                    { icon: Mail, label: t('info.email'), value: 'info@technogroop.com', href: 'mailto:info@technogroop.com' },
                    { icon: User, label: t('info.director'), value: 'Vadym Lapin' },
                  ].map((item) => {
                    const Icon = item.icon;
                    const content = item.href ? (
                      <a href={item.href} className={cn(
                        'transition-colors',
                        design === 'corporate' && 'text-white hover:text-blue-400',
                        design !== 'corporate' && 'text-slate-900 hover:text-blue-600'
                      )}>
                        {item.value}
                      </a>
                    ) : (
                      <span className={design === 'corporate' ? 'text-white' : 'text-slate-900'}>
                        {item.value.split('\n').map((line, i) => (
                          <span key={i}>{line}{i === 0 && <br />}</span>
                        ))}
                      </span>
                    );

                    return (
                      <div key={item.label} className="flex items-start gap-4">
                        <div className={cn(
                          'w-12 h-12 flex items-center justify-center flex-shrink-0',
                          design === 'corporate' && 'rounded-xl bg-blue-500/10',
                          design === 'industrial' && 'bg-slate-900',
                          design === 'minimal' && 'rounded-xl bg-blue-100'
                        )}>
                          <Icon className={cn(
                            'w-6 h-6',
                            design === 'corporate' && 'text-blue-400',
                            design === 'industrial' && 'text-amber-500',
                            design === 'minimal' && 'text-blue-600'
                          )} />
                        </div>
                        <div>
                          <Text variant="muted" className="text-sm mb-1">{item.label}</Text>
                          {content}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Business Hours */}
              <div className={cn(
                'p-8',
                design === 'corporate' && 'rounded-2xl bg-slate-900 border border-slate-800',
                design === 'industrial' && 'bg-amber-500 border-4 border-slate-900',
                design === 'minimal' && 'rounded-2xl bg-slate-50'
              )}>
                <h3 className={cn(
                  'text-xl font-semibold mb-6 flex items-center gap-3',
                  design === 'corporate' && 'text-white',
                  design === 'industrial' && 'text-slate-900 font-black uppercase',
                  design === 'minimal' && 'text-slate-900'
                )}>
                  <Clock className={cn(
                    'w-5 h-5',
                    design === 'corporate' && 'text-blue-400',
                    design === 'industrial' && 'text-slate-900',
                    design === 'minimal' && 'text-blue-600'
                  )} />
                  {t('hours.title')}
                </h3>

                <div className="space-y-3">
                  <p className={design === 'corporate' ? 'text-slate-300' : 'text-slate-700'}>
                    {t('hours.weekdays')}
                  </p>
                  <p className={design === 'corporate' ? 'text-slate-500' : 'text-slate-500'}>
                    {t('hours.weekend')}
                  </p>
                </div>
              </div>

              {/* Locations */}
              <div className={cn(
                'p-8',
                design === 'corporate' && 'rounded-2xl bg-gradient-to-br from-blue-600/10 to-slate-900 border border-blue-500/20',
                design === 'industrial' && 'bg-slate-900 border-4 border-slate-900',
                design === 'minimal' && 'rounded-2xl bg-blue-50'
              )}>
                <h3 className={cn(
                  'text-xl font-semibold mb-6',
                  design === 'corporate' && 'text-white',
                  design === 'industrial' && 'text-amber-500 font-black uppercase',
                  design === 'minimal' && 'text-slate-900'
                )}>
                  We operate in:
                </h3>

                <div className="flex flex-wrap gap-4">
                  <div className={cn(
                    'flex items-center gap-2 px-4 py-2',
                    design === 'corporate' && 'rounded-full bg-slate-900/50',
                    design === 'industrial' && 'bg-amber-500',
                    design === 'minimal' && 'rounded-full bg-white'
                  )}>
                    <span className="text-xl">🇵🇱</span>
                    <span className={design === 'corporate' ? 'text-white' : 'text-slate-900'}>Poland</span>
                  </div>
                  <div className={cn(
                    'flex items-center gap-2 px-4 py-2',
                    design === 'corporate' && 'rounded-full bg-slate-900/50',
                    design === 'industrial' && 'bg-amber-500',
                    design === 'minimal' && 'rounded-full bg-white'
                  )}>
                    <span className="text-xl">🇧🇪</span>
                    <span className={design === 'corporate' ? 'text-white' : 'text-slate-900'}>Belgium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </PageWrapper>
  );
}
