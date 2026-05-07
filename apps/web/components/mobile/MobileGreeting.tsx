'use client';
import { useEffect, useState } from 'react';

type Props = { accent?: string };

function getGreeting(hour: number): string {
  if (hour < 11) return 'בוקר טוב ☀';
  if (hour < 17) return 'צהריים טובים';
  if (hour < 21) return 'אחר הצהריים';
  return 'ערב טוב 🌙';
}

/** Time-aware greeting card shown at top of mobile home. */
export function MobileGreeting({ accent = 'var(--watermelon)' }: Props) {
  const [greet, setGreet] = useState<string>('');
  useEffect(() => {
    setGreet(getGreeting(new Date().getHours()));
  }, []);

  return (
    <div
      style={{
        padding: '14px 16px 10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px dashed rgba(0,0,0,0.15)',
      }}
    >
      <div>
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 9,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            opacity: 0.55,
          }}
        >
          היום
        </div>
        <div
          style={{
            fontFamily: 'var(--display)',
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: '-0.02em',
            marginTop: 2,
          }}
        >
          {greet}
        </div>
      </div>
      <div
        style={{
          padding: '6px 10px',
          background: accent,
          color: 'var(--paper)',
          border: '1.5px solid var(--ink)',
          borderRadius: 999,
          fontFamily: 'var(--mono)',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.1em',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          boxShadow: '2px 2px 0 var(--ink)',
        }}
      >
        <span className="pulse-dot" style={{ background: 'var(--paper)' }} />
        טרי 06:00
      </div>
    </div>
  );
}
