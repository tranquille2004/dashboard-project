import React, { useState, createContext, useContext, useEffect } from 'react';
import './ascoli.css';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ChefHat, Utensils, Wine, Globe } from 'lucide-react';

const BASE_PATH = '/site/ascoli';

// Image paths - using live site images
const IMAGES = {
  logo: 'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/ascoli.jpg',
  hero: 'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/333497-362660580479961-522768784-o.jpg',
  interior: 'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/333497-362660580479961-522768784-o.jpg',
  dishes: [
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5788_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5857_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5879_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5889_orig.jpg',
  ],
  fworksLogo: 'https://raw.githubusercontent.com/tranquille2004/Bottega/main/frontend/public/images/fworksbuilders-logo.png',
};

// ===========================================
// TRANSLATIONS
// ===========================================
const translations = {
  nl: {
    home: 'Home', about: 'Wie zijn wij?', menu: 'Kaart', groupMenus: 'Groepmenus',
    reserve: 'Reserveren', gallery: "Foto's", info: 'Info',
    heroTitle: "L'ASCOLI", heroSubtitle: 'Authentieke Italiaanse keuken in het hart van Zaventem',
    reserveBtn: 'RESERVEREN', menuBtn: 'BEKIJK MENU',
    feature1Title: 'Italiaanse Kwaliteit', feature1Text: 'Authentieke Italiaanse ingrediënten',
    feature2Title: 'Verse Bereiding', feature2Text: 'Dagelijks vers bereid',
    feature3Title: 'Elegante Ambiance', feature3Text: 'Verfijnde eetervaring',
    ctaTitle: 'Klaar voor een onvergetelijke ervaring?', ctaSubtitle: 'Reserveer nu uw tafel',
    aboutTitle: 'Authentieke Italiaanse Keuken',
    aboutText: 'Sinds 2015 biedt Antonio Di Siervi smakelijke Italiaanse gerechten aan zoals octopussalade met selderij, peterselie, knoflook, citroen en altijd bereidt met biologische olijfolie. Maar ook gefrituurde Sint Jakobs op een julienne van witlof met zwarte truffelpesto of de kleine Treviso salade met pijnboompitten, basilicum en sinaasappel.',
    aboutText2: 'Tevens zijn er de klassiekers: trio van verse pasta, koteletten, carpaccios en gebakken vis. Dit alles met een goede uitgebreide wijnkaart, inclusief biologische wijnen. L\'Ascoli bevindt zich niet ver van de luchthaven en zit in een prachtige 19e-eeuwse boerderij met een mooi interieur en een prachtige eerste verdieping, perfect voor grote groepen tot wel 80 personen. In de zomer kan men genieten van de Toscaanse tuin.',
    readStory: 'Lees ons verhaal',
    dishesTitle: 'Onze Gerechten', dishesSubtitle: 'Een selectie van onze authentieke Italiaanse creaties',
    viewGallery: 'Bekijk volledige galerij',
    backToHome: 'Terug naar Home',
    groupMenusPageTitle: "Groepmenu's", groupMenusPageSubtitle: 'Perfecte keuze voor groepen vanaf 10 personen',
    reserveForGroups: 'Reserveer voor groepen', viewPrintable: 'Bekijk Groepmenus (Printbaar)',
    groupsInfo: 'Groepen Informatie',
    groupsText1: 'Onze prachtige zaal bevindt zich op de eerste verdieping en biedt plaats aan 80 personen.',
    groupsText2: 'Beneden hebben we een aparte ruimte voor groepen tot 20 personen.',
    groupsText3: 'In totaal kunnen wij tot 150 personen ontvangen.',
    minimumPersons: 'Menu mogelijk vanaf minimaal 10 personen',
    menuPageTitle: 'Onze Kaart', menuPageSubtitle: 'Authentieke Italiaanse gerechten',
    makeReservation: 'Maak een reservatie',
    infoPageTitle: 'Informatie', infoPageSubtitle: 'Alles wat u moet weten',
    address: 'Adres', phone: 'Telefoon', openingHours: 'Openingstijden',
    monFri: 'Maandag - Vrijdag', sat: 'Zaterdag', sun: 'Zondag', closed: 'Gesloten',
    accessibility: 'Bereikbaarheid', accessibilityText: 'Gelegen nabij de luchthaven van Zaventem. Gemakkelijk bereikbaar per auto en openbaar vervoer.',
    importantNotice: 'Belangrijk Bericht',
    closureNotice: 'Voor het einde van het jaar zijn wij gesloten op: 24 december tot en met 1 januari 2026. Open weer vanaf 2 januari 2026.',
    takeawayInfo: 'Afhalen ook mogelijk',
    takeawayText: 'Afhalen is ook mogelijk gedurende onze gewone openingstijden',
    galleryPageTitle: "Foto's", galleryPageSubtitle: 'Ontdek ons restaurant',
    aboutPageTitle: 'Wie zijn wij?', aboutPageSubtitle: 'Ontdek ons verhaal',
    ourStory: 'Ons Verhaal',
    reservePageTitle: 'Reserveren', reservePageSubtitle: 'Boek uw tafel',
    allRightsReserved: 'Alle rechten voorbehouden',
    restaurantType: 'Italiaans Restaurant',
    webmasterText: 'Website gemaakt door',
    wineIncluded: 'Inclusief: Eén fles wijn per 3 personen • Koffie/thee en cantuccini',
  },
  fr: {
    home: 'Accueil', about: 'Qui sommes-nous?', menu: 'Carte', groupMenus: 'Menus de Groupe',
    reserve: 'Réserver', gallery: 'Photos', info: 'Info',
    heroTitle: "L'ASCOLI", heroSubtitle: 'Cuisine italienne authentique au cœur de Zaventem',
    reserveBtn: 'RÉSERVER', menuBtn: 'VOIR MENU',
    feature1Title: 'Qualité Italienne', feature1Text: 'Ingrédients italiens authentiques',
    feature2Title: 'Préparation Fraîche', feature2Text: 'Préparé frais chaque jour',
    feature3Title: 'Ambiance Élégante', feature3Text: 'Expérience culinaire raffinée',
    ctaTitle: 'Prêt pour une expérience inoubliable?', ctaSubtitle: 'Réservez votre table maintenant',
    aboutTitle: 'Cuisine Italienne Authentique',
    aboutText: 'Depuis 2015, Antonio Di Siervi propose de délicieux plats italiens comme la salade de poulpe au céleri, persil, ail, citron et toujours préparés avec de l\'huile d\'olive biologique.',
    readStory: 'Lire notre histoire',
    dishesTitle: 'Nos Plats', dishesSubtitle: 'Une sélection de nos créations italiennes authentiques',
    viewGallery: 'Voir la galerie complète',
    backToHome: 'Retour à l\'accueil',
    groupMenusPageTitle: 'Menus de Groupe', groupMenusPageSubtitle: 'Choix parfait pour les groupes à partir de 10 personnes',
    reserveForGroups: 'Réserver pour groupes', viewPrintable: 'Voir Menus de Groupe (Imprimable)',
    minimumPersons: 'Menu disponible à partir de 10 personnes minimum',
    menuPageTitle: 'Notre Carte', menuPageSubtitle: 'Plats italiens authentiques',
    makeReservation: 'Faire une réservation',
    infoPageTitle: 'Informations', infoPageSubtitle: 'Tout ce que vous devez savoir',
    address: 'Adresse', phone: 'Téléphone', openingHours: 'Heures d\'ouverture',
    monFri: 'Lundi - Vendredi', sat: 'Samedi', sun: 'Dimanche', closed: 'Fermé',
    closureNotice: 'La fin de l\'année nous serions fermés le: 24 décembre au 1er janvier 2026 inclus. Réouverture le 2 janvier 2026.',
    galleryPageTitle: 'Photos', galleryPageSubtitle: 'Découvrez notre restaurant',
    aboutPageTitle: 'Qui sommes-nous?', aboutPageSubtitle: 'Découvrez notre histoire',
    reservePageTitle: 'Réserver', reservePageSubtitle: 'Réservez votre table',
    allRightsReserved: 'Tous droits réservés',
    restaurantType: 'Restaurant Italien',
    webmasterText: 'Site web créé par',
  },
  en: {
    home: 'Home', about: 'About Us', menu: 'Menu', groupMenus: 'Group Menus',
    reserve: 'Reserve', gallery: 'Photos', info: 'Info',
    heroTitle: "L'ASCOLI", heroSubtitle: 'Authentic Italian cuisine in the heart of Zaventem',
    reserveBtn: 'RESERVE', menuBtn: 'VIEW MENU',
    feature1Title: 'Italian Quality', feature1Text: 'Authentic Italian ingredients',
    feature2Title: 'Fresh Preparation', feature2Text: 'Freshly prepared daily',
    feature3Title: 'Elegant Ambiance', feature3Text: 'Refined dining experience',
    ctaTitle: 'Ready for an unforgettable experience?', ctaSubtitle: 'Reserve your table now',
    aboutTitle: 'Authentic Italian Cuisine',
    readStory: 'Read our story',
    dishesTitle: 'Our Dishes', dishesSubtitle: 'A selection of our authentic Italian creations',
    viewGallery: 'View full gallery',
    backToHome: 'Back to Home',
    groupMenusPageTitle: 'Group Menus', groupMenusPageSubtitle: 'Perfect choice for groups from 10 people',
    minimumPersons: 'Menu available from minimum 10 persons',
    menuPageTitle: 'Our Menu', menuPageSubtitle: 'Authentic Italian dishes',
    makeReservation: 'Make a reservation',
    infoPageTitle: 'Information', infoPageSubtitle: 'Everything you need to know',
    address: 'Address', phone: 'Phone', openingHours: 'Opening Hours',
    monFri: 'Monday - Friday', sat: 'Saturday', sun: 'Sunday', closed: 'Closed',
    closureNotice: 'For the end of the year we are closed on: December 24 to January 1, 2026. Open again from January 2, 2026.',
    galleryPageTitle: 'Photos', galleryPageSubtitle: 'Discover our restaurant',
    aboutPageTitle: 'About Us', aboutPageSubtitle: 'Discover our story',
    reservePageTitle: 'Reserve', reservePageSubtitle: 'Book your table',
    allRightsReserved: 'All rights reserved',
    restaurantType: 'Italian Restaurant',
    webmasterText: 'Website created by',
  },
};

// ===========================================
// LANGUAGE CONTEXT
// ===========================================
const LanguageContext = createContext();

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('nl');
  const t = (key) => translations[language]?.[key] || translations['nl'][key] || key;
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  return useContext(LanguageContext);
}

// ===========================================
// LANGUAGE SWITCHER
// ===========================================
function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const flags = { nl: '🇧🇪', fr: '🇫🇷', en: '🇬🇧' };
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-gray-700 hover:text-[#8B0000] transition-colors"
      >
        <span>{flags[language]}</span>
        <span className="text-sm font-medium uppercase">{language}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-2 z-50 min-w-[100px]">
          {Object.entries(flags).map(([lang, flag]) => (
            <button
              key={lang}
              onClick={() => { setLanguage(lang); setIsOpen(false); }}
              className={`w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100 ${language === lang ? 'bg-gray-50' : ''}`}
            >
              <span>{flag}</span>
              <span className="uppercase text-sm">{lang}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ===========================================
// SCROLL TO TOP
// ===========================================
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// ===========================================
// NAVIGATION
// ===========================================
function Navigation() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to={BASE_PATH} className="flex items-center">
            <img src={IMAGES.logo} alt="L'Ascoli" className="h-12 w-auto" />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to={BASE_PATH} className={`text-sm font-medium uppercase tracking-wide transition-colors ${scrolled ? 'text-gray-700 hover:text-[#8B0000]' : 'text-white hover:text-gray-200'}`}>{t('home')}</Link>
            <Link to={`${BASE_PATH}/about`} className={`text-sm font-medium uppercase tracking-wide transition-colors ${scrolled ? 'text-gray-700 hover:text-[#8B0000]' : 'text-white hover:text-gray-200'}`}>{t('about')}</Link>
            <Link to={`${BASE_PATH}/menu`} className={`text-sm font-medium uppercase tracking-wide transition-colors ${scrolled ? 'text-gray-700 hover:text-[#8B0000]' : 'text-white hover:text-gray-200'}`}>{t('menu')}</Link>
            <Link to={`${BASE_PATH}/group-menu`} className={`text-sm font-medium uppercase tracking-wide transition-colors ${scrolled ? 'text-gray-700 hover:text-[#8B0000]' : 'text-white hover:text-gray-200'}`}>{t('groupMenus')}</Link>
            <Link to={`${BASE_PATH}/reservations`} className={`text-sm font-medium uppercase tracking-wide transition-colors ${scrolled ? 'text-gray-700 hover:text-[#8B0000]' : 'text-white hover:text-gray-200'}`}>{t('reserve')}</Link>
            <Link to={`${BASE_PATH}/gallery`} className={`text-sm font-medium uppercase tracking-wide transition-colors ${scrolled ? 'text-gray-700 hover:text-[#8B0000]' : 'text-white hover:text-gray-200'}`}>{t('gallery')}</Link>
            <Link to={`${BASE_PATH}/info`} className={`text-sm font-medium uppercase tracking-wide transition-colors ${scrolled ? 'text-gray-700 hover:text-[#8B0000]' : 'text-white hover:text-gray-200'}`}>{t('info')}</Link>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            <div className={`w-6 h-0.5 mb-1.5 transition-colors ${scrolled ? 'bg-gray-600' : 'bg-white'}`}></div>
            <div className={`w-6 h-0.5 mb-1.5 transition-colors ${scrolled ? 'bg-gray-600' : 'bg-white'}`}></div>
            <div className={`w-6 h-0.5 transition-colors ${scrolled ? 'bg-gray-600' : 'bg-white'}`}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link to={BASE_PATH} onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-[#8B0000] uppercase text-sm font-medium">{t('home')}</Link>
              <Link to={`${BASE_PATH}/about`} onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-[#8B0000] uppercase text-sm font-medium">{t('about')}</Link>
              <Link to={`${BASE_PATH}/menu`} onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-[#8B0000] uppercase text-sm font-medium">{t('menu')}</Link>
              <Link to={`${BASE_PATH}/group-menu`} onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-[#8B0000] uppercase text-sm font-medium">{t('groupMenus')}</Link>
              <Link to={`${BASE_PATH}/reservations`} onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-[#8B0000] uppercase text-sm font-medium">{t('reserve')}</Link>
              <Link to={`${BASE_PATH}/gallery`} onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-[#8B0000] uppercase text-sm font-medium">{t('gallery')}</Link>
              <Link to={`${BASE_PATH}/info`} onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-[#8B0000] uppercase text-sm font-medium">{t('info')}</Link>
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ===========================================
// FOOTER
// ===========================================
function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#1a1a1a] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <img src={IMAGES.logo} alt="L'Ascoli" className="h-10 mb-4" />
            <p className="text-gray-400 text-sm">{t('restaurantType')}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400 text-sm">Hector Henneaulaan 136</p>
            <p className="text-gray-400 text-sm">1930 Zaventem</p>
            <p className="text-gray-400 text-sm mt-2">+32 2 725 45 45</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('openingHours')}</h4>
            <p className="text-gray-400 text-sm">{t('monFri')}: 12:00-14:00, 18:30-22:30</p>
            <p className="text-gray-400 text-sm">{t('sat')}: 18:30-22:30</p>
            <p className="text-gray-400 text-sm">{t('sun')}: {t('closed')}</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} L'Ascoli. {t('allRightsReserved')}.</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs">
            <img src={IMAGES.fworksLogo} alt="f.works" className="h-5" />
            <span>{t('webmasterText')}: fworksbuilders bv.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ===========================================
// HOME PAGE
// ===========================================
function HomePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={IMAGES.hero} alt="L'Ascoli" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl md:text-8xl font-serif mb-6 tracking-wider">{t('heroTitle')}</h1>
          <p className="text-xl md:text-2xl mb-8 font-light">{t('heroSubtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate(`${BASE_PATH}/reservations`)} className="bg-[#8B0000] hover:bg-[#6B0000] text-white px-8 py-4 rounded font-semibold uppercase tracking-wide transition-all">
              {t('reserveBtn')} →
            </button>
            <button onClick={() => navigate(`${BASE_PATH}/menu`)} className="bg-white/10 backdrop-blur-sm border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded font-semibold uppercase tracking-wide transition-all">
              {t('menuBtn')} →
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-4 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 divide-x divide-gray-700">
            <div className="text-center py-8 px-6">
              <ChefHat className="w-10 h-10 text-[#8B0000] mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">{t('feature1Title')}</h3>
              <p className="text-gray-400 text-sm">{t('feature1Text')}</p>
            </div>
            <div className="text-center py-8 px-6">
              <Utensils className="w-10 h-10 text-[#8B0000] mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">{t('feature2Title')}</h3>
              <p className="text-gray-400 text-sm">{t('feature2Text')}</p>
            </div>
            <div className="text-center py-8 px-6">
              <Wine className="w-10 h-10 text-[#8B0000] mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">{t('feature3Title')}</h3>
              <p className="text-gray-400 text-sm">{t('feature3Text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#8B0000] text-white text-center">
        <h2 className="text-3xl md:text-4xl font-serif mb-4">{t('ctaTitle')}</h2>
        <p className="text-lg mb-8">{t('ctaSubtitle')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate(`${BASE_PATH}/reservations`)} className="bg-white text-[#8B0000] px-8 py-3 rounded font-semibold uppercase tracking-wide hover:bg-gray-100 transition-all">
            {t('reserveBtn')} →
          </button>
          <button onClick={() => navigate(`${BASE_PATH}/menu`)} className="border-2 border-white text-white px-8 py-3 rounded font-semibold uppercase tracking-wide hover:bg-white hover:text-[#8B0000] transition-all">
            {t('menuBtn')} →
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-[#FDF8F3]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif text-[#8B0000] mb-6">{t('aboutTitle')}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{t('aboutText')}</p>
              <p className="text-gray-600 leading-relaxed mb-6">{t('aboutText2')}</p>
              <Link to={`${BASE_PATH}/about`} className="text-[#8B0000] font-semibold hover:underline">
                {t('readStory')} →
              </Link>
            </div>
            <div>
              <img src={IMAGES.interior} alt="Restaurant Interior" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Dishes Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">{t('dishesTitle')}</h2>
            <p className="text-gray-600">{t('dishesSubtitle')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {IMAGES.dishes.map((dish, idx) => (
              <img key={idx} src={dish} alt={`Dish ${idx + 1}`} className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow" />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to={`${BASE_PATH}/gallery`} className="text-[#8B0000] font-semibold hover:underline">
              {t('viewGallery')} →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ===========================================
// ABOUT PAGE
// ===========================================
function AboutPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={IMAGES.interior} alt="Interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">{t('aboutPageTitle')}</h1>
          <p className="text-xl">{t('aboutPageSubtitle')}</p>
        </div>
      </section>
      
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif text-[#8B0000] mb-8 text-center">{t('ourStory')}</h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">{t('aboutText')}</p>
          <p className="text-gray-600 leading-relaxed text-lg">{t('aboutText2')}</p>
          <div className="mt-12 text-center">
            <Link to={BASE_PATH} className="text-[#8B0000] hover:underline font-medium">{t('backToHome')}</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

// ===========================================
// MENU PAGE
// ===========================================
function MenuPage() {
  const { t } = useLanguage();
  
  const menuCategories = [
    {
      title: 'Koude voorgerechten',
      items: [
        { name: 'Burrata van buffel met tomaten en basilicum in olijfolie', price: '€ 22,00' },
        { name: 'Rundercarpaccio gemarineerd in olijfolie en citroen, met parmezaanschilfers', price: '€ 21,50' },
        { name: 'Bresaola gemarineerd in olijfolie en citroen, met parmezaanschilfers', price: '€ 24,50' },
        { name: 'Salade van inktvis', price: '€ 24,50' },
        { name: 'Parmaham met meloen', price: '€ 23,50' },
        { name: 'Vitello tonnato', price: '€ 24,50' },
        { name: 'Bordje antipasti', price: '€ 23,50' },
      ]
    },
    {
      title: 'Huisgemaakte pasta',
      items: [
        { name: 'Spaghetti met verse kerstomaten, look en basilicum', price: '€ 17,50' },
        { name: 'Spaghetti met schelpdieren', price: '€ 24,50' },
        { name: 'Linguini met scampi, courgette en pijnboompitten', price: '€ 24,50' },
        { name: 'Tagliolini met pesto van zwarte truffel', price: '€ 28,50' },
        { name: 'Ravioli met rivierkreeftjes en champignons', price: '€ 23,50' },
        { name: 'Kwartet van verse huisgemaakte pasta', price: '€ 23,50' },
      ]
    },
    {
      title: 'Visgerechten',
      items: [
        { name: 'Gegrilde inkvis met italiaanse kruiden', price: '€ 26,50' },
        { name: 'Filet van wilde zeebaars met rozemarijn en citroen', price: '€ 34,50' },
        { name: 'Rode tonijnfilet met italiaanse kruiden', price: '€ 33,50' },
        { name: 'Filet van zeebrasem aqua pazza', price: '€ 32,50' },
      ]
    },
    {
      title: 'Vleesgerechten',
      items: [
        { name: 'Mechelse koekoek met Amalfi citroen', price: '€ 25,50' },
        { name: 'Saltimbocca alla Romana', price: '€ 28,50' },
        { name: 'Tagliata, Runderlapje op raketsla', price: '€ 32,50' },
        { name: 'Gegrilde Filet pur met groenten', price: '€ 36,50' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={IMAGES.dishes[0]} alt="Menu" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">{t('menuPageTitle')}</h1>
          <p className="text-xl">{t('menuPageSubtitle')}</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#FDF8F3]">
        <div className="max-w-4xl mx-auto">
          {menuCategories.map((category, idx) => (
            <div key={idx} className="mb-12">
              <h2 className="text-3xl font-serif text-[#8B0000] mb-6 text-center">{category.title}</h2>
              <div className="space-y-4">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex justify-between items-start border-b border-gray-200 pb-4">
                    <span className="text-gray-700 flex-1 pr-4">{item.name}</span>
                    <span className="text-[#8B0000] font-semibold whitespace-nowrap">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="text-center mt-12">
            <Link to={`${BASE_PATH}/reservations`} className="inline-block bg-[#8B0000] text-white px-8 py-4 rounded font-semibold uppercase tracking-wide hover:bg-[#6B0000] transition-all">
              {t('makeReservation')}
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link to={BASE_PATH} className="text-[#8B0000] hover:underline font-medium">{t('backToHome')}</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

// ===========================================
// GROUP MENU PAGE
// ===========================================
function GroupMenuPage() {
  const { t } = useLanguage();

  const menus = [
    { name: 'TORINO', price: '€47,50' },
    { name: 'PUGLIA', price: '€52,50' },
    { name: 'AMALFI', price: '€57,50' },
    { name: 'ASCOLI', price: '€67,50' },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navigation />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-serif text-white mb-4">{t('groupMenusPageTitle')}</h1>
            <p className="text-gray-300 text-lg mb-8">{t('groupMenusPageSubtitle')}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to={`${BASE_PATH}/reservations`} className="bg-[#8B0000] text-white px-6 py-3 rounded font-semibold uppercase tracking-wide hover:bg-[#6B0000] transition-all">
                {t('reserveForGroups')}
              </Link>
              <a href="https://www.ascolizaventem.com/groepmenus-ascoli.html" target="_blank" rel="noopener noreferrer" className="border border-white text-white px-6 py-3 rounded font-semibold uppercase tracking-wide hover:bg-white hover:text-[#1a1a1a] transition-all">
                📄 {t('viewPrintable')}
              </a>
            </div>

            <div className="bg-white/10 rounded-lg p-6 max-w-2xl mx-auto mb-12">
              <h3 className="text-xl font-semibold text-white mb-4">{t('groupsInfo')}</h3>
              <p className="text-gray-300 text-sm mb-2">{t('groupsText1')}</p>
              <p className="text-gray-300 text-sm mb-2">{t('groupsText2')}</p>
              <p className="text-gray-300 text-sm">{t('groupsText3')}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {menus.map((menu, idx) => (
              <div key={idx} className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-6 text-center border border-gray-700">
                <h2 className="text-2xl font-serif text-white mb-2">{menu.name}</h2>
                <p className="text-3xl font-bold text-[#8B0000]">{menu.price}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400">{t('minimumPersons')}</p>
          <p className="text-center text-gray-400 mt-4 text-sm">{t('wineIncluded')}</p>

          <div className="mt-12 text-center">
            <Link to={BASE_PATH} className="text-[#8B0000] hover:underline font-medium">{t('backToHome')}</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ===========================================
// GALLERY PAGE
// ===========================================
function GalleryPage() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    ...IMAGES.dishes,
    IMAGES.interior,
    IMAGES.hero,
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="relative h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={IMAGES.interior} alt="Gallery" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-serif mb-4">{t('galleryPageTitle')}</h1>
          <p className="text-xl">{t('galleryPageSubtitle')}</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer hover:scale-105"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          {selectedImage && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
              <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 text-white text-4xl">×</button>
              <img src={selectedImage} alt="Enlarged" className="max-w-full max-h-full object-contain" />
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to={BASE_PATH} className="text-[#8B0000] hover:underline font-medium">{t('backToHome')}</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

// ===========================================
// INFO PAGE
// ===========================================
function InfoPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-serif text-gray-900 mb-4">{t('infoPageTitle')}</h1>
            <p className="text-gray-600 text-lg">{t('infoPageSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-serif text-[#8B0000] mb-6">{t('address')}</h3>
              <p className="text-gray-700 mb-2">Hector Henneaulaan 136</p>
              <p className="text-gray-700 mb-2">1930 Zaventem</p>
              <p className="text-gray-700">België</p>
              
              <h3 className="text-2xl font-serif text-[#8B0000] mt-8 mb-4">{t('phone')}</h3>
              <a href="tel:+3227254545" className="text-gray-700 hover:text-[#8B0000]">+32 2 725 45 45</a>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-serif text-[#8B0000] mb-6">{t('openingHours')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">{t('monFri')}:</span>
                  <span className="text-gray-600">12:00-14:00, 18:30-22:30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">{t('sat')}:</span>
                  <span className="text-gray-600">18:30-22:30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">{t('sun')}:</span>
                  <span className="text-gray-600">{t('closed')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#8B0000] text-white rounded-lg p-8 mb-12">
            <h3 className="text-xl font-semibold mb-4">{t('importantNotice')}</h3>
            <p>{t('closureNotice')}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-serif text-[#8B0000] mb-4">{t('takeawayInfo')}</h3>
            <p className="text-gray-700">{t('takeawayText')}</p>
          </div>

          <div className="mt-12 text-center">
            <Link to={BASE_PATH} className="text-[#8B0000] hover:underline font-medium">{t('backToHome')}</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ===========================================
// RESERVATIONS PAGE
// ===========================================
function ReservationsPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-serif text-gray-900 mb-4">{t('reservePageTitle')}</h1>
            <p className="text-gray-600 text-lg">{t('reservePageSubtitle')}</p>
          </div>

          <div className="bg-[#8B0000] text-white rounded-lg p-6 mb-8 text-center">
            <p><strong>{t('importantNotice')}:</strong> {t('closureNotice')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <iframe 
              src="https://form.jotform.com/220025085008342"
              style={{ width: '100%', minHeight: '800px', border: 'none' }}
              title="Reservation Form"
              scrolling="yes"
            />
          </div>

          <div className="mt-8 text-center">
            <Link to={BASE_PATH} className="text-[#8B0000] hover:underline font-medium">{t('backToHome')}</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ===========================================
// CONFIRMATION PAGE
// ===========================================
function ConfirmationPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-serif text-[#8B0000] mb-4">Grazie!</h1>
        <p className="text-gray-600 mb-8">Uw reservatie is ontvangen. U ontvangt een bevestiging per e-mail.</p>
        <Link to={BASE_PATH} className="bg-[#8B0000] text-white px-6 py-3 rounded hover:bg-[#6B0000] transition-colors inline-block">
          {t('backToHome')}
        </Link>
      </div>
    </div>
  );
}

// ===========================================
// MAIN APP
// ===========================================
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
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default App;
