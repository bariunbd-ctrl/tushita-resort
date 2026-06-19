import React, { useState, useCallback, useEffect } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

// Simple toast hook used by editors for save feedback.
export function useToast() {
  const [toast, setToast] = useState(null); // { type, message }

  const show = useCallback((type, message) => {
    setToast({ type, message });
  }, []);

  const showSuccess = useCallback(
    (message = 'Амжилттай хадгалагдлаа') => show('success', message),
    [show]
  );
  const showError = useCallback(
    (message = 'Хадгалахад алдаа гарлаа. Дахин оролдоно уу.') => show('error', message),
    [show]
  );

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(id);
  }, [toast]);

  return { toast, showSuccess, showError, setToast };
}

export function Toast({ toast }) {
  if (!toast) return null;
  const isSuccess = toast.type === 'success';
  return (
    <div
      className={`fixed top-5 right-5 z-[100] flex items-center gap-2 px-5 py-3 rounded-xl shadow-card animate-slide-in ${
        isSuccess ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
      }`}
    >
      {isSuccess ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      <span className="text-sm font-medium">{toast.message}</span>
    </div>
  );
}
