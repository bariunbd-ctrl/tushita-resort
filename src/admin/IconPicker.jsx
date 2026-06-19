import React from 'react';
import Icon, { ICON_OPTIONS } from '../components/Icon.jsx';

export default function IconPicker({ value, onChange }) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-medium text-gray-500 mb-1">Icon</label>
      <div className="flex flex-wrap gap-1.5">
        {ICON_OPTIONS.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => onChange(name)}
            title={name}
            className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-colors ${
              value === name
                ? 'bg-nature-600 text-white border-nature-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-nature-400'
            }`}
          >
            <Icon name={name} className="w-5 h-5" />
          </button>
        ))}
      </div>
    </div>
  );
}
