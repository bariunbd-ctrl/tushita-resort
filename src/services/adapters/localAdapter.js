// Local development adapter — wraps localStorage.
// All services go through an adapter so swapping to Supabase later
// only requires implementing the same interface in supabaseAdapter.

const PREFIX = 'resort_';

function key(k) {
  return `${PREFIX}${k}`;
}

export const localAdapter = {
  // --- key/value (used for site content blob) ---
  get(k) {
    try {
      const raw = localStorage.getItem(key(k));
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error('localAdapter.get error', e);
      return null;
    }
  },

  set(k, value) {
    try {
      localStorage.setItem(key(k), JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('localAdapter.set error', e);
      return false;
    }
  },

  remove(k) {
    try {
      localStorage.removeItem(key(k));
      return true;
    } catch (e) {
      console.error('localAdapter.remove error', e);
      return false;
    }
  },

  // --- collection helpers (used for inquiries, analytics events) ---
  getCollection(name) {
    const data = this.get(name);
    return Array.isArray(data) ? data : [];
  },

  setCollection(name, items) {
    return this.set(name, items);
  },

  insert(name, item) {
    const items = this.getCollection(name);
    items.push(item);
    this.setCollection(name, items);
    return item;
  },

  update(name, id, patch) {
    const items = this.getCollection(name);
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) return null;
    items[idx] = { ...items[idx], ...patch };
    this.setCollection(name, items);
    return items[idx];
  },

  removeFromCollection(name, id) {
    const items = this.getCollection(name);
    const next = items.filter((i) => i.id !== id);
    this.setCollection(name, next);
    return true;
  },

  // --- raw localStorage (used by fileStorageService for base64 blobs) ---
  rawGet(fullKey) {
    return localStorage.getItem(fullKey);
  },
  rawSet(fullKey, value) {
    localStorage.setItem(fullKey, value);
  },
  rawRemove(fullKey) {
    localStorage.removeItem(fullKey);
  },
};

export default localAdapter;
