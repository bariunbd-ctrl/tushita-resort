// File storage service — development mode (base64 in localStorage).
// Production: replace internals with Supabase Storage (see placeholder adapter).

import { localAdapter } from './adapters/localAdapter.js';
import { fileToBase64, getPlaceholderImage } from '../utils/imageHelpers.js';

const MAX_SIZE_MB = 3;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

// Validate before upload. Returns { valid, error }
export function validateImage(file) {
  if (!file) return { valid: false, error: 'Файл сонгоогүй байна' };
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Зөвхөн зураг (JPG, PNG, WEBP, GIF) оруулна уу' };
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return { valid: false, error: `Зургийн хэмжээ ${MAX_SIZE_MB}MB-аас бага байх ёстой` };
  }
  return { valid: true };
}

// Upload: store base64 under a local key, return { path, url }
export async function uploadImage(file, folder = 'general') {
  const check = validateImage(file);
  if (!check.valid) throw new Error(check.error);

  const base64 = await fileToBase64(file);
  const timestamp = Date.now();
  const storageKey = `file_${folder}_${timestamp}`;
  const path = `local_${folder}_${timestamp}`;

  localAdapter.rawSet(storageKey, base64);

  return { path, url: base64 };
}

// Resolve a stored path back to a displayable URL
export function getImageUrl(path, placeholderLabel = 'Зураг') {
  if (!path) return getPlaceholderImage(placeholderLabel);
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  if (path.startsWith('local_')) {
    // local_{folder}_{timestamp}  ->  file_{folder}_{timestamp}
    const storageKey = path.replace(/^local_/, 'file_');
    const base64 = localAdapter.rawGet(storageKey);
    return base64 || getPlaceholderImage(placeholderLabel);
  }
  return getPlaceholderImage(placeholderLabel);
}

export function deleteImage(path) {
  if (path && path.startsWith('local_')) {
    const storageKey = path.replace(/^local_/, 'file_');
    localAdapter.rawRemove(storageKey);
  }
  return true;
}

export default { uploadImage, deleteImage, getImageUrl, validateImage };
