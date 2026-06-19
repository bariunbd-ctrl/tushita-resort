import React from 'react';
import { Save } from 'lucide-react';

export default function EditorShell({ title, description, onSave, saving, children }) {
  return (
    <div>
      {/* Sticky header bar with save button */}
      <div className="sticky top-0 z-20 bg-gray-100/95 backdrop-blur border-b border-gray-200 -mx-4 md:-mx-8 px-4 md:px-8 py-3 mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-extrabold text-gray-800">{title}</h2>
          {description && <p className="text-gray-500 text-sm mt-0.5">{description}</p>}
        </div>
        {onSave && (
          <button
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-nature-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-nature-700 transition-colors disabled:opacity-60 shadow-md"
          >
            <Save className="w-4 h-4" /> Хадгалах
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl p-5 md:p-7 shadow-soft">{children}</div>
    </div>
  );
}
