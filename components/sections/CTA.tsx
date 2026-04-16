import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/Button';

export function CTA() {
  const t = useTranslations('cta');

  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="container-site">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance mb-6">
            {t('title')}
          </h2>
          <p className="text-lg text-muted text-pretty mb-8">
            {t('subtitle')}
          </p>
          <Link href="/kontakt">
            <Button size="lg">
              {t('button')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
