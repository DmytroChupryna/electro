'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export default function LanguageSwitcher({ className, variant = 'dark' }: LanguageSwitcherProps) {
  const router = useRouter();
  const currentPathname = usePathname();
  const locale = useLocale();

  const toggleLocale = () => {
    const nextLocale = locale === 'pl' ? 'en' : 'pl';
    router.replace(currentPathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      aria-label={locale === 'pl' ? 'Switch to English' : 'Przełącz na polski'}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
        variant === 'dark'
          ? 'bg-white/10 text-white hover:bg-white/20'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
        className
      )}
    >
      <Globe className="w-4 h-4" />
      <span className="uppercase">{locale === 'pl' ? 'EN' : 'PL'}</span>
    </button>
  );
}
