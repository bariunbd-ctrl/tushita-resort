import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import Icon from './Icon.jsx';

export default function Services({ services }) {
  const { pick, language } = useLanguage();
  const items = (services || []).filter(s => s.active).sort((a, b) => (a.order||0)-(b.order||0));

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-stone-100 text-stone-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            🔆 {language === 'mn' ? 'Бидний үйлчилгээ' : 'What we offer'}
          </div>
          <h2 className="text-4xl font-extrabold text-stone-800">
            {language === 'mn' ? 'Бүх зүйл нэг дор' : 'Everything in one place'}
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((srv) => (
            <div key={srv.id} className="group flex items-start gap-4 bg-stone-50 hover:bg-nature-600 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-white/20 flex items-center justify-center flex-shrink-0 shadow-soft transition-colors">
                <Icon name={srv.icon} className="w-6 h-6 text-nature-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-bold text-stone-800 group-hover:text-white transition-colors">{pick(srv.title)}</h3>
                <p className="text-sm text-stone-500 group-hover:text-white/75 mt-0.5 transition-colors">{pick(srv.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
