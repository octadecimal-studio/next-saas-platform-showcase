import { useTranslations } from 'next-intl';
import { Database, Workflow, Sparkles, Plug, type LucideIcon } from 'lucide-react';
import { features } from '@/content/features';

const iconMap: Record<string, LucideIcon> = {
  Database,
  Workflow,
  Sparkles,
  Plug,
};

export function Features() {
  const t = useTranslations('features');

  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="container-site">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance mb-4">
            {t('title')}
          </h2>
          <p className="text-muted text-pretty">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon] ?? Database;
            return (
              <div
                key={feature.key}
                className="p-6 rounded-lg border border-border bg-background hover:border-foreground/20 transition-colors"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-foreground/5 mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-2">
                  {t(`items.${feature.key}.title`)}
                </h3>
                <p className="text-sm text-muted">
                  {t(`items.${feature.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
