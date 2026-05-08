type Props = { size?: number };

export function GrapeArt({ size = 120 }: Props) {
  // Triangle cluster of 9 grape circles
  const positions = [
    [50, 15],
    [30, 30], [70, 30],
    [20, 50], [50, 50], [80, 50],
    [35, 70], [65, 70],
    [50, 88],
  ];
  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      {/* stem */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '48%',
          width: 3,
          height: '15%',
          background: '#5a3214',
        }}
      />
      {positions.map(([x, y], i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            width: size * 0.22,
            height: size * 0.22,
            background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,.4), var(--berry))`,
            borderRadius: '50%',
            transform: 'translate(-50%,-50%)',
            border: '1px solid rgba(0,0,0,.3)',
          }}
        />
      ))}
    </div>
  );
}
