// Translation service — main interface used by the dashboard.
//
// Стратеги (token шаардахгүй):
//   1. Интернет байвал Google-ийн нээлттэй endpoint-оор шууд орчуулна
//   2. Амжилтгүй (офлайн / endpoint өөрчлөгдсөн) бол local dictionary руу
//      автоматаар унана — апп хэзээ ч эвдрэхгүй
//
// USE_GOOGLE = false болговол зөвхөн local dictionary ашиглана.
// Ирээдүйд AI (Anthropic/DeepL) холбоход aiTranslatorPlaceholder.js ашиглана.

import { translateMnToEn as localTranslate } from './localDictionaryTranslator.js';
import { translateMnToEnGoogle } from './googleTranslator.js';

const USE_GOOGLE = true;

export async function translate(text) {
  if (!text || !text.trim()) return '';

  if (USE_GOOGLE) {
    try {
      // 6 секундын дотор хариу ирэхгүй бол цуцална
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 6000);
      try {
        const result = await translateMnToEnGoogle(text, { signal: controller.signal });
        if (result) return result;
      } finally {
        clearTimeout(timer);
      }
    } catch (e) {
      console.warn('Google translate боломжгүй, local dictionary руу шилжлээ:', e?.message || e);
    }
  }

  // Fallback: офлайн эсвэл алдаа гарсан үед
  return localTranslate(text);
}

export { localTranslate as translateMnToEn };

export default { translate };
