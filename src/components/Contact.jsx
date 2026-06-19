import React, { useState } from 'react';
import { Phone, Mail, Send, CheckCircle, AlertCircle, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { createInquiry } from '../services/inquiryService.js';
import { trackEvent } from '../services/analyticsService.js';
import { validateInquiry } from '../utils/validators.js';

const EMPTY = { name: '', phone: '', email: '', guestCount: '', preferredDate: '', message: '', program: '' };

export default function Contact({ contact, programs }) {
  const { t, language } = useLanguage();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    const { valid, errors: errs } = validateInquiry(form, language);
    setErrors(errs);
    if (!valid) return;
    setSubmitting(true);
    try {
      createInquiry({ ...form, sourcePage: 'contact', language, status: 'new', submittedAt: new Date().toISOString() });
      trackEvent({ type: 'booking_submit', language });
      setStatus('success');
      setForm(EMPTY);
      setErrors({});
    } catch (err) {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-nature-500 focus:ring-2 focus:ring-nature-200 outline-none transition bg-stone-50 focus:bg-white';

  const progOptions = programs || [];

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-nature-50 text-nature-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            📩 {language === 'mn' ? 'Захиалга & Холбоо барих' : 'Book & Contact'}
          </div>
          <h2 className="text-4xl font-extrabold text-stone-800 mb-3">
            {language === 'mn' ? 'Аяллаа эхлүүл' : 'Start your retreat'}
          </h2>
          <p className="text-stone-500">{language === 'mn' ? 'Хүсэлт илгээснээс хойш 24 цагийн дотор хариу өгнө' : 'We respond within 24 hours of your inquiry'}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {contact?.phone && (
              <a href={`tel:${contact.phone}`}
                onClick={() => trackEvent({ type: 'phone_click', language })}
                className="flex items-center gap-4 bg-nature-50 hover:bg-nature-100 rounded-2xl p-5 transition-colors">
                <div className="w-12 h-12 rounded-full bg-nature-600 text-white flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 mb-0.5">{language === 'mn' ? 'Залгах' : 'Call us'}</p>
                  <p className="font-bold text-stone-800">{contact.phone}</p>
                </div>
              </a>
            )}
            {contact?.email && (
              <a href={`mailto:${contact.email}`}
                className="flex items-center gap-4 bg-stone-50 hover:bg-stone-100 rounded-2xl p-5 transition-colors">
                <div className="w-12 h-12 rounded-full bg-stone-700 text-white flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 mb-0.5">{language === 'mn' ? 'Имэйл' : 'Email'}</p>
                  <p className="font-bold text-stone-800">{contact.email}</p>
                </div>
              </a>
            )}
            <div className="flex items-center gap-4 bg-amber-50 rounded-2xl p-5">
              <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-stone-500 mb-0.5">{language === 'mn' ? 'Хариу өгөх хугацаа' : 'Response time'}</p>
                <p className="font-bold text-stone-800">{language === 'mn' ? '24 цагийн дотор' : 'Within 24 hours'}</p>
              </div>
            </div>
            {/* FAQ mini */}
            <div className="bg-stone-800 text-white rounded-2xl p-5">
              <p className="font-bold mb-3">
                {language === 'mn' ? '💡 Түгээмэл асуулт' : '💡 Quick FAQ'}
              </p>
              {[
                { q: language === 'mn' ? 'Хамгийн ойр цагаан мөр хэзээ?' : 'When is the next opening?', a: language === 'mn' ? 'Сар бүр retreat зохион байгуулна' : 'We host retreats monthly' },
                { q: language === 'mn' ? 'Урьдчилгаа төлбөр шаардлагатай юу?' : 'Is deposit required?', a: language === 'mn' ? '30% урьдчилгаа, үлдэгдлийг ирэхдээ' : '30% deposit, rest on arrival' },
              ].map((faq, i) => (
                <div key={i} className={`text-sm ${i > 0 ? 'border-t border-white/10 mt-3 pt-3' : ''}`}>
                  <p className="font-medium text-white/90">{faq.q}</p>
                  <p className="text-white/60 mt-0.5">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 bg-stone-50 rounded-3xl p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-stone-700 mb-1">
                  {t('contact.name')} <span className="text-red-400">*</span>
                </label>
                <input name="name" value={form.name} onChange={handleChange} className={inputClass} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">
                  {t('contact.phone')} <span className="text-red-400">*</span>
                </label>
                <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">{t('contact.email')}</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">
                  {language === 'mn' ? 'Хөтөлбөр сонгох' : 'Choose program'}
                </label>
                <select name="program" value={form.program} onChange={handleChange} className={inputClass}>
                  <option value="">{language === 'mn' ? '-- Сонгох --' : '-- Select --'}</option>
                  {progOptions.filter(p => p.active).map(p => (
                    <option key={p.id} value={p.id}>
                      {language === 'mn' ? p.title?.mn : p.title?.en}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">{t('contact.guestCount')}</label>
                <input name="guestCount" type="number" min="1" value={form.guestCount} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">{t('contact.preferredDate')}</label>
                <input name="preferredDate" type="date" value={form.preferredDate} onChange={handleChange} className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-stone-700 mb-1">{t('contact.message')}</label>
                <textarea name="message" rows="3" value={form.message} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            {status === 'success' && (
              <div className="mt-4 flex items-start gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{t('contact.success')}</span>
              </div>
            )}
            {status === 'error' && (
              <div className="mt-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{t('contact.error')}</span>
              </div>
            )}

            <button type="submit" disabled={submitting}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-nature-600 hover:bg-nature-700 text-white px-6 py-4 rounded-xl font-bold transition-colors disabled:opacity-60 text-base">
              {submitting ? (language === 'mn' ? 'Илгээж байна...' : 'Sending...') : (language === 'mn' ? '📩 Захиалга илгээх' : '📩 Send Booking Request')}
              {!submitting && <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
