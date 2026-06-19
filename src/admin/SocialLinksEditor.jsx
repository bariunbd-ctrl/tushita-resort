import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { getSiteContent, saveSection } from '../services/contentService.js';
import EditorShell from './EditorShell.jsx';
import { useToast, Toast } from './Toast.jsx';

const FIELDS = [
  { key: 'facebook', label: 'Facebook', icon: Facebook },
  { key: 'instagram', label: 'Instagram', icon: Instagram },
  { key: 'youtube', label: 'YouTube', icon: Youtube },
  { key: 'twitter', label: 'Twitter / X', icon: Twitter },
];

export default function SocialLinksEditor() {
  const { toast, showSuccess, showError } = useToast();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(getSiteContent().social || {});
  }, []);

  if (!data) return null;

  const update = (key, value) => setData((d) => ({ ...d, [key]: value }));

  const handleSave = () => {
    try {
      saveSection('social', data);
      showSuccess();
    } catch (e) {
      showError();
    }
  };

  return (
    <>
      <Toast toast={toast} />
      <EditorShell title="Social links" description="Сошиал хаягуудын холбоос (хоосон бол footer-т харагдахгүй)" onSave={handleSave}>
        {FIELDS.map(({ key, label, icon: IconCmp }) => (
          <div key={key} className="mb-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <IconCmp className="w-4 h-4 text-nature-600" /> {label}
            </label>
            <input
              value={data[key] || ''}
              onChange={(e) => update(key, e.target.value)}
              placeholder={`https://${key}.com/...`}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-nature-500 focus:ring-2 focus:ring-nature-200 outline-none transition"
            />
          </div>
        ))}
      </EditorShell>
    </>
  );
}
