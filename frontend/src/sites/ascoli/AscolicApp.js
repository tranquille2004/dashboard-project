import React, { useState, createContext, useContext, useEffect } from 'react';
import './ascoli.css';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, MapPin, Clock, Award, Heart, Users, Wine } from 'lucide-react';

const BASE_PATH = '/site/ascoli';

// EXACT images from original site ascolizaventem.com
const IMAGES = {
  logo: 'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/ascoli_orig.jpg',
  hero: 'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/45280374-1885058464947804-146153777123033088-o_2_orig.jpg',
  aboutHero: 'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5497_1_orig.jpg',
  groupMenuHero: 'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5714_1_orig.jpg',
  reservationsHero: 'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5801_orig.jpg',
  feature1: 'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5801_orig.jpg',
  feature2: 'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5849_orig.jpg',
  feature3: 'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-6046_1_orig.jpg',
  aboutGallery1: 'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/20689781-1380875678699421-9174551204022883676-o_1_orig.jpg',
  aboutGallery2: 'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/45280374-1885058464947804-146153777123033088-o_2_orig.jpg',
  dishes: [
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5788_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5857_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5879_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5889_orig.jpg',
  ],
  gallery: [
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5788_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5857_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5879_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5889_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5801_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5849_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-6046_1_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5497_1_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/20689781-1380875678699421-9174551204022883676-o_1_orig.jpg',
  ],
  fworksLogo: 'https://raw.githubusercontent.com/tranquille2004/Bottega/main/frontend/public/images/fworksbuilders-logo.png',
};

// Translations
const translations = {
  nl: {
    home: 'HOME', about: 'WIE ZIJN WIJ?', menu: 'KAART', groupMenus: 'GROEPMENUS',
    reserve: 'RESERVEREN', gallery: "FOTO'S", info: 'INFO',
    heroTitle: "L'ASCOLI", heroSubtitle: 'Authentieke Italiaanse keuken in het hart van Zaventem',
    reserveBtn: 'RESERVEREN', menuBtn: 'BEKIJK MENU',
    feature1Title: 'Italiaanse Kwaliteit', feature1Text: 'Authentieke Italiaanse ingrediënten',
    feature2Title: 'Verse Bereiding', feature2Text: 'Dagelijks vers bereid',
    feature3Title: 'Elegante Ambiance', feature3Text: 'Verfijnde eetervaring',
    ctaTitle: 'Klaar voor een onvergetelijke ervaring?', ctaSubtitle: 'Reserveer nu uw tafel',
    backToHome: '← Terug naar Home',
    openingHours: 'Openingstijden',
    allRightsReserved: 'Alle rechten voorbehouden',
  },
  fr: {
    home: 'ACCUEIL', about: 'QUI SOMMES-NOUS?', menu: 'CARTE', groupMenus: 'MENUS DE GROUPE',
    reserve: 'RÉSERVER', gallery: 'PHOTOS', info: 'INFO',
    heroTitle: "L'ASCOLI", heroSubtitle: 'Cuisine italienne authentique au cœur de Zaventem',
    reserveBtn: 'RÉSERVER', menuBtn: 'VOIR MENU',
    feature1Title: 'Qualité Italienne', feature1Text: 'Ingrédients italiens authentiques',
    feature2Title: 'Préparation Fraîche', feature2Text: 'Préparé frais chaque jour',
    feature3Title: 'Ambiance Élégante', feature3Text: 'Expérience culinaire raffinée',
    ctaTitle: 'Prêt pour une expérience inoubliable?', ctaSubtitle: 'Réservez votre table maintenant',
    backToHome: '← Retour à l\'accueil',
    openingHours: 'Heures d\'ouverture',
    allRightsReserved: 'Tous droits réservés',
  },
  en: {
    home: 'HOME', about: 'ABOUT US', menu: 'MENU', groupMenus: 'GROUP MENUS',
    reserve: 'RESERVE', gallery: 'PHOTOS', info: 'INFO',
    heroTitle: "L'ASCOLI", heroSubtitle: 'Authentic Italian cuisine in the heart of Zaventem',
    reserveBtn: 'RESERVE', menuBtn: 'VIEW MENU',
    feature1Title: 'Italian Quality', feature1Text: 'Authentic Italian ingredients',
    feature2Title: 'Fresh Preparation', feature2Text: 'Freshly prepared daily',
    feature3Title: 'Elegant Ambiance', feature3Text: 'Refined dining experience',
    ctaTitle: 'Ready for an unforgettable experience?', ctaSubtitle: 'Reserve your table now',
    backToHome: '← Back to Home',
    openingHours: 'Opening Hours',
    allRightsReserved: 'All rights reserved',
  },
};

// Language Context
const LanguageContext = createContext();
function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('nl');
  const t = (key) => translations[language]?.[key] || translations['nl'][key] || key;
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}
function useLanguage() { return useContext(LanguageContext); }

// Language Switcher
function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-1 text-white hover:text-gray-300">
        <span className="text-lg">🇧🇪</span>
        <span className="text-sm uppercase">{language}</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-[#1a1a1a] rounded shadow-lg py-2 z-50 min-w-[80px]">
          {['nl', 'fr', 'en'].map((lang) => (
            <button key={lang} onClick={() => { setLanguage(lang); setIsOpen(false); }}
              className={`w-full px-4 py-2 text-left text-white hover:bg-gray-700 text-sm uppercase ${language === lang ? 'bg-gray-700' : ''}`}>
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Scroll to top
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Navigation - EXACT like original (dark background)
function Navigation() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed w-full z-50 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to={BASE_PATH}><img src={IMAGES.logo} alt="L'Ascoli" className="h-12" /></Link>
          <div className="hidden lg:flex items-center space-x-8">
            <Link to={BASE_PATH} className="text-white text-xs tracking-widest hover:text-gray-300">{t('home')}</Link>
            <Link to={`${BASE_PATH}/about`} className="text-white text-xs tracking-widest hover:text-gray-300">{t('about')}</Link>
            <Link to={`${BASE_PATH}/menu`} className="text-white text-xs tracking-widest hover:text-gray-300">{t('menu')}</Link>
            <Link to={`${BASE_PATH}/group-menu`} className="text-white text-xs tracking-widest hover:text-gray-300">{t('groupMenus')}</Link>
            <Link to={`${BASE_PATH}/reservations`} className="text-white text-xs tracking-widest hover:text-gray-300">{t('reserve')}</Link>
            <Link to={`${BASE_PATH}/gallery`} className="text-white text-xs tracking-widest hover:text-gray-300">{t('gallery')}</Link>
            <Link to={`${BASE_PATH}/info`} className="text-white text-xs tracking-widest hover:text-gray-300">{t('info')}</Link>
            <LanguageSwitcher />
          </div>
          <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>
        </div>
        {isOpen && (
          <div className="lg:hidden pb-4">
            {[['', 'home'], ['/about', 'about'], ['/menu', 'menu'], ['/group-menu', 'groupMenus'], ['/reservations', 'reserve'], ['/gallery', 'gallery'], ['/info', 'info']].map(([path, key]) => (
              <Link key={key} to={`${BASE_PATH}${path}`} onClick={() => setIsOpen(false)} className="block py-2 text-white text-sm">{t(key)}</Link>
            ))}
            <LanguageSwitcher />
          </div>
        )}
      </div>
    </nav>
  );
}

// Footer - EXACT like original
function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-serif mb-4 text-[#6b1f1f]">L'Ascoli</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sinds 2015 biedt Antonio Di Siervi smakelijke Italiaanse gerechten aan in een prachtige 19e-eeuwse boerderij met een Toscaanse tuin.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#a48f7a]">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-[#6b1f1f] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Hector Henneaulaan 136<br/>1930 Zaventem</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#6b1f1f]" />
                <a href="tel:+3227254545" className="text-gray-400 hover:text-[#6b1f1f] transition-colors">+32 2 725 45 45</a>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#a48f7a]">{t('openingHours')}</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <Clock className="w-5 h-5 text-[#6b1f1f] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Ma - Vr:</p>
                  <p>12:00 - 14:00</p>
                  <p>18:30 - 22:30</p>
                  <p className="font-medium text-white mt-2">Za:</p>
                  <p>18:30 - 22:30</p>
                  <p className="font-medium text-white mt-2">Zo:</p>
                  <p>Gesloten</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#a48f7a]">Snelle Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={`${BASE_PATH}/menu`} className="text-gray-400 hover:text-[#6b1f1f] transition-colors">Menu</Link></li>
              <li><Link to={`${BASE_PATH}/group-menu`} className="text-gray-400 hover:text-[#6b1f1f] transition-colors">Groepmenus</Link></li>
              <li><Link to={`${BASE_PATH}/reservations`} className="text-gray-400 hover:text-[#6b1f1f] transition-colors">RESERVEREN</Link></li>
              <li><Link to={`${BASE_PATH}/gallery`} className="text-gray-400 hover:text-[#6b1f1f] transition-colors">Foto Galerij</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="text-center text-sm text-gray-500 mb-6">
            <p>© {new Date().getFullYear()} L'Ascoli Zaventem. {t('allRightsReserved')}.</p>
            <p className="mt-2 italic text-xs">Per il piacere di un momento da vivere e ricordare</p>
          </div>
          <div className="text-center text-xs text-gray-500 pt-6 border-t border-gray-800">
            <p className="mb-3">Ziet u een fout op deze site? Of zoekt u een professionele website? Contacteer de webmaster via WhatsApp.</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <img src={IMAGES.fworksLogo} alt="fworksbuilders" className="h-8 w-auto" />
              <span className="text-gray-400">Webmaster:</span>
              <span className="text-gray-300">fworksbuilders</span>
              <span className="text-gray-400">|</span>
              <a href="https://wa.me/32494516064" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">+32 494 51 60 64 (WhatsApp)</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// HOME PAGE - EXACT like original
function HomePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navigation />
      {/* Hero */}
      <section className="relative h-screen pt-16">
        <div className="absolute inset-0 pt-16">
          <img src={IMAGES.hero} alt="L'Ascoli" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-6xl md:text-8xl font-light tracking-wider mb-4" style={{fontFamily: 'serif'}}>{t('heroTitle')}</h1>
          <p className="text-xl md:text-2xl font-light mb-8">{t('heroSubtitle')}</p>
          <div className="flex gap-4">
            <button onClick={() => navigate(`${BASE_PATH}/reservations`)} className="bg-[#6b1f1f] hover:bg-[#7d2424] text-white px-8 py-4 text-sm tracking-widest transition-all flex items-center gap-2">
              {t('reserveBtn')} <span>›</span>
            </button>
            <button onClick={() => navigate(`${BASE_PATH}/menu`)} className="bg-transparent border border-white/50 text-white px-8 py-4 text-sm tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
              {t('menuBtn')} <span>›</span>
            </button>
          </div>
        </div>
      </section>

      {/* Three Features with text overlay */}
      <section className="grid grid-cols-1 md:grid-cols-3">
        <div className="relative h-48 md:h-64 group cursor-pointer overflow-hidden">
          <img src={IMAGES.feature1} alt="Italiaanse Kwaliteit" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex flex-col justify-end p-6">
            <h3 className="text-white text-xl font-light">{t('feature1Title')}</h3>
            <p className="text-white/70 text-sm">{t('feature1Text')}</p>
          </div>
        </div>
        <div className="relative h-48 md:h-64 group cursor-pointer overflow-hidden">
          <img src={IMAGES.feature2} alt="Verse Bereiding" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex flex-col justify-end p-6">
            <h3 className="text-white text-xl font-light">{t('feature2Title')}</h3>
            <p className="text-white/70 text-sm">{t('feature2Text')}</p>
          </div>
        </div>
        <div className="relative h-48 md:h-64 group cursor-pointer overflow-hidden">
          <img src={IMAGES.feature3} alt="Elegante Ambiance" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex flex-col justify-end p-6">
            <h3 className="text-white text-xl font-light">{t('feature3Title')}</h3>
            <p className="text-white/70 text-sm">{t('feature3Text')}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-[#0d0d0d] text-center">
        <h2 className="text-4xl md:text-5xl text-white font-light mb-4" style={{fontFamily: 'serif'}}>{t('ctaTitle')}</h2>
        <p className="text-gray-400 mb-8">{t('ctaSubtitle')}</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => navigate(`${BASE_PATH}/reservations`)} className="bg-[#6b1f1f] hover:bg-[#7d2424] text-white px-8 py-4 text-sm tracking-widest flex items-center gap-2">
            {t('reserveBtn')} <span>›</span>
          </button>
          <button onClick={() => navigate(`${BASE_PATH}/menu`)} className="bg-transparent border border-white/30 text-white px-8 py-4 text-sm tracking-widest hover:bg-white/10 flex items-center gap-2">
            {t('menuBtn')} <span>›</span>
          </button>
        </div>
      </section>

      {/* Onze Gerechten Section with hover effects */}
      <section className="py-20 px-4 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-[#a48f7a] font-light mb-4" style={{fontFamily: 'serif'}}>Onze Gerechten</h2>
            <p className="text-gray-400">Een selectie van onze authentieke Italiaanse creaties</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {IMAGES.dishes.map((img, i) => (
              <div key={i} className="relative overflow-hidden group cursor-pointer">
                <img 
                  src={img} 
                  alt={`Dish ${i+1}`} 
                  className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110" 
                />
                <div className="absolute inset-0 bg-[#6b1f1f]/0 group-hover:bg-[#6b1f1f]/20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to={`${BASE_PATH}/gallery`} className="text-[#6b1f1f] text-sm tracking-widest hover:underline">BEKIJK VOLLEDIGE GALERIJ ›</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ABOUT PAGE - EXACT like original
function AboutPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navigation />
      
      {/* Hero */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.aboutHero})` }}>
          <div className="absolute inset-0 bg-[#1a1a1a]/60"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6">Wie zijn wij?</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">Ontdek ons verhaal</p>
        </div>
      </div>

      {/* Ons Verhaal Section */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-[#a48f7a] mb-6">Ons Verhaal</h2>
              <div className="w-24 h-1 bg-[#6b1f1f] mx-auto"></div>
            </div>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">Sinds 2015 biedt Antonio Di Siervi smakelijke Italiaanse gerechten aan zoals octopussalade met selderij, peterselie, knoflook, citroen en altijd bereidt met biologische olijfolie. Maar ook gefrituurde Sint Jakobs op een julienne van witlof met zwarte truffelpesto of de kleine Treviso salade met pijnboompitten, basilicum en sinaasappel.</p>
              <p className="text-lg">Tevens zijn er de klassiekers: trio van verse pasta, koteletten, carpaccios en gebakken vis. Dit alles met een goede uitgebreide wijnkaart, inclusief biologische wijnen.</p>
              <p className="text-lg">L'Ascoli bevindt zich niet ver van de luchthaven en zit in een prachtige 19e-eeuwse boerderij met een mooi interieur en een prachtige eerste verdieping, perfect voor grote groepen tot wel 80 personen. In de zomer kan men genieten van de Toscaanse tuin.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Onze Waarden Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Onze Waarden</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#6b1f1f] rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Kwaliteit</h3>
              <p className="text-gray-400">Alleen de beste Italiaanse ingrediënten</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#6b1f1f] rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Passie</h3>
              <p className="text-gray-400">Liefde voor authentieke Italiaanse keuken</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#6b1f1f] rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Service</h3>
              <p className="text-gray-400">Persoonlijke aandacht voor elke gast</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#6b1f1f] rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Traditie</h3>
              <p className="text-gray-400">Respect voor Italiaanse culinaire tradities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img alt="Restaurant" className="w-full h-80 object-cover rounded-sm" src={IMAGES.aboutGallery1} />
            <img alt="Restaurant" className="w-full h-80 object-cover rounded-sm" src={IMAGES.aboutGallery2} />
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-serif text-[#a48f7a] mb-4">Voor groepsevenementen kunt u via onze website reserveren</h3>
          <p className="text-gray-300">We spreken Nederlands, Frans, Engels, Duits en Spaans.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// MENU PAGE - EXACT like original with multilingual items
function MenuPage() {
  const { t } = useLanguage();
  const menuData = [
    { title: 'Koude voorgerechten', items: [
      { nl: 'Burrata van buffel met tomaten en basilicum in olijfolie', fr: 'Burrata de buffle aux tomates et basilic à l\'huile d\'olive', en: 'Buffalo burrata with tomatoes and basil in olive oil', price: '€ 22,00' },
      { nl: 'Rundercarpaccio gemarineerd in olijfolie en citroen, met parmezaanschilfers (allergeen 8)', fr: 'Carpaccio de boeuf mariné à l\'huile d\'olive et citron, avec copeaux de parmesan (allergène 8)', en: 'Beef carpaccio marinated in olive oil and lemon, with parmesan shavings (allergen 8)', price: '€ 21,50' },
      { nl: 'Bresaola gemarineerd in olijfolie en citroen, met parmezaanschilfers (allergeen 8)', fr: 'Bresaola marinée à l\'huile d\'olive et citron, avec copeaux de parmesan (allergène 8)', en: 'Bresaola marinated in olive oil and lemon, with parmesan shavings (allergen 8)', price: '€ 24,50' },
      { nl: 'Salade van inktvis (allergeen 3,10)', fr: 'Salade de calamar (allergène 3,10)', en: 'Squid salad (allergen 3,10)', price: '€ 24,50' },
      { nl: 'Parmaham met meloen (allergeen 3,10)', fr: 'Jambon de Parme au melon (allergène 3,10)', en: 'Parma ham with melon (allergen 3,10)', price: '€ 23,50' },
      { nl: 'Gegratineerde aubergines op grootmoeders wijze (allergeen 3,10)', fr: 'Aubergines gratinées de la nonna (allergène 3,10)', en: 'Grandmother\'s eggplant (allergen 3,10)', price: '€ 21,50' },
      { nl: 'Vitello tonnato; Kalfslapje, crème van tonijn, ansjovis, mayonnaise, kappertjes (allergeen 2,3,9,10,11)', fr: 'Vitello tonnato; Escalope de veau, crème de thon, anchois, mayonnaise, câpres (allergène 2,3,9,10,11)', en: 'Vitello tonnato; Veal escalope, tuna cream, anchovies, mayonnaise, capers (allergen 2,3,9,10,11)', price: '€ 24,50' },
      { nl: 'Bordje antipasti (allergeen 4,6,8)', fr: 'Assiette d\'antipasti (allergène 4,6,8)', en: 'Antipasti plate (allergen 4,6,8)', price: '€ 23,50' },
      { nl: 'Verse gemarineerde zalm (allergeen 3,10)', fr: 'Saumon frais mariné (allergène 3,10)', en: 'Fresh marinated salmon (allergen 3,10)', price: '€ 24,50' },
    ]},
    { title: 'Soepen', items: [
      { nl: 'Minestrone, soep van verse groenten uit de tuin', fr: 'Minestrone, soupe de légumes frais du jardin', en: 'Minestrone, fresh garden vegetable soup', price: '€ 12,50' },
      { nl: 'Tomatenroomsoep met zachte look en basilicum', fr: 'Soupe crémeuse de tomate à l\'ail doux et basilic', en: 'Creamy tomato soup with soft garlic and basil', price: '€ 12,50' },
      { nl: 'Heldere soep van eend, tortellini geparfumeerd met verse munt en limoen', fr: 'Bouillon de canard, tortellini parfumés à la menthe fraîche et citron vert', en: 'Clear duck soup, tortellini flavored with fresh mint and lime', price: '€ 14,50' },
    ]},
    { title: 'Huisgemaakte pasta', items: [
      { nl: 'Spaghetti met verse kerstomaten, look en basilicum (allergeen 5)', fr: 'Spaghetti aux tomates cerises fraîches, ail et basilic (allergène 5)', en: 'Spaghetti with fresh cherry tomatoes, garlic and basil (allergen 5)', price: '€ 17,50' },
      { nl: 'Spaghetti met look, olie en pepertjes (allergeen 5)', fr: 'Spaghetti à l\'ail, huile et piment (allergène 5)', en: 'Spaghetti with garlic, oil and chili peppers (allergen 5)', price: '€ 17,50' },
      { nl: 'Spaghetti met schelpdieren (allergeen 5,14)', fr: 'Spaghetti aux fruits de mer (allergène 5,14)', en: 'Spaghetti with shellfish (allergen 5,14)', price: '€ 24,50' },
      { nl: 'Linguini met scampi, courgette en pijnboompitten (allergeen 1,5,9)', fr: 'Linguini aux scampi, courgette et pignons de pin (allergène 1,5,9)', en: 'Linguini with scampi, zucchini and pine nuts (allergen 1,5,9)', price: '€ 24,50' },
      { nl: 'Tagliolini met pesto van zwarte truffel, boter en parmezaanschilfers (allergeen 2,4,5,8,10)', fr: 'Tagliolini au pesto de truffe noire, beurre et copeaux de parmesan (allergène 2,4,5,8,10)', en: 'Tagliolini with black truffle pesto, butter and parmesan shavings (allergen 2,4,5,8,10)', price: '€ 28,50' },
      { nl: 'Bucatini all\'amatriciana (allergeen 5)', fr: 'Bucatini all\'amatriciana (allergène 5)', en: 'Bucatini all\'amatriciana (allergen 5)', price: '€ 19,50' },
      { nl: 'Ravioli met rivierkreeftjes en champignons (allergeen 5)', fr: 'Ravioli aux écrevisses et champignons (allergène 5)', en: 'Ravioli with crayfish and mushrooms (allergen 5)', price: '€ 23,50' },
      { nl: 'Kwartet van verse huisgemaakte pasta (allergeen 2,3,4,5,8,10)', fr: 'Quartet de pâtes fraîches maison (allergène 2,3,4,5,8,10)', en: 'Quartet of fresh homemade pasta (allergen 2,3,4,5,8,10)', price: '€ 23,50' },
    ]},
    { title: 'Visgerechten / Poissons / Fish Dishes', items: [
      { nl: 'Gegrilde inkvis met italiaanse kruiden, zachte look en salade (allergeen 1,14)', fr: 'Seiches grillées aux arômes italiens, parfumées à l\'ail doux, salade (allergène 1,14)', en: 'Grilled octopus with italian herbs, perfumed with soft garlic, salad (allergen 1,14)', price: '€ 26,50' },
      { nl: 'Gefrituurde calamares met tartaarsaus (allergeen 1,2,4,5,11,14)', fr: 'Calamars frais frits, sauce tartare (allergène 1,2,4,5,11,14)', en: 'Fresh fried calamari, tartar sauce (allergen 1,2,4,5,11,14)', price: '€ 25,50' },
      { nl: 'Filet van wilde zeebaars met rozemarijn, salie, olijfolie en citroen (allergeen 3)', fr: 'Filet de bar sauvage au romarin, sauge, huile d\'olive et citron (allergène 3)', en: 'Wild bass fillet with rosemary, sage, olive oil and lemon (allergen 3)', price: '€ 34,50' },
      { nl: 'Rode tonijnfilet met italiaanse kruiden (allergeen 3,12,13)', fr: 'Filet de thon rouge macéré aux arômes italiens (allergène 3,12,13)', en: 'Red tuna fillet macerated with italian herbs (allergen 3,12,13)', price: '€ 33,50' },
      { nl: 'Filet van zeebrasem aqua pazza (allergeen 3,4,10)', fr: 'Filet de Daurade aqua pazza (allergène 3,4,10)', en: 'Sea bream fillet aqua pazza (allergen 3,4,10)', price: '€ 32,50' },
    ]},
    { title: 'Vleesgerechten / Viandes / Meat Dishes', items: [
      { nl: 'Mechelse koekoek met Amalfi citroen en seizoensgroenten (allergeen 8,13)', fr: 'Poitrine de coucou de Malines au citron d\'Amalfi et ses légumes de saison (allergène 8,13)', en: 'Breast of chicken from Mechelen with lemon from Amalfi and seasonal vegetables (allergen 8,13)', price: '€ 25,50' },
      { nl: 'Kalkoenskotelet op Milaneese wijze en seizoensgroenten (allergeen 8,13)', fr: 'Escalope de dinde à la Milanèse et légumes de saison (allergène 8,13)', en: 'Turkey cutlet Milanese with seasonal vegetables (allergen 8,13)', price: '€ 24,50' },
      { nl: 'Saltimbocca alla Romana (allergeen 5,8,10)', fr: 'Saltimbocca alla Romana (allergène 5,8,10)', en: 'Saltimbocca alla Romana (allergen 5,8,10)', price: '€ 28,50' },
      { nl: 'Tagliata, Runderlapje op raketsla (allergeen 8,13)', fr: 'Tagliata, Emincé de bœuf sur lit de roquette (allergène 8,13)', en: 'Tagliata, slices of beef on a bed of arugula salad (allergen 8,13)', price: '€ 32,50' },
      { nl: 'Gegrilde Filet pur met groenten (allergeen 8,13)', fr: 'Filet pur grillé aux légumes (allergène 8,13)', en: 'Grilled pure tenderloin with vegetables (allergen 8,13)', price: '€ 36,50' },
    ]},
  ];
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navigation />
      
      {/* Hero - exact like original */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5788_orig.jpg)` }}>
          <div className="absolute inset-0 bg-[#1a1a1a]/60"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6">Onze Kaart</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">Authentieke Italiaanse gerechten</p>
        </div>
      </div>

      {/* Menu Content - exact like original with cream gradient */}
      <section className="py-16 bg-gradient-to-b from-[#f2f1d5] to-[#e8e6c8]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {menuData.map((cat, i) => (
              <div key={i} className="mb-16">
                <h2 className="text-3xl md:text-4xl font-serif text-[#6b1f1f] mb-8 text-left border-b-2 border-[#6b1f1f] pb-4">{cat.title}</h2>
                <div className="space-y-6">
                  {cat.items.map((item, j) => (
                    <div key={j} className="bg-white/60 p-6 rounded-sm">
                      <h3 className="text-gray-900 mb-2 leading-tight">
                        {item.nl}<br/>
                        <span className="italic">{item.fr}</span><br/>
                        {item.en}
                      </h3>
                      <p className="text-[#6b1f1f] font-semibold">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="text-center mt-16">
              <Link to={`${BASE_PATH}/reservations`} className="inline-block px-10 py-4 bg-[#6b1f1f] hover:bg-[#7d2424] text-white rounded-sm transition-colors text-lg uppercase tracking-wide">
                Maak een reservatie
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// GROUP MENU PAGE - EXACT like original with full menu details
function GroupMenuPage() {
  const { t } = useLanguage();
  
  const menus = [
    {
      name: 'TORINO',
      price: '€47,50',
      color: 'from-amber-600/20 to-amber-900/10',
      aperitivo: [
        { nl: 'Italiaans antipasti buffet (Italiaanse fijne vleeswaren, mozzarella, gegrilde groenten van het seizoen)', fr: 'Buffet d\'antipasti italiens (charcuterie fine italienne, mozzarella, légumes grillés de saison)', en: 'Italian antipasti buffet (Italian fine meats, mozzarella, grilled seasonal vegetables)' },
        { nl: 'Vitello Tonnato', fr: 'Vitello Tonnato', en: 'Vitello Tonnato' },
        { nl: 'Penne met aubergines, mozzarella en tomaat', fr: 'Penne aux aubergines, mozzarella et tomate', en: 'Penne with eggplant, mozzarella and tomato' },
      ],
      main: [
        { nl: 'Emincé van kalkoen met citroen et italiaanse kruiden, geserveerd met groenten of verse pasta', fr: 'Emincé de dinde au citron et herbes italiennes, servi avec légumes ou pâtes fraîches', en: 'Turkey strips with lemon and Italian herbs, served with vegetables or fresh pasta' },
        { nl: 'Escalope van zalm, gebakken met grof zout, saus van spumante, geserveerd met een purée van spinazie en kleine peertjes', fr: 'Escalope de saumon, cuit au gros sel, sauce au spumante, servi avec une purée d\'épinards et petites poires', en: 'Salmon escalope, baked with coarse salt, spumante sauce, served with spinach purée and small pears' },
        { nl: 'Rode poonfilet op Libournaise wijze', fr: 'Filet de poon rouge à la Libournaise', en: 'Red gurnard fillet Libournaise style' },
      ],
      dessert: [
        { nl: 'Italiaanse pâtisserie', fr: 'Pâtisserie italienne', en: 'Italian pastries' },
      ],
    },
    {
      name: 'PUGLIA',
      price: '€52,50',
      color: 'from-green-600/20 to-green-900/10',
      aperitivo: [
        { nl: 'Burrata op een bedje van biologische tomaat, vièrge olijfolie, basilicum en oregano', fr: 'Burrata sur un lit de tomate bio, huile d\'olive vierge, basilic et origan', en: 'Burrata on a bed of organic tomato, virgin olive oil, basil and oregano' },
        { nl: 'Salade van verse zeevruchten, hart van selderij, peterselie en zacht look', fr: 'Salade de fruits de mer frais, cœur de céleri, persil et ail doux', en: 'Fresh seafood salad, celery heart, parsley and soft garlic' },
        { nl: 'Ravioli gevuld met rivierkreeftjes en wilde paddenstoelen in hun saus', fr: 'Raviolis farcis aux écrevisses et champignons sauvages dans leur sauce', en: 'Ravioli stuffed with crayfish and wild mushrooms in their sauce' },
      ],
      main: [
        { nl: 'Tagliata: emincé van Ierse contre-filet, geserveerd op een bedje van groenten, raketsla, schaafsels van parmezaan, balsamico azijn en olijfolie', fr: 'Tagliata: émincé de contre-filet irlandais, servi sur un lit de légumes, roquette, copeaux de parmesan, vinaigre balsamique et huile d\'olive', en: 'Tagliata: Irish sirloin strips, served on a bed of vegetables, arugula, parmesan shavings, balsamic vinegar and olive oil' },
        { nl: 'Magret van eend, Marsala saus, geserveerd met een Trevise salade, appelsien, pijnboompitten en basilicum, gratin van witte selderij en zwarte olijven', fr: 'Magret de canard, sauce Marsala, servi avec une salade de Trévise, orange, pignons de pin et basilic, gratin de céleri blanc et olives noires', en: 'Duck breast, Marsala sauce, served with Treviso salad, orange, pine nuts and basil, white celery and black olive gratin' },
        { nl: 'Filet van brasem aqua pazza met groenten en gestoomde aardappelen, specialiteit van de amalfikust', fr: 'Filet de dorade aqua pazza avec légumes et pommes de terre vapeur, spécialité de la côte amalfitaine', en: 'Sea bream fillet aqua pazza with vegetables and steamed potatoes, Amalfi coast specialty' },
      ],
      dessert: [
        { nl: 'Profiteroles met warme chocolade', fr: 'Profiteroles au chocolat chaud', en: 'Profiteroles with hot chocolate' },
        { nl: 'Affogato: vanille ijs met kersen en amaretto', fr: 'Affogato: glace vanille aux cerises et amaretto', en: 'Affogato: vanilla ice cream with cherries and amaretto' },
      ],
    },
    {
      name: 'AMALFI',
      price: '€57,50',
      color: 'from-red-600/20 to-red-900/10',
      aperitivo: [
        { nl: 'Risotto met paddenstoelen', fr: 'Risotto aux champignons', en: 'Risotto with mushrooms' },
        { nl: 'Paccheri met baarsfilet, kerstomaatjes en oregano', fr: 'Paccheri au filet de bar, tomates cerises et origan', en: 'Paccheri with sea bass fillet, cherry tomatoes and oregano' },
        { nl: 'Integrale tagliatelle met pancetta en doperwtjes', fr: 'Tagliatelle intégrales à la pancetta et petits pois', en: 'Wholegrain tagliatelle with pancetta and peas' },
      ],
      main: [
        { nl: 'Ballotine van konijn gevuld met ganzenlever en bergspek, rode wijnsaus uit de Piemont, geserveerd met gecarameliseerde appels en groenten', fr: 'Ballotine de lapin farcie au foie gras et lard de montagne, sauce au vin rouge du Piémont, servie avec pommes caramélisées et légumes', en: 'Rabbit ballotine stuffed with foie gras and mountain bacon, Piedmont red wine sauce, served with caramelized apples and vegetables' },
        { nl: 'Noisette van lam met thijm en citroen, gratin van witte selderij en artisjok', fr: 'Noisette d\'agneau au thym et citron, gratin de céleri blanc et artichaut', en: 'Lamb noisette with thyme and lemon, white celery and artichoke gratin' },
        { nl: 'Baarsfilet de ligne met rozemarijn en citroen, olijfolie en salie, geserveerd met groenten', fr: 'Filet de bar de ligne au romarin et citron, huile d\'olive et sauge, servi avec légumes', en: 'Line-caught sea bass fillet with rosemary and lemon, olive oil and sage, served with vegetables' },
      ],
      dessert: [
        { nl: 'Ricotta taart met citroen', fr: 'Tarte à la ricotta et citron', en: 'Ricotta and lemon tart' },
        { nl: 'Mix van sorbet ijs', fr: 'Mélange de sorbets', en: 'Mix of sorbet ice creams' },
      ],
    },
    {
      name: 'ASCOLI',
      price: '€67,50',
      color: 'from-blue-600/20 to-blue-900/10',
      aperitivo: [
        { nl: 'Slaatje van ganzenlever, geserveerd op een bedje van venkel, groene bonen, olijfolie, balsamico azijn en verse amandelmelk', fr: 'Salade de foie gras, servie sur un lit de fenouil, haricots verts, huile d\'olive, vinaigre balsamique et lait d\'amande frais', en: 'Foie gras salad, served on a bed of fennel, green beans, olive oil, balsamic vinegar and fresh almond milk' },
        { nl: 'Gefrituurde scampi met tartaarsaus, geserveerd met gepaneerde stokjes van courgette en citroen', fr: 'Scampi frits sauce tartare, servis avec bâtonnets panés de courgette et citron', en: 'Fried scampi with tartar sauce, served with breaded zucchini sticks and lemon' },
        { nl: 'Tartaar van verse zalm, sint jakobs, groene appel, pijnboompitten, en gember', fr: 'Tartare de saumon frais, saint-jacques, pomme verte, pignons de pin et gingembre', en: 'Fresh salmon tartare, scallops, green apple, pine nuts and ginger' },
      ],
      main: [
        { nl: 'Kabeljauwfilet livornese met seizoensgroenten, kappertjes, olijven, sjalot, zacht look en oregano', fr: 'Filet de cabillaud livornese avec légumes de saison, câpres, olives, échalote, ail doux et origan', en: 'Cod fillet livornese with seasonal vegetables, capers, olives, shallot, soft garlic and oregano' },
        { nl: 'Saltimbocca alla Romana', fr: 'Saltimbocca alla Romana', en: 'Saltimbocca alla Romana' },
        { nl: 'Filet van varken op wijze van Maremma met regionale kruiden en kastanjehoning, geserveerd met een purée van zoete aardappel en biet', fr: 'Filet de porc façon Maremme aux herbes régionales et miel de châtaigne, servi avec une purée de patate douce et betterave', en: 'Pork fillet Maremma style with regional herbs and chestnut honey, served with sweet potato and beetroot purée' },
      ],
      dessert: [
        { nl: 'Fruitsalade', fr: 'Salade de fruits', en: 'Fruit salad' },
        { nl: 'Panna cotta', fr: 'Panna cotta', en: 'Panna cotta' },
      ],
    },
  ];

  const { language } = useLanguage();
  const getLang = (item) => item[language] || item.nl;

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navigation />
      
      {/* Hero */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.groupMenuHero})` }}>
          <div className="absolute inset-0 bg-[#1a1a1a]/60"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6">Groepmenu's</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">Perfecte keuze voor groepen vanaf 10 personen</p>
        </div>
      </div>

      <section className="py-16 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Top buttons */}
            <div className="text-center mb-12">
              <div className="w-24 h-1 bg-[#6b1f1f] mx-auto mb-8"></div>
              <Link to={`${BASE_PATH}/reservations`} className="inline-block bg-[#6b1f1f] text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-[#7d2424] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mb-4">
                Reserveer voor groepen
              </Link>
              <div className="mt-4">
                <a href="https://www.ascolizaventem.com/groepmenus-ascoli.html" target="_blank" rel="noopener noreferrer" className="inline-block text-gray-400 hover:text-[#a48f7a] transition-colors text-sm underline">
                  📄 Bekijk Groepmenus (Printbaar)
                </a>
              </div>
            </div>

            {/* Groups Info Box */}
            <div className="mb-12 bg-gradient-to-br from-[#6b1f1f]/10 to-[#a48f7a]/5 border-2 border-[#6b1f1f]/30 rounded-xl p-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Users className="w-8 h-8 text-[#6b1f1f]" />
                <h3 className="text-2xl font-serif text-[#a48f7a]">Groepen Informatie</h3>
              </div>
              <div className="text-gray-300 text-center space-y-3">
                <p>Onze prachtige zaal bevindt zich op de eerste verdieping en biedt plaats aan <strong className="text-white">80 personen</strong>.</p>
                <p>Beneden hebben we een aparte ruimte voor groepen tot <strong className="text-white">20 personen</strong>.</p>
                <p>In totaal kunnen wij tot <strong className="text-white">150 personen</strong> ontvangen.</p>
              </div>
            </div>

            {/* Menu Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {menus.map((menu, idx) => (
                <div key={idx} className={`bg-gradient-to-br ${menu.color} border-2 border-[#6b1f1f]/30 rounded-xl overflow-hidden shadow-2xl`}>
                  <div className="bg-[#1a1a1a]/90 backdrop-blur-sm p-6 border-b border-[#6b1f1f]/20 text-center">
                    <h2 className="text-3xl font-bold text-[#a48f7a] mb-2">{menu.name}</h2>
                    <p className="text-4xl font-bold text-white">{menu.price}</p>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Aperitivo */}
                    <div>
                      <h3 className="text-lg text-[#a48f7a] mb-4 text-center">Aperitivo</h3>
                      <div className="space-y-4">
                        {menu.aperitivo.map((item, i) => (
                          <div key={i}>
                            <div className="text-center">
                              <p className="text-sm text-gray-300 leading-tight">
                                {item.nl}
                                {item.fr !== item.nl && <><br/><span className="italic">{item.fr}</span></>}
                                {item.en !== item.nl && <><br/>{item.en}</>}
                              </p>
                            </div>
                            {i < menu.aperitivo.length - 1 && (
                              <div className="text-center text-white/60 text-xs my-3">OF / OU / OR</div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="text-center text-white/60 text-lg my-4">--o--</div>
                    </div>
                    
                    {/* Main */}
                    <div>
                      <div className="space-y-4">
                        {menu.main.map((item, i) => (
                          <div key={i}>
                            <div className="text-center">
                              <p className="text-sm text-gray-300 leading-tight">
                                {item.nl}
                                {item.fr !== item.nl && <><br/><span className="italic">{item.fr}</span></>}
                                {item.en !== item.nl && <><br/>{item.en}</>}
                              </p>
                            </div>
                            {i < menu.main.length - 1 && (
                              <div className="text-center text-white/60 text-xs my-3">OF / OU / OR</div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="text-center text-white/60 text-lg my-4">--o--</div>
                    </div>

                    {/* Dessert */}
                    <div>
                      <div className="space-y-3">
                        {menu.dessert.map((item, i) => (
                          <div key={i}>
                            <div className="text-center">
                              <p className="text-sm text-gray-300 leading-tight">
                                {item.nl}
                                {item.fr !== item.nl && <><br/><span className="italic">{item.fr}</span></>}
                                {item.en !== item.nl && <><br/>{item.en}</>}
                              </p>
                            </div>
                            {i < menu.dessert.length - 1 && (
                              <div className="text-center text-white/60 text-xs my-3">OF / OU / OR</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Wine included */}
                    <div className="pt-6 border-t border-[#6b1f1f]/20">
                      <p className="text-xs text-gray-400 italic text-center flex items-center justify-center gap-2">
                        <Wine className="w-4 h-4 text-[#a48f7a] flex-shrink-0" />
                        <span>Inclusief: Eén fles wijn per 3 personen • Koffie/thee en cantuccini</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center">
              <Link to={`${BASE_PATH}/reservations`} className="inline-block bg-[#6b1f1f] text-white px-12 py-4 rounded-lg font-bold text-xl hover:bg-[#7d2424] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Reserveer voor groepen
              </Link>
              <p className="mt-4 text-gray-400 text-sm">Menu mogelijk vanaf minimaal 10 personen</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// GALLERY PAGE
function GalleryPage() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navigation />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl text-white font-light text-center mb-12" style={{fontFamily: 'serif'}}>Foto's</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {IMAGES.gallery.map((img, i) => (
              <img key={i} src={img} alt={`Gallery ${i+1}`} className="w-full h-64 object-cover cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelected(img)} />
            ))}
          </div>
          {selected && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={() => setSelected(null)}>
              <button className="absolute top-4 right-4 text-white text-4xl">×</button>
              <img src={selected} alt="Enlarged" className="max-w-full max-h-full" />
            </div>
          )}
          <div className="text-center mt-8"><Link to={BASE_PATH} className="text-[#6b1f1f] text-sm">{t('backToHome')}</Link></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// INFO PAGE
function InfoPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navigation />
      
      {/* Hero */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.groupMenuHero})` }}>
          <div className="absolute inset-0 bg-[#1a1a1a]/60"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6">Informatie</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">Alles wat u moet weten</p>
        </div>
      </div>

      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-serif text-[#a48f7a] mb-8">Contact Informatie</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 text-white">
                  <MapPin className="w-6 h-6 text-[#6b1f1f] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Adres</h3>
                    <p className="text-gray-400">Hector Henneaulaan 136<br/>1930 Zaventem<br/>België</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-white">
                  <Phone className="w-6 h-6 text-[#6b1f1f] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Telefoon</h3>
                    <a href="tel:+3227254545" className="text-gray-400 hover:text-[#6b1f1f] transition-colors">+32 2 725 45 45</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-white">
                  <Clock className="w-6 h-6 text-[#6b1f1f] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Openingstijden</h3>
                    <div className="text-gray-400 space-y-2">
                      <p><span className="font-medium text-white">Maandag - Vrijdag:</span></p>
                      <p className="ml-4">12:00 - 14:00</p>
                      <p className="ml-4">18:30 - 22:30</p>
                      <p className="mt-2"><span className="font-medium text-white">Zaterdag:</span></p>
                      <p className="ml-4">18:30 - 22:30</p>
                      <p className="mt-2"><span className="font-medium text-white">Zondag:</span></p>
                      <p className="ml-4">Gesloten</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-3xl font-serif text-[#a48f7a] mb-8">Locatie</h2>
              <div className="aspect-video bg-gray-800 rounded-sm overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.8675939089746!2d4.474851876929906!3d50.89009047167477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3dda5c78e8c93%3A0x8b7c9c0f8e9c8f0a!2sHector%20Henneaulaan%20136%2C%201930%20Zaventem!5e0!3m2!1snl!2sbe!4v1699999999999!5m2!1snl!2sbe"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="L'Ascoli Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closure Notice */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-[#6b1f1f]/10 border border-[#6b1f1f] rounded-sm p-8">
              <h3 className="text-2xl font-serif text-[#6b1f1f] mb-4">Belangrijk Bericht</h3>
              <p className="text-white text-lg mb-4"><strong>Voor het einde van het jaar zijn wij gesloten op:</strong></p>
              <p className="text-white text-lg">24 december tot en met 1 januari 2026<br/>Open weer vanaf 2 januari 2026</p>
              <div className="mt-6 pt-6 border-t border-[#6b1f1f]/30">
                <p className="text-gray-300"><strong>La fin de l'année nous serions fermés le:</strong><br/>24 décembre au 1er janvier 2026 inclus<br/>Réouverture le 2 janvier 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Takeaway */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-serif text-[#a48f7a] mb-4">Afhalen ook mogelijk</h3>
          <p className="text-gray-300 text-lg">Afhalen is ook mogelijk gedurende onze gewone openingstijden</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// RESERVATIONS PAGE - EXACT like original with JotForm
function ReservationsPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navigation />
      
      {/* Hero */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.reservationsHero})` }}>
          <div className="absolute inset-0 bg-[#1a1a1a]/60"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6">Reservaties</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">Boek uw tafel bij L'Ascoli</p>
        </div>
      </div>

      <section className="py-16 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Closure Notice */}
            <div className="bg-[#6b1f1f]/10 border border-[#6b1f1f] rounded-sm p-8 mb-12">
              <p className="text-[#6b1f1f] text-lg text-center font-semibold">
                <strong>Voor het einde van het jaar zijn wij gesloten op:</strong><br/>
                24 december tot en met 1 januari 2026. Open weer vanaf 2 januari 2026.
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-gray-900 border border-gray-800 rounded-sm p-8 mb-12">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-6">
                  <strong className="text-white">U kunt onderstaand formulier gebruiken voor een reservering.</strong> Uw reservering is bevestigd en u wordt <strong>NIET</strong> terug gecontacteerd, tenzij wij vol zijn geboekt of indien wij verdere vragen hebben. Heeft u alleen een vraag? Dan kunt u hetzelfde formulier gebruiken of via onderstaande contaktgegevens. <strong>Indien u een reservatie doorstuurd van 10 personen of meer, dan beantwoorden we u binnen de 12 uur met een menu voorstel.</strong>
                </p>
                <div className="bg-[#6b1f1f]/10 border-l-4 border-[#6b1f1f] p-6 mt-6">
                  <p className="text-[#6b1f1f] text-lg font-semibold">
                    LET OP: gesloten op zaterdagmiddag <span className="text-green-500">(s'avonds wel open)</span> en zondag de gehele dag.
                  </p>
                </div>
              </div>
            </div>

            {/* JotForm */}
            <div className="bg-white rounded-sm overflow-hidden">
              <iframe
                id="JotFormIFrame-81428826238362"
                title="ASCOLI Reservation Form"
                src="https://form.jotform.com/81428826238362"
                style={{ minWidth: '100%', maxWidth: '100%', height: '600px', border: 'none' }}
                scrolling="yes"
              ></iframe>
            </div>

            {/* Contact Info */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="text-[#a48f7a] font-semibold mb-2 uppercase text-sm">Website</h4>
                <p className="text-gray-400">www.ascolizaventem.com</p>
              </div>
              <div>
                <h4 className="text-[#a48f7a] font-semibold mb-2 uppercase text-sm">Telefoon</h4>
                <a href="tel:+3227254545" className="text-gray-400 hover:text-[#6b1f1f] transition-colors">+32 2 725 45 45</a>
              </div>
              <div>
                <h4 className="text-[#a48f7a] font-semibold mb-2 uppercase text-sm">Adres</h4>
                <p className="text-gray-400">Hector Henneaulaan 136<br/>1930 Zaventem</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// MAIN APP
function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <div className="ascoli-app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/group-menu" element={<GroupMenuPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default App;
