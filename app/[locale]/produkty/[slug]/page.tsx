import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  getProductBySlug,
  getProductSlugs,
} from '@/content/products';
import { routing } from '@/lib/i18n/navigation';
import type { Locale } from '@/lib/i18n/config';

export function generateStaticParams() {
  const slugs = getProductSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const l = locale as Locale;
  return {
    title: `${product.name[l]} — ${product.tagline[l]}`,
    description: product.description[l],
    openGraph: {
      title: product.name[l],
      description: product.tagline[l],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProductBySlug(slug);
  if (!product) notFound();

  const l = locale as Locale;
  const t = await getTranslations({ locale, namespace: 'products' });

  return (
    <article>
      {/* Hero */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="container-site">
          <Link
            href="/produkty"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t('title')}
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={product.status}>{t(`status.${product.status}`)}</Badge>
              <span className="font-mono text-xs text-muted uppercase tracking-wider">
                {t(`category.${product.category}`)}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-balance mb-4">
              {product.name[l]}
            </h1>
            <p className="text-xl md:text-2xl text-muted text-pretty mb-8">
              {product.tagline[l]}
            </p>

            <p className="text-base text-pretty leading-relaxed mb-10 max-w-2xl">
              {product.description[l]}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              {product.url && product.status !== 'coming-soon' && (
                <a href={product.url} target="_blank" rel="noopener noreferrer">
                  <Button size="lg">
                    {product.cta[l]}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              )}
              {product.status === 'coming-soon' && (
                <Link href="/kontakt">
                  <Button size="lg">
                    {product.cta[l]}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-border bg-background"
              >
                <h3 className="font-semibold mb-2">{feature.title[l]}</h3>
                <p className="text-sm text-muted">{feature.description[l]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tags */}
      {product.tags.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container-site">
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-muted px-2.5 py-1 rounded-full border border-border"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
