type Props = { size?: number };

export function MelonArt({ size = 120 }: Props) {
  return (
    <div
      style={{
        width: size,
        height: size * 0.82,
        background: `radial-gradient(ellipse at center, var(--tangerine), #c4612e)`,
        borderRadius: '50%',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'inset -8px -8px 16px rgba(0,0,0,.18)',
      }}
    >
      {/* highlight */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '20%',
          width: '30%',
          height: '20%',
          background: 'rgba(255,255,255,.25)',
          borderRadius: '50%',
          filter: 'blur(8px)',
        }}
      />
    </div>
  );
}
