'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import PageWrapper, { Section, Heading, Text } from '@/components/PageWrapper';
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

export default function ContactClient() {
  const t = useTranslations('Contact');
  const tLoc = useTranslations('Locations');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      return;
    }
    
    setStatus('submitting');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      message: formData.get('message') as string,
      turnstileToken,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          (e.target as HTMLFormElement).reset();
          turnstileRef.current?.reset();
          setTurnstileToken(null);
        }, 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
        turnstileRef.current?.reset();
        setTurnstileToken(null);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  };

  const inputClasses = 'w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors focus:outline-none';
  const labelClasses = 'block text-sm font-medium mb-2 text-slate-600';

  return (
    <PageWrapper>
      {/* Hero */}
      <Section variant="primary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <Text variant="accent" className="font-medium mb-4 tracking-wide uppercase text-sm">
              {t('title')}
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

      {/* Contact Section */}
      <Section variant="secondary" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="p-8 md:p-10 rounded-3xl bg-white shadow-2xl shadow-slate-200/50 border border-slate-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className={labelClasses}>{t('form.name')} *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className={`${inputClasses} pl-12`}
                      placeholder={t('form.namePlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className={labelClasses}>{t('form.company')}</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className={`${inputClasses} pl-12`}
                      placeholder={t('form.companyPlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={labelClasses}>{t('form.email')} *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className={`${inputClasses} pl-12`}
                      placeholder={t('form.emailPlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className={labelClasses}>{t('form.phone')}</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={`${inputClasses} pl-12`}
                      placeholder={t('form.phonePlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClasses}>{t('form.message')} *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className={`${inputClasses} resize-none`}
                    placeholder={t('form.messagePlaceholder')}
                  />
                </div>

                <div className="flex justify-center">
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                    onSuccess={setTurnstileToken}
                    onExpire={() => setTurnstileToken(null)}
                    options={{
                      theme: 'light',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting' || status === 'success' || !turnstileToken}
                  className={`w-full py-4 font-semibold flex items-center justify-center gap-2 rounded-xl transition-all ${
                    status === 'success' ? 'bg-green-500 text-white' :
                    status === 'error' ? 'bg-red-500 text-white' :
                    !turnstileToken ? 'bg-slate-300 text-slate-500 cursor-not-allowed' :
                    'bg-orange-600 text-white hover:bg-orange-700'
                  }`}
                >
                  {status === 'submitting' ? (
                    <><Loader2 className="w-5 h-5 animate-spin" />{t('form.submitting')}</>
                  ) : status === 'success' ? (
                    <><Check className="w-5 h-5" />{t('form.success')}</>
                  ) : status === 'error' ? (
                    t('form.error')
                  ) : (
                    <><Send className="w-5 h-5" />{t('form.submit')}</>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="p-8 rounded-3xl bg-white shadow-2xl shadow-slate-200/50 border border-slate-100">
                <h3 className="text-xl font-semibold mb-6 text-slate-900">{t('info.title')}</h3>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, label: t('info.address'), value: 'Ul. Biala 4/87\n00-895 Warszawa, Poland' },
                    { icon: Phone, label: t('info.phone'), value: '+48 578 992 316', href: 'tel:+48578992316' },
                    { icon: Mail, label: t('info.email'), value: 'info@technogroop.com', href: 'mailto:info@technogroop.com' },
                    { icon: User, label: t('info.director'), value: 'Vadym Lapin' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-start gap-4">
                        <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 rounded-xl bg-orange-100">
                          <Icon className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <Text variant="muted" className="text-sm mb-1">{item.label}</Text>
                          {item.href ? (
                            <a href={item.href} className="text-slate-900 hover:text-orange-600 transition-colors">
                              {item.value}
                            </a>
                          ) : (
                            <span className="text-slate-900">
                              {item.value.split('\n').map((line, i) => (
                                <span key={i}>{line}{i === 0 && <br />}</span>
                              ))}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-slate-900">
                  <Clock className="w-5 h-5 text-orange-600" />
                  {t('hours.title')}
                </h3>
                <div className="space-y-3">
                  <p className="text-slate-700">{t('hours.weekdays')}</p>
                  <p className="text-slate-500">{t('hours.weekend')}</p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 shadow-lg shadow-orange-100/50">
                <h3 className="text-xl font-semibold mb-6 text-slate-900">{tLoc('title')}</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white">
                    <img src="/coats/poland.png" alt="Poland" className="w-8 h-5 object-cover rounded" />
                    <span className="text-slate-900">{tLoc('poland')}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white">
                    <img src="/coats/belgium.png" alt="Belgium" className="w-8 h-5 object-cover rounded" />
                    <span className="text-slate-900">{tLoc('belgium')}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white">
                    <img src="/coats/eu-flag.png" alt="EU" className="w-8 h-5 object-cover rounded" />
                    <span className="text-slate-900">{tLoc('eu')}</span>
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
