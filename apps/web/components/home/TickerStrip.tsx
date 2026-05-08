'use client';
import { useCompact } from '@/hooks/use-compact';
import { Marquee } from '@/components/brand/Marquee';

const ITEMS = [
  'אננס מתוק', 'מלון אמבוסיה', 'אבטיח אדום', 'תות שדה', 'אוכמניות',
  'דובדבנים', 'ענבי קונקורד', 'קיווי זהב', 'מנגו ישראלי', 'פפאיה', 'ליצ׳י', 'משמש',
];

export function TickerStrip({ compact }: { compact?: boolean }) {
  const m = useCompact(compact);
  return <Marquee items={ITEMS} fontSize={m ? 20 : 30} />;
}
