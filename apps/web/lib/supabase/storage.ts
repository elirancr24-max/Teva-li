import { adminSupabase } from './admin';

/**
 * Uploads a buffer to a Supabase Storage bucket and returns its public URL.
 *
 * The bucket must already exist and be public. Throws if the upload fails;
 * call sites are expected to surface a friendly error to the user.
 */
export async function uploadToBucket(
  bucket: string,
  path: string,
  buffer: Buffer,
  contentType: string,
): Promise<string> {
  const { error } = await adminSupabase.storage
    .from(bucket)
    .upload(path, buffer, {
      contentType,
      cacheControl: '31536000',
      upsert: true,
    });

  if (error) {
    throw new Error(`Storage upload failed: ${error.message}`);
  }

  const { data } = adminSupabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Removes the file at the given storage path. Best-effort: errors are
 * swallowed by callers that have already deleted the DB row.
 */
export async function removeFromBucket(bucket: string, path: string): Promise<void> {
  await adminSupabase.storage.from(bucket).remove([path]);
}

/**
 * Extracts the storage object path from a Supabase public URL of the form
 *   https://<project>.supabase.co/storage/v1/object/public/<bucket>/<path>
 * Returns null if the URL is not from Supabase storage for the given bucket.
 */
export function pathFromPublicUrl(bucket: string, url: string): string | null {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.substring(idx + marker.length);
}
