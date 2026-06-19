import React from 'react';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { getImageUrl } from '../services/fileStorageService.js';

const BADGES = {
  mn: ['🧘 Бясалгал', '🎨 Урлал', '🌿 Байгаль', '🙏 Буддист уламжлал'],
  en: ['🧘 Meditation', '🎨 Art', '🌿 Nature', '🙏 Buddhist Tradition'],
};

export default function Hero({ hero, general }) {
  const { pick, t, language } = useLanguage();
  const bg = hero?.backgroundPath ? getImageUrl(hero.backgroundPath, 'Hero') : null;

  const scrollTo = (anchor) => {
    document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
  };

  const badges = BADGES[language] || BADGES.mn;

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {bg ? (
          <img src={bg} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-stone-800 via-nature-900 to-stone-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Floating orbs background decoration */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-nature-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 w-full py-16">
        <div className="max-w-2xl">
          {/* Badge row */}
          <div className="flex flex-wrap gap-2 mb-6">
            {badges.map((b) => (
              <span key={b} className="px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white text-xs font-medium">
                {b}
              </span>
            ))}
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
            {pick(hero?.headline)?.split('\n').map((line, i) => (
              <span key={i} className={i === 1 ? 'block text-nature-300' : 'block'}>{line}</span>
            ))}
          </h1>

          <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed">
            {pick(hero?.description)}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-12">
            <button
              onClick={() => scrollTo('#rooms')}
              className="inline-flex items-center gap-2 bg-nature-500 hover:bg-nature-400 text-white px-7 py-3.5 rounded-full font-bold transition-all shadow-lg hover:shadow-nature-500/30 hover:scale-105"
            >
              <Calendar className="w-4 h-4" />
              {language === 'mn' ? 'Захиалах' : 'Book Now'}
            </button>
            <button
              onClick={() => scrollTo('#programs')}
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur border border-white/30 text-white px-7 py-3.5 rounded-full font-bold transition-all"
            >
              {language === 'mn' ? 'Хөтөлбөр үзэх' : 'View Programs'}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTo('#location')}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white px-5 py-3.5 font-medium transition-colors"
            >
              <MapPin className="w-4 h-4" />
              {language === 'mn' ? 'Байршил' : 'Location'}
            </button>
          </div>

          {/* Trust stats */}
          <div className="flex flex-wrap gap-6">
            {[
              { num: '500+', label: language === 'mn' ? 'Аяллын зочид' : 'Happy guests' },
              { num: '4.9★', label: language === 'mn' ? 'Үнэлгээ' : 'Rating' },
              { num: '3', label: language === 'mn' ? 'Хөтөлбөр' : 'Programs' },
            ].map((s) => (
              <div key={s.label} className="text-white">
                <div className="text-2xl font-extrabold">{s.num}</div>
                <div className="text-white/60 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
