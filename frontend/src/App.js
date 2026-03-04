import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { SiteProvider } from '@/contexts/SiteContext';
import { SiteAdminProvider } from '@/contexts/SiteAdminContext';
import LandingPage from '@/components/LandingPage';
import AuthCallback from '@/components/AuthCallback';
import AdminDashboard from '@/components/admin/AdminDashboard';
import SiteEditor from '@/components/admin/SiteEditor';
import SiteRenderer from '@/components/sites/SiteRenderer';
import SiteAdminLogin from '@/components/site-admin/SiteAdminLogin';
import SiteAdminDashboard from '@/components/site-admin/SiteAdminDashboard';
import './App.css';

// Router wrapper to handle auth callback detection
function AppRouter() {
  const location = useLocation();
  
  // Check URL fragment for session_id (OAuth callback)
  if (location.hash?.includes('session_id=')) {
    return <AuthCallback />;
  }
  
  return (
    <Routes>
      {/* Admin Routes (jouw dashboard) */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/sites/:siteId" element={<SiteEditor />} />
      
      {/* Site Admin Routes (voor restaurant eigenaren) */}
      <Route path="/restaurant-login" element={<SiteAdminLogin />} />
      <Route path="/mijn-site" element={<SiteAdminDashboard />} />
      
      {/* Site Preview Routes (elke website heeft zijn eigen /beheer login) */}
      <Route path="/site/:slug/*" element={<SiteRenderer />} />
      
      {/* Catch-all for domain-based sites */}
      <Route path="*" element={<SiteRenderer />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SiteProvider>
          <SiteAdminProvider>
            <AppRouter />
          </SiteAdminProvider>
        </SiteProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
