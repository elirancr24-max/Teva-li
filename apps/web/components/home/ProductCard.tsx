'use client';
import { useState } from 'react';
import { Fruit, type FruitKind } from '@/components/fruits/Fruit';
import { Sticker } from '@/components/brand/Sticker';
import { PriceTag } from '@/components/brand/PriceTag';
import { formatPrice } from '@/lib/utils';

export type Product = {
  name: string;
  kind: FruitKind;
  priceCents: number;
  weight: string;
  tag?: string;
};

type Props = { product: Product; accent?: string; compact?: boolean };

export function ProductCard({ product, accent = 'var(--watermelon)', compact: m = false }: Props) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: m ? '20px 18px 16px' : '28px 26px 22px',
        border: '1.5px solid var(--ink)',
        position: 'relative',
        background: hover ? 'var(--paper-2)' : 'var(--paper)',
        cursor: 'pointer',
        transition: 'all 240ms var(--easing)',
        transform: hover ? 'translate(-4px, -4px)' : 'translate(0, 0)',
        boxShadow: hover ? '8px 8px 0 var(--ink)' : '0 0 0 var(--ink)',
      }}
    >
      {product.tag && (
        <div style={{ position: 'absolute', top: m ? 10 : 14, right: m ? 10 : 14, zIndex: 2 }}>
          <Sticker
            color={product.tag === 'חדש' ? 'var(--leaf)' : 'var(--citrus)'}
            rotate={-6}
            dark={product.tag === 'חדש'}
          >
            {product.tag}
          </Sticker>
        </div>
      )}

      <div
        style={{
          height: m ? 170 : 240,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: m ? 160 : 220,
            height: m ? 160 : 220,
            background: `radial-gradient(circle, ${accent} 0%, transparent 65%)`,
            opacity: hover ? 0.32 : 0.18,
            filter: 'blur(20px)',
            transition: 'opacity 240ms',
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            transition: 'transform 320ms var(--easing)',
            transform: hover ? 'scale(1.06) rotate(-2deg)' : 'scale(1)',
          }}
        >
          <Fruit kind={product.kind} size={m ? 150 : 210} alt={product.name} />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginTop: m ? 14 : 20,
          paddingTop: m ? 14 : 20,
          borderTop: '1px dashed rgba(245,240,232,0.18)',
        }}
      >
        <div className="display" style={{ fontSize: m ? 22 : 28, lineHeight: 1, letterSpacing: '-0.03em' }}>
          {product.name}
        </div>
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: m ? 10 : 11,
            opacity: 0.55,
            letterSpacing: '0.06em',
          }}
        >
          {product.weight}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: m ? 10 : 14,
        }}
      >
        <PriceTag
          variant={hover ? 'accent' : 'ink'}
          size={m ? 16 : 18}
          style={{ padding: m ? '5px 10px' : '6px 12px' }}
        >
          {formatPrice(product.priceCents)}
        </PriceTag>
        <button
          style={{
            background: hover ? accent : 'var(--ink)',
            color: 'var(--paper)',
            border: '2px solid var(--ink)',
            padding: m ? '8px 12px' : '10px 16px',
            fontFamily: 'var(--mono)',
            fontSize: m ? 11 : 12,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: hover ? '3px 3px 0 var(--ink)' : '0 0 0 var(--ink)',
            transition: 'all 240ms var(--easing)',
            letterSpacing: '0.04em',
          }}
        >
          {m ? '+ סל' : 'הוסף לסל +'}
        </button>
      </div>
    </div>
  );
}
