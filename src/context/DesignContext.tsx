'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from '@/i18n/routing';

export type DesignVariant = 'corporate' | 'industrial' | 'minimal';

interface DesignContextType {
  design: DesignVariant;
  setDesign: (design: DesignVariant) => void;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export function DesignProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [design, setDesignState] = useState<DesignVariant>('corporate');

  // Detect design from URL on home pages
  useEffect(() => {
    if (pathname.includes('/home-b')) {
      setDesignState('industrial');
    } else if (pathname.includes('/home-c')) {
      setDesignState('minimal');
    } else if (pathname.includes('/home-a')) {
      setDesignState('corporate');
    }
  }, [pathname]);

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('technogroop-design') as DesignVariant;
    if (saved && ['corporate', 'industrial', 'minimal'].includes(saved)) {
      setDesignState(saved);
    }
  }, []);

  const setDesign = (newDesign: DesignVariant) => {
    setDesignState(newDesign);
    localStorage.setItem('technogroop-design', newDesign);
  };

  return (
    <DesignContext.Provider value={{ design, setDesign }}>
      {children}
    </DesignContext.Provider>
  );
}

export function useDesign() {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error('useDesign must be used within DesignProvider');
  }
  return context;
}
