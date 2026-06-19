import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, ExternalLink } from 'lucide-react';
import AdminSidebar from './AdminSidebar.jsx';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setSidebarOpen(true)}
            aria-label="Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-gray-800 hidden sm:block">Удирдлагын самбар</h1>
          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-2 text-sm text-nature-700 hover:text-nature-900 font-medium"
          >
            <ExternalLink className="w-4 h-4" /> Вэб сайт харах
          </Link>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
