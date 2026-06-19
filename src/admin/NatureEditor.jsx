import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { getSiteContent, saveSection } from '../services/contentService.js';
import AutoTranslateField from './AutoTranslateField.jsx';
import IconPicker from './IconPicker.jsx';
import ImageUploader from './ImageUploader.jsx';
import EditorShell from './EditorShell.jsx';
import { useToast, Toast } from './Toast.jsx';

const rid = (p) => `${p}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

export default function NatureEditor() {
  const { toast, showSuccess, showError } = useToast();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(getSiteContent().nature);
  }, []);

  if (!data) return null;

  // ---- info cards ----
  const updateCard = (id, patch) =>
    setData((d) => ({
      ...d,
      infoCards: d.infoCards.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  const addCard = () =>
    setData((d) => ({
      ...d,
      infoCards: [
        ...d.infoCards,
        { id: rid('info'), icon: 'Leaf', title: { mn: '', en: '' }, description: { mn: '', en: '' } },
      ],
    }));
  const removeCard = (id) => {
    if (!window.confirm('Та устгахдаа итгэлтэй байна уу?')) return;
    setData((d) => ({ ...d, infoCards: d.infoCards.filter((c) => c.id !== id) }));
  };

  // ---- gallery ----
  const updateImg = (id, patch) =>
    setData((d) => ({
      ...d,
      gallery: d.gallery.map((g) => (g.id === id ? { ...g, ...patch } : g)),
    }));
  const addImg = () =>
    setData((d) => ({
      ...d,
      gallery: [...d.gallery, { id: rid('g'), path: '', caption: { mn: '', en: '' } }],
    }));
  const removeImg = (id) => {
    if (!window.confirm('Та устгахдаа итгэлтэй байна уу?')) return;
    setData((d) => ({ ...d, gallery: d.gallery.filter((g) => g.id !== id) }));
  };

  const handleSave = () => {
    try {
      saveSection('nature', data);
      showSuccess();
    } catch (e) {
      showError();
    }
  };

  return (
    <>
      <Toast toast={toast} />
      <EditorShell
        title="Байгаль & Gallery"
        description="Байгалийн мэдлэгийн card болон зургийн цомог (нэг section)"
        onSave={handleSave}
      >
        {/* Info cards */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">Мэдлэгийн card-ууд</h3>
          <button onClick={addCard} className="inline-flex items-center gap-1 text-sm text-nature-700 hover:text-nature-900 font-medium">
            <Plus className="w-4 h-4" /> Нэмэх
          </button>
        </div>
        {data.infoCards.map((card) => (
          <div key={card.id} className="border border-gray-200 rounded-xl p-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <IconPicker value={card.icon} onChange={(icon) => updateCard(card.id, { icon })} />
              <button onClick={() => removeCard(card.id)} className="text-red-500 hover:text-red-700 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <AutoTranslateField label="Гарчиг" value={card.title} onChange={(v) => updateCard(card.id, { title: v })} />
            <AutoTranslateField label="Тайлбар" value={card.description} onChange={(v) => updateCard(card.id, { description: v })} textarea rows={2} />
          </div>
        ))}

        {/* Gallery */}
        <div className="flex items-center justify-between mb-3 mt-8">
          <h3 className="font-bold text-gray-800">Зургийн цомог</h3>
          <button onClick={addImg} className="inline-flex items-center gap-1 text-sm text-nature-700 hover:text-nature-900 font-medium">
            <Plus className="w-4 h-4" /> Зураг нэмэх
          </button>
        </div>
        {data.gallery.map((img) => (
          <div key={img.id} className="border border-gray-200 rounded-xl p-4 mb-4">
            <div className="flex justify-between items-start">
              <ImageUploader label="Зураг" value={img.path} onChange={(path) => updateImg(img.id, { path })} folder="gallery" />
              <button onClick={() => removeImg(img.id)} className="text-red-500 hover:text-red-700 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <AutoTranslateField label="Тайлбар (caption)" value={img.caption} onChange={(v) => updateImg(img.id, { caption: v })} />
          </div>
        ))}
      </EditorShell>
    </>
  );
}
