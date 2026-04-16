import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const leadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(190),
  company: z.string().max(190).optional().default(''),
  phone: z.string().max(40).optional().default(''),
  productInterest: z.string().max(60).optional().default(''),
  message: z.string().min(10).max(4000),
  consent: z.boolean().refine((v) => v === true, 'consent required'),
  locale: z.string().max(10),
  source: z.string().max(60),
  website: z.string().max(0).optional().default(''),
});

// Prosty in-memory rate limit (per-IP, per-route)
const rateMap = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 10;
const WINDOW_MS = 60_000;

function rateLimitOk(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= LIMIT) return false;
  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (!rateLimitOk(ip)) {
    return NextResponse.json({ error: 'rate_limit' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'validation', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Honeypot — jesli "website" ma wartosc, udajemy sukces
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const laravelUrl = process.env.LARAVEL_API_URL;
  const laravelToken = process.env.LARAVEL_API_TOKEN;

  if (!laravelUrl) {
    // Tryb dev — loguj i zwroc sukces
    if (process.env.NODE_ENV !== 'production') {
      console.log('[leads] dev mode, no LARAVEL_API_URL — payload:', parsed.data);
      return NextResponse.json({ ok: true, mode: 'dev' });
    }
    return NextResponse.json({ error: 'backend_unconfigured' }, { status: 500 });
  }

  try {
    const res = await fetch(`${laravelUrl}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(laravelToken ? { Authorization: `Bearer ${laravelToken}` } : {}),
      },
      body: JSON.stringify({ ...parsed.data, ip }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return NextResponse.json(
        { error: 'backend_error', status: res.status, detail: text.slice(0, 200) },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: 'backend_unreachable', detail: err instanceof Error ? err.message : 'unknown' },
      { status: 502 },
    );
  }
}
