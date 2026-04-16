import { z } from 'zod';

export function createContactSchema(errors: {
  nameMin: string;
  emailInvalid: string;
  messageMin: string;
  consentRequired: string;
}) {
  return z.object({
    name: z.string().min(2, errors.nameMin),
    email: z.string().email(errors.emailInvalid),
    company: z.string().optional().default(''),
    phone: z.string().optional().default(''),
    productInterest: z.string().optional().default(''),
    message: z.string().min(10, errors.messageMin),
    consent: z.literal(true, {
      errorMap: () => ({ message: errors.consentRequired }),
    }),
    // Honeypot — powinien byc pusty
    website: z.string().max(0).optional().default(''),
  });
}

export type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;
