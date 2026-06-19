import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { createInquiry } from '../services/inquiryService.js';

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`w-4 h-4 ${i <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}`} />
      ))}
    </div>
  );
}

function ReviewForm({ language }) {
  const [form, setForm] = useState({ name: '', rating: 5, text: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    createInquiry({
      name: form.name,
      phone: '',
      email: '',
      message: `⭐${form.rating} — ${form.text}`,
      sourcePage: 'review',
      language,
      status: 'new',
      submittedAt: new Date().toISOString(),
    });
    setSent(true);
  };

  // ✅ inputClass (өмнө ic гэж буруу байсан — засагдлаа)
  const inputClass = 'w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-nature-400 transition';

  if (sent) return (
    <div className="text-center py-8 text-green-400 font-semibold text-lg">
      {language === 'mn' ? '✅ Сэтгэгдэл илгээгдлээ. Баярлалаа!' : '✅ Review submitted. Thank you!'}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
      <div>
        <label className="text-white/70 text-sm mb-1 block">
          {language === 'mn' ? 'Нэр' : 'Name'} *
        </label>
        <input
          value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
          className={inputClass}
          placeholder={language === 'mn' ? 'Таны нэр' : 'Your name'}
        />
      </div>

      <div>
        <label className="text-white/70 text-sm mb-2 block">
          {language === 'mn' ? 'Үнэлгээ' : 'Rating'}
        </label>
        <div className="flex gap-2">
          {[1,2,3,4,5].map(n => (
            <button
              key={n}
              type="button"
              onClick={() => setForm(p => ({ ...p, rating: n }))}
              className={`text-2xl transition-transform hover:scale-110 ${n <= form.rating ? 'text-amber-400' : 'text-white/20'}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-white/70 text-sm mb-1 block">
          {language === 'mn' ? 'Сэтгэгдэл' : 'Review'} *
        </label>
        <textarea
          rows={3}
          value={form.text}
          onChange={e => setForm(p => ({ ...p, text: e.target.value }))}
          className={inputClass}
          placeholder={language === 'mn' ? 'Таны сэтгэгдэл...' : 'Your experience...'}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-nature-600 hover:bg-nature-500 text-white font-bold py-3 rounded-xl transition-colors"
      >
        {language === 'mn' ? 'Илгээх' : 'Submit'}
      </button>
    </form>
  );
}

export default function Reviews({ reviews }) {
  const { pick, language } = useLanguage();
  const items = reviews || [];
  const [active, setActive] = useState(0);

  const avg = items.length
    ? (items.reduce((s, r) => s + r.rating, 0) / items.length).toFixed(1)
    : '5.0';

  const prev = () => setActive((a) => (a - 1 + items.length) % items.length);
  const next = () => setActive((a) => (a + 1) % items.length);

  if (!items.length) return null;

  return (
    <section id="reviews" className="py-24 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            ⭐ {language === 'mn' ? 'Зочдын сэтгэгдэл' : 'Guest Reviews'}
          </div>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-6xl font-extrabold text-amber-400">{avg}</span>
            <div className="text-left">
              <StarRating rating={5} />
              <p className="text-white/60 text-sm mt-1">
                {items.length} {language === 'mn' ? 'үнэлгээ' : 'reviews'} · Tripadvisor
              </p>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold">
            {language === 'mn' ? 'Зочдын хэлсэн үг' : 'What our guests say'}
          </h2>
        </div>

        {/* Featured review slider */}
        <div className="relative max-w-3xl mx-auto mb-12">
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 md:p-12">
            <Quote className="w-10 h-10 text-amber-400/40 mb-4" />
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-6 italic">
              "{pick(items[active]?.text)}"
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-nature-600 flex items-center justify-center text-white font-bold text-lg">
                  {items[active]?.name?.[0] || '?'}
                </div>
                <div>
                  <div className="font-semibold">{items[active]?.name}</div>
                  <div className="text-white/50 text-sm">{items[active]?.date}</div>
                </div>
              </div>
              <StarRating rating={items[active]?.rating || 5} />
            </div>
          </div>

          {items.length > 1 && (
            <div className="flex justify-center gap-3 mt-6">
              <button onClick={prev} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === active ? 'bg-amber-400 w-6' : 'bg-white/30'}`}
                />
              ))}
              <button onClick={next} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Grid of all reviews */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {items.map((rev, i) => (
            <button key={rev.id} onClick={() => setActive(i)}
              className={`text-left bg-white/5 hover:bg-white/10 border rounded-2xl p-5 transition-all ${i === active ? 'border-amber-400/50 bg-white/10' : 'border-white/10'}`}>
              <StarRating rating={rev.rating} />
              <p className="text-white/70 text-sm mt-2 line-clamp-3 italic">"{pick(rev.text)}"</p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-7 h-7 rounded-full bg-nature-600 flex items-center justify-center text-white text-xs font-bold">
                  {rev.name?.[0]}
                </div>
                <span className="text-white/50 text-xs">{rev.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Сэтгэгдэл бичих form */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6">
            {language === 'mn' ? '✍️ Сэтгэгдэлээ үлдээх' : '✍️ Leave a review'}
          </h3>
          <ReviewForm language={language} />
        </div>

      </div>
    </section>
  );
}