import React from 'react';
import { Check, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { formatPrice } from '../utils/formatters.js';
import Icon from './Icon.jsx';

export default function Programs({ programs }) {
  const { pick, language } = useLanguage();
  const active = (programs || []).filter((p) => p.active);

  const COLORS = [
    { bg: 'bg-nature-50', accent: 'bg-nature-600', text: 'text-nature-700', border: 'border-nature-200' },
    { bg: 'bg-amber-50', accent: 'bg-amber-500', text: 'text-amber-700', border: 'border-amber-200' },
    { bg: 'bg-stone-800', accent: 'bg-white', text: 'text-white', border: 'border-stone-700', dark: true },
  ];

  return (
    <section id="programs" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            ✨ {language === 'mn' ? 'Retreat хөтөлбөрүүд' : 'Retreat Programs'}
          </div>
          <h2 className="text-4xl font-extrabold text-stone-800 mb-4">
            {language === 'mn' ? 'Өөртөө тохирсон\nаялалаа сонго' : 'Choose your perfect\nretreat journey'}
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto">
            {language === 'mn'
              ? 'Бясалгал, урлал, эсвэл хоёуланг нь хослуулсан — та сонгоно'
              : 'Meditation, art, or both combined — the choice is yours'}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {active.map((prog, i) => {
            const col = COLORS[i % COLORS.length];
            const includes = prog.includes?.[language] || prog.includes?.mn || [];
            return (
              <div
                key={prog.id}
                className={`${col.bg} rounded-3xl p-7 flex flex-col hover:-translate-y-1 hover:shadow-card transition-all duration-300 border ${col.border}`}
              >
                <div className={`w-14 h-14 rounded-2xl ${col.accent} flex items-center justify-center mb-5 ${col.dark ? '' : ''}`}>
                  <Icon name={prog.icon} className={`w-7 h-7 ${col.dark ? 'text-stone-800' : 'text-white'}`} />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Clock className={`w-4 h-4 ${col.dark ? 'text-white/60' : 'text-stone-400'}`} />
                  <span className={`text-sm font-medium ${col.dark ? 'text-white/60' : 'text-stone-400'}`}>
                    {pick(prog.duration)}
                  </span>
                </div>

                <h3 className={`text-xl font-bold mb-3 ${col.dark ? 'text-white' : 'text-stone-800'}`}>
                  {pick(prog.title)}
                </h3>
                <p className={`text-sm leading-relaxed mb-5 ${col.dark ? 'text-white/70' : 'text-stone-500'}`}>
                  {pick(prog.description)}
                </p>

                <ul className="space-y-2 mb-6 flex-1">
                  {includes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${col.dark ? 'text-nature-300' : 'text-nature-500'}`} />
                      <span className={col.dark ? 'text-white/80' : 'text-stone-600'}>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <div className="mb-4">
                    <span className={`text-3xl font-extrabold ${col.dark ? 'text-white' : 'text-stone-800'}`}>
                      {formatPrice(prog.price, prog.currency)}
                    </span>
                    <span className={`text-sm ml-1 ${col.dark ? 'text-white/50' : 'text-stone-400'}`}>
                      / {language === 'mn' ? 'хүн' : 'person'}
                    </span>
                  </div>
                  <button
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                      col.dark
                        ? 'bg-white text-stone-800 hover:bg-nature-100'
                        : 'bg-stone-800 text-white hover:bg-stone-700'
                    }`}
                  >
                    {language === 'mn' ? 'Захиалах' : 'Book This Program'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
