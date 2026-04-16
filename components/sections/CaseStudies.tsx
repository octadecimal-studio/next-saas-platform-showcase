import { useTranslations, useLocale } from 'next-intl';
import { getAllCaseStudies } from '@/content/case-studies';
import { Card, CardContent } from '@/components/ui/Card';
import type { Locale } from '@/lib/i18n/config';

export function CaseStudies() {
  const t = useTranslations('caseStudies');
  const locale = useLocale() as Locale;
  const studies = getAllCaseStudies();

  return (
    <section id="case-studies" className="border-b border-border py-20 md:py-28 bg-foreground/[0.02]">
      <div className="container-site">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance mb-4">
            {t('title')}
          </h2>
          <p className="text-muted text-pretty">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studies.map((study) => (
            <Card key={study.id} className="bg-background">
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted uppercase tracking-wider">
                    {study.industry[locale]}
                  </span>
                  <span className="font-mono text-xs font-medium">
                    {study.metric[locale]}
                  </span>
                </div>
                <blockquote className="text-lg text-balance font-medium leading-relaxed">
                  &ldquo;{study.quote[locale]}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="h-8 w-8 rounded-full bg-foreground/10 inline-flex items-center justify-center text-xs font-semibold">
                    {study.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{study.author}</p>
                    <p className="text-xs text-muted">{study.role[locale]}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
