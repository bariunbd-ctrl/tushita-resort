import { supabase } from './supabaseClient.js';
import { getPlaceholderImage } from '../utils/imageHelpers.js';

const BUCKET = 'Tushita-image';

export function validateImage(file) {
  if (!file) return { valid: false, error: 'Файл сонгоогүй байна' };
  const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
  if (!ALLOWED.includes(file.type)) {
    return { valid: false, error: 'Зөвхөн зураг (JPG, PNG, WEBP) оруулна уу' };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { valid: false, error: 'Зургийн хэмжээ 5MB-аас бага байх ёстой' };
  }
  return { valid: true };
}

export async function uploadImage(file, folder = 'general') {
  const check = validateImage(file);
  if (!check.valid) throw new Error(check.error);

  const ext = file.name.split('.').pop();
  const path = `${folder}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { path, url: data.publicUrl };
}

export function getImageUrl(path, placeholderLabel = 'Зураг') {
  if (!path) return getPlaceholderImage(placeholderLabel);

  // public/images/ дахь статик зургууд
  if (path.startsWith('/images/')) return path;

  // http URL шууд буцаана
  if (path.startsWith('http')) return path;

  // Supabase Storage path
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteImage(path) {
  if (!path || path.startsWith('/images/') || path.startsWith('http')) return true;
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  return !error;
}

export default { uploadImage, deleteImage, getImageUrl, validateImage };