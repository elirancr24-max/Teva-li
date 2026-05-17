import { adminSupabase } from '@/lib/supabase/admin';

export const DEFAULT_SETTINGS = {
  business_name:      'טבע לי',
  business_phone:     '054-8897445',
  business_whatsapp:  '972548897445',
  business_email:     'orders@teva-li.com',
  business_address:   'דימונה',
  business_hours:     'א-ה 8:00-19:00 · ו 8:00-13:00',
  delivery_fee_cents: '2500',
  min_order_cents:    '8000',
  hero_title:         'פירות וירקות טריים — ישר מהשדה אליכם',
  hero_subtitle:      'משלוח עד הדלת בדימונה והסביבה. קיאקי פירות מעוצבים לאירועים.',
  banner_message:     '',
} as const;

export type SettingKey = keyof typeof DEFAULT_SETTINGS;
export type Settings = Record<SettingKey, string>;

/** Fetch all site settings, falling back to defaults if DB unavailable. */
export async function getSettings(): Promise<Settings> {
  try {
    const { data, error } = await adminSupabase.from('site_settings').select('key, value');
    if (error || !data) return { ...DEFAULT_SETTINGS };
    const overrides = Object.fromEntries(data.map((r) => [r.key, r.value]));
    return { ...DEFAULT_SETTINGS, ...overrides } as Settings;
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function whatsappLink(whatsapp: string, message?: string) {
  const cleaned = whatsapp.replace(/[^0-9]/g, '');
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${cleaned}${text}`;
}
