import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Geist, Geist_Mono, Sora } from 'next/font/google';
import { cn } from '@/lib/utils';
import '../globals.css';
import DesignSwitcher from '@/components/DesignSwitcher';
import { DesignProvider } from '@/context/DesignContext';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  
  return {
    title: {
      default: t('title'),
      template: '%s | Techno Groop',
    },
    description: t('description'),
    keywords: ['electrical services', 'electrical installation', 'electrician', 'Poland', 'Belgium', 'VCA', 'contractor'],
    authors: [{ name: 'Techno Groop Sp. z o.o.' }],
    creator: 'Techno Groop',
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale === 'pl' ? 'pl_PL' : 'en_US',
      siteName: 'Techno Groop',
      url: `https://technogroop.com/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: `https://technogroop.com/${locale}`,
      languages: {
        'pl': '/pl',
        'en': '/en',
      },
    },
    verification: {
      // Add Google Search Console verification when available
      // google: 'verification-code',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          sora.variable,
          'font-sans antialiased'
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <DesignProvider>
            {children}
            <DesignSwitcher />
          </DesignProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
