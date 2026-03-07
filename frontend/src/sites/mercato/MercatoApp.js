import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
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

const API = process.env.REACT_APP_BACKEND_URL + "/api";

function MercatoApp() {
  const [siteConfig, setSiteConfig] = useState(null);
  
  // Detecteer of we op een custom domain zijn (niet op preview/production Emergent URL)
  const isCustomDomain = !window.location.hostname.includes('preview.emergentagent.com') && 
                         !window.location.hostname.includes('.emergent.host') &&
                         !window.location.hostname.includes('localhost');
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
          <ScrollToTop />
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
        </div>
      </BasePathProvider>
    </LanguageProvider>
  );
}

export default MercatoApp;
