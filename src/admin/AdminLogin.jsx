import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mountain, Lock } from 'lucide-react';
import { login, isAuthenticated } from '../services/authService.js';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Already logged in -> go to dashboard
  React.useEffect(() => {
    isAuthenticated().then(auth => {
      if (auth) navigate('/admin/dashboard', { replace: true });
    });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(username.trim(), password);
    if (result.success) {
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError(result.error || 'Алдаа гарлаа');
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-nature-500 focus:ring-2 focus:ring-nature-200 outline-none transition';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nature-100 to-nature-300 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-card p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-nature-600 text-white mb-3">
            <Mountain className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-nature-800">Админ нэвтрэх</h1>
          <p className="text-gray-500 text-sm mt-1">Удирдлагын самбарт нэвтэрнэ үү</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Имэйл
          </label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputClass}
            placeholder="таны@email.com"
            autoFocus
          />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Нууц үг</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="mb-4 bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-nature-600 text-white py-3 rounded-xl font-semibold hover:bg-nature-700 transition-colors"
          >
            <LogIn className="w-4 h-4" /> Нэвтрэх
          </button>
        </form>

        <div className="mt-6 flex items-center gap-2 text-xs text-gray-400 justify-center">
          <Lock className="w-3 h-3" />
          Туршилтын нэвтрэлт: admin / admin123
        </div>
      </div>
    </div>
  );
}
