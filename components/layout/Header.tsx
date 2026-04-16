'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { LogoSweep } from '@/components/brand/LogoSweep';
import { Button } from '@/components/ui/Button';
import { LocaleSwitcher } from './LocaleSwitcher';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('nav');
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: '/produkty', label: t('products') },
    { href: '/#case-studies', label: t('caseStudies') },
    { href: '/kontakt', label: t('contact') },
  ];

  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL ?? 'https://admin.octadecimal.cloud';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between">
        <Link href="/" className="group" aria-label="Octadecimal Cloud — homepage">
          <LogoSweep />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href as never}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LocaleSwitcher />
          <a href={adminUrl} rel="noopener">
            <Button variant="secondary" size="sm">
              {t('login')}
            </Button>
          </a>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          'md:hidden overflow-hidden border-t border-border bg-background transition-all',
          mobileOpen ? 'max-h-96' : 'max-h-0 border-t-0',
        )}
      >
        <div className="container-site flex flex-col gap-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href as never}
              className="text-sm text-foreground hover:text-muted transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <LocaleSwitcher />
            <a href={adminUrl} rel="noopener">
              <Button variant="secondary" size="sm">
                {t('login')}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
