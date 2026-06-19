import React from 'react';
import { Facebook, Instagram, Youtube, Twitter, Mountain, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { trackEvent } from '../services/analyticsService.js';

const SOCIAL_ICONS = { facebook: Facebook, instagram: Instagram, youtube: Youtube, twitter: Twitter };

const NAV = [
  { mn: 'Нүүр', en: 'Home', anchor: '#home' },
  { mn: 'Бидний тухай', en: 'About', anchor: '#about' },
  { mn: 'Хөтөлбөр', en: 'Programs', anchor: '#programs' },
  { mn: 'Байр', en: 'Rooms', anchor: '#rooms' },
  { mn: 'Үнэ', en: 'Prices', anchor: '#prices' },
  { mn: 'Холбоо барих', en: 'Contact', anchor: '#contact' },
];

export default function Footer({ general, contact, social }) {
  const { pick, language } = useLanguage();
  const year = new Date().getFullYear();

  const handleNav = (e, anchor) => {
    e.preventDefault();
    document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialEntries = Object.entries(social || {}).filter(([, url]) => url);

  return (
    <footer className="bg-stone-900 text-white">
      {/* CTA strip */}
      <div className="bg-nature-700 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3">
            {language === 'mn' ? '🧘 Өнөөдөр аялалаа эхлүүл' : '🧘 Start your journey today'}
          </h3>
          <p className="text-white/80 mb-5">
            {language === 'mn'
              ? 'Сэтгэлийн тайван, эрч хүч, бүтээлч сэргэлт — чиний хүлээж байна'
              : 'Inner peace, renewed energy, creative revival — awaiting you'}
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-white text-nature-700 font-bold px-8 py-3.5 rounded-full hover:bg-nature-50 transition-colors shadow-lg"
          >
            {language === 'mn' ? '📩 Захиалга илгээх' : '📩 Book Now'}
          </button>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-6">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-extrabold text-xl mb-3">
              <Mountain className="w-6 h-6 text-nature-400" />
              <span>{pick(general?.siteName)}</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-xs">
              {pick(general?.tagline)}
            </p>
            {socialEntries.length > 0 && (
              <div className="flex gap-3">
                {socialEntries.map(([platform, url]) => {
                  const IconCmp = SOCIAL_ICONS[platform];
                  if (!IconCmp) return null;
                  return (
                    <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                      onClick={() => trackEvent({ type: 'social_click', platform, language })}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-nature-600 flex items-center justify-center transition-colors"
                      aria-label={platform}>
                      <IconCmp className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4 text-white/90">{language === 'mn' ? 'Холбоосууд' : 'Quick Links'}</h4>
            <ul className="space-y-2">
              {NAV.map((item) => (
                <li key={item.anchor}>
                  <a href={item.anchor} onClick={(e) => handleNav(e, item.anchor)}
                    className="text-white/55 hover:text-white text-sm transition-colors">
                    {language === 'mn' ? item.mn : item.en}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-white/90">{language === 'mn' ? 'Холбоо барих' : 'Contact'}</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {contact?.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-nature-400 flex-shrink-0" /> {contact.phone}
                </li>
              )}
              {contact?.email && (
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-nature-400 flex-shrink-0" /> {contact.email}
                </li>
              )}
              {pick(contact?.address) && (
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-nature-400 flex-shrink-0 mt-0.5" />
                  <span>{pick(contact?.address)}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-white/40 text-xs">
          <span>© {year} {pick(general?.siteName)}. {language === 'mn' ? 'Бүх эрх хуулиар хамгаалагдсан.' : 'All rights reserved.'}</span>
          <span className="flex items-center gap-1">
            {language === 'mn' ? 'Хайр дурлалаар хийгдсэн' : 'Made with'} <Heart className="w-3 h-3 text-red-400 mx-0.5 fill-red-400" /> {language === 'mn' ? '' : 'in Mongolia'}
          </span>
        </div>
      </div>
    </footer>
  );
}
