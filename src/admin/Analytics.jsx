import React, { useState, useEffect, useMemo } from 'react';
import { Eye, MousePointerClick, Phone, MapPin, Share2, Tag, Send, Globe } from 'lucide-react';
import { getAllEvents, getEventsByDateRange } from '../services/analyticsService.js';

const EVENT_LABELS = {
  page_view: { label: 'Хандалт', icon: Eye },
  phone_click: { label: 'Утас дарсан', icon: Phone },
  map_click: { label: 'Газрын зураг дарсан', icon: MapPin },
  social_click: { label: 'Сошиал дарсан', icon: Share2 },
  price_view: { label: 'Үнэ үзсэн', icon: Tag },
  booking_submit: { label: 'Захиалга илгээсэн', icon: Send },
  language_change: { label: 'Хэл сольсон', icon: Globe },
};

function toInputDate(d) {
  return d.toISOString().slice(0, 10);
}

export default function Analytics() {
  const [start, setStart] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return toInputDate(d);
  });
  const [end, setEnd] = useState(() => toInputDate(new Date()));
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    setAllEvents(getAllEvents());
  }, []);

  const events = useMemo(() => {
    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999);
    return getEventsByDateRange(new Date(start), endDate);
  }, [start, end, allEvents]);

  const counts = useMemo(() => {
    const c = {};
    events.forEach((e) => {
      c[e.type] = (c[e.type] || 0) + 1;
    });
    return c;
  }, [events]);

  const deviceCounts = useMemo(() => {
    const c = { mobile: 0, tablet: 0, desktop: 0 };
    events.forEach((e) => {
      if (c[e.device] !== undefined) c[e.device] += 1;
    });
    return c;
  }, [events]);

  const langCounts = useMemo(() => {
    const c = { mn: 0, en: 0 };
    events.filter((e) => e.type === 'page_view').forEach((e) => {
      if (c[e.language] !== undefined) c[e.language] += 1;
    });
    return c;
  }, [events]);

  const totalLang = (langCounts.mn + langCounts.en) || 1;

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-gray-800 mb-1">Статистик</h2>
      <p className="text-gray-500 mb-6">Хугацааны хүрээгээр шүүж үзэх</p>

      {/* Date range */}
      <div className="flex flex-wrap gap-3 mb-6 bg-white rounded-2xl p-4 shadow-soft items-end">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Эхлэх огноо</label>
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-nature-500" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Дуусах огноо</label>
          <input type="date" value={end} onChange={(e) => setEnd(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-nature-500" />
        </div>
        <div className="text-sm text-gray-500 ml-auto">
          Нийт {events.length} event
        </div>
      </div>

      {/* Event counts */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {Object.entries(EVENT_LABELS).map(([type, { label, icon: IconCmp }]) => (
          <div key={type} className="bg-white rounded-2xl p-5 shadow-soft flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-nature-100 text-nature-700 flex items-center justify-center">
              <IconCmp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-gray-800">{counts[type] || 0}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Device breakdown */}
        <div className="bg-white rounded-2xl p-5 shadow-soft">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <MousePointerClick className="w-4 h-4" /> Төхөөрөмж
          </h3>
          {Object.entries(deviceCounts).map(([dev, count]) => (
            <Bar key={dev} label={dev} value={count} total={events.length || 1} />
          ))}
        </div>

        {/* Language ratio */}
        <div className="bg-white rounded-2xl p-5 shadow-soft">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4" /> Хэлний харьцаа (хандалт)
          </h3>
          <Bar label="Монгол (MN)" value={langCounts.mn} total={totalLang} />
          <Bar label="English (EN)" value={langCounts.en} total={totalLang} />
        </div>
      </div>
    </div>
  );
}

function Bar({ label, value, total }) {
  const pct = Math.round((value / total) * 100);
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600 capitalize">{label}</span>
        <span className="font-semibold text-gray-800">{value} ({pct}%)</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-nature-500 rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
