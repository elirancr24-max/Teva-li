import sharp from 'sharp';

/**
 * Resize and crop-center an arbitrary image buffer to a 400x400 JPEG (quality 85).
 * Used for normalizing product images uploaded by admins so the storefront grid
 * stays visually consistent and CDN payloads stay small.
 */
export async function processProductImage(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .rotate() // honour EXIF orientation
    .resize(400, 400, {
      fit: 'cover',
      position: 'centre',
      withoutEnlargement: false,
    })
    .jpeg({ quality: 85, mozjpeg: true })
    .toBuffer();
}
