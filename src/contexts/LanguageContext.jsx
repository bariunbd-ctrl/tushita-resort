import React, { createContext, useContext, useState, useCallback } from 'react';

const LanguageContext = createContext(null);

// UI label translations (static interface strings, MN/EN)
const UI = {
  nav: {
    home: { mn: 'Нүүр', en: 'Home' },
    about: { mn: 'Бидний тухай', en: 'About' },
    services: { mn: 'Үйлчилгээ', en: 'Services' },
    prices: { mn: 'Үнэ', en: 'Prices' },
    nature: { mn: 'Байгаль орчин', en: 'Nature' },
    location: { mn: 'Байршил', en: 'Location' },
    contact: { mn: 'Холбоо барих', en: 'Contact' },
  },
  hero: {
    viewPrices: { mn: 'Үнэ харах', en: 'View Prices' },
    viewLocation: { mn: 'Байршил харах', en: 'View Location' },
    contact: { mn: 'Холбоо барих', en: 'Contact Us' },
  },
  about: {
    title: { mn: 'Бидний тухай', en: 'About Us' },
  },
  nature: {
    title: { mn: 'Байгаль орчин', en: 'Nature' },
    gallery: { mn: 'Зургийн цомог', en: 'Gallery' },
  },
  services: {
    title: { mn: 'Үйлчилгээ', en: 'Services' },
  },
  prices: {
    title: { mn: 'Үнийн мэдээлэл', en: 'Prices' },
    perNight: { mn: '/ хоног', en: '/ night' },
    included: { mn: 'Багцад багтсан:', en: 'Included:' },
  },
  location: {
    title: { mn: 'Байршил', en: 'Location' },
    viewOnMaps: { mn: 'Google Maps-д харах', en: 'View on Google Maps' },
    directions: { mn: 'Очих зам', en: 'Directions' },
  },
  contact: {
    title: { mn: 'Холбоо барих', en: 'Contact' },
    name: { mn: 'Нэр', en: 'Name' },
    phone: { mn: 'Утас', en: 'Phone' },
    email: { mn: 'Имэйл', en: 'Email' },
    guestCount: { mn: 'Зочдын тоо', en: 'Number of guests' },
    preferredDate: { mn: 'Хүссэн огноо', en: 'Preferred date' },
    message: { mn: 'Зурвас', en: 'Message' },
    send: { mn: 'Хүсэлт илгээх', en: 'Send Request' },
    sending: { mn: 'Илгээж байна...', en: 'Sending...' },
    success: {
      mn: 'Таны хүсэлт амжилттай илгээгдлээ. Бид удахгүй холбогдох болно.',
      en: 'Your request was sent successfully. We will contact you soon.',
    },
    error: {
      mn: 'Алдаа гарлаа. Дахин оролдоно уу.',
      en: 'An error occurred. Please try again.',
    },
    required: { mn: 'Нэр болон утас заавал', en: 'Name and phone are required' },
    callUs: { mn: 'Залгах', en: 'Call us' },
  },
  footer: {
    rights: { mn: 'Бүх эрх хуулиар хамгаалагдсан.', en: 'All rights reserved.' },
    quickLinks: { mn: 'Холбоосууд', en: 'Quick Links' },
    contactInfo: { mn: 'Холбоо барих', en: 'Contact Info' },
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('mn');

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'mn' ? 'en' : 'mn'));
  }, []);

  // pick localized value from an {mn, en} object
  const pick = useCallback(
    (obj) => {
      if (!obj) return '';
      if (typeof obj === 'string') return obj;
      return obj[language] ?? obj.mn ?? '';
    },
    [language]
  );

  // get a UI label by path e.g. t('nav.home')
  const t = useCallback(
    (path) => {
      const parts = path.split('.');
      let node = UI;
      for (const p of parts) {
        node = node?.[p];
        if (node === undefined) return path;
      }
      return node[language] ?? node.mn ?? path;
    },
    [language]
  );

  const value = { language, setLanguage, toggleLanguage, pick, t };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
