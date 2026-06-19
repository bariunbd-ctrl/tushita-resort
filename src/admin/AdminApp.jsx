import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import AdminLogin from './AdminLogin.jsx';
import AdminLayout from './AdminLayout.jsx';
import DashboardOverview from './DashboardOverview.jsx';
import GeneralSettings from './GeneralSettings.jsx';
import HeroEditor from './HeroEditor.jsx';
import AboutEditor from './AboutEditor.jsx';
import NatureEditor from './NatureEditor.jsx';
import ServicesEditor from './ServicesEditor.jsx';
import PricesEditor from './PricesEditor.jsx';
import LocationEditor from './LocationEditor.jsx';
import ContactEditor from './ContactEditor.jsx';
import SocialLinksEditor from './SocialLinksEditor.jsx';
import Submissions from './Submissions.jsx';
import Analytics from './Analytics.jsx';
import WhyUsEditor from './WhyUsEditor.jsx';
import FaqEditor from './FaqEditor.jsx';

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardOverview />} />
        <Route path="general" element={<GeneralSettings />} />
        <Route path="hero" element={<HeroEditor />} />
        <Route path="about" element={<AboutEditor />} />
        <Route path="nature" element={<NatureEditor />} />
        <Route path="services" element={<ServicesEditor />} />
        <Route path="prices" element={<PricesEditor />} />
        <Route path="location" element={<LocationEditor />} />
        <Route path="contact" element={<ContactEditor />} />
        <Route path="social" element={<SocialLinksEditor />} />
        <Route path="whyus" element={<WhyUsEditor />} />
        <Route path="faq" element={<FaqEditor />} />
        <Route path="submissions" element={<Submissions />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}