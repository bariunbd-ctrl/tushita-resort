import React, { useState, useEffect } from 'react';
import { getSiteContent, saveSection } from '../services/contentService.js';
import AutoTranslateField from './AutoTranslateField.jsx';
import FormField from './FormField.jsx';
import EditorShell from './EditorShell.jsx';
import { useToast, Toast } from './Toast.jsx';

export default function ContactEditor() {
  const { toast, showSuccess, showError } = useToast();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(getSiteContent().contact);
  }, []);

  if (!data) return null;

  const update = (key, value) => setData((d) => ({ ...d, [key]: value }));

  const handleSave = () => {
    try {
      saveSection('contact', data);
      showSuccess();
    } catch (e) {
      showError();
    }
  };

  return (
    <>
      <Toast toast={toast} />
      <EditorShell title="Холбоо барих" description="Утас, имэйл, хаяг" onSave={handleSave}>
        <FormField label="Утас" value={data.phone} onChange={(v) => update('phone', v)} placeholder="+976 ..." />
        <FormField label="Имэйл" type="email" value={data.email} onChange={(v) => update('email', v)} placeholder="info@example.mn" />
        <AutoTranslateField label="Хаяг" value={data.address} onChange={(v) => update('address', v)} textarea rows={2} />
      </EditorShell>
    </>
  );
}
