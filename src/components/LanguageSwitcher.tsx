'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export default function LanguageSwitcher({ className, variant = 'dark' }: LanguageSwitcherProps) {
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
        'inline-flex items-center rounded-full p-0.5 text-xs font-semibold transition-all duration-200',
        variant === 'dark'
          ? 'bg-white/10'
          : 'bg-slate-200',
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
            ? variant === 'dark'
              ? 'bg-white text-slate-900'
              : 'bg-orange-600 text-white shadow-sm'
            : variant === 'dark'
              ? 'text-white/70 hover:text-white hover:bg-white/10'
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
            ? variant === 'dark'
              ? 'bg-white text-slate-900'
              : 'bg-orange-600 text-white shadow-sm'
            : variant === 'dark'
              ? 'text-white/70 hover:text-white hover:bg-white/10'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-300/50'
        )}
      >
        PL
      </button>
    </div>
  );
}
