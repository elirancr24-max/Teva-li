export type QuantityUnit = 'kg' | 'unit' | 'bunch';

export interface Product {
  id: string;
  slug: string;
  name: string;
  fullName?: string;
  priceCents: number;
  originalPriceCents?: number;
  unit: QuantityUnit;
  step: number;
  categoryId?: string | null;
  kind: string;
  weight?: string;
  imagePath?: string;
  imageUrl?: string | null;
  quality?: 'premium' | 'standard';
  tag?: string | null;
}

export interface CartItem {
  productId: string;
  amount: number;
  product: Product;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  sortOrder: number;
}
