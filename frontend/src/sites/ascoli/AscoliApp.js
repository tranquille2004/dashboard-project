import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { LanguageProvider } from './context/LanguageContext';
import { BasePathProvider } from './context/BasePathContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import GroupMenu from './pages/GroupMenu';
import Gallery from './pages/Gallery';
import Info from './pages/Info';
import Reservations from './pages/Reservations';
import Confirmation from './pages/Confirmation';
import AnnouncementBanner from '@/components/AnnouncementBanner';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

function AscoliApp() {
  const [siteConfig, setSiteConfig] = useState(null);

  useEffect(() => {
    axios.get(`${API}/public/site/ascoli`)
      .then(res => setSiteConfig(res.data?.config))
      .catch(() => {});
  }, []);

  return (
    <LanguageProvider>
      <BasePathProvider basePath="/site/ascoli">
        <div className="App">
          <>
            <ScrollToTop />
            <Navbar />
            <AnnouncementBanner
              message={siteConfig?.special_announcement}
              type={siteConfig?.special_announcement_type || 'info'}
              active={siteConfig?.special_announcement_active}
            />
            <main className="pt-20">
              <Routes>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="menu" element={<Menu />} />
                <Route path="group-menu" element={<GroupMenu />} />
                <Route path="reservations" element={<Reservations />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="info" element={<Info />} />
                <Route path="confirmation" element={<Confirmation />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
          </>
        </div>
      </BasePathProvider>
    </LanguageProvider>
  );
}

export default AscoliApp;