'use client';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { MobileBottomNav } from '@/components/mobile/MobileBottomNav';
import { MobileGreeting } from '@/components/mobile/MobileGreeting';
import { MobileSearchPill } from '@/components/mobile/MobileSearchPill';
import { useCompact } from '@/hooks/use-compact';
import { HeroMega } from './HeroMega';
import { TickerStrip } from './TickerStrip';
import { ValuePropsBar } from './ValuePropsBar';
import { BestSellersV2 } from './BestSellersV2';
import { KayakHero } from './KayakHero';
import { ProcessSection } from './ProcessSection';
import { FruitMosaic } from './FruitMosaic';
import { Testimonials } from './Testimonials';
import { CTASection } from './CTASection';

type Props = { accent?: string; compact?: boolean };

export function HomePage({ accent = 'var(--watermelon)', compact }: Props) {
  const m = useCompact(compact);
  return (
    <div style={{ background: 'var(--paper)' }}>
      <SiteHeader active="home" compact={compact} />
      {m && (
        <>
          <MobileGreeting accent={accent} />
          <div style={{ paddingTop: 16 }}>
            <MobileSearchPill accent={accent} />
          </div>
        </>
      )}
      <HeroMega accent={accent} compact={compact} />
      <TickerStrip compact={compact} />
      <ValuePropsBar accent={accent} compact={compact} />
      <BestSellersV2 accent={accent} compact={compact} />
      <KayakHero accent={accent} compact={compact} />
      <ProcessSection accent={accent} compact={compact} />
      <FruitMosaic accent={accent} compact={compact} />
      <Testimonials accent={accent} compact={compact} />
      <CTASection accent={accent} compact={compact} />
      <SiteFooter compact={compact} />
      {m && <MobileBottomNav active="home" accent={accent} />}
    </div>
  );
}
