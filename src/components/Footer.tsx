'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Zap, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { useDesign } from '@/context/DesignContext';

interface FooterProps {
  variant?: 'dark' | 'light';
}

export default function Footer({ variant = 'dark' }: FooterProps) {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Nav');
  const { design } = useDesign();

  const isDark = variant === 'dark';
  const isMinimal = design === 'minimal';

  return (
    <footer
      className={
        isMinimal 
          ? 'bg-gradient-to-b from-white to-slate-50 text-slate-900 border-t border-slate-100' 
          : isDark 
            ? 'bg-slate-900 text-white' 
            : 'bg-slate-50 text-slate-900'
      }
    >
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6 group">
              <img 
                src="/logo.png" 
                alt="Techno Groop" 
                className={`h-12 w-auto ${isMinimal ? 'transition-transform group-hover:scale-105' : ''}`}
              />
            </Link>
            <p className={`mb-6 max-w-md ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t('description')}
            </p>
            {isMinimal ? (
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-medium text-slate-600">REGON: 524314939</span>
                <span className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-medium text-slate-600">NIP: 1231527015</span>
                <span className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-medium text-slate-600">KRS: 0001016431</span>
              </div>
            ) : (
              <div className={`text-sm space-y-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                <p><span className="font-medium">{t('regon')}:</span> 524314939</p>
                <p><span className="font-medium">{t('nip')}:</span> 1231527015</p>
                <p><span className="font-medium">{t('krs')}:</span> 0001016431</p>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-lg font-semibold mb-6 ${isMinimal ? 'font-bold' : ''}`}>{t('quickLinks')}</h4>
            <ul className="space-y-3">
              {['about', 'services', 'portfolio', 'careers'].map((key) => (
                <li key={key}>
                  <Link
                    href={`/${key}`}
                    className={`group inline-flex items-center gap-1 transition-colors ${
                      isMinimal 
                        ? 'text-slate-600 hover:text-orange-600' 
                        : isDark 
                          ? 'text-slate-400 hover:text-white' 
                          : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tNav(key)}
                    {isMinimal && <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`text-lg font-semibold mb-6 ${isMinimal ? 'font-bold' : ''}`}>{t('contact')}</h4>
            <ul className="space-y-4">
              <li className={`flex items-start gap-3 ${isMinimal ? 'bg-slate-50 rounded-2xl p-4' : ''}`}>
                <div className={isMinimal ? 'w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0' : ''}>
                  <MapPin className={`w-5 h-5 ${isMinimal ? 'text-white' : isDark ? 'text-orange-400 mt-0.5' : 'text-orange-600 mt-0.5'} flex-shrink-0`} />
                </div>
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  Ul. Biala 4/87<br />00-895 Warszawa, Poland
                </span>
              </li>
              <li>
                <a
                  href="tel:+48578992316"
                  className={`flex items-center gap-3 transition-colors ${isMinimal ? 'bg-slate-50 rounded-2xl p-4 hover:bg-orange-50' : ''} ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <div className={isMinimal ? 'w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center flex-shrink-0' : ''}>
                    <Phone className={`w-5 h-5 flex-shrink-0 ${isMinimal ? 'text-slate-700' : isDark ? 'text-orange-400' : 'text-orange-600'}`} />
                  </div>
                  <span className={isMinimal ? 'font-medium' : ''}>+48 578 992 316</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@technogroop.com"
                  className={`flex items-center gap-3 transition-colors ${isMinimal ? 'bg-slate-50 rounded-2xl p-4 hover:bg-orange-50' : ''} ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <div className={isMinimal ? 'w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center flex-shrink-0' : ''}>
                    <Mail className={`w-5 h-5 flex-shrink-0 ${isMinimal ? 'text-slate-700' : isDark ? 'text-orange-400' : 'text-orange-600'}`} />
                  </div>
                  <span className={isMinimal ? 'font-medium' : ''}>info@technogroop.com</span>
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
