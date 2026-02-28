'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { X, Cookie, Settings, Check } from 'lucide-react';
import Link from 'next/link';

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_CONSENT_KEY = 'cookie-consent';
const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

export default function CookieConsent() {
  const t = useTranslations('CookieConsent');
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    setIsVisible(false);

    if (prefs.analytics && typeof window !== 'undefined') {
      // Enable analytics if accepted
    }
  };

  const acceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
  };

  const rejectAll = () => {
    const onlyNecessary = { necessary: true, analytics: false, marketing: false };
    setPreferences(onlyNecessary);
    saveConsent(onlyNecessary);
  };

  const savePreferences = () => {
    saveConsent(preferences);
    setShowSettings(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]" />

      {/* Cookie Banner */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-6 pb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {t('title')}
                </h2>
              </div>
              <button
                onClick={rejectAll}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="px-6 py-4 border-t border-slate-100 space-y-4">
              {/* Necessary Cookies */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">{t('necessary.title')}</p>
                  <p className="text-xs text-slate-500">{t('necessary.description')}</p>
                </div>
                <div className="w-12 h-6 bg-orange-500 rounded-full flex items-center justify-end px-1 cursor-not-allowed">
                  <div className="w-4 h-4 bg-white rounded-full shadow" />
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">{t('analytics.title')}</p>
                  <p className="text-xs text-slate-500">{t('analytics.description')}</p>
                </div>
                <button
                  onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.analytics ? 'bg-orange-500 justify-end' : 'bg-slate-200 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow" />
                </button>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">{t('marketing.title')}</p>
                  <p className="text-xs text-slate-500">{t('marketing.description')}</p>
                </div>
                <button
                  onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.marketing ? 'bg-orange-500 justify-end' : 'bg-slate-200 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow" />
                </button>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="p-6 pt-4 space-y-3">
            {showSettings ? (
              <button
                onClick={savePreferences}
                className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                {t('savePreferences')}
              </button>
            ) : (
              <>
                <div className="flex gap-3">
                  <button
                    onClick={acceptAll}
                    className="flex-1 py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transition-colors"
                  >
                    {t('acceptAll')}
                  </button>
                  <button
                    onClick={rejectAll}
                    className="flex-1 py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-200 transition-colors"
                  >
                    {t('rejectAll')}
                  </button>
                </div>
                <button
                  onClick={() => setShowSettings(true)}
                  className="w-full py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  {t('manageSettings')}
                </button>
              </>
            )}
          </div>

          {/* Footer Links */}
          <div className="px-6 pb-6 pt-2 border-t border-slate-100">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-500">
              <Link href="/privacy" className="hover:text-orange-600 transition-colors">
                {t('privacyPolicy')}
              </Link>
              <span className="text-slate-300">|</span>
              <Link href="/cookies" className="hover:text-orange-600 transition-colors">
                {t('cookiePolicy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
