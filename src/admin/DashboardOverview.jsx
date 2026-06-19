import React, { useState, useEffect } from 'react';
import {
  Inbox, Sparkles, Eye, MousePointerClick, Globe, TrendingUp,
} from 'lucide-react';
import { getAnalyticsSummary } from '../services/analyticsService.js';
import { getInquiries } from '../services/inquiryService.js';

function StatCard({ icon: IconCmp, label, value, sub, color = 'nature' }) {
  const colorMap = {
    nature: 'bg-nature-100 text-nature-700',
    blue: 'bg-blue-100 text-blue-700',
    amber: 'bg-amber-100 text-amber-700',
    rose: 'bg-rose-100 text-rose-700',
  };
  return (
    <div className="bg-white rounded-2xl p-5 shadow-soft">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          <IconCmp className="w-5 h-5" />
        </div>
      </div>
      <div className="text-2xl font-extrabold text-gray-800">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  );
}

const BUTTON_LABELS = {
  phone_click: 'Утас руу залгах',
  map_click: 'Газрын зураг',
  social_click: 'Сошиал холбоос',
};

export default function DashboardOverview() {
  const [summary, setSummary] = useState(null);
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    setSummary(getAnalyticsSummary());
    setInquiries(getInquiries());
  }, []);

  if (!summary) return <div className="text-gray-500">Уншиж байна...</div>;

  const newCount = inquiries.filter((i) => i.status === 'new').length;
  const topBtn = summary.topButton ? BUTTON_LABELS[summary.topButton] || summary.topButton : '—';

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-gray-800 mb-1">Тойм</h2>
      <p className="text-gray-500 mb-6">Вэб сайтын ерөнхий статистик</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard icon={Inbox} label="Нийт ирсэн хүсэлт" value={inquiries.length} color="nature" />
        <StatCard icon={Sparkles} label="Шинэ хүсэлт" value={newCount} color="amber" />
        <StatCard icon={Eye} label="Өнөөдрийн хандалт" value={summary.todayPageViews} color="blue" />
        <StatCard
          icon={TrendingUp}
          label="Энэ долоо хоногийн хандалт"
          value={summary.weekPageViews}
          color="blue"
        />
        <StatCard
          icon={MousePointerClick}
          label="Хамгийн их дарагдсан товч"
          value={topBtn}
          color="rose"
        />
        <StatCard
          icon={Globe}
          label="MN / EN харьцаа"
          value={`${summary.languageRatio.mnPercent}% / ${summary.languageRatio.enPercent}%`}
          sub={`MN: ${summary.languageRatio.mn} · EN: ${summary.languageRatio.en}`}
          color="nature"
        />
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-soft">
        <h3 className="font-bold text-gray-800 mb-3">Товч дарсан тоо</h3>
        <div className="space-y-2">
          {summary.clickCounts.map((c) => (
            <div key={c.type} className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{BUTTON_LABELS[c.type] || c.type}</span>
              <span className="font-semibold text-gray-800">{c.count}</span>
            </div>
          ))}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Үнэ үзсэн (price_view)</span>
            <span className="font-semibold text-gray-800">{summary.priceViews}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Захиалга илгээсэн (booking_submit)</span>
            <span className="font-semibold text-gray-800">{summary.bookingSubmits}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
