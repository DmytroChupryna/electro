'use client';

import { ReactNode } from 'react';
import { useDesign, DesignVariant } from '@/context/DesignContext';
import Header from './Header';
import Footer from './Footer';
import { cn } from '@/lib/utils';

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const { design } = useDesign();

  const bgClass = {
    corporate: 'bg-slate-900',
    industrial: 'bg-slate-100',
    minimal: 'bg-white',
  }[design];

  const headerVariant = {
    corporate: 'dark' as const,
    industrial: 'light' as const,
    minimal: 'light' as const,
  }[design];

  const footerVariant = {
    corporate: 'dark' as const,
    industrial: 'dark' as const,
    minimal: 'light' as const,
  }[design];

  return (
    <div className={cn('min-h-screen', bgClass)}>
      <Header variant={headerVariant} />
      <main className="pt-24">
        {children}
      </main>
      <Footer variant={footerVariant} />
    </div>
  );
}

// Design-aware section wrapper
export function Section({ 
  children, 
  className,
  variant = 'primary'
}: { 
  children: ReactNode; 
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
}) {
  const { design } = useDesign();

  const bgClasses = {
    corporate: {
      primary: 'bg-slate-900 text-white',
      secondary: 'bg-slate-950 text-white',
      accent: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white',
    },
    industrial: {
      primary: 'bg-white text-slate-900',
      secondary: 'bg-slate-100 text-slate-900',
      accent: 'bg-amber-500 text-slate-900',
    },
    minimal: {
      primary: 'bg-white text-slate-900',
      secondary: 'bg-slate-50 text-slate-900',
      accent: 'bg-slate-900 text-white',
    },
  };

  return (
    <section className={cn('py-20', bgClasses[design][variant], className)}>
      {children}
    </section>
  );
}

// Design-aware card
export function Card({ 
  children, 
  className,
  hover = true
}: { 
  children: ReactNode; 
  className?: string;
  hover?: boolean;
}) {
  const { design } = useDesign();

  const cardClasses = {
    corporate: cn(
      'rounded-2xl bg-slate-950 border border-slate-800',
      hover && 'hover:border-blue-500/50 transition-all'
    ),
    industrial: cn(
      'bg-white border-4 border-slate-900',
      hover && 'hover:bg-amber-50 transition-colors'
    ),
    minimal: cn(
      'rounded-2xl bg-slate-50',
      hover && 'hover:bg-slate-100 transition-colors'
    ),
  };

  return (
    <div className={cn('p-8', cardClasses[design], className)}>
      {children}
    </div>
  );
}

// Design-aware button
export function Button({ 
  children, 
  variant = 'primary',
  className,
  ...props
}: { 
  children: ReactNode; 
  variant?: 'primary' | 'secondary';
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { design } = useDesign();

  const buttonClasses = {
    corporate: {
      primary: 'bg-amber-500 text-slate-900 hover:bg-amber-400 rounded-full',
      secondary: 'bg-white/10 text-white hover:bg-white/20 rounded-full border border-white/10',
    },
    industrial: {
      primary: 'bg-slate-900 text-white hover:bg-slate-800 font-black uppercase tracking-wide',
      secondary: 'border-4 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-black uppercase',
    },
    minimal: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 rounded-full',
      secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 rounded-full',
    },
  };

  return (
    <button 
      className={cn('px-8 py-4 font-semibold transition-all', buttonClasses[design][variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

// Design-aware heading
export function Heading({ 
  children, 
  level = 2,
  className
}: { 
  children: ReactNode; 
  level?: 1 | 2 | 3;
  className?: string;
}) {
  const { design } = useDesign();

  const textClasses = {
    corporate: 'text-white',
    industrial: 'text-slate-900 font-black tracking-tight uppercase',
    minimal: 'text-slate-900 font-light',
  };

  const sizeClasses = {
    1: 'text-4xl md:text-5xl lg:text-6xl',
    2: 'text-3xl md:text-4xl',
    3: 'text-xl md:text-2xl',
  };

  const combinedClassName = cn('font-bold', sizeClasses[level], textClasses[design], className);

  if (level === 1) {
    return <h1 className={combinedClassName}>{children}</h1>;
  }
  if (level === 3) {
    return <h3 className={combinedClassName}>{children}</h3>;
  }
  return <h2 className={combinedClassName}>{children}</h2>;
}

// Design-aware text
export function Text({ 
  children, 
  variant = 'body',
  className
}: { 
  children: ReactNode; 
  variant?: 'body' | 'muted' | 'accent';
  className?: string;
}) {
  const { design } = useDesign();

  const textClasses = {
    corporate: {
      body: 'text-slate-300',
      muted: 'text-slate-500',
      accent: 'text-blue-400',
    },
    industrial: {
      body: 'text-slate-700',
      muted: 'text-slate-500',
      accent: 'text-amber-600',
    },
    minimal: {
      body: 'text-slate-600',
      muted: 'text-slate-400',
      accent: 'text-blue-600',
    },
  };

  return (
    <p className={cn(textClasses[design][variant], className)}>
      {children}
    </p>
  );
}
