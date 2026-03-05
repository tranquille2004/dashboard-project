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

// Domain to site mapping - BELANGRIJKSTE CODE
const DOMAIN_MAPPING = {
  'lacantinaitaliana.net': 'cantina',
  'www.lacantinaitaliana.net': 'cantina',
  'labottegaherent.com': 'bottega',
  'www.labottegaherent.com': 'bottega',
  'ascolizaventem.com': 'ascoli',
  'www.ascolizaventem.com': 'ascoli',
  'ristorantemercato.be': 'mercato',
  'www.ristorantemercato.be': 'mercato',
  'tracemaster-rastreadores.com': 'tracemaster',
  'www.tracemaster-rastreadores.com': 'tracemaster',
  'theobeans-export.com': 'theobeans',
  'www.theobeans-export.com': 'theobeans'
};

// Detecteer custom domain DIRECT bij laden
const CUSTOM_DOMAIN_SLUG = DOMAIN_MAPPING[window.location.hostname] || null;

// Router voor admin/preview toegang
function AdminRouter() {
  const location = useLocation();
  
  if (location.hash?.includes('session_id=')) {
    return <AuthCallback />;
  }
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/sites/:siteId" element={<SiteEditor />} />
      <Route path="/restaurant-login" element={<SiteAdminLogin />} />
      <Route path="/mijn-site" element={<SiteAdminDashboard />} />
      <Route path="/site/:slug/*" element={<SiteRenderer />} />
      <Route path="*" element={<SiteRenderer />} />
    </Routes>
  );
}

function App() {
  // ALS OP CUSTOM DOMAIN: toon ALLEEN de website, geen routing
  if (CUSTOM_DOMAIN_SLUG) {
    return (
      <BrowserRouter>
        <SiteRenderer forcedSlug={CUSTOM_DOMAIN_SLUG} />
      </BrowserRouter>
    );
  }
  
  // ANDERS: toon volledige app met admin dashboard
  return (
    <BrowserRouter>
      <AuthProvider>
        <SiteProvider>
          <SiteAdminProvider>
            <AdminRouter />
          </SiteAdminProvider>
        </SiteProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
