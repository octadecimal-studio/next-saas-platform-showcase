'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/Button';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative border-b border-border overflow-hidden">
      <div className="container-site py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted font-mono uppercase tracking-wider mb-6">
            {t('eyebrow')}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-balance mb-6">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-muted text-pretty mb-10 max-w-2xl">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/produkty">
              <Button size="lg">
                {t('ctaPrimary')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/kontakt">
              <Button size="lg" variant="secondary">
                {t('ctaSecondary')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </section>
  );
}
