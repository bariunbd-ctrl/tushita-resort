import React, { useState, useEffect } from 'react';
import { getSiteContent, saveSection } from '../services/contentService.js';
import AutoTranslateField from './AutoTranslateField.jsx';
import ImageUploader from './ImageUploader.jsx';
import EditorShell from './EditorShell.jsx';
import { useToast, Toast } from './Toast.jsx';

export default function HeroEditor() {
  const { toast, showSuccess, showError } = useToast();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(getSiteContent().hero);
  }, []);

  if (!data) return null;

  const update = (key, value) => setData((d) => ({ ...d, [key]: value }));

  const handleSave = () => {
    try {
      saveSection('hero', data);
      showSuccess();
    } catch (e) {
      showError();
    }
  };

  return (
    <>
      <Toast toast={toast} />
      <EditorShell
        title="Hero section"
        description="Нүүр хуудасны том гарчиг ба арын зураг"
        onSave={handleSave}
      >
        <AutoTranslateField
          label="Гол гарчиг (Headline)"
          value={data.headline}
          onChange={(v) => update('headline', v)}
          textarea
          rows={2}
        />
        <AutoTranslateField
          label="Тайлбар"
          value={data.description}
          onChange={(v) => update('description', v)}
          textarea
          rows={3}
        />
        <ImageUploader
          label="Арын зураг (оруулахгүй бол байгалийн өнгийн gradient харагдана)"
          value={data.backgroundPath}
          onChange={(v) => update('backgroundPath', v)}
          folder="hero"
        />
      </EditorShell>
    </>
  );
}
