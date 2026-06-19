// Development-mode translator (no API key needed).
// Phrase dictionary + basic word-level rule-based fallback.

// Common whole-phrase translations (checked first, case-insensitive)
const PHRASES = {
  'эрүүл агаар': 'fresh air',
  'цэвэр агаар': 'clean air',
  'тайван амралт': 'peaceful rest',
  'байгалийн тэвэрт': "in nature's embrace",
  'тав тухтай байр': 'comfortable lodging',
  'хоол хүнс': 'dining',
  'үнэ харах': 'view prices',
  'байршил харах': 'view location',
  'холбоо барих': 'contact us',
  'бидний тухай': 'about us',
  'үйлчилгээ': 'services',
  'байгаль орчин': 'nature',
  'өглөөний цай': 'breakfast',
  'оройн хоол': 'dinner',
  'машины зогсоол': 'parking',
  'гал түлэх': 'bonfire',
  'морь унах': 'horse riding',
  'явган аялал': 'hiking',
};

// Word-level dictionary for rule-based fallback
const WORDS = {
  'амралтын': 'resort',
  'газар': 'place',
  'газрын': 'resort',
  'эрүүл': 'healthy',
  'агаар': 'air',
  'агаарт': 'in the air',
  'цэвэр': 'clean',
  'тайван': 'peaceful',
  'амралт': 'rest',
  'байгаль': 'nature',
  'байгалийн': 'natural',
  'орчин': 'environment',
  'уул': 'mountain',
  'уулс': 'mountains',
  'уулын': 'mountain',
  'ой': 'forest',
  'мод': 'tree',
  'гол': 'river',
  'нар': 'sun',
  'тав': 'comfort',
  'тухтай': 'comfortable',
  'үйлчилгээ': 'service',
  'найрсаг': 'friendly',
  'чанартай': 'quality',
  'байр': 'lodging',
  'өрөө': 'room',
  'гэр': 'ger',
  'хоол': 'food',
  'хоног': 'night',
  'үнэ': 'price',
  'багц': 'package',
  'хүн': 'person',
  'хүний': 'person',
  'зочин': 'guest',
  'зочид': 'guests',
  'гэр бүл': 'family',
  'найз': 'friend',
  'нөхөд': 'friends',
  'дулаахан': 'warm',
  'цэвэрхэн': 'clean',
  'wi-fi': 'Wi-Fi',
};

function translateWord(word) {
  const lower = word.toLowerCase();
  return WORDS[lower] || null;
}

export function translateMnToEn(text) {
  if (!text || typeof text !== 'string') return '';
  const trimmed = text.trim();
  if (!trimmed) return '';

  // 1) Whole-phrase exact match
  const lowerFull = trimmed.toLowerCase();
  if (PHRASES[lowerFull]) {
    return capitalize(PHRASES[lowerFull]);
  }

  // 2) Replace known phrases inside the text
  let working = lowerFull;
  for (const [mn, en] of Object.entries(PHRASES)) {
    if (working.includes(mn)) {
      working = working.split(mn).join(`\u0000${en}\u0000`);
    }
  }

  // 3) Word-by-word fallback for remaining segments
  const tokens = working.split(/(\s+|[.,!?;:])/);
  let translatedAny = false;
  const out = tokens.map((tok) => {
    if (tok.includes('\u0000')) {
      return tok.replace(/\u0000/g, '');
    }
    if (/^\s+$/.test(tok) || /^[.,!?;:]$/.test(tok) || tok === '') return tok;
    const w = translateWord(tok);
    if (w) {
      translatedAny = true;
      return w;
    }
    return tok; // keep original token
  });

  const result = out.join('').replace(/\s+/g, ' ').trim();

  // If nothing at all was translated and no phrase matched, signal needed
  const hadPhrase = working !== lowerFull;
  if (!translatedAny && !hadPhrase) {
    return '[Translation needed]';
  }

  return capitalize(result);
}

function capitalize(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default { translateMnToEn };
