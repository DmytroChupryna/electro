'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Phone, Mail, MapPin, ArrowUpRight, Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';
import type { CMSSettings } from '@/lib/payload';

interface FooterProps {
  settings?: CMSSettings;
}

export default function Footer({ settings }: FooterProps) {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Nav');

  const addressPL = settings?.addressPL;
  const companyPL = settings?.companyPL;
  const social = settings?.socialLinks;

  return (
    <footer className="bg-gradient-to-b from-white to-slate-50 text-slate-900 border-t border-slate-100">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6 group">
              <img 
                src="/logo.png" 
                alt="Techno Groop" 
                className="h-12 w-auto transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="mb-6 max-w-md text-slate-600">
              {t('description')}
            </p>
            {companyPL && (
              <div className="flex flex-wrap gap-3 mb-6">
                {companyPL.regon && <span className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-medium text-slate-600">REGON: {companyPL.regon}</span>}
                {companyPL.nip && <span className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-medium text-slate-600">NIP: {companyPL.nip}</span>}
                {companyPL.krs && <span className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-medium text-slate-600">KRS: {companyPL.krs}</span>}
              </div>
            )}
            {/* Social Links */}
            {social && (social.facebook || social.linkedin || social.instagram || social.youtube) && (
              <div className="flex gap-3">
                {social.facebook && (
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-orange-100 hover:text-orange-600 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {social.linkedin && (
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-orange-100 hover:text-orange-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {social.instagram && (
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-orange-100 hover:text-orange-600 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {social.youtube && (
                  <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-orange-100 hover:text-orange-600 transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('quickLinks')}</h4>
            <ul className="space-y-3">
              {['about', 'services', 'portfolio', 'reviews', 'blog'].map((key) => (
                <li key={key}>
                  <Link
                    href={`/${key}`}
                    className="group inline-flex items-center gap-1 text-slate-600 hover:text-orange-600 transition-colors"
                  >
                    {tNav(key)}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('contact')}</h4>
            <ul className="space-y-4">
              {addressPL && (addressPL.street || addressPL.city) && (
                <li className="bg-slate-50 rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-slate-600">
                      {addressPL.street}<br />
                      {addressPL.postalCode} {addressPL.city}, {addressPL.country}
                    </span>
                  </div>
                </li>
              )}
              {settings?.phonePL && (
                <li>
                  <a
                    href={`tel:${settings.phonePL.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 bg-slate-50 rounded-2xl p-4 hover:bg-orange-50 transition-colors text-slate-600"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-slate-700" />
                    </div>
                    <span className="font-medium">{settings.phonePL}</span>
                  </a>
                </li>
              )}
              {settings?.contactEmail && (
                <li>
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="flex items-center gap-3 bg-slate-50 rounded-2xl p-4 hover:bg-orange-50 transition-colors text-slate-600"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-slate-700" />
                    </div>
                    <span className="font-medium">{settings.contactEmail}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {companyPL?.name || 'Techno Groop Sp. z o.o.'} {t('rights')}
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              {t('privacy')}
            </Link>
            <Link
              href="/terms"
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
