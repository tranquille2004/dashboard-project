// Ristorante Mercato - Multi-tenant wrapper
// Originele code van GitHub repo tranquille2004/Mercato

import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Reserve from "./pages/Reserve";
import Takeaway from "./pages/Takeaway";
import Gallery from "./pages/Gallery";
import Info from "./pages/Info";
import Confirmation from "./pages/Confirmation";
import GroupMenus from "./pages/GroupMenus";

function MercatoApp() {
  return (
    <LanguageProvider>
      <div className="mercato-app bg-black min-h-screen">
        <Navigation basePath="/site/mercato" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/takeaway" element={<Takeaway />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/info" element={<Info />} />
          <Route path="/group-menus" element={<GroupMenus />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/confirmation.html" element={<Confirmation />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer basePath="/site/mercato" />
      </div>
    </LanguageProvider>
  );
}

export default MercatoApp;
