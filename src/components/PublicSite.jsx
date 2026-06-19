import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Hero from './Hero.jsx';
import About from './About.jsx';
import WhyUs from './WhyUs.jsx';
import Services from './Services.jsx';
import Programs from './Programs.jsx';
import Rooms from './Rooms.jsx';
import Prices from './Prices.jsx';
import NatureGallery from './NatureGallery.jsx';
import Reviews from './Reviews.jsx';
import Location from './Location.jsx';
import Contact from './Contact.jsx';
import Footer from './Footer.jsx';
import { getSiteContent } from '../services/contentService.js';
import { trackEvent } from '../services/analyticsService.js';
import { getDeviceType } from '../utils/formatters.js';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import Faq from './Faq.jsx';

export default function PublicSite() {
  const { language } = useLanguage();
  const [content, setContent] = useState(null);

  useEffect(() => {
    setContent(getSiteContent());
  }, []);

  useEffect(() => {
    trackEvent({ type: 'page_view', language, device: getDeviceType() });
  }, []);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">🧘</div>
          <p className="text-stone-500">Уншиж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header siteName={content.general?.siteName} logoPath={content.general?.logoPath} />
      <main>
        <Hero hero={content.hero} general={content.general} />
        <About about={content.about} />
        <WhyUs whyUs={content.whyUs} />
        <Services services={content.services} />
        <Programs programs={content.programs} />
        <Rooms rooms={content.rooms} />
        <Prices prices={content.prices} />
        <NatureGallery nature={content.nature} />
        <Reviews reviews={content.reviews} />
        <Faq faq={content.faq} />
        <Location location={content.location} />
        <Contact contact={content.contact} programs={content.programs} />
      </main>
      <Footer general={content.general} contact={content.contact} social={content.social} />
    </div>
  );
}
