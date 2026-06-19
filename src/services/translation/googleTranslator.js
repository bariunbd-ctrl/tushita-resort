// =============================================================
// Google Translate — token/API-key шаардахгүй хувилбар
// =============================================================
// Google-ийн нээлттэй (албан бус) translate endpoint ашиглана.
// API key, billing хэрэггүй — интернет байхад шууд ажиллана.
//
// ⚠️ АНХААРУУЛГА: Энэ endpoint нь Google-ийн албан ёсоор баримтжуулаагүй
//    дотоод холбоос юм. Олон жил ажилласан ч Google хүссэн үедээ өөрчилж
//    болзошгүй. Production-д тогтвортой байдал шаардвал DeepL эсвэл Google
//    Cloud Translation API (key-тэй) руу шилжихийг зөвлөнө.
//    Амжилтгүй болбол translationService автоматаар local dictionary руу
//    унаж (fallback) аппыг эвдэхгүй.
// =============================================================

const ENDPOINT = 'https://translate.googleapis.com/translate_a/single';

// MN -> EN орчуулна. Алдаа гарвал throw хийнэ (caller fallback хийнэ).
export async function translateMnToEnGoogle(text, { signal } = {}) {
  if (!text || !text.trim()) return '';

  const params = new URLSearchParams({
    client: 'gtx',
    sl: 'mn', // source: Mongolian
    tl: 'en', // target: English
    dt: 't',
    q: text,
  });

  const res = await fetch(`${ENDPOINT}?${params.toString()}`, { signal });
  if (!res.ok) {
    throw new Error(`Google translate HTTP ${res.status}`);
  }

  const data = await res.json();
  // Хариу бүтэц: [[["орчуулга","эх",...], ...], ...]
  // Олон segment-ийг нийлүүлнэ.
  if (!Array.isArray(data) || !Array.isArray(data[0])) {
    throw new Error('Unexpected Google translate response');
  }

  const translated = data[0]
    .map((seg) => (Array.isArray(seg) ? seg[0] : ''))
    .join('')
    .trim();

  if (!translated) throw new Error('Empty translation');
  return translated;
}

export default { translateMnToEnGoogle };
