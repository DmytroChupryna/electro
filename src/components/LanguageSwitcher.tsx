'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export default function LanguageSwitcher({ className, variant = 'light' }: LanguageSwitcherProps) {
  const router = useRouter();
  const currentPathname = usePathname();
  const locale = useLocale();

  const switchToLocale = (newLocale: 'en' | 'pl') => {
    if (newLocale !== locale) {
      router.replace(currentPathname, { locale: newLocale });
    }
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full p-0.5 text-xs font-semibold transition-all duration-200 bg-slate-200',
        className
      )}
      role="group"
      aria-label="Language switcher"
    >
      <button
        onClick={() => switchToLocale('en')}
        aria-pressed={locale === 'en'}
        className={cn(
          'px-2.5 py-1 rounded-full cursor-pointer transition-all duration-300 ease-in-out',
          locale === 'en'
            ? 'bg-orange-600 text-white shadow-sm'
            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-300/50'
        )}
      >
        EN
      </button>
      <button
        onClick={() => switchToLocale('pl')}
        aria-pressed={locale === 'pl'}
        className={cn(
          'px-2.5 py-1 rounded-full cursor-pointer transition-all duration-300 ease-in-out',
          locale === 'pl'
            ? 'bg-orange-600 text-white shadow-sm'
            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-300/50'
        )}
      >
        PL
      </button>
    </div>
  );
}
