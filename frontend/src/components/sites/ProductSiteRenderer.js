import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Phone, Mail, MapPin, Menu as MenuIcon, X, MessageCircle, Check, ShoppingCart, ChevronRight, Globe, Settings, LogOut, Save, Lock, AlertCircle } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

// Product Navigation Component
const ProductNavigation = ({ site, config, primaryColor }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const baseUrl = site?.slug ? `/site/${site.slug}` : '';

  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to={baseUrl || '/'} className="flex items-center space-x-3">
            {config?.logo_url ? (
              <img src={config.logo_url} alt={site?.name} className="h-12 w-auto" />
            ) : (
              <span className="text-xl font-bold text-white">{site?.name}</span>
            )}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to={baseUrl || '/'} className="text-sm font-medium text-white hover:text-blue-400 transition-colors">Home</Link>
            <Link to={`${baseUrl}/productos`} className="text-sm font-medium text-white hover:text-blue-400 transition-colors">Productos</Link>
            <Link to={`${baseUrl}/contacto`} className="text-sm font-medium text-white hover:text-blue-400 transition-colors">Contacto</Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {config?.whatsapp && (
              <a
                href={`https://wa.me/${config.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg font-medium text-white transition-all hover:opacity-90 flex items-center space-x-2"
                style={{ backgroundColor: '#25D366' }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            )}
            <Link
              to={`${baseUrl}/contacto`}
              className="px-5 py-2.5 rounded-lg font-medium text-black transition-all hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              Hacer Pedido
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-800">
            <div className="flex flex-col space-y-3 pt-4">
              <Link to={baseUrl || '/'} onClick={() => setMobileMenuOpen(false)} className="py-2 text-white">Home</Link>
              <Link to={`${baseUrl}/productos`} onClick={() => setMobileMenuOpen(false)} className="py-2 text-white">Productos</Link>
              <Link to={`${baseUrl}/contacto`} onClick={() => setMobileMenuOpen(false)} className="py-2 text-white">Contacto</Link>
              {config?.whatsapp && (
                <a
                  href={`https://wa.me/${config.whatsapp.replace(/[^0-9]/g, '')}`}
                  className="py-2 text-green-400 flex items-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Product Footer Component
const ProductFooter = ({ site, config, primaryColor }) => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>{site?.name}</h3>
            {config?.meta_description && <p className="text-gray-400 text-sm">{config.meta_description}</p>}
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            {config?.whatsapp && (
              <a href={`https://wa.me/${config.whatsapp.replace(/[^0-9]/g, '')}`} className="flex items-center space-x-2 text-gray-400 hover:text-white mb-2">
                <MessageCircle className="w-4 h-4" />
                <span>{config.phone || config.whatsapp}</span>
              </a>
            )}
            {config?.address && (
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{config.address}</span>
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            {config?.company_name && <p className="text-gray-400 text-sm">{config.company_name}</p>}
            {config?.ruc && <p className="text-gray-400 text-sm">RUC: {config.ruc}</p>}
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} {site?.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

// Hero Section
const HeroSection = ({ config, primaryColor, baseUrl }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          {config?.hero_title_es || 'Rastreador GPS Sin Suscripción'}
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          {config?.hero_subtitle_es || 'Con tarjeta SIM incorporada para todo tipo de vehículos.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={`${baseUrl}/productos`}
            className="px-8 py-4 rounded-lg font-medium text-black transition-all hover:opacity-90 text-lg"
            style={{ backgroundColor: primaryColor }}
          >
            Ver Productos
          </Link>
          <Link
            to={`${baseUrl}/contacto`}
            className="px-8 py-4 rounded-lg font-medium text-white border-2 transition-all hover:bg-white/10"
            style={{ borderColor: primaryColor }}
          >
            Contáctenos
          </Link>
        </div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = ({ primaryColor }) => {
  const features = [
    { icon: '🎧', title: 'Soporte rápido de expertos', desc: 'Atención 24/7' },
    { icon: '✅', title: 'Listo para usar', desc: 'Sin configuración' },
    { icon: '🛡️', title: 'Garantía de 2 años', desc: 'Calidad garantizada' },
    { icon: '🇳🇱', title: 'Calidad holandesa', desc: 'Importado de Países Bajos' },
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Product Card
const ProductCard = ({ product, primaryColor, baseUrl }) => {
  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all group">
      {/* Product Images */}
      <div className="relative aspect-square bg-gray-800 overflow-hidden">
        {product.images?.[0] && (
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        {product.original_price && product.original_price > product.price && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            OFERTA
          </div>
        )}
        {product.in_stock && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
            En Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description_es}</p>
        
        {/* Price */}
        <div className="flex items-baseline gap-3 mb-4">
          {product.original_price && product.original_price > product.price && (
            <span className="text-gray-500 line-through text-lg">${product.original_price}</span>
          )}
          <span className="text-3xl font-bold" style={{ color: primaryColor }}>${product.price}</span>
          <span className="text-gray-400 text-sm">IVA incluido</span>
        </div>

        {/* Features */}
        {product.features && (
          <ul className="space-y-2 mb-6">
            {product.features.slice(0, 4).map((feature, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-300">
                <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <Link
          to={`${baseUrl}/contacto`}
          className="w-full py-3 rounded-lg font-medium text-black transition-all hover:opacity-90 flex items-center justify-center"
          style={{ backgroundColor: primaryColor }}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Hacer Pedido
        </Link>
      </div>
    </div>
  );
};

// Products Page
const ProductsPage = ({ site, config, products, primaryColor }) => {
  const baseUrl = site?.slug ? `/site/${site.slug}` : '';

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nuestros Productos</h1>
          <p className="text-xl text-gray-400">Sistema de seguimiento GPS sin suscripción</p>
          <div className="w-24 h-1 mx-auto mt-6" style={{ backgroundColor: primaryColor }}></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product, idx) => (
            <ProductCard key={idx} product={product} primaryColor={primaryColor} baseUrl={baseUrl} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Contact Page
const ContactPage = ({ site, config, primaryColor }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Información sobre Tracemaster 100 PRO',
    message: ''
  });

  const subjects = [
    'Información sobre Tracemaster 100 PRO',
    'Quiero hacer un pedido',
    'Pregunta sobre mi rastreador',
    'Soporte técnico',
    'Información sobre el Adaptador',
    'Otro'
  ];

  const handleWhatsAppSubmit = () => {
    const message = `*Nuevo Mensaje de ${formData.name}*\n\nTeléfono: ${formData.phone}\nEmail: ${formData.email}\nAsunto: ${formData.subject}\n\nMensaje:\n${formData.message}`;
    const whatsappNumber = config?.whatsapp?.replace(/[^0-9]/g, '') || '593989013622';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contáctenos</h1>
          <p className="text-xl text-gray-400">Estamos aquí para ayudarle</p>
          <div className="w-24 h-1 mx-auto mt-6" style={{ backgroundColor: primaryColor }}></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            {config?.whatsapp && (
              <a 
                href={`https://wa.me/${config.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-green-500/50 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">WhatsApp</h3>
                    <p className="text-gray-400">Chatea con nosotros directamente</p>
                    <p className="text-green-400">{config.phone || config.whatsapp}</p>
                  </div>
                </div>
              </a>
            )}

            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
              <h3 className="text-white font-semibold mb-4">Información de Contacto</h3>
              <div className="space-y-4 text-gray-400">
                {config?.address && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 mt-1" style={{ color: primaryColor }} />
                    <div>
                      <p className="text-white font-medium">Ubicación</p>
                      <p>{config.address}</p>
                    </div>
                  </div>
                )}
                {config?.phone && (
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 mt-1" style={{ color: primaryColor }} />
                    <div>
                      <p className="text-white font-medium">Teléfono / WhatsApp</p>
                      <p>{config.phone}</p>
                    </div>
                  </div>
                )}
                {config?.company_name && (
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 mt-1 flex items-center justify-center" style={{ color: primaryColor }}>🏢</div>
                    <div>
                      <p className="text-white font-medium">Empresa</p>
                      <p>{config.company_name}</p>
                      {config?.ruc && <p className="text-sm">RUC {config.ruc}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 bg-gray-900 rounded-xl border border-gray-800">
            <h3 className="text-white font-semibold mb-6">Contacto o Pedidos</h3>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleWhatsAppSubmit(); }}>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Nombre completo *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Teléfono / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Correo electrónico *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Asunto *</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                >
                  {subjects.map((subject, idx) => (
                    <option key={idx} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Mensaje *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-lg font-medium text-white transition-all hover:opacity-90 flex items-center justify-center"
                style={{ backgroundColor: '#25D366' }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Enviar mensaje por WhatsApp
              </button>
              <p className="text-gray-500 text-xs text-center">
                Al hacer clic en "Enviar", se abrirá WhatsApp con su mensaje.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Home Page
const HomePage = ({ site, config, products, gallery, primaryColor }) => {
  const baseUrl = site?.slug ? `/site/${site.slug}` : '';

  return (
    <>
      <HeroSection config={config} primaryColor={primaryColor} baseUrl={baseUrl} />
      
      {/* About Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                TRACEMASTER - Una sensación de seguridad
              </h2>
              <p className="text-gray-400 mb-6">
                Los rastreadores GPS de Tracemaster funcionan en todo el mundo con bajos costos operativos. 
                La solución confiable para rastrear su vehículo o embarcación tanto para uso comercial como privado.
              </p>
              <p className="text-gray-400 mb-8">
                Sin suscripción y, sin embargo, con los beneficios de un sistema de seguimiento de alta calidad.
              </p>
              <Link
                to={`${baseUrl}/productos`}
                className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-black transition-all hover:opacity-90"
                style={{ backgroundColor: primaryColor }}
              >
                Ver Productos
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
            <div>
              {gallery?.[0] && (
                <img 
                  src={gallery[0].url} 
                  alt="Tracemaster GPS"
                  className="rounded-2xl shadow-2xl"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <FeaturesSection primaryColor={primaryColor} />

      {/* Featured Product */}
      {products.length > 0 && (
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¡Obtenga su Tracemaster 100 PRO hoy!
              </h2>
              <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                Solo ${products[0].price} IVA incluido
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <ProductCard product={products[0]} primaryColor={primaryColor} baseUrl={baseUrl} />
            </div>
          </div>
        </section>
      )}

      {/* WhatsApp CTA */}
      {config?.whatsapp && (
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">¿Tiene preguntas?</h2>
            <p className="text-green-100 mb-8">Contáctenos directamente por WhatsApp</p>
            <a
              href={`https://wa.me/${config.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-white text-green-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Chat en WhatsApp
            </a>
          </div>
        </section>
      )}
    </>
  );
};

// Main Product Site Renderer
const ProductSiteRenderer = ({ siteData }) => {
  const { site, config, products = [], gallery = [] } = siteData;
  const primaryColor = config?.primary_color || '#1a73e8';
  const baseUrl = site?.slug ? `/site/${site.slug}` : '';

  return (
    <div className="min-h-screen bg-black">
      <ProductNavigation site={site} config={config} primaryColor={primaryColor} />
      
      <Routes>
        <Route path="/" element={
          <HomePage site={site} config={config} products={products} gallery={gallery} primaryColor={primaryColor} />
        } />
        <Route path="/productos" element={
          <ProductsPage site={site} config={config} products={products} primaryColor={primaryColor} />
        } />
        <Route path="/contacto" element={
          <ContactPage site={site} config={config} primaryColor={primaryColor} />
        } />
        <Route path="*" element={
          <HomePage site={site} config={config} products={products} gallery={gallery} primaryColor={primaryColor} />
        } />
      </Routes>
      
      <ProductFooter site={site} config={config} primaryColor={primaryColor} />
    </div>
  );
};

export default ProductSiteRenderer;
