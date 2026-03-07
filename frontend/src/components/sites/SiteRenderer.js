import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, ChevronRight, Menu as MenuIcon, X, Download, Settings, LogOut, Save, Plus, Trash2, Lock, AlertCircle, Check, Globe } from 'lucide-react';
import { translations, getTranslation } from '@/utils/translations';
import ProductSiteRenderer from './ProductSiteRenderer';

// Import de site apps direct (niet lazy) voor betere stabiliteit
import CantinaApp from '@/sites/cantina/CantinaApp';
import BottegaApp from '@/sites/bottega/BottegaApp';
import AscoliApp from '@/sites/ascoli/AscoliApp';
import MercatoApp from '@/sites/mercato/MercatoApp';
import TracemasterApp from '@/sites/tracemaster/TracemasterApp';
import TheobeansApp from '@/sites/theobeans/TheobeansApp';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

// Track visit when site loads
const trackSiteVisit = async (slug) => {
  try {
    await fetch(`${API}/public/track-visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ site_slug: slug })
    });
  } catch (error) {
    // Silent fail
  }
};

// Site data fetcher
const useSiteData = (slug) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (slug) {
          // Track the visit
          trackSiteVisit(slug);
          
          const response = await axios.get(`${API}/public/site/${slug}`);
          setData(response.data);
        } else {
          // Try domain-based lookup
          const hostname = window.location.hostname;
          if (hostname !== 'localhost' && !hostname.includes('preview.emergentagent.com')) {
            const response = await axios.get(`${API}/public/site-by-domain?domain=${hostname}`);
            if (response.data) {
              // Track with the slug from domain lookup
              if (response.data.slug) {
                trackSiteVisit(response.data.slug);
              }
              setData(response.data);
            }
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  return { data, loading, error };
};

// Navigation Component
const SiteNavigation = ({ site, config, primaryColor }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const baseUrl = site?.slug ? `/site/${site.slug}` : '';

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to={baseUrl || '/'} className="flex items-center space-x-3">
            {config?.logo_url ? (
              <img src={config.logo_url} alt={site?.name} className="h-12 w-auto" />
            ) : (
              <span className="text-xl font-bold" style={{ color: primaryColor }}>{site?.name}</span>
            )}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to={baseUrl || '/'} className="text-sm font-medium text-gray-700 hover:opacity-80" style={{ '--hover-color': primaryColor }}>Home</Link>
            <Link to={`${baseUrl}/kaart`} className="text-sm font-medium text-gray-700 hover:opacity-80">Menu</Link>
            {config?.has_reservations && (
              <Link to={`${baseUrl}/reserveren`} className="text-sm font-medium text-gray-700 hover:opacity-80">Reserveren</Link>
            )}
            {config?.has_takeaway && (
              <Link to={`${baseUrl}/afhalen`} className="text-sm font-medium text-gray-700 hover:opacity-80">Afhalen</Link>
            )}
            <Link to={`${baseUrl}/galerie`} className="text-sm font-medium text-gray-700 hover:opacity-80">Foto's</Link>
            <Link to={`${baseUrl}/contact`} className="text-sm font-medium text-gray-700 hover:opacity-80">Contact</Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {config?.has_reservations && (
              <Link
                to={`${baseUrl}/reserveren`}
                className="px-5 py-2.5 rounded-lg font-medium text-white transition-all hover:opacity-90"
                style={{ backgroundColor: primaryColor }}
                data-testid="nav-reserve-btn"
              >
                Reserveren
              </Link>
            )}
            {config?.has_takeaway && (
              <Link
                to={`${baseUrl}/afhalen`}
                className="px-5 py-2.5 rounded-lg font-medium border-2 transition-all hover:text-white"
                style={{ borderColor: primaryColor, color: primaryColor }}
                onMouseEnter={(e) => e.target.style.backgroundColor = primaryColor}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = primaryColor; }}
              >
                Afhalen
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t">
            <div className="flex flex-col space-y-3 pt-4">
              <Link to={baseUrl || '/'} onClick={() => setMobileMenuOpen(false)} className="py-2 text-gray-700">Home</Link>
              <Link to={`${baseUrl}/kaart`} onClick={() => setMobileMenuOpen(false)} className="py-2 text-gray-700">Menu</Link>
              {config?.has_reservations && (
                <Link to={`${baseUrl}/reserveren`} onClick={() => setMobileMenuOpen(false)} className="py-2 text-gray-700">Reserveren</Link>
              )}
              {config?.has_takeaway && (
                <Link to={`${baseUrl}/afhalen`} onClick={() => setMobileMenuOpen(false)} className="py-2 text-gray-700">Afhalen</Link>
              )}
              <Link to={`${baseUrl}/galerie`} onClick={() => setMobileMenuOpen(false)} className="py-2 text-gray-700">Foto's</Link>
              <Link to={`${baseUrl}/contact`} onClick={() => setMobileMenuOpen(false)} className="py-2 text-gray-700">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Footer Component
const SiteFooter = ({ site, config, primaryColor }) => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{site?.name}</h3>
            {config?.address && <p className="text-gray-400">{config.address}</p>}
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            {config?.phone && (
              <a href={`tel:${config.phone}`} className="flex items-center space-x-2 text-gray-400 hover:text-white mb-2">
                <Phone className="w-4 h-4" />
                <span>{config.phone}</span>
              </a>
            )}
            {config?.email && (
              <a href={`mailto:${config.email}`} className="flex items-center space-x-2 text-gray-400 hover:text-white">
                <Mail className="w-4 h-4" />
                <span>{config.email}</span>
              </a>
            )}
          </div>
          <div>
            <h4 className="font-semibold mb-4">Volg Ons</h4>
            <div className="flex space-x-4">
              {config?.facebook_url && (
                <a href={config.facebook_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Facebook className="w-6 h-6" />
                </a>
              )}
              {config?.instagram_url && (
                <a href={config.instagram_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Instagram className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {site?.name}. {config?.btw_number && `BTW: ${config.btw_number}`}</p>
        </div>
      </div>
    </footer>
  );
};

// Home Page
const HomePage = ({ site, config, gallery, primaryColor }) => {
  const navigate = useNavigate();
  const baseUrl = site?.slug ? `/site/${site.slug}` : '';
  const heroImage = gallery?.[0]?.url || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920';

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt={site?.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6" data-testid="hero-title">
            Welkom bij {site?.name}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {config?.meta_description || 'Authentieke Italiaanse keuken'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {config?.has_reservations && (
              <button
                onClick={() => navigate(`${baseUrl}/reserveren`)}
                className="px-8 py-4 rounded-lg font-semibold text-white transition-all hover:opacity-90 shadow-lg"
                style={{ backgroundColor: primaryColor }}
                data-testid="hero-reserve-btn"
              >
                Reserveer Tafel
              </button>
            )}
            {config?.has_takeaway && (
              <button
                onClick={() => navigate(`${baseUrl}/afhalen`)}
                className="px-8 py-4 rounded-lg font-semibold bg-white text-gray-900 hover:bg-gray-100 transition-all shadow-lg"
              >
                Afhalen Bestellen
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Closure Notice */}
      {config?.closure_notice && (
        <div className="py-6 px-4" style={{ backgroundColor: `${primaryColor}15` }}>
          <div className="max-w-7xl mx-auto text-center" style={{ color: primaryColor }}>
            <p className="font-medium"><strong>Let op:</strong> {config.closure_notice}</p>
          </div>
        </div>
      )}

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Authentieke Ervaring</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {config?.meta_description || `Welkom bij ${site?.name}. Wij bieden u een unieke culinaire ervaring met authentieke gerechten en een warme ambiance.`}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-white" style={{ backgroundColor: primaryColor }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Klaar voor een onvergetelijke ervaring?</h2>
          <p className="text-xl mb-8 opacity-90">Reserveer nu uw tafel</p>
          <button
            onClick={() => navigate(`${baseUrl}/reserveren`)}
            className="px-8 py-4 rounded-lg font-semibold bg-white transition-all hover:bg-gray-100 shadow-lg"
            style={{ color: primaryColor }}
          >
            Reserveren
          </button>
        </div>
      </section>
    </div>
  );
};

// Menu Page
const MenuPage = ({ site, config, menuItems, primaryColor }) => {
  const categories = [...new Set(menuItems.map(item => item.category))];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Onze Kaart</h1>
        
        {menuItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Het menu wordt binnenkort toegevoegd.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map(category => (
              <div key={category} className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 capitalize" style={{ color: primaryColor }}>
                  {category}
                </h2>
                <div className="space-y-4">
                  {menuItems.filter(item => item.category === category).map(item => (
                    <div key={item.item_id} className="flex justify-between items-start py-3 border-b border-gray-100 last:border-0">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name_nl}</h3>
                        {item.description_nl && (
                          <p className="text-sm text-gray-500 mt-1">{item.description_nl}</p>
                        )}
                      </div>
                      <span className="font-semibold ml-4" style={{ color: primaryColor }}>
                        €{item.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Reservation Page
const ReservationPage = ({ site, config, primaryColor }) => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Reserveren</h1>
        <p className="text-center text-gray-600 mb-8">Maak een reservering voor een onvergetelijke ervaring</p>

        {config?.closure_notice && (
          <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: `${primaryColor}15`, borderLeft: `4px solid ${primaryColor}` }}>
            <p style={{ color: primaryColor }}><strong>Let op:</strong> {config.closure_notice}</p>
          </div>
        )}

        {config?.reservation_form_url ? (
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <iframe
              src={config.reservation_form_url}
              title="Reserveringsformulier"
              className="w-full border-0"
              style={{ minHeight: '800px' }}
              scrolling="yes"
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <p className="text-gray-600 mb-4">Neem contact met ons op om te reserveren:</p>
            {config?.phone && (
              <a href={`tel:${config.phone}`} className="text-xl font-semibold hover:underline" style={{ color: primaryColor }}>
                {config.phone}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Takeaway Page
const TakeawayPage = ({ site, config, primaryColor }) => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Afhalen</h1>
        <p className="text-center text-gray-600 mb-8">Bestel uw favoriete gerechten om af te halen</p>

        {config?.takeaway_form_url ? (
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <iframe
              src={config.takeaway_form_url}
              title="Afhaalformulier"
              className="w-full border-0"
              style={{ minHeight: '800px' }}
              scrolling="yes"
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <p className="text-gray-600 mb-4">Bel ons om uw bestelling te plaatsen:</p>
            {config?.phone && (
              <a href={`tel:${config.phone}`} className="text-xl font-semibold hover:underline" style={{ color: primaryColor }}>
                {config.phone}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Gallery Page
const GalleryPage = ({ site, gallery, primaryColor }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Foto's</h1>
        
        {gallery.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Foto's worden binnenkort toegevoegd.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((img, index) => (
              <div
                key={img.image_id}
                className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage(img)}
              >
                <img src={img.url} alt={img.alt_text || `Foto ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            >
              ×
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.alt_text}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Contact Page
const ContactPage = ({ site, config, primaryColor }) => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Contact & Info</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>Contact</h2>
            <div className="space-y-4">
              {config?.address && (
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 mt-1" style={{ color: primaryColor }} />
                  <div>
                    <h4 className="font-semibold">Adres</h4>
                    <p className="text-gray-600">{config.address}</p>
                  </div>
                </div>
              )}
              {config?.phone && (
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 mt-1" style={{ color: primaryColor }} />
                  <div>
                    <h4 className="font-semibold">Telefoon</h4>
                    <a href={`tel:${config.phone}`} className="text-gray-600 hover:underline">{config.phone}</a>
                  </div>
                </div>
              )}
              {config?.email && (
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 mt-1" style={{ color: primaryColor }} />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <a href={`mailto:${config.email}`} className="text-gray-600 hover:underline">{config.email}</a>
                  </div>
                </div>
              )}
            </div>

            {/* Opening Hours */}
            {config?.opening_hours && Object.keys(config.opening_hours).length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
                  <Clock className="w-5 h-5 inline mr-2" />
                  Openingstijden
                </h3>
                <div className="space-y-2">
                  {Object.entries(config.opening_hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="text-gray-700 font-medium">{day}</span>
                      <span className="text-gray-600">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden h-96">
            {config?.address ? (
              <iframe
                title="Locatie"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(config.address)}`}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                <p>Kaart niet beschikbaar</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Site Admin Login Page (on the restaurant's own site)
const SiteLoginPage = ({ site, config, primaryColor, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API}/site-admin/login`, 
        { email, password },
        { withCredentials: true }
      );
      
      // Verify the admin belongs to this site
      if (response.data.site?.site_id !== site.site_id) {
        setError('Je hebt geen toegang tot deze website.');
        return;
      }
      
      onLogin(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Inloggen mislukt. Controleer je gegevens.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold" style={{ color: primaryColor }}>{site?.name}</h1>
            <p className="text-gray-600 mt-2">Beheerders Login</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3 text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': primaryColor }}
                placeholder="jouw@email.be"
                required
                data-testid="site-login-email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Wachtwoord</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:border-transparent"
                placeholder="••••••••"
                required
                data-testid="site-login-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              style={{ backgroundColor: primaryColor }}
              data-testid="site-login-btn"
            >
              {loading ? 'Bezig met inloggen...' : 'Inloggen'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Site Admin Dashboard (on the restaurant's own site)
const SiteAdminPanel = ({ site, config, admin, primaryColor, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [siteConfig, setSiteConfig] = useState(config);
  const [menuItems, setMenuItems] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [lang, setLang] = useState(() => localStorage.getItem('dashboard_lang') || 'fr');

  // Translations
  const translations = {
    fr: {
      management: 'Gestion', welcome: 'Bienvenue', logout: 'Déconnexion',
      overview: 'Aperçu', openingHours: 'Heures d\'ouverture', menu: 'Menu', photos: 'Photos',
      closureNotice: 'Avis de fermeture', closurePlaceholder: 'Ex: Nous sommes fermés du 24 au 26 décembre...',
      save: 'Enregistrer', saving: 'Enregistrement...', addItem: 'Ajouter un plat',
      deleteConfirm: 'Supprimer ce plat?', addPhoto: 'Ajouter une photo', photoUrl: 'URL de l\'image:',
      saved: 'Enregistré!', itemAdded: 'Ajouté!', deleted: 'Supprimé!', error: 'Erreur',
      antipasti: 'Antipasti', primi: 'Primi', secondi: 'Secondi', desserts: 'Desserts', drinks: 'Boissons'
    },
    nl: {
      management: 'Beheer', welcome: 'Welkom', logout: 'Uitloggen',
      overview: 'Overzicht', openingHours: 'Openingstijden', menu: 'Menu', photos: 'Foto\'s',
      closureNotice: 'Sluitingsbericht', closurePlaceholder: 'Bijv: Wij zijn gesloten van 24-26 december...',
      save: 'Opslaan', saving: 'Opslaan...', addItem: 'Item Toevoegen',
      deleteConfirm: 'Item verwijderen?', addPhoto: 'Foto Toevoegen', photoUrl: 'URL van de afbeelding:',
      saved: 'Opgeslagen!', itemAdded: 'Toegevoegd!', deleted: 'Verwijderd!', error: 'Fout',
      antipasti: 'Antipasti', primi: 'Primi', secondi: 'Secondi', desserts: 'Desserts', drinks: 'Dranken'
    },
    en: {
      management: 'Management', welcome: 'Welcome', logout: 'Log out',
      overview: 'Overview', openingHours: 'Opening Hours', menu: 'Menu', photos: 'Photos',
      closureNotice: 'Closure Notice', closurePlaceholder: 'E.g.: We are closed from December 24-26...',
      save: 'Save', saving: 'Saving...', addItem: 'Add Item',
      deleteConfirm: 'Delete this item?', addPhoto: 'Add Photo', photoUrl: 'Image URL:',
      saved: 'Saved!', itemAdded: 'Added!', deleted: 'Deleted!', error: 'Error',
      antipasti: 'Antipasti', primi: 'Primi', secondi: 'Secondi', desserts: 'Desserts', drinks: 'Drinks'
    }
  };
  const t = (key) => translations[lang]?.[key] || key;

  const permissions = admin?.permissions || {};

  useEffect(() => { localStorage.setItem('dashboard_lang', lang); }, [lang]);
  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [menuRes, galleryRes] = await Promise.all([
        axios.get(`${API}/site-admin/menu`, { withCredentials: true }),
        axios.get(`${API}/site-admin/gallery`, { withCredentials: true })
      ]);
      setMenuItems(menuRes.data);
      setGallery(galleryRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const saveConfig = async () => {
    setSaving(true);
    try {
      await axios.put(`${API}/site-admin/config`, siteConfig, { withCredentials: true });
      showMessage(t('saved'));
    } catch (error) {
      showMessage(error.response?.data?.detail || t('error'), 'error');
    } finally {
      setSaving(false);
    }
  };

  const addMenuItem = async () => {
    try {
      const response = await axios.post(`${API}/site-admin/menu`, {
        category: 'main', name_nl: 'Nouveau plat', price: 0, sort_order: menuItems.length
      }, { withCredentials: true });
      setMenuItems([...menuItems, response.data]);
      showMessage(t('itemAdded'));
    } catch (error) {
      showMessage(error.response?.data?.detail || t('error'), 'error');
    }
  };

  const updateMenuItem = async (itemId, updates) => {
    try {
      await axios.put(`${API}/site-admin/menu/${itemId}`, updates, { withCredentials: true });
      setMenuItems(menuItems.map(item => item.item_id === itemId ? { ...item, ...updates } : item));
    } catch (error) {
      showMessage(error.response?.data?.detail || t('error'), 'error');
    }
  };

  const deleteMenuItem = async (itemId) => {
    if (!window.confirm(t('deleteConfirm'))) return;
    try {
      await axios.delete(`${API}/site-admin/menu/${itemId}`, { withCredentials: true });
      setMenuItems(menuItems.filter(item => item.item_id !== itemId));
      showMessage(t('deleted'));
    } catch (error) {
      showMessage(error.response?.data?.detail || t('error'), 'error');
    }
  };

  const addGalleryImage = async () => {
    const url = prompt(t('photoUrl'));
    if (!url) return;
    try {
      const response = await axios.post(`${API}/site-admin/gallery`, { url, sort_order: gallery.length }, { withCredentials: true });
      setGallery([...gallery, response.data]);
      showMessage(t('itemAdded'));
    } catch (error) {
      showMessage(error.response?.data?.detail || t('error'), 'error');
    }
  };

  const deleteGalleryImage = async (imageId) => {
    try {
      await axios.delete(`${API}/site-admin/gallery/${imageId}`, { withCredentials: true });
      setGallery(gallery.filter(img => img.image_id !== imageId));
      showMessage(t('deleted'));
    } catch (error) {
      showMessage(error.response?.data?.detail || t('error'), 'error');
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      {message && (
        <div className={`fixed top-24 right-4 z-50 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 ${message.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
          {message.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: primaryColor }}>{site?.name} - {t('management')}</h1>
              <p className="text-gray-500">{t('welcome')}, {admin.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                {['fr', 'nl', 'en'].map(l => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${lang === l ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <button onClick={onLogout} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <LogOut className="w-5 h-5" /><span>{t('logout')}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="w-56 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow p-4 space-y-1">
              <button onClick={() => setActiveTab('overview')} className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'overview' ? 'bg-gray-100 font-medium' : ''}`}>{t('overview')}</button>
              {permissions.opening_hours && <button onClick={() => setActiveTab('hours')} className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'hours' ? 'bg-gray-100 font-medium' : ''}`}>{t('openingHours')}</button>}
              {permissions.menu_items && <button onClick={() => setActiveTab('menu')} className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'menu' ? 'bg-gray-100 font-medium' : ''}`}>{t('menu')}</button>}
              {permissions.gallery && <button onClick={() => setActiveTab('gallery')} className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'gallery' ? 'bg-gray-100 font-medium' : ''}`}>{t('photos')}</button>}
            </nav>
          </div>

          <div className="flex-1 bg-white rounded-lg shadow p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold border-b pb-4">{t('overview')}</h2>
                {permissions.closure_notice && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('closureNotice')}</label>
                    <textarea value={siteConfig?.closure_notice || ''} onChange={(e) => setSiteConfig({ ...siteConfig, closure_notice: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24" placeholder={t('closurePlaceholder')} />
                    <button onClick={saveConfig} disabled={saving} className="mt-2 flex items-center space-x-2 px-4 py-2 text-white rounded-lg disabled:opacity-50" style={{ backgroundColor: primaryColor }}>
                      <Save className="w-4 h-4" /><span>{saving ? t('saving') : t('save')}</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'hours' && permissions.opening_hours && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <h2 className="text-xl font-semibold">{t('openingHours')}</h2>
                  <button onClick={saveConfig} disabled={saving} className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg disabled:opacity-50" style={{ backgroundColor: primaryColor }}>
                    <Save className="w-4 h-4" /><span>{saving ? t('saving') : t('save')}</span>
                  </button>
                </div>
                <textarea value={JSON.stringify(siteConfig?.opening_hours || {}, null, 2)}
                  onChange={(e) => { try { setSiteConfig({ ...siteConfig, opening_hours: JSON.parse(e.target.value) }); } catch (err) {} }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 h-48 font-mono text-sm" />
              </div>
            )}

            {activeTab === 'menu' && permissions.menu_items && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <h2 className="text-xl font-semibold">{t('menu')}</h2>
                  <button onClick={addMenuItem} className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg" style={{ backgroundColor: primaryColor }}>
                    <Plus className="w-4 h-4" /><span>{t('addItem')}</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {menuItems.map(item => (
                    <div key={item.item_id} className="border rounded-lg p-4 flex items-center gap-4">
                      <select value={item.category} onChange={(e) => updateMenuItem(item.item_id, { category: e.target.value })} className="border rounded px-2 py-1 text-sm">
                        <option value="antipasti">{t('antipasti')}</option>
                        <option value="primi">{t('primi')}</option>
                        <option value="secondi">{t('secondi')}</option>
                        <option value="desserts">{t('desserts')}</option>
                        <option value="drinks">{t('drinks')}</option>
                      </select>
                      <input type="text" value={item.name_nl} onChange={(e) => updateMenuItem(item.item_id, { name_nl: e.target.value })} className="flex-1 border rounded px-2 py-1" />
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-1">€</span>
                        <input type="number" step="0.50" value={item.price} onChange={(e) => updateMenuItem(item.item_id, { price: parseFloat(e.target.value) })} className="w-20 border rounded px-2 py-1" disabled={!permissions.menu_prices} />
                      </div>
                      <button onClick={() => deleteMenuItem(item.item_id)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'gallery' && permissions.gallery && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <h2 className="text-xl font-semibold">{t('photos')}</h2>
                  <button onClick={addGalleryImage} className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg" style={{ backgroundColor: primaryColor }}>
                    <Plus className="w-4 h-4" /><span>{t('addPhoto')}</span>
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {gallery.map(img => (
                    <div key={img.image_id} className="relative group">
                      <img src={img.url} alt="" className="w-full h-24 object-cover rounded-lg" />
                      <button onClick={() => deleteGalleryImage(img.image_id)} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Site Renderer Component
const SiteRenderer = ({ forcedSlug }) => {
  const { slug: paramSlug } = useParams();
  const slug = forcedSlug || paramSlug;
  const { data, loading, error } = useSiteData(slug);
  const [admin, setAdmin] = useState(null);
  const [adminSite, setAdminSite] = useState(null);

  // Check if admin is logged in for this site
  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const response = await axios.get(`${API}/site-admin/me`, { withCredentials: true });
        if (response.data?.admin && response.data?.site) {
          setAdmin(response.data.admin);
          setAdminSite(response.data.site);
        }
      } catch (err) {
        // Not logged in, that's fine
      }
    };
    checkAdminAuth();
  }, []);

  const handleLogin = (loginData) => {
    setAdmin(loginData.admin);
    setAdminSite(loginData.site);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API}/site-admin/logout`, {}, { withCredentials: true });
    } catch (err) {}
    setAdmin(null);
    setAdminSite(null);
  };

  // Check for specific site apps FIRST - render immediately without waiting for API data
  // Wrap in Routes to handle the /site/slug prefix correctly
  if (slug === 'cantina') {
    return (
      <Routes>
        <Route path="/*" element={<CantinaApp />} />
      </Routes>
    );
  }
  if (slug === 'bottega') {
    return (
      <Routes>
        <Route path="/*" element={<BottegaApp />} />
      </Routes>
    );
  }
  if (slug === 'ascoli') {
    return (
      <Routes>
        <Route path="/*" element={<AscoliApp />} />
      </Routes>
    );
  }
  if (slug === 'mercato') {
    return (
      <Routes>
        <Route path="/*" element={<MercatoApp />} />
      </Routes>
    );
  }
  if (slug === 'tracemaster') {
    return (
      <Routes>
        <Route path="/*" element={<TracemasterApp />} />
      </Routes>
    );
  }
  if (slug === 'theobeans') {
    return (
      <Routes>
        <Route path="/*" element={<TheobeansApp />} />
      </Routes>
    );
  }
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Site Niet Gevonden</h1>
          <p className="text-gray-600 mb-6">Deze website bestaat niet of is niet actief.</p>
          <Link to="/" className="text-blue-600 hover:underline">Terug naar Home</Link>
        </div>
      </div>
    );
  }

  const { site, config, menu_items, group_menus, gallery, products } = data;
  const primaryColor = config?.primary_color || '#7D3C32';
  const baseUrl = slug ? `/site/${slug}` : '';

  // If this is a product site, render the ProductSiteRenderer
  if (site?.site_type === 'product') {
    return <ProductSiteRenderer siteData={data} />;
  }

  // Check if logged in admin belongs to this site
  const isAdminForThisSite = admin && adminSite?.site_id === site?.site_id;

  return (
    <div className="min-h-screen" style={{ '--primary-color': primaryColor }}>
      <SiteNavigation site={site} config={config} primaryColor={primaryColor} />
      
      <Routes>
        <Route index element={<HomePage site={site} config={config} gallery={gallery} primaryColor={primaryColor} />} />
        <Route path="kaart" element={<MenuPage site={site} config={config} menuItems={menu_items} primaryColor={primaryColor} />} />
        <Route path="reserveren" element={<ReservationPage site={site} config={config} primaryColor={primaryColor} />} />
        <Route path="afhalen" element={<TakeawayPage site={site} config={config} primaryColor={primaryColor} />} />
        <Route path="galerie" element={<GalleryPage site={site} gallery={gallery} primaryColor={primaryColor} />} />
        <Route path="contact" element={<ContactPage site={site} config={config} primaryColor={primaryColor} />} />
        
        {/* Admin routes for this specific site */}
        <Route path="manage" element={
          isAdminForThisSite ? (
            <SiteAdminPanel 
              site={site} 
              config={config} 
              admin={admin} 
              primaryColor={primaryColor}
              onLogout={handleLogout}
            />
          ) : (
            <SiteLoginPage 
              site={site} 
              config={config} 
              primaryColor={primaryColor}
              onLogin={handleLogin}
            />
          )
        } />
        <Route path="login" element={
          isAdminForThisSite ? (
            <SiteAdminPanel 
              site={site} 
              config={config} 
              admin={admin} 
              primaryColor={primaryColor}
              onLogout={handleLogout}
            />
          ) : (
            <SiteLoginPage 
              site={site} 
              config={config} 
              primaryColor={primaryColor}
              onLogin={handleLogin}
            />
          )
        } />
        
        <Route path="*" element={<HomePage site={site} config={config} gallery={gallery} primaryColor={primaryColor} />} />
      </Routes>
      
      <SiteFooter site={site} config={config} primaryColor={primaryColor} />
    </div>
  );
};

export default SiteRenderer;
