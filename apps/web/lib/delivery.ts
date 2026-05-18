export const CITIES_ALLOWED = ['דימונה', 'ירוחם', 'באר שבע'] as const;
export type AllowedCity = typeof CITIES_ALLOWED[number];

export const MIN_ORDER_CENTS = 5000;
export const FREE_DELIVERY_THRESHOLD = 15000;
export const DELIVERY_FEE_HIGH = 4000;
export const DELIVERY_FEE_STANDARD = 2500;

/** Returns delivery fee in cents based on subtotal. Does NOT validate minimum. */
export function computeDeliveryCents(subtotalCents: number): number {
  return subtotalCents >= FREE_DELIVERY_THRESHOLD ? DELIVERY_FEE_STANDARD : DELIVERY_FEE_HIGH;
}
