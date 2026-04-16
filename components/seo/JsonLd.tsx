import { getAllProducts } from '@/content/products';
import type { Locale } from '@/lib/i18n/config';

interface JsonLdProps {
  locale: Locale;
}

export function OrganizationJsonLd({ locale }: JsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.octadecimal.cloud';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Octadecimal Cloud',
    legalName: 'Octadecimal HQ',
    url: `${baseUrl}/${locale}`,
    logo: `${baseUrl}/brand/logo.png`,
    sameAs: ['https://github.com/octadecimalhq', 'https://www.linkedin.com/company/octadecimal'],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'kontakt@octadecimal.cloud',
      contactType: 'sales',
      availableLanguage: ['pl', 'en'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SoftwareApplicationsJsonLd({ locale }: JsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.octadecimal.cloud';
  const products = getAllProducts();

  const items = products.map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: p.name[locale],
    description: p.description[locale],
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${baseUrl}/${locale}/produkty/${p.slug}`,
  }));

  return (
    <>
      {items.map((item, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
