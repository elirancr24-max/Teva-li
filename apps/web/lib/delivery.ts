export const CITIES_ALLOWED = ['דימונה', 'ירוחם', 'באר שבע'] as const;
export type AllowedCity = typeof CITIES_ALLOWED[number];

export const MIN_ORDER_CENTS = 5000;           // ₪50
export const FREE_DELIVERY_THRESHOLD = 15000;  // ₪150

// Dimona gets a discount on both tiers
const FEES: Record<AllowedCity, { standard: number; high: number }> = {
  'דימונה':    { standard: 2000, high: 3500 }, // ₪20 / ₪35
  'ירוחם':     { standard: 2500, high: 4000 }, // ₪25 / ₪40
  'באר שבע':   { standard: 2500, high: 4000 }, // ₪25 / ₪40
};

/** Returns delivery fee in cents. Does NOT validate minimum. */
export function computeDeliveryCents(subtotalCents: number, city: AllowedCity): number {
  const { standard, high } = FEES[city];
  return subtotalCents >= FREE_DELIVERY_THRESHOLD ? standard : high;
}

/** Min and max possible delivery across all cities, for cart display before city is known. */
export function deliveryRange(subtotalCents: number): { min: number; max: number } {
  const fees = CITIES_ALLOWED.map((c) => computeDeliveryCents(subtotalCents, c));
  return { min: Math.min(...fees), max: Math.max(...fees) };
}
