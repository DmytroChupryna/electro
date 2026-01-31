'use client';

import { useRouter } from '@/i18n/routing';
import { useEffect } from 'react';

// Main page redirects to home-a (Corporate Dark design)
export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/home-a');
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
    </div>
  );
}
