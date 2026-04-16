'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { locales, localeFlags, type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

interface LocaleSwitcherProps {
  className?: string;
}

export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={cn('inline-flex items-center gap-1 rounded-md border border-border p-0.5', className)}
      role="group"
      aria-label="Language switcher"
    >
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          className={cn(
            'inline-flex h-7 min-w-[2.5rem] items-center justify-center rounded px-2 text-xs font-medium transition-colors',
            locale === loc
              ? 'bg-foreground text-background'
              : 'text-muted hover:text-foreground',
          )}
          aria-current={locale === loc ? 'true' : undefined}
        >
          {localeFlags[loc]}
        </button>
      ))}
    </div>
  );
}
