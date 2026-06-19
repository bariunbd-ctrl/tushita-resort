// =============================================================
// SUPABASE ADAPTER — PLACEHOLDER
// =============================================================
// This file documents how to swap the local development adapter
// for a real Supabase backend WITHOUT rewriting any service code.
//
// Each service (contentService, inquiryService, authService,
// fileStorageService, analyticsService) imports an adapter and
// calls its generic methods. To go live:
//   1. npm install @supabase/supabase-js
//   2. Create a Supabase project, copy URL + anon key into .env
//   3. Implement the methods below using the Supabase client
//   4. In each service, switch the import from localAdapter to this
//
// See docs/SUPABASE_SCHEMA.md and docs/FUTURE_INTEGRATION_NOTES.md
// =============================================================

/*
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const supabaseAdapter = {
  // key/value -> store site content in a single-row "site_content" table
  async get(k) {
    const { data, error } = await supabase
      .from('site_content')
      .select('data')
      .eq('key', k)
      .single();
    if (error) return null;
    return data?.data ?? null;
  },

  async set(k, value) {
    const { error } = await supabase
      .from('site_content')
      .upsert({ key: k, data: value });
    return !error;
  },

  // collections -> map to real tables (inquiries, analytics_events)
  async getCollection(name) {
    const { data, error } = await supabase.from(name).select('*');
    return error ? [] : data;
  },

  async insert(name, item) {
    const { data, error } = await supabase.from(name).insert(item).select().single();
    return error ? null : data;
  },

  async update(name, id, patch) {
    const { data, error } = await supabase
      .from(name).update(patch).eq('id', id).select().single();
    return error ? null : data;
  },

  async removeFromCollection(name, id) {
    const { error } = await supabase.from(name).delete().eq('id', id);
    return !error;
  },

  // file storage -> Supabase Storage bucket
  async uploadFile(bucket, path, file) {
    const { error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) return null;
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return { path, url: data.publicUrl };
  },
};

export default supabaseAdapter;
*/

// Exported as null so accidental imports fail loudly during dev.
export const supabaseAdapter = null;
export default supabaseAdapter;
