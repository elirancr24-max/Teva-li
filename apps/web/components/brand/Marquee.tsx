type Props = {
  items: string[];
  /** Pre-repetition multiplier (default 3 → seamless loop). */
  repeat?: number;
  fontSize?: number;
};

/** Infinite horizontal marquee — used for the rolling fruit list. */
export function Marquee({ items, repeat = 3, fontSize = 30 }: Props) {
  const repeated = Array.from({ length: repeat }).flatMap(() => items);
  return (
    <div
      className="marquee-mask"
      style={{
        background: 'var(--ink)',
        color: 'var(--paper)',
        padding: '20px 0',
        overflow: 'hidden',
        borderBottom: '2px solid var(--ink)',
        position: 'relative',
      }}
    >
      <div className="marquee" style={{ gap: 40, display: 'flex' }}>
        {repeated.map((x, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--display)',
              fontWeight: 800,
              fontSize,
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: 40,
              whiteSpace: 'nowrap',
            }}
          >
            {x}
            <span style={{ color: 'var(--watermelon)', fontSize: fontSize * 0.7 }}>✺</span>
          </span>
        ))}
      </div>
    </div>
  );
}
