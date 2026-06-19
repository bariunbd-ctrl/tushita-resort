import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { getSiteContent, saveSection } from '../services/contentService.js';
import AutoTranslateField from './AutoTranslateField.jsx';
import IconPicker from './IconPicker.jsx';
import EditorShell from './EditorShell.jsx';
import { useToast, Toast } from './Toast.jsx';

const rid = () => `why_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;

export default function WhyUsEditor() {
  const { toast, showSuccess, showError } = useToast();
  const [items, setItems] = useState(null);

  useEffect(() => {
    setItems(getSiteContent().whyUs || []);
  }, []);

  if (!items) return null;

  const update = (id, patch) =>
    setItems(list => list.map(i => i.id === id ? { ...i, ...patch } : i));

  const add = () =>
    setItems(list => [...list, {
      id: rid(), icon: 'Sparkles',
      question: { mn: '', en: '' },
      answer: { mn: '', en: '' }
    }]);

  const remove = (id) => {
    if (!window.confirm('Та устгахдаа итгэлтэй байна уу?')) return;
    setItems(list => list.filter(i => i.id !== id));
  };

  const handleSave = () => {
    try { saveSection('whyUs', items); showSuccess(); }
    catch (e) { showError(); }
  };

  return (
    <>
      <Toast toast={toast} />
      <EditorShell
        title="Танин мэдэхүйн мэдээлэл"
        description="Яагаад энд амрах вэ? Юу үзэх вэ? Хэнд тохиромжтой вэ?"
        onSave={handleSave}
      >
        <div className="flex justify-end mb-3">
          <button onClick={add}
            className="inline-flex items-center gap-1 text-sm text-nature-700 hover:text-nature-900 font-medium">
            <Plus className="w-4 h-4" /> Нэмэх
          </button>
        </div>

        {items.map(item => (
          <div key={item.id} className="border border-gray-200 rounded-xl p-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <IconPicker value={item.icon}
                onChange={icon => update(item.id, { icon })} />
              <button onClick={() => remove(item.id)}
                className="text-red-500 hover:text-red-700 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <AutoTranslateField label="Асуулт"
              value={item.question}
              onChange={v => update(item.id, { question: v })} />
            <AutoTranslateField label="Хариулт"
              value={item.answer}
              onChange={v => update(item.id, { answer: v })}
              textarea rows={3} />
          </div>
        ))}
      </EditorShell>
    </>
  );
}