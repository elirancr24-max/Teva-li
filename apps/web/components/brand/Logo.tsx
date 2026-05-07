type Props = { size?: number };

/** Citrus-slice mark with 6 radial pith lines + center dot. */
export function Logo({ size = 44 }: Props) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'var(--citrus)',
        border: '2px solid var(--ink)',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {[0, 60, 120, 180, 240, 300].map((rot) => (
        <div
          key={rot}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '50%',
            height: 2,
            background: 'var(--ink)',
            transformOrigin: 'left center',
            transform: `rotate(${rot}deg)`,
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 6,
          height: 6,
          background: 'var(--ink)',
          borderRadius: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      />
    </div>
  );
}
