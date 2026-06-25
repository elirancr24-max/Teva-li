'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { adminSupabase } from '@/lib/supabase/admin';
import { processProductImage } from '@/lib/image-processing';
import { uploadToBucket, removeFromBucket, pathFromPublicUrl } from '@/lib/supabase/storage';
import { logAdminAction } from '@/lib/admin/audit';
import { sendPaymentConfirmedEmail } from '@/lib/email/resend';
import type { ActionResult } from '@/lib/admin/result';
import type { Database } from '@/types/db';

type KayakStatus = Database['public']['Tables']['kayak_orders']['Row']['status'];

const PRODUCT_IMAGES_BUCKET = 'product-images';

// ─── Orders ─────────────────────────────────────────────────────────────
export async function updateOrderStatus(orderId: string, status: string): Promise<ActionResult> {
  const { error } = await adminSupabase.from('orders').update({ status } as never).eq('id', orderId);
  if (error) return { ok: false, error: error.message };
  await logAdminAction('order.status', 'order', orderId, { status });

  if (status === 'paid') {
    _sendPaymentConfirmedForOrder(orderId).catch((err) =>
      console.error('[admin] sendPaymentConfirmedEmail failed', err),
    );
  }

  revalidatePath('/admin/orders');
  revalidatePath('/admin');
  return { ok: true };
}

async function _sendPaymentConfirmedForOrder(orderId: string): Promise<void> {
  const { data: raw } = await adminSupabase
    .from('orders')
    .select('*, customers(*)')
    .eq('id', orderId)
    .single();
  if (!raw) return;

  const order = raw as {
    id: string;
    items: unknown;
    subtotal_cents: number;
    delivery_cents: number;
    total_cents: number;
    delivery_date: string | null;
    delivery_address: string | null;
    delivery_window: string | null;
    customers: { name: string; email: string | null } | null;
  };

  const customer = order.customers;
  if (!customer?.email) return;

  type Item = { name_he?: string; name?: string; weight?: string; qty?: number; quantity?: number; price_cents?: number };
  const items = ((order.items as Item[]) ?? []).map((i) => ({
    name: i.name_he ?? i.name ?? '',
    weight: i.weight ?? '',
    qty: i.qty ?? i.quantity ?? 1,
    priceCents: i.price_cents ?? 0,
  }));

  await sendPaymentConfirmedEmail({
    orderId: order.id,
    customerName: customer.name,
    customerEmail: customer.email,
    address: order.delivery_address ?? '',
    deliveryDate: order.delivery_date ?? '',
    deliveryWindow: order.delivery_window ?? '',
    items,
    subtotalCents: order.subtotal_cents,
    deliveryCents: order.delivery_cents,
    totalCents: order.total_cents,
  });
}

export async function updateOrderInternalNotes(orderId: string, notes: string): Promise<ActionResult> {
  const { error } = await adminSupabase
    .from('orders')
    .update({ notes_internal: notes } as never)
    .eq('id', orderId);
  if (error) return { ok: false, error: error.message };
  await logAdminAction('order.notes', 'order', orderId);
  revalidatePath(`/admin/orders/${orderId}`);
  return { ok: true };
}

// ─── Kayak orders ───────────────────────────────────────────────────────
export async function updateKayakStatus(orderId: string, status: KayakStatus): Promise<ActionResult> {
  const { error } = await adminSupabase.from('kayak_orders').update({ status }).eq('id', orderId);
  if (error) return { ok: false, error: error.message };
  await logAdminAction('kayak.status', 'kayak_order', orderId, { status });
  revalidatePath('/admin/kayaks');
  revalidatePath('/admin');
  return { ok: true };
}

// ─── Products ───────────────────────────────────────────────────────────
export async function toggleProductActive(productId: string, active: boolean): Promise<ActionResult> {
  const { error } = await adminSupabase.from('products').update({ active }).eq('id', productId);
  if (error) return { ok: false, error: error.message };
  await logAdminAction('product.active', 'product', productId, { active });
  revalidatePath('/admin/products');
  revalidatePath('/shop');
  return { ok: true };
}

export async function updateProductPrice(productId: string, priceCents: number): Promise<ActionResult> {
  const { error } = await adminSupabase.from('products').update({ price_cents: priceCents }).eq('id', productId);
  if (error) return { ok: false, error: error.message };
  await logAdminAction('product.price', 'product', productId, { priceCents });
  revalidatePath('/admin/products');
  revalidatePath('/shop');
  return { ok: true };
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

export async function createProduct(input: ProductInput): Promise<ActionResult> {
  const { error } = await adminSupabase.from('products').insert(input as never);
  if (error) return { ok: false, error: error.message };
  await logAdminAction('product.create', 'product', input.slug, { name: input.name_he });
  revalidatePath('/admin/products');
  revalidatePath('/shop');
  redirect('/admin/products');
}

export async function updateProduct(
  productId: string,
  input: Partial<ProductInput>,
): Promise<ActionResult> {
  const { error } = await adminSupabase.from('products').update(input as never).eq('id', productId);
  if (error) return { ok: false, error: error.message };
  await logAdminAction('product.update', 'product', productId);
  revalidatePath('/admin/products');
  revalidatePath('/shop');
  redirect('/admin/products');
}

export async function deleteProduct(productId: string): Promise<ActionResult> {
  const { error } = await adminSupabase.from('products').delete().eq('id', productId);
  if (error) return { ok: false, error: error.message };
  await logAdminAction('product.delete', 'product', productId);
  revalidatePath('/admin/products');
  revalidatePath('/shop');
  return { ok: true };
}

// ─── Categories ─────────────────────────────────────────────────────────
type CategoryInput = { slug: string; name_he: string; sort_order: number };

export async function createCategory(input: CategoryInput): Promise<ActionResult> {
  const { error } = await adminSupabase.from('categories').insert(input as never);
  if (error) return { ok: false, error: error.message };
  await logAdminAction('category.create', 'category', input.slug, { name: input.name_he });
  revalidatePath('/admin/categories');
  revalidatePath('/shop');
  redirect('/admin/categories');
}

export async function updateCategory(id: string, input: Partial<CategoryInput>): Promise<ActionResult> {
  const { error } = await adminSupabase.from('categories').update(input as never).eq('id', id);
  if (error) return { ok: false, error: error.message };
  await logAdminAction('category.update', 'category', id);
  revalidatePath('/admin/categories');
  revalidatePath('/shop');
  redirect('/admin/categories');
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  const { error } = await adminSupabase.from('categories').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };
  await logAdminAction('category.delete', 'category', id);
  revalidatePath('/admin/categories');
  revalidatePath('/shop');
  return { ok: true };
}

// ─── Site settings ──────────────────────────────────────────────────────
export async function updateSettings(updates: Record<string, string>): Promise<ActionResult> {
  const rows = Object.entries(updates).map(([key, value]) => ({ key, value }));
  for (const row of rows) {
    const { error } = await adminSupabase.from('site_settings').upsert(row as never);
    if (error) return { ok: false, error: error.message };
  }
  await logAdminAction('settings.update', 'settings', null, { keys: Object.keys(updates) });
  revalidatePath('/', 'layout');
  return { ok: true };
}

// ─── Coupons ────────────────────────────────────────────────────────────
type CouponInput = { code: string; discount_pct: number; active: boolean; expires_at: string | null };

export async function createCoupon(input: CouponInput): Promise<ActionResult> {
  const { error } = await adminSupabase.from('coupons').insert(input as never);
  if (error) return { ok: false, error: error.message };
  await logAdminAction('coupon.create', 'coupon', input.code, { discount: input.discount_pct });
  revalidatePath('/admin/coupons');
  redirect('/admin/coupons');
}

export async function deleteCoupon(id: string): Promise<ActionResult> {
  const { error } = await adminSupabase.from('coupons').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };
  await logAdminAction('coupon.delete', 'coupon', id);
  revalidatePath('/admin/coupons');
  return { ok: true };
}

export async function toggleCoupon(id: string, active: boolean): Promise<ActionResult> {
  const { error } = await adminSupabase.from('coupons').update({ active }).eq('id', id);
  if (error) return { ok: false, error: error.message };
  await logAdminAction('coupon.active', 'coupon', id, { active });
  revalidatePath('/admin/coupons');
  return { ok: true };
}

// ─── Product images ─────────────────────────────────────────────────────
type UploadResult = { ok: true; imageId: string; url: string } | { ok: false; error: string };

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
    return { ok: false, error: 'לא נבחר קובץ' };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { ok: false, error: 'קובץ גדול מדי (מקסימום 5MB)' };
  }
  if (!file.type.startsWith('image/')) {
    return { ok: false, error: 'סוג קובץ לא נתמך' };
  }

  const { data: product, error: prodErr } = await adminSupabase
    .from('products')
    .select('id, slug, image_url')
    .eq('id', productId)
    .single();
  if (prodErr || !product) return { ok: false, error: 'מוצר לא נמצא' };

  let processed: Buffer;
  try {
    const arrayBuf = await file.arrayBuffer();
    processed = await processProductImage(Buffer.from(arrayBuf));
  } catch (err) {
    return { ok: false, error: `עיבוד תמונה נכשל: ${(err as Error).message}` };
  }

  const path = `${product.slug}-${uuidv4()}.jpg`;
  let publicUrl: string;
  try {
    publicUrl = await uploadToBucket(PRODUCT_IMAGES_BUCKET, path, processed, 'image/jpeg');
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }

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
    await removeFromBucket(PRODUCT_IMAGES_BUCKET, path);
    return { ok: false, error: insertErr?.message ?? 'שמירת תמונה נכשלה' };
  }

  if (becomesPrimary) {
    await adminSupabase
      .from('products')
      .update({ image_url: publicUrl } as never)
      .eq('id', productId);
  }

  await logAdminAction('product.image.upload', 'product', productId);
  revalidatePath('/admin/products');
  revalidatePath('/shop');
  return { ok: true, imageId: (inserted as { id: string }).id, url: publicUrl };
}

/**
 * Deletes a product_images row and the underlying storage object. If the
 * deleted image was primary, promotes the lowest-sort_order survivor.
 */
export async function deleteProductImage(imageId: string): Promise<ActionResult> {
  const { data: image, error: getErr } = await adminSupabase
    .from('product_images')
    .select('id, product_id, url, is_primary')
    .eq('id', imageId)
    .single();
  if (getErr || !image) return { ok: false, error: 'תמונה לא נמצאה' };
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
  if (delErr) return { ok: false, error: delErr.message };

  const path = pathFromPublicUrl(PRODUCT_IMAGES_BUCKET, img.url);
  if (path) await removeFromBucket(PRODUCT_IMAGES_BUCKET, path);

  if (img.is_primary) {
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

  await logAdminAction('product.image.delete', 'product_image', imageId);
  revalidatePath('/admin/products');
  revalidatePath('/shop');
  return { ok: true };
}

/**
 * Marks the given image as the primary for its product (unsets the others)
 * and mirrors its URL into products.image_url.
 */
export async function setPrimaryImage(productId: string, imageId: string): Promise<ActionResult> {
  const { data: image, error: getErr } = await adminSupabase
    .from('product_images')
    .select('id, url, product_id')
    .eq('id', imageId)
    .single();
  if (getErr || !image) return { ok: false, error: 'תמונה לא נמצאה' };
  if ((image as { product_id: string }).product_id !== productId) {
    return { ok: false, error: 'תמונה לא שייכת למוצר' };
  }

  await adminSupabase
    .from('product_images')
    .update({ is_primary: false } as never)
    .eq('product_id', productId);
  const { error: setErr } = await adminSupabase
    .from('product_images')
    .update({ is_primary: true } as never)
    .eq('id', imageId);
  if (setErr) return { ok: false, error: setErr.message };

  await adminSupabase
    .from('products')
    .update({ image_url: (image as { url: string }).url } as never)
    .eq('id', productId);

  await logAdminAction('product.image.primary', 'product_image', imageId);
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
): Promise<ActionResult> {
  for (let i = 0; i < imageIds.length; i++) {
    const { error } = await adminSupabase
      .from('product_images')
      .update({ sort_order: i } as never)
      .eq('id', imageIds[i])
      .eq('product_id', productId);
    if (error) return { ok: false, error: error.message };
  }
  await logAdminAction('product.image.reorder', 'product', productId);
  revalidatePath('/admin/products');
  revalidatePath('/shop');
  return { ok: true };
}

// ─── Bulk product actions ───────────────────────────────────────────────
export async function bulkToggleActive(productIds: string[], active: boolean): Promise<ActionResult> {
  if (productIds.length === 0) return { ok: true };
  const { error } = await adminSupabase
    .from('products')
    .update({ active } as never)
    .in('id', productIds);
  if (error) return { ok: false, error: error.message };
  await logAdminAction('product.bulk.active', 'product', null, { ids: productIds, active });
  revalidatePath('/admin/products');
  revalidatePath('/shop');
  return { ok: true };
}

export async function bulkDeleteProducts(productIds: string[]): Promise<ActionResult> {
  if (productIds.length === 0) return { ok: true };
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
  if (error) return { ok: false, error: error.message };
  await logAdminAction('product.bulk.delete', 'product', null, { ids: productIds });
  revalidatePath('/admin/products');
  revalidatePath('/shop');
  return { ok: true };
}
