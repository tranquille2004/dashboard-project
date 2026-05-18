import React, { useEffect } from 'react';
import './App.css';
import './index.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from './components/ui/toaster';
import { LanguageProvider } from './context/LanguageContext';
import { BasePathProvider } from './context/BasePathContext';
import URLSync from '@/components/URLSync';
import { trackVisit } from '@/utils/trackVisit';

// Pages - EXACT zoals origineel
import Home from './pages/Home';
import Photos from './pages/Photos';
import Objectif from './pages/Objectif';
import Varietes from './pages/Varietes';
import Qualite from './pages/Qualite';
import Tracabilite from './pages/Tracabilite';
import Contact from './pages/Contact';

// BEKENDE CUSTOM DOMAINS voor Theobeans
const KNOWN_CUSTOM_DOMAINS = [
  'theobeans-export.com',
  'www.theobeans-export.com',
  'theobeans.com',
  'www.theobeans.com'
];
const hostname = window.location.hostname.toLowerCase();
const isCustomDomain = KNOWN_CUSTOM_DOMAINS.includes(hostname);
const basePath = isCustomDomain ? '' : '/site/theobeans';

// Dit is de ENIGE wijziging: geen BrowserRouter (die zit al in hoofdapp)
function TheobeansApp() {
  // Track page visits (was missing — fixed May 18 2026)
  const location = useLocation();
  useEffect(() => {
    trackVisit('theobeans', location.pathname);
  }, [location.pathname]);

  return (
    <LanguageProvider>
      <BasePathProvider basePath={basePath}>
        <div className="App">
          <ScrollToTop />
          <URLSync />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/objectif" element={<Objectif />} />
            <Route path="/varietes" element={<Varietes />} />
            <Route path="/qualite" element={<Qualite />} />
            <Route path="/tracabilite" element={<Tracabilite />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
          <Toaster />
        </div>
      </BasePathProvider>
    </LanguageProvider>
  );
}

export default TheobeansApp;
