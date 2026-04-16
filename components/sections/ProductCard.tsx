import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { Product } from '@/content/products';
import type { Locale } from '@/lib/i18n/config';

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
}

export function ProductCard({ product, showCategory = true }: ProductCardProps) {
  const t = useTranslations('products');
  const locale = useLocale() as Locale;

  return (
    <Card className="flex flex-col h-full group">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant={product.status}>{t(`status.${product.status}`)}</Badge>
          {showCategory && (
            <span className="font-mono text-xs text-muted uppercase tracking-wider">
              {t(`category.${product.category}`)}
            </span>
          )}
        </div>
        <CardTitle className="text-xl">{product.name[locale]}</CardTitle>
        <CardDescription className="font-medium text-foreground">
          {product.tagline[locale]}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted line-clamp-4">
          {product.description[locale]}
        </p>
      </CardContent>
      <CardFooter className="justify-between mt-6 pt-4 border-t border-border">
        <Link
          href={`/produkty/${product.slug}` as never}
          className="inline-flex items-center gap-1 text-sm font-medium hover:text-muted transition-colors"
        >
          {t('detailsLink')}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
