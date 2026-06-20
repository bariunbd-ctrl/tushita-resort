import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { getSiteContent, saveSection } from '../services/contentService.js';
import EditorShell from './EditorShell.jsx';
import { useToast, Toast } from './Toast.jsx';

const rid = () => `sp_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;

const EMOJIS = ['🏆','🌿','👨‍🏫','📱','⭐','🎨','🧘','🙏','🌄','💚','🎯','✨'];

export default function SocialProofEditor() {
  const { toast, showSuccess, showError } = useToast();
  const [items, setItems] = useState(null);

  useEffect(() => {
    setItems(getSiteContent().socialProof || []);
  }, []);

  if (!items) return null;

  const update = (id, patch) =>
    setItems(list => list.map(i => i.id === id ? { ...i, ...patch } : i));

  const add = () =>
    setItems(list => [...list, { id: rid(), emoji: '⭐', mn: '', en: '' }]);

  const remove = (id) => {
    if (!window.confirm('Устгахдаа итгэлтэй байна уу?')) return;
    setItems(list => list.filter(i => i.id !== id));
  };

  const handleSave = () => {
    try { saveSection('socialProof', items); showSuccess(); }
    catch (e) { showError(); }
  };

  const inputClass = 'w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-nature-500 outline-none transition';

  return (
    <>
      <Toast toast={toast} />
      <EditorShell
        title="Social Proof карточкууд"
        description="Танин мэдэхүйн хэсгийн доод 4 карточкийн мэдээлэл"
        onSave={handleSave}
      >
        <div className="flex justify-end mb-3">
          <button onClick={add}
            className="inline-flex items-center gap-1 text-sm text-nature-700 hover:text-nature-900 font-medium">
            <Plus className="w-4 h-4" /> Карточк нэмэх
          </button>
        </div>

        {items.map((item, idx) => (
          <div key={item.id} className="border border-gray-200 rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-gray-500">#{idx + 1}</span>
              <button onClick={() => remove(item.id)} className="text-red-500 hover:text-red-700">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-500 mb-1">Emoji</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {EMOJIS.map(e => (
                  <button key={e} type="button"
                    onClick={() => update(item.id, { emoji: e })}
                    className={`text-2xl p-1 rounded-lg transition ${item.emoji === e ? 'bg-nature-100 ring-2 ring-nature-400' : 'hover:bg-gray-100'}`}>
                    {e}
                  </button>
                ))}
              </div>
              <input value={item.emoji} onChange={e => update(item.id, { emoji: e.target.value })}
                className={inputClass} placeholder="Emoji оруулах" />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Монгол (MN)</label>
                <input value={item.mn} onChange={e => update(item.id, { mn: e.target.value })}
                  className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">English (EN)</label>
                <input value={item.en} onChange={e => update(item.id, { en: e.target.value })}
                  className={inputClass} />
              </div>
            </div>
          </div>
        ))}
      </EditorShell>
    </>
  );
}