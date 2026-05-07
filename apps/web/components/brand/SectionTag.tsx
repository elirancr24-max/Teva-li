type Props = { num: string | number; label: string };

export function SectionTag({ num, label }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 12,
        fontFamily: 'var(--mono)',
        fontSize: 12,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
      }}
    >
      <span style={{ opacity: 0.5 }}>{num}</span>
      <span
        style={{
          width: 30,
          height: 1,
          background: 'var(--ink)',
          display: 'inline-block',
        }}
      />
      <span style={{ fontWeight: 700 }}>{label}</span>
    </div>
  );
}
