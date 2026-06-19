import React, { useState, useEffect } from 'react';
import { getSiteContent, saveSection } from '../services/contentService.js';
import AutoTranslateField from './AutoTranslateField.jsx';
import ImageUploader from './ImageUploader.jsx';
import EditorShell from './EditorShell.jsx';
import { useToast, Toast } from './Toast.jsx';

export default function GeneralSettings() {
  const { toast, showSuccess, showError } = useToast();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(getSiteContent().general);
  }, []);

  if (!data) return null;

  const update = (key, value) => setData((d) => ({ ...d, [key]: value }));

  const handleSave = () => {
    try {
      saveSection('general', data);
      showSuccess();
    } catch (e) {
      showError();
    }
  };

  return (
    <>
      <Toast toast={toast} />
      <EditorShell
        title="Ерөнхий мэдээлэл"
        description="Сайтын нэр, уриа, лого"
        onSave={handleSave}
      >
        <AutoTranslateField
          label="Амралтын газрын нэр"
          value={data.siteName}
          onChange={(v) => update('siteName', v)}
        />
        <AutoTranslateField
          label="Уриа (Tagline)"
          value={data.tagline}
          onChange={(v) => update('tagline', v)}
        />
        <ImageUploader
          label="Лого"
          value={data.logoPath}
          onChange={(v) => update('logoPath', v)}
          folder="logo"
        />
      </EditorShell>
    </>
  );
}
