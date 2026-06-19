import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';

export default function Faq({ faq }) {
  const { pick, language } = useLanguage();
  const [open, setOpen] = useState(null);
  const items = faq || [];

  if (!items.length) return null;

  return (
    <section id="faq" className="py-20 bg-stone-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white text-stone-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-soft">
            💬 {language === 'mn' ? 'Түгээмэл асуулт' : 'FAQ'}
          </div>
          <h2 className="text-4xl font-extrabold text-stone-800">
            {language === 'mn' ? 'Түгээмэл асуулт & Хариулт' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={item.id}
              className="bg-white rounded-2xl shadow-soft overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-stone-800 hover:bg-stone-50 transition-colors"
              >
                <span>{pick(item.question)}</span>
                <ChevronDown className={`w-5 h-5 text-nature-600 transition-transform flex-shrink-0 ml-3 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {pick(item.answer)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}