import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { getSiteContent, saveSection } from '../services/contentService.js';
import AutoTranslateField from './AutoTranslateField.jsx';
import IconPicker from './IconPicker.jsx';
import ImageUploader from './ImageUploader.jsx';
import EditorShell from './EditorShell.jsx';
import { useToast, Toast } from './Toast.jsx';

function genId() {
  return `adv_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

export default function AboutEditor() {
  const { toast, showSuccess, showError } = useToast();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(getSiteContent().about);
  }, []);

  if (!data) return null;

  const updateText = (value) => setData((d) => ({ ...d, text: value }));
  const updateVisual = (field, path) => setData((d) => ({ ...d, [field]: path }));

  const updateAdv = (id, patch) =>
    setData((d) => ({
      ...d,
      advantages: d.advantages.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    }));

  const addAdv = () =>
    setData((d) => ({
      ...d,
      advantages: [
        ...d.advantages,
        { id: genId(), icon: 'Sparkles', title: { mn: '', en: '' }, description: { mn: '', en: '' } },
      ],
    }));

  const removeAdv = (id) => {
    if (!window.confirm('Та устгахдаа итгэлтэй байна уу?')) return;
    setData((d) => ({ ...d, advantages: d.advantages.filter((a) => a.id !== id) }));
  };

  const handleSave = () => {
    try {
      saveSection('about', data);
      showSuccess();
    } catch (e) {
      showError();
    }
  };

  const VISUAL_CARDS = [
    { field: 'visual1Path', label: '1-р зураг (Бясалгал)' },
    { field: 'visual2Path', label: '2-р зураг (Урлал)' },
    { field: 'visual3Path', label: '3-р зураг (Байгаль)' },
  ];

  return (
    <>
      <Toast toast={toast} />
      <EditorShell
        title="Бидний тухай"
        description="Танилцуулга текст, visual зургууд, давуу талууд"
        onSave={handleSave}
      >
        <AutoTranslateField
          label="Танилцуулга текст"
          value={data.text}
          onChange={updateText}
          textarea
          rows={4}
        />

        {/* 3 visual card зургууд */}
        <div className="mt-6 mb-6 border border-gray-100 rounded-xl p-4 bg-gray-50/50">
          <h3 className="font-bold text-gray-700 mb-1">Visual зургууд (About хэсгийн 3 зураг)</h3>
          <p className="text-xs text-gray-500 mb-4">Зураг оруулаагүй тохиолдолд emoji харагдана. Зураг оруулбал emoji-г орлоно.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {VISUAL_CARDS.map((vc) => (
              <ImageUploader
                key={vc.field}
                label={vc.label}
                value={data[vc.field] || ''}
                onChange={(path) => updateVisual(vc.field, path)}
                folder="about"
              />
            ))}
          </div>
        </div>

        {/* Давуу талууд */}
        <div className="flex items-center justify-between mt-4 mb-3">
          <h3 className="font-bold text-gray-800">Давуу талууд</h3>
          <button
            onClick={addAdv}
            className="inline-flex items-center gap-1 text-sm text-nature-700 hover:text-nature-900 font-medium"
          >
            <Plus className="w-4 h-4" /> Нэмэх
          </button>
        </div>

        {data.advantages.map((adv) => (
          <div key={adv.id} className="border border-gray-200 rounded-xl p-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <IconPicker value={adv.icon} onChange={(icon) => updateAdv(adv.id, { icon })} />
              <button
                onClick={() => removeAdv(adv.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <AutoTranslateField
              label="Гарчиг"
              value={adv.title}
              onChange={(v) => updateAdv(adv.id, { title: v })}
            />
            <AutoTranslateField
              label="Тайлбар"
              value={adv.description}
              onChange={(v) => updateAdv(adv.id, { description: v })}
            />
          </div>
        ))}
      </EditorShell>
    </>
  );
}
