// Content service — single source of truth for site content.
// Components MUST use getSiteContent() and never import defaultContent directly.

import { localAdapter } from './adapters/localAdapter.js';
import { defaultContent } from '../data/defaultContent.js';

const adapter = localAdapter; // swap to supabaseAdapter for production
const CONTENT_KEY = 'site_content';

// Deep clone helper (avoids mutating defaults)
function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function getSiteContent() {
  let content = adapter.get(CONTENT_KEY);
  if (!content) {
    content = clone(defaultContent);
    adapter.set(CONTENT_KEY, content);
  }
  return content;
}

export function saveSiteContent(content) {
  const ok = adapter.set(CONTENT_KEY, content);
  if (!ok) throw new Error('saveSiteContent failed');
  return content;
}

// Save a single top-level section, merging into existing content
export function saveSection(section, value) {
  const content = getSiteContent();
  content[section] = value;
  return saveSiteContent(content);
}

export function resetSiteContent() {
  const fresh = clone(defaultContent);
  adapter.set(CONTENT_KEY, fresh);
  return fresh;
}
