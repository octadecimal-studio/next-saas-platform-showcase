import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ProductCard } from './ProductCard';
import { getFeaturedProducts } from '@/content/products';

export function Products() {
  const t = useTranslations('products');
  const featured = getFeaturedProducts();

  return (
    <section id="products" className="border-b border-border py-20 md:py-28">
      <div className="container-site">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance mb-4">
            {t('title')}
          </h2>
          <p className="text-muted text-pretty">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Link href="/produkty">
          <Button variant="secondary">
            {t('viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
