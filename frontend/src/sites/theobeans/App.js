import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "./components/ui/toaster";
import { LanguageProvider } from "./context/LanguageContext";

// Pages
import Home from "./pages/Home";
import Photos from "./pages/Photos";
import Objectif from "./pages/Objectif";
import Varietes from "./pages/Varietes";
import Qualite from "./pages/Qualite";
import Tracabilite from "./pages/Tracabilite";
import Contact from "./pages/Contact";

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <BrowserRouter>
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
          </Routes>
          <Footer />
          <Toaster />
        </BrowserRouter>
      </div>
    </LanguageProvider>
  );
}

export default App;
