type Props = { size?: number };

export function PineappleArt({ size = 120 }: Props) {
  return (
    <div style={{ width: size, height: size * 1.3, position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: size * 0.7,
          height: size * 0.5,
        }}
      >
        {[-30, -10, 10, 30].map((rot, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 0,
              transform: `translateX(-50%) rotate(${rot}deg)`,
              transformOrigin: 'bottom center',
              width: size * 0.12,
              height: size * 0.45,
              background: 'var(--leaf)',
              clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: size,
          height: size * 0.85,
          background: 'var(--citrus)',
          borderRadius: '40% 40% 45% 45%',
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(0,0,0,.18) 0 2px, transparent 2px 14px), repeating-linear-gradient(-45deg, rgba(0,0,0,.18) 0 2px, transparent 2px 14px)',
        }}
      />
    </div>
  );
}
