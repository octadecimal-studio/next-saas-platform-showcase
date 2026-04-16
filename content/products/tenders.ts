import type { Product } from './_types';

export const tenders: Product = {
  id: 'tenders',
  slug: 'tenders',
  category: 'data',
  status: 'beta',
  featured: true,
  order: 2,
  name: {
    pl: 'Tenders',
    en: 'Tenders',
  },
  tagline: {
    pl: 'Monitoring zamowien publicznych BZP/TED',
    en: 'BZP/TED public tenders monitoring',
  },
  description: {
    pl: 'Codzienne skanowanie portalu zamowien publicznych BZP i TED. Automatyczne filtry po kodach CPV, wartosci, regionie. Powiadomienia email i webhook. Eksport do CSV.',
    en: 'Daily scanning of BZP and TED public tender portals. Automatic filters by CPV codes, value, region. Email and webhook notifications. CSV export.',
  },
  features: [
    {
      title: { pl: 'BZP + TED', en: 'BZP + TED' },
      description: {
        pl: 'Polskie i europejskie zamowienia publiczne',
        en: 'Polish and European public tenders',
      },
      icon: 'Globe',
    },
    {
      title: { pl: 'Filtry CPV', en: 'CPV filters' },
      description: {
        pl: 'Automatyczne filtrowanie po kodach CPV',
        en: 'Automatic filtering by CPV codes',
      },
      icon: 'Filter',
    },
    {
      title: { pl: 'Alerty email', en: 'Email alerts' },
      description: {
        pl: 'Codzienne podsumowania nowych przetargow',
        en: 'Daily summaries of new tenders',
      },
      icon: 'Mail',
    },
    {
      title: { pl: 'API + webhook', en: 'API + webhook' },
      description: {
        pl: 'Integracja z CRM lub wlasnym systemem',
        en: 'Integration with CRM or custom system',
      },
      icon: 'Webhook',
    },
  ],
  icon: 'Search',
  url: 'https://tenders.octadecimal.cloud',
  cta: { pl: 'Sprobuj w becie', en: 'Try in beta' },
  tags: ['tenders', 'bzp', 'ted', 'monitoring', 'public-procurement'],
  launchDate: '2026-02-15',
};
