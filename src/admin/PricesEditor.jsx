import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { getSiteContent, saveSection } from '../services/contentService.js';
import AutoTranslateField from './AutoTranslateField.jsx';
import FormField from './FormField.jsx';
import EditorShell from './EditorShell.jsx';
import { useToast, Toast } from './Toast.jsx';
import { linesToArray, arrayToLines } from '../utils/formatters.js';

const rid = () => `price_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

export default function PricesEditor() {
  const { toast, showSuccess, showError } = useToast();
  const [items, setItems] = useState(null);

  useEffect(() => {
    setItems(getSiteContent().prices);
  }, []);

  if (!items) return null;

  const update = (id, patch) =>
    setItems((list) => list.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const updateIncluded = (id, lang, text) =>
    setItems((list) =>
      list.map((p) =>
        p.id === id
          ? {
              ...p,
              includedItems: {
                ...(p.includedItems || { mn: [], en: [] }),
                [lang]: linesToArray(text),
              },
            }
          : p
      )
    );

  const add = () =>
    setItems((list) => [
      ...list,
      {
        id: rid(),
        name: { mn: '', en: '' },
        price: 0,
        currency: '₮',
        description: { mn: '', en: '' },
        includedItems: { mn: [], en: [] },
        active: true,
        order: list.length + 1,
      },
    ]);

  const remove = (id) => {
    if (!window.confirm('Та устгахдаа итгэлтэй байна уу?')) return;
    setItems((list) => list.filter((p) => p.id !== id));
  };

  const handleSave = () => {
    try {
      saveSection('prices', items);
      showSuccess();
    } catch (e) {
      showError();
    }
  };

  const taClass =
    'w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-nature-500 focus:ring-2 focus:ring-nature-200 outline-none transition';

  const sorted = [...items].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <>
      <Toast toast={toast} />
      <EditorShell
        title="Үнийн мэдээлэл"
        description="Үнийн багцууд. Багтсан зүйлсийг мөр тус бүрт нэг бичнэ."
        onSave={handleSave}
      >
        <div className="flex justify-end mb-3">
          <button onClick={add} className="inline-flex items-center gap-1 text-sm text-nature-700 hover:text-nature-900 font-medium">
            <Plus className="w-4 h-4" /> Багц нэмэх
          </button>
        </div>

        {sorted.map((pkg) => (
          <div key={pkg.id} className="border border-gray-200 rounded-xl p-4 mb-4">
            <div className="flex justify-end">
              <button onClick={() => remove(pkg.id)} className="text-red-500 hover:text-red-700 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <AutoTranslateField label="Багцын нэр" value={pkg.name} onChange={(v) => update(pkg.id, { name: v })} />
            <AutoTranslateField label="Тайлбар" value={pkg.description} onChange={(v) => update(pkg.id, { description: v })} textarea rows={2} />

            <div className="grid sm:grid-cols-3 gap-3">
              <FormField label="Үнэ" type="number" value={pkg.price} onChange={(v) => update(pkg.id, { price: Number(v) || 0 })} />
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Валют</label>
                <select
                  value={pkg.currency}
                  onChange={(e) => update(pkg.id, { currency: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none"
                >
                  <option value="₮">₮ (төгрөг)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
              <FormField label="Эрэмбэ" type="number" value={pkg.order} onChange={(v) => update(pkg.id, { order: Number(v) || 0 })} />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-500 mb-1">Багтсан зүйлс — MN (мөр бүрт нэг)</label>
                <textarea
                  rows={4}
                  value={arrayToLines(pkg.includedItems?.mn)}
                  onChange={(e) => updateIncluded(pkg.id, 'mn', e.target.value)}
                  className={taClass}
                  placeholder={'Өглөөний цай\nWi-Fi\nМашины зогсоол'}
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-500 mb-1">Included items — EN (one per line)</label>
                <textarea
                  rows={4}
                  value={arrayToLines(pkg.includedItems?.en)}
                  onChange={(e) => updateIncluded(pkg.id, 'en', e.target.value)}
                  className={taClass}
                  placeholder={'Breakfast\nWi-Fi\nParking'}
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={!!pkg.active}
                onChange={(e) => update(pkg.id, { active: e.target.checked })}
                className="w-4 h-4 accent-nature-600"
              />
              Идэвхтэй
            </label>
          </div>
        ))}
      </EditorShell>
    </>
  );
}
