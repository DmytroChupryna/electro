/**
 * SEO Configuration for Techno Groop
 * Comprehensive metadata, structured data, and SEO utilities
 */

export const siteConfig = {
  name: 'Techno Groop',
  legalName: 'Techno Groop Sp. z o.o.',
  url: 'https://technogroop.com',
  logo: 'https://technogroop.com/logo.png',
  foundingDate: '2023',
  
  // Contact Information
  phone: '+48 578 992 316',
  email: 'info@technogroop.com',
  
  // Address
  address: {
    streetAddress: 'Ul. Biala 4/87',
    postalCode: '00-895',
    addressLocality: 'Warsaw',
    addressRegion: 'Mazowieckie',
    addressCountry: 'PL',
  },
  
  // Social profiles
  social: {
    linkedin: 'https://linkedin.com/company/technogroop',
  },
  
  // Business registration
  registration: {
    regon: '524314939',
    nip: '1231527015',
    krs: '0001016431',
  },
  
  // Service areas
  serviceAreas: [
    { country: 'Poland', cities: ['Warsaw', 'Łódź', 'Wrocław'] },
    { country: 'Belgium', cities: ['Antwerp', 'Bruges', 'Brussels', 'Ghent'] },
  ],
  
  // Certifications
  certifications: ['VCA', 'ISO 9001'],
};

export const defaultKeywords = {
  en: [
    'electrical services',
    'electrical installation',
    'industrial electrician',
    'low-current systems',
    'building automation',
    'BMS installation',
    'structured cabling',
    'server room installation',
    'photovoltaic installation',
    'electrical contractor Poland',
    'electrical contractor Belgium',
    'VCA certified electrician',
    'Cat6 cabling',
    'KNX installation',
    'DALI lighting',
    'access control systems',
    'CCTV installation',
  ],
  pl: [
    'usługi elektryczne',
    'instalacje elektryczne',
    'elektryk przemysłowy',
    'systemy niskoprądowe',
    'automatyka budynkowa',
    'instalacja BMS',
    'okablowanie strukturalne',
    'wyposażenie serwerowni',
    'instalacje fotowoltaiczne',
    'wykonawca elektryczny Polska',
    'wykonawca elektryczny Belgia',
    'certyfikat VCA elektryk',
    'okablowanie Cat6',
    'instalacja KNX',
    'oświetlenie DALI',
    'systemy kontroli dostępu',
    'instalacja CCTV',
  ],
};

/**
 * Generate Organization structured data (JSON-LD)
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: siteConfig.logo,
      width: 294,
      height: 88,
    },
    foundingDate: siteConfig.foundingDate,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      ...siteConfig.address,
    },
    sameAs: [siteConfig.social.linkedin],
    taxID: siteConfig.registration.nip,
    vatID: `PL${siteConfig.registration.nip}`,
  };
}

/**
 * Generate LocalBusiness structured data (JSON-LD)
 */
export function generateLocalBusinessSchema(locale: string = 'en') {
  const descriptions = {
    en: 'Professional electrical installation, low-current systems, and building automation services for general contractors in Poland and Belgium. VCA certified team with full insurance coverage.',
    pl: 'Profesjonalne instalacje elektryczne, systemy niskoprądowe i automatyka budynkowa dla generalnych wykonawców w Polsce i Belgii. Certyfikowany zespół VCA z pełnym ubezpieczeniem.',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'ElectricalContractor',
    '@id': `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    url: siteConfig.url,
    logo: siteConfig.logo,
    image: siteConfig.logo,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      ...siteConfig.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.2297,
      longitude: 21.0122,
    },
    areaServed: siteConfig.serviceAreas.flatMap((area) =>
      area.cities.map((city) => ({
        '@type': 'City',
        name: city,
        containedInPlace: {
          '@type': 'Country',
          name: area.country,
        },
      }))
    ),
    hasCredential: siteConfig.certifications.map((cert) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: cert,
    })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  };
}

/**
 * Generate WebSite structured data (JSON-LD)
 */
export function generateWebSiteSchema(locale: string = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: locale === 'pl' ? 'pl-PL' : 'en-US',
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Service structured data (JSON-LD)
 */
export function generateServiceSchema(
  serviceName: string,
  serviceDescription: string,
  locale: string = 'en'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    description: serviceDescription,
    provider: {
      '@id': `${siteConfig.url}/#organization`,
    },
    areaServed: siteConfig.serviceAreas.map((area) => ({
      '@type': 'Country',
      name: area.country,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: serviceName,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: serviceName,
          },
        },
      ],
    },
  };
}

/**
 * Generate BreadcrumbList structured data (JSON-LD)
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQ structured data (JSON-LD)
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate ContactPage structured data (JSON-LD)
 */
export function generateContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Techno Groop',
    description: 'Get in touch with Techno Groop for electrical installation and low-current system services.',
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
    },
  };
}

/**
 * Generate AboutPage structured data (JSON-LD)
 */
export function generateAboutPageSchema(locale: string = 'en') {
  const descriptions = {
    en: 'Learn about Techno Groop - a professional electrical contractor serving Poland and Belgium with VCA certified specialists.',
    pl: 'Dowiedz się więcej o Techno Groop - profesjonalnym wykonawcy instalacji elektrycznych z certyfikowanymi specjalistami VCA.',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: locale === 'pl' ? 'O nas - Techno Groop' : 'About Us - Techno Groop',
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    url: `${siteConfig.url}/${locale}/about`,
    mainEntity: {
      '@id': `${siteConfig.url}/#organization`,
    },
  };
}

/**
 * Generate Project/Work structured data (JSON-LD)
 */
export function generateProjectSchema(project: {
  name: string;
  description: string;
  image: string;
  location: string;
  year: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.description,
    image: project.image,
    dateCreated: project.year,
    locationCreated: {
      '@type': 'Place',
      name: project.location,
    },
    creator: {
      '@id': `${siteConfig.url}/#organization`,
    },
  };
}
