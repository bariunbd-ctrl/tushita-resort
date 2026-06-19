// Formatting helpers

export function formatPrice(amount, currency = '₮') {
  if (amount === null || amount === undefined || amount === '') return '';
  const num = Number(amount);
  if (Number.isNaN(num)) return String(amount);
  const formatted = num.toLocaleString('en-US');
  if (currency === 'USD' || currency === '$') return `$${formatted}`;
  return `${formatted}${currency}`;
}

export function formatDate(iso, language = 'mn') {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(language === 'mn' ? 'mn-MN' : 'en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateShort(iso, language = 'mn') {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(language === 'mn' ? 'mn-MN' : 'en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function getDeviceType() {
  if (typeof window === 'undefined') return 'desktop';
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

// Convert textarea text (lines) -> string[] and back
export function linesToArray(text) {
  if (Array.isArray(text)) return text;
  if (!text) return [];
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
}

export function arrayToLines(arr) {
  if (!arr) return '';
  if (typeof arr === 'string') return arr;
  return arr.join('\n');
}
