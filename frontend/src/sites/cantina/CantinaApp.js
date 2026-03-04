// La Cantina Italiana - Multi-tenant wrapper
// Originele code van GitHub repo tranquille2004/Cantina

import { useState, useEffect, useRef } from 'react';
import './App.css';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Clock, MapPin, Phone, Mail, Download, ChevronRight, Facebook } from 'lucide-react';

const BASE_PATH = '/site/cantina';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Language selector component
function LanguageSelector({ language, setLanguage }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const languages = [
    { code: 'nl', flag: '🇧🇪', label: 'NL' },
    { code: 'fr', flag: '🇧🇪', label: 'FR' },
    { code: 'en', flag: '🇬🇧', label: 'EN' },
    { code: 'it', flag: '🇮🇹', label: 'IT' },
    { code: 'de', flag: '🇩🇪', label: 'DE' }
  ];

  const handleLanguageChange = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="language-selector" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setTimeout(() => setIsOpen(false), 200)}>
      <button className="language-button">
        <span>{languages.find(l => l.code === language)?.flag}</span>
        <span>{language.toUpperCase()}</span>
        <span>▼</span>
      </button>
      {isOpen && (
        <div className="language-dropdown">
          {languages.map(lang => (
            <button key={lang.code} onClick={() => handleLanguageChange(lang.code)} className={`language-option ${language === lang.code ? 'active' : ''}`}>
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Navigation
function Navigation({ language, setLanguage, t }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: `${BASE_PATH}/`, label: t.nav.home },
    { path: `${BASE_PATH}/about`, label: t.nav.about },
    { path: `${BASE_PATH}/kaart`, label: t.nav.menu },
    { path: `${BASE_PATH}/groepmenus`, label: t.nav.groupMenus },
    { path: `${BASE_PATH}/reserveren`, label: t.nav.reserve },
    { path: `${BASE_PATH}/fotos`, label: t.nav.gallery },
    { path: `${BASE_PATH}/info`, label: t.nav.info },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <Link to={BASE_PATH} className="logo">
          <img src="/images/logo-cantina.png" alt="La Cantina Italiana" />
        </Link>
        <div className="nav-links desktop-only">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} className={location.pathname === link.path ? 'active' : ''}>{link.label}</Link>
          ))}
        </div>
        <div className="nav-right">
          <LanguageSelector language={language} setLanguage={setLanguage} />
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} onClick={() => setMobileMenuOpen(false)}>{link.label}</Link>
          ))}
        </div>
      )}
    </nav>
  );
}

// Footer
function Footer({ t, language }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>La Cantina Italiana</h3>
          <p>{t.footer.tagline}</p>
        </div>
        <div className="footer-section">
          <h4>{t.footer.contact}</h4>
          <p><MapPin size={16} /> Brusselsesteenweg 17<br/>3080 Tervuren</p>
          <p><Phone size={16} /> +32 2 767 63 65</p>
          <p><Mail size={16} /> lacantina@mail.be</p>
        </div>
        <div className="footer-section">
          <h4>{t.footer.hours}</h4>
          <p>Ma-Vr: 12:00-14:00, 18:00-22:00</p>
          <p>Za: 18:00-22:00</p>
          <p>Zo: 12:00-14:00, 18:00-22:00</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} La Cantina Italiana. All rights reserved.</p>
        <div className="webmaster">
          <img src="/images/fworksbuilders-logo.png" alt="fworks" />
          <span>Webmaster: fworksbuilders | <a href="https://wa.me/32494516064">+32 494 51 60 64</a></span>
        </div>
      </div>
    </footer>
  );
}

// HomePage
function HomePage({ t }) {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <section className="hero" style={{ backgroundImage: 'url(/images/hero-background.jpg)' }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>{t.hero.title}</h1>
          <p>{t.hero.subtitle}</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate(`${BASE_PATH}/reserveren`)}>{t.hero.reserve}</button>
            <button className="btn-secondary" onClick={() => navigate(`${BASE_PATH}/kaart`)}>{t.hero.menu}</button>
          </div>
        </div>
      </section>
      <section className="features">
        <div className="feature">
          <img src="/images/gallery1.jpg" alt="Quality" />
          <h3>{t.features.quality.title}</h3>
          <p>{t.features.quality.text}</p>
        </div>
        <div className="feature">
          <img src="/images/gallery2.jpg" alt="Fresh" />
          <h3>{t.features.fresh.title}</h3>
          <p>{t.features.fresh.text}</p>
        </div>
        <div className="feature">
          <img src="/images/gallery3.jpg" alt="Ambiance" />
          <h3>{t.features.ambiance.title}</h3>
          <p>{t.features.ambiance.text}</p>
        </div>
      </section>
      <section className="cta">
        <h2>{t.cta.title}</h2>
        <p>{t.cta.subtitle}</p>
        <button className="btn-primary" onClick={() => navigate(`${BASE_PATH}/reserveren`)}>{t.cta.button}</button>
      </section>
    </div>
  );
}

// AboutPage
function AboutPage({ t }) {
  return (
    <div className="about-page">
      <section className="page-hero" style={{ backgroundImage: 'url(/images/about/about-hero.jpg)' }}>
        <h1>{t.about.title}</h1>
      </section>
      <section className="about-content">
        <h2>{t.about.storyTitle}</h2>
        <p>{t.about.story}</p>
      </section>
    </div>
  );
}

// KaartPage
function KaartPage({ t }) {
  return (
    <div className="kaart-page">
      <section className="page-hero" style={{ backgroundImage: 'url(/images/gallery4.jpg)' }}>
        <h1>{t.menu.title}</h1>
      </section>
      <section className="menu-content">
        <div className="menu-download">
          <a href="/images/kaart-cantina.pdf" download className="btn-primary">
            <Download size={20} /> {t.menu.download}
          </a>
        </div>
        <iframe src="https://docs.google.com/viewer?url=https://www.lacantina-tervuren.be/kaart-cantina.pdf&embedded=true" title="Menu" className="menu-iframe"></iframe>
      </section>
    </div>
  );
}

// GroepmenusPage
function GroepmenusPage({ t }) {
  return (
    <div className="groepmenus-page">
      <section className="page-hero" style={{ backgroundImage: 'url(/images/gallery5.jpg)' }}>
        <h1>{t.groupMenus.title}</h1>
      </section>
      <section className="groepmenus-content">
        <p>{t.groupMenus.subtitle}</p>
        <div className="menu-cards">
          <div className="menu-card">
            <h3>Menu 1</h3>
            <p className="price">€45,-</p>
          </div>
          <div className="menu-card">
            <h3>Menu 2</h3>
            <p className="price">€55,-</p>
          </div>
          <div className="menu-card">
            <h3>Menu 3</h3>
            <p className="price">€65,-</p>
          </div>
        </div>
        <Link to={`${BASE_PATH}/reserveren`} className="btn-primary">{t.groupMenus.reserve}</Link>
      </section>
    </div>
  );
}

// ReserverenPage
function ReserverenPage({ t }) {
  return (
    <div className="reserveren-page">
      <section className="page-hero" style={{ backgroundImage: 'url(/images/gallery6.jpg)' }}>
        <h1>{t.reserve.title}</h1>
      </section>
      <section className="reserve-content">
        <div className="reserve-info">
          <p>{t.reserve.info}</p>
        </div>
        <iframe src="https://form.jotform.com/222292165889366" title="Reservation Form" className="reserve-iframe"></iframe>
      </section>
    </div>
  );
}

// FotosPage
function FotosPage({ t }) {
  const images = ['/images/gallery1.jpg', '/images/gallery2.jpg', '/images/gallery3.jpg', '/images/gallery4.jpg', '/images/gallery5.jpg', '/images/gallery6.jpg'];
  const [selected, setSelected] = useState(null);
  return (
    <div className="fotos-page">
      <section className="page-hero" style={{ backgroundImage: 'url(/images/gallery1.jpg)' }}>
        <h1>{t.gallery.title}</h1>
      </section>
      <section className="gallery-content">
        <div className="gallery-grid">
          {images.map((img, i) => <img key={i} src={img} alt={`Gallery ${i}`} onClick={() => setSelected(img)} />)}
        </div>
        {selected && (
          <div className="lightbox" onClick={() => setSelected(null)}>
            <img src={selected} alt="Enlarged" />
            <button className="close">×</button>
          </div>
        )}
      </section>
    </div>
  );
}

// InfoPage
function InfoPage({ t }) {
  return (
    <div className="info-page">
      <section className="page-hero" style={{ backgroundImage: 'url(/images/gallery3.jpg)' }}>
        <h1>{t.info.title}</h1>
      </section>
      <section className="info-content">
        <div className="info-grid">
          <div className="info-card">
            <h3><MapPin /> {t.info.address}</h3>
            <p>Brusselsesteenweg 17<br/>3080 Tervuren</p>
          </div>
          <div className="info-card">
            <h3><Phone /> {t.info.phone}</h3>
            <p>+32 2 767 63 65</p>
          </div>
          <div className="info-card">
            <h3><Clock /> {t.info.hours}</h3>
            <p>Ma-Vr: 12:00-14:00, 18:00-22:00</p>
            <p>Za: 18:00-22:00</p>
            <p>Zo: 12:00-14:00, 18:00-22:00</p>
          </div>
        </div>
        <div className="map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.5!2d4.5!3d50.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBrusselsesteenweg%2017%2C%203080%20Tervuren!5e0!3m2!1snl!2sbe!4v1234567890" title="Map"></iframe>
        </div>
      </section>
    </div>
  );
}

// ConfirmationPage
function ConfirmationPage({ t }) {
  return (
    <div className="confirmation-page">
      <div className="confirmation-content">
        <h1>{t.confirmation.grazie}</h1>
        <h2>{t.confirmation.title}</h2>
        <p>{t.confirmation.noContact}</p>
        <p>{t.confirmation.noCalls}</p>
        <Link to={BASE_PATH} className="btn-primary">{t.confirmation.backToSite}</Link>
      </div>
    </div>
  );
}

// Translations
const translations = {
  nl: {
    nav: { home: 'HOME', about: 'OVER ONS', menu: 'KAART', groupMenus: 'GROEPMENUS', reserve: 'RESERVEREN', gallery: "FOTO'S", info: 'INFO' },
    hero: { title: 'La Cantina Italiana', subtitle: 'Authentieke Italiaanse keuken in Tervuren', reserve: 'RESERVEREN', menu: 'BEKIJK MENU' },
    features: { quality: { title: 'Italiaanse Kwaliteit', text: 'Authentieke ingrediënten' }, fresh: { title: 'Dagelijks Vers', text: 'Vers bereid' }, ambiance: { title: 'Sfeervolle Ambiance', text: 'Gezellige sfeer' } },
    cta: { title: 'Klaar voor een culinaire reis?', subtitle: 'Reserveer nu uw tafel', button: 'RESERVEREN' },
    about: { title: 'Over Ons', storyTitle: 'Ons Verhaal', story: 'La Cantina Italiana biedt authentieke Italiaanse gerechten in een warme, gastvrije sfeer.' },
    menu: { title: 'Onze Kaart', download: 'Download Menu PDF' },
    groupMenus: { title: 'Groepmenus', subtitle: 'Perfecte keuze voor groepen', reserve: 'Reserveer voor groepen' },
    reserve: { title: 'Reserveren', info: 'Vul het formulier in om te reserveren.' },
    gallery: { title: "Foto's" },
    info: { title: 'Informatie', address: 'Adres', phone: 'Telefoon', hours: 'Openingstijden' },
    footer: { tagline: 'Authentieke Italiaanse keuken', contact: 'Contact', hours: 'Openingstijden' },
    confirmation: { grazie: 'Grazie!', title: 'Uw reservatie is bevestigd!', noContact: 'Wij contacteren u niet, tenzij we vragen hebben.', noCalls: 'Bel ons niet voor deze reservatie.', backToSite: 'Terug naar de site' }
  },
  fr: {
    nav: { home: 'ACCUEIL', about: 'À PROPOS', menu: 'CARTE', groupMenus: 'MENUS GROUPE', reserve: 'RÉSERVER', gallery: 'PHOTOS', info: 'INFO' },
    hero: { title: 'La Cantina Italiana', subtitle: 'Cuisine italienne authentique à Tervuren', reserve: 'RÉSERVER', menu: 'VOIR MENU' },
    features: { quality: { title: 'Qualité Italienne', text: 'Ingrédients authentiques' }, fresh: { title: 'Fraîcheur Quotidienne', text: 'Préparé frais' }, ambiance: { title: 'Ambiance Chaleureuse', text: 'Atmosphère conviviale' } },
    cta: { title: 'Prêt pour un voyage culinaire?', subtitle: 'Réservez votre table maintenant', button: 'RÉSERVER' },
    about: { title: 'À Propos', storyTitle: 'Notre Histoire', story: 'La Cantina Italiana propose des plats italiens authentiques dans une atmosphère chaleureuse.' },
    menu: { title: 'Notre Carte', download: 'Télécharger le Menu PDF' },
    groupMenus: { title: 'Menus Groupe', subtitle: 'Choix parfait pour les groupes', reserve: 'Réserver pour groupes' },
    reserve: { title: 'Réserver', info: 'Remplissez le formulaire pour réserver.' },
    gallery: { title: 'Photos' },
    info: { title: 'Informations', address: 'Adresse', phone: 'Téléphone', hours: 'Heures' },
    footer: { tagline: 'Cuisine italienne authentique', contact: 'Contact', hours: 'Heures' },
    confirmation: { grazie: 'Grazie!', title: 'Votre réservation est confirmée!', noContact: 'Nous ne vous contacterons pas sauf si nous avons des questions.', noCalls: 'Ne nous appelez pas pour cette réservation.', backToSite: 'Retour au site' }
  },
  en: {
    nav: { home: 'HOME', about: 'ABOUT', menu: 'MENU', groupMenus: 'GROUP MENUS', reserve: 'RESERVE', gallery: 'PHOTOS', info: 'INFO' },
    hero: { title: 'La Cantina Italiana', subtitle: 'Authentic Italian cuisine in Tervuren', reserve: 'RESERVE', menu: 'VIEW MENU' },
    features: { quality: { title: 'Italian Quality', text: 'Authentic ingredients' }, fresh: { title: 'Daily Fresh', text: 'Freshly prepared' }, ambiance: { title: 'Cozy Ambiance', text: 'Warm atmosphere' } },
    cta: { title: 'Ready for a culinary journey?', subtitle: 'Reserve your table now', button: 'RESERVE' },
    about: { title: 'About Us', storyTitle: 'Our Story', story: 'La Cantina Italiana offers authentic Italian dishes in a warm, welcoming atmosphere.' },
    menu: { title: 'Our Menu', download: 'Download Menu PDF' },
    groupMenus: { title: 'Group Menus', subtitle: 'Perfect choice for groups', reserve: 'Reserve for groups' },
    reserve: { title: 'Reserve', info: 'Fill out the form to reserve.' },
    gallery: { title: 'Photos' },
    info: { title: 'Information', address: 'Address', phone: 'Phone', hours: 'Hours' },
    footer: { tagline: 'Authentic Italian cuisine', contact: 'Contact', hours: 'Hours' },
    confirmation: { grazie: 'Grazie!', title: 'Your reservation is confirmed!', noContact: 'We will not contact you unless we have questions.', noCalls: 'Please do not call us for this reservation.', backToSite: 'Back to the site' }
  },
  it: {
    nav: { home: 'HOME', about: 'CHI SIAMO', menu: 'MENU', groupMenus: 'MENU GRUPPO', reserve: 'PRENOTA', gallery: 'FOTO', info: 'INFO' },
    hero: { title: 'La Cantina Italiana', subtitle: 'Cucina italiana autentica a Tervuren', reserve: 'PRENOTA', menu: 'VEDI MENU' },
    features: { quality: { title: 'Qualità Italiana', text: 'Ingredienti autentici' }, fresh: { title: 'Fresco Ogni Giorno', text: 'Preparato fresco' }, ambiance: { title: 'Ambiente Accogliente', text: 'Atmosfera calda' } },
    cta: { title: 'Pronto per un viaggio culinario?', subtitle: 'Prenota il tuo tavolo ora', button: 'PRENOTA' },
    about: { title: 'Chi Siamo', storyTitle: 'La Nostra Storia', story: 'La Cantina Italiana offre piatti italiani autentici in un\'atmosfera calda e accogliente.' },
    menu: { title: 'Il Nostro Menu', download: 'Scarica Menu PDF' },
    groupMenus: { title: 'Menu Gruppo', subtitle: 'Scelta perfetta per gruppi', reserve: 'Prenota per gruppi' },
    reserve: { title: 'Prenota', info: 'Compila il modulo per prenotare.' },
    gallery: { title: 'Foto' },
    info: { title: 'Informazioni', address: 'Indirizzo', phone: 'Telefono', hours: 'Orari' },
    footer: { tagline: 'Cucina italiana autentica', contact: 'Contatto', hours: 'Orari' },
    confirmation: { grazie: 'Grazie!', title: 'La tua prenotazione è confermata!', noContact: 'Non ti contatteremo a meno che non abbiamo domande.', noCalls: 'Non chiamarci per questa prenotazione.', backToSite: 'Torna al sito' }
  },
  de: {
    nav: { home: 'HOME', about: 'ÜBER UNS', menu: 'KARTE', groupMenus: 'GRUPPENMENÜS', reserve: 'RESERVIEREN', gallery: 'FOTOS', info: 'INFO' },
    hero: { title: 'La Cantina Italiana', subtitle: 'Authentische italienische Küche in Tervuren', reserve: 'RESERVIEREN', menu: 'MENÜ ANSEHEN' },
    features: { quality: { title: 'Italienische Qualität', text: 'Authentische Zutaten' }, fresh: { title: 'Täglich Frisch', text: 'Frisch zubereitet' }, ambiance: { title: 'Gemütliches Ambiente', text: 'Warme Atmosphäre' } },
    cta: { title: 'Bereit für eine kulinarische Reise?', subtitle: 'Reservieren Sie jetzt Ihren Tisch', button: 'RESERVIEREN' },
    about: { title: 'Über Uns', storyTitle: 'Unsere Geschichte', story: 'La Cantina Italiana bietet authentische italienische Gerichte in einer warmen, einladenden Atmosphäre.' },
    menu: { title: 'Unsere Karte', download: 'Menü PDF herunterladen' },
    groupMenus: { title: 'Gruppenmenüs', subtitle: 'Perfekte Wahl für Gruppen', reserve: 'Für Gruppen reservieren' },
    reserve: { title: 'Reservieren', info: 'Füllen Sie das Formular aus, um zu reservieren.' },
    gallery: { title: 'Fotos' },
    info: { title: 'Informationen', address: 'Adresse', phone: 'Telefon', hours: 'Öffnungszeiten' },
    footer: { tagline: 'Authentische italienische Küche', contact: 'Kontakt', hours: 'Öffnungszeiten' },
    confirmation: { grazie: 'Grazie!', title: 'Ihre Reservierung ist bestätigt!', noContact: 'Wir kontaktieren Sie nicht, es sei denn, wir haben Fragen.', noCalls: 'Rufen Sie uns nicht für diese Reservierung an.', backToSite: 'Zurück zur Website' }
  }
};

// Main App Component
function CantinaApp() {
  const [language, setLanguage] = useState('nl');
  const t = translations[language];

  return (
    <div className="cantina-app">
      <ScrollToTop />
      <Navigation language={language} setLanguage={setLanguage} t={t} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage t={t} />} />
          <Route path="/about" element={<AboutPage t={t} />} />
          <Route path="/kaart" element={<KaartPage t={t} />} />
          <Route path="/groepmenus" element={<GroepmenusPage t={t} />} />
          <Route path="/reserveren" element={<ReserverenPage t={t} />} />
          <Route path="/confirmation" element={<ConfirmationPage t={t} />} />
          <Route path="/fotos" element={<FotosPage t={t} />} />
          <Route path="/info" element={<InfoPage t={t} />} />
          <Route path="*" element={<HomePage t={t} />} />
        </Routes>
      </main>
      <Footer t={t} language={language} />
    </div>
  );
}

export default CantinaApp;
