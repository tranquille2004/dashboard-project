// Originele Ascoli website code van GitHub repo tranquille2004/Ascoli
// Aangepast voor multi-tenant integratie

import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
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

function AscoliApp() {
  return (
    <LanguageProvider>
      <div className="App ascoli-site">
        <ScrollToTop />
        <Navbar basePath="/site/ascoli" />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/group-menu" element={<GroupMenu />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/info" element={<Info />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer basePath="/site/ascoli" />
      </div>
    </LanguageProvider>
  );
}

export default AscoliApp;
