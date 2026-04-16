'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { createContactSchema, type ContactFormData } from '@/lib/forms/contact-schema';
import { submitLead } from '@/lib/forms/submit-lead';
import { getAllProducts } from '@/content/products';
import type { Locale } from '@/lib/i18n/config';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const locale = useLocale() as Locale;
  const products = getAllProducts();

  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const schema = createContactSchema({
    nameMin: t('errors.nameMin'),
    emailInvalid: t('errors.emailInvalid'),
    messageMin: t('errors.messageMin'),
    consentRequired: t('errors.consentRequired'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: { website: '' },
  });

  const onSubmit = async (data: ContactFormData) => {
    setState('submitting');
    setErrorMsg('');
    const result = await submitLead(data, locale);
    if (result.ok) {
      setState('success');
      reset();
    } else {
      setState('error');
      setErrorMsg(result.error ?? '');
    }
  };

  if (state === 'success') {
    return (
      <div className="rounded-lg border border-border bg-foreground/[0.02] p-8 text-center">
        <p className="text-lg font-semibold mb-2">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none -left-[9999px]"
        {...register('website')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5">
            {t('name')} <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            placeholder={t('namePlaceholder')}
            error={!!errors.name}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">
            {t('email')} <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            type="email"
            placeholder={t('emailPlaceholder')}
            error={!!errors.email}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-1.5">
            {t('company')}
          </label>
          <Input id="company" placeholder={t('companyPlaceholder')} {...register('company')} />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
            {t('phone')}
          </label>
          <Input id="phone" type="tel" placeholder={t('phonePlaceholder')} {...register('phone')} />
        </div>
      </div>

      <div>
        <label htmlFor="productInterest" className="block text-sm font-medium mb-1.5">
          {t('productInterest')}
        </label>
        <Select id="productInterest" {...register('productInterest')}>
          <option value="">{t('productInterestNone')}</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name[locale]}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1.5">
          {t('message')} <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="message"
          rows={5}
          placeholder={t('messagePlaceholder')}
          error={!!errors.message}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-red-500 mt-1">{errors.message.message}</p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-border"
            {...register('consent')}
          />
          <span className="text-muted leading-snug">{t('consent')}</span>
        </label>
        {errors.consent && (
          <p className="text-xs text-red-500 mt-1">{errors.consent.message}</p>
        )}
      </div>

      {state === 'error' && (
        <div role="alert" className="rounded-md border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-600">
          {t('error')}
          {errorMsg && <span className="block text-xs mt-1 opacity-70">{errorMsg}</span>}
        </div>
      )}

      <Button type="submit" size="lg" disabled={state === 'submitting'}>
        {state === 'submitting' ? t('submitting') : t('submit')}
        {state !== 'submitting' && <Send className="h-4 w-4" />}
      </Button>
    </form>
  );
}
