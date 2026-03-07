import React from 'react';
import './App.css';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from './components/ui/toaster';
import { LanguageProvider } from './context/LanguageContext';
import { BasePathProvider } from './context/BasePathContext';

// Pages - EXACT zoals origineel
import Home from './pages/Home';
import Photos from './pages/Photos';
import Objectif from './pages/Objectif';
import Varietes from './pages/Varietes';
import Qualite from './pages/Qualite';
import Tracabilite from './pages/Tracabilite';
import Contact from './pages/Contact';

// Detecteer of we op custom domain of preview/production Emergent zijn
const isCustomDomain = !window.location.hostname.includes('emergentagent.com') && 
                        !window.location.hostname.includes('.emergent.host') &&
                        !window.location.hostname.includes('localhost');
const basePath = isCustomDomain ? '' : '/site/theobeans';

// Dit is de ENIGE wijziging: geen BrowserRouter (die zit al in hoofdapp)
function TheobeansApp() {
  return (
    <LanguageProvider>
      <BasePathProvider basePath={basePath}>
        <div className="App">
          <ScrollToTop />
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
