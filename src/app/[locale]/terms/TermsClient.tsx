'use client';

import { useTranslations } from 'next-intl';
import PageWrapper from '@/components/PageWrapper';
import type { CMSSettings } from '@/lib/payload';

interface TermsClientProps {
  settings?: CMSSettings;
}

export default function TermsClient({ settings }: TermsClientProps) {
  const t = useTranslations('Terms');

  const companyName = settings?.companyPL?.name || 'Techno Groop Sp. z o.o.';
  const companyAddress = settings?.addressPL 
    ? `${settings.addressPL.street}, ${settings.addressPL.postalCode} ${settings.addressPL.city}, ${settings.addressPL.country}`
    : 'ul. Przykładowa 1, 00-000 Warszawa, Polska';
  const contactEmail = settings?.contactEmail || 'kontakt@technogroop.com';
  const phonePL = settings?.phonePL || '';
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
            
            {/* 1. Postanowienia ogólne */}
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
              {phonePL && <li><strong>{t('section1.phone')}:</strong> {phonePL}</li>}
            </ul>

            {/* 2. Definicje */}
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              {t('section2.title')}
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li><strong>{t('section2.item1.term')}</strong> – {t('section2.item1.def')}</li>
              <li><strong>{t('section2.item2.term')}</strong> – {t('section2.item2.def')}</li>
              <li><strong>{t('section2.item3.term')}</strong> – {t('section2.item3.def')}</li>
              <li><strong>{t('section2.item4.term')}</strong> – {t('section2.item4.def')}</li>
              <li><strong>{t('section2.item5.term')}</strong> – {t('section2.item5.def')}</li>
            </ul>

            {/* 3. Zakres usług */}
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

            {/* 4. Warunki korzystania */}
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
            </ul>

            {/* 5. Formularz kontaktowy */}
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              {t('section5.title')}
            </h2>
            <p className="text-slate-700 mb-4">
              {t('section5.intro')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>{t('section5.item1')}</li>
              <li>{t('section5.item2')}</li>
              <li>{t('section5.item3')}</li>
            </ul>

            {/* 6. Prawa autorskie */}
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              {t('section6.title')}
            </h2>
            <p className="text-slate-700 mb-4">
              {t('section6.intro')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>{t('section6.item1')}</li>
              <li>{t('section6.item2')}</li>
              <li>{t('section6.item3')}</li>
            </ul>

            {/* 7. Odpowiedzialność */}
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              {t('section7.title')}
            </h2>
            <p className="text-slate-700 mb-4">
              {t('section7.intro')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>{t('section7.item1')}</li>
              <li>{t('section7.item2')}</li>
              <li>{t('section7.item3')}</li>
            </ul>

            {/* 8. Prawa konsumenta */}
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              {t('section8.title')}
            </h2>
            <p className="text-slate-700 mb-4">
              {t('section8.intro')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>{t('section8.item1')}</li>
              <li>{t('section8.item2')}</li>
              <li>{t('section8.item3')}</li>
            </ul>

            {/* 9. Reklamacje */}
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
            <p className="text-slate-700 mb-6">
              {t('section9.contact')} <a href={`mailto:${contactEmail}`} className="text-orange-600 hover:underline">{contactEmail}</a>
            </p>

            {/* 10. Rozstrzyganie sporów */}
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              {t('section10.title')}
            </h2>
            <p className="text-slate-700 mb-4">
              {t('section10.intro')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>{t('section10.item1')}</li>
              <li>{t('section10.item2')}</li>
            </ul>

            {/* 11. Postanowienia końcowe */}
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              {t('section11.title')}
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>{t('section11.item1')}</li>
              <li>{t('section11.item2')}</li>
              <li>{t('section11.item3')}</li>
            </ul>

          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
