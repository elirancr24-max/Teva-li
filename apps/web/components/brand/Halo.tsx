type Props = {
  /** Halo color (defaults to brand accent). */
  color?: string;
  opacity?: number;
  blur?: number;
};

/** Soft radial glow used behind product/kayak imagery. Place inside a positioned parent. */
export function Halo({ color = 'var(--watermelon)', opacity = 0.55, blur = 40 }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at 50% 55%, ${color} 0%, transparent 55%)`,
        filter: `blur(${blur}px)`,
        opacity,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
