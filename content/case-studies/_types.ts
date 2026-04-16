import type { LocalizedText } from '../products/_types';

export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  industry: LocalizedText;
  product: string;
  metric: LocalizedText;
  quote: LocalizedText;
  author: string;
  role: LocalizedText;
  order: number;
}
