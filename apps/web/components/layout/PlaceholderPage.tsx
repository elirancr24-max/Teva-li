'use client';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { SectionTag } from '@/components/brand/SectionTag';
import { MobileBottomNav } from '@/components/mobile/MobileBottomNav';
import { useCompact } from '@/hooks/use-compact';

type Props = {
  title: string;
  subtitle: string;
  phase: string;
  active?: 'home' | 'shop' | 'kayak' | 'about';
  navActive?: 'home' | 'shop' | 'kayak' | 'cart' | 'profile';
  accent?: string;
};

/** Reusable "coming next phase" stub for routes that will be implemented later. */
export function PlaceholderPage({
  title,
  subtitle,
  phase,
  active,
  navActive,
  accent = 'var(--watermelon)',
}: Props) {
  const m = useCompact();
  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader active={active} />

      <main
        style={{
          flex: 1,
          padding: m ? '60px 20px 80px' : '120px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          position: 'relative',
        }}
      >
        <div className="watermark" style={{ top: 40, left: -40, fontSize: m ? '160px' : '320px', opacity: 0.05 }}>
          {phase}
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <SectionTag num={phase} label="בקרוב" />
          <h1
            className="display"
            style={{
              fontSize: m ? 'clamp(60px, 18vw, 100px)' : 'clamp(90px, 11vw, 180px)',
              margin: m ? '16px 0 0' : '24px 0 0',
              lineHeight: 0.85,
              letterSpacing: '-0.05em',
            }}
          >
            {title}
            <span style={{ color: accent }}>.</span>
          </h1>
          <p
            style={{
              fontFamily: 'var(--serif)',
              fontSize: m ? 18 : 24,
              lineHeight: 1.5,
              maxWidth: 640,
              marginTop: m ? 16 : 24,
              opacity: 0.8,
            }}
          >
            {subtitle}
          </p>
          <div
            style={{
              marginTop: m ? 24 : 36,
              padding: '14px 18px',
              border: '2px solid var(--ink)',
              boxShadow: '5px 5px 0 var(--ink)',
              background: 'var(--paper-2)',
              fontFamily: 'var(--mono)',
              fontSize: 12,
              letterSpacing: '0.08em',
              maxWidth: 480,
              textTransform: 'uppercase',
            }}
          >
            עמוד זה נבנה כעת בשלב הבא של המיגרציה לְ-Next.js + Supabase.
          </div>
        </div>
      </main>

      <SiteFooter />
      {m && <MobileBottomNav active={navActive} accent={accent} />}
    </div>
  );
}
