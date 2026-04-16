import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { formatDate } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return { title: t('title') };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'privacy' });
  const updated = formatDate(new Date('2026-04-01'), locale);

  return (
    <section className="py-20 md:py-28">
      <div className="container-site max-w-3xl prose prose-neutral">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3">{t('title')}</h1>
        <p className="text-sm text-muted mb-10">{t('updatedAt', { date: updated })}</p>

        <div className="space-y-6 text-pretty">
          <p className="text-muted">
            {locale === 'pl'
              ? 'Administratorem danych osobowych jest Octadecimal HQ. Dane gromadzone sa wylacznie w celu realizacji kontaktu i swiadczenia uslug platformy. Szczegolowe informacje o przetwarzaniu danych dostepne sa na zyczenie.'
              : 'The personal data administrator is Octadecimal HQ. Data is collected solely for the purpose of contact and providing platform services. Detailed information about data processing is available upon request.'}
          </p>
        </div>
      </div>
    </section>
  );
}
