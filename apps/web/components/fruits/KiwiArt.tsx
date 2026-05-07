type Props = { size?: number };

export function KiwiArt({ size = 120 }: Props) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle at center, #fff 0 22%, var(--leaf) 22% 80%, #6b5012 80% 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* center seed pattern */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * 360;
        const r = size * 0.16;
        const x = 50 + Math.cos((angle * Math.PI) / 180) * 22;
        const y = 50 + Math.sin((angle * Math.PI) / 180) * 22;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: 4,
              height: 6,
              background: '#0a0a0a',
              borderRadius: '50%',
              transform: `translate(-50%,-50%) rotate(${angle}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}
