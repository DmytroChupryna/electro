'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Palette } from 'lucide-react';
import { useDesign, DesignVariant } from '@/context/DesignContext';

export default function DesignSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { design, setDesign } = useDesign();

  // Only show on home pages
  const isHomePage = pathname.includes('/home-a') || pathname.includes('/home-b') || pathname.includes('/home-c');

  const switchDesign = (newDesign: DesignVariant, homeRoute: string) => {
    setDesign(newDesign);
    if (isHomePage) {
      router.push(`/${homeRoute}`);
    }
  };

  const designs = [
    { id: 'corporate' as DesignVariant, route: 'home-a', label: 'Corporate', color: 'bg-orange-600' },
    { id: 'industrial' as DesignVariant, route: 'home-b', label: 'Industrial', color: 'bg-amber-500' },
    { id: 'minimal' as DesignVariant, route: 'home-c', label: 'Minimal', color: 'bg-slate-200' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-full p-2 flex items-center gap-2 shadow-2xl">
      <div className="hidden sm:flex items-center gap-2 px-3 text-slate-500">
        <Palette className="w-4 h-4" />
        <span className="text-xs font-medium uppercase tracking-wider">Design:</span>
      </div>

      {designs.map((d) => (
        <button
          key={d.id}
          onClick={() => switchDesign(d.id, d.route)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            design === d.id
              ? 'bg-white text-slate-900 shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-white/10'
          )}
          aria-label={`Switch to ${d.label} design`}
          aria-pressed={design === d.id}
        >
          <span className={cn('w-2 h-2 rounded-full', d.color)} />
          <span className="hidden sm:inline">{d.label}</span>
        </button>
      ))}
    </div>
  );
}
