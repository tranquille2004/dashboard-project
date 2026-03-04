import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Menu, X, MapPin, Battery, Shield, Wifi, Clock, Phone, Mail, ChevronDown, ChevronUp, ExternalLink, Play } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Lightbox Component for image zoom
const Lightbox = ({ image, onClose }) => {
  if (!image) return null;
  
  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <button 
        className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
        onClick={onClose}
      >
        <X size={32} />
      </button>
      <img 
        src={image} 
        alt="Zoom" 
        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/productos", label: "Rastreador" },
    { path: "/adaptador", label: "Adaptador" },
    { path: "/faq", label: "FAQ" },
    { path: "/contacto", label: "Contáctenos" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl" data-testid="main-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/site/tracemaster/" className="flex items-center" data-testid="logo-link">
            <img
              src="/images/tracemaster/logoecuadorpetit.jpg"
              alt="Tracemaster Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            data-testid="mobile-menu-button"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fadeIn" data-testid="mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? "bg-red-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
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
  <a
    href="https://wa.me/593989013622"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce-slow"
    data-testid="whatsapp-button"
    aria-label="Chat en WhatsApp"
  >
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  </a>
);

// Footer Component
const Footer = () => (
  <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300" data-testid="footer">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img
            src="/images/tracemaster/logoecuadorpetit.jpg"
            alt="Tracemaster Logo"
            className="h-12 w-auto mb-4"
          />
          <p className="text-sm text-gray-400">
            Rastreador GPS sin suscripción con tarjeta SIM incorporada para todo tipo de vehículos.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/site/tracemaster/productos" className="hover:text-red-500 transition-colors">Productos</Link></li>
            <li><Link to="/site/tracemaster/adaptador" className="hover:text-red-500 transition-colors">Adaptador</Link></li>
            <li><Link to="/site/tracemaster/faq" className="hover:text-red-500 transition-colors">FAQ</Link></li>
            <li><Link to="/site/tracemaster/contacto" className="hover:text-red-500 transition-colors">Contáctenos</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Contacto</h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <Phone size={16} className="text-red-500" />
              <a href="https://wa.me/593989013622" className="hover:text-red-500 transition-colors">+593 98 901 3622 (solo whatsapp)</a>
            </p>
            <p className="text-gray-400">Santo Domingo, Ecuador</p>
            <p className="text-gray-400">RUC 1759884990001</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Tracemaster Ecuador. Todos los derechos reservados.</p>
        <p className="mt-1">Producto importado de Países Bajos, calidad holandesa.</p>
      </div>
      {/* Webmaster Info - like ristorantemercato.be */}
      <div className="border-t border-gray-700 mt-6 pt-6 text-center">
        <p className="text-gray-500 text-xs mb-3">¿Busca una página web profesional? Contacte al webmaster via WhatsApp.</p>
        <div className="flex items-center justify-center gap-3">
          <img
            src="https://customer-assets.emergentagent.com/job_trace-jotform/artifacts/48qgparz_fworksbuilders-logo.png"
            alt="fworksbuilders"
            className="h-10 w-auto"
          />
          <div className="text-left">
            <span className="text-gray-400 text-xs">Webmaster: </span>
            <a href="https://wa.me/593989013622" className="text-gray-400 hover:text-red-500 text-xs transition-colors">
              fworksbuilders
            </a>
          </div>
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
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 pt-20">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/tracemaster/1214590717.webp')" }}></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left animate-fadeIn">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Rastreador GPS
                <span className="text-red-500 block">Sin Suscripción</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Con tarjeta SIM incorporada para todo tipo de vehículos. Producto importado de Países Bajos, calidad holandesa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/site/tracemaster/productos"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-red-600/30"
                  data-testid="cta-productos"
                >
                  Ver Productos
                </Link>
                <Link
                  to="/site/tracemaster/contacto"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                  data-testid="cta-contacto"
                >
                  Contáctenos
                </Link>
              </div>
            </div>
            <div className="flex justify-center animate-float">
              <div className="relative">
                <div className="absolute inset-4 bg-gradient-to-br from-red-600/30 to-blue-600/20 rounded-full blur-3xl"></div>
                <img
                  src="https://customer-assets.emergentagent.com/job_trace-jotform/artifacts/bqt0d2jg_gps.JPG"
                  alt="Tracemaster GPS Tracker"
                  className="relative max-w-md w-full drop-shadow-2xl rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tagline */}
      <section className="py-8" style={{ background: 'linear-gradient(to right, #00AEEF, #0090C9)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide">
            TRACEMASTER - UNA SENSACIÓN DE SEGURIDAD CON UN RASTREADOR DE TRACEMASTER
          </h2>
        </div>
      </section>

      {/* Intro Text Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Los rastreadores GPS/sistemas de seguimiento de vehículos de Tracemaster funcionan en todo el mundo con bajos costos operativos. La solución confiable para rastrear su vehículo o embarcación tanto para uso comercial como privado.
          </p>
          <p className="text-lg md:text-xl text-white font-semibold leading-relaxed mt-4">
            Sin suscripción y, sin embargo, con los beneficios de un sistema de seguimiento de alta calidad.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 hover:scale-105"
              >
                <div className="text-red-500 flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Highlight */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://customer-assets.emergentagent.com/job_trace-jotform/artifacts/v5f5qps1_tracemaster-1-1.JPG"
                alt="GPS Tracker en uso"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                ¿Busca un rastreador GPS sin suscripción?
              </h2>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Otros proveedores de rastreadores GPS le obligan a suscribirse para utilizar sus rastreadores GPS. Uno de los únicos rastreadores GPS en Ecuador sin costos adicionales es Tracemaster.
              </p>
              <div className="bg-gradient-to-r from-red-600/20 to-transparent p-6 rounded-xl border-l-4 border-red-600">
                <p className="text-white font-medium">
                  El rastreador GPS se entrega completamente listo para su uso (totalmente configurado) incluyendo tarjeta SIM IOT con uso ilimitado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Tracemaster Ecuador
          </h2>
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/OaQeIIpSmBA"
              title="Tracemaster Ecuador"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¡Obtenga su Tracemaster 100 PRO hoy!
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Solo <span className="font-bold text-white text-3xl">$199</span> IVA incluido
          </p>
          <Link
            to="/site/tracemaster/contacto"
            className="inline-block bg-white text-red-600 hover:bg-gray-100 px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
            data-testid="cta-order"
          >
            Hacer Pedido
          </Link>
        </div>
      </section>
    </div>
  );
};

// Products Page
const Productos = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  
  const specs = [
    "¡Sistema único, sin costes adicionales! No plan!",
    "La SIM incorporada funciona en la mayor parte del mundo, también en Colombia y Perú",
    "Precisión de ubicación de hasta 5 metros",
    "Adecuado para autos, camiones, caravanas, barcos",
    "Duración de la batería hasta 100 días",
    "Potente imán",
    "A través de la red 4G/LTE",
    "Eliminación de las interferencias",
    "Aplicación en castellano/plataforma web gratuita",
    "2 años de garantía",
  ];

  const functions = [
    { title: "Seguimiento en tiempo real", desc: "Siga el rastreador GPS en vivo a través de la plataforma en línea (www.tracksolidpro.com) en el ordenador o en el teléfono con la amplia y gratuita aplicación Tracksolid PRO. Aquí también puedes ver las rutas recorridas en el pasado y recibir notificaciones." },
    { title: "Alarma de valla GEO", desc: "Si el rastreador GPS sale de la 'zona segura' preestablecida, se le informará de la ubicación actual. Esto le permite intervenir a tiempo." },
    { title: "Alarma de velocidad", desc: "Recibirás una notificación si se supera la velocidad máxima establecida." },
    { title: "Alarma de vibración", desc: "Si el Localizador GPS comienza a moverse, recibirás una notificación incluyendo las coordenadas de la ubicación." },
    { title: "Modo de suspensión", desc: "El Localizador GPS entra/sale automáticamente del modo de suspensión si el vehículo no se ha movido durante al menos 5 minutos. En el modo de suspensión, el consumo de batería se reduce significativamente." },
    { title: "Alarma de movimiento", desc: "Reciba una notificación cuando el rastreador GPS comience a moverse." },
    { title: "Alarma de manipulación", desc: "El rastreador GPS está equipado con un sensor que detecta la extracción/movimiento del dispositivo y activa una alarma." },
  ];

  const images = [
    "https://customer-assets.emergentagent.com/job_trace-jotform/artifacts/j4ekq9pu_toepassingen-gps-trackers-auto-vk-300x300-1%20%281%29.JPG",
    "https://customer-assets.emergentagent.com/job_trace-jotform/artifacts/v5f5qps1_tracemaster-1-1.JPG",
    "/images/tracemaster/100pro-uitleg-600x600.webp",
    "/images/tracemaster/app-web-1-600x600.webp",
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-20" data-testid="productos-page">
      {/* Lightbox */}
      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
      
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              TRACEMASTER 100 PRO
            </h1>
            <p className="text-xl text-gray-300">Sistema de seguimiento GPS sin suscripción</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Product Images */}
            <div className="space-y-4">
              <img
                src={images[0]}
                alt="Tracemaster 100 PRO"
                className="w-full rounded-2xl shadow-2xl cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setLightboxImage(images[0])}
              />
              <div className="grid grid-cols-3 gap-4">
                {images.slice(1).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Tracemaster ${index + 2}`}
                    className="w-full rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => setLightboxImage(img)}
                  />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">En Stock</span>
                  <div className="text-right">
                    <span className="text-gray-400 line-through text-lg">$259</span>
                    <p className="text-4xl font-bold text-red-500">$199</p>
                    <span className="text-gray-400 text-sm">IVA incluido</span>
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-white mb-4">Características principales:</h2>
                <ul className="space-y-3 mb-8">
                  {specs.map((spec, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="text-red-500 mt-1">✓</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/site/tracemaster/contacto"
                  className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg"
                  data-testid="order-button"
                >
                  Hacer Pedido
                </Link>

                <Link
                  to="/site/tracemaster/adaptador"
                  className="block w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white text-center py-3 rounded-xl font-medium transition-all duration-300"
                >
                  Ver Adaptador para Vehículo →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6">Descripción del Producto</h2>
          <div className="prose prose-lg prose-invert space-y-6">
            <p className="text-gray-300 leading-relaxed">
              El <strong className="text-white">Tracemaster 100 PRO</strong> es único, este rastreador GPS se entrega completamente listo para usar y puede usarse sin costos adicionales, sin costos de suscripción, sin costos de tarjeta SIM o crédito para llamadas.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Además, este localizador GPS viene con una muy amplia App y plataforma web gratuita y fácil de usar con la que podrás comprobar siempre en tiempo real dónde se encuentra tu vehículo. ¡El rastreador funciona en todo el mundo! ¡La solución ideal tanto para el seguimiento comercial de su flota como para el seguimiento privado de su propiedad!
            </p>
            <p className="text-gray-300 leading-relaxed">
              Además, se puede solicitar un historial de hasta 6 meses, para poder rastrear posteriormente dónde ha estado un vehículo y qué ruta ha seguido, incluso se puede consultar la velocidad recorrida. La aplicación App y Web también proporciona muchas más funciones. La plataforma web también es adecuada para el registro de viajes.
            </p>
            
            <h3 className="text-xl font-semibold text-white mt-8">Sobre la Batería</h3>
            <p className="text-gray-300 leading-relaxed">
              El rastreador GPS tiene una batería potente y se puede utilizar hasta 100 días sin cargarlo entremedio. Cargar una vez cada pocos meses es fácil con el cable mini USB incluido. El tiempo máximo de espera es en estado de parada total. La duración de la batería depende, entre otras cosas, del número de movimientos del rastreador GPS; cuando está en movimiento, el rastreador GPS consume considerablemente más batería que cuando está parado (en espera).
            </p>
            <p className="text-gray-300 leading-relaxed">
              La temperatura ambiente (cuanto más fría, más corta es la duración de la batería) y la disponibilidad de la red móvil (con menos alcance móvil, el rastreador GPS consume más batería) también pueden influir en la duración de la batería. Si el rastreador GPS se mueve a diario, puede utilizar aproximadamente la mitad del tiempo máximo de espera especificado como duración de la batería.
            </p>
            <div className="bg-red-600/20 p-4 rounded-xl border-l-4 border-red-600">
              <p className="text-white font-medium">
                <strong>Si no tienes ganas de cargar manualmente, te recomendamos adquirir nuestro <Link to="/site/tracemaster/adaptador" className="text-red-400 hover:text-red-300 underline">cargador de coche especial</Link> para que tu dispositivo esté siempre cargado.</strong>
              </p>
            </div>

            <h3 className="text-xl font-semibold text-white mt-8">Instalación Fácil</h3>
            <p className="text-gray-300 leading-relaxed">
              Gracias al potente imán incorporado, el rastreador GPS se puede colocar fácilmente sobre, contra o debajo de superficies metálicas. Por lo que la instalación no es necesaria. El rastreador GPS es resistente al agua IP65 (a prueba de salpicaduras) y también se puede utilizar en condiciones de humedad. Por lo tanto, el rastreador también es adecuado para asegurar barcos, motos acuáticas, barcos u otros objetos si el objeto está húmedo.
            </p>

            <div className="p-6 rounded-xl border mt-8" style={{ backgroundColor: 'rgba(0, 174, 239, 0.2)', borderColor: 'rgba(0, 174, 239, 0.3)' }}>
              <p className="text-white font-semibold text-lg">
                El localizador GPS se entrega completamente listo para su uso (totalmente configurado) incluyendo tarjeta SIM IOT (Internet) con uso ilimitado, por lo que el localizador GPS se puede utilizar sin ningún coste (sin costes de tarjeta SIM, crédito o suscripción).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Functions */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Funciones</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {functions.map((func, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl hover:bg-gray-750 transition-all duration-300">
                <h3 className="text-lg font-semibold text-red-500 mb-2">{func.title}</h3>
                <p className="text-gray-400 text-sm">{func.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Otras Especificaciones</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <span className="text-gray-400">Red:</span>
              <span className="text-white ml-2">IOT/4G-LTE (funciona en todo el mundo)</span>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <span className="text-gray-400">Antenas:</span>
              <span className="text-white ml-2">WiFi/GSM/GPRS internas</span>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <span className="text-gray-400">Precisión GPS:</span>
              <span className="text-white ml-2">Hasta 5 metros</span>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <span className="text-gray-400">Tamaño:</span>
              <span className="text-white ml-2">10,8 cm x 6,1 cm x 3 cm</span>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <span className="text-gray-400">Peso:</span>
              <span className="text-white ml-2">291 gramos</span>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <span className="text-gray-400">Batería:</span>
              <span className="text-white ml-2">Hasta 100 días</span>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <span className="text-gray-400">Resistencia:</span>
              <span className="text-white ml-2">IP65 (a prueba de salpicaduras)</span>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <span className="text-gray-400">Imán:</span>
              <span className="text-white ml-2">Potente soporte magnético incluido</span>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <span className="text-gray-400">Anti-interferencias:</span>
              <span className="text-white ml-2">Sí</span>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <span className="text-gray-400">Multi-dispositivo:</span>
              <span className="text-white ml-2">Múltiples sistemas en una cuenta</span>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <span className="text-gray-400">Manual:</span>
              <span className="text-white ml-2">Incluye PDF en castellano</span>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <span className="text-gray-400">Garantía:</span>
              <span className="text-white ml-2">2 años garantía total</span>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Aplicación: <strong className="text-white">Tracksolid PRO</strong> (App Store / Play Store) | 
              Plataforma web: <strong className="text-white">eu.tracksolidpro.com</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

// Adaptador Page
const Adaptador = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  
  const mainImage = "/images/tracemaster/chargeur1_orig.jpg";
  
  const thumbnails = [
    "/images/tracemaster/vooraanzicht-vaste-adapter-300x300.webp",
    "/images/tracemaster/chargeur2_orig.jpg",
    "/images/tracemaster/chargeur3_orig.jpg",
    "/images/tracemaster/chargeur4_orig.jpg",
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-20" data-testid="adaptador-page">
      {/* Lightbox */}
      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Images */}
            <div>
              <img
                src={mainImage}
                alt="Adaptador Tracemaster"
                className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl mb-6 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setLightboxImage(mainImage)}
              />
              <div className="grid grid-cols-4 gap-3">
                {thumbnails.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Adaptador ${index + 1}`}
                    className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => setLightboxImage(img)}
                  />
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Adaptador Incorporado para Vehículo
              </h1>
              <p className="text-xl text-gray-400 mb-6">Micro USB</p>

              <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">En Stock</span>
                  <p className="text-4xl font-bold text-red-500">$25</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3 text-gray-300">
                    <span className="text-red-500 mt-1">✓</span>
                    <span>Adaptador/cargador fijo para vehículo DC 12V-24V → 5V 3A</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <span className="text-red-500 mt-1">✓</span>
                    <span>Adecuado para el tipo Tracemaster 100 PRO</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <span className="text-red-500 mt-1">✓</span>
                    <span>¡Ya no es necesario realizar una carga manual!</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <span className="text-red-500 mt-1">✓</span>
                    <span>¡Rastreador GPS siempre en standby!</span>
                  </li>
                </ul>

                <Link
                  to="/site/tracemaster/contacto"
                  className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg"
                >
                  Hacer Pedido
                </Link>
              </div>

              <div className="mt-8 p-6 bg-gray-800/50 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-3">Descripción</h3>
                <p className="text-gray-400">
                  Adaptador fijo opcional para los sistemas de seguimiento Tracemaster con conexión Micro USB. Al conectar este cargador de baterías fijo en su vehículo, vinculado al sistema de seguimiento, ya no es necesario cargar el sistema de seguimiento por separado.
                </p>
              </div>

              {/* Link to main product */}
              <Link
                to="/site/tracemaster/productos"
                className="mt-6 flex items-center gap-4 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all"
              >
                <img
                  src="https://customer-assets.emergentagent.com/job_trace-jotform/artifacts/bqt0d2jg_gps.JPG"
                  alt="Tracemaster 100 PRO"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="text-gray-400 text-sm">Ver también:</p>
                  <p className="text-white font-medium">Tracemaster 100 PRO - $199</p>
                </div>
                <ExternalLink className="ml-auto text-gray-400" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// FAQ Page
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "¿Cómo funciona la instalación de tu nuevo producto?",
      answer: "Puedes realizar la instalación tú mismo fácilmente: te proporcionaremos el localizador GPS y la tarjeta SIM. Descargue la aplicación Tracksolid Pro de forma gratuita en I-store o Play-store. Cree una cuenta, ingrese el número IMEI de su producto. Inserta la tarjeta SIM en tu rastreador. Y su rastreador GPS está listo para usar. Si tienes alguna pregunta o dificultad, siempre puedes comunicarte con el servicio de atención al cliente de Tracemaster Ecuador 24 horas al día, 7 días a la semana, quien te ayudará de forma gratuita."
    },
    {
      question: "Siga varios rastreadores GPS mediante un solo inicio de sesión",
      answer: "Es posible vincular varios rastreadores GPS a una cuenta de usuario. A través de esta cuenta puede administrar, editar y rastrear múltiples rastreadores GPS en un mapa general."
    },
    {
      question: "Configure Geo Zone (cerca digital) o configure notificaciones para el movimiento del rastreador GPS",
      answer: `Configure una zona geográfica a través de la aplicación, indicando si debe proporcionar una notificación al ingresar o salir de la zona geográfica (puede verificar esto en la zona geográfica configurada).

Luego debe configurar la alarma general. Para hacer esto, vaya a Perfil (abajo a la derecha), elija Configuración de alarma aquí y luego habilite al menos las siguientes notificaciones:

Las tres opciones principales deben estar habilitadas:
– Notificación con sonido
– Entrometerse con la vibración
– Notificaciones

Luego active el número 12 (Entrar en zona GEO), 13 (Salir de zona GEO), 14 (EN zona Geo) y 15 (FUERA zona Geo).

Si también quieres recibir una notificación inmediatamente cuando el rastreador GPS comience a moverse (alarma por vibración), también debes habilitar la opción 42 (Alarma por vibración).

Entonces deberías recibir notificaciones (push) de la aplicación.

Para que las notificaciones sean visibles en la aplicación, vaya a Alarmas (en la parte inferior), aquí hace clic en el reloj de arena/menú en la parte superior izquierda, aquí selecciona las notificaciones que desea ver (por ejemplo, seleccionar todas), ahora podrá obtener una descripción general de las notificaciones. Una vez que haya configurado esto una vez, las nuevas notificaciones siempre serán visibles inmediatamente cuando abra la opción del menú Alertas.

Si aún no se reciben notificaciones (push) a través de la aplicación, verifique la configuración de notificaciones de la propia aplicación. Puede hacer esto en la configuración general de su teléfono en Aplicaciones. Otorgue permiso total a la aplicación en todos los puntos aquí.

Otra solución para recibir notificaciones (push) es cerrar sesión completamente en la aplicación después de completar la configuración. Así que no cierres simplemente la aplicación en tu teléfono, sino que cierres la sesión de la aplicación (en Perfil, haz clic en Cerrar sesión en la parte superior derecha y luego haz clic en Aceptar) y luego vuelve a iniciar sesión.`
    },
    {
      question: "Optimizar la duración de la batería",
      answer: `La duración de la batería depende de varios factores, en la situación más ideal la duración de la batería es de un máximo de 100 días en pleno modo de espera (parada) para este tipo de rastreador GPS. Sin embargo, la duración de la batería depende, entre otras cosas, del número de movimientos del rastreador GPS. Durante el movimiento, el rastreador GPS consume considerablemente más batería que cuando está parado (en espera). La temperatura ambiente (cuanto más fría, más corta es la duración de la batería) y la disponibilidad de la red móvil (con menos alcance móvil, el rastreador GPS consume más batería) también pueden influir en la duración de la batería.

Lo más probable es que pueda extender la duración de la batería ajustando una configuración; el rastreador GPS está en modo de seguimiento (tiempo real) de forma predeterminada. En el modo de seguimiento, el rastreador GPS se comunica con la plataforma cada 10 segundos para comunicar la ubicación actual, lo que garantiza que siempre pueda seguir el rastreador GPS en tiempo real a través de la aplicación. Sin embargo, es posible ajustar el intervalo de 10 segundos a un intervalo más bajo, por ejemplo una vez cada 15 o 30 segundos. Como resultado, el rastreador GPS contacta con mucha menos frecuencia con la plataforma de transferencia de ubicación, lo que también supone una menor carga para la batería del rastreador GPS. Un intervalo más bajo garantiza que la batería dure más. Una desventaja es que el seguimiento en tiempo real se muestra con un retraso ligeramente mayor, aunque los datos históricos siguen siendo los mismos en precisión (el dispositivo continúa grabando cada 10 segundos y luego lo comparte con la plataforma durante el intervalo establecido).

Puede ajustar el modo de seguimiento a través de la aplicación en Asignación y luego en Modo de trabajo. Aquí puede ajustar el intervalo de carga (en movimiento) de 10 segundos a otro número. Después de cambiar esta configuración, le recomendamos que cargue completamente el dispositivo (+/- 8 horas).

Las luces solo se encienden cuando está conectado al cargador/batería fija, puedes ver el estado actual (capacidad de la batería) a través de la aplicación.

Si no tienes ganas de cargar manualmente, te recomendamos adquirir nuestro cargador de coche especial para que tu dispositivo esté siempre cargado.`
    },
    {
      question: "La visualización de ubicación precisa y/o el estado indican fuera de línea",
      answer: `En un aparcamiento, por ejemplo, y en algunos casos también en interiores, la recepción del GPS puede ser más limitada, pero el alcance también puede ser limitado en entornos montañosos o en zonas remotas. Gruesos muros de hormigón y metal interrumpen las señales de GPS. Los mejores resultados se logran afuera o al menos cerca de una ventana porque el rastreador GPS debe tener una vista razonable de los satélites GPS para determinar su ubicación. El rastreador GPS suele captar la señal inmediatamente cuando está dentro del alcance.

El rastreador GPS funciona de forma estándar a través de GPRS (Internet móvil a través de la tarjeta SIM en el rastreador GPS), GPRS también proporciona la determinación de ubicación más precisa hasta 5 metros. Sin embargo, la precisión depende en gran medida del alcance en la ubicación; con un alcance menor, la precisión de la determinación de la ubicación disminuirá (la desviación será entonces mayor). Si el rastreador GPS está completamente fuera del alcance GPRS, cambia automáticamente a mediciones a través de LBS (red GSM a través de la tarjeta SIM en el rastreador GPS) o WIFI (puntos WiFi públicos cerca del rastreador GPS); sin embargo, esta determinación de ubicación LBS y WIFI es mucho menos preciso. La desviación con una medición LBS y WIFI es de 500 a 5000 metros (nuevamente dependiendo del rango GSM). Si no es posible establecer ningún contacto, el rastreador GPS se desconectará de la aplicación.

Si el rastreador GPS está fuera de línea en la aplicación, no se podrá establecer contacto con la plataforma/aplicación en ese momento. El rastreador GPS requiere Internet móvil (datos/GPRS) para comunicarse completamente con la plataforma/aplicación.

Puede intentar mover el rastreador GPS a otra ubicación en el vehículo o embarcación; el alcance puede ser más estable allí y esto no ocurrirá. También puede ampliar ligeramente el círculo de Geofence para evitar falsas alarmas. En el momento en que el rastreador GPS realmente comience a moverse y abandone el área establecida, se enviará una notificación desde la Geocerca en todo momento.

La información actual e histórica de su rastreador GPS simplemente la mantiene su rastreador GPS y la comparte con la plataforma tan pronto como el rastreador GPS vuelve a estar en contacto, por lo que no se pierden datos mientras el rastreador GPS está fuera de línea en la plataforma.

Si el rastreador GPS permanece fuera de línea, puede intentar reiniciarlo con el botón de inicio (al lado de la conexión del cable de carga). Si lo mantiene presionado durante 10 segundos, el dispositivo se reiniciará.`
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-20" data-testid="faq-page">
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <img
              src="/images/tracemaster/tracemaster-logo-rood-1_1.webp"
              alt="Tracemaster Logo"
              className="h-16 mx-auto mb-6"
            />
            <h1 className="text-4xl font-bold text-white mb-4">Preguntas Frecuentes</h1>
            <p className="text-gray-400">TRACEMASTER 100 PRO</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-750 transition-colors"
                  data-testid={`faq-question-${index}`}
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="text-red-500 flex-shrink-0" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5 animate-fadeIn">
                    <p className="text-gray-400 leading-relaxed whitespace-pre-line">{faq.answer}</p>
                    {faq.question === "Optimizar la duración de la batería" && (
                      <Link to="/site/tracemaster/adaptador" className="inline-block mt-4 text-red-500 hover:text-red-400 font-medium">
                        → Ver cargador de coche especial
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Product Card */}
          <div className="mt-12 p-8 bg-gradient-to-r from-red-600/20 to-gray-800 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src="https://customer-assets.emergentagent.com/job_trace-jotform/artifacts/bqt0d2jg_gps.JPG"
                alt="Tracemaster 100 PRO"
                className="w-48 rounded-xl"
              />
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Tracemaster 100 PRO</h3>
                <p className="text-gray-300 mb-4">Sistema de seguimiento – ¡Sin costes adicionales! Con SIM incorporada.</p>
                <p className="text-3xl font-bold text-red-500 mb-4">$199 <span className="text-sm text-gray-400 font-normal">IVA incluido</span></p>
                <Link
                  to="/site/tracemaster/contacto"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Hacer Pedido
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    asunto: 'Información sobre Tracemaster 100 PRO',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create WhatsApp message
    const message = `*Nuevo mensaje de contacto - Tracemaster*%0A%0A` +
      `*Nombre:* ${formData.nombre}%0A` +
      `*Teléfono:* ${formData.telefono}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Asunto:* ${formData.asunto}%0A%0A` +
      `*Mensaje:*%0A${formData.mensaje}`;

    // Open WhatsApp with the message
    const whatsappUrl = `https://wa.me/32494516064?text=${message}`;
    window.open(whatsappUrl, '_blank');

    // Redirect to confirmation page after a short delay
    setTimeout(() => {
      window.location.href = '/confirmacion';
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-2">
            Nombre completo *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
            placeholder="Su nombre"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-300 mb-2">
            Teléfono / WhatsApp *
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            required
            value={formData.telefono}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
            placeholder="+593 ..."
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Correo electrónico *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
          placeholder="su@email.com"
        />
      </div>

      {/* Asunto */}
      <div>
        <label htmlFor="asunto" className="block text-sm font-medium text-gray-300 mb-2">
          Asunto *
        </label>
        <select
          id="asunto"
          name="asunto"
          required
          value={formData.asunto}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
        >
          <option value="Información sobre Tracemaster 100 PRO">Información sobre Tracemaster 100 PRO</option>
          <option value="Quiero hacer un pedido">Quiero hacer un pedido</option>
          <option value="Pregunta sobre mi rastreador">Pregunta sobre mi rastreador</option>
          <option value="Soporte técnico">Soporte técnico</option>
          <option value="Información sobre el Adaptador">Información sobre el Adaptador</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-gray-300 mb-2">
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={5}
          value={formData.mensaje}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 resize-none"
          placeholder="Escriba su mensaje aquí..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg flex items-center justify-center gap-3"
        data-testid="submit-button"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Enviando...
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Enviar mensaje por WhatsApp
          </>
        )}
      </button>

      <p className="text-gray-500 text-sm text-center">
        Al hacer clic en "Enviar", se abrirá WhatsApp con su mensaje. 
        Solo tiene que presionar "Enviar" en WhatsApp para completar.
      </p>
    </form>
  );
};

// Contact Page
const Contacto = () => {
  return (
    <div className="min-h-screen bg-gray-900 pt-20" data-testid="contacto-page">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://customer-assets.emergentagent.com/job_trace-jotform/artifacts/b85choa5_IMG_20210326_135910-2400x1800-1-600x450.JPG')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/90"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contáctenos</h1>
          <p className="text-xl text-gray-300">Estamos aquí para ayudarle</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* WhatsApp Card */}
            <div className="bg-gray-800 rounded-2xl p-8 text-center hover:bg-gray-750 transition-all">
              <a
                href="https://wa.me/593989013622"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                data-testid="whatsapp-contact-link"
              >
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">WhatsApp</h3>
                <p className="text-gray-400 mb-4">Chatea con nosotros directamente</p>
                <span className="text-green-500 font-medium">+593 98 901 3622 (solo whatsapp)</span>
              </a>
            </div>

            {/* Business Info */}
            <div className="md:col-span-2 bg-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="text-red-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-white font-medium">Ubicación</p>
                    <p className="text-gray-400">Santo Domingo, Ecuador</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-red-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-white font-medium">Teléfono / WhatsApp</p>
                    <p className="text-gray-400">+593 98 901 3622 (solo whatsapp)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="text-red-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-white font-medium">Empresa</p>
                    <p className="text-gray-400">fworksbuilders</p>
                    <p className="text-gray-500 text-sm">RUC 1759884990001</p>
                  </div>
                </div>
              </div>
              <img
                src="/images/tracemaster/whatsapp-business-logo.jpg"
                alt="WhatsApp Business"
                className="mt-6 h-16 rounded-lg"
              />
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="mt-12 bg-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Contacto o Pedidos</h2>
            <p className="text-gray-400 mb-8">
              ¿Quieres hacer un pedido? ¿Tiene preguntas sobre el rastreador GPS Tracemaster que compró? Primero, eche un vistazo a nuestra página 'FAQ'. ¿Su pregunta no aparece en la lista? Utilice el formulario de contacto a continuación, intentaremos responderle dentro de 1 día hábil:
            </p>
            
            {/* Custom Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

// Confirmation Page (hidden from menu)
const Confirmacion = () => {
  return (
    <div className="min-h-screen bg-gray-900 pt-20" data-testid="confirmacion-page">
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/30">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¡Gracias por su solicitud!
          </h1>

          {/* Message */}
          <div className="bg-gray-800 rounded-2xl p-8 mb-8 text-left">
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Hemos recibido su solicitud correctamente. Nuestro equipo revisará su mensaje y nos pondremos en contacto con usted lo antes posible.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              <strong className="text-white">Tiempo de respuesta:</strong> Intentaremos responderle dentro de 1 día hábil a través de WhatsApp o correo electrónico.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Si tiene alguna pregunta urgente, no dude en contactarnos directamente por WhatsApp.
            </p>
          </div>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/593989013622"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg mb-6"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contactar por WhatsApp
          </a>

          {/* Back to Home */}
          <div>
            <Link
              to="/site/tracemaster/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Volver a la página principal
            </Link>
          </div>

          {/* Product Reminder */}
          <div className="mt-12 p-6 bg-gradient-to-r from-red-600/20 to-gray-800 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src="https://customer-assets.emergentagent.com/job_trace-jotform/artifacts/bqt0d2jg_gps.JPG"
                alt="Tracemaster 100 PRO"
                className="w-32 rounded-xl"
              />
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-2">Tracemaster 100 PRO</h3>
                <p className="text-gray-400 mb-2">Rastreador GPS sin suscripción</p>
                <p className="text-2xl font-bold text-red-500">$199 <span className="text-sm text-gray-400 font-normal">IVA incluido</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function TracemasterApp() {
  return (
    <div className="App bg-gray-900 min-h-screen">
      
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/adaptador" element={<Adaptador />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/confirmacion" element={<Confirmacion />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
      
    </div>
  );
}

export default TracemasterApp;
