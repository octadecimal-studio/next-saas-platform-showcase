import type { CaseStudy } from './_types';

export const caseStudies: CaseStudy[] = [
  {
    id: 'crm-enrichment',
    slug: 'crm-enrichment',
    client: 'Agencja sprzedazy B2B',
    industry: { pl: 'Sprzedaz B2B', en: 'B2B sales' },
    product: 'business-data',
    metric: { pl: '+47% lead-ow zakwalifikowanych', en: '+47% qualified leads' },
    quote: {
      pl: 'Wzbogacanie rekordow w CRM o dane z REGON i KRS skrocilo czas kwalifikacji lead-u z 20 do 2 minut.',
      en: 'Enriching CRM records with REGON and KRS data reduced lead qualification time from 20 to 2 minutes.',
    },
    author: 'Marek K.',
    role: { pl: 'Head of Sales', en: 'Head of Sales' },
    order: 1,
  },
  {
    id: 'tenders-monitoring',
    slug: 'tenders-monitoring',
    client: 'Firma IT',
    industry: { pl: 'IT / integracja systemow', en: 'IT / systems integration' },
    product: 'tenders',
    metric: { pl: '3 przetargi wygrane w 2 miesiace', en: '3 tenders won in 2 months' },
    quote: {
      pl: 'Dzieki filtrom CPV dostajemy tylko istotne dla nas ogloszenia. Zero szumu, tylko lead-y.',
      en: 'Thanks to CPV filters, we only receive relevant announcements. Zero noise, just leads.',
    },
    author: 'Anna W.',
    role: { pl: 'CEO', en: 'CEO' },
    order: 2,
  },
];

export function getAllCaseStudies(): CaseStudy[] {
  return [...caseStudies].sort((a, b) => a.order - b.order);
}
