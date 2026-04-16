# Contributing — octadecimal-saas

## Workflow

1. Branch: `feature/saas-<opis>` / `fix/saas-<opis>` / `chore/<opis>`
2. Commity po polsku, imperatyw, max 72 znaki: `feat(products): dodaj filtr kategorii`
3. Przed PR: `npm run lint && npm run typecheck && npm run test:e2e`
4. PR template w `.github/pull_request_template.md`

## Typy commitow

- `feat` — nowa funkcjonalnosc
- `fix` — naprawa bledu
- `docs` — dokumentacja
- `chore` — maintenance, deps
- `refactor` — zmiana bez nowej funkcjonalnosci
- `test` — dodanie/zmiana testow
- `perf` — wydajnosc

## Code style

- TypeScript strict mode
- Funkcyjne komponenty React (hooks)
- Tailwind utility-first, zero inline styles
- `clsx` + `tailwind-merge` dla warunkowych klas (helper `cn()` w `lib/utils.ts`)
- Server Components domyslnie, `"use client"` tylko gdy konieczne

## Weryfikacja (OBOWIAZKOWE)

Po zmianach UI **zawsze Playwright**:

```bash
npm run dev &
npx playwright test tests/e2e/<plik>.spec.ts
```

## Dodanie produktu

```ts
// content/products/moj-nowy-produkt.ts
import type { Product } from './_types';

export const mojNowyProdukt: Product = {
  id: 'moj-nowy-produkt',
  slug: 'moj-nowy-produkt',
  category: 'automatyzacja',
  status: 'beta',
  featured: true,
  order: 10,
  name: { pl: 'Moj Nowy Produkt', en: 'My New Product' },
  tagline: { pl: '...', en: '...' },
  description: { pl: '...', en: '...' },
  features: [/* ... */],
  icon: 'Zap',
  url: 'https://nowy.octadecimal.cloud',
  cta: { pl: 'Sprobuj za darmo', en: 'Try for free' },
  tags: ['automation', 'ai'],
};
```

Import w `content/products/index.ts` — gotowe.
