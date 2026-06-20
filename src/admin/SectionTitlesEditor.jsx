import React, { useState, useEffect } from 'react';
import { getSiteContent, saveSection } from '../services/contentService.js';
import AutoTranslateField from './AutoTranslateField.jsx';
import EditorShell from './EditorShell.jsx';
import { useToast, Toast } from './Toast.jsx';

const FIELDS = [
  { key: 'aboutTitle', label: 'Бидний тухай — гарчиг' },
  { key: 'servicesTitle', label: 'Үйлчилгээ — гарчиг' },
  { key: 'programsTitle', label: 'Хөтөлбөр — гарчиг' },
  { key: 'roomsTitle', label: 'Байр — гарчиг' },
  { key: 'pricesTitle', label: 'Үнэ — гарчиг' },
  { key: 'natureTitle', label: 'Байгаль — гарчиг' },
  { key: 'reviewsTitle', label: 'Сэтгэгдэл — гарчиг' },
  { key: 'locationTitle', label: 'Байршил — гарчиг' },
  { key: 'contactTitle', label: 'Холбоо барих — гарчиг' },
  { key: 'whyUsTitle', label: 'Танин мэдэхүй — гарчиг' },
  { key: 'footerCta', label: 'Footer CTA гарчиг' },
  { key: 'footerCtaSub', label: 'Footer CTA тайлбар' },
];

export default function SectionTitlesEditor() {
  const { toast, showSuccess, showError } = useToast();
  const [data, setData] = useState(null);

  useEffect(() => {
    const content = getSiteContent();
    setData(content.sectionTitles || {});
  }, []);

  if (!data) return null;

  const update = (key, value) => setData(d => ({ ...d, [key]: value }));

  const handleSave = () => {
    try { saveSection('sectionTitles', data); showSuccess(); }
    catch (e) { showError(); }
  };

  return (
    <>
      <Toast toast={toast} />
      <EditorShell
        title="Section гарчгууд"
        description="Вэб сайтын бүх хэсгийн гарчиг, дэд гарчгуудыг өөрчлөх"
        onSave={handleSave}
      >
        {FIELDS.map(field => (
          <AutoTranslateField
            key={field.key}
            label={field.label}
            value={data[field.key] || { mn: '', en: '' }}
            onChange={v => update(field.key, v)}
          />
        ))}
      </EditorShell>
    </>
  );
}