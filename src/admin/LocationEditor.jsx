import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import { getSiteContent, saveSection } from '../services/contentService.js';
import AutoTranslateField from './AutoTranslateField.jsx';
import FormField from './FormField.jsx';
import EditorShell from './EditorShell.jsx';
import { useToast, Toast } from './Toast.jsx';

export default function LocationEditor() {
  const { toast, showSuccess, showError } = useToast();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(getSiteContent().location);
  }, []);

  if (!data) return null;

  const update = (key, value) => setData((d) => ({ ...d, [key]: value }));

  const handleSave = () => {
    try {
      saveSection('location', data);
      showSuccess();
    } catch (e) {
      showError();
    }
  };

  return (
    <>
      <Toast toast={toast} />
      <EditorShell title="Байршил" description="Хаяг, газрын зураг, очих зам" onSave={handleSave}>
        <AutoTranslateField label="Хаяг" value={data.address} onChange={(v) => update('address', v)} textarea rows={2} />

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 text-sm text-blue-800">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Google Maps embed URL авах заавар:</p>
              <ol className="list-decimal list-inside space-y-1 text-blue-700">
                <li>Google Maps дээр байршлаа нээнэ</li>
                <li>"Share" → "Embed a map" таб руу орно</li>
                <li>HTML код доторх <code className="bg-blue-100 px-1 rounded">src="..."</code> доторх URL-г хуулна</li>
                <li>Доорх "Газрын зургийн embed URL" талбарт буулгана</li>
              </ol>
            </div>
          </div>
        </div>

        <FormField
          label="Газрын зургийн embed URL (iframe src)"
          value={data.mapEmbedUrl}
          onChange={(v) => update('mapEmbedUrl', v)}
          textarea
          rows={3}
          placeholder="https://www.google.com/maps/embed?pb=..."
        />
        <FormField
          label="Google Maps холбоос (товч дарахад нээгдэнэ)"
          value={data.mapsLink}
          onChange={(v) => update('mapsLink', v)}
          placeholder="https://maps.google.com/?q=..."
        />
        <AutoTranslateField label="Очих замын тайлбар" value={data.directions} onChange={(v) => update('directions', v)} textarea rows={2} />
      </EditorShell>
    </>
  );
}
