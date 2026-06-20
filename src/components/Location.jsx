import React from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { trackEvent } from '../services/analyticsService.js';

// Default embed URL — admin өөрийнхөөр солих хүртэл энэ харагдана
const DEFAULT_EMBED =
  'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d85000!2d101.4836!3d47.3224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smn!4v1700000000000!5m2!1sen!2smn';

export default function Location({ location, titles }) {
  const { pick, t, language } = useLanguage();

  const handleMapsClick = () => {
    trackEvent({ type: 'map_click', language });
  };

  // Admin оруулсан URL байвал тэрийг, эс тэгвэл default embed
  const embedUrl = location?.mapEmbedUrl?.trim() || DEFAULT_EMBED;

  return (
    <section id="location" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white text-stone-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-soft">
            📍 {language === 'mn' ? 'Байршил' : 'Location'}
          </div>
          <h2 className="text-4xl font-extrabold text-stone-800 mb-3">
            {pick(titles?.locationTitle) || (language === 'mn' ? 'Бидэн дээр хэрхэн ирэх вэ?' : 'How to find us?')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          {/* Info — 2 col */}
          <div className="lg:col-span-2 flex flex-col justify-center gap-5">
            <div className="bg-white rounded-2xl p-5 shadow-soft flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-nature-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-nature-600" />
              </div>
              <div>
                <p className="text-xs text-stone-400 mb-0.5 font-medium uppercase tracking-wide">
                  {language === 'mn' ? 'Хаяг' : 'Address'}
                </p>
                <p className="font-semibold text-stone-800 leading-snug">{pick(location?.address)}</p>
              </div>
            </div>

            {pick(location?.directions) && (
              <div className="bg-white rounded-2xl p-5 shadow-soft flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Navigation className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 mb-0.5 font-medium uppercase tracking-wide">
                    {language === 'mn' ? 'Очих зам' : 'Directions'}
                  </p>
                  <p className="text-stone-600 text-sm leading-relaxed">{pick(location?.directions)}</p>
                </div>
              </div>
            )}

            {location?.mapsLink && (
              <a
                href={location.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleMapsClick}
                className="inline-flex items-center justify-center gap-2 bg-nature-600 hover:bg-nature-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-colors shadow-md"
              >
                <MapPin className="w-4 h-4" />
                {language === 'mn' ? 'Google Maps-д харах' : 'Open in Google Maps'}
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Google Map — 3 col, always visible */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden shadow-card" style={{ minHeight: '380px' }}>
            <iframe
              title="Google Maps"
              src={embedUrl}
              className="w-full h-full border-0"
              style={{ minHeight: '380px' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
