import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { BasePathProvider } from "./contexts/BasePathContext";
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
      <BasePathProvider basePath="/site/mercato">
        <div className="App bg-black min-h-screen">
          <Navigation />
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
