import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Languages, Wand2 } from 'lucide-react';
import { translate } from '../services/translation/translationService.js';

// Edits an {mn, en} value object. Includes an auto-translate toggle and a
// manual "Автоматаар орчуулах" button. When auto is ON, typing in the MN
// field auto-fills the EN field 500ms after the user stops typing.
export default function AutoTranslateField({
  label,
  value = { mn: '', en: '' },
  onChange,
  textarea = false,
  rows = 3,
}) {
  const [autoOn, setAutoOn] = useState(false);
  const [translating, setTranslating] = useState(false);
  const debounceRef = useRef(null);

  const mn = value?.mn ?? '';
  const en = value?.en ?? '';

  const base =
    'w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-nature-500 focus:ring-2 focus:ring-nature-200 outline-none transition';

  const doTranslate = useCallback(
    async (text) => {
      if (!text || !text.trim()) return;
      setTranslating(true);
      try {
        const result = await translate(text);
        onChange({ mn: text, en: result });
      } catch (e) {
        console.error('translate error', e);
      } finally {
        setTranslating(false);
      }
    },
    [onChange]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleMnChange = (text) => {
    onChange({ mn: text, en });
    if (autoOn) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        doTranslate(text);
      }, 500);
    }
  };

  const handleEnChange = (text) => {
    onChange({ mn, en: text });
  };

  const handleManualTranslate = () => {
    doTranslate(mn);
  };

  const Field = textarea ? 'textarea' : 'input';
  const extraProps = textarea ? { rows } : {};

  return (
    <div className="mb-5 border border-gray-100 rounded-xl p-4 bg-gray-50/50">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer select-none">
          <Languages className="w-4 h-4" />
          Auto translate
          <button
            type="button"
            onClick={() => setAutoOn((v) => !v)}
            className={`relative w-9 h-5 rounded-full transition-colors ${
              autoOn ? 'bg-nature-600' : 'bg-gray-300'
            }`}
            aria-pressed={autoOn}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                autoOn ? 'translate-x-4' : ''
              }`}
            />
          </button>
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {/* MN */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-500">Монгол (MN)</span>
            <button
              type="button"
              onClick={handleManualTranslate}
              disabled={translating || !mn.trim()}
              className="inline-flex items-center gap-1 text-xs text-nature-700 hover:text-nature-900 disabled:opacity-40"
            >
              <Wand2 className="w-3 h-3" />
              {translating ? 'Орчуулж байна...' : 'Автоматаар орчуулах'}
            </button>
          </div>
          <Field
            {...extraProps}
            value={mn}
            onChange={(e) => handleMnChange(e.target.value)}
            className={base}
          />
        </div>

        {/* EN */}
        <div>
          <span className="text-xs font-medium text-gray-500 block mb-1">English (EN)</span>
          <Field
            {...extraProps}
            value={en}
            onChange={(e) => handleEnChange(e.target.value)}
            className={base}
          />
        </div>
      </div>
    </div>
  );
}
