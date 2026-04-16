import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { formatDate } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });
  return { title: t('title') };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'terms' });
  const updated = formatDate(new Date('2026-04-01'), locale);

  return (
    <section className="py-20 md:py-28">
      <div className="container-site max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3">{t('title')}</h1>
        <p className="text-sm text-muted mb-10">{t('updatedAt', { date: updated })}</p>

        <div className="space-y-6 text-pretty">
          <p className="text-muted">
            {locale === 'pl'
              ? 'Regulamin okresla zasady korzystania z platformy Octadecimal Cloud. Pelna tresc dostepna jest po zarejestrowaniu w systemie admin.octadecimal.cloud.'
              : 'The terms of service specify the rules for using the Octadecimal Cloud platform. Full text is available after registration at admin.octadecimal.cloud.'}
          </p>
        </div>
      </div>
    </section>
  );
}
