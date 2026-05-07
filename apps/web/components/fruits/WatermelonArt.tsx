type Props = { size?: number };

export function WatermelonArt({ size = 120 }: Props) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle at 50% 50%, var(--watermelon) 0 55%, #fff 55% 60%, var(--leaf) 60% 78%, #0a3d22 78% 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * 360;
        const x = 50 + Math.cos((angle * Math.PI) / 180) * 25;
        const y = 50 + Math.sin((angle * Math.PI) / 180) * 25;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: 6,
              height: 10,
              background: '#0a0a0a',
              borderRadius: '50%',
              transform: 'translate(-50%,-50%) rotate(20deg)',
            }}
          />
        );
      })}
    </div>
  );
}
