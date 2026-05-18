/** Dimona = free delivery; ₪25 elsewhere within service area. */
export function computeDeliveryCents(city: string): number {
  if (city.trim() === 'דימונה') return 0;
  return 2500;
}

export const DELIVERY_FEE_CENTS = 2500;
