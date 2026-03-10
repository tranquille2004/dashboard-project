import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import { LanguageProvider } from "./contexts/LanguageContext";
import { BasePathProvider } from "./contexts/BasePathContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Reserve from "./pages/Reserve";
import Takeaway from "./pages/Takeaway";
import Gallery from "./pages/Gallery";
import Info from "./pages/Info";
import Confirmation from "./pages/Confirmation";
import GroupMenus from "./pages/GroupMenus";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import SEO from '@/components/SEO';
import URLSync from '@/components/URLSync';

const API = process.env.REACT_APP_BACKEND_URL + "/api";

// Track page visits - sends path to backend
const trackPageVisit = async (path) => {
  try {
    await fetch(`${API}/public/track-visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        site_slug: 'mercato',
        path: path
      })
    });
  } catch (error) {
    // Silent fail
  }
};

// Hook to track every page view
const usePageTracking = () => {
  const location = useLocation();
  
  useEffect(() => {
    trackPageVisit(location.pathname);
  }, [location.pathname]);
};

// SEO Configuration for Ristorante Mercato
const SEO_CONFIG = {
  siteName: "Ristorante Pizzeria Mercato",
  defaultImage: 'https://ristorantemercato.be/images/mercato/hero.jpg',
  baseUrl: 'https://ristorantemercato.be',
  title: "Ristorante Mercato | Italiaans Restaurant België",
  description: "Ristorante Pizzeria Mercato - Authentieke Italiaanse keuken met verse ingrediënten. Pizza uit houtoven, huisgemaakte pasta, Italiaanse wijnen. Reserveer nu!",
  keywords: "Italiaans restaurant, Mercato, pizza, pasta, België, Italiaanse keuken, houtoven pizza, reserveren"
};

// Inner component that tracks page visits
function MercatoAppInner({ siteConfig }) {
  usePageTracking();
  
  return (
    <>
      <ScrollToTop />
      <URLSync />
      <Navigation />
      <AnnouncementBanner
        message={siteConfig?.special_announcement}
        type={siteConfig?.special_announcement_type || 'info'}
        active={siteConfig?.special_announcement_active}
      />
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="menu" element={<Menu />} />
        <Route path="reserve" element={<Reserve />} />
        <Route path="takeaway" element={<Takeaway />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="info" element={<Info />} />
        <Route path="group-menus" element={<GroupMenus />} />
        <Route path="confirmation" element={<Confirmation />} />
        <Route path="confirmation.html" element={<Confirmation />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

function MercatoApp() {
  const [siteConfig, setSiteConfig] = useState(null);
  
  // BEKENDE CUSTOM DOMAINS voor Mercato
  const KNOWN_CUSTOM_DOMAINS = [
    'ristorantemercato.be',
    'www.ristorantemercato.be',
    'ristorantemercato.com',
    'www.ristorantemercato.com'
  ];
  const hostname = window.location.hostname.toLowerCase();
  const isCustomDomain = KNOWN_CUSTOM_DOMAINS.includes(hostname);
  const basePath = isCustomDomain ? '' : '/site/mercato';

  useEffect(() => {
    axios.get(`${API}/public/site/mercato`)
      .then(res => setSiteConfig(res.data?.config))
      .catch(() => {});
  }, []);

  return (
    <LanguageProvider>
      <BasePathProvider basePath={basePath}>
        <div className="App bg-black min-h-screen">
          <SEO 
            title={SEO_CONFIG.title}
            description={SEO_CONFIG.description}
            keywords={SEO_CONFIG.keywords}
            image={SEO_CONFIG.defaultImage}
            url={SEO_CONFIG.baseUrl}
            siteName={SEO_CONFIG.siteName}
          />
          <MercatoAppInner siteConfig={siteConfig} />
        </div>
      </BasePathProvider>
    </LanguageProvider>
  );
}

export default MercatoApp;
