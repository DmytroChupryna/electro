import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Geist, Geist_Mono, Sora } from 'next/font/google';
import { cn } from '@/lib/utils';
import '../globals.css';
import DesignSwitcher from '@/components/DesignSwitcher';
import { DesignProvider } from '@/context/DesignContext';
import JsonLd from '@/components/JsonLd';
import {
  siteConfig,
  defaultKeywords,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
} from '@/lib/seo';

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
  const keywords = defaultKeywords[locale as keyof typeof defaultKeywords] || defaultKeywords.en;
  
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t('title'),
      template: '%s | Techno Groop',
    },
    description: t('description'),
    keywords: keywords,
    authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale === 'pl' ? 'pl_PL' : 'en_US',
      alternateLocale: locale === 'pl' ? 'en_US' : 'pl_PL',
      siteName: siteConfig.name,
      url: `${siteConfig.url}/${locale}`,
      images: [
        {
          url: `${siteConfig.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - Professional Electrical Services`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${siteConfig.url}/og-image.png`],
      creator: '@technogroop',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        'pl': `${siteConfig.url}/pl`,
        'en': `${siteConfig.url}/en`,
        'x-default': `${siteConfig.url}/en`,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',
    category: 'business',
    classification: 'Electrical Contractor',
    verification: {
      // Add verification codes when available
      // google: 'google-site-verification-code',
      // yandex: 'yandex-verification-code',
    },
    other: {
      'geo.region': 'PL-MZ',
      'geo.placename': 'Warsaw',
      'geo.position': '52.2297;21.0122',
      'ICBM': '52.2297, 21.0122',
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

  const structuredData = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(locale),
    generateWebSiteSchema(locale),
  ];

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <JsonLd data={structuredData} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#F25A24" />
        <meta name="msapplication-TileColor" content="#F25A24" />
      </head>
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
