import Image from 'next/image';
import { PineappleArt } from './PineappleArt';
import { WatermelonArt } from './WatermelonArt';
import { StrawberryArt } from './StrawberryArt';
import { GrapeArt } from './GrapeArt';
import { MelonArt } from './MelonArt';
import { KiwiArt } from './KiwiArt';

export type FruitKind =
  | 'pineapple' | 'watermelon' | 'strawberry' | 'grape' | 'melon' | 'kiwi'
  | 'mixed-salad' | 'blueberry' | 'cherry' | 'green-grape' | 'berry-mix' | 'mango';

const FRUIT_ART: Record<FruitKind, React.ComponentType<{ size?: number }>> = {
  pineapple: PineappleArt,
  watermelon: WatermelonArt,
  strawberry: StrawberryArt,
  grape: GrapeArt,
  melon: MelonArt,
  kiwi: KiwiArt,
  blueberry: GrapeArt,
  cherry: StrawberryArt,
  'green-grape': GrapeArt,
  'berry-mix': StrawberryArt,
  'mixed-salad': StrawberryArt,
  mango: MelonArt,
};

/** Curated Unsplash photos — square, white/off-white background, single subject. */
export const FRUIT_PHOTOS: Record<FruitKind, string> = {
  pineapple:    'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800&q=80&fit=crop&auto=format',
  watermelon:   'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=800&q=80&fit=crop&auto=format',
  strawberry:   'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80&fit=crop&auto=format',
  grape:        'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=800&q=80&fit=crop&auto=format',
  melon:        'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?w=800&q=80&fit=crop&auto=format',
  kiwi:         'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=800&q=80&fit=crop&auto=format',
  'mixed-salad':'https://images.unsplash.com/photo-1490474504059-bf2db5ab2348?w=800&q=80&fit=crop&auto=format',
  blueberry:    'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800&q=80&fit=crop&auto=format',
  cherry:       'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=800&q=80&fit=crop&auto=format',
  'green-grape':'https://images.unsplash.com/photo-1599819177626-b62d1c1adff4?w=800&q=80&fit=crop&auto=format',
  'berry-mix':  'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&q=80&fit=crop&auto=format',
  mango:        'https://images.unsplash.com/photo-1605027990121-cbae9e0642db?w=800&q=80&fit=crop&auto=format',
};

type Props = {
  kind: FruitKind;
  size: number;
  /** Use the CSS-art version instead of the photo. */
  art?: boolean;
  alt?: string;
  /** When true, the image becomes priority/eager (use for above-the-fold hero). */
  priority?: boolean;
};

/** Renders a circular fruit "chip" — photo by default, CSS-art fallback. */
export function Fruit({ kind, size, art = false, alt, priority = false }: Props) {
  const photo = FRUIT_PHOTOS[kind];

  if (art || !photo) {
    const Comp = FRUIT_ART[kind] ?? WatermelonArt;
    return <Comp size={size} />;
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'relative',
        border: '2px solid var(--ink)',
        boxShadow: '4px 4px 0 var(--ink)',
        flexShrink: 0,
      }}
    >
      <Image
        src={photo}
        alt={alt ?? kind}
        fill
        sizes={`${size}px`}
        priority={priority}
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}
