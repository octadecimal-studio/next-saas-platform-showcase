import type { Product } from './_types';

export const aiFreelance: Product = {
  id: 'ai-freelance',
  slug: 'ai-freelance',
  category: 'ai',
  status: 'coming-soon',
  featured: true,
  order: 3,
  name: {
    pl: 'AI Freelance',
    en: 'AI Freelance',
  },
  tagline: {
    pl: 'Automatyzacja lead-genu dla freelancerow',
    en: 'Lead-gen automation for freelancers',
  },
  description: {
    pl: 'AI szuka i kwalifikuje leady dla solopreneurow i malych zespolow. Analiza ogloszen z LinkedIn, Pracuj, Upwork. Personalizowane outreach-e. Integracja z kalendarzem i CRM.',
    en: 'AI searches and qualifies leads for solopreneurs and small teams. Analysis of job listings from LinkedIn, Pracuj, Upwork. Personalized outreach. Calendar and CRM integration.',
  },
  features: [
    {
      title: { pl: 'Lead scoring AI', en: 'AI lead scoring' },
      description: {
        pl: 'Kwalifikacja lead-ow na podstawie twoich kryteriow',
        en: 'Lead qualification based on your criteria',
      },
      icon: 'Sparkles',
    },
    {
      title: { pl: 'Outreach generator', en: 'Outreach generator' },
      description: {
        pl: 'Spersonalizowane wiadomosci do kazdego lead-u',
        en: 'Personalized messages for every lead',
      },
      icon: 'MessageSquare',
    },
    {
      title: { pl: 'Kalendarz + CRM', en: 'Calendar + CRM' },
      description: {
        pl: 'Integracja z Google Calendar i Twenty CRM',
        en: 'Integration with Google Calendar and Twenty CRM',
      },
      icon: 'Calendar',
    },
    {
      title: { pl: 'Raporty tygodniowe', en: 'Weekly reports' },
      description: {
        pl: 'Metryki konwersji i rekomendacje AI',
        en: 'Conversion metrics and AI recommendations',
      },
      icon: 'BarChart',
    },
  ],
  icon: 'Sparkles',
  url: 'https://ai-freelance.wilsonos.com',
  cta: { pl: 'Zapisz sie na waitlist', en: 'Join waitlist' },
  tags: ['ai', 'lead-gen', 'freelance', 'automation', 'outreach'],
  launchDate: '2026-06-01',
};
