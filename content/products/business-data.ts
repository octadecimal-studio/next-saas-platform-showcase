import type { Product } from './_types';

export const businessData: Product = {
  id: 'business-data-module',
  slug: 'business-data',
  category: 'data',
  status: 'production',
  featured: true,
  order: 1,
  name: {
    pl: 'Business Data Module',
    en: 'Business Data Module',
  },
  tagline: {
    pl: 'REGON, KRS, CEIDG w jednym API',
    en: 'REGON, KRS, CEIDG in one API',
  },
  description: {
    pl: 'Pelna integracja z rejestrami panstwowymi. Wyszukuj, weryfikuj i wzbogacaj dane firmowe przez jedno API REST. Idealne do wzbogacania CRM, weryfikacji kontrahentow i monitoringu portfela klientow.',
    en: 'Full integration with state registers. Search, verify, and enrich company data through one REST API. Ideal for CRM enrichment, counterparty verification, and client portfolio monitoring.',
  },
  features: [
    {
      title: { pl: 'REGON online', en: 'REGON online' },
      description: {
        pl: 'Dostep do bazy GUS w czasie rzeczywistym',
        en: 'Real-time access to GUS database',
      },
      icon: 'Database',
    },
    {
      title: { pl: 'KRS pelny zakres', en: 'KRS full scope' },
      description: {
        pl: 'Odpisy aktualne, zarzady, reprezentacja',
        en: 'Current extracts, boards, representation',
      },
      icon: 'FileText',
    },
    {
      title: { pl: 'CEIDG jednoosobowe', en: 'CEIDG sole traders' },
      description: {
        pl: 'Wpisy aktywne i historyczne',
        en: 'Active and historical entries',
      },
      icon: 'User',
    },
    {
      title: { pl: 'Webhooks zmian', en: 'Change webhooks' },
      description: {
        pl: 'Automatyczne powiadomienia o zmianach w rejestrach',
        en: 'Automatic notifications about register changes',
      },
      icon: 'Bell',
    },
  ],
  icon: 'Database',
  url: 'https://admin.octadecimal.cloud/business-data',
  cta: { pl: 'Zobacz dokumentacje', en: 'See documentation' },
  tags: ['data', 'api', 'regon', 'krs', 'ceidg', 'compliance'],
  launchDate: '2024-06-01',
};
