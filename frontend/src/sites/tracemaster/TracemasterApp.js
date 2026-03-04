// Tracemaster - GPS Tracker Product Website
// Originele code van GitHub repo tranquille2004/tracemaster
// Aangepast voor multi-tenant integratie

import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Menu, X, MapPin, Battery, Shield, Wifi, Clock, Phone, Mail, ChevronDown, ChevronUp, ExternalLink, Play } from "lucide-react";

const BASE_PATH = '/site/tracemaster';

// Import all components from original App.js
// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// Lightbox Component for image zoom
const Lightbox = ({ image, onClose }) => {
  if (!image) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <button className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors" onClick={onClose}><X size={32} /></button>
      <img src={image} alt="Zoom" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
    </div>
  );
};

// Navigation Component - Updated for multi-tenant
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
    { path: `${BASE_PATH}/`, label: "Home" },
    { path: `${BASE_PATH}/productos`, label: "Rastreador" },
    { path: `${BASE_PATH}/adaptador`, label: "Adaptador" },
    { path: `${BASE_PATH}/faq`, label: "FAQ" },
    { path: `${BASE_PATH}/contacto`, label: "Contáctenos" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to={BASE_PATH} className="flex items-center">
            <img src="https://tracemaster-rastreadores.weebly.com/uploads/1/0/1/5/101515486/logoecuadorpetit.jpg" alt="Tracemaster Logo" className="h-12 w-auto" />
          </Link>
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${location.pathname === link.path ? "bg-red-600 text-white shadow-lg shadow-red-600/30" : "text-gray-300 hover:text-white hover:bg-gray-700"}`}>
                {link.label}
              </Link>
            ))}
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden pb-4 animate-fadeIn">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${location.pathname === link.path ? "bg-red-600 text-white" : "text-gray-300 hover:text-white hover:bg-gray-700"}`}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

// WhatsApp Button Component
const WhatsAppButton = () => (
  <a href="https://wa.me/593989013622" target="_blank" rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300">
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  </a>
);

// Footer Component
const Footer = () => (
  <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img src="https://tracemaster-rastreadores.weebly.com/uploads/1/0/1/5/101515486/logoecuadorpetit.jpg" alt="Tracemaster Logo" className="h-12 w-auto mb-4" />
          <p className="text-sm text-gray-400">Rastreador GPS sin suscripción con tarjeta SIM incorporada para todo tipo de vehículos.</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to={`${BASE_PATH}/productos`} className="hover:text-red-500 transition-colors">Productos</Link></li>
            <li><Link to={`${BASE_PATH}/adaptador`} className="hover:text-red-500 transition-colors">Adaptador</Link></li>
            <li><Link to={`${BASE_PATH}/faq`} className="hover:text-red-500 transition-colors">FAQ</Link></li>
            <li><Link to={`${BASE_PATH}/contacto`} className="hover:text-red-500 transition-colors">Contáctenos</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Contacto</h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2"><Phone size={16} className="text-red-500" /><a href="https://wa.me/593989013622" className="hover:text-red-500 transition-colors">+593 98 901 3622 (solo whatsapp)</a></p>
            <p className="text-gray-400">Santo Domingo, Ecuador</p>
            <p className="text-gray-400">RUC 1759884990001</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Tracemaster Ecuador. Todos los derechos reservados.</p>
        <p className="mt-1">Producto importado de Países Bajos, calidad holandesa.</p>
      </div>
      <div className="border-t border-gray-700 mt-6 pt-6 text-center">
        <p className="text-gray-500 text-xs mb-3">¿Busca una página web profesional? Contacte al webmaster via WhatsApp.</p>
        <div className="flex items-center justify-center gap-3">
          <img src="https://customer-assets.emergentagent.com/job_trace-jotform/artifacts/48qgparz_fworksbuilders-logo.png" alt="fworksbuilders" className="h-10 w-auto" />
          <span className="text-gray-400 text-xs">Webmaster: fworksbuilders</span>
        </div>
      </div>
    </div>
  </footer>
);

// Home Page
const Home = () => {
  const features = [
    { icon: <Shield className="w-8 h-8" />, title: "Soporte rápido de expertos", desc: "Atención 24/7" },
    { icon: <Clock className="w-8 h-8" />, title: "Listo para usar", desc: "Sin configuración" },
    { icon: <Battery className="w-8 h-8" />, title: "Garantía de 2 años", desc: "Calidad garantizada" },
    { icon: <MapPin className="w-8 h-8" />, title: "Calidad holandesa", desc: "Importado de Países Bajos" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 pt-20">
        <div className="absolute inset-0 bg-[url('https://tracemaster-rastreadores.weebly.com/uploads/1/0/1/5/101515486/background-images/1214590717.webp')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left animate-fadeIn">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Rastreador GPS<span className="text-red-500 block">Sin Suscripción</span></h1>
              <p className="text-xl text-gray-300 mb-8">Con tarjeta SIM incorporada para todo tipo de vehículos. Producto importado de Países Bajos, calidad holandesa.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to={`${BASE_PATH}/productos`} className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-red-600/30">Ver Productos</Link>
                <Link to={`${BASE_PATH}/contacto`} className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">Contáctenos</Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img src="https://customer-assets.emergentagent.com/job_trace-jotform/artifacts/bqt0d2jg_gps.JPG" alt="Tracemaster GPS Tracker" className="relative max-w-md w-full drop-shadow-2xl rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-8" style={{ background: 'linear-gradient(to right, #00AEEF, #0090C9)' }}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide">TRACEMASTER - UNA SENSACIÓN DE SEGURIDAD CON UN RASTREADOR DE TRACEMASTER</h2>
        </div>
      </section>
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">Los rastreadores GPS/sistemas de seguimiento de vehículos de Tracemaster funcionan en todo el mundo con bajos costos operativos.</p>
          <p className="text-lg md:text-xl text-white font-semibold leading-relaxed mt-4">Sin suscripción y, sin embargo, con los beneficios de un sistema de seguimiento de alta calidad.</p>
        </div>
      </section>
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 hover:scale-105">
                <div className="text-red-500 flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¡Obtenga su Tracemaster 100 PRO hoy!</h2>
          <p className="text-xl text-red-100 mb-8">Solo <span className="font-bold text-white text-3xl">$199</span> IVA incluido</p>
          <Link to={`${BASE_PATH}/contacto`} className="inline-block bg-white text-red-600 hover:bg-gray-100 px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl">Hacer Pedido</Link>
        </div>
      </section>
    </div>
  );
};

// Productos Page (simplified)
const Productos = () => {
  const specs = ["¡Sistema único, sin costes adicionales!", "La SIM incorporada funciona en la mayor parte del mundo", "Precisión de ubicación de hasta 5 metros", "Adecuado para autos, camiones, caravanas, barcos", "Duración de la batería hasta 100 días", "Potente imán", "A través de la red 4G/LTE", "Aplicación gratuita", "2 años de garantía"];
  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <section className="py-16 bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">TRACEMASTER 100 PRO</h1>
            <p className="text-xl text-gray-300">Sistema de seguimiento GPS sin suscripción</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div><img src="https://customer-assets.emergentagent.com/job_trace-jotform/artifacts/j4ekq9pu_toepassingen-gps-trackers-auto-vk-300x300-1%20%281%29.JPG" alt="Tracemaster 100 PRO" className="w-full rounded-2xl shadow-2xl" /></div>
            <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">En Stock</span>
                <div className="text-right"><span className="text-gray-400 line-through text-lg">$259</span><p className="text-4xl font-bold text-red-500">$199</p></div>
              </div>
              <ul className="space-y-3 mb-8">{specs.map((spec, i) => (<li key={i} className="flex items-start gap-3 text-gray-300"><span className="text-red-500 mt-1">✓</span><span>{spec}</span></li>))}</ul>
              <Link to={`${BASE_PATH}/contacto`} className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-4 rounded-xl font-semibold text-lg transition-all">Hacer Pedido</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Adaptador Page
const Adaptador = () => (
  <div className="min-h-screen bg-gray-900 pt-20">
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div><img src="https://tracemaster-rastreadores.weebly.com/uploads/1/0/1/5/101515486/chargeur1_orig.jpg" alt="Adaptador" className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl" /></div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Adaptador Incorporado para Vehículo</h1>
            <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">En Stock</span>
                <p className="text-4xl font-bold text-red-500">$25</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-gray-300"><span className="text-red-500">✓</span>Adaptador DC 12V-24V → 5V 3A</li>
                <li className="flex items-start gap-3 text-gray-300"><span className="text-red-500">✓</span>Adecuado para Tracemaster 100 PRO</li>
                <li className="flex items-start gap-3 text-gray-300"><span className="text-red-500">✓</span>¡Ya no es necesario cargar manualmente!</li>
              </ul>
              <Link to={`${BASE_PATH}/contacto`} className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-4 rounded-xl font-semibold">Hacer Pedido</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// FAQ Page
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    { question: "¿Cómo funciona la instalación?", answer: "Puedes realizar la instalación tú mismo fácilmente: descarga la app Tracksolid Pro, crea una cuenta, ingresa el número IMEI e inserta la tarjeta SIM." },
    { question: "¿Puedo seguir varios rastreadores?", answer: "Sí, es posible vincular varios rastreadores GPS a una sola cuenta de usuario." },
    { question: "¿Cómo optimizar la batería?", answer: "La duración depende del uso. En modo espera puede durar hasta 100 días. Puedes ajustar el intervalo de seguimiento para extender la batería." },
  ];
  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12"><h1 className="text-4xl font-bold text-white mb-4">Preguntas Frecuentes</h1></div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-xl overflow-hidden">
                <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-750 transition-colors">
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  {openIndex === index ? <ChevronUp className="text-red-500" size={20} /> : <ChevronDown className="text-gray-400" size={20} />}
                </button>
                {openIndex === index && <div className="px-6 pb-5"><p className="text-gray-400 leading-relaxed">{faq.answer}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Contacto Page
const Contacto = () => (
  <div className="min-h-screen bg-gray-900 pt-20">
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12"><h1 className="text-4xl font-bold text-white mb-4">Contáctenos</h1></div>
        <div className="bg-gray-800 rounded-2xl p-8 text-center">
          <a href="https://wa.me/593989013622" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Contactar por WhatsApp
          </a>
          <p className="text-gray-400 mt-4">+593 98 901 3622 (solo whatsapp)</p>
          <p className="text-gray-400">Santo Domingo, Ecuador</p>
        </div>
      </div>
    </section>
  </div>
);

// Main App
function TracemasterApp() {
  return (
    <div className="tracemaster-app bg-black min-h-screen">
      <ScrollToTop />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/adaptador" element={<Adaptador />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

export default TracemasterApp;
