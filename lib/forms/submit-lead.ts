import type { ContactFormData } from './contact-schema';

export interface LeadPayload extends Omit<ContactFormData, 'consent' | 'website'> {
  consent: boolean;
  locale: string;
  source: string;
}

export interface LeadResponse {
  ok: boolean;
  error?: string;
}

export async function submitLead(
  data: ContactFormData,
  locale: string,
): Promise<LeadResponse> {
  const payload: LeadPayload = {
    name: data.name,
    email: data.email,
    company: data.company ?? '',
    phone: data.phone ?? '',
    productInterest: data.productInterest ?? '',
    message: data.message,
    consent: Boolean(data.consent),
    locale,
    source: 'octadecimal.cloud',
  };

  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { ok: false, error: err.error ?? `HTTP ${res.status}` };
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Network error' };
  }
}
