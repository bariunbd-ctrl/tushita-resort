// =============================================================
// AI TRANSLATOR — PLACEHOLDER (future API integration)
// =============================================================
// Swap this in for production-quality translation. Example below
// shows the Anthropic API shape; you could also use Google Translate,
// DeepL, etc. Keep the same async signature: (text) => Promise<string>.
// =============================================================

export async function translateMnToEnAI(text) {
  if (!text) return '';

  // --- EXAMPLE (commented) ----------------------------------
  /*
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `Translate this Mongolian text to natural English. Return ONLY the translation, no preamble:\n\n${text}`,
        },
      ],
    }),
  });
  const data = await response.json();
  const out = data.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('')
    .trim();
  return out;
  */
  // ----------------------------------------------------------

  // Until wired up, fall back to the local dictionary translator.
  const { translateMnToEn } = await import('./localDictionaryTranslator.js');
  return translateMnToEn(text);
}

export default { translateMnToEnAI };
