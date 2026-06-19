import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import Icon from './Icon.jsx';

export default function WhyUs({ whyUs }) {
  const { pick, language } = useLanguage();
  const items = whyUs || [];

  return (
    <section className="py-20 bg-nature-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white text-nature-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-soft">
            🎯 {language === 'mn' ? 'Яагаад Серен Нуур?' : 'Why Serene Lake?'}
          </div>
          <h2 className="text-4xl font-extrabold text-stone-800">
            {language === 'mn' ? 'Танин мэдэхүйн мэдээлэл' : 'Everything you need to know'}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-7 shadow-soft hover:shadow-card transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-nature-600 text-white flex items-center justify-center mb-4">
                <Icon name={item.icon} className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-800 text-lg mb-2">{pick(item.question)}</h3>
              <p className="text-stone-500 leading-relaxed">{pick(item.answer)}</p>
            </div>
          ))}
        </div>

        {/* Social proof strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { emoji: '🏆', mn: 'Монголын шилдэг retreat 2024', en: 'Best retreat Mongolia 2024' },
            { emoji: '🌿', mn: '100% байгалийн хоол', en: '100% organic cuisine' },
            { emoji: '👨‍🏫', mn: '10+ жилийн туршлагатай багш', en: '10+ years experienced instructors' },
            { emoji: '📱', mn: 'Интернет холбоогүй орчин', en: 'Digital detox environment' },
          ].map((item) => (
            <div key={item.mn} className="bg-white rounded-2xl p-4 text-center shadow-soft">
              <div className="text-3xl mb-2">{item.emoji}</div>
              <p className="text-sm font-medium text-stone-700">
                {language === 'mn' ? item.mn : item.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
