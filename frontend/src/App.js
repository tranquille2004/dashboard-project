import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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

// Check of we op /admin of /restaurant-login pad zijn (voor custom domain redirect naar centrale login)
const isAdminPath = window.location.pathname === '/admin' || window.location.pathname === '/admin/';
const isRestaurantLoginPath = window.location.pathname === '/restaurant-login' || window.location.pathname === '/restaurant-login/';

// Router voor admin/preview toegang
function AdminRouter() {
  const location = useLocation();
  
  if (location.hash?.includes('session_id=')) {
    return <AuthCallback />;
  }
  
  // BELANGRIJK: Als het pad begint met /site/, toon de website met ALLE subroutes
  if (location.pathname.startsWith('/site/')) {
    return (
      <Routes>
        <Route path="/site/:slug/*" element={<SiteRenderer />} />
      </Routes>
    );
  }
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/sites/:siteId" element={<SiteEditor />} />
      <Route path="/restaurant-login" element={<SiteAdminLogin />} />
      <Route path="/mijn-site" element={<SiteAdminDashboard />} />
      <Route path="/site/:slug/*" element={<SiteRenderer />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}

function App() {
  // ALS OP CUSTOM DOMAIN EN /admin OF /restaurant-login PAD: redirect naar centrale login
  if (CUSTOM_DOMAIN_SLUG && (isAdminPath || isRestaurantLoginPath)) {
    // Redirect naar centrale login pagina met site info
    window.location.href = `https://fworks-admin.preview.emergentagent.com/restaurant-login?site=${CUSTOM_DOMAIN_SLUG}`;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Doorsturen naar login pagina...</p>
        </div>
      </div>
    );
  }

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
