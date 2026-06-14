import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import { LanguageProvider } from "./contexts/LanguageContext";
import { BasePathProvider } from "./contexts/BasePathContext";
import { SiteConfigProvider } from "./contexts/SiteConfigContext";
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
import Reviews from "./pages/Reviews";
import Confirmation from "./pages/Confirmation";
import Confirmation2 from "./pages/Confirmation2";
import Confirmation3 from "./pages/Confirmation3";
import BambinoBox from "./pages/BambinoBox";
import BambinoBoxSubscribe from "./pages/BambinoBoxSubscribe";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import SEO from '@/components/SEO';
import URLSync from '@/components/URLSync';

const API = process.env.REACT_APP_BACKEND_URL + "/api";

const trackPageVisit = async (path) => {
  try {
    await fetch(`${API}/public/track-visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ site_slug: 'ilsiciliano', path })
    });
  } catch (error) {
    // Silent fail
  }
};

const usePageTracking = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageVisit(location.pathname);
  }, [location.pathname]);
};

const SEO_CONFIG = {
  siteName: "Il Siciliano - Trattoria Pizzería",
  defaultImage: '',
  baseUrl: 'https://ilsiciliano.fworksbuilders.com',
  title: "Il Siciliano | Trattoria Pizzería — Santo Domingo, Ecuador",
  description: "Il Siciliano — auténtica cocina italiana en Santo Domingo de los Tsáchilas. Pasta fresca, pizza italiana, especialidades de Italia. Reserva tu mesa.",
  keywords: "restaurante italiano Santo Domingo, pizzería Ecuador, cocina italiana, Il Siciliano, trattoria, restaurante Santo Domingo Tsáchilas"
};

function IlSicilianoAppInner({ siteConfig }) {
  usePageTracking();
  return (
    <>
      <ScrollToTop />
      <URLSync />
      <Navigation />
      {/* Bright horizontal Italian tricolor strip under navigation */}
      <div className="ilsiciliano-tricolor-bar fixed top-20 left-0 right-0 z-40" aria-hidden="true">
        <span className="tc-green" />
        <span className="tc-white" />
        <span className="tc-red" />
      </div>
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
        <Route path="reviews" element={<Reviews />} />
        <Route path="resenas" element={<Reviews />} />
        <Route path="info" element={<Info />} />
        <Route path="bambino-box" element={<BambinoBox />} />
        <Route path="bambino" element={<BambinoBox />} />
        <Route path="bambino-box-subscribe" element={<BambinoBoxSubscribe />} />
        <Route path="confirmation" element={<Confirmation />} />
        <Route path="confirmation.html" element={<Confirmation />} />
        <Route path="confirmation2" element={<Confirmation2 />} />
        <Route path="confirmation3" element={<Confirmation3 />} />
        <Route path="bambino-box-confirmation" element={<Confirmation3 />} />
        <Route path="bambino-box-grazie" element={<Confirmation3 />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

function IlSicilianoApp() {
  const [siteConfig, setSiteConfig] = useState(null);

  const KNOWN_CUSTOM_DOMAINS = [
    'ilsiciliano.fworksbuilders.com',
    'ilsiciliano.ec',
    'www.ilsiciliano.ec'
  ];
  const hostname = window.location.hostname.toLowerCase();
  const isCustomDomain = KNOWN_CUSTOM_DOMAINS.includes(hostname);
  const basePath = isCustomDomain ? '' : '/site/ilsiciliano';

  useEffect(() => {
    axios.get(`${API}/public/site/ilsiciliano`)
      .then(res => setSiteConfig(res.data?.config))
      .catch(() => {});
  }, []);

  return (
    <LanguageProvider>
      <BasePathProvider basePath={basePath}>
        <SiteConfigProvider value={siteConfig}>
        <div className="App ilsiciliano-root bg-black min-h-screen relative">
          {/* Bright Italian tricolor edge strips (left + right) */}
          <div className="ilsiciliano-edge-strip left" aria-hidden="true">
            <span className="stripe-green" />
            <span className="stripe-white" />
            <span className="stripe-red" />
          </div>
          <div className="ilsiciliano-edge-strip right" aria-hidden="true">
            <span className="stripe-green" />
            <span className="stripe-white" />
            <span className="stripe-red" />
          </div>
          <SEO
            title={SEO_CONFIG.title}
            description={SEO_CONFIG.description}
            keywords={SEO_CONFIG.keywords}
            url={SEO_CONFIG.baseUrl}
            siteName={SEO_CONFIG.siteName}
          />
          <IlSicilianoAppInner siteConfig={siteConfig} />
        </div>
        </SiteConfigProvider>
      </BasePathProvider>
    </LanguageProvider>
  );
}

export default IlSicilianoApp;
