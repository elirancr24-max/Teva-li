// Inline SVG sparkline — no external chart dep.
// Renders a smooth line over equal-width buckets.

import { BRAND } from '@/lib/brand';

type Props = {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fill?: string;
};

export function Sparkline({
  data,
  width = 320,
  height = 60,
  color = BRAND.green,
  fill = 'rgba(140, 190, 60, 0.15)',
}: Props) {
  if (data.length === 0) return null;

  const max = Math.max(1, ...data);
  const step = data.length > 1 ? width / (data.length - 1) : width;
  const points = data.map((v, i) => {
    const x = i * step;
    const y = height - (v / max) * height;
    return { x, y };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');
  const areaPath = `${linePath} L${points[points.length - 1].x.toFixed(1)},${height} L0,${height} Z`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label="גרף הכנסות"
      style={{ display: 'block', maxWidth: '100%' }}
    >
      <path d={areaPath} fill={fill} />
      <path d={linePath} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={1.5} fill={color} />
      ))}
    </svg>
  );
}
