'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { adminSupabase } from '@/lib/supabase/admin';
import { processProductImage } from '@/lib/image-processing';
import { uploadToBucket, removeFromBucket, pathFromPublicUrl } from '@/lib/supabase/storage';
import type { Database } from '@/types/db';

type OrderStatus = Database['public']['Tables']['orders']['Row']['status'];
type KayakStatus = Database['public']['Tables']['kayak_orders']['Row']['status'];

const PRODUCT_IMAGES_BUCKET = 'product-images';

// ─── Orders ─────────────────────────────────────────────────────────────
export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  await adminSupabase.from('orders').update({ status }).eq('id', orderId);
  revalidatePath('/admin/orders');
  revalidatePath('/admin');
}

// ─── Kayak orders ───────────────────────────────────────────────────────
export async function updateKayakStatus(orderId: string, status: KayakStatus) {
  await adminSupabase.from('kayak_orders').update({ status }).eq('id', orderId);
  revalidatePath('/admin/kayaks');
  revalidatePath('/admin');
}

// ─── Products ───────────────────────────────────────────────────────────
export async function toggleProductActive(productId: string, active: boolean) {
  await adminSupabase.from('products').update({ active }).eq('id', productId);
  revalidatePath('/admin/products');
  revalidatePath('/shop');
}

export async function updateProductPrice(productId: string, priceCents: number) {
  await adminSupabase.from('products').update({ price_cents: priceCents }).eq('id', productId);
  revalidatePath('/admin/products');
  revalidatePath('/shop');
}

type ProductInput = {
  slug: string;
  name_he: string;
  category_id: string | null;
  kind: string;
  price_cents: number;
  weight: string;
  description_he?: string | null;
  tag?: string | null;
  image_url?: string | null;
  stock?: number | null;
  active?: boolean;
};

export async function createProduct(input: ProductInput) {
  const { error } = await adminSupabase.from('products').insert(input as never);
  if (error) return { error: error.message };
  revalidatePath('/admin/products');
  revalidatePath('/shop');
  redirect('/admin/products');
}

export async function updateProduct(productId: string, input: Partial<ProductInput>) {
  const { error } = await adminSupabase.from('products').update(input as never).eq('id', productId);
  if (error) return { error: error.message };
  revalidatePath('/admin/products');
  revalidatePath('/shop');
  redirect('/admin/products');
}

export async function deleteProduct(productId: string) {
  await adminSupabase.from('products').delete().eq('id', productId);
  revalidatePath('/admin/products');
  revalidatePath('/shop');
}

// ─── Categories ─────────────────────────────────────────────────────────
type CategoryInput = { slug: string; name_he: string; sort_order: number };

export async function createCategory(input: CategoryInput) {
  const { error } = await adminSupabase.from('categories').insert(input as never);
  if (error) return { error: error.message };
  revalidatePath('/admin/categories');
  revalidatePath('/shop');
  redirect('/admin/categories');
}

export async function updateCategory(id: string, input: Partial<CategoryInput>) {
  const { error } = await adminSupabase.from('categories').update(input as never).eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/categories');
  revalidatePath('/shop');
  redirect('/admin/categories');
}

export async function deleteCategory(id: string) {
  await adminSupabase.from('categories').delete().eq('id', id);
  revalidatePath('/admin/categories');
  revalidatePath('/shop');
}

// ─── Site settings ──────────────────────────────────────────────────────
export async function updateSettings(updates: Record<string, string>) {
  const rows = Object.entries(updates).map(([key, value]) => ({ key, value }));
  for (const row of rows) {
    await adminSupabase.from('site_settings').upsert(row as never);
  }
  revalidatePath('/', 'layout');
  return { ok: true };
}

// ─── Coupons ────────────────────────────────────────────────────────────
type CouponInput = { code: string; discount_pct: number; active: boolean; expires_at: string | null };

export async function createCoupon(input: CouponInput) {
  const { error } = await adminSupabase.from('coupons').insert(input as never);
  if (error) return { error: error.message };
  revalidatePath('/admin/coupons');
  redirect('/admin/coupons');
}

export async function deleteCoupon(id: string) {
  await adminSupabase.from('coupons').delete().eq('id', id);
  revalidatePath('/admin/coupons');
}

export async function toggleCoupon(id: string, active: boolean) {
  await adminSupabase.from('coupons').update({ active }).eq('id', id);
  revalidatePath('/admin/coupons');
}

// ─── Product images ─────────────────────────────────────────────────────
type UploadResult = { ok: true; imageId: string; url: string } | { error: string };

/**
 * Receives an `image` File from the admin uploader, normalizes it to a 400x400
 * JPEG via sharp, uploads it to the `product-images` bucket under a per-slug
 * path, and inserts a product_images row. If the product has no primary image
 * yet, this one is promoted to primary and mirrored into products.image_url.
 */
export async function uploadProductImage(
  productId: string,
  formData: FormData,
): Promise<UploadResult> {
  const file = formData.get('image');
  if (!(file instanceof File) || file.size === 0) {
    return { error: 'לא נבחר קובץ' };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { error: 'קובץ גדול מדי (מקסימום 5MB)' };
  }
  if (!file.type.startsWith('image/')) {
    return { error: 'סוג קובץ לא נתמך' };
  }

  // Load product to get slug + check primary status.
  const { data: product, error: prodErr } = await adminSupabase
    .from('products')
    .select('id, slug, image_url')
    .eq('id', productId)
    .single();
  if (prodErr || !product) return { error: 'מוצר לא נמצא' };

  let processed: Buffer;
  try {
    const arrayBuf = await file.arrayBuffer();
    processed = await processProductImage(Buffer.from(arrayBuf));
  } catch (err) {
    return { error: `עיבוד תמונה נכשל: ${(err as Error).message}` };
  }

  const path = `${product.slug}-${uuidv4()}.jpg`;
  let publicUrl: string;
  try {
    publicUrl = await uploadToBucket(PRODUCT_IMAGES_BUCKET, path, processed, 'image/jpeg');
  } catch (err) {
    return { error: (err as Error).message };
  }

  // Count existing rows so we can pick a sort_order at the end.
  const { count } = await adminSupabase
    .from('product_images')
    .select('id', { count: 'exact', head: true })
    .eq('product_id', productId);
  const sortOrder = count ?? 0;
  const becomesPrimary = sortOrder === 0 || !product.image_url;

  const insertRow: Record<string, unknown> = {
    product_id: productId,
    url: publicUrl,
    alt: product.slug,
    sort_order: sortOrder,
    is_primary: becomesPrimary,
  };
  const { data: inserted, error: insertErr } = await adminSupabase
    .from('product_images')
    .insert(insertRow as never)
    .select('id')
    .single();
  if (insertErr || !inserted) {
    // Roll back the storage object so we don't leak orphans.
    await removeFromBucket(PRODUCT_IMAGES_BUCKET, path);
    return { error: insertErr?.message ?? 'שמירת תמונה נכשלה' };
  }

  if (becomesPrimary) {
    await adminSupabase
      .from('products')
      .update({ image_url: publicUrl } as never)
      .eq('id', productId);
  }

  revalidatePath('/admin/products');
  revalidatePath('/shop');
  return { ok: true, imageId: (inserted as { id: string }).id, url: publicUrl };
}

/**
 * Deletes a product_images row and the underlying storage object. If the
 * deleted image was primary, promotes the lowest-sort_order survivor.
 */
export async function deleteProductImage(imageId: string): Promise<{ ok: true } | { error: string }> {
  // is_primary lives on product_images but isn't in the generated DB types yet
  // (added in migration 006). Cast through unknown.
  const { data: image, error: getErr } = await adminSupabase
    .from('product_images')
    .select('id, product_id, url, is_primary')
    .eq('id', imageId)
    .single();
  if (getErr || !image) return { error: 'תמונה לא נמצאה' };
  const img = image as unknown as {
    id: string;
    product_id: string;
    url: string;
    is_primary: boolean | null;
  };

  const { error: delErr } = await adminSupabase
    .from('product_images')
    .delete()
    .eq('id', imageId);
  if (delErr) return { error: delErr.message };

  const path = pathFromPublicUrl(PRODUCT_IMAGES_BUCKET, img.url);
  if (path) await removeFromBucket(PRODUCT_IMAGES_BUCKET, path);

  if (img.is_primary) {
    // Promote the next image (lowest sort_order) to primary, or clear products.image_url.
    const { data: next } = await adminSupabase
      .from('product_images')
      .select('id, url')
      .eq('product_id', img.product_id)
      .order('sort_order', { ascending: true })
      .limit(1)
      .maybeSingle();
    const nextRow = next as unknown as { id: string; url: string } | null;
    if (nextRow) {
      await adminSupabase
        .from('product_images')
        .update({ is_primary: true } as never)
        .eq('id', nextRow.id);
      await adminSupabase
        .from('products')
        .update({ image_url: nextRow.url } as never)
        .eq('id', img.product_id);
    } else {
      await adminSupabase
        .from('products')
        .update({ image_url: null } as never)
        .eq('id', img.product_id);
    }
  }

  revalidatePath('/admin/products');
  revalidatePath('/shop');
  return { ok: true };
}

/**
 * Marks the given image as the primary for its product (unsets the others)
 * and mirrors its URL into products.image_url.
 */
export async function setPrimaryImage(
  productId: string,
  imageId: string,
): Promise<{ ok: true } | { error: string }> {
  const { data: image, error: getErr } = await adminSupabase
    .from('product_images')
    .select('id, url, product_id')
    .eq('id', imageId)
    .single();
  if (getErr || !image) return { error: 'תמונה לא נמצאה' };
  if ((image as { product_id: string }).product_id !== productId) {
    return { error: 'תמונה לא שייכת למוצר' };
  }

  await adminSupabase
    .from('product_images')
    .update({ is_primary: false } as never)
    .eq('product_id', productId);
  const { error: setErr } = await adminSupabase
    .from('product_images')
    .update({ is_primary: true } as never)
    .eq('id', imageId);
  if (setErr) return { error: setErr.message };

  await adminSupabase
    .from('products')
    .update({ image_url: (image as { url: string }).url } as never)
    .eq('id', productId);

  revalidatePath('/admin/products');
  revalidatePath('/shop');
  return { ok: true };
}

/**
 * Persists a drag-and-drop reorder. `imageIds` is the new visual order
 * (front-to-back); each gets sort_order equal to its index in the array.
 */
export async function reorderProductImages(
  productId: string,
  imageIds: string[],
): Promise<{ ok: true } | { error: string }> {
  for (let i = 0; i < imageIds.length; i++) {
    const { error } = await adminSupabase
      .from('product_images')
      .update({ sort_order: i } as never)
      .eq('id', imageIds[i])
      .eq('product_id', productId);
    if (error) return { error: error.message };
  }
  revalidatePath('/admin/products');
  revalidatePath('/shop');
  return { ok: true };
}

// ─── Bulk product actions ───────────────────────────────────────────────
export async function bulkToggleActive(productIds: string[], active: boolean) {
  if (productIds.length === 0) return { ok: true };
  const { error } = await adminSupabase
    .from('products')
    .update({ active } as never)
    .in('id', productIds);
  if (error) return { error: error.message };
  revalidatePath('/admin/products');
  revalidatePath('/shop');
  return { ok: true };
}

export async function bulkDeleteProducts(productIds: string[]) {
  if (productIds.length === 0) return { ok: true };
  // Clean up storage objects belonging to these products so we don't leak.
  const { data: images } = await adminSupabase
    .from('product_images')
    .select('url')
    .in('product_id', productIds);
  for (const row of (images ?? []) as Array<{ url: string }>) {
    const path = pathFromPublicUrl(PRODUCT_IMAGES_BUCKET, row.url);
    if (path) await removeFromBucket(PRODUCT_IMAGES_BUCKET, path);
  }

  const { error } = await adminSupabase
    .from('products')
    .delete()
    .in('id', productIds);
  if (error) return { error: error.message };
  revalidatePath('/admin/products');
  revalidatePath('/shop');
  return { ok: true };
}
