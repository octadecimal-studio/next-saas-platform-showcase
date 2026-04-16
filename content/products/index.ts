import type { Product, ProductCategory, ProductStatus } from './_types';
import { businessData } from './business-data';
import { tenders } from './tenders';
import { aiFreelance } from './ai-freelance';

/**
 * Product registry — single source of truth.
 *
 * Dodanie nowego produktu:
 * 1. Utworz `content/products/<slug>.ts` z exportem typu Product
 * 2. Dodaj import tutaj
 * 3. Dodaj do tablicy `products`
 */
const products: Product[] = [businessData, tenders, aiFreelance];

export function getAllProducts(): Product[] {
  return [...products].sort((a, b) => a.order - b.order);
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter((p) => p.featured);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return getAllProducts().filter((p) => p.category === category);
}

export function getProductsByStatus(status: ProductStatus): Product[] {
  return getAllProducts().filter((p) => p.status === status);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

export function getProductCategories(): ProductCategory[] {
  return Array.from(new Set(products.map((p) => p.category)));
}

export type { Product, ProductCategory, ProductStatus } from './_types';
