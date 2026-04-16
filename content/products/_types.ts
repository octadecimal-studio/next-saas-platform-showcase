export type ProductCategory = 'data' | 'automation' | 'ai' | 'tools';
export type ProductStatus = 'production' | 'beta' | 'coming-soon' | 'deprecated';

export interface LocalizedText {
  pl: string;
  en: string;
}

export interface ProductFeature {
  title: LocalizedText;
  description: LocalizedText;
  icon?: string;
}

export interface ProductScreenshot {
  src: string;
  alt: LocalizedText;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  slug: string;
  category: ProductCategory;
  status: ProductStatus;
  featured: boolean;
  order: number;
  name: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  features: ProductFeature[];
  icon: string;
  url?: string;
  cta: LocalizedText;
  tags: string[];
  screenshots?: ProductScreenshot[];
  launchDate?: string;
  metadata?: Record<string, unknown>;
}

export const productCategories: ProductCategory[] = ['data', 'automation', 'ai', 'tools'];
export const productStatuses: ProductStatus[] = ['production', 'beta', 'coming-soon', 'deprecated'];
