import type { MetadataRoute } from 'next';
import { getProductSlugs } from '@/content/products';
import { locales } from '@/lib/i18n/config';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.octadecimal.cloud';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const productSlugs = getProductSlugs();

  const staticRoutes = ['', '/produkty', '/kontakt', '/polityka-prywatnosci', '/regulamin'];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: now,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route === '/produkty' ? 0.9 : 0.5,
      });
    }

    for (const slug of productSlugs) {
      entries.push({
        url: `${baseUrl}/${locale}/produkty/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  return entries;
}
