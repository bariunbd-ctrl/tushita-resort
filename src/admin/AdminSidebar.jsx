import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Settings, Image as ImageIcon, Info, TreePine,
  Wrench, Tag, MapPin, Phone, Share2, Inbox, BarChart3, LogOut, Mountain, Sparkles, X, HelpCircle,
} from 'lucide-react';
import { logout } from '../services/authService.js';

const MENU = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/general', label: 'Ерөнхий мэдээлэл', icon: Settings },
  { path: '/admin/hero', label: 'Hero section', icon: ImageIcon },
  { path: '/admin/about', label: 'Бидний тухай', icon: Info },
  { path: '/admin/nature', label: 'Байгаль & Gallery', icon: TreePine },
  { path: '/admin/services', label: 'Үйлчилгээ', icon: Wrench },
  { path: '/admin/prices', label: 'Үнийн мэдээлэл', icon: Tag },
  { path: '/admin/location', label: 'Байршил', icon: MapPin },
  { path: '/admin/contact', label: 'Холбоо барих', icon: Phone },
  { path: '/admin/whyus', label: 'Танин мэдэхүйн мэдээлэл', icon: Sparkles },
  { path: '/admin/faq', label: 'Түгээмэл асуулт', icon: HelpCircle },
  { path: '/admin/social', label: 'Social links', icon: Share2 },
  { path: '/admin/submissions', label: 'Ирсэн хүсэлтүүд', icon: Inbox },
  { path: '/admin/analytics', label: 'Статистик', icon: BarChart3 },
  ];

export default function AdminSidebar({ open, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-full w-64 bg-nature-800 text-white flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2 font-extrabold">
            <Mountain className="w-6 h-6 text-nature-300" />
            <span>Админ</span>
          </div>
          <button className="lg:hidden text-white/70" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {MENU.map((item) => {
            const IconCmp = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-nature-600 text-white'
                      : 'text-white/75 hover:bg-nature-700 hover:text-white'
                  }`
                }
              >
                <IconCmp className="w-5 h-5 flex-shrink-0" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/75 hover:bg-red-600 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" /> Гарах
          </button>
        </div>
      </aside>
    </>
  );
}
