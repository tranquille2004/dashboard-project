import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from './context/LanguageContext';
import { BasePathProvider } from './context/BasePathContext';
import AnnouncementBanner from '@/components/AnnouncementBanner';

// Pages
import Home from './pages/Home';
import Photos from './pages/Photos';
import Objectif from './pages/Objectif';
import Varietes from './pages/Varietes';
import Qualite from './pages/Qualite';
import Tracabilite from './pages/Tracabilite';
import Contact from './pages/Contact';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

function TheobeansApp() {
  const [siteConfig, setSiteConfig] = useState(null);

  useEffect(() => {
    axios.get(`${API}/public/site/theobeans`)
      .then(res => setSiteConfig(res.data?.config))
      .catch(() => {});
  }, []);

  return (
    <LanguageProvider>
      <BasePathProvider basePath="/site/theobeans">
        <div className="App theobeans-site">
          <ScrollToTop />
          <Navbar />
          <AnnouncementBanner
            message={siteConfig?.special_announcement}
            type={siteConfig?.special_announcement_type || 'info'}
            active={siteConfig?.special_announcement_active}
          />
          <Routes>
            <Route index element={<Home />} />
            <Route path="photos" element={<Photos />} />
            <Route path="objectif" element={<Objectif />} />
            <Route path="varietes" element={<Varietes />} />
            <Route path="qualite" element={<Qualite />} />
            <Route path="tracabilite" element={<Tracabilite />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </BasePathProvider>
    </LanguageProvider>
  );
}

export default TheobeansApp;
