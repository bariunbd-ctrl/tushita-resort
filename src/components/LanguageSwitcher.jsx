import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { trackEvent } from '../services/analyticsService.js';

export default function LanguageSwitcher({ className = '' }) {
  const { language, setLanguage } = useLanguage();

  const handleChange = (lang) => {
    if (lang === language) return;
    setLanguage(lang);
    trackEvent({ type: 'language_change', to: lang, language: lang });
  };

  return (
    <div className={`inline-flex rounded-full border border-nature-200 overflow-hidden text-sm font-semibold ${className}`}>
      <button
        onClick={() => handleChange('mn')}
        className={`px-3 py-1.5 transition-colors ${
          language === 'mn'
            ? 'bg-nature-600 text-white'
            : 'bg-white text-nature-700 hover:bg-nature-50'
        }`}
        aria-pressed={language === 'mn'}
      >
        MN
      </button>
      <button
        onClick={() => handleChange('en')}
        className={`px-3 py-1.5 transition-colors ${
          language === 'en'
            ? 'bg-nature-600 text-white'
            : 'bg-white text-nature-700 hover:bg-nature-50'
        }`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
    </div>
  );
}
