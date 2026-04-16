import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { LogoSweep } from '@/components/brand/LogoSweep';
import { Github, Linkedin } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-12 mt-24">
      <div className="container-site">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3">
            <LogoSweep />
            <p className="text-xs text-muted max-w-xs">
              {t('copyright', { year })}
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6 text-xs text-muted">
            <Link href="/polityka-prywatnosci" className="hover:text-foreground transition-colors">
              {t('privacy')}
            </Link>
            <Link href="/regulamin" className="hover:text-foreground transition-colors">
              {t('terms')}
            </Link>
            <a
              href="https://github.com/octadecimalhq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              aria-label={t('github')}
            >
              <Github className="h-3.5 w-3.5" />
              {t('github')}
            </a>
            <a
              href="https://www.linkedin.com/company/octadecimal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              aria-label={t('linkedin')}
            >
              <Linkedin className="h-3.5 w-3.5" />
              {t('linkedin')}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
