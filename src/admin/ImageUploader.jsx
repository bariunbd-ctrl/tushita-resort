import React, { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadImage, getImageUrl } from '../services/fileStorageService.js';

// Uploads an image (base64 to localStorage in dev) and reports back the
// stored path via onChange(path).
export default function ImageUploader({ label, value, onChange, folder = 'general' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const { path } = await uploadImage(file, folder);
      onChange(path);
    } catch (err) {
      setError(err.message || 'Алдаа гарлаа');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  const preview = value ? getImageUrl(value, label || 'Зураг') : null;

  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>}

      <div className="flex items-center gap-4">
        <div className="w-28 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
          {preview ? (
            <img src={preview} alt="" className="w-full h-full object-cover" />
          ) : (
            <Upload className="w-6 h-6 text-gray-400" />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-nature-600 text-white rounded-lg text-sm font-medium hover:bg-nature-700 disabled:opacity-60"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Оруулж байна...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" /> Зураг оруулах
              </>
            )}
          </button>
          {value && (
            <button
              type="button"
              onClick={handleRemove}
              className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
            >
              <X className="w-4 h-4" /> Устгах
            </button>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
