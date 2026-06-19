import React from 'react';

// Generic labeled input / textarea for the admin dashboard.
export default function FormField({
  label,
  hint,
  type = 'text',
  value,
  onChange,
  textarea = false,
  rows = 3,
  placeholder = '',
  min,
}) {
  const base =
    'w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-nature-500 focus:ring-2 focus:ring-nature-200 outline-none transition';

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      )}
      {hint && <p className="text-xs text-gray-500 mb-1">{hint}</p>}
      {textarea ? (
        <textarea
          rows={rows}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={base}
        />
      ) : (
        <input
          type={type}
          min={min}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={base}
        />
      )}
    </div>
  );
}
