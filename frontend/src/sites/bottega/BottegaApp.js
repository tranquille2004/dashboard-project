// Bottega site wrapper voor multi-tenant app
// Originele code van GitHub repo tranquille2004/Bottega

import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ChefHat, Utensils, Wine } from 'lucide-react';
import { useLanguage, LanguageProvider } from './LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';

const BASE_PATH = '/site/bottega';

// Bordeaux color from logo
const BRAND_COLOR = '#7D3C32';

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Footer component
function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center text-sm text-gray-400 pb-4">
          <p>&copy; {new Date().getFullYear()} La Bottega Italiana. {t('allRightsReserved')}.</p>
        </div>
        <div className="border-t border-gray-800 pt-4">
          <div className="text-center text-sm text-gray-400 mb-3">
            <p>{t('webmasterText')}</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <img src="/images/fworksbuilders-logo.png" alt="f.works" className="h-5" />
            <span>Webmaster: fworksbuilders bv. </span>
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
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (path, sectionId) => {
    if (path) {
      navigate(path);
    } else if (sectionId) {
      if (window.location.pathname === BASE_PATH || window.location.pathname === BASE_PATH + '/') {
        if (scrollToSection) scrollToSection(sectionId);
      } else {
        navigate(BASE_PATH, { state: { scrollTo: sectionId } });
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to={BASE_PATH} className="flex items-center space-x-2">
            <img src="/images/logo.jpg" alt="La Bottega Italiana" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">La Bottega Italiana</h1>
              <p className="text-xs text-gray-600">Herent</p>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-6">
            <button onClick={() => handleNavClick(BASE_PATH, null)} className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('home')}</button>
            <button onClick={() => handleNavClick(null, 'about')} className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('about')}</button>
            <Link to={`${BASE_PATH}/kaart`} className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('menu')}</Link>
            <Link to={`${BASE_PATH}/galerie`} className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('gallery')}</Link>
            <Link to={`${BASE_PATH}/groepmenus`} className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('groupMenus')}</Link>
            <button onClick={() => handleNavClick(null, 'hours')} className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('hours')}</button>
            <button onClick={() => handleNavClick(null, 'contact')} className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('contact')}</button>
            <LanguageSwitcher />
          </div>
          
          <div className="hidden lg:flex items-center space-x-3">
            <Link to={`${BASE_PATH}/reserveren`} className="bg-[#7D3C32] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#6A3229] transition-colors shadow-lg">{t('reserve')}</Link>
            <Link to={`${BASE_PATH}/afhalen`} className="bg-white text-[#7D3C32] border-2 border-[#7D3C32] px-5 py-2.5 rounded-lg font-medium hover:bg-[#7D3C32] hover:text-white transition-colors shadow-lg">{t('takeaway')}</Link>
          </div>

          <div className="lg:hidden flex items-center space-x-3">
            <LanguageSwitcher />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md text-gray-700 hover:text-[#7D3C32]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <button onClick={() => handleNavClick(BASE_PATH, null)} className="text-left py-2 text-sm font-medium text-gray-700">{t('home')}</button>
              <button onClick={() => handleNavClick(null, 'about')} className="text-left py-2 text-sm font-medium text-gray-700">{t('about')}</button>
              <Link to={`${BASE_PATH}/kaart`} onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium text-gray-700">{t('menu')}</Link>
              <Link to={`${BASE_PATH}/galerie`} onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium text-gray-700">{t('gallery')}</Link>
              <Link to={`${BASE_PATH}/groepmenus`} onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium text-gray-700">{t('groupMenus')}</Link>
              <button onClick={() => handleNavClick(null, 'hours')} className="text-left py-2 text-sm font-medium text-gray-700">{t('hours')}</button>
              <button onClick={() => handleNavClick(null, 'contact')} className="text-left py-2 text-sm font-medium text-gray-700">{t('contact')}</button>
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <Link to={`${BASE_PATH}/reserveren`} onClick={() => setMobileMenuOpen(false)} className="bg-[#7D3C32] text-white px-6 py-3 rounded-lg font-medium text-center">{t('reserve')}</Link>
                <Link to={`${BASE_PATH}/afhalen`} onClick={() => setMobileMenuOpen(false)} className="bg-white text-[#7D3C32] border-2 border-[#7D3C32] px-5 py-3 rounded-lg font-medium text-center">{t('takeaway')}</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Import originele pagina's code uit App.js
// Dit is een vereenvoudigde versie - de volledige code staat in het originele App.js bestand
function HomePage() {
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
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
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src="/images/gallery1.jpg" alt="Restaurant Interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{t('heroTitle')}</h1>
          <p className="text-xl md:text-2xl mb-8 font-light">{t('heroSubtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={`${BASE_PATH}/reserveren`} className="bg-[#7D3C32] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#6A3229] transition-all shadow-lg">{t('reserveTable')}</Link>
            <Link to={`${BASE_PATH}/afhalen`} className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg">{t('orderTakeaway')}</Link>
          </div>
        </div>
      </section>

      {/* Holiday Closure Notice */}
      <div className="bg-[#FFF4E6] border-l-4 border-[#7D3C32] py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[#7D3C32] font-medium"><span className="font-bold">{t('letOp')}</span> {t('closureNotice')}</p>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('aboutTitle')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('aboutText')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all">
              <img src="/images/new-photo21.jpg" alt="Italiaanse Kwaliteit" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4"><ChefHat className="w-12 h-12 text-[#7D3C32]" /></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('feature1Title')}</h3>
                <p className="text-gray-600">{t('feature1Text')}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all">
              <img src="/images/new-photo23.jpg" alt="Verse Bereiding" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4"><Utensils className="w-12 h-12 text-[#7D3C32]" /></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('feature2Title')}</h3>
                <p className="text-gray-600">{t('feature2Text')}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all">
              <img src="/images/gallery4.jpg" alt="Elegante Ambiance" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4"><Wine className="w-12 h-12 text-[#7D3C32]" /></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('feature3Title')}</h3>
                <p className="text-gray-600">{t('feature3Text')}</p>
              </div>
            </div>
          </div>
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
            <Link to={`${BASE_PATH}/kaart`} className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-xl transition-all transform hover:scale-105">
              <div className="flex justify-center mb-4"><Utensils className="w-16 h-16 text-[#7D3C32]" /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('ourMenu')}</h3>
              <p className="text-gray-600 mb-4">{t('viewMenu')}</p>
              <span className="text-[#7D3C32] font-semibold">{t('viewMenuLink')}</span>
            </Link>
            <Link to={`${BASE_PATH}/groepmenus`} className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-xl transition-all transform hover:scale-105">
              <div className="flex justify-center mb-4"><Wine className="w-16 h-16 text-[#7D3C32]" /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('groupMenus')}</h3>
              <p className="text-gray-600 mb-4">{t('groupMenusText')}</p>
              <span className="text-[#7D3C32] font-semibold">{t('viewGroupMenus')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Hours Section */}
      <section id="hours" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('hoursTitle')}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('openingHours')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center"><span className="text-gray-700 font-medium">{t('monTue')}</span><span className="text-gray-600">18:00 - 22:00</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-700 font-medium">{t('wedFri')}</span><span className="text-gray-600">12:00 - 14:00, 18:00 - 22:00</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-700 font-medium">{t('sat')}</span><span className="text-gray-600">18:00 - 22:00</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-700 font-medium">{t('sun')}</span><span className="text-gray-600">12:00 - 14:00, 18:00 - 22:00</span></div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">{t('takeawayInfo')}</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-[#7D3C32] text-white rounded-lg shadow-lg p-8">
                <div className="flex items-start space-x-4">
                  <Clock className="w-8 h-8 flex-shrink-0 mt-1" />
                  <div><h3 className="text-xl font-bold mb-2">{t('pizzas')}</h3><p className="text-white/90">{t('pizzasText')}</p></div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-8 h-8 text-[#7D3C32] flex-shrink-0 mt-1" />
                  <div><h3 className="text-xl font-bold text-gray-900 mb-2">{t('closedOn')}</h3><p className="text-gray-600">{t('closedDays')}</p></div>
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
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-[#7D3C32] flex-shrink-0 mt-1" />
                <div><h3 className="font-bold text-gray-900 mb-1">{t('address')}</h3><p className="text-gray-600">Wilselsesteenweg 93</p><p className="text-gray-600">3020 Herent (Leuven)</p></div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-[#7D3C32] flex-shrink-0 mt-1" />
                <div><h3 className="font-bold text-gray-900 mb-1">{t('phone')}</h3><a href="tel:+3216600421" className="text-gray-600 hover:text-[#7D3C32]">+32 16 60 04 21</a></div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-[#7D3C32] flex-shrink-0 mt-1" />
                <div><h3 className="font-bold text-gray-900 mb-1">{t('email')}</h3><a href="mailto:bottega@mail.be" className="text-gray-600 hover:text-[#7D3C32]">bottega@mail.be</a><p className="text-sm text-gray-500 mt-1">{t('emailNote')}</p></div>
              </div>
              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">BTW nummer: BE682764984</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg h-96">
              <iframe title="Google Maps Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.8!2d4.6709!3d50.9247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c161f0e0e0e0e0%3A0x0!2sWilselsesteenweg%2093%2C%203020%20Herent!5e0!3m2!1snl!2sbe!4v1234567890" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
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
            <Link to={`${BASE_PATH}/reserveren`} className="bg-white text-[#7D3C32] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg">{t('reserveTable')}</Link>
            <Link to={`${BASE_PATH}/afhalen`} className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#7D3C32] transition-all shadow-lg">{t('orderTakeaway')}</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ReserverenPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('reservePageTitle')}</h1>
            <p className="text-lg text-gray-600">{t('reservePageSubtitle')}</p>
          </div>
          <div className="bg-[#FFF4E6] border-l-4 border-[#7D3C32] p-6 mb-8 rounded">
            <p className="text-[#7D3C32] font-medium"><span className="font-bold">{t('letOp')}</span> {t('closureNotice')}</p>
          </div>
          <div className="bg-white rounded-lg shadow-xl p-4 md:p-8">
            <iframe src="https://form.jotform.com/222292165889366" title="Reserveren Formulier" style={{ width: '100%', minHeight: '800px', border: 'none' }} scrolling="yes" />
          </div>
          <div className="mt-8 text-center">
            <Link to={BASE_PATH} className="text-[#7D3C32] hover:underline font-medium">← Terug naar Home</Link>
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
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('takeawayPageTitle')}</h1>
            <p className="text-lg text-gray-600">{t('takeawayPageSubtitle')}</p>
          </div>
          <div className="bg-[#FFF4E6] border-l-4 border-[#7D3C32] p-6 mb-8 rounded">
            <p className="text-[#7D3C32] font-medium mb-2"><span className="font-bold">{t('letOp')}</span> {t('closureNotice')}</p>
            <p className="text-[#7D3C32] font-medium"><span className="font-bold">Pizza's</span> alleen beschikbaar in de avonden!</p>
          </div>
          <div className="mb-6 text-center">
            <a href="https://labottegaherent.weebly.com/onze-kaart1.html" target="_blank" rel="noopener noreferrer" className="text-[#7D3C32] hover:underline font-bold text-lg">KLIK HIER VOOR DE KAART →</a>
          </div>
          <div className="bg-white rounded-lg shadow-xl p-4 md:p-8">
            <iframe src="https://form.jotform.com/222305012976349" title="Afhalen Formulier" style={{ width: '100%', minHeight: '800px', border: 'none' }} scrolling="yes" />
          </div>
          <div className="mt-8 text-center">
            <Link to={BASE_PATH} className="text-[#7D3C32] hover:underline font-medium">← Terug naar Home</Link>
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
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('ourMenu')}</h1>
            <p className="text-lg text-gray-600 mb-8">Onze kaart (ter plaatse en ook afhalen)</p>
            <div className="flex justify-center mb-8">
              <a href="/kaart-bottega.pdf" download="La-Bottega-Kaart.pdf" className="inline-flex items-center justify-center bg-[#7D3C32] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#6A3229] transition-all shadow-lg">📥 Download Kaart PDF</a>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-6">
            <iframe src="https://docs.google.com/viewer?url=https://www.labottegaherent.com/kaart-bottega.pdf&embedded=true" className="w-full" style={{ height: '1200px', border: 'none' }} title="La Bottega Kaart"></iframe>
          </div>
          <div className="mt-8 text-center">
            <Link to={BASE_PATH} className="text-[#7D3C32] hover:underline font-medium text-lg">{t('backToHome')}</Link>
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
  const images = ["/images/gallery5.jpg", "/images/gallery6.jpg", "/images/gallery1.jpg", "/images/new-photo1.jpg", "/images/new-photo2.jpg", "/images/new-photo3.jpg", "/images/new-photo4.jpg", "/images/new-photo5.jpg", "/images/new-photo6.jpg", "/images/new-photo7.jpg", "/images/new-photo8.jpg", "/images/new-photo9.jpg", "/images/new-photo10.jpg", "/images/new-photo11.webp", "/images/new-photo12.webp", "/images/new-photo13.webp", "/images/new-photo14.webp", "/images/new-photo15.webp", "/images/new-photo16.webp", "/images/new-photo17.jpg", "/images/new-photo18.jpg", "/images/new-photo19.jpg", "/images/new-photo20.jpg", "/images/new-photo21.jpg", "/images/new-photo22.jpg", "/images/new-photo23.jpg"];
  
  const openLightbox = (index) => { setSelectedImage(images[index]); setCurrentIndex(index); };
  const closeLightbox = () => setSelectedImage(null);
  const nextImage = () => { const newIndex = (currentIndex + 1) % images.length; setSelectedImage(images[newIndex]); setCurrentIndex(newIndex); };
  const prevImage = () => { const newIndex = (currentIndex - 1 + images.length) % images.length; setSelectedImage(images[newIndex]); setCurrentIndex(newIndex); };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('galleryPageTitle')}</h1>
            <p className="text-lg text-gray-600">{t('galleryPageSubtitle')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => <img key={index} src={image} alt={`Photo ${index + 1}`} className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-all hover:scale-105 cursor-pointer" onClick={() => openLightbox(index)} />)}
          </div>
          {selectedImage && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
              <button onClick={closeLightbox} className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-60">×</button>
              <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 text-white text-5xl hover:text-gray-300 z-60">‹</button>
              <img src={selectedImage} alt="Enlarged" className="max-w-full max-h-full object-contain" onClick={(e) => e.stopPropagation()} />
              <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 text-white text-5xl hover:text-gray-300 z-60">›</button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">{currentIndex + 1} / {images.length}</div>
            </div>
          )}
          <div className="mt-12 text-center">
            <Link to={BASE_PATH} className="text-[#7D3C32] hover:underline font-medium text-lg">{t('backToHome')}</Link>
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
    { id: 1, price: "€45,-", items: [{ name: "Rundercarpaccio met raketsalade en parmezaanse kaas" }, { name: "Gemarineerde zalm" }, { name: "Parmigiana: Gegratineerde aubergines met gerookte mozzarella" }, { name: "Antipasto 'della Bottega'" }], main: [{ name: "Ravioli al Tartufo: Ravioli met truffel" }, { name: "Gebraden zalm met grof zout, purée van spinazie, spumante saus" }, { name: "Involtino di vitello: Kalfsrollade gevuld met hesp en kaas" }], wine: false },
    { id: 2, price: "€55,-", items: [{ name: "Triologie van zeecarpaccio: zwaardvis, tonijn, zalm" }, { name: "Parmaham met burratina" }, { name: "Sapori 'La Bottega'" }, { name: "Scampi met truffel en groene asperges" }], main: [{ name: "Tagliata: Runderlapje op een bedje van rucola" }, { name: "Millefeuille van kabeljauw met gerookte zalm" }, { name: "Trio van verse pasta 'Bottega'" }], wine: true },
    { id: 3, price: "€65,-", items: [{ name: "Vitello Tonnato" }, { name: "Gerookte zalm" }, { name: "Ravioli met kreeft" }, { name: "Salade van ganzenlever" }], main: [{ name: "Runderfilet Rossini" }, { name: "Ravioli met ganzenlever, porto saus" }, { name: "Gegrilde vissoorten met salade" }], wine: true }
  ];
  const menuColors = [{ bg: 'bg-gradient-to-br from-stone-800 to-stone-700', text: 'text-stone-200', border: 'border-stone-700' }, { bg: 'bg-gradient-to-br from-stone-800 to-stone-700', text: 'text-stone-200', border: 'border-stone-700' }, { bg: 'bg-gradient-to-br from-stone-800 to-stone-700', text: 'text-stone-200', border: 'border-stone-700' }];
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#D4A574] mb-4">{t('groupMenusPageTitle')}</h1>
            <p className="text-lg text-gray-300 mb-2">{t('groupMenusPageSubtitle')}</p>
            <div className="w-20 h-1 bg-[#D4A574] mx-auto my-6"></div>
            <div className="flex flex-col items-center gap-4 mt-8">
              <a href="/groepmenus-bottega.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-[#D4A574] text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-[#C49564] transition-all shadow-lg">📄 Download Groepmenus PDF</a>
              <Link to={`${BASE_PATH}/reserveren`} className="inline-flex items-center justify-center bg-[#7D3C32] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6A3229] transition-all shadow-lg">Reserveer voor groepen</Link>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {menus.map((menu, menuIdx) => (
              <div key={menu.id} className={`${menuColors[menuIdx].bg} rounded-lg shadow-2xl overflow-hidden border-2 ${menuColors[menuIdx].border} text-white`}>
                <div className="p-6 border-b border-white/20 text-center">
                  <h2 className={`text-2xl font-bold ${menuColors[menuIdx].text} mb-2`}>Menu {menu.id}</h2>
                  <div className="text-4xl font-bold">{menu.price}</div>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className={`text-lg font-semibold ${menuColors[menuIdx].text} mb-4 text-center`}>Aperitivo (spumante)</h3>
                    <div className="space-y-3">
                      {menu.items.map((item, idx) => (<div key={idx}><p className="text-sm leading-relaxed text-center text-white/90">{item.name}</p>{idx < menu.items.length - 1 && <div className="text-center my-2 text-xs text-white/70">OF / OU / OR</div>}</div>))}
                    </div>
                  </div>
                  <div className="text-center my-6 text-white/40 font-bold text-lg">--O--</div>
                  <div className="mb-6">
                    <div className="space-y-3">
                      {menu.main.map((item, idx) => (<div key={idx}><p className="text-sm leading-relaxed text-center text-white/90">{item.name}</p>{idx < menu.main.length - 1 && <div className="text-center my-2 text-xs text-white/70">OF / OU / OR</div>}</div>))}
                    </div>
                  </div>
                  <div className="text-center my-6 text-white/40 font-bold text-lg">--O--</div>
                  <div className="mb-6"><p className="text-sm text-center text-white/90">{t('surprise')}</p></div>
                  {menu.wine && <div className="bg-white/10 p-4 rounded-lg text-center mt-6 border border-white/20"><p className={`${menuColors[menuIdx].text} font-bold text-sm`}>{t('wineIncluded')}</p></div>}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center p-6"><p className="font-bold text-lg text-gray-300">{t('minimumPersons')}</p></div>
          <div className="mt-8 text-center"><Link to={BASE_PATH} className="text-[#D4A574] hover:text-[#C49564] font-medium text-lg transition-colors">← {t('backToHome')}</Link></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function BottegaApp() {
  return (
    <LanguageProvider>
      <div className="bottega-site">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kaart" element={<KaartPage />} />
          <Route path="/galerie" element={<GaleriePage />} />
          <Route path="/groepmenus" element={<GroepmenusPage />} />
          <Route path="/reserveren" element={<ReserverenPage />} />
          <Route path="/afhalen" element={<AfhalenPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default BottegaApp;
