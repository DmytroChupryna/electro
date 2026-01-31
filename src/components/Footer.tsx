'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Zap, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  variant?: 'dark' | 'light';
}

export default function Footer({ variant = 'dark' }: FooterProps) {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Nav');

  const isDark = variant === 'dark';

  return (
    <footer
      className={isDark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}
    >
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white fill-current" />
              </div>
              <span className="text-xl font-bold tracking-tight">TECHNO GROOP</span>
            </Link>
            <p className={`mb-6 max-w-md ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t('description')}
            </p>
            <div className={`text-sm space-y-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              <p><span className="font-medium">{t('regon')}:</span> 524314939</p>
              <p><span className="font-medium">{t('nip')}:</span> 1231527015</p>
              <p><span className="font-medium">{t('krs')}:</span> 0001016431</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('quickLinks')}</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  {tNav('services')}
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  {tNav('portfolio')}
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  {tNav('careers')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  Ul. Biala 4/87<br />00-895 Warszawa, Poland
                </span>
              </li>
              <li>
                <a
                  href="tel:+48578992316"
                  className={`flex items-center gap-3 transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <Phone className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  +48 578 992 316
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@technogroop.com"
                  className={`flex items-center gap-3 transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <Mail className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  info@technogroop.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`mt-12 pt-8 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} flex flex-col md:flex-row justify-between items-center gap-4`}
        >
          <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            &copy; {new Date().getFullYear()} Techno Groop Sp. z o.o. {t('rights')}
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className={`text-sm transition-colors ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {t('privacy')}
            </Link>
            <Link
              href="/terms"
              className={`text-sm transition-colors ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
