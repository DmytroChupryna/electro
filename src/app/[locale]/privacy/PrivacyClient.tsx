'use client';

import { useTranslations } from 'next-intl';
import PageWrapper from '@/components/PageWrapper';
import type { CMSSettings } from '@/lib/payload';

interface PrivacyClientProps {
  settings?: CMSSettings;
}

export default function PrivacyClient({ settings }: PrivacyClientProps) {
  const t = useTranslations('Privacy');

  const companyName = settings?.companyPL?.name || 'Techno Groop Sp. z o.o.';
  const companyAddress = settings?.addressPL 
    ? `${settings.addressPL.street}, ${settings.addressPL.postalCode} ${settings.addressPL.city}, ${settings.addressPL.country}`
    : 'ul. Przykładowa 1, 00-000 Warszawa, Polska';
  const contactEmail = settings?.contactEmail || 'kontakt@technogroop.com';
  const nip = settings?.companyPL?.nip || '';
  const regon = settings?.companyPL?.regon || '';
  const krs = settings?.companyPL?.krs || '';

  return (
    <PageWrapper settings={settings}>
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            {t('title')}
          </h1>
          <p className="text-slate-400 text-center mt-4">
            {t('lastUpdated')}: {t('updateDate')}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="prose prose-slate prose-lg max-w-none">
            
            {/* 1. Administrator danych */}
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              {t('section1.title')}
            </h2>
            <p className="text-slate-700 mb-4">
              {t('section1.intro')}
            </p>
            <ul className="list-none space-y-2 text-slate-700 mb-6">
              <li><strong>{t('section1.companyName')}:</strong> {companyName}</li>
              <li><strong>{t('section1.address')}:</strong> {companyAddress}</li>
              {nip && <li><strong>NIP:</strong> {nip}</li>}
              {regon && <li><strong>REGON:</strong> {regon}</li>}
              {krs && <li><strong>KRS:</strong> {krs}</li>}
              <li><strong>{t('section1.email')}:</strong> {contactEmail}</li>
            </ul>

            {/* 2. Podstawa prawna */}
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              {t('section2.title')}
            </h2>
            <p className="text-slate-700 mb-4">
              {t('section2.intro')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>{t('section2.item1')}</li>
              <li>{t('section2.item2')}</li>
              <li>{t('section2.item3')}</li>
            </ul>

            {/* 3. Rodzaje zbieranych danych */}
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              {t('section3.title')}
            </h2>
            <p className="text-slate-700 mb-4">
              {t('section3.intro')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>{t('section3.item1')}</li>
              <li>{t('section3.item2')}</li>
              <li>{t('section3.item3')}</li>
              <li>{t('section3.item4')}</li>
            </ul>

            {/* 4. Cele przetwarzania */}
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              {t('section4.title')}
            </h2>
            <p className="text-slate-700 mb-4">
              {t('section4.intro')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>{t('section4.item1')}</li>
              <li>{t('section4.item2')}</li>
              <li>{t('section4.item3')}</li>
              <li>{t('section4.item4')}</li>
              <li>{t('section4.item5')}</li>
            </ul>

            {/* 5. Podstawy prawne przetwarzania */}
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              {t('section5.title')}
            </h2>
            <p className="text-slate-700 mb-4">
              {t('section5.intro')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li><strong>{t('section5.item1.title')}</strong> – {t('section5.item1.desc')}</li>
              <li><strong>{t('section5.item2.title')}</strong> – {t('section5.item2.desc')}</li>
              <li><strong>{t('section5.item3.title')}</strong> – {t('section5.item3.desc')}</li>
              <li><strong>{t('section5.item4.title')}</strong> – {t('section5.item4.desc')}</li>
            </ul>

            {/* 6. Prawa użytkownika */}
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              {t('section6.title')}
            </h2>
            <p className="text-slate-700 mb-4">
              {t('section6.intro')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li><strong>{t('section6.item1.title')}</strong> – {t('section6.item1.desc')}</li>
              <li><strong>{t('section6.item2.title')}</strong> – {t('section6.item2.desc')}</li>
              <li><strong>{t('section6.item3.title')}</strong> – {t('section6.item3.desc')}</li>
              <li><strong>{t('section6.item4.title')}</strong> – {t('section6.item4.desc')}</li>
              <li><strong>{t('section6.item5.title')}</strong> – {t('section6.item5.desc')}</li>
              <li><strong>{t('section6.item6.title')}</strong> – {t('section6.item6.desc')}</li>
              <li><strong>{t('section6.item7.title')}</strong> – {t('section6.item7.desc')}</li>
            </ul>
            <p className="text-slate-700 mb-6">
              {t('section6.contact')} <a href={`mailto:${contactEmail}`} className="text-orange-600 hover:underline">{contactEmail}</a>
            </p>

            {/* 7. Cookies */}
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              {t('section7.title')}
            </h2>
            <p className="text-slate-700 mb-4">
              {t('section7.intro')}
            </p>
            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">
              {t('section7.types.title')}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li><strong>{t('section7.types.item1.title')}</strong> – {t('section7.types.item1.desc')}</li>
              <li><strong>{t('section7.types.item2.title')}</strong> – {t('section7.types.item2.desc')}</li>
              <li><strong>{t('section7.types.item3.title')}</strong> – {t('section7.types.item3.desc')}</li>
            </ul>
            <p className="text-slate-700 mb-6">
              {t('section7.manage')}
            </p>

            {/* 8. Bezpieczeństwo */}
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              {t('section8.title')}
            </h2>
            <p className="text-slate-700 mb-6">
              {t('section8.content')}
            </p>

            {/* 9. Udostępnianie danych */}
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              {t('section9.title')}
            </h2>
            <p className="text-slate-700 mb-4">
              {t('section9.intro')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>{t('section9.item1')}</li>
              <li>{t('section9.item2')}</li>
              <li>{t('section9.item3')}</li>
            </ul>

            {/* 10. Okres przechowywania */}
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              {t('section10.title')}
            </h2>
            <p className="text-slate-700 mb-6">
              {t('section10.content')}
            </p>

            {/* 11. Skargi */}
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              {t('section11.title')}
            </h2>
            <p className="text-slate-700 mb-6">
              {t('section11.content')}
            </p>

            {/* 12. Zmiany */}
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              {t('section12.title')}
            </h2>
            <p className="text-slate-700 mb-6">
              {t('section12.content')}
            </p>

          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
