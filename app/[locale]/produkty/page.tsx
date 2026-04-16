import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProductsCatalog } from './ProductsCatalog';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'products' });

  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        <div className="max-w-2xl mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-muted text-pretty">{t('subtitle')}</p>
        </div>

        <ProductsCatalog />
      </div>
    </section>
  );
}
