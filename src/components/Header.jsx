import React, { useState, useEffect } from 'react';
import { Menu, X, Mountain } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { getImageUrl } from '../services/fileStorageService.js';

const NAV_ITEMS = [
  { key: 'nav.about', anchor: '#about' },
  { key: 'nav.services', anchor: '#services' },
  { mn: 'Хөтөлбөр', en: 'Programs', anchor: '#programs' },
  { mn: 'Байр', en: 'Rooms', anchor: '#rooms' },
  { key: 'nav.nature', anchor: '#nature' },
  { mn: 'Сэтгэгдэл', en: 'Reviews', anchor: '#reviews' },
  { key: 'nav.location', anchor: '#location' },
];

export default function Header({ siteName, logoPath }) {
  const { pick, t, language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    fn();
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleNavClick = (e, anchor) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
  };

  const label = (item) => {
    if (item.mn) return language === 'mn' ? item.mn : item.en;
    return t(item.key);
  };

  // Resolve logo: uploaded image эсвэл icon fallback
  const logoUrl = logoPath ? getImageUrl(logoPath, 'Logo') : null;
  const isRealLogo = logoUrl && !logoUrl.startsWith('data:image/svg+xml');

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur shadow-soft py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')}
          className={`flex items-center gap-2 font-extrabold text-lg transition-colors ${scrolled ? 'text-stone-800' : 'text-white'}`}>
          {isRealLogo ? (
            <img src={logoUrl} alt={pick(siteName)} className="h-10 w-auto object-contain" />
          ) : (
            <>
              <Mountain className={`w-7 h-7 ${scrolled ? 'text-nature-600' : 'text-nature-300'}`} />
              <span>{pick(siteName)}</span>
            </>
          )}
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a key={item.anchor} href={item.anchor}
              onClick={(e) => handleNavClick(e, item.anchor)}
              className={`px-3 py-2 font-medium rounded-lg transition-colors text-sm ${
                scrolled ? 'text-stone-700 hover:text-nature-600 hover:bg-nature-50' : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}>
              {label(item)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="hidden md:inline-flex items-center bg-nature-600 hover:bg-nature-700 text-white px-5 py-2 rounded-full font-semibold text-sm transition-colors"
          >
            {language === 'mn' ? '📩 Захиалах' : '📩 Book Now'}
          </button>
          <button className={`lg:hidden p-2 ${scrolled ? 'text-stone-700' : 'text-white'}`}
            onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="lg:hidden bg-white border-t border-stone-100 shadow-soft">
          <div className="px-4 py-3 flex flex-col">
            {[{ mn: 'Нүүр', en: 'Home', anchor: '#home' }, ...NAV_ITEMS].map((item) => (
              <a key={item.anchor} href={item.anchor}
                onClick={(e) => handleNavClick(e, item.anchor)}
                className="px-3 py-3 text-stone-700 hover:bg-stone-50 rounded-lg font-medium">
                {label(item)}
              </a>
            ))}
            <div className="px-3 py-3 flex items-center justify-between">
              <LanguageSwitcher />
              <button
                onClick={() => { setMobileOpen(false); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="bg-nature-600 text-white px-5 py-2 rounded-full font-semibold text-sm">
                {language === 'mn' ? 'Захиалах' : 'Book Now'}
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
