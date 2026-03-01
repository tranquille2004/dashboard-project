import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, ChevronRight, Menu as MenuIcon, X, Download } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

// Site data fetcher
const useSiteData = (slug) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (slug) {
          const response = await axios.get(`${API}/public/site/${slug}`);
          setData(response.data);
        } else {
          // Try domain-based lookup
          const hostname = window.location.hostname;
          if (hostname !== 'localhost' && !hostname.includes('preview.emergentagent.com')) {
            const response = await axios.get(`${API}/public/site-by-domain?domain=${hostname}`);
            if (response.data) {
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

// Main Site Renderer Component
const SiteRenderer = () => {
  const { slug } = useParams();
  const { data, loading, error } = useSiteData(slug);
  
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

  const { site, config, menu_items, group_menus, gallery } = data;
  const primaryColor = config?.primary_color || '#7D3C32';
  const baseUrl = slug ? `/site/${slug}` : '';

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
        <Route path="*" element={<HomePage site={site} config={config} gallery={gallery} primaryColor={primaryColor} />} />
      </Routes>
      
      <SiteFooter site={site} config={config} primaryColor={primaryColor} />
    </div>
  );
};

export default SiteRenderer;
