'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { cn } from '@/lib/utils';

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function Section({ 
  children, 
  className,
  variant = 'primary'
}: { 
  children: ReactNode; 
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
}) {
  const bgClasses = {
    primary: 'bg-gradient-to-br from-white via-orange-50/20 to-white text-slate-900',
    secondary: 'bg-gradient-to-b from-slate-50 to-white text-slate-900',
    accent: 'bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white',
  };

  return (
    <section className={cn('py-20', bgClasses[variant], className)}>
      {children}
    </section>
  );
}

export function Card({ 
  children, 
  className,
  hover = true
}: { 
  children: ReactNode; 
  className?: string;
  hover?: boolean;
}) {
  return (
    <div className={cn(
      'p-8 rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100',
      hover && 'hover:shadow-2xl hover:shadow-orange-200/30 hover:-translate-y-1 transition-all duration-300',
      className
    )}>
      {children}
    </div>
  );
}

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
  const buttonClasses = {
    primary: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105',
    secondary: 'bg-white text-slate-700 rounded-full shadow-lg shadow-slate-200/50 border border-slate-200 hover:border-orange-300 hover:text-orange-600',
  };

  return (
    <button 
      className={cn('px-8 py-4 font-semibold transition-all', buttonClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function Heading({ 
  children, 
  level = 2,
  className
}: { 
  children: ReactNode; 
  level?: 1 | 2 | 3;
  className?: string;
}) {
  const sizeClasses = {
    1: 'text-4xl md:text-5xl lg:text-6xl',
    2: 'text-3xl md:text-4xl',
    3: 'text-xl md:text-2xl',
  };

  const combinedClassName = cn('font-bold text-slate-900', sizeClasses[level], className);

  if (level === 1) {
    return <h1 className={combinedClassName}>{children}</h1>;
  }
  if (level === 3) {
    return <h3 className={combinedClassName}>{children}</h3>;
  }
  return <h2 className={combinedClassName}>{children}</h2>;
}

export function Text({ 
  children, 
  variant = 'body',
  className
}: { 
  children: ReactNode; 
  variant?: 'body' | 'muted' | 'accent';
  className?: string;
}) {
  const textClasses = {
    body: 'text-slate-600',
    muted: 'text-slate-400',
    accent: 'text-orange-600',
  };

  return (
    <p className={cn(textClasses[variant], className)}>
      {children}
    </p>
  );
}
