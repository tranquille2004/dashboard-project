import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { SiteProvider } from '@/contexts/SiteContext';
import { SiteAdminProvider } from '@/contexts/SiteAdminContext';
import LandingPage from '@/components/LandingPage';
import AuthCallback from '@/components/AuthCallback';
import AdminDashboard from '@/components/admin/AdminDashboard';
import SiteEditor from '@/components/admin/SiteEditor';
import AlertsPage from '@/components/admin/AlertsPage';
import ImageMigration from '@/components/admin/ImageMigration';
import SiteRenderer from '@/components/sites/SiteRenderer';
import SiteAdminLogin from '@/components/site-admin/SiteAdminLogin';
import SiteAdminDashboard from '@/components/site-admin/SiteAdminDashboard';
import FWorksApp from '@/sites/fworks/FWorksApp';
import SmeraldaApp from '@/sites/smeralda/SmeraldaApp';
import AlbertoPantojaApp from '@/sites/albertopantoja/AlbertoPantojaApp';
import HotelDelPacificoApp from '@/sites/hoteldelpacifico/HotelDelPacificoApp';
import RccbApp from '@/sites/rccb/RccbApp';
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
  'www.theobeans-export.com': 'theobeans',
  'fworksbuilders.com': 'fworks',
  'www.fworksbuilders.com': 'fworks',
  'smeraldavacanze.it': 'smeralda',
  'www.smeraldavacanze.it': 'smeralda',
  'albertopantoja.com': 'albertopantoja',
  'www.albertopantoja.com': 'albertopantoja',
  'albertopantoja.ec': 'albertopantoja',
  'www.albertopantoja.ec': 'albertopantoja',
  'hoteldelpacifico.net': 'hoteldelpacifico',
  'www.hoteldelpacifico.net': 'hoteldelpacifico',
  'rccb.fworksbuilders.com': 'rccb',
  'rccbgroup.be': 'rccb',
  'www.rccbgroup.be': 'rccb'
};

// Detecteer custom domain DIRECT bij laden
const CUSTOM_DOMAIN_SLUG = DOMAIN_MAPPING[window.location.hostname] || null;

// Router voor admin/preview toegang
function AdminRouter() {
  const location = useLocation();
  
  if (location.hash?.includes('session_id=')) {
    return <AuthCallback />;
  }
  
  // BELANGRIJK: Als het pad begint met /site/, toon de website met ALLE subroutes
  if (location.pathname.startsWith('/site/')) {
    // Special handling for /site/fworks
    if (location.pathname.startsWith('/site/fworks')) {
      return <FWorksApp />;
    }
    // Special handling for /site/smeralda - needs Routes for confirmation page
    if (location.pathname.startsWith('/site/smeralda')) {
      return (
        <Routes>
          <Route path="/site/smeralda/*" element={<SmeraldaApp />} />
        </Routes>
      );
    }
    // Special handling for /site/albertopantoja
    if (location.pathname.startsWith('/site/albertopantoja')) {
      return <AlbertoPantojaApp />;
    }
    // Special handling for /site/hoteldelpacifico
    if (location.pathname.startsWith('/site/hoteldelpacifico')) {
      return (
        <Routes>
          <Route path="/site/hoteldelpacifico/*" element={<HotelDelPacificoApp />} />
        </Routes>
      );
    }
    // Special handling for /site/rccb
    if (location.pathname.startsWith('/site/rccb')) {
      return (
        <Routes>
          <Route path="/site/rccb/*" element={<RccbApp />} />
        </Routes>
      );
    }
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
      <Route path="/admin/alerts" element={<AlertsPage />} />
      <Route path="/admin/migrate" element={<ImageMigration />} />
      <Route path="/admin/sites/:siteId" element={<SiteEditor />} />
      <Route path="/restaurant-login" element={<SiteAdminLogin />} />
      <Route path="/mijn-site" element={<SiteAdminDashboard />} />
      <Route path="/site/:slug/*" element={<SiteRenderer />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}

// Custom Domain Router - voor restaurant sites met /admin pad
function CustomDomainRouter({ slug }) {
  const location = useLocation();
  
  // FWorksBuilders.com - Promotie website
  if (slug === 'fworks') {
    // Alle /admin/* routes
    if (location.pathname.startsWith('/admin')) {
      return (
        <AuthProvider>
          <SiteProvider>
            <Routes>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/alerts" element={<AlertsPage />} />
              <Route path="/admin/migrate" element={<ImageMigration />} />
              <Route path="/admin/sites/:siteId" element={<SiteEditor />} />
            </Routes>
          </SiteProvider>
        </AuthProvider>
      );
    }
    // Contact pagina
    if (location.pathname === '/contact' || location.pathname === '/contact/') {
      return <FWorksApp />;
    }
    // Alle andere paden -> toon FWorks promotie website
    return <FWorksApp />;
  }
  
  // Smeralda Vacanze - Vakantie website
  if (slug === 'smeralda') {
    // /admin gaat naar klant admin login
    if (location.pathname === '/admin' || location.pathname === '/admin/') {
      return (
        <SiteAdminProvider>
          <Routes>
            <Route path="/admin" element={<SiteAdminLogin preSelectedSite={slug} />} />
          </Routes>
        </SiteAdminProvider>
      );
    }
    if (location.pathname === '/mijn-site' || location.pathname === '/mijn-site/') {
      return (
        <SiteAdminProvider>
          <Routes>
            <Route path="/mijn-site" element={<SiteAdminDashboard />} />
          </Routes>
        </SiteAdminProvider>
      );
    }
    // Alle andere paden -> toon Smeralda website met routes
    return (
      <Routes>
        <Route path="/*" element={<SmeraldaApp />} />
      </Routes>
    );
  }
  
  // Alberto Pantoja - Politieke website
  if (slug === 'albertopantoja') {
    // Geen admin nodig voor deze site, gewoon de website tonen
    return <AlbertoPantojaApp />;
  }
  
  // Hotel del Pacífico - Hotel website
  if (slug === 'hoteldelpacifico') {
    // /admin gaat naar klant admin login
    if (location.pathname === '/admin' || location.pathname === '/admin/') {
      return (
        <SiteAdminProvider>
          <Routes>
            <Route path="/admin" element={<SiteAdminLogin preSelectedSite={slug} />} />
          </Routes>
        </SiteAdminProvider>
      );
    }
    if (location.pathname === '/mijn-site' || location.pathname === '/mijn-site/') {
      return (
        <SiteAdminProvider>
          <Routes>
            <Route path="/mijn-site" element={<SiteAdminDashboard />} />
          </Routes>
        </SiteAdminProvider>
      );
    }
    return (
      <Routes>
        <Route path="/*" element={<HotelDelPacificoApp />} />
      </Routes>
    );
  }
  
  // RCCB - Retail Cleaning Care Belgium
  if (slug === 'rccb') {
    // /admin goes to client admin login
    if (location.pathname === '/admin' || location.pathname === '/admin/') {
      return (
        <SiteAdminProvider>
          <Routes>
            <Route path="/admin" element={<SiteAdminLogin preSelectedSite={slug} />} />
          </Routes>
        </SiteAdminProvider>
      );
    }
    if (location.pathname === '/mijn-site' || location.pathname === '/mijn-site/') {
      return (
        <SiteAdminProvider>
          <Routes>
            <Route path="/mijn-site" element={<SiteAdminDashboard />} />
          </Routes>
        </SiteAdminProvider>
      );
    }
    return (
      <Routes>
        <Route path="/*" element={<RccbApp />} />
      </Routes>
    );
  }
  
  const isAdmin = location.pathname === '/admin' || location.pathname === '/admin/';
  const isRestaurantLogin = location.pathname === '/restaurant-login' || location.pathname === '/restaurant-login/';
  const isMijnSite = location.pathname === '/mijn-site' || location.pathname === '/mijn-site/';
  
  // /admin of /restaurant-login of /mijn-site -> toon restaurant admin pagina's
  if (isAdmin || isRestaurantLogin || isMijnSite) {
    return (
      <SiteAdminProvider>
        <Routes>
          <Route path="/admin" element={<SiteAdminLogin preSelectedSite={slug} />} />
          <Route path="/restaurant-login" element={<SiteAdminLogin preSelectedSite={slug} />} />
          <Route path="/mijn-site" element={<SiteAdminDashboard />} />
        </Routes>
      </SiteAdminProvider>
    );
  }
  
  // Alle andere paden -> toon de website
  return <SiteRenderer forcedSlug={slug} />;
}

function App() {
  // ALS OP CUSTOM DOMAIN: toon website met eigen admin routes
  if (CUSTOM_DOMAIN_SLUG) {
    return (
      <BrowserRouter>
        <CustomDomainRouter slug={CUSTOM_DOMAIN_SLUG} />
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
