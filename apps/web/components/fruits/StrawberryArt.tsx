type Props = { size?: number };

export function StrawberryArt({ size = 120 }: Props) {
  return (
    <div style={{ width: size, height: size * 1.15, position: 'relative' }}>
      {/* leaf crown */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: size * 0.7,
          height: size * 0.25,
          background: 'var(--leaf)',
          clipPath:
            'polygon(50% 0, 70% 40%, 100% 30%, 80% 70%, 100% 100%, 50% 80%, 0 100%, 20% 70%, 0 30%, 30% 40%)',
        }}
      />
      {/* body */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: size * 0.85,
          height: size * 0.85,
          background: 'var(--watermelon)',
          clipPath: 'polygon(50% 100%, 0 30%, 25% 0, 75% 0, 100% 30%)',
        }}
      />
      {/* seeds */}
      {[...Array(12)].map((_, i) => {
        const x = 25 + ((i * 13) % 60);
        const y = 30 + ((i * 17) % 50);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${y}%`,
              left: `${x}%`,
              width: 3,
              height: 5,
              background: '#fff8a8',
              borderRadius: '50%',
              transform: 'rotate(20deg)',
            }}
          />
        );
      })}
    </div>
  );
}
