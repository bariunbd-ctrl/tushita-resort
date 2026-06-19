import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import Icon from './Icon.jsx';
import { getImageUrl } from '../services/fileStorageService.js';

// 3 visual card: зураг байвал харуулна, байхгүй бол emoji fallback
const VISUAL_CARDS = [
  { emoji: '🧘', label: { mn: 'Бясалгал', en: 'Meditation' }, field: 'visual1Path', color: 'bg-nature-100' },
  { emoji: '🎨', label: { mn: 'Урлал', en: 'Art' },           field: 'visual2Path', color: 'bg-amber-50' },
  { emoji: '🌿', label: { mn: 'Байгаль', en: 'Nature' },       field: 'visual3Path', color: 'bg-stone-100' },
];

export default function About({ about }) {
  const { pick, t, language } = useLanguage();
  const advantages = about?.advantages || [];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Story block */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 bg-nature-50 text-nature-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              🙏 {language === 'mn' ? 'Бидний тухай' : 'Our Story'}
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-800 leading-tight mb-6">
              {language === 'mn'
                ? 'Зүгээр нэг амралт биш —\nсэтгэлийн аялал'
                : 'Not just a retreat —\na journey of the soul'}
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed">
              {pick(about?.text)}
            </p>
          </div>

          {/* Visual card stack — зураг upload байвал харуулна */}
          <div className="relative h-80 lg:h-96">
            {VISUAL_CARDS.map((card, i) => {
              const path = about?.[card.field];
              const imgUrl = path ? getImageUrl(path, pick(card.label)) : null;
              const hasRealImg = imgUrl && !imgUrl.startsWith('data:image/svg+xml;utf8,%3Csvg');

              const positions = [
                'top-0 right-0 w-64 h-64',
                'bottom-0 left-0 w-52 h-52 shadow-card',
                'top-1/2 left-1/3 -translate-y-1/2 w-40 h-40 shadow-soft',
              ];

              return (
                <div key={card.field}
                  className={`absolute ${positions[i]} ${card.color} rounded-3xl overflow-hidden flex items-center justify-center`}>
                  {hasRealImg ? (
                    <img src={imgUrl} alt={pick(card.label)} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <div className={`${i === 0 ? 'text-8xl' : i === 1 ? 'text-7xl' : 'text-6xl'}`}>
                        {card.emoji}
                      </div>
                      <p className="text-xs text-stone-400 mt-1">{pick(card.label)}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Advantage cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {advantages.map((adv) => (
            <div
              key={adv.id}
              className="group relative bg-stone-50 hover:bg-nature-600 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-nature-100 group-hover:bg-white/20 flex items-center justify-center mb-4 transition-colors">
                <Icon name={adv.icon} className="w-6 h-6 text-nature-600 group-hover:text-white" />
              </div>
              <h3 className="font-bold text-stone-800 group-hover:text-white mb-2 transition-colors">
                {pick(adv.title)}
              </h3>
              <p className="text-sm text-stone-500 group-hover:text-white/80 leading-relaxed transition-colors">
                {pick(adv.description)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
