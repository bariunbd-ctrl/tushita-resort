import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/authService.js';

export default function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    isAuthenticated().then(setAuth);
  }, []);

  if (auth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-nature-600">
        Уншиж байна...
      </div>
    );
  }

  if (!auth) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}