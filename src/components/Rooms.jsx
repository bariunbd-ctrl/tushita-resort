import React, { useState } from 'react';
import { Users, Check, X, ChevronRight, CalendarDays } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { getImageUrl } from '../services/fileStorageService.js';
import { formatPrice } from '../utils/formatters.js';

export default function Rooms({ rooms, onBook }) {
  const { pick, language } = useLanguage();
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');

  const filtered = (rooms || []).filter(
    (r) => r.capacity >= guests
  );

  const handleBook = (room) => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="rooms" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-nature-50 text-nature-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            🏡 {language === 'mn' ? 'Байр / Өрөө' : 'Accommodation'}
          </div>
          <h2 className="text-4xl font-extrabold text-stone-800 mb-4">
            {language === 'mn' ? 'Тав тухтай байр сонго' : 'Choose your retreat space'}
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto">
            {language === 'mn'
              ? 'Уламжлалт монгол гэрнүүд — орчин үеийн тав тух, байгалийн дулааныг хослуулсан'
              : 'Traditional Mongolian gers — combining modern comfort with natural warmth'}
          </p>
        </div>

        {/* Quick filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 bg-white rounded-2xl p-4 shadow-soft max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-stone-400" />
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="border border-stone-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-nature-500"
            >
              {[1,2,3,4,5,6].map(n => (
                <option key={n} value={n}>{n} {language === 'mn' ? 'хүн' : 'guests'}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-stone-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-stone-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-nature-500"
            />
          </div>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-nature-600 text-white px-5 py-1.5 rounded-lg text-sm font-semibold hover:bg-nature-700 transition-colors"
          >
            {language === 'mn' ? 'Захиалах' : 'Book'}
          </button>
        </div>

        {/* Room cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((room) => {
            const amenities = room.amenities?.[language] || room.amenities?.mn || [];
            return (
              <div
                key={room.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 flex flex-col ${!room.available ? 'opacity-60' : ''}`}
              >
                {/* Image */}
                <div className="relative h-52 bg-stone-100 overflow-hidden">
                  <img
                    src={getImageUrl(room.imagePath, pick(room.name))}
                    alt={pick(room.name)}
                    className="w-full h-full object-cover"
                  />
                  {!room.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold">
                        {language === 'mn' ? 'Захиалагдсан' : 'Fully booked'}
                      </span>
                    </div>
                  )}
                  {room.available && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold">
                      {language === 'mn' ? 'Боломжтой' : 'Available'}
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-stone-700 text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                    <Users className="w-3 h-3" /> {language === 'mn' ? `${room.capacity} хүртэл` : `Up to ${room.capacity}`}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-stone-800 mb-1">{pick(room.name)}</h3>
                  <p className="text-stone-500 text-sm mb-4">{pick(room.description)}</p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-y-1 gap-x-3 mb-5">
                    {amenities.map((a, i) => (
                      <span key={i} className="flex items-center gap-1 text-xs text-stone-600">
                        <Check className="w-3 h-3 text-nature-500" /> {a}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <span className="text-2xl font-extrabold text-stone-800">
                        {formatPrice(room.price, room.currency)}
                      </span>
                      <span className="text-stone-400 text-sm"> / {language === 'mn' ? 'шөнө' : 'night'}</span>
                    </div>
                    <button
                      onClick={() => handleBook(room)}
                      disabled={!room.available}
                      className="inline-flex items-center gap-1.5 bg-nature-600 hover:bg-nature-700 disabled:bg-stone-200 disabled:text-stone-400 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors text-sm"
                    >
                      {room.available
                        ? (language === 'mn' ? 'Захиалах' : 'Book Now')
                        : (language === 'mn' ? 'Боломжгүй' : 'Unavailable')
                      }
                      {room.available && <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-stone-500">
            {language === 'mn' ? 'Тохирсон байр олдсонгүй. Зочдын тоог өөрчилнэ үү.' : 'No matching rooms found. Try adjusting guest count.'}
          </div>
        )}
      </div>
    </section>
  );
}
