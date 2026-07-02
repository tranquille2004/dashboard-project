import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ChefHat, Utensils, Wine, Menu, X } from 'lucide-react';
import { useLanguage, LanguageProvider } from './LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';
import SEO from '@/components/SEO';
import URLSync from '@/components/URLSync';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

// Track page visits - sends path to backend
const trackPageVisit = async (path) => {
  try {
    await fetch(`${API}/public/track-visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        site_slug: 'bottega',
        path: path
      })
    });
  } catch (error) {
    // Silent fail
  }
};

// Hook to track every page view
const usePageTracking = () => {
  const location = useLocation();
  
  useEffect(() => {
    trackPageVisit(location.pathname);
  }, [location.pathname]);
};

// Bordeaux color from logo
const BRAND_COLOR = '#7D3C32';
// Achtergrondkleur voor alle paginas - warm beige
const BG_COLOR = '#FAF6F1';

// BEKENDE CUSTOM DOMAINS - alleen deze krijgen lege basePath
const KNOWN_CUSTOM_DOMAINS = [
  'labottegaherent.com',
  'www.labottegaherent.com',
  'labottegaherent.be',
  'www.labottegaherent.be'
];

// Helper to detect if we're on a known custom domain
const isOnCustomDomain = () => {
  const hostname = window.location.hostname.toLowerCase();
  return KNOWN_CUSTOM_DOMAINS.includes(hostname);
};

// Get base path for links - ALLEEN leeg op bekende custom domains
const getBasePath = () => isOnCustomDomain() ? '' : '/site/bottega';

// Helper to create correct path
const getPath = (path) => {
  const basePath = getBasePath();
  if (path === '/') return basePath || '/';
  return `${basePath}${path}`;
};

// SEO Configuration for La Bottega
const SEO_CONFIG = {
  siteName: 'La Bottega Italiana Herent',
  defaultImage: '/images/bottega/gallery/bottega-exterior.jpg',
  baseUrl: 'https://labottegaherent.be',
  pages: {
    home: {
      title: 'La Bottega Italiana | Italiaans Restaurant Herent',
      description: 'La Bottega Italiana in Herent - Gezellig Italiaans restaurant met authentieke gerechten, verse pasta en pizza. Afhalen mogelijk. Reserveer nu!',
      keywords: 'Italiaans restaurant, Herent, pasta, pizza, afhalen, La Bottega, Italiaanse keuken'
    },
    kaart: {
      title: 'Menu | La Bottega Italiana Herent',
      description: 'Bekijk onze menukaart met verse Italiaanse gerechten. Pasta, pizza, antipasti en meer. Ook voor afhaal beschikbaar.',
      keywords: 'menu, kaart, pasta, pizza, Italiaans, Herent, afhalen'
    },
    groepmenus: {
      title: 'Groepmenus | La Bottega Italiana Herent',
      description: 'Speciale menu\'s voor groepen en feesten. Ideaal voor verjaardagen, familiebijeenkomsten en bedrijfsevenementen.',
      keywords: 'groepsmenu, feesten, groepen, evenementen, Herent'
    },
    reserveren: {
      title: 'Reserveren | La Bottega Italiana Herent',
      description: 'Reserveer uw tafel bij La Bottega Italiana Herent. Online reserveren of telefonisch.',
      keywords: 'reserveren, tafel, restaurant, Herent'
    }
  }
};

// ScrollToTop component - scrolls to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (e) {
      // Ignore cross-origin errors when running in iframe
    }
  }, [pathname]);

  return null;
}

// Footer component with webmaster info
function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center text-sm text-gray-400 pb-4">
          <p>&copy; {new Date().getFullYear()} La Bottega Italiana. {t('allRightsReserved')}.</p>
        </div>
        
        {/* Webmaster Section */}
        <div className="border-t border-gray-800 pt-4">
          {/* Webmaster Text */}
          <div className="text-center text-sm text-gray-400 mb-3">
            <p>{t('webmasterText')}</p>
          </div>
          
          {/* Webmaster Contact */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 flex-wrap">
            <img src="/images/fworksbuilders-logo.png" alt="f.works" className="h-5" />
            <span>Webmaster:</span>
            <a
              href="https://www.fworksbuilders.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors font-medium"
            >
              fworksbuilders bv.
            </a>
            <span>—</span>
            <a href="https://wa.me/32494516064" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
              +32 494 51 60 64 (WhatsApp)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Navigation({ activeSection, scrollToSection }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Use the global getPath function - no local override needed

  const handleNavClick = (path, sectionId) => {
    if (path) {
      navigate(getPath(path));
    } else if (sectionId) {
      // Check if we're on homepage
      const isHomepage = location.pathname === '/' || 
                         location.pathname === '/site/bottega' || 
                         location.pathname === '/site/bottega/';
      if (isHomepage) {
        // We're on homepage, scroll to section
        if (scrollToSection) {
          scrollToSection(sectionId);
        }
      } else {
        // We're on another page, navigate to homepage first
        navigate(getPath('/'), { state: { scrollTo: sectionId } });
        // After navigation, scroll to section
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to={getPath('/')} className="flex items-center space-x-2">
            <img src="/images/logo.jpg" alt="La Bottega Italiana" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">La Bottega Italiana</h1>
              <p className="text-xs text-gray-600">Herent</p>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to={getPath('/')} className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('home')}</Link>
            <Link to={getPath('/over-ons')} className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('about')}</Link>
            <Link to={getPath('/kaart')} className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('menu')}</Link>
            <Link to={getPath('/galerie')} className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('gallery')}</Link>
            <Link to={getPath('/groepmenus')} className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('groupMenus')}</Link>
            <Link to={getPath('/openingstijden')} className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('hours')}</Link>
            <Link to={getPath('/contact')} className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('contact')}</Link>
            <LanguageSwitcher />
          </div>
          
          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link to={getPath('/reserveren')} className="bg-[#7D3C32] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#6A3229] transition-colors shadow-lg hover:shadow-xl">
              {t('reserve')}
            </Link>
            <Link to={getPath('/afhalen')} className="bg-white text-[#7D3C32] border-2 border-[#7D3C32] px-5 py-2.5 rounded-lg font-medium hover:bg-[#7D3C32] hover:text-white transition-colors shadow-lg hover:shadow-xl">
              {t('takeaway')}
            </Link>
          </div>

          {/* Mobile: Language Switcher + Hamburger */}
          <div className="lg:hidden flex items-center space-x-3">
            <LanguageSwitcher />
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-7 w-7 text-[#7D3C32]" strokeWidth={2.5} />
              ) : (
                <Menu className="h-7 w-7 text-[#7D3C32]" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link to={getPath('/')} onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('home')}</Link>
              <Link to={getPath('/over-ons')} onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('about')}</Link>
              <Link to={getPath('/kaart')} onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('menu')}</Link>
              <Link to={getPath('/galerie')} onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('gallery')}</Link>
              <Link to={getPath('/groepmenus')} onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('groupMenus')}</Link>
              <Link to={getPath('/openingstijden')} onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('hours')}</Link>
              <Link to={getPath('/contact')} onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('contact')}</Link>
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <Link to={getPath('/reserveren')} onClick={() => setMobileMenuOpen(false)} className="bg-[#7D3C32] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#6A3229] transition-colors text-center">
                  {t('reserve')}
                </Link>
                <Link to={getPath('/afhalen')} onClick={() => setMobileMenuOpen(false)} className="bg-white text-[#7D3C32] border-2 border-[#7D3C32] px-5 py-3 rounded-lg font-medium hover:bg-[#7D3C32] hover:text-white transition-colors text-center">
                  {t('takeaway')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function HomePage() {
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const { t } = useLanguage();
  const location = useLocation();

  // Handle scroll to section when coming from another page
  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      // Clear the state
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'menu', 'hours', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <SEO 
        title={SEO_CONFIG.pages.home.title}
        description={SEO_CONFIG.pages.home.description}
        keywords={SEO_CONFIG.pages.home.keywords}
        image={SEO_CONFIG.defaultImage}
        url={SEO_CONFIG.baseUrl}
        siteName={SEO_CONFIG.siteName}
      />
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src="/images/gallery1.jpg" alt="Restaurant Interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6" data-testid="hero-title">{t('heroTitle')}</h1>
          <p className="text-xl md:text-2xl mb-8 font-light">{t('heroSubtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={getPath('/reserveren')} className="bg-[#7D3C32] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#6A3229] transition-all shadow-lg hover:shadow-2xl transform hover:scale-105" data-testid="reserve-table-btn">
              {t('reserveTable')}
            </Link>
            <Link to={getPath('/afhalen')} className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-2xl transform hover:scale-105" data-testid="takeaway-btn">
              {t('orderTakeaway')}
            </Link>
          </div>
        </div>
      </section>

      {/* Holiday Closure Notice */}
      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('aboutTitle')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('aboutText')}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all">
              <img src="/images/new-photo21.jpg" alt="Italiaanse Kwaliteit" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <ChefHat className="w-12 h-12 text-[#7D3C32]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('feature1Title')}</h3>
                <p className="text-gray-600">{t('feature1Text')}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all">
              <img src="/images/new-photo23.jpg" alt="Verse Bereiding" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Utensils className="w-12 h-12 text-[#7D3C32]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('feature2Title')}</h3>
                <p className="text-gray-600">{t('feature2Text')}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all">
              <img src="/images/gallery4.jpg" alt="Elegante Ambiance" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Wine className="w-12 h-12 text-[#7D3C32]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('feature3Title')}</h3>
                <p className="text-gray-600">{t('feature3Text')}</p>
              </div>
            </div>
          </div>

          {/* Removed - Gallery moved to separate page */}
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('menuTitle')}</h2>
            <p className="text-lg text-gray-600">{t('menuSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link to={getPath('/kaart')} className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-xl transition-all transform hover:scale-105" data-testid="menu-card-link">
              <div className="flex justify-center mb-4">
                <Utensils className="w-16 h-16 text-[#7D3C32]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('ourMenu')}</h3>
              <p className="text-gray-600 mb-4">{t('viewMenu')}</p>
              <span className="text-[#7D3C32] font-semibold">{t('viewMenuLink')}</span>
            </Link>

            <Link to={getPath('/groepmenus')} className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-xl transition-all transform hover:scale-105" data-testid="group-menu-link">
              <div className="flex justify-center mb-4">
                <Wine className="w-16 h-16 text-[#7D3C32]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('groupMenus')}</h3>
              <p className="text-gray-600 mb-4">{t('groupMenusText')}</p>
              <span className="text-[#7D3C32] font-semibold">{t('viewGroupMenus')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Opening Hours - Compact Layout */}
      <section id="hours" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('hoursTitle')}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Opening Hours */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('openingHours')}</h3>
              <div className="space-y-3" data-testid="opening-hours">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{t('monSat')}</span>
                  <span className="text-gray-600">18:00 - 21:30</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{t('sun')}</span>
                  <span className="text-gray-600">12:00 - 14:00, 18:00 - 21:30</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">{t('takeawayInfo')}</p>
              </div>
            </div>

            {/* Right Column - Important Info */}
            <div className="space-y-6">
              <div className="bg-[#7D3C32] text-white rounded-lg shadow-lg p-8">
                <div className="flex items-start space-x-4">
                  <Clock className="w-8 h-8 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{t('pizzas')}</h3>
                    <p className="text-white/90">{t('pizzasText')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-8 h-8 text-[#7D3C32] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('closedOn')}</h3>
                    <p className="text-gray-600">{t('closedDays')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('contactTitle')}</h2>
            <p className="text-lg text-gray-600">{t('contactSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6" data-testid="contact-info">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-[#7D3C32] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{t('address')}</h3>
                  <p className="text-gray-600">Wilselsesteenweg 93</p>
                  <p className="text-gray-600">3020 Herent (Leuven)</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-[#7D3C32] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{t('phone')}</h3>
                  <a href="tel:+3216600421" className="text-gray-600 hover:text-[#7D3C32] transition-colors">
                    +32 16 60 04 21
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-[#7D3C32] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{t('email')}</h3>
                  <a href="mailto:bottega@mail.be" className="text-gray-600 hover:text-[#7D3C32] transition-colors">
                    bottega@mail.be
                  </a>
                  <p className="text-sm text-gray-500 mt-1">{t('emailNote')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <svg className="w-6 h-6 text-[#7D3C32] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{t('website')}</h3>
                  <a href="https://www.labottegaherent.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#7D3C32] transition-colors">
                    www.labottegaherent.com
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">BTW nummer: BE682764984</p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg h-96">
              <iframe
                title="Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.8!2d4.6709!3d50.9247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c161f0e0e0e0e0%3A0x0!2sWilselsesteenweg%2093%2C%203020%20Herent!5e0!3m2!1snl!2sbe!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#7D3C32] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('ctaTitle')}</h2>
          <p className="text-xl mb-8">{t('ctaSubtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={getPath('/reserveren')} className="bg-white text-[#7D3C32] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-2xl transform hover:scale-105" data-testid="cta-reserve-btn">
              {t('reserveTable')}
            </Link>
            <Link to={getPath('/afhalen')} className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#7D3C32] transition-all shadow-lg hover:shadow-2xl transform hover:scale-105" data-testid="cta-takeaway-btn">
              {t('orderTakeaway')}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">La Bottega Italiana</h3>
            <p className="text-gray-400">{t('restaurantType')}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 mb-6 text-sm text-gray-400">
            <span>Wilselsesteenweg 93, 3020 Herent</span>
            <span>•</span>
            <a href="tel:+3216600421" className="hover:text-white transition-colors">+32 16 60 04 21</a>
            <span>•</span>
            <a href="mailto:bottega@mail.be" className="hover:text-white transition-colors">bottega@mail.be</a>
          </div>
          <div className="mb-4">
            <a href="https://www.labottegaherent.com" className="text-gray-400 hover:text-white transition-colors">www.labottegaherent.com</a>
          </div>
          <div className="border-t border-gray-800 pt-6 pb-4 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} La Bottega Italiana. {t('allRightsReserved')}.</p>
          </div>
          
          {/* Webmaster Section */}
          <div className="border-t border-gray-800 pt-4">
            {/* Webmaster Text */}
            <div className="text-center text-sm text-gray-400 mb-3">
              <p>{t('webmasterText')}</p>
            </div>
            
            {/* Webmaster Contact */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 flex-wrap">
              <img src="/images/fworksbuilders-logo.png" alt="f.works" className="h-5" />
              <span>Webmaster:</span>
              <a
                href="https://www.fworksbuilders.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors font-medium"
              >
                fworksbuilders bv.
              </a>
              <span>—</span>
              <a href="https://wa.me/32494516064" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                +32 494 51 60 64 (WhatsApp)
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ReserverenPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('reservePageTitle')}</h1>
            <p className="text-lg text-gray-600">{t('reservePageSubtitle')}</p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-4 md:p-8">
            <iframe
              src="https://form.jotform.com/222292165889366"
              title="Reserveren Formulier"
              style={{
                width: '100%',
                minHeight: '800px',
                border: 'none',
              }}
              scrolling="yes"
            />
          </div>

          <div className="mt-8 text-center">
            <Link to={getPath('/')} className="text-[#7D3C32] hover:underline font-medium">
              ← Terug naar Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function AfhalenPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('takeawayPageTitle')}</h1>
            <p className="text-lg text-gray-600">{t('takeawayPageSubtitle')}</p>
          </div>
          
          <div className="bg-[#FFF4E6] border-l-4 border-[#7D3C32] p-6 mb-8 rounded">
            <p className="text-[#7D3C32] font-medium">
              <span className="font-bold">Pizza's</span> alleen beschikbaar in de avonden!
            </p>
          </div>

          <div className="mb-6 text-center">
            <Link to={getPath('/kaart')} className="text-[#7D3C32] hover:underline font-bold text-lg">
              KLIK HIER VOOR DE KAART →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-4 md:p-8">
            <iframe
              src="https://form.jotform.com/222305012976349"
              title="Afhalen Formulier"
              style={{
                width: '100%',
                minHeight: '800px',
                border: 'none',
              }}
              scrolling="yes"
            />
          </div>

          <div className="mt-8 text-center">
            <Link to={getPath('/')} className="text-[#7D3C32] hover:underline font-medium">
              ← Terug naar Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function KaartPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('ourMenu')}</h1>
            <p className="text-lg text-gray-600 mb-8">Onze kaart (ter plaatse en ook afhalen) / Notre carte (sur place et aussi pour emporter)</p>
            
            {/* Download Button */}
            <div className="flex justify-center mb-8">
              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/images/bottega/kaart-bottega.pdf';
                  link.download = 'La-Bottega-Kaart.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="inline-flex items-center justify-center bg-[#7D3C32] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#6A3229] transition-all shadow-lg hover:shadow-xl cursor-pointer"
                data-testid="kaart-download-btn"
              >
                📥 Download Kaart PDF
              </button>
            </div>
          </div>

          {/* PDF Viewer - Gecentreerd */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-6 mx-auto" style={{ maxWidth: '900px' }}>
            <iframe
              src="/images/bottega/kaart-bottega.pdf"
              className="w-full"
              style={{ height: '1200px', border: 'none' }}
              title="La Bottega Kaart"
            >
              <div className="p-8 text-center">
                <p className="text-gray-600 mb-4">
                  PDF kan niet worden weergegeven in uw browser.
                </p>
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/images/bottega/kaart-bottega.pdf';
                    link.download = 'La-Bottega-Kaart.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="inline-flex items-center justify-center bg-[#7D3C32] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6A3229] transition-all"
                >
                  📥 Download Kaart PDF
                </button>
              </div>
            </iframe>
          </div>

          <div className="mt-8 text-center">
            <Link to={getPath('/')} className="text-[#7D3C32] hover:underline font-medium text-lg">
              {t('backToHome')}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function GroepmenusPage() {
  const { t } = useLanguage();

  const menus = [
    {
      id: 1,
      price: "€45,-",
      items: [
        { name: "Rundercarpaccio met raketsalade en parmezaanse kaas / Carpaccio de boeuf, roquette et parmesan / Beefcarpaccio with arugula salad and parmesan cheese" },
        { name: "Gemarineerde zalm / Saumon mariné / Marinated salmon" },
        { name: "Parmigiana: Gegratineerde aubergines met gerookte mozzarella" },
        { name: "Antipasto 'della Bottega': Italiaanse charcuterie, kaas" },
      ],
      main: [
        { name: "Ravioli al Tartufo: Ravioli met truffel" },
        { name: "Gebraden zalm met grof zout, purée van spinazie, spumante saus" },
        { name: "Involtino di vitello: Kalfsrollade gevuld met hesp en kaas, portsaus, rozijnen, pijnboompitten en pasta" },
      ],
      wine: false,
    },
    {
      id: 2,
      price: "€55,-",
      items: [
        { name: "Triologie van zeecarpaccio: zwaardvis, tonijn, zalm" },
        { name: "Parmaham met burratina" },
        { name: "Sapori 'La Bottega': Rundercarpaccio, vitello tonnato, Parmaham" },
        { name: "Scampi met truffel en groene asperges" },
      ],
      main: [
        { name: "Tagliata: Runderlapje op een bedje van rucola en parmezaanse kaas" },
        { name: "Millefeuille van kabeljauw met gerookte zalm, groene kool en purée met kreeftensaus" },
        { name: "Trio van verse pasta 'Bottega': ravioli met truffel, tortelloni met ricotta, tagliatelle met paddenstoelen en parmaham" },
      ],
      wine: true,
    },
    {
      id: 3,
      price: "€65,-",
      items: [
        { name: "Vitello Tonnato: Kalfslapje, crème van tonijn, ansjovis, mayonnaise en kappertjes" },
        { name: "Gerookte zalm / Saumon fumé / Smoked salmon" },
        { name: "Ravioli met kreeft / Ravioli de homard / Lobster ravioli" },
        { name: "Salade van ganzenlever, sperziebonen, venkel en zoet-zure vinaigrette" },
      ],
      main: [
        { name: "Runderfilet Rossini: Ganzenlever met rodewijnsaus, aardappelen en seizoensgroenten" },
        { name: "Ravioli met ganzenlever, porto saus, kalfszwezerik" },
        { name: "Gegrilde vissoorten met salade" },
      ],
      wine: true,
    },
  ];

  // Define single subtle color for all menu cards
  const menuColors = [
    { bg: 'bg-white', text: 'text-[#7D3C32]', border: 'border-[#7D3C32]', textColor: 'text-gray-700' },
    { bg: 'bg-white', text: 'text-[#7D3C32]', border: 'border-[#7D3C32]', textColor: 'text-gray-700' },
    { bg: 'bg-white', text: 'text-[#7D3C32]', border: 'border-[#7D3C32]', textColor: 'text-gray-700' }
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#7D3C32] mb-4">{t('groupMenusPageTitle')}</h1>
            <p className="text-lg text-gray-600 mb-2">{t('groupMenusPageSubtitle')}</p>
            <div className="w-20 h-1 bg-[#7D3C32] mx-auto my-6"></div>
            <div className="flex flex-col items-center gap-4 mt-8">
              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/images/bottega/groepmenus-bottega.pdf';
                  link.download = 'La-Bottega-Groepmenus.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="inline-flex items-center justify-center bg-[#7D3C32] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#6A3229] transition-all shadow-lg hover:shadow-xl cursor-pointer"
                data-testid="groepmenus-download-btn"
              >
                📥 Download Groepmenus PDF
              </button>
              <Link 
                to={getPath('/reserveren')}
                className="inline-flex items-center justify-center bg-[#D4A574] text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-[#C49564] transition-all shadow-lg hover:shadow-xl"
              >
                Reserveer voor groepen
              </Link>
            </div>
          </div>

          {/* Menus - Three cards side by side */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {menus.map((menu, menuIdx) => (
              <div key={menu.id} className={`${menuColors[menuIdx].bg} rounded-lg shadow-2xl overflow-hidden border-2 ${menuColors[menuIdx].border}`}>
                {/* Menu Header */}
                <div className="p-6 border-b border-gray-200 text-center">
                  <h2 className={`text-2xl font-bold ${menuColors[menuIdx].text} mb-2`}>Menu {menu.id}</h2>
                  <div className="text-4xl font-bold text-gray-800">{menu.price}</div>
                </div>

                {/* Menu Content */}
                <div className="p-6">
                  {/* Aperitivo */}
                  <div className="mb-6">
                    <h3 className={`text-lg font-semibold ${menuColors[menuIdx].text} mb-4 text-center`}>Aperitivo (spumante)</h3>
                    <div className="space-y-3">
                      {menu.items.map((item, idx) => (
                        <div key={idx}>
                          <p className="text-sm leading-relaxed text-center text-gray-700">{item.name}</p>
                          {idx < menu.items.length - 1 && (
                            <div className="text-center my-2 text-xs text-gray-500">
                              OF / OU / OR
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="text-center my-6 text-[#7D3C32] font-bold text-lg">--O--</div>

                  {/* Main Course */}
                  <div className="mb-6">
                    <div className="space-y-3">
                      {menu.main.map((item, idx) => (
                        <div key={idx}>
                          <p className="text-sm leading-relaxed text-center text-gray-700">{item.name}</p>
                          {idx < menu.main.length - 1 && (
                            <div className="text-center my-2 text-xs text-gray-500">
                              OF / OU / OR
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="text-center my-6 text-[#7D3C32] font-bold text-lg">--O--</div>

                  {/* Dessert */}
                  <div className="mb-6">
                    <p className="text-sm text-center text-gray-700">{t('surprise')}</p>
                  </div>

                  {/* Wine Inclusion */}
                  {menu.wine && (
                    <div className="bg-white/10 p-4 rounded-lg text-center mt-6 border border-white/20">
                      <p className={`${menuColors[menuIdx].text} font-bold text-sm`}>{t('wineIncluded')}</p>
                      <p className="text-white/70 text-xs mt-1">½ bouteille de vin par personne • ½ bottle per person of housewine</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Minimum Persons Note */}
          <div className="text-center p-6">
            <p className="font-bold text-lg text-gray-300">{t('minimumPersons')}</p>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link to={getPath('/')} className="text-[#D4A574] hover:text-[#C49564] font-medium text-lg transition-colors">
              ← {t('backToHome')}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function GaleriePage() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/images/gallery5.jpg",
    "/images/gallery6.jpg",
    "/images/gallery1.jpg",
    "/images/new-photo1.jpg",
    "/images/new-photo2.jpg",
    "/images/new-photo3.jpg",
    "/images/new-photo4.jpg",
    "/images/new-photo5.jpg",
    "/images/new-photo6.jpg",
    "/images/new-photo7.jpg",
    "/images/new-photo8.jpg",
    "/images/new-photo9.jpg",
    "/images/new-photo10.jpg",
    "/images/new-photo11.webp",
    "/images/new-photo12.webp",
    "/images/new-photo13.webp",
    "/images/new-photo14.webp",
    "/images/new-photo15.webp",
    "/images/new-photo16.webp",
    "/images/new-photo17.jpg",
    "/images/new-photo18.jpg",
    "/images/new-photo19.jpg",
    "/images/new-photo20.jpg",
    "/images/new-photo21.jpg",
    "/images/new-photo22.jpg",
    "/images/new-photo23.jpg",
  ];

  const openLightbox = (index) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('galleryPageTitle')}</h1>
            <p className="text-lg text-gray-600">{t('galleryPageSubtitle')}</p>
          </div>

          {/* All Photos Together */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <img 
                key={index}
                src={image} 
                alt={`Photo ${index + 1}`} 
                className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-all hover:scale-105 cursor-pointer" 
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div 
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button 
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-60"
              >
                ×
              </button>

              {/* Previous Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 text-white text-5xl hover:text-gray-300 z-60"
              >
                ‹
              </button>

              {/* Image */}
              <img 
                src={selectedImage} 
                alt="Enlarged" 
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Next Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 text-white text-5xl hover:text-gray-300 z-60"
              >
                ›
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to={getPath('/')} className="text-[#7D3C32] hover:underline font-medium text-lg">
              {t('backToHome')}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ConfirmationPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <style>{`
        @keyframes heartbeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
          75% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
      <Navigation />
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Success Icon with Heartbeat Animation */}
          <div className="text-center mb-8">
            <div 
              className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6"
              style={{ animation: 'heartbeat 1.5s ease-in-out infinite' }}
            >
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Bedankt, uw reservatie is bevestigd!
            </h1>
          </div>

          {/* Important Messages */}
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <div className="space-y-8">
              {/* Message 1 */}
              <div className="text-center border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-bold text-[#7D3C32] mb-3">
                  WIJ CONTACTEREN U NIET
                </h2>
                <p className="text-lg text-gray-700">
                  tenzij wij bijkomende vragen hebben of vol zijn.
                </p>
              </div>

              {/* Message 2 */}
              <div className="text-center border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-bold text-[#7D3C32] mb-3">
                  Om dubbele reservaties te vermijden, aub BEL ONS NIET voor deze aanvraag!
                </h2>
                <p className="text-lg text-gray-700">
                  Wij bekijken onze email de gehele dag dus uw aanvraag is genoteerd.
                </p>
              </div>

              {/* Message 3 */}
              <div className="text-center">
                <p className="text-xl font-semibold text-gray-800">
                  Wij openen nooit voor 12u s'middags of 18u s'avonds
                </p>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Link 
              to={getPath('/')}
              className="inline-block bg-[#7D3C32] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#6A3229] transition-all shadow-lg hover:shadow-xl"
            >
              Klik hier om terug te gaan naar de site
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Confirmation2Page() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Bedankt voor uw bestelling!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Uw afhaalbestelling is succesvol ontvangen
            </p>
          </div>

          {/* Confirmation Details */}
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <div className="border-l-4 border-[#7D3C32] pl-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Wat gebeurt er nu?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#7D3C32] text-white rounded-full flex items-center justify-center font-bold mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Bevestiging per e-mail</h3>
                    <p className="text-gray-600">U ontvangt binnen enkele minuten een bevestiging op het opgegeven e-mailadres.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#7D3C32] text-white rounded-full flex items-center justify-center font-bold mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Bereiding van uw bestelling</h3>
                    <p className="text-gray-600">Onze chef-kok bereidt uw bestelling vers voor u klaar.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#7D3C32] text-white rounded-full flex items-center justify-center font-bold mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Afhalen</h3>
                    <p className="text-gray-600">Uw bestelling kan worden afgehaald op de afgesproken tijd bij La Bottega Italiana.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Info */}
            <div className="bg-[#FFF4E6] border-l-4 border-[#7D3C32] p-6 rounded">
              <h3 className="font-bold text-[#7D3C32] mb-2">Belangrijk om te weten:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Alleen in geval van urgente vragen kunt u ons bellen over deze bestelling op +32 16 60 04 21</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Nooit bellen voor een bevestiging van deze aanvraag aub! Alles is bevestigd via het systeem.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Houd uw bevestiging bij de hand bij het afhalen</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Restaurant Info */}
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Afhaaladres</h2>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-center">
                <MapPin className="w-5 h-5 text-[#7D3C32] mr-3" />
                <span>Wilselsesteenweg 93, 3020 Herent</span>
              </p>
              <p className="flex items-center">
                <Phone className="w-5 h-5 text-[#7D3C32] mr-3" />
                <a href="tel:+3216600421" className="hover:text-[#7D3C32] transition-colors">+32 16 60 04 21</a>
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <Link 
              to={getPath('/')}
              className="inline-block bg-[#7D3C32] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#6A3229] transition-all shadow-lg hover:shadow-xl"
            >
              Terug naar Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function OverOnsPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <Navigation />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#7D3C32] mb-4">{t('aboutTitle')}</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {t('aboutText')}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all">
              <img src="/images/new-photo21.jpg" alt="Italiaanse Kwaliteit" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <ChefHat className="w-12 h-12 text-[#7D3C32]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('feature1Title')}</h3>
                <p className="text-gray-600">{t('feature1Text')}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all">
              <img src="/images/new-photo23.jpg" alt="Verse Bereiding" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Utensils className="w-12 h-12 text-[#7D3C32]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('feature2Title')}</h3>
                <p className="text-gray-600">{t('feature2Text')}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all">
              <img src="/images/gallery4.jpg" alt="Elegante Ambiance" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Wine className="w-12 h-12 text-[#7D3C32]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('feature3Title')}</h3>
                <p className="text-gray-600">{t('feature3Text')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function OpeningstijdenPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <Navigation />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#7D3C32] mb-4">{t('hoursTitle')}</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Opening Hours */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('openingHours')}</h3>
              <div className="space-y-4" data-testid="opening-hours">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">{t('monSat')}</span>
                  <span className="text-gray-600">18:00 - 21:30</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 font-medium">{t('sun')}</span>
                  <span className="text-gray-600">12:00 - 14:00, 18:00 - 21:30</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">{t('takeawayInfo')}</p>
              </div>
            </div>

            {/* Right Column - Important Info */}
            <div className="space-y-6">
              <div className="bg-[#7D3C32] text-white rounded-lg shadow-lg p-8">
                <div className="flex items-start space-x-4">
                  <Clock className="w-8 h-8 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{t('pizzas')}</h3>
                    <p className="text-white/90">{t('pizzasText')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-8 h-8 text-[#7D3C32] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('closedOn')}</h3>
                    <p className="text-gray-600">{t('closedDays')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ContactPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <Navigation />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#7D3C32] mb-4">{t('contactTitle')}</h1>
            <p className="text-lg text-gray-700">{t('contactSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 bg-white rounded-lg shadow-lg p-8" data-testid="contact-info">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-[#7D3C32] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{t('address')}</h3>
                  <p className="text-gray-600">Wilselsesteenweg 93</p>
                  <p className="text-gray-600">3020 Herent (Leuven)</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-[#7D3C32] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{t('phone')}</h3>
                  <a href="tel:+3216600421" className="text-gray-600 hover:text-[#7D3C32] transition-colors">
                    +32 16 60 04 21
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-[#7D3C32] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{t('email')}</h3>
                  <a href="mailto:bottega@mail.be" className="text-gray-600 hover:text-[#7D3C32] transition-colors">
                    bottega@mail.be
                  </a>
                  <p className="text-sm text-gray-500 mt-1">{t('emailNote')}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">BTW nummer: BE682764984</p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg h-96">
              <iframe
                title="Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.8!2d4.6709!3d50.9247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c161f0e0e0e0e0%3A0x0!2sWilselsesteenweg%2093%2C%203020%20Herent!5e0!3m2!1snl!2sbe!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Inner component that uses the tracking hook
function BottegaAppInner() {
  // Track every page view
  usePageTracking();
  
  return (
    <>
      <ScrollToTop />
      <URLSync />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="over-ons" element={<OverOnsPage />} />
        <Route path="openingstijden" element={<OpeningstijdenPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="kaart" element={<KaartPage />} />
        <Route path="galerie" element={<GaleriePage />} />
        <Route path="groepmenus" element={<GroepmenusPage />} />
        <Route path="reserveren" element={<ReserverenPage />} />
        <Route path="afhalen" element={<AfhalenPage />} />
        <Route path="confirmation" element={<ConfirmationPage />} />
        <Route path="confirmation2" element={<Confirmation2Page />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}

function BottegaApp() {
  const [siteConfig, setSiteConfig] = useState(null);

  useEffect(() => {
    axios.get(`${API}/public/site/bottega`)
      .then(res => setSiteConfig(res.data?.config))
      .catch(() => {});
  }, []);

  return (
    <LanguageProvider>
      <AnnouncementBanner
        message={siteConfig?.special_announcement}
        type={siteConfig?.special_announcement_type || 'info'}
        active={siteConfig?.special_announcement_active}
      />
      <BottegaAppInner />
    </LanguageProvider>
  );
}

export default BottegaApp;