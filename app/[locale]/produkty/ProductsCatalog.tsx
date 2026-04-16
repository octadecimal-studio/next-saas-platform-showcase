'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { ProductCard } from '@/components/sections/ProductCard';
import { Button } from '@/components/ui/Button';
import {
  getAllProducts,
  getProductCategories,
  type ProductCategory,
  type ProductStatus,
} from '@/content/products';
import { productStatuses } from '@/content/products/_types';
import { cn } from '@/lib/utils';

const CATEGORY_FILTER_THRESHOLD = 6;

export function ProductsCatalog() {
  const t = useTranslations('products');
  const allProducts = useMemo(() => getAllProducts(), []);
  const categories = useMemo(() => getProductCategories(), []);

  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<ProductStatus | 'all'>('all');

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      return true;
    });
  }, [allProducts, categoryFilter, statusFilter]);

  const showCategoryFilter = allProducts.length > CATEGORY_FILTER_THRESHOLD || categories.length > 1;
  const hasActiveFilters = categoryFilter !== 'all' || statusFilter !== 'all';

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-10 pb-6 border-b border-border">
        {showCategoryFilter && (
          <FilterGroup
            label={t('filter.category')}
            options={[
              { value: 'all', label: t('filter.all') },
              ...categories.map((c) => ({ value: c, label: t(`category.${c}`) })),
            ]}
            value={categoryFilter}
            onChange={(v) => setCategoryFilter(v as ProductCategory | 'all')}
          />
        )}
        <FilterGroup
          label={t('filter.status')}
          options={[
            { value: 'all', label: t('filter.all') },
            ...productStatuses.map((s) => ({ value: s, label: t(`status.${s}`) })),
          ]}
          value={statusFilter}
          onChange={(v) => setStatusFilter(v as ProductStatus | 'all')}
        />

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setCategoryFilter('all');
              setStatusFilter('all');
            }}
          >
            <X className="h-3.5 w-3.5" />
            {t('filter.clear')}
          </Button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-muted text-center py-16">{t('empty')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

interface FilterGroupProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

function FilterGroup({ label, options, value, onChange }: FilterGroupProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs uppercase tracking-wider text-muted">{label}:</span>
      <div className="flex flex-wrap gap-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium transition-colors',
              value === opt.value
                ? 'bg-foreground text-background border-foreground'
                : 'bg-background border-border text-muted hover:text-foreground hover:border-foreground/30',
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
