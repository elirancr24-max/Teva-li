import type { CSSProperties } from 'react';

type Props = {
  children: React.ReactNode;
  variant?: 'ink' | 'accent';
  size?: number;
  style?: CSSProperties;
};

export function PriceTag({ children, variant = 'ink', size = 18, style }: Props) {
  const isInk = variant === 'ink';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        background: isInk ? 'var(--ink)' : 'var(--watermelon)',
        color: isInk ? 'var(--paper)' : 'var(--ink)',
        fontFamily: 'var(--display)',
        fontWeight: 900,
        fontSize: size,
        border: '2px solid var(--ink)',
        letterSpacing: '-0.02em',
        transition: 'all 240ms var(--easing)',
        ...style,
      }}
    >
      {children}
    </span>
  );
}
