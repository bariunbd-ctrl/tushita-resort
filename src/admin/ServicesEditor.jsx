import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { getSiteContent, saveSection } from '../services/contentService.js';
import AutoTranslateField from './AutoTranslateField.jsx';
import IconPicker from './IconPicker.jsx';
import FormField from './FormField.jsx';
import EditorShell from './EditorShell.jsx';
import { useToast, Toast } from './Toast.jsx';

const rid = () => `srv_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

export default function ServicesEditor() {
  const { toast, showSuccess, showError } = useToast();
  const [items, setItems] = useState(null);

  useEffect(() => {
    setItems(getSiteContent().services);
  }, []);

  if (!items) return null;

  const update = (id, patch) =>
    setItems((list) => list.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const add = () =>
    setItems((list) => [
      ...list,
      {
        id: rid(),
        icon: 'Sparkles',
        title: { mn: '', en: '' },
        description: { mn: '', en: '' },
        active: true,
        order: list.length + 1,
      },
    ]);

  const remove = (id) => {
    if (!window.confirm('Та устгахдаа итгэлтэй байна уу?')) return;
    setItems((list) => list.filter((s) => s.id !== id));
  };

  const handleSave = () => {
    try {
      saveSection('services', items);
      showSuccess();
    } catch (e) {
      showError();
    }
  };

  const sorted = [...items].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <>
      <Toast toast={toast} />
      <EditorShell
        title="Үйлчилгээ"
        description="Үйлчилгээний жагсаалт"
        onSave={handleSave}
      >
        <div className="flex justify-end mb-3">
          <button onClick={add} className="inline-flex items-center gap-1 text-sm text-nature-700 hover:text-nature-900 font-medium">
            <Plus className="w-4 h-4" /> Үйлчилгээ нэмэх
          </button>
        </div>

        {sorted.map((srv) => (
          <div key={srv.id} className="border border-gray-200 rounded-xl p-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <IconPicker value={srv.icon} onChange={(icon) => update(srv.id, { icon })} />
              <button onClick={() => remove(srv.id)} className="text-red-500 hover:text-red-700 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <AutoTranslateField label="Гарчиг" value={srv.title} onChange={(v) => update(srv.id, { title: v })} />
            <AutoTranslateField label="Тайлбар" value={srv.description} onChange={(v) => update(srv.id, { description: v })} textarea rows={2} />
            <div className="grid sm:grid-cols-2 gap-3 items-end">
              <FormField
                label="Эрэмбэ (order)"
                type="number"
                value={srv.order}
                onChange={(v) => update(srv.id, { order: Number(v) || 0 })}
              />
              <label className="flex items-center gap-2 text-sm text-gray-700 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!srv.active}
                  onChange={(e) => update(srv.id, { active: e.target.checked })}
                  className="w-4 h-4 accent-nature-600"
                />
                Идэвхтэй (вэб дээр харагдана)
              </label>
            </div>
          </div>
        ))}
      </EditorShell>
    </>
  );
}
