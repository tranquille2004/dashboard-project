import { useState, useEffect, useRef } from 'react';
import './App.css';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, MapPin, Phone, Mail, Download, ChevronRight, Facebook } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Language selector component
function LanguageSelector({ language, setLanguage }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  
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

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={dropdownRef}
      className="language-selector"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="globe-icon">🌐</span>
        <span className="flag">{languages.find(l => l.code === language)?.flag}</span>
        <span>{languages.find(l => l.code === language)?.label}</span>
      </button>
      <div className={`language-dropdown ${isOpen ? 'open' : ''}`}>
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`language-option ${language === lang.code ? 'active' : ''}`}
          >
            <span className="flag">{lang.flag}</span>
            <span>{lang.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Navigation({ language, setLanguage, t }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <Link to="/site/cantina/" className="logo">
          <img src="/images/cantina/logo-cantina.jpg" alt="La Cantina Italiana" />
        </Link>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/site/cantina/" className="nav-link" onClick={closeMenu}>{t.nav.home}</Link>
          <Link to="/site/cantina/about" className="nav-link" onClick={closeMenu}>{t.nav.about}</Link>
          <Link to="/site/cantina/kaart" className="nav-link kaart-link" onClick={closeMenu}>{t.nav.menu}</Link>
          <Link to="/site/cantina/groepmenus" className="nav-link" onClick={closeMenu}>{t.nav.groupMenus}</Link>
          <Link to="/site/cantina/reserveren" className="nav-link" onClick={closeMenu}>{t.nav.reservation}</Link>
          <Link to="/site/cantina/fotos" className="nav-link" onClick={closeMenu}>{t.nav.gallery}</Link>
          <Link to="/site/cantina/info" className="nav-link" onClick={closeMenu}>{t.nav.contact}</Link>
        </div>
        
        <div className="nav-right">
          <LanguageSelector language={language} setLanguage={setLanguage} />
          <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

function HomePage({ t }) {
  const navigate = useNavigate();

  return (
    <div className="page home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <img src="/images/cantina/hero-background.jpg" alt="La Cantina Italiana" className="hero-background-image" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">{t.hero.title}</h1>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <div className="hero-buttons">
            <Button onClick={() => navigate('/reserveren')} className="btn-primary">
              {t.hero.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview">
        <div className="content-grid">
          <div className="text-content">
            <h2>{t.about.title}</h2>
            <p>{t.about.preview}</p>
            <Button onClick={() => navigate('/about')} className="btn-secondary">
              {t.about.readMore}
            </Button>
          </div>
          <div className="image-content">
            <img src="/images/cantina/gallery/cantina6_1_orig.jpg" alt="Restaurant" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <img src="/images/cantina/truffels-quality.jpg" alt="Quality" />
            <h3>{t.features.quality.title}</h3>
            <p>{t.features.quality.text}</p>
          </div>
          <div className="feature-card">
            <img src="/images/cantina/gallery/unnamed-17_orig.webp" alt="Fresh" />
            <h3>{t.features.fresh.title}</h3>
            <p>{t.features.fresh.text}</p>
          </div>
          <div className="feature-card">
            <img src="/images/cantina/gallery/cantina5_1_orig.jpg" alt="Ambiance" />
            <h3>{t.features.ambiance.title}</h3>
            <p>{t.features.ambiance.text}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>{t.cta.title}</h2>
        <p>{t.cta.subtitle}</p>
        <div className="cta-buttons">
          <Button onClick={() => navigate('/reserveren')} className="btn-primary">
            {t.cta.reserve} <ChevronRight />
          </Button>
        </div>
      </section>
    </div>
  );
}

function KaartPage({ t }) {
  return (
    <div className="page kaart-page">
      <div className="page-header">
        <h1>{t.menu.title}</h1>
        <p>{t.menu.subtitle}</p>
        <div className="title-divider"></div>
      </div>

      {/* Menu Kaart - Direct Zichtbaar via Google Docs Viewer */}
      <div className="menu-pdf-container">
        <iframe
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + '/images/cantina/menu-pdf.pdf')}&embedded=true`}
          title="Menu La Cantina Italiana"
          className="menu-pdf-frame"
        >
          <p>Uw browser ondersteunt geen PDF weergave. <a href="/images/cantina/menu-pdf.pdf" target="_blank" rel="noopener noreferrer">Klik hier om de PDF te downloaden</a>.</p>
        </iframe>
      </div>

      {/* PDF Download Sectie */}
      <div className="pdf-download-section">
        <div className="pdf-card">
          <Download className="download-icon" />
          <h3>{t.menu.downloadTitle}</h3>
          <p>{t.menu.downloadText}</p>
          <a 
            href="/images/cantina/menu-pdf.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Download className="btn-icon" />
            {t.menu.downloadButton}
          </a>
        </div>
      </div>

      {/* Foto's - Kleiner en onderaan */}
      <div className="kaart-photos-section">
        <div className="kaart-photos-grid">
          <img 
            src="/images/cantina/kaart-photo-1.webp" 
            alt="La Cantina Italiana gerecht" 
            className="kaart-photo"
          />
          <img 
            src="/images/cantina/kaart-photo-2.webp" 
            alt="La Cantina Italiana gerecht" 
            className="kaart-photo"
          />
        </div>
      </div>
    </div>
  );
}

function GroepmenusPage({ t }) {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#f5f2ed', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="page groepmenus-page">
        <div className="page-header">
          <h1 style={{ color: '#3d5a35' }}>{t.groupMenus.title}</h1>
          <p className="group-top-note" style={{ color: '#6a6a6a' }}>{t.groupMenus.topNote}</p>
          <div className="title-divider" style={{ background: '#7a8a72' }}></div>
        </div>

      <div className="groepmenus-actions">
        <Button onClick={() => navigate('/site/cantina/reserveren')} className="btn-primary">
          {t.groupMenus.reserveNow}
        </Button>
        <a 
          href="/images/cantina/groepmenus.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          <Download className="btn-icon" />
          {t.groupMenus.downloadPdf}
        </a>
      </div>

      <div className="groepmenus-content">
        {/* Menu 1 */}
        <div className="group-menu-card">
          <div className="menu-header">
            <h2>Menu 1</h2>
            <span className="menu-price">€45,-</span>
          </div>
          <div className="menu-items">
            <div className="menu-item aperitivo">
              <p className="course-label">{t.groupMenus.aperitivo}</p>
            </div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu1.starter1.title}</h4>
              <p className="item-description">{t.groupMenus.menu1.starter1.description}</p>
            </div>

            <div className="menu-divider">{t.groupMenus.or}</div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu1.starter2.title}</h4>
            </div>

            <div className="menu-divider">{t.groupMenus.or}</div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu1.starter3.title}</h4>
              <p className="item-description">{t.groupMenus.menu1.starter3.description}</p>
            </div>

            <div className="menu-divider">{t.groupMenus.or}</div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu1.starter4.title}</h4>
              <p className="item-description">{t.groupMenus.menu1.starter4.description}</p>
            </div>

            <div className="course-divider"></div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu1.main1.title}</h4>
              <p className="item-description">{t.groupMenus.menu1.main1.description}</p>
            </div>

            <div className="menu-divider">{t.groupMenus.or}</div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu1.main2.title}</h4>
              <p className="item-description">{t.groupMenus.menu1.main2.description}</p>
            </div>

            <div className="menu-divider">{t.groupMenus.or}</div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu1.main3.title}</h4>
              <p className="item-description">{t.groupMenus.menu1.main3.description}</p>
            </div>

            <div className="course-divider"></div>

            <div className="menu-item">
              <p className="dessert-label">{t.groupMenus.surpriseDessert}</p>
            </div>
          </div>
        </div>

        {/* Menu 2 */}
        <div className="group-menu-card featured">
          <div className="menu-header">
            <h2>Menu 2</h2>
            <span className="menu-price">€55,-</span>
          </div>
          <div className="menu-items">
            <div className="menu-item aperitivo">
              <p className="course-label">{t.groupMenus.aperitivo}</p>
            </div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu2.starter1.title}</h4>
              <p className="item-description">{t.groupMenus.menu2.starter1.description}</p>
            </div>

            <div className="menu-divider">{t.groupMenus.or}</div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu2.starter2.title}</h4>
              <p className="item-description">{t.groupMenus.menu2.starter2.description}</p>
            </div>

            <div className="menu-divider">{t.groupMenus.or}</div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu2.starter3.title}</h4>
              <p className="item-description">{t.groupMenus.menu2.starter3.description}</p>
            </div>

            <div className="menu-divider">{t.groupMenus.or}</div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu2.starter4.title}</h4>
              <p className="item-description">{t.groupMenus.menu2.starter4.description}</p>
            </div>

            <div className="course-divider"></div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu2.main1.title}</h4>
              <p className="item-description">{t.groupMenus.menu2.main1.description}</p>
            </div>

            <div className="menu-divider">{t.groupMenus.or}</div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu2.main2.title}</h4>
              <p className="item-description">{t.groupMenus.menu2.main2.description}</p>
            </div>

            <div className="menu-divider">{t.groupMenus.or}</div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu2.main3.title}</h4>
              <p className="item-description">{t.groupMenus.menu2.main3.description}</p>
            </div>

            <div className="course-divider"></div>

            <div className="menu-item">
              <p className="dessert-label">{t.groupMenus.surpriseDessert}</p>
              <p className="wine-note">{t.groupMenus.halfBottleWine}</p>
            </div>
          </div>
        </div>

        {/* Menu 3 */}
        <div className="group-menu-card premium">
          <div className="menu-header">
            <h2>Menu 3</h2>
            <span className="menu-price">€65,-</span>
          </div>
          <div className="menu-items">
            <div className="menu-item aperitivo">
              <p className="course-label">{t.groupMenus.aperitivo}</p>
            </div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu3.starter1.title}</h4>
              <p className="item-description">{t.groupMenus.menu3.starter1.description}</p>
            </div>

            <div className="menu-divider">{t.groupMenus.or}</div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu3.starter2.title}</h4>
            </div>

            <div className="menu-divider">{t.groupMenus.or}</div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu3.starter3.title}</h4>
              <p className="item-description">{t.groupMenus.menu3.starter3.description}</p>
            </div>

            <div className="menu-divider">{t.groupMenus.or}</div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu3.starter4.title}</h4>
              <p className="item-description">{t.groupMenus.menu3.starter4.description}</p>
            </div>

            <div className="course-divider"></div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu3.main1.title}</h4>
              <p className="item-description">{t.groupMenus.menu3.main1.description}</p>
            </div>

            <div className="menu-divider">{t.groupMenus.or}</div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu3.main2.title}</h4>
              <p className="item-description">{t.groupMenus.menu3.main2.description}</p>
            </div>

            <div className="menu-divider">{t.groupMenus.or}</div>

            <div className="menu-item">
              <h4>{t.groupMenus.menu3.main3.title}</h4>
              <p className="item-description">{t.groupMenus.menu3.main3.description}</p>
            </div>

            <div className="course-divider"></div>

            <div className="menu-item">
              <p className="dessert-label">{t.groupMenus.surpriseDessert}</p>
              <p className="wine-note">{t.groupMenus.halfBottleWine}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="groepmenus-actions">
        <Button onClick={() => navigate('/reserveren')} className="btn-primary">
          {t.groupMenus.reserveNow}
        </Button>
        <a 
          href="/images/cantina/groepmenus.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          <Download className="btn-icon" />
          {t.groupMenus.downloadPdf}
        </a>
      </div>
      
      <p className="group-bottom-note" style={{ color: '#555' }}>{t.groupMenus.bottomNote}</p>
      </div>
    </div>
  );
}

function ReserverenPage({ t }) {
  return (
    <div className="page reserve-page">
      <div className="page-header">
        <h1>{t.reservation.title}</h1>
        <p>{t.reservation.subtitle}</p>
        <div className="title-divider"></div>
      </div>

      <div className="reserve-content">
        <div className="jotform-announcement">
          <p>{t.reservation.info}</p>
        </div>

        <div className="reserve-hours">
          <h3>Openingstijden</h3>
          <div className="reserve-hours-grid">
            <div className="reserve-hours-item">
              <strong>Lunch:</strong> 12h00 - 14h00
            </div>
            <div className="reserve-hours-item">
              <strong>Diner:</strong> 18h00 - 22h00
            </div>
          </div>
          <p className="reserve-hours-note">7 dagen per week open</p>
        </div>
        
        <div className="jotform-container">
          <iframe
            id="JotFormIFrame-221971858692370"
            title="La Cantina Italiana Reservering"
            onLoad={() => window.parent.scrollTo(0,0)}
            allowTransparency="true"
            allow="geolocation; microphone; camera; fullscreen"
            src="https://form.jotform.com/221971858692370"
            frameBorder="0"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              height: '1200px',
              border: 'none'
            }}
            scrolling="no"
          >
          </iframe>
        </div>
      </div>
    </div>
  );
}

function ConfirmationPage({ t }) {
  const navigate = useNavigate();

  return (
    <div className="page confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-icon-circle">
          <svg className="confirmation-checkmark" viewBox="0 0 52 52">
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        
        <h2 className="confirmation-grazie">{t.confirmation.grazie}</h2>
        
        <h1 className="confirmation-title">{t.confirmation.title}</h1>
        
        <div className="confirmation-box">
          <p className="confirmation-item">✓ {t.confirmation.noContact}</p>
          <p className="confirmation-item">✓ {t.confirmation.noCalls}</p>
          <p className="confirmation-item">✓ {t.confirmation.emailCheck}</p>
        </div>
        
        <p className="confirmation-note">{t.confirmation.autoConfirm}</p>
        
        <button onClick={() => navigate('/')} className="confirmation-button">
          {t.confirmation.backToSite}
        </button>
      </div>
    </div>
  );
}

function AboutPage({ t }) {
  return (
    <div className="page about-page">
      <div className="page-header">
        <h1>{t.about.title}</h1>
        <div className="title-divider"></div>
      </div>
      <div className="about-content">
        <div className="about-text">
          <p>{t.about.text1}</p>
          <p>{t.about.text2}</p>
        </div>
        <img src="/images/cantina/gallery/cantina5_1_orig.jpg" alt="Restaurant" />
      </div>
    </div>
  );
}

function FotosPage({ t }) {
  return (
    <div className="page fotos-page">
      <div className="page-header">
        <h1>{t.gallery.title}</h1>
        <div className="title-divider"></div>
      </div>
      <div className="photos-grid">
        {[
          '/images/gallery/cantina6_1_orig.jpg',
          '/images/gallery/cantina2_1_orig.jpg',
          '/images/gallery/terras_1_orig.jpg',
          '/images/gallery/cantina3_1_orig.jpg',
          '/images/gallery/cantina5_1_orig.jpg',
          '/images/gallery/miss3_1_orig.jpg',
          '/images/gallery/cantina4_1_orig.jpg',
          '/images/gallery/10389018-741265545940692-8511352417181622409-n_1_orig.jpg',
          '/images/gallery/480608790-1265821735087354-387451127714861448-n_orig.jpg',
          '/images/gallery/11707610-929200300480548-5266153072232831757-n_orig.webp',
          '/images/gallery/image-1_orig.webp',
          '/images/gallery/unnamed-1_orig.webp',
          '/images/gallery/unnamed-2_orig.webp',
          '/images/gallery/unnamed-3_orig.webp',
          '/images/gallery/unnamed-4_orig.webp',
          '/images/gallery/unnamed-5_orig.webp',
          '/images/gallery/unnamed-6_orig.webp',
          '/images/gallery/unnamed-7_orig.webp',
          '/images/gallery/unnamed-8_orig.webp',
          '/images/gallery/unnamed-9_orig.webp',
          '/images/gallery/unnamed-10_orig.webp',
          '/images/gallery/unnamed-11_orig.webp',
          '/images/gallery/unnamed-12_orig.webp',
          '/images/gallery/unnamed-13_orig.webp',
          '/images/gallery/unnamed-14_orig.webp',
          '/images/gallery/unnamed-15_orig.webp',
          '/images/gallery/unnamed-16_orig.webp',
          '/images/gallery/unnamed-17_orig.webp',
          '/images/gallery/unnamed-18_orig.webp',
          '/images/gallery/unnamed-19_orig.webp',
          '/images/gallery/unnamed-20_orig.webp',
          '/images/gallery/unnamed-21_orig.webp',
          '/images/gallery/unnamed-22_orig.webp',
          '/images/gallery/unnamed-23_orig.webp',
          '/images/gallery/unnamed-24_orig.webp'
        ].map((photo, idx) => (
          <img key={idx} src={photo} alt={`Gallery ${idx + 1}`} />
        ))}
      </div>
    </div>
  );
}

function InfoPage({ t }) {
  return (
    <div className="page info-page">
      <div className="page-header">
        <h1>{t.info.title}</h1>
        <div className="title-divider"></div>
      </div>
      
      <div className="info-layout">
        {/* Left Column - Contact Info */}
        <div className="info-left">
          <div className="info-card">
            <h2 className="info-card-title">{t.info.contact}</h2>
            
            <div className="contact-item">
              <MapPin className="contact-icon" />
              <div>
                <h4>{t.info.address}</h4>
                <p>Duisburgsesteenweg 22, 3080 Tervuren</p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=La+Cantina+Italiana+Tervuren" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="maps-link"
                >
                  {t.info.openMaps}
                </a>
              </div>
            </div>

            <div className="contact-item">
              <Phone className="contact-icon" />
              <div>
                <h4>{t.info.phone}</h4>
                <a href="tel:+3227670222" className="contact-link">+32 2 767 02 22</a>
              </div>
            </div>

            <div className="contact-item">
              <Mail className="contact-icon" />
              <div>
                <h4>{t.info.email}</h4>
                <a href="mailto:lacantinaitaliana@mail.be" className="contact-link">lacantinaitaliana@mail.be</a>
                <p className="contact-note">(email is alleen voor info, reservaties via deze website)</p>
              </div>
            </div>

            <div className="contact-item">
              <Facebook className="contact-icon" />
              <div>
                <h4>Facebook</h4>
                <a href="https://www.facebook.com/lacantinaitalianatervuren/" target="_blank" rel="noopener noreferrer" className="contact-link">
                  @lacantinaitalianatervuren
                </a>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h2 className="info-card-title">
              <Clock className="title-icon" />
              Openingstijden
            </h2>
            
            <div className="hours-section">
              <h4>Lunch</h4>
              <p className="hours-time">12h00 - 14h00</p>
            </div>

            <div className="hours-section">
              <h4>Diner</h4>
              <p className="hours-time">18h00 - 22h00</p>
            </div>

            <div className="hours-divider"></div>

            <p className="hours-note">{t.contact.hoursNote}</p>

          </div>
        </div>

        {/* Right Column - Google Maps */}
        <div className="info-right">
          <div className="map-container">
            <iframe
              title="La Cantina Italiana Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.8524!2d4.5133!3d50.8237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3dce1f!0x47c3dce1f!5e0!3m2!1snl!2sbe!4v1234567890!5m2!1snl!2sbe&q=Duisburgsesteenweg+22+3080+Tervuren"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer({ t, language }) {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>{t.footer.contact}</h4>
          <p>Duisburgsesteenweg 22, 3080 Tervuren</p>
          <p>02 767 02 22</p>
          <p>lacantinaitaliana@mail.be</p>
          <p className="footer-note">({t.footer.emailNote})</p>
        </div>
        <div className="footer-section">
          <h4>{t.footer.hours}</h4>
          <p>12h00 - 14h00</p>
          <p>18h00 - 22h00</p>
          <p>{t.footer.hoursNote}</p>
        </div>
        <div className="footer-section">
          <h4>{t.footer.social}</h4>
          <a href="https://www.facebook.com/lacantinaitalianatervuren/" target="_blank" rel="noopener noreferrer" className="social-link">
            <Facebook /> Facebook
          </a>
          <img src="/images/cantina/logo-cantina.jpg" alt="Logo" className="footer-logo" />
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 La Cantina Italiana. BTW: BE0502401008</p>
        <p className="webmaster-notice">
          Ziet u een fout op deze site? Of zoekt u een professionele website? Contacteer de webmaster via WhatsApp.
        </p>
        <div className="webmaster-info">
          <img src="/images/fworksbuilders.png" alt="fworksbuilders" className="webmaster-logo" />
          <span className="webmaster-text">Webmaster: <strong>fworksbuilders</strong> - <a href="https://wa.me/32494516064" target="_blank" rel="noopener noreferrer" className="whatsapp-link">+32 494 51 60 64 (WhatsApp)</a></span>
        </div>
      </div>
    </footer>
  );
}

function CantinaApp() {
  const [language, setLanguage] = useState('nl');

  useEffect(() => {
    axios.post(`${API}/init-menu`).catch(() => {});
  }, []);

  const translations = {
    nl: {
      nav: { home: 'Home', about: 'Wie zijn wij?', menu: 'Kaart', groupMenus: 'Groepmenus', reservation: 'RESERVEREN', gallery: 'Foto\'s', contact: 'Info' },
      hero: { 
        title: 'Welkom bij La Cantina Italiana', 
        subtitle: 'Authentieke Italiaanse keuken in Tervuren',
        cta: 'Reserveren',
        announcement: 'Voor het einde van het jaar zijn wij gesloten op: 24,25 december en 31 december en 1 januari 2026. Open weer vanaf 2 januari 2026.'
      },
      about: { 
        title: 'Authentieke Italiaanse Ervaring',
        preview: 'In het hart van Tervuren biedt La Cantina Italiana u een unieke culinaire ervaring. Met onze authentieke Italiaanse keuken en warme ambiance creëren wij onvergetelijke momenten.',
        readMore: 'Lees ons verhaal',
        text1: 'Als jongste broer van Antonio Di Siervi van restaurant Le Stelle in Schaarbeek, is ook Lorenzo Di Siervi al vroeg met het restaurantvak begonnen. Op slechts 13 jarige leeftijd verlaat hij Italië en begint hij te werken in een welbekend Italiaans restaurant in Genève.',
        text2: 'La Cantina Italiana biedt een klassieke doch moderne Italiaanse keuken, met authentieke Italiaanse produkten: behoud van traditie in een allerdaagse stijl. Deze keuken is seizoensgebonden; met champignons, asperges, zeevruchten, pompoen, al naar gelang de periode van het jaar.'
      },
      features: {
        quality: { title: 'Italiaanse Kwaliteit', text: 'Authentieke Italiaanse ingrediënten' },
        fresh: { title: 'Verse Bereiding', text: 'Dagelijks vers bereid' },
        ambiance: { title: 'Elegante Ambiance', text: 'Verfijnde eetervaring' }
      },
      cta: { title: 'Klaar voor een onvergetelijke ervaring?', subtitle: 'Reserveer nu uw tafel', reserve: 'Reserveren' },
      menu: { 
        title: 'Onze Kaart', 
        subtitle: '',
        downloadTitle: 'Download de kaart',
        downloadText: 'Bekijk onze volledige menukaart met alle gerechten en prijzen',
        downloadButton: 'Download de kaart'
      },
      reservation: {
        title: 'Reserveren',
        subtitle: 'Maak een reservering voor een onvergetelijke ervaring',
        name: 'Naam', email: 'E-mail', phone: 'Telefoon', date: 'Datum', time: 'Tijd',
        guests: 'Aantal gasten', message: 'Bericht (optioneel)', submit: 'Reserveren',
        success: 'Bedankt! Uw reservering is ontvangen. We nemen spoedig contact met u op.',
        announcement: 'Voor het einde van het jaar zijn wij gesloten op: 24,25 december en 31 december en 1 januari 2026. Open weer vanaf 2 januari 2026.',
        info: 'U kunt onderstaand formulier gebruiken voor een reservering. Uw reservering is bevestigd en u wordt NIET terug gecontacteerd, tenzij wij vol zijn geboekt of indien wij verdere vragen hebben.'
      },
      gallery: { title: 'Foto\'s' },
      info: {
        title: 'Praktische Info',
        contact: 'Contact',
        address: 'Adres',
        phone: 'Telefoon',
        email: 'E-mail',
        openMaps: 'Open in Google Maps →',
        hours: 'Openingstijden',
        monTue: 'Maandag & Dinsdag',
        wedSun: 'Woensdag - Zondag',
        closed: 'Gesloten',
        openLunch: 'Lunch: 12:00 - 14:30',
        openDinner: 'Diner: 18:30 - 22:00',
        closedDays: 'Gesloten op dinsdagavond en woensdagavond'
      },
      groupMenus: {
        title: 'Groepmenus / Menus de groupe / Group Menus',
        subtitle: '',
        topNote: 'Perfecte keuze voor groepen vanaf 10 personen',
        bottomNote: 'Menu beschikbaar vanaf 10 personen minimum',
        reserveNow: 'Reserveer Nu',
        downloadPdf: 'Download PDF',
        aperitivo: 'Aperitivo (spumante)',
        or: 'OF / OU / OR',
        surpriseDessert: 'Verrassingsdessert / Dessert surprise / Surprise dessert',
        halfBottleWine: '1/2 fles huiswijn per persoon / 1/2 bouteille de vin par personne "sélection de la maison" / 1/2 bottle per person of housewine',
        menu1: {
          starter1: { title: 'Rundercarpaccio / Carpaccio de boeuf / Beefcarpaccio', description: 'met raketsalade en parmezaanse kaas / roquette et parmesan / with arugula salad and parmesan cheese' },
          starter2: { title: 'Gemarineerde zalm / Saumon mariné / Marinated salmon', description: '' },
          starter3: { title: 'Parmigiana', description: 'Gegratineerde aubergines met gerookte mozzarella / Gratin d\'aubergines à la mozzarella fumée / Gratinated eggplant with smoked mozzarella' },
          starter4: { title: 'Antipasto \'della Cantina\'', description: 'Italiaanse charcuterie, kaas / charcuterie italienne, fromage / Italian charcuterie, cheese' },
          main1: { title: 'Ravioli al Tartufo', description: 'Ravioli met truffel / ravioli à la truffe / ravioli with truffle' },
          main2: { title: 'Gebraden zalm / Saumon rôti / Smoked salmon', description: 'met grof zout, purée van spinazie, spumante saus / au gros sel, purée aux épinards, sauce spumante / with coarse salt, spinach puree, spumante sauce' },
          main3: { title: 'Involtino di vitello', description: 'Kalfsrollade gevuld met hesp en kaas, portsaus, rozijnen, pijnboompitten en pasta / Roulade de veau farcie au jambon cuit et fromage, sauce porto, raisin sec, pignons de pin et pâtes / Veal rolls filled with ham and cheese, port sauce, raisins, pine nuts, served with pasta' }
        },
        menu2: {
          starter1: { title: 'Triologie van zeecarpaccio / Triologie de carpaccio de mer / Triologie of sea carpaccio', description: 'zwaardvis, tonijn, zalm / espadon, thon, saumon / swordfish, tuna, salmon' },
          starter2: { title: 'Parmaham met burratina / Jambon de Parme et burratina / Parma ham with burratina cheese', description: '' },
          starter3: { title: 'Sapori \'Cantina\'', description: 'rundercarpaccio, vitello tonnato, Parmaham / carpaccio de bœuf, vitello tonnato, jambon de Parme / beefcarpaccio, vitello tonnato, Parmaham' },
          starter4: { title: 'Scampi', description: 'met truffel en groene asperges / à la truffe et à l\'asperge verte / with truffles and green asparagus' },
          main1: { title: 'Kalfsribstuk / Côte de veau / Veal chop', description: 'crème van bospaddenstoelen, aardappelen / crème aux champignons des bois, pommes de terre / wild mushroom cream sauce, potatoes' },
          main2: { title: 'Zwaardvis / Espadon / Swordfish', description: 'op mediterraanse wijze (kappertjes, olijven, kerstomaatjes), groenten en aardappelen / façon méditerranée (câpres, olives, tomates cerises), légumes et pommes de terre / Mediterranean-style (capers, olives, cherry tomatoes), vegetables and potatoes' },
          main3: { title: 'Trio van verse pasta \'Cantina\'', description: 'ravioli met truffel, tortelloni met ricotta, tagliatelle met paddenstoelen en Parmaham / ravioli à la truffe, tortelloni à la ricotta, tagliatelle aux champignons et jambon de Parme / ravioli with truffle, tortelloni with ricotta, tagliatelle with mushrooms and Parmaham' }
        },
        menu3: {
          starter1: { title: 'Vitello Tonnato', description: 'Kalfslapje, crème van tonijn, ansjovis, mayonnaise en kappertjes / Braisé de veau, sauce au thon, anchois, mayonnaise et câpres / Braised veal, tuna sauce, anchovies, mayonnaise and capers' },
          starter2: { title: 'Gerookte zalm / Saumon fumé / Smoked salmon', description: '' },
          starter3: { title: 'Ravioli met kreeft / Ravioli de homard / Lobster ravioli', description: '' },
          starter4: { title: 'Salade van ganzenlever / Foie gras / Foie gras', description: 'met geconfijte ajuin en zoet-zure vinaigrette / au confit d\'oignons, vinaigrette aigre-douce / with candied onions, sweet and sour vinaigrette' },
          main1: { title: 'Runderfilet Rossini / Filet de bœuf Rossini / Filet of beef Rossini', description: 'ganzenlever met rodewijnsaus, aardappelen en seizoensgroenten / foie gras, sauce au vin rouge, pommes de terre et légumes de saison / foie gras, red wine sauce, potatoes and seasonal vegetables' },
          main2: { title: 'Ravioli met ganzenlever / Ravioli au foie gras / Ravioli with foie gras', description: 'porto saus, kalfszwezerik / sauce porto, ris de veau / port sauce, sweetbreads' },
          main3: { title: 'Gegrilde vissoorten / Grillade de poissons / Grilled fishes', description: 'met salade / et salade / and salad' }
        }
      },
      contact: { 
        title: 'Contact', 
        hours: 'Openingstijden',
        hoursNote: '7 dagen per week open'
      },
      footer: {
        contact: 'Contact',
        hours: 'Openingstijden',
        social: 'Social',
        emailNote: 'email is alleen voor info, reservaties graag via deze website',
        hoursNote: '7 dagen per week open'
      },
      confirmation: {
        grazie: 'Grazie!',
        title: 'Bedankt, uw reservatie is bevestigd!',
        noContact: 'WIJ KONTAKTEREN U NIET, tenzij wij bijkomende vragen hebben of vol zijn.',
        noCalls: 'Om dubbele reservaties te vermijden, aub BEL ONS NIET voor deze aanvraag!',
        emailCheck: 'Wij bekijken onze email de gehele dag dus uw reservatie is genoteerd.',
        autoConfirm: 'U ontvangt een automatische bevestigingsmail. Indien u een reservatie voor 15 personen of meer doorstuurde, kontakteren wij u persoonlijk binnen de 12 uur.',
        backToSite: 'Klik hier om terug te gaan naar de site'
      }
    },
    fr: {
      nav: { home: 'Accueil', about: 'Qui sommes nous?', menu: 'Carte', groupMenus: 'Menus de Groupe', reservation: 'RÉSERVER', gallery: 'Photos', contact: 'Info' },
      hero: { 
        title: 'Bienvenue chez La Cantina Italiana', 
        subtitle: 'Cuisine italienne authentique à Tervuren',
        cta: 'Réserver',
        announcement: 'La fin de l\'année nous serions fermés le 24,25 décembre et le 31 décembre et le 1er janvier 2026. Réouverture le 2 janvier 2026.'
      },
      about: { 
        title: 'Expérience Italienne Authentique',
        preview: 'Au cœur de Tervuren, La Cantina Italiana vous offre une expérience culinaire unique. Avec notre cuisine italienne authentique et notre ambiance chaleureuse, nous créons des moments inoubliables.',
        readMore: 'Lire notre histoire',
        text1: 'En tant que plus jeune frère d\'Antonio Di Siervi du restaurant Le Stelle à Schaerbeek, Lorenzo s\'initia très tôt au métier de la restauration. Dès ses 13 ans, il quitta l\'Italie et il commença à travailler dans un restaurant italien bien connu à Genève.',
        text2: 'La Cantina Italiana propose une cuisine italienne classique et moderne, avec d\'authentiques produits de la péninsule: le respect de la tradition dans un style contemporain. La cuisine est saisonnière, alliant champignons, asperges, fruits de mer, citrouilles, en fonction de chaque période de l\'année.'
      },
      features: {
        quality: { title: 'Qualité Italienne', text: 'Ingrédients italiens authentiques' },
        fresh: { title: 'Préparation Fraîche', text: 'Préparé frais quotidiennement' },
        ambiance: { title: 'Ambiance Élégante', text: 'Expérience gastronomique raffinée' }
      },
      cta: { title: 'Prêt pour une expérience inoubliable?', subtitle: 'Réservez votre table maintenant', reserve: 'Réserver' },
      menu: { 
        title: 'Notre Carte', 
        subtitle: '',
        downloadTitle: 'Télécharger la carte',
        downloadText: 'Consultez notre menu complet avec tous les plats et prix',
        downloadButton: 'Télécharger la carte'
      },
      reservation: {
        title: 'Réserver',
        subtitle: 'Réservez pour une expérience inoubliable',
        name: 'Nom', email: 'E-mail', phone: 'Téléphone', date: 'Date', time: 'Heure',
        guests: 'Nombre de personnes', message: 'Message (optionnel)', submit: 'Réserver',
        success: 'Merci! Votre réservation a été reçue. Nous vous contacterons bientôt.',
        announcement: 'La fin de l\'année nous serions fermés le 24,25 décembre et le 31 décembre et le 1er janvier 2026. Réouverture le 2 janvier 2026.',
        info: 'Vous pouvez utiliser ce formulier pour faire une réservation. Votre réservation est confirmée et vous ne seriez pas recontacté sauf si nous sommes complet ou si nous avons des questions concernant la demande.'
      },
      gallery: { title: 'Photos' },
      info: {
        title: 'Informations Pratiques',
        contact: 'Contact',
        address: 'Adresse',
        phone: 'Téléphone',
        email: 'E-mail',
        openMaps: 'Ouvrir dans Google Maps →',
        hours: 'Heures d\'ouverture',
        monTue: 'Lundi & Mardi',
        wedSun: 'Mercredi - Dimanche',
        closed: 'Fermé',
        openLunch: 'Déjeuner: 12:00 - 14:30',
        openDinner: 'Dîner: 18:30 - 22:00',
        closedDays: 'Fermé le mardi soir et le mercredi soir'
      },
      groupMenus: {
        title: 'Groepmenus / Menus de groupe / Group Menus',
        subtitle: '',
        topNote: 'Choix parfait pour les groupes à partir de 10 personnes',
        bottomNote: 'Menu disponible à partir de 10 personnes minimum',
        reserveNow: 'Réserver Maintenant',
        downloadPdf: 'Télécharger PDF',
        aperitivo: 'Aperitivo (spumante)',
        or: 'OF / OU / OR',
        surpriseDessert: 'Verrassingsdessert / Dessert surprise / Surprise dessert',
        halfBottleWine: '1/2 fles huiswijn per persoon / 1/2 bouteille de vin par personne "sélection de la maison" / 1/2 bottle per person of housewine',
        menu1: {
          starter1: { title: 'Rundercarpaccio / Carpaccio de boeuf / Beefcarpaccio', description: 'met raketsalade en parmezaanse kaas / roquette et parmesan / with arugula salad and parmesan cheese' },
          starter2: { title: 'Gemarineerde zalm / Saumon mariné / Marinated salmon', description: '' },
          starter3: { title: 'Parmigiana', description: 'Gegratineerde aubergines met gerookte mozzarella / Gratin d\'aubergines à la mozzarella fumée / Gratinated eggplant with smoked mozzarella' },
          starter4: { title: 'Antipasto \'della Cantina\'', description: 'Italiaanse charcuterie, kaas / charcuterie italienne, fromage / Italian charcuterie, cheese' },
          main1: { title: 'Ravioli al Tartufo', description: 'Ravioli met truffel / ravioli à la truffe / ravioli with truffle' },
          main2: { title: 'Gebraden zalm / Saumon rôti / Smoked salmon', description: 'met grof zout, purée van spinazie, spumante saus / au gros sel, purée aux épinards, sauce spumante / with coarse salt, spinach puree, spumante sauce' },
          main3: { title: 'Involtino di vitello', description: 'Kalfsrollade gevuld met hesp en kaas, portsaus, rozijnen, pijnboompitten en pasta / Roulade de veau farcie au jambon cuit et fromage, sauce porto, raisin sec, pignons de pin et pâtes / Veal rolls filled with ham and cheese, port sauce, raisins, pine nuts, served with pasta' }
        },
        menu2: {
          starter1: { title: 'Triologie van zeecarpaccio / Triologie de carpaccio de mer / Triologie of sea carpaccio', description: 'zwaardvis, tonijn, zalm / espadon, thon, saumon / swordfish, tuna, salmon' },
          starter2: { title: 'Parmaham met burratina / Jambon de Parme et burratina / Parma ham with burratina cheese', description: '' },
          starter3: { title: 'Sapori \'Cantina\'', description: 'rundercarpaccio, vitello tonnato, Parmaham / carpaccio de bœuf, vitello tonnato, jambon de Parme / beefcarpaccio, vitello tonnato, Parmaham' },
          starter4: { title: 'Scampi', description: 'met truffel en groene asperges / à la truffe et à l\'asperge verte / with truffles and green asparagus' },
          main1: { title: 'Kalfsribstuk / Côte de veau / Veal chop', description: 'crème van bospaddenstoelen, aardappelen / crème aux champignons des bois, pommes de terre / wild mushroom cream sauce, potatoes' },
          main2: { title: 'Zwaardvis / Espadon / Swordfish', description: 'op mediterraanse wijze (kappertjes, olijven, kerstomaatjes), groenten en aardappelen / façon méditerranée (câpres, olives, tomates cerises), légumes et pommes de terre / Mediterranean-style (capers, olives, cherry tomatoes), vegetables and potatoes' },
          main3: { title: 'Trio van verse pasta \'Cantina\'', description: 'ravioli met truffel, tortelloni met ricotta, tagliatelle met paddenstoelen en Parmaham / ravioli à la truffe, tortelloni à la ricotta, tagliatelle aux champignons et jambon de Parme / ravioli with truffle, tortelloni with ricotta, tagliatelle with mushrooms and Parmaham' }
        },
        menu3: {
          starter1: { title: 'Vitello Tonnato', description: 'Kalfslapje, crème van tonijn, ansjovis, mayonnaise en kappertjes / Braisé de veau, sauce au thon, anchois, mayonnaise et câpres / Braised veal, tuna sauce, anchovies, mayonnaise and capers' },
          starter2: { title: 'Gerookte zalm / Saumon fumé / Smoked salmon', description: '' },
          starter3: { title: 'Ravioli met kreeft / Ravioli de homard / Lobster ravioli', description: '' },
          starter4: { title: 'Salade van ganzenlever / Foie gras / Foie gras', description: 'met geconfijte ajuin en zoet-zure vinaigrette / au confit d\'oignons, vinaigrette aigre-douce / with candied onions, sweet and sour vinaigrette' },
          main1: { title: 'Runderfilet Rossini / Filet de bœuf Rossini / Filet of beef Rossini', description: 'ganzenlever met rodewijnsaus, aardappelen en seizoensgroenten / foie gras, sauce au vin rouge, pommes de terre et légumes de saison / foie gras, red wine sauce, potatoes and seasonal vegetables' },
          main2: { title: 'Ravioli met ganzenlever / Ravioli au foie gras / Ravioli with foie gras', description: 'porto saus, kalfszwezerik / sauce porto, ris de veau / port sauce, sweetbreads' },
          main3: { title: 'Gegrilde vissoorten / Grillade de poissons / Grilled fishes', description: 'met salade / et salade / and salad' }
        }
      },
      contact: { 
        title: 'Contact', 
        hours: 'Heures d\'ouverture',
        hoursNote: 'Ouvert 7 jours sur 7'
      },
      footer: {
        contact: 'Contact',
        hours: 'Heures d\'ouverture',
        social: 'Social',
        emailNote: 'email uniquement pour info, réservations via ce site svp',
        hoursNote: 'Ouvert 7 jours sur 7'
      },
      confirmation: {
        grazie: 'Grazie!',
        title: 'Merci, votre réservation est confirmée!',
        noContact: 'NOUS NE VOUS CONTACTONS PAS, sauf si nous avons des questions supplémentaires ou si nous sommes complets.',
        noCalls: 'Pour éviter les doubles réservations, merci de NE PAS NOUS APPELER pour cette demande!',
        emailCheck: 'Nous consultons nos emails toute la journée donc votre réservation est notée.',
        autoConfirm: 'Vous recevrez un email de confirmation automatique. Si vous avez réservé pour 15 personnes ou plus, nous vous contacterons personnellement dans les 12 heures.',
        backToSite: 'Cliquez ici pour retourner au site'
      }
    },
    en: {
      nav: { home: 'Home', about: 'About Us', menu: 'Menu', groupMenus: 'Group Menus', reservation: 'RESERVE', gallery: 'Photos', contact: 'Info' },
      hero: { 
        title: 'Welcome to La Cantina Italiana', 
        subtitle: 'Authentic Italian cuisine in Tervuren',
        cta: 'Reserve',
        announcement: 'We will be closed at the end of the year on: December 24, 25 and December 31 and January 1, 2026. Open again from January 2, 2026.'
      },
      about: { 
        title: 'Authentic Italian Experience',
        preview: 'In the heart of Tervuren, La Cantina Italiana offers you a unique culinary experience. With our authentic Italian cuisine and warm ambiance, we create unforgettable moments.',
        readMore: 'Read our story',
        text1: 'As the youngest brother of Antonio Di Siervi from restaurant Le Stelle in Schaarbeek, Lorenzo Di Siervi also started early in the restaurant business. At only 13 years old, he left Italy and began working in a well-known Italian restaurant in Geneva.',
        text2: 'La Cantina Italiana offers classic yet modern Italian cuisine with authentic Italian products: preserving tradition in an everyday style. This cuisine is seasonal; with mushrooms, asparagus, seafood, pumpkin, depending on the time of year.'
      },
      features: {
        quality: { title: 'Italian Quality', text: 'Authentic Italian ingredients' },
        fresh: { title: 'Fresh Preparation', text: 'Freshly prepared daily' },
        ambiance: { title: 'Elegant Ambiance', text: 'Refined dining experience' }
      },
      cta: { title: 'Ready for an unforgettable experience?', subtitle: 'Reserve your table now', reserve: 'Reserve' },
      menu: { 
        title: 'Our Menu', 
        subtitle: '',
        downloadTitle: 'Download the menu',
        downloadText: 'View our complete menu with all dishes and prices',
        downloadButton: 'Download the menu'
      },
      reservation: {
        title: 'Reservation',
        subtitle: 'Make a reservation for an unforgettable experience',
        name: 'Name', email: 'Email', phone: 'Phone', date: 'Date', time: 'Time',
        guests: 'Number of guests', message: 'Message (optional)', submit: 'Reserve',
        success: 'Thank you! Your reservation has been received. We will contact you soon.',
        announcement: 'We will be closed at the end of the year on: December 24, 25 and December 31 and January 1, 2026. Open again from January 2, 2026.',
        info: 'You can use this form to make a reservation. Your reservation is confirmed and you will NOT be contacted back unless we are fully booked or if we have further questions.'
      },
      gallery: { title: 'Photos' },
      info: {
        title: 'Practical Information',
        contact: 'Contact',
        address: 'Address',
        phone: 'Phone',
        email: 'Email',
        openMaps: 'Open in Google Maps →',
        hours: 'Opening Hours',
        monTue: 'Monday & Tuesday',
        wedSun: 'Wednesday - Sunday',
        closed: 'Closed',
        openLunch: 'Lunch: 12:00 - 14:30',
        openDinner: 'Dinner: 18:30 - 22:00',
        closedDays: 'Closed on Tuesday evening and Wednesday evening'
      },
      groupMenus: {
        title: 'Groepmenus / Menus de groupe / Group Menus',
        subtitle: '',
        topNote: 'Perfect choice for groups from 10 people',
        bottomNote: 'Menu available from 10 people minimum',
        reserveNow: 'Reserve Now',
        downloadPdf: 'Download PDF',
        aperitivo: 'Aperitivo (spumante)',
        or: 'OF / OU / OR',
        surpriseDessert: 'Verrassingsdessert / Dessert surprise / Surprise dessert',
        halfBottleWine: '1/2 fles huiswijn per persoon / 1/2 bouteille de vin par personne "sélection de la maison" / 1/2 bottle per person of housewine',
        menu1: {
          starter1: { title: 'Rundercarpaccio / Carpaccio de boeuf / Beefcarpaccio', description: 'met raketsalade en parmezaanse kaas / roquette et parmesan / with arugula salad and parmesan cheese' },
          starter2: { title: 'Gemarineerde zalm / Saumon mariné / Marinated salmon', description: '' },
          starter3: { title: 'Parmigiana', description: 'Gegratineerde aubergines met gerookte mozzarella / Gratin d\'aubergines à la mozzarella fumée / Gratinated eggplant with smoked mozzarella' },
          starter4: { title: 'Antipasto \'della Cantina\'', description: 'Italiaanse charcuterie, kaas / charcuterie italienne, fromage / Italian charcuterie, cheese' },
          main1: { title: 'Ravioli al Tartufo', description: 'Ravioli met truffel / ravioli à la truffe / ravioli with truffle' },
          main2: { title: 'Gebraden zalm / Saumon rôti / Smoked salmon', description: 'met grof zout, purée van spinazie, spumante saus / au gros sel, purée aux épinards, sauce spumante / with coarse salt, spinach puree, spumante sauce' },
          main3: { title: 'Involtino di vitello', description: 'Kalfsrollade gevuld met hesp en kaas, portsaus, rozijnen, pijnboompitten en pasta / Roulade de veau farcie au jambon cuit et fromage, sauce porto, raisin sec, pignons de pin et pâtes / Veal rolls filled with ham and cheese, port sauce, raisins, pine nuts, served with pasta' }
        },
        menu2: {
          starter1: { title: 'Triologie van zeecarpaccio / Triologie de carpaccio de mer / Triologie of sea carpaccio', description: 'zwaardvis, tonijn, zalm / espadon, thon, saumon / swordfish, tuna, salmon' },
          starter2: { title: 'Parmaham met burratina / Jambon de Parme et burratina / Parma ham with burratina cheese', description: '' },
          starter3: { title: 'Sapori \'Cantina\'', description: 'rundercarpaccio, vitello tonnato, Parmaham / carpaccio de bœuf, vitello tonnato, jambon de Parme / beefcarpaccio, vitello tonnato, Parmaham' },
          starter4: { title: 'Scampi', description: 'met truffel en groene asperges / à la truffe et à l\'asperge verte / with truffles and green asparagus' },
          main1: { title: 'Kalfsribstuk / Côte de veau / Veal chop', description: 'crème van bospaddenstoelen, aardappelen / crème aux champignons des bois, pommes de terre / wild mushroom cream sauce, potatoes' },
          main2: { title: 'Zwaardvis / Espadon / Swordfish', description: 'op mediterraanse wijze (kappertjes, olijven, kerstomaatjes), groenten en aardappelen / façon méditerranée (câpres, olives, tomates cerises), légumes et pommes de terre / Mediterranean-style (capers, olives, cherry tomatoes), vegetables and potatoes' },
          main3: { title: 'Trio van verse pasta \'Cantina\'', description: 'ravioli met truffel, tortelloni met ricotta, tagliatelle met paddenstoelen en Parmaham / ravioli à la truffe, tortelloni à la ricotta, tagliatelle aux champignons et jambon de Parme / ravioli with truffle, tortelloni with ricotta, tagliatelle with mushrooms and Parmaham' }
        },
        menu3: {
          starter1: { title: 'Vitello Tonnato', description: 'Kalfslapje, crème van tonijn, ansjovis, mayonnaise en kappertjes / Braisé de veau, sauce au thon, anchois, mayonnaise et câpres / Braised veal, tuna sauce, anchovies, mayonnaise and capers' },
          starter2: { title: 'Gerookte zalm / Saumon fumé / Smoked salmon', description: '' },
          starter3: { title: 'Ravioli met kreeft / Ravioli de homard / Lobster ravioli', description: '' },
          starter4: { title: 'Salade van ganzenlever / Foie gras / Foie gras', description: 'met geconfijte ajuin en zoet-zure vinaigrette / au confit d\'oignons, vinaigrette aigre-douce / with candied onions, sweet and sour vinaigrette' },
          main1: { title: 'Runderfilet Rossini / Filet de bœuf Rossini / Filet of beef Rossini', description: 'ganzenlever met rodewijnsaus, aardappelen en seizoensgroenten / foie gras, sauce au vin rouge, pommes de terre et légumes de saison / foie gras, red wine sauce, potatoes and seasonal vegetables' },
          main2: { title: 'Ravioli met ganzenlever / Ravioli au foie gras / Ravioli with foie gras', description: 'porto saus, kalfszwezerik / sauce porto, ris de veau / port sauce, sweetbreads' },
          main3: { title: 'Gegrilde vissoorten / Grillade de poissons / Grilled fishes', description: 'met salade / et salade / and salad' }
        }
      },
      contact: { 
        title: 'Contact', 
        hours: 'Opening Hours',
        hoursNote: 'Open 7 days a week'
      },
      footer: {
        contact: 'Contact',
        hours: 'Opening Hours',
        social: 'Social',
        emailNote: 'email is for info only, please book via this website',
        hoursNote: 'Open 7 days a week'
      },
      confirmation: {
        grazie: 'Grazie!',
        title: 'Thank you, your reservation is confirmed!',
        noContact: 'WE DO NOT CONTACT YOU, unless we have additional questions or are fully booked.',
        noCalls: 'To avoid double reservations, please DO NOT CALL US for this request!',
        emailCheck: 'We check our email all day so your reservation is noted.',
        autoConfirm: 'You will receive an automatic confirmation email. If you reserved for 15 people or more, we will contact you personally within 12 hours.',
        backToSite: 'Click here to return to the site'
      }
    },
    it: {
      nav: { home: 'Home', about: 'Chi Siamo', menu: 'Menu', groupMenus: 'Menu di Gruppo', reservation: 'PRENOTAZIONI', gallery: 'Foto', contact: 'Info' },
      hero: { 
        title: 'Benvenuti a La Cantina Italiana', 
        subtitle: 'Cucina Italiana Autentica a Tervuren',
        cta: 'Prenota Ora',
        announcement: 'A fine anno saremo chiusi il 24, 25 dicembre e il 31 dicembre e il 1° gennaio 2026. Riapertura il 2 gennaio 2026.'
      },
      about: { 
        title: 'Esperienza Italiana Autentica',
        preview: 'Nel cuore di Tervuren, La Cantina Italiana vi offre un\'esperienza culinaria unica. Con la nostra cucina italiana autentica e l\'atmosfera calorosa, creiamo momenti indimenticabili.',
        readMore: 'Leggi la nostra storia',
        text1: 'Come fratello minore di Antonio Di Siervi del ristorante Le Stelle a Schaarbeek, anche Lorenzo Di Siervi ha iniziato presto nel settore della ristorazione. A soli 13 anni, ha lasciato l\'Italia e ha iniziato a lavorare in un noto ristorante italiano a Ginevra.',
        text2: 'La Cantina Italiana offre una cucina italiana classica e moderna, con autentici prodotti italiani: il rispetto della tradizione in uno stile contemporaneo. La cucina è stagionale, con funghi, asparagi, frutti di mare, zucca, a seconda del periodo dell\'anno.'
      },
      features: {
        quality: { title: 'Qualità Italiana', text: 'Ingredienti italiani autentici' },
        fresh: { title: 'Preparazione Fresca', text: 'Preparato fresco ogni giorno' },
        ambiance: { title: 'Atmosfera Elegante', text: 'Esperienza culinaria raffinata' }
      },
      cta: { title: 'Pronto per un\'esperienza indimenticabile?', subtitle: 'Prenota il tuo tavolo ora', reserve: 'Prenota' },
      menu: { 
        title: 'Il Nostro Menu', 
        subtitle: '',
        downloadTitle: 'Scarica il menu',
        downloadText: 'Visualizza il nostro menu completo con tutti i piatti e i prezzi',
        downloadButton: 'Scarica il menu'
      },
      reservation: {
        title: 'Prenotazioni',
        subtitle: 'Prenota per un\'esperienza indimenticabile',
        name: 'Nome', email: 'Email', phone: 'Telefono', date: 'Data', time: 'Ora',
        guests: 'Numero di ospiti', message: 'Messaggio (opzionale)', submit: 'Prenota',
        success: 'Grazie! La tua prenotazione è stata ricevuta. Ti contatteremo presto.',
        announcement: 'A fine anno saremo chiusi il 24, 25 dicembre e il 31 dicembre e il 1° gennaio 2026. Riapertura il 2 gennaio 2026.',
        info: 'Puoi utilizzare questo modulo per effettuare una prenotazione. La tua prenotazione è confermata e NON verrai ricontattato a meno che non siamo al completo o se abbiamo ulteriori domande.'
      },
      gallery: { title: 'Foto' },
      info: {
        title: 'Informazioni Pratiche',
        contact: 'Contatto',
        address: 'Indirizzo',
        phone: 'Telefono',
        email: 'Email',
        openMaps: 'Apri in Google Maps →',
        hours: 'Orari di Apertura',
        monTue: 'Lunedì & Martedì',
        wedSun: 'Mercoledì - Domenica',
        closed: 'Chiuso',
        openLunch: 'Pranzo: 12:00 - 14:30',
        openDinner: 'Cena: 18:30 - 22:00',
        closedDays: 'Chiuso il martedì sera e il mercoledì sera'
      },
      groupMenus: {
        title: 'Groepmenus / Menus de groupe / Group Menus',
        subtitle: '',
        topNote: 'Scelta perfetta per gruppi da 10 persone',
        bottomNote: 'Menu disponibile da 10 persone minimo',
        reserveNow: 'Prenota Ora',
        downloadPdf: 'Scarica PDF',
        aperitivo: 'Aperitivo (spumante)',
        or: 'OF / OU / OR',
        surpriseDessert: 'Verrassingsdessert / Dessert surprise / Surprise dessert',
        halfBottleWine: '1/2 fles huiswijn per persoon / 1/2 bouteille de vin par personne "sélection de la maison" / 1/2 bottle per person of housewine',
        menu1: {
          starter1: { title: 'Rundercarpaccio / Carpaccio de boeuf / Beefcarpaccio', description: 'met raketsalade en parmezaanse kaas / roquette et parmesan / with arugula salad and parmesan cheese' },
          starter2: { title: 'Gemarineerde zalm / Saumon mariné / Marinated salmon', description: '' },
          starter3: { title: 'Parmigiana', description: 'Gegratineerde aubergines met gerookte mozzarella / Gratin d\'aubergines à la mozzarella fumée / Gratinated eggplant with smoked mozzarella' },
          starter4: { title: 'Antipasto \'della Cantina\'', description: 'Italiaanse charcuterie, kaas / charcuterie italienne, fromage / Italian charcuterie, cheese' },
          main1: { title: 'Ravioli al Tartufo', description: 'Ravioli met truffel / ravioli à la truffe / ravioli with truffle' },
          main2: { title: 'Gebraden zalm / Saumon rôti / Smoked salmon', description: 'met grof zout, purée van spinazie, spumante saus / au gros sel, purée aux épinards, sauce spumante / with coarse salt, spinach puree, spumante sauce' },
          main3: { title: 'Involtino di vitello', description: 'Kalfsrollade gevuld met hesp en kaas, portsaus, rozijnen, pijnboompitten en pasta / Roulade de veau farcie au jambon cuit et fromage, sauce porto, raisin sec, pignons de pin et pâtes / Veal rolls filled with ham and cheese, port sauce, raisins, pine nuts, served with pasta' }
        },
        menu2: {
          starter1: { title: 'Triologie van zeecarpaccio / Triologie de carpaccio de mer / Triologie of sea carpaccio', description: 'zwaardvis, tonijn, zalm / espadon, thon, saumon / swordfish, tuna, salmon' },
          starter2: { title: 'Parmaham met burratina / Jambon de Parme et burratina / Parma ham with burratina cheese', description: '' },
          starter3: { title: 'Sapori \'Cantina\'', description: 'rundercarpaccio, vitello tonnato, Parmaham / carpaccio de bœuf, vitello tonnato, jambon de Parme / beefcarpaccio, vitello tonnato, Parmaham' },
          starter4: { title: 'Scampi', description: 'met truffel en groene asperges / à la truffe et à l\'asperge verte / with truffles and green asparagus' },
          main1: { title: 'Kalfsribstuk / Côte de veau / Veal chop', description: 'crème van bospaddenstoelen, aardappelen / crème aux champignons des bois, pommes de terre / wild mushroom cream sauce, potatoes' },
          main2: { title: 'Zwaardvis / Espadon / Swordfish', description: 'op mediterraanse wijze (kappertjes, olijven, kerstomaatjes), groenten en aardappelen / façon méditerranée (câpres, olives, tomates cerises), légumes et pommes de terre / Mediterranean-style (capers, olives, cherry tomatoes), vegetables and potatoes' },
          main3: { title: 'Trio van verse pasta \'Cantina\'', description: 'ravioli met truffel, tortelloni met ricotta, tagliatelle met paddenstoelen en Parmaham / ravioli à la truffe, tortelloni à la ricotta, tagliatelle aux champignons et jambon de Parme / ravioli with truffle, tortelloni with ricotta, tagliatelle with mushrooms and Parmaham' }
        },
        menu3: {
          starter1: { title: 'Vitello Tonnato', description: 'Kalfslapje, crème van tonijn, ansjovis, mayonnaise en kappertjes / Braisé de veau, sauce au thon, anchois, mayonnaise et câpres / Braised veal, tuna sauce, anchovies, mayonnaise and capers' },
          starter2: { title: 'Gerookte zalm / Saumon fumé / Smoked salmon', description: '' },
          starter3: { title: 'Ravioli met kreeft / Ravioli de homard / Lobster ravioli', description: '' },
          starter4: { title: 'Salade van ganzenlever / Foie gras / Foie gras', description: 'met geconfijte ajuin en zoet-zure vinaigrette / au confit d\'oignons, vinaigrette aigre-douce / with candied onions, sweet and sour vinaigrette' },
          main1: { title: 'Runderfilet Rossini / Filet de bœuf Rossini / Filet of beef Rossini', description: 'ganzenlever met rodewijnsaus, aardappelen en seizoensgroenten / foie gras, sauce au vin rouge, pommes de terre et légumes de saison / foie gras, red wine sauce, potatoes and seasonal vegetables' },
          main2: { title: 'Ravioli met ganzenlever / Ravioli au foie gras / Ravioli with foie gras', description: 'porto saus, kalfszwezerik / sauce porto, ris de veau / port sauce, sweetbreads' },
          main3: { title: 'Gegrilde vissoorten / Grillade de poissons / Grilled fishes', description: 'met salade / et salade / and salad' }
        }
      },
      contact: { 
        title: 'Contatti', 
        hours: 'Orari di apertura',
        hoursNote: 'Aperto 7 giorni su 7'
      },
      footer: {
        contact: 'Contatti',
        hours: 'Orari di apertura',
        social: 'Social',
        emailNote: 'email solo per info, prenotazioni tramite questo sito',
        hoursNote: 'Aperto 7 giorni su 7'
      },
      confirmation: {
        grazie: 'Grazie!',
        title: 'Grazie, la sua prenotazione è confermata!',
        noContact: 'NON LA CONTATTIAMO, a meno che non abbiamo domande aggiuntive o siamo al completo.',
        noCalls: 'Per evitare doppie prenotazioni, per favore NON CI CHIAMI per questa richiesta!',
        emailCheck: 'Controlliamo la nostra email tutto il giorno quindi la sua prenotazione è annotata.',
        autoConfirm: 'Riceverai un\'email di conferma automatica. Se hai prenotato per 15 persone o più, ti contatteremo personalmente entro 12 ore.',
        backToSite: 'Clicca qui per tornare al sito'
      }
    },
    de: {
      nav: { home: 'Startseite', about: 'Über Uns', menu: 'Karte', groupMenus: 'Gruppenmenüs', reservation: 'RESERVIEREN', gallery: 'Fotos', contact: 'Info' },
      hero: { 
        title: 'Willkommen bei La Cantina Italiana', 
        subtitle: 'Authentische italienische Küche in Tervuren',
        cta: 'Reservieren',
        announcement: 'Zum Jahresende sind wir geschlossen am: 24., 25. Dezember und 31. Dezember und 1. Januar 2026. Wieder geöffnet ab 2. Januar 2026.'
      },
      about: { 
        title: 'Authentisches Italienisches Erlebnis',
        preview: 'Im Herzen von Tervuren bietet Ihnen La Cantina Italiana ein einzigartiges kulinarisches Erlebnis. Mit unserer authentischen italienischen Küche und warmen Atmosphäre schaffen wir unvergessliche Momente.',
        readMore: 'Unsere Geschichte lesen',
        text1: 'Als jüngster Bruder von Antonio Di Siervi vom Restaurant Le Stelle in Schaarbeek begann auch Lorenzo Di Siervi früh in der Gastronomie. Mit nur 13 Jahren verließ er Italien und begann in einem bekannten italienischen Restaurant in Genf zu arbeiten.',
        text2: 'La Cantina Italiana bietet klassische und moderne italienische Küche mit authentischen italienischen Produkten: Bewahrung der Tradition in einem zeitgemäßen Stil. Die Küche ist saisonal; mit Pilzen, Spargel, Meeresfrüchten, Kürbis, je nach Jahreszeit.'
      },
      features: {
        quality: { title: 'Italienische Qualität', text: 'Authentische italienische Zutaten' },
        fresh: { title: 'Frische Zubereitung', text: 'Täglich frisch zubereitet' },
        ambiance: { title: 'Elegantes Ambiente', text: 'Raffiniertes Speiseerlebnis' }
      },
      cta: { title: 'Bereit für ein unvergessliches Erlebnis?', subtitle: 'Reservieren Sie jetzt Ihren Tisch', reserve: 'Reservieren' },
      menu: { 
        title: 'Unsere Karte', 
        subtitle: '',
        downloadTitle: 'Karte herunterladen',
        downloadText: 'Sehen Sie unsere vollständige Speisekarte mit allen Gerichten und Preisen',
        downloadButton: 'Karte herunterladen'
      },
      reservation: {
        title: 'Reservierung',
        subtitle: 'Reservieren Sie für ein unvergessliches Erlebnis',
        name: 'Name', email: 'E-Mail', phone: 'Telefon', date: 'Datum', time: 'Zeit',
        guests: 'Anzahl der Gäste', message: 'Nachricht (optional)', submit: 'Reservieren',
        success: 'Vielen Dank! Ihre Reservierung wurde erhalten. Wir werden Sie bald kontaktieren.',
        announcement: 'Zum Jahresende sind wir geschlossen am: 24., 25. Dezember und 31. Dezember und 1. Januar 2026. Wieder geöffnet ab 2. Januar 2026.',
        info: 'Sie können dieses Formular für eine Reservierung verwenden. Ihre Reservierung ist bestätigt und Sie werden NICHT zurückgerufen, es sei denn, wir sind ausgebucht oder haben weitere Fragen.'
      },
      gallery: { title: 'Fotos' },
      info: {
        title: 'Praktische Informationen',
        contact: 'Kontakt',
        address: 'Adresse',
        phone: 'Telefon',
        email: 'E-Mail',
        openMaps: 'In Google Maps öffnen →',
        hours: 'Öffnungszeiten',
        monTue: 'Montag & Dienstag',
        wedSun: 'Mittwoch - Sonntag',
        closed: 'Geschlossen',
        openLunch: 'Mittagessen: 12:00 - 14:30',
        openDinner: 'Abendessen: 18:30 - 22:00',
        closedDays: 'Geschlossen am Dienstagabend und Mittwochabend'
      },
      groupMenus: {
        title: 'Groepmenus / Menus de groupe / Group Menus',
        subtitle: '',
        topNote: 'Perfekte Wahl für Gruppen ab 10 Personen',
        bottomNote: 'Menü verfügbar ab 10 Personen mindestens',
        reserveNow: 'Jetzt Reservieren',
        downloadPdf: 'PDF Herunterladen',
        aperitivo: 'Aperitivo (spumante)',
        or: 'OF / OU / OR',
        surpriseDessert: 'Verrassingsdessert / Dessert surprise / Surprise dessert',
        halfBottleWine: '1/2 fles huiswijn per persoon / 1/2 bouteille de vin par personne "sélection de la maison" / 1/2 bottle per person of housewine',
        menu1: {
          starter1: { title: 'Rundercarpaccio / Carpaccio de boeuf / Beefcarpaccio', description: 'met raketsalade en parmezaanse kaas / roquette et parmesan / with arugula salad and parmesan cheese' },
          starter2: { title: 'Gemarineerde zalm / Saumon mariné / Marinated salmon', description: '' },
          starter3: { title: 'Parmigiana', description: 'Gegratineerde aubergines met gerookte mozzarella / Gratin d\'aubergines à la mozzarella fumée / Gratinated eggplant with smoked mozzarella' },
          starter4: { title: 'Antipasto \'della Cantina\'', description: 'Italiaanse charcuterie, kaas / charcuterie italienne, fromage / Italian charcuterie, cheese' },
          main1: { title: 'Ravioli al Tartufo', description: 'Ravioli met truffel / ravioli à la truffe / ravioli with truffle' },
          main2: { title: 'Gebraden zalm / Saumon rôti / Smoked salmon', description: 'met grof zout, purée van spinazie, spumante saus / au gros sel, purée aux épinards, sauce spumante / with coarse salt, spinach puree, spumante sauce' },
          main3: { title: 'Involtino di vitello', description: 'Kalfsrollade gevuld met hesp en kaas, portsaus, rozijnen, pijnboompitten en pasta / Roulade de veau farcie au jambon cuit et fromage, sauce porto, raisin sec, pignons de pin et pâtes / Veal rolls filled with ham and cheese, port sauce, raisins, pine nuts, served with pasta' }
        },
        menu2: {
          starter1: { title: 'Triologie van zeecarpaccio / Triologie de carpaccio de mer / Triologie of sea carpaccio', description: 'zwaardvis, tonijn, zalm / espadon, thon, saumon / swordfish, tuna, salmon' },
          starter2: { title: 'Parmaham met burratina / Jambon de Parme et burratina / Parma ham with burratina cheese', description: '' },
          starter3: { title: 'Sapori \'Cantina\'', description: 'rundercarpaccio, vitello tonnato, Parmaham / carpaccio de bœuf, vitello tonnato, jambon de Parme / beefcarpaccio, vitello tonnato, Parmaham' },
          starter4: { title: 'Scampi', description: 'met truffel en groene asperges / à la truffe et à l\'asperge verte / with truffles and green asparagus' },
          main1: { title: 'Kalfsribstuk / Côte de veau / Veal chop', description: 'crème van bospaddenstoelen, aardappelen / crème aux champignons des bois, pommes de terre / wild mushroom cream sauce, potatoes' },
          main2: { title: 'Zwaardvis / Espadon / Swordfish', description: 'op mediterraanse wijze (kappertjes, olijven, kerstomaatjes), groenten en aardappelen / façon méditerranée (câpres, olives, tomates cerises), légumes et pommes de terre / Mediterranean-style (capers, olives, cherry tomatoes), vegetables and potatoes' },
          main3: { title: 'Trio van verse pasta \'Cantina\'', description: 'ravioli met truffel, tortelloni met ricotta, tagliatelle met paddenstoelen en Parmaham / ravioli à la truffe, tortelloni à la ricotta, tagliatelle aux champignons et jambon de Parme / ravioli with truffle, tortelloni with ricotta, tagliatelle with mushrooms and Parmaham' }
        },
        menu3: {
          starter1: { title: 'Vitello Tonnato', description: 'Kalfslapje, crème van tonijn, ansjovis, mayonnaise en kappertjes / Braisé de veau, sauce au thon, anchois, mayonnaise et câpres / Braised veal, tuna sauce, anchovies, mayonnaise and capers' },
          starter2: { title: 'Gerookte zalm / Saumon fumé / Smoked salmon', description: '' },
          starter3: { title: 'Ravioli met kreeft / Ravioli de homard / Lobster ravioli', description: '' },
          starter4: { title: 'Salade van ganzenlever / Foie gras / Foie gras', description: 'met geconfijte ajuin en zoet-zure vinaigrette / au confit d\'oignons, vinaigrette aigre-douce / with candied onions, sweet and sour vinaigrette' },
          main1: { title: 'Runderfilet Rossini / Filet de bœuf Rossini / Filet of beef Rossini', description: 'ganzenlever met rodewijnsaus, aardappelen en seizoensgroenten / foie gras, sauce au vin rouge, pommes de terre et légumes de saison / foie gras, red wine sauce, potatoes and seasonal vegetables' },
          main2: { title: 'Ravioli met ganzenlever / Ravioli au foie gras / Ravioli with foie gras', description: 'porto saus, kalfszwezerik / sauce porto, ris de veau / port sauce, sweetbreads' },
          main3: { title: 'Gegrilde vissoorten / Grillade de poissons / Grilled fishes', description: 'met salade / et salade / and salad' }
        }
      },
      contact: { 
        title: 'Kontakt', 
        hours: 'Öffnungszeiten',
        hoursNote: '7 Tage die Woche geöffnet'
      },
      footer: {
        contact: 'Kontakt',
        hours: 'Öffnungszeiten',
        social: 'Social',
        emailNote: 'E-Mail nur für Infos, bitte über diese Website buchen',
        hoursNote: '7 Tage die Woche geöffnet'
      },
      confirmation: {
        grazie: 'Grazie!',
        title: 'Danke, Ihre Reservierung ist bestätigt!',
        noContact: 'WIR KONTAKTIEREN SIE NICHT, es sei denn, wir haben zusätzliche Fragen oder sind ausgebucht.',
        noCalls: 'Um Doppelbuchungen zu vermeiden, bitte RUFEN SIE UNS NICHT für diese Anfrage an!',
        emailCheck: 'Wir überprüfen unsere E-Mails den ganzen Tag, also ist Ihre Reservierung notiert.',
        autoConfirm: 'Sie erhalten eine automatische Bestätigungs-E-Mail. Wenn Sie für 15 Personen oder mehr reserviert haben, werden wir Sie persönlich innerhalb von 12 Stunden kontaktieren.',
        backToSite: 'Klicken Sie hier, um zur Website zurückzukehren'
      }
    }
  };

  const t = translations[language];

  return (
    <>
      <ScrollToTop />
      <div className="App">
        <Navigation language={language} setLanguage={setLanguage} t={t} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage t={t} />} />
            <Route path="/about" element={<AboutPage t={t} />} />
            <Route path="/kaart" element={<KaartPage t={t} />} />
            <Route path="/groepmenus" element={<GroepmenusPage t={t} />} />
            <Route path="/reserveren" element={<ReserverenPage t={t} />} />
            <Route path="/confirmation" element={<ConfirmationPage t={t} />} />
            <Route path="/confirmation.html" element={<ConfirmationPage t={t} />} />
            <Route path="/fotos" element={<FotosPage t={t} />} />
            <Route path="/info" element={<InfoPage t={t} />} />
          </Routes>
        </main>
        <Footer t={t} language={language} />
      </div>
    </>
  );
}

export default CantinaApp;
