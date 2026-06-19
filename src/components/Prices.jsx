import React, { useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { formatPrice } from '../utils/formatters.js';
import { trackEvent } from '../services/analyticsService.js';

export default function Prices({ prices }) {
  const { pick, t, language } = useLanguage();
  const sectionRef = useRef(null);
  const tracked = useRef(false);

  const items = (prices || []).filter(p => p.active).sort((a,b) => (a.order||0)-(b.order||0));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting && !tracked.current) { tracked.current = true; trackEvent({ type: 'price_view', language }); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [language]);

  return (
    <section id="prices" ref={sectionRef} className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white text-stone-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-soft">
            💰 {language === 'mn' ? 'Үнэ ба багц' : 'Pricing & Packages'}
          </div>
          <h2 className="text-4xl font-extrabold text-stone-800 mb-3">
            {language === 'mn' ? 'Тодорхой, ил тод үнэ' : 'Clear, transparent pricing'}
          </h2>
          <p className="text-stone-500">
            {language === 'mn' ? 'Нуугдсан нэмэлт төлбөр байхгүй' : 'No hidden fees, everything included'}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {items.map((pkg, idx) => {
            const featured = idx === 1;
            const includedItems = pkg.includedItems?.[language] || pkg.includedItems?.mn || [];
            return (
              <div key={pkg.id} className={`rounded-3xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 relative ${
                featured
                  ? 'bg-stone-800 text-white shadow-2xl scale-[1.03] ring-2 ring-nature-500'
                  : 'bg-white text-stone-800 shadow-soft hover:shadow-card'
              }`}>
                {featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-nature-500 text-white text-xs px-4 py-1 rounded-full font-bold">
                    {language === 'mn' ? '⭐ Хамгийн алдартай' : '⭐ Most popular'}
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{pick(pkg.name)}</h3>
                <p className={`text-sm mb-5 ${featured ? 'text-white/70' : 'text-stone-500'}`}>{pick(pkg.description)}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">{formatPrice(pkg.price, pkg.currency)}</span>
                  <span className={`text-sm ml-1 ${featured ? 'text-white/60' : 'text-stone-400'}`}>
                    / {language === 'mn' ? 'хүн' : 'person'}
                  </span>
                </div>
                <ul className="space-y-2.5 mb-7 flex-1">
                  {includedItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${featured ? 'text-nature-300' : 'text-nature-500'}`} />
                      <span className={featured ? 'text-white/85' : 'text-stone-600'}>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`w-full py-3 rounded-xl font-bold transition-colors ${
                    featured
                      ? 'bg-nature-500 hover:bg-nature-400 text-white'
                      : 'bg-stone-800 hover:bg-stone-700 text-white'
                  }`}
                >
                  {language === 'mn' ? 'Захиалах' : 'Book Now'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
