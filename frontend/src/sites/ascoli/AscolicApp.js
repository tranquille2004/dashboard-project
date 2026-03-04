import React, { useState, createContext, useContext, useEffect } from 'react';
import './ascoli.css';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ChefHat, Utensils, Wine } from 'lucide-react';

const BASE_PATH = '/site/ascoli';

// EXACT images from original site
const IMAGES = {
  logo: 'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/ascoli_orig.jpg',
  hero: 'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/45280374-1885058464947804-146153777123033088-o_2_orig.jpg',
  feature1: 'https://www.ascolizaventem.com/images/img-5788.jpg',
  feature2: 'https://www.ascolizaventem.com/images/img-5857.jpg',
  feature3: 'https://www.ascolizaventem.com/images/333497-362660580479961-522768784-o.jpg',
  tomatoes: 'https://www.ascolizaventem.com/images/img-5889.jpg',
  menuHero: 'https://www.ascolizaventem.com/images/img-5879.jpg',
  dishes: [
    'https://www.ascolizaventem.com/images/img-5788.jpg',
    'https://www.ascolizaventem.com/images/img-5857.jpg',
    'https://www.ascolizaventem.com/images/img-5879.jpg',
    'https://www.ascolizaventem.com/images/img-5889.jpg',
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
    aboutTitle: 'Authentieke Italiaanse Keuken',
    aboutText: 'Sinds 2015 biedt Antonio Di Siervi smakelijke Italiaanse gerechten aan zoals octopussalade met selderij, peterselie, knoflook, citroen en altijd bereidt met biologische olijfolie. Maar ook gefrituurde Sint Jakobs op een julienne van witlof met zwarte truffelpesto of de kleine Treviso salade met pijnboompitten, basilicum en sinaasappel.',
    readMore: 'LEES MEER',
    backToHome: '← Terug naar Home',
    menuPageTitle: 'Onze Kaart', menuPageSubtitle: 'Authentieke Italiaanse gerechten',
    makeReservation: 'MAAK EEN RESERVATIE',
    galleryPageTitle: "Foto's", galleryPageSubtitle: 'Ontdek ons restaurant',
    reservePageTitle: 'Reserveren', reservePageSubtitle: 'Boek uw tafel',
    infoPageTitle: 'Info', openingHours: 'Openingstijden',
    monFri: 'Maandag - Vrijdag', sat: 'Zaterdag', sun: 'Zondag', closed: 'Gesloten',
    address: 'Adres', phone: 'Telefoon',
    allRightsReserved: 'Alle rechten voorbehouden',
    closureNotice: 'Voor het einde van het jaar zijn wij gesloten op: 24 december tot en met 1 januari 2026.',
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
    aboutTitle: 'Cuisine Italienne Authentique',
    readMore: 'LIRE LA SUITE',
    backToHome: '← Retour à l\'accueil',
    menuPageTitle: 'Notre Carte', menuPageSubtitle: 'Plats italiens authentiques',
    makeReservation: 'FAIRE UNE RÉSERVATION',
    galleryPageTitle: 'Photos', galleryPageSubtitle: 'Découvrez notre restaurant',
    reservePageTitle: 'Réserver', reservePageSubtitle: 'Réservez votre table',
    infoPageTitle: 'Info', openingHours: 'Heures d\'ouverture',
    monFri: 'Lundi - Vendredi', sat: 'Samedi', sun: 'Dimanche', closed: 'Fermé',
    address: 'Adresse', phone: 'Téléphone',
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
    aboutTitle: 'Authentic Italian Cuisine',
    readMore: 'READ MORE',
    backToHome: '← Back to Home',
    menuPageTitle: 'Our Menu', menuPageSubtitle: 'Authentic Italian dishes',
    makeReservation: 'MAKE A RESERVATION',
    galleryPageTitle: 'Photos', galleryPageSubtitle: 'Discover our restaurant',
    reservePageTitle: 'Reserve', reservePageSubtitle: 'Book your table',
    infoPageTitle: 'Info', openingHours: 'Opening Hours',
    monFri: 'Monday - Friday', sat: 'Saturday', sun: 'Sunday', closed: 'Closed',
    address: 'Address', phone: 'Phone',
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

// Language Switcher - exact like original with Belgian flag
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
          <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
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

// Footer
function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#1a1a1a] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-8">
        <div><img src={IMAGES.logo} alt="L'Ascoli" className="h-10 mb-4" /><p className="text-gray-400 text-sm">Italiaans Restaurant</p></div>
        <div><h4 className="font-semibold mb-4">Contact</h4><p className="text-gray-400 text-sm">Hector Henneaulaan 136<br/>1930 Zaventem<br/>+32 2 725 45 45</p></div>
        <div><h4 className="font-semibold mb-4">{t('openingHours')}</h4><p className="text-gray-400 text-sm">{t('monFri')}: 12:00-14:00, 18:30-22:30<br/>{t('sat')}: 18:30-22:30<br/>{t('sun')}: {t('closed')}</p></div>
      </div>
      <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} L'Ascoli. {t('allRightsReserved')}.</p>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs">
          <img src={IMAGES.fworksLogo} alt="f.works" className="h-5" />
          <span>Webmaster: fworksbuilders bv.</span>
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
            <button onClick={() => navigate(`${BASE_PATH}/reservations`)} className="bg-[#722F37] hover:bg-[#5a252c] text-white px-8 py-4 text-sm tracking-widest transition-all flex items-center gap-2">
              {t('reserveBtn')} <span>›</span>
            </button>
            <button onClick={() => navigate(`${BASE_PATH}/menu`)} className="bg-transparent border border-white/50 text-white px-8 py-4 text-sm tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
              {t('menuBtn')} <span>›</span>
            </button>
          </div>
        </div>
      </section>

      {/* Three Features with text overlay - EXACT like original */}
      <section className="grid grid-cols-3">
        <div className="relative h-48">
          <img src={IMAGES.feature1} alt="Italiaanse Kwaliteit" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
            <h3 className="text-white text-xl font-light">{t('feature1Title')}</h3>
            <p className="text-white/70 text-sm">{t('feature1Text')}</p>
          </div>
        </div>
        <div className="relative h-48">
          <img src={IMAGES.feature2} alt="Verse Bereiding" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
            <h3 className="text-white text-xl font-light">{t('feature2Title')}</h3>
            <p className="text-white/70 text-sm">{t('feature2Text')}</p>
          </div>
        </div>
        <div className="relative h-48">
          <img src={IMAGES.feature3} alt="Elegante Ambiance" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
            <h3 className="text-white text-xl font-light">{t('feature3Title')}</h3>
            <p className="text-white/70 text-sm">{t('feature3Text')}</p>
          </div>
        </div>
      </section>

      {/* CTA Section - EXACT like original */}
      <section className="py-24 px-4 bg-[#0d0d0d] text-center">
        <h2 className="text-4xl md:text-5xl text-white font-light mb-4" style={{fontFamily: 'serif'}}>{t('ctaTitle')}</h2>
        <p className="text-gray-400 mb-8">{t('ctaSubtitle')}</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => navigate(`${BASE_PATH}/reservations`)} className="bg-[#722F37] hover:bg-[#5a252c] text-white px-8 py-4 text-sm tracking-widest flex items-center gap-2">
            {t('reserveBtn')} <span>›</span>
          </button>
          <button onClick={() => navigate(`${BASE_PATH}/menu`)} className="bg-transparent border border-white/30 text-white px-8 py-4 text-sm tracking-widest hover:bg-white/10 flex items-center gap-2">
            {t('menuBtn')} <span>›</span>
          </button>
        </div>
      </section>

      {/* About Section - EXACT like original with dark bg and tomato image */}
      <section className="py-20 px-4 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl text-[#9a8478] font-light mb-6" style={{fontFamily: 'serif'}}>{t('aboutTitle')}</h2>
            <p className="text-gray-400 leading-relaxed mb-6">{t('aboutText')}</p>
            <Link to={`${BASE_PATH}/about`} className="text-[#722F37] text-sm tracking-widest hover:underline">{t('readMore')} ›</Link>
          </div>
          <div><img src={IMAGES.tomatoes} alt="Tomatoes" className="rounded-lg" /></div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 px-4 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {IMAGES.dishes.map((img, i) => <img key={i} src={img} alt={`Dish ${i+1}`} className="w-full h-48 object-cover" />)}
          </div>
          <div className="text-center mt-8">
            <Link to={`${BASE_PATH}/gallery`} className="text-[#722F37] text-sm tracking-widest hover:underline">BEKIJK VOLLEDIGE GALERIJ ›</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// MENU PAGE - EXACT like original
function MenuPage() {
  const { t } = useLanguage();
  const menuData = [
    { title: 'Koude voorgerechten', items: [
      ['Burrata van buffel met tomaten en basilicum in olijfolie', '€ 22,00'],
      ['Rundercarpaccio gemarineerd in olijfolie en citroen, met parmezaanschilfers', '€ 21,50'],
      ['Bresaola gemarineerd in olijfolie en citroen, met parmezaanschilfers', '€ 24,50'],
      ['Salade van inktvis', '€ 24,50'],
      ['Parmaham met meloen', '€ 23,50'],
      ['Vitello tonnato', '€ 24,50'],
      ['Bordje antipasti', '€ 23,50'],
    ]},
    { title: 'Huisgemaakte pasta', items: [
      ['Spaghetti met verse kerstomaten, look en basilicum', '€ 17,50'],
      ['Spaghetti met schelpdieren', '€ 24,50'],
      ['Linguini met scampi, courgette en pijnboompitten', '€ 24,50'],
      ['Tagliolini met pesto van zwarte truffel', '€ 28,50'],
      ['Ravioli met rivierkreeftjes en champignons', '€ 23,50'],
      ['Kwartet van verse huisgemaakte pasta', '€ 23,50'],
    ]},
    { title: 'Visgerechten', items: [
      ['Gegrilde inkvis met italiaanse kruiden', '€ 26,50'],
      ['Filet van wilde zeebaars met rozemarijn en citroen', '€ 34,50'],
      ['Rode tonijnfilet met italiaanse kruiden', '€ 33,50'],
      ['Filet van zeebrasem aqua pazza', '€ 32,50'],
    ]},
    { title: 'Vleesgerechten', items: [
      ['Mechelse koekoek met Amalfi citroen', '€ 25,50'],
      ['Saltimbocca alla Romana', '€ 28,50'],
      ['Tagliata, Runderlapje op raketsla', '€ 32,50'],
      ['Gegrilde Filet pur met groenten', '€ 36,50'],
    ]},
  ];
  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Navigation />
      <section className="relative h-[60vh] pt-16">
        <img src={IMAGES.menuHero} alt="Menu" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center flex-col text-white text-center">
          <h1 className="text-5xl md:text-6xl font-light" style={{fontFamily: 'serif'}}>{t('menuPageTitle')}</h1>
          <p className="text-xl mt-4">{t('menuPageSubtitle')}</p>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {menuData.map((cat, i) => (
            <div key={i} className="mb-12">
              <h2 className="text-3xl text-[#722F37] font-light mb-8 text-center" style={{fontFamily: 'serif'}}>{cat.title}</h2>
              {cat.items.map(([name, price], j) => (
                <div key={j} className="flex justify-between border-b border-gray-300 py-4">
                  <span className="text-gray-700">{name}</span>
                  <span className="text-[#722F37] font-medium">{price}</span>
                </div>
              ))}
            </div>
          ))}
          <div className="text-center mt-12">
            <Link to={`${BASE_PATH}/reservations`} className="bg-[#722F37] text-white px-8 py-4 text-sm tracking-widest inline-block">{t('makeReservation')}</Link>
          </div>
          <div className="text-center mt-8">
            <Link to={BASE_PATH} className="text-[#722F37] text-sm">{t('backToHome')}</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

// GROUP MENU PAGE
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
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl text-white font-light mb-4" style={{fontFamily: 'serif'}}>Groepmenus</h1>
          <p className="text-gray-400 mb-8">Perfecte keuze voor groepen vanaf 10 personen</p>
          <div className="flex gap-4 justify-center mb-12">
            <Link to={`${BASE_PATH}/reservations`} className="bg-[#722F37] text-white px-6 py-3 text-sm tracking-widest">RESERVEER VOOR GROEPEN</Link>
          </div>
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {menus.map((m, i) => (
              <div key={i} className="bg-[#2a2a2a] p-8 text-center">
                <h2 className="text-2xl text-white font-light mb-2" style={{fontFamily: 'serif'}}>{m.name}</h2>
                <p className="text-3xl text-[#722F37] font-bold">{m.price}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-sm">Menu mogelijk vanaf minimaal 10 personen</p>
          <div className="mt-8"><Link to={BASE_PATH} className="text-[#722F37] text-sm">{t('backToHome')}</Link></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ABOUT PAGE
function AboutPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navigation />
      <section className="relative h-[50vh] pt-16">
        <img src={IMAGES.feature3} alt="Interior" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl text-white font-light" style={{fontFamily: 'serif'}}>{t('about')}</h1>
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl text-[#9a8478] font-light mb-8" style={{fontFamily: 'serif'}}>{t('aboutTitle')}</h2>
          <p className="text-gray-400 leading-relaxed">{t('aboutText')}</p>
          <div className="mt-8"><Link to={BASE_PATH} className="text-[#722F37] text-sm">{t('backToHome')}</Link></div>
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
          <h1 className="text-5xl text-white font-light text-center mb-12" style={{fontFamily: 'serif'}}>{t('galleryPageTitle')}</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...IMAGES.dishes, IMAGES.feature3, IMAGES.tomatoes].map((img, i) => (
              <img key={i} src={img} alt={`Gallery ${i+1}`} className="w-full h-64 object-cover cursor-pointer hover:opacity-80" onClick={() => setSelected(img)} />
            ))}
          </div>
          {selected && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={() => setSelected(null)}>
              <button className="absolute top-4 right-4 text-white text-4xl">×</button>
              <img src={selected} alt="Enlarged" className="max-w-full max-h-full" />
            </div>
          )}
          <div className="text-center mt-8"><Link to={BASE_PATH} className="text-[#722F37] text-sm">{t('backToHome')}</Link></div>
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
    <div className="min-h-screen bg-[#F5F0E8]">
      <Navigation />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl text-[#722F37] font-light text-center mb-12" style={{fontFamily: 'serif'}}>{t('infoPageTitle')}</h1>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded shadow">
              <h3 className="text-2xl text-[#722F37] mb-4" style={{fontFamily: 'serif'}}>{t('address')}</h3>
              <p className="text-gray-600">Hector Henneaulaan 136<br/>1930 Zaventem<br/>België</p>
              <h3 className="text-2xl text-[#722F37] mt-6 mb-4" style={{fontFamily: 'serif'}}>{t('phone')}</h3>
              <a href="tel:+3227254545" className="text-gray-600 hover:text-[#722F37]">+32 2 725 45 45</a>
            </div>
            <div className="bg-white p-8 rounded shadow">
              <h3 className="text-2xl text-[#722F37] mb-4" style={{fontFamily: 'serif'}}>{t('openingHours')}</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between"><span>{t('monFri')}:</span><span>12:00-14:00, 18:30-22:30</span></div>
                <div className="flex justify-between"><span>{t('sat')}:</span><span>18:30-22:30</span></div>
                <div className="flex justify-between"><span>{t('sun')}:</span><span>{t('closed')}</span></div>
              </div>
            </div>
          </div>
          <div className="bg-[#722F37] text-white p-8 rounded text-center">
            <p className="font-semibold">Belangrijk Bericht</p>
            <p className="mt-2">{t('closureNotice')}</p>
          </div>
          <div className="text-center mt-8"><Link to={BASE_PATH} className="text-[#722F37] text-sm">{t('backToHome')}</Link></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// RESERVATIONS PAGE
function ReservationsPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Navigation />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl text-[#722F37] font-light text-center mb-8" style={{fontFamily: 'serif'}}>{t('reservePageTitle')}</h1>
          <div className="bg-[#722F37] text-white p-6 rounded text-center mb-8">
            <p>{t('closureNotice')}</p>
          </div>
          <div className="bg-white rounded shadow overflow-hidden">
            <iframe src="https://form.jotform.com/220025085008342" style={{width: '100%', minHeight: '800px', border: 'none'}} title="Reservation Form" />
          </div>
          <div className="text-center mt-8"><Link to={BASE_PATH} className="text-[#722F37] text-sm">{t('backToHome')}</Link></div>
        </div>
      </div>
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
