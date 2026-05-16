import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY is not set');
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-02-24.acacia' });
  }
  return _stripe;
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as never)[prop as never];
  },
});

export const CURRENCY = 'ils' as const;

/** Dimona = free delivery; ₪25 elsewhere (within Israel). */
export function computeDeliveryCents(city: string): number {
  if (city.trim() === 'דימונה') return 0;
  return 2500;
}
