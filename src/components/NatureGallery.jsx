import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import Icon from './Icon.jsx';
import { getImageUrl } from '../services/fileStorageService.js';

export default function NatureGallery({ nature }) {
  const { pick, language } = useLanguage();
  const infoCards = nature?.infoCards || [];
  const gallery = nature?.gallery || [];
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="nature" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-nature-50 text-nature-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            🌿 {language === 'mn' ? 'Байгаль & Эдгэрэл' : 'Nature & Healing'}
          </div>
          <h2 className="text-4xl font-extrabold text-stone-800 mb-4">
            {language === 'mn' ? 'Байгаль чиний эмч' : 'Nature is your healer'}
          </h2>
        </div>

        {/* Info cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {infoCards.map((card) => (
            <div key={card.id} className="group bg-stone-50 hover:bg-nature-600 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <div className="w-11 h-11 rounded-xl bg-nature-100 group-hover:bg-white/20 text-nature-600 group-hover:text-white flex items-center justify-center mb-4 transition-colors">
                <Icon name={card.icon} className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-stone-800 group-hover:text-white mb-2 transition-colors">{pick(card.title)}</h3>
              <p className="text-sm text-stone-500 group-hover:text-white/80 leading-relaxed transition-colors">{pick(card.description)}</p>
            </div>
          ))}
        </div>

        {/* Gallery header */}
        <h3 className="text-2xl font-bold text-stone-800 mb-6 text-center">
          {language === 'mn' ? '📸 Зургийн цомог' : '📸 Gallery'}
        </h3>

        {/* Airbnb-style masonry-like grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {gallery.map((img, idx) => {
            const isFeature = idx === 0 || idx === 5;
            return (
              <div
                key={img.id}
                onClick={() => setLightbox(img)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                  isFeature ? 'col-span-2 row-span-2' : ''
                } aspect-square`}
              >
                <img
                  src={getImageUrl(img.path, pick(img.caption) || 'Зураг')}
                  alt={pick(img.caption)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-3">
                  <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {pick(img.caption)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 text-white/70 hover:text-white" onClick={() => setLightbox(null)}>
            <X className="w-8 h-8" />
          </button>
          <img
            src={getImageUrl(lightbox.path, pick(lightbox.caption))}
            alt={pick(lightbox.caption)}
            className="max-w-full max-h-[85vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {pick(lightbox.caption) && (
            <p className="absolute bottom-6 text-white/80 text-sm">{pick(lightbox.caption)}</p>
          )}
        </div>
      )}
    </section>
  );
}
