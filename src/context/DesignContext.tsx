'use client';

import { createContext, useContext, ReactNode } from 'react';

export type DesignVariant = 'minimal';

interface DesignContextType {
  design: DesignVariant;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export function DesignProvider({ children }: { children: ReactNode }) {
  return (
    <DesignContext.Provider value={{ design: 'minimal' }}>
      {children}
    </DesignContext.Provider>
  );
}

export function useDesign() {
  const context = useContext(DesignContext);
  if (!context) {
    return { design: 'minimal' as const };
  }
  return context;
}
