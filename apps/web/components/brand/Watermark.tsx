import type { CSSProperties } from 'react';

type Props = {
  children: React.ReactNode;
  /** Override CSS positioning + size + opacity. */
  style?: CSSProperties;
};

/** Big outlined typography that sits behind hero content for editorial depth. */
export function Watermark({ children, style }: Props) {
  return (
    <div
      className="watermark"
      style={{ color: 'var(--ink)', opacity: 0.06, ...style }}
    >
      {children}
    </div>
  );
}
