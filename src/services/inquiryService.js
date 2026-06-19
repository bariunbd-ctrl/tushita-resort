// Inquiry (contact form submissions) service.

import { localAdapter } from './adapters/localAdapter.js';

const adapter = localAdapter;
const COLLECTION = 'inquiries';

function genId() {
  return `inq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function getInquiries() {
  const items = adapter.getCollection(COLLECTION);
  // newest first
  return [...items].sort(
    (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
  );
}

export function createInquiry(data) {
  const inquiry = {
    id: genId(),
    name: data.name || '',
    phone: data.phone || '',
    email: data.email || '',
    guestCount: data.guestCount || '',
    preferredDate: data.preferredDate || '',
    message: data.message || '',
    sourcePage: data.sourcePage || 'contact',
    language: data.language || 'mn',
    status: data.status || 'new',
    submittedAt: data.submittedAt || new Date().toISOString(),
  };
  adapter.insert(COLLECTION, inquiry);
  return inquiry;
}

export function updateInquiryStatus(id, status) {
  return adapter.update(COLLECTION, id, { status });
}

export function deleteInquiry(id) {
  return adapter.removeFromCollection(COLLECTION, id);
}

export const INQUIRY_STATUSES = ['new', 'contacted', 'confirmed', 'cancelled', 'archived'];

export const STATUS_LABELS = {
  new: { mn: 'Шинэ', en: 'New' },
  contacted: { mn: 'Холбогдсон', en: 'Contacted' },
  confirmed: { mn: 'Баталгаажсан', en: 'Confirmed' },
  cancelled: { mn: 'Цуцалсан', en: 'Cancelled' },
  archived: { mn: 'Архивласан', en: 'Archived' },
};

export default {
  getInquiries,
  createInquiry,
  updateInquiryStatus,
  deleteInquiry,
  INQUIRY_STATUSES,
  STATUS_LABELS,
};
