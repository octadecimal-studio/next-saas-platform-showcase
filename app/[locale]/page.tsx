import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { Products } from '@/components/sections/Products';
import { Features } from '@/components/sections/Features';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { CTA } from '@/components/sections/CTA';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Products />
      <Features />
      <CaseStudies />
      <CTA />
    </>
  );
}
