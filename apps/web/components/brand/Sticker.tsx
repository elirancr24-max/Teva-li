type Props = {
  children: React.ReactNode;
  /** CSS color value or var(--token). Defaults to citrus yellow. */
  color?: string;
  /** Rotation in degrees. */
  rotate?: number;
  /** Force light text on dark backgrounds (use when sitting on Berry). */
  dark?: boolean;
};

export function Sticker({ children, color = 'var(--citrus)', rotate = -8, dark = false }: Props) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 14px',
        background: color,
        color: dark ? 'var(--paper)' : 'var(--ink)',
        border: '2px solid var(--ink)',
        borderRadius: '999px',
        fontFamily: 'var(--mono)',
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        transform: `rotate(${rotate}deg)`,
        boxShadow: '3px 3px 0 var(--ink)',
      }}
    >
      {children}
    </div>
  );
}
