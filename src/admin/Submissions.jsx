import React, { useState, useEffect, useMemo } from 'react';
import { Search, Trash2, Phone, Mail, Users, Calendar } from 'lucide-react';
import {
  getInquiries, updateInquiryStatus, deleteInquiry,
  INQUIRY_STATUSES, STATUS_LABELS,
} from '../services/inquiryService.js';
import { formatDate } from '../utils/formatters.js';
import { useToast, Toast } from './Toast.jsx';

const STATUS_COLORS = {
  new: 'bg-amber-100 text-amber-700',
  contacted: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  archived: 'bg-gray-100 text-gray-600',
};

export default function Submissions() {
  const { toast, showSuccess, showError } = useToast();
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const reload = () => setItems(getInquiries());

  useEffect(() => {
    reload();
  }, []);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      if (filter !== 'all' && i.status !== filter) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${i.name} ${i.phone} ${i.email}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [items, filter, query]);

  const handleStatus = (id, status) => {
    try {
      updateInquiryStatus(id, status);
      reload();
      showSuccess('Статус шинэчлэгдлээ');
    } catch (e) {
      showError();
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm('Та энэ хүсэлтийг устгахдаа итгэлтэй байна уу?')) return;
    try {
      deleteInquiry(id);
      reload();
      showSuccess('Устгагдлаа');
    } catch (e) {
      showError();
    }
  };

  return (
    <div>
      <Toast toast={toast} />
      <h2 className="text-2xl font-extrabold text-gray-800 mb-1">Ирсэн хүсэлтүүд</h2>
      <p className="text-gray-500 mb-6">Холбоо барих формоор ирсэн хүсэлтүүд</p>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-5 items-center">
        <div className="flex flex-wrap gap-1.5">
          <FilterBtn active={filter === 'all'} onClick={() => setFilter('all')}>Бүгд</FilterBtn>
          {INQUIRY_STATUSES.map((s) => (
            <FilterBtn key={s} active={filter === s} onClick={() => setFilter(s)}>
              {STATUS_LABELS[s].mn}
            </FilterBtn>
          ))}
        </div>
        <div className="relative ml-auto">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Нэр, утас, имэйл хайх"
            className="pl-9 pr-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-nature-500 text-sm w-56"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center text-gray-400 shadow-soft">
          Хүсэлт олдсонгүй
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((inq) => (
            <div key={inq.id} className="bg-white rounded-2xl p-5 shadow-soft">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-800">{inq.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[inq.status]}`}>
                      {STATUS_LABELS[inq.status]?.mn || inq.status}
                    </span>
                    <span className="text-xs text-gray-400 uppercase">{inq.language}</span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                    {inq.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {inq.phone}</span>}
                    {inq.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {inq.email}</span>}
                    {inq.guestCount && <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {inq.guestCount}</span>}
                    {inq.preferredDate && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {inq.preferredDate}</span>}
                  </div>
                  {inq.message && <p className="text-sm text-gray-700 mt-2 bg-gray-50 rounded-lg p-3">{inq.message}</p>}
                  <p className="text-xs text-gray-400 mt-2">{formatDate(inq.submittedAt)}</p>
                </div>

                <div className="flex flex-col gap-2 items-end">
                  <select
                    value={inq.status}
                    onChange={(e) => handleStatus(inq.id, e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-2 py-1.5 outline-none focus:border-nature-500"
                  >
                    {INQUIRY_STATUSES.map((s) => (
                      <option key={s} value={s}>{STATUS_LABELS[s].mn}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDelete(inq.id)}
                    className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" /> Устгах
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        active ? 'bg-nature-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-nature-400'
      }`}
    >
      {children}
    </button>
  );
}
