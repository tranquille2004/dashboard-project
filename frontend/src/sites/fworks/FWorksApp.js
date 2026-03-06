import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Globe, Smartphone, Shield, Zap, MessageCircle, Mail, Phone, 
  ChevronRight, Check, Star, Menu, X, ArrowRight, Settings,
  CreditCard, Calendar, Languages, BarChart3, Clock, Bell,
  Image, FileText, Users, ShoppingCart, MapPin, ChevronLeft,
  Monitor, Palette, Lock, Megaphone
} from 'lucide-react';
import SEO from '@/components/SEO';
import './FWorks.css';

// Translations
const translations = {
  nl: {
    nav: { home: 'Home', features: 'Mogelijkheden', portfolio: 'Portfolio', pricing: 'Prijzen', contact: 'Contact' },
    hero: {
      title: 'Professionele Websites',
      subtitle: 'Die Klanten Aantrekken',
      description: 'Moderne, snelle en mobielvriendelijke websites met eigen beheerdashboard. Volledig op maat gemaakt voor uw bedrijf.',
      cta: 'Gratis Offerte Aanvragen',
      ctaSecondary: 'Bekijk Mogelijkheden'
    },
    features: {
      title: 'Wat Kan Uw Website Allemaal?',
      subtitle: 'Ontdek de krachtige functies die wij bieden',
      dashboard: {
        title: 'Eigen Beheerdashboard',
        desc: 'Beheer uw website zelf! Wijzig teksten, foto\'s en instellingen wanneer u maar wilt.',
        features: ['Onbeperkte wijzigingen', 'Geen technische kennis nodig', '24/7 toegang']
      },
      announcement: {
        title: 'Mededelingen & Aankondigingen',
        desc: 'Plaats belangrijke berichten direct op uw website. Sluitingsdagen, speciale acties, of nieuws.',
        features: ['Direct zichtbaar', 'Meerdere stijlen', 'Tijdelijk of permanent']
      },
      reservation: {
        title: 'Reservatie & Contactformulieren',
        desc: 'Laat klanten online reserveren of contact opnemen. Alle aanvragen direct in uw inbox.',
        features: ['Online reservaties', 'Contactformulieren', 'E-mail notificaties']
      },
      menu: {
        title: 'Menu\'s & Producten',
        desc: 'Toon uw menu of producten met prijzen, beschrijvingen en foto\'s.',
        features: ['Categorieën', 'Prijzen beheren', 'Foto galerijen']
      },
      payment: {
        title: 'Online Betalingen',
        desc: 'Accepteer betalingen via Stripe, PayPal of andere betaalmethodes.',
        features: ['Veilig betalen', 'Meerdere opties', 'Automatische facturen']
      },
      multilingual: {
        title: 'Meertalige Website',
        desc: 'Bereik meer klanten met een website in meerdere talen.',
        features: ['Nederlands', 'Frans', 'Engels', 'Andere talen']
      }
    },
    demo: {
      title: 'Probeer Het Zelf',
      subtitle: 'Klik op de knoppen om te zien wat u allemaal kunt doen',
      dashboardTitle: 'Beheerdashboard',
      announcement: 'Mededeling Plaatsen',
      announcementText: '🎄 Wij zijn gesloten van 24 tot 26 december. Fijne feestdagen!',
      gallery: 'Foto\'s Beheren',
      menu: 'Menu Aanpassen',
      contact: 'Berichten Bekijken',
      hours: 'Openingstijden'
    },
    portfolio: {
      title: 'Onze Websites',
      subtitle: 'Bekijk enkele van onze recente projecten',
      viewSite: 'Bekijk Website',
      liveDemo: 'Live Demo'
    },
    pricing: {
      title: 'Transparante Prijzen',
      subtitle: 'Geen verrassingen, alles inbegrepen',
      price: '199',
      period: 'per jaar',
      includes: 'Inbegrepen:',
      features: [
        'Professionele maatwerk website',
        'Eigen beheerdashboard',
        'Onbeperkte wijzigingen via dashboard',
        'Mobielvriendelijk design',
        'SSL-certificaat (veilige verbinding)',
        'Hosting & onderhoud',
        'E-mail support',
        'Meertalige ondersteuning'
      ],
      cta: 'Start Vandaag',
      note: 'Eenmalige opzet vanaf €499 (afhankelijk van complexiteit)'
    },
    contact: {
      title: 'Neem Contact Op',
      subtitle: 'Laten we uw project bespreken',
      form: {
        name: 'Uw Naam',
        email: 'E-mailadres',
        phone: 'Telefoonnummer',
        message: 'Uw Bericht',
        business: 'Type Bedrijf',
        submit: 'Verstuur Bericht'
      },
      whatsapp: 'Of stuur een WhatsApp',
      info: {
        title: 'Direct Contact',
        email: 'info@fworksbuilders.com',
        phone: '+32 494 51 60 64',
        hours: 'Ma-Vr: 9:00 - 18:00'
      }
    },
    footer: {
      tagline: 'Professionele websites die resultaat opleveren',
      rights: 'Alle rechten voorbehouden'
    }
  },
  fr: {
    nav: { home: 'Accueil', features: 'Fonctionnalités', portfolio: 'Portfolio', pricing: 'Tarifs', contact: 'Contact' },
    hero: {
      title: 'Sites Web Professionnels',
      subtitle: 'Qui Attirent Les Clients',
      description: 'Sites web modernes, rapides et adaptés aux mobiles avec tableau de bord personnel. Entièrement personnalisé pour votre entreprise.',
      cta: 'Demander Un Devis Gratuit',
      ctaSecondary: 'Voir Les Fonctionnalités'
    },
    features: {
      title: 'Que Peut Faire Votre Site?',
      subtitle: 'Découvrez les fonctionnalités puissantes que nous offrons',
      dashboard: {
        title: 'Tableau de Bord Personnel',
        desc: 'Gérez votre site vous-même! Modifiez textes, photos et paramètres quand vous voulez.',
        features: ['Modifications illimitées', 'Aucune connaissance technique', 'Accès 24/7']
      },
      announcement: {
        title: 'Annonces & Messages',
        desc: 'Publiez des messages importants directement sur votre site. Fermetures, promotions, ou actualités.',
        features: ['Visible immédiatement', 'Plusieurs styles', 'Temporaire ou permanent']
      },
      reservation: {
        title: 'Réservations & Formulaires',
        desc: 'Permettez aux clients de réserver ou de vous contacter en ligne.',
        features: ['Réservations en ligne', 'Formulaires de contact', 'Notifications par e-mail']
      },
      menu: {
        title: 'Menus & Produits',
        desc: 'Affichez votre menu ou produits avec prix, descriptions et photos.',
        features: ['Catégories', 'Gestion des prix', 'Galeries photos']
      },
      payment: {
        title: 'Paiements En Ligne',
        desc: 'Acceptez les paiements via Stripe, PayPal ou autres méthodes.',
        features: ['Paiement sécurisé', 'Plusieurs options', 'Factures automatiques']
      },
      multilingual: {
        title: 'Site Multilingue',
        desc: 'Atteignez plus de clients avec un site en plusieurs langues.',
        features: ['Néerlandais', 'Français', 'Anglais', 'Autres langues']
      }
    },
    demo: {
      title: 'Essayez Vous-Même',
      subtitle: 'Cliquez sur les boutons pour voir ce que vous pouvez faire',
      dashboardTitle: 'Tableau de Bord',
      announcement: 'Publier Une Annonce',
      announcementText: '🎄 Nous sommes fermés du 24 au 26 décembre. Joyeuses fêtes!',
      gallery: 'Gérer Les Photos',
      menu: 'Modifier Le Menu',
      contact: 'Voir Les Messages',
      hours: 'Horaires'
    },
    portfolio: {
      title: 'Nos Sites Web',
      subtitle: 'Découvrez quelques-uns de nos projets récents',
      viewSite: 'Voir Le Site',
      liveDemo: 'Démo Live'
    },
    pricing: {
      title: 'Tarifs Transparents',
      subtitle: 'Pas de surprises, tout est inclus',
      price: '199',
      period: 'par an',
      includes: 'Inclus:',
      features: [
        'Site web professionnel sur mesure',
        'Tableau de bord personnel',
        'Modifications illimitées via dashboard',
        'Design adapté aux mobiles',
        'Certificat SSL (connexion sécurisée)',
        'Hébergement & maintenance',
        'Support par e-mail',
        'Support multilingue'
      ],
      cta: 'Commencer Aujourd\'hui',
      note: 'Frais de création à partir de €499 (selon la complexité)'
    },
    contact: {
      title: 'Contactez-Nous',
      subtitle: 'Discutons de votre projet',
      form: {
        name: 'Votre Nom',
        email: 'Adresse E-mail',
        phone: 'Numéro de Téléphone',
        message: 'Votre Message',
        business: 'Type d\'Entreprise',
        submit: 'Envoyer Le Message'
      },
      whatsapp: 'Ou envoyez un WhatsApp',
      info: {
        title: 'Contact Direct',
        email: 'info@fworksbuilders.com',
        phone: '+32 494 51 60 64',
        hours: 'Lun-Ven: 9:00 - 18:00'
      }
    },
    footer: {
      tagline: 'Sites web professionnels qui génèrent des résultats',
      rights: 'Tous droits réservés'
    }
  },
  en: {
    nav: { home: 'Home', features: 'Features', portfolio: 'Portfolio', pricing: 'Pricing', contact: 'Contact' },
    hero: {
      title: 'Professional Websites',
      subtitle: 'That Attract Customers',
      description: 'Modern, fast, and mobile-friendly websites with your own management dashboard. Fully customized for your business.',
      cta: 'Get A Free Quote',
      ctaSecondary: 'View Features'
    },
    features: {
      title: 'What Can Your Website Do?',
      subtitle: 'Discover the powerful features we offer',
      dashboard: {
        title: 'Personal Dashboard',
        desc: 'Manage your website yourself! Change texts, photos and settings whenever you want.',
        features: ['Unlimited changes', 'No technical knowledge needed', '24/7 access']
      },
      announcement: {
        title: 'Announcements & Notices',
        desc: 'Post important messages directly on your website. Closures, promotions, or news.',
        features: ['Instantly visible', 'Multiple styles', 'Temporary or permanent']
      },
      reservation: {
        title: 'Reservations & Contact Forms',
        desc: 'Let customers book online or contact you. All inquiries directly in your inbox.',
        features: ['Online reservations', 'Contact forms', 'Email notifications']
      },
      menu: {
        title: 'Menus & Products',
        desc: 'Display your menu or products with prices, descriptions and photos.',
        features: ['Categories', 'Manage prices', 'Photo galleries']
      },
      payment: {
        title: 'Online Payments',
        desc: 'Accept payments via Stripe, PayPal or other payment methods.',
        features: ['Secure payment', 'Multiple options', 'Automatic invoices']
      },
      multilingual: {
        title: 'Multilingual Website',
        desc: 'Reach more customers with a website in multiple languages.',
        features: ['Dutch', 'French', 'English', 'Other languages']
      }
    },
    demo: {
      title: 'Try It Yourself',
      subtitle: 'Click the buttons to see what you can do',
      dashboardTitle: 'Dashboard',
      announcement: 'Post Announcement',
      announcementText: '🎄 We are closed from December 24 to 26. Happy holidays!',
      gallery: 'Manage Photos',
      menu: 'Edit Menu',
      contact: 'View Messages',
      hours: 'Opening Hours'
    },
    portfolio: {
      title: 'Our Websites',
      subtitle: 'Check out some of our recent projects',
      viewSite: 'View Website',
      liveDemo: 'Live Demo'
    },
    pricing: {
      title: 'Transparent Pricing',
      subtitle: 'No surprises, everything included',
      price: '199',
      period: 'per year',
      includes: 'Includes:',
      features: [
        'Professional custom website',
        'Personal management dashboard',
        'Unlimited changes via dashboard',
        'Mobile-friendly design',
        'SSL certificate (secure connection)',
        'Hosting & maintenance',
        'Email support',
        'Multilingual support'
      ],
      cta: 'Start Today',
      note: 'One-time setup fee from €499 (depending on complexity)'
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Let\'s discuss your project',
      form: {
        name: 'Your Name',
        email: 'Email Address',
        phone: 'Phone Number',
        message: 'Your Message',
        business: 'Business Type',
        submit: 'Send Message'
      },
      whatsapp: 'Or send a WhatsApp',
      info: {
        title: 'Direct Contact',
        email: 'info@fworksbuilders.com',
        phone: '+32 494 51 60 64',
        hours: 'Mon-Fri: 9:00 - 18:00'
      }
    },
    footer: {
      tagline: 'Professional websites that deliver results',
      rights: 'All rights reserved'
    }
  }
};

// Portfolio data with real website screenshots (iframe previews)
const portfolioItems = [
  {
    name: 'La Cantina Italiana',
    type: { nl: 'Italiaans Restaurant', fr: 'Restaurant Italien', en: 'Italian Restaurant' },
    location: 'Tervuren',
    url: 'https://lacantinaitaliana.net',
    previewUrl: 'https://fworks-admin.preview.emergentagent.com/site/cantina',
    features: ['Reservaties', 'Meertalig', 'Menu']
  },
  {
    name: 'La Bottega Italiana',
    type: { nl: 'Italiaans Restaurant', fr: 'Restaurant Italien', en: 'Italian Restaurant' },
    location: 'Herent',
    url: 'https://labottegaherent.com',
    previewUrl: 'https://fworks-admin.preview.emergentagent.com/site/bottega',
    features: ['Reservaties', 'Afhalen', 'Groepsmenu\'s']
  },
  {
    name: "L'Ascoli",
    type: { nl: 'Italiaans Restaurant', fr: 'Restaurant Italien', en: 'Italian Restaurant' },
    location: 'Zaventem',
    url: 'https://ascolizaventem.com',
    previewUrl: 'https://fworks-admin.preview.emergentagent.com/site/ascoli',
    features: ['Reservaties', 'Galerij', 'Evenementen']
  },
  {
    name: 'Ristorante Mercato',
    type: { nl: 'Pizzeria & Restaurant', fr: 'Pizzeria & Restaurant', en: 'Pizzeria & Restaurant' },
    location: 'Zaventem',
    url: 'https://ristorantemercato.be',
    previewUrl: 'https://fworks-admin.preview.emergentagent.com/site/mercato',
    features: ['Reservaties', 'Afhalen', 'Menu']
  },
  {
    name: 'Theo Beans Export',
    type: { nl: 'Cacao Export', fr: 'Export de Cacao', en: 'Cacao Export' },
    location: 'Ecuador',
    url: 'https://theobeans-export.com',
    previewUrl: 'https://fworks-admin.preview.emergentagent.com/site/theobeans',
    features: ['Meertalig', 'Galerij', 'Contact']
  },
  {
    name: 'Tracemaster',
    type: { nl: 'GPS Tracking', fr: 'Suivi GPS', en: 'GPS Tracking' },
    location: 'Ecuador',
    url: 'https://tracemaster-rastreadores.com',
    previewUrl: 'https://fworks-admin.preview.emergentagent.com/site/tracemaster',
    features: ['E-commerce', 'WhatsApp', 'Producten']
  }
];

// Language Selector - More visible
const LanguageSelector = ({ lang, setLang }) => {
  const [open, setOpen] = useState(false);
  const langs = [
    { code: 'nl', flag: '🇳🇱', name: 'Nederlands' },
    { code: 'fr', flag: '🇫🇷', name: 'Français' },
    { code: 'en', flag: '🇬🇧', name: 'English' }
  ];
  const current = langs.find(l => l.code === lang);

  return (
    <div className="relative">
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors border border-white/30"
      >
        <span className="text-lg">{current?.flag}</span>
        <span className="text-sm font-semibold text-white">{current?.name}</span>
        <ChevronRight className={`w-4 h-4 text-white transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl overflow-hidden shadow-2xl z-50 min-w-[160px]">
          {langs.map(l => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full px-4 py-3 text-left flex items-center space-x-3 hover:bg-gray-100 transition-colors ${lang === l.code ? 'bg-amber-50 text-amber-700' : 'text-gray-700'}`}
            >
              <span className="text-lg">{l.flag}</span>
              <span className="text-sm font-medium">{l.name}</span>
              {lang === l.code && <Check className="w-4 h-4 ml-auto text-amber-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Navigation
const Navigation = ({ t, lang, setLang }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="flex items-center space-x-3">
            <img src="/images/fworks-logo.png" alt="F.Works" className="h-12 w-auto" />
            <span className="text-xl font-bold text-white hidden sm:block">F.Works Builders</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button onClick={() => scrollToSection('features')} className="text-white/90 hover:text-white transition-colors font-medium">{t.nav.features}</button>
            <button onClick={() => scrollToSection('portfolio')} className="text-white/90 hover:text-white transition-colors font-medium">{t.nav.portfolio}</button>
            <button onClick={() => scrollToSection('pricing')} className="text-white/90 hover:text-white transition-colors font-medium">{t.nav.pricing}</button>
            <button onClick={() => scrollToSection('contact')} className="text-white/90 hover:text-white transition-colors font-medium">{t.nav.contact}</button>
            <LanguageSelector lang={lang} setLang={setLang} />
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-semibold rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg"
            >
              {t.hero.cta}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            <LanguageSelector lang={lang} setLang={setLang} />
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white p-2">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-gray-900/95 backdrop-blur-md border-t border-white/10 pb-6">
            <div className="flex flex-col space-y-4 pt-4">
              <button onClick={() => scrollToSection('features')} className="text-white/90 hover:text-white py-2 font-medium">{t.nav.features}</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-white/90 hover:text-white py-2 font-medium">{t.nav.portfolio}</button>
              <button onClick={() => scrollToSection('pricing')} className="text-white/90 hover:text-white py-2 font-medium">{t.nav.pricing}</button>
              <button onClick={() => scrollToSection('contact')} className="text-white/90 hover:text-white py-2 font-medium">{t.nav.contact}</button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-5 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-semibold rounded-lg"
              >
                {t.hero.cta}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section with background image
const HeroSection = ({ t }) => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-800/95"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
          <Star className="w-4 h-4 text-amber-400" />
          <span className="text-sm text-white/90">Vertrouwd door 10+ bedrijven</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
          {t.hero.title}
        </h1>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent mb-8">
          {t.hero.subtitle}
        </h2>
        <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
          {t.hero.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={scrollToContact}
            className="group px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-semibold rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center space-x-2"
          >
            <span>{t.hero.cta}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={scrollToFeatures}
            className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/30 backdrop-blur-sm"
          >
            {t.hero.ctaSecondary}
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-8 h-8 text-white/50 rotate-90" />
        </div>
      </div>
    </section>
  );
};

// Interactive Features Section
const FeaturesSection = ({ t }) => {
  const [activeFeature, setActiveFeature] = useState('dashboard');
  
  const featuresList = [
    { id: 'dashboard', icon: Settings, color: 'amber' },
    { id: 'announcement', icon: Megaphone, color: 'red' },
    { id: 'reservation', icon: Calendar, color: 'blue' },
    { id: 'menu', icon: FileText, color: 'green' },
    { id: 'payment', icon: CreditCard, color: 'purple' },
    { id: 'multilingual', icon: Languages, color: 'cyan' }
  ];

  const getColorClasses = (color, isActive) => {
    const colors = {
      amber: isActive ? 'bg-amber-500 text-white' : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20',
      red: isActive ? 'bg-red-500 text-white' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20',
      blue: isActive ? 'bg-blue-500 text-white' : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20',
      green: isActive ? 'bg-green-500 text-white' : 'bg-green-500/10 text-green-400 hover:bg-green-500/20',
      purple: isActive ? 'bg-purple-500 text-white' : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20',
      cyan: isActive ? 'bg-cyan-500 text-white' : 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20'
    };
    return colors[color];
  };

  return (
    <section id="features" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">{t.features.title}</h2>
          <p className="text-xl text-gray-400">{t.features.subtitle}</p>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {featuresList.map((feature) => {
            const Icon = feature.icon;
            const isActive = activeFeature === feature.id;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl transition-all ${getColorClasses(feature.color, isActive)}`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{t.features[feature.id].title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Feature Details */}
        <div className="bg-gray-800/50 rounded-3xl p-8 md:p-12 border border-gray-700/50">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                {t.features[activeFeature].title}
              </h3>
              <p className="text-xl text-gray-400 mb-8">
                {t.features[activeFeature].desc}
              </p>
              <div className="space-y-4">
                {t.features[activeFeature].features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-amber-400" />
                    </div>
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Demo */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-500 ml-2">{t.demo.dashboardTitle}</span>
                </div>
                
                {activeFeature === 'dashboard' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <span className="text-white text-sm">{t.demo.announcement}</span>
                      <Bell className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <span className="text-white text-sm">{t.demo.gallery}</span>
                      <Image className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <span className="text-white text-sm">{t.demo.menu}</span>
                      <FileText className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <span className="text-white text-sm">{t.demo.hours}</span>
                      <Clock className="w-4 h-4 text-purple-400" />
                    </div>
                  </div>
                )}

                {activeFeature === 'announcement' && (
                  <div className="space-y-3">
                    <div className="p-4 bg-amber-500/20 border border-amber-500/50 rounded-lg">
                      <p className="text-amber-200 text-sm">{t.demo.announcementText}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded text-xs">Activeren</button>
                      <button className="px-3 py-1.5 bg-gray-700 text-gray-400 rounded text-xs">Bewerken</button>
                    </div>
                  </div>
                )}

                {activeFeature === 'reservation' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-700/50 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="text-white text-sm">Jan Janssen</p>
                        <p className="text-gray-400 text-xs">4 personen • 19:00</p>
                      </div>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">Nieuw</span>
                    </div>
                    <div className="p-3 bg-gray-700/50 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="text-white text-sm">Marie Dubois</p>
                        <p className="text-gray-400 text-xs">2 personen • 20:30</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Bevestigd</span>
                    </div>
                  </div>
                )}

                {activeFeature === 'menu' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white text-sm">Margherita</span>
                        <span className="text-amber-400 text-sm">€12.50</span>
                      </div>
                      <p className="text-gray-400 text-xs mt-1">Tomaat, mozzarella, basilicum</p>
                    </div>
                    <div className="p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white text-sm">Quattro Formaggi</span>
                        <span className="text-amber-400 text-sm">€14.50</span>
                      </div>
                      <p className="text-gray-400 text-xs mt-1">Vier kazen</p>
                    </div>
                  </div>
                )}

                {activeFeature === 'payment' && (
                  <div className="space-y-3">
                    <div className="flex space-x-3">
                      <div className="p-3 bg-gray-700/50 rounded-lg flex-1 text-center">
                        <CreditCard className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                        <span className="text-xs text-gray-400">Kaart</span>
                      </div>
                      <div className="p-3 bg-gray-700/50 rounded-lg flex-1 text-center">
                        <div className="w-6 h-6 bg-[#0070ba] rounded mx-auto mb-1 flex items-center justify-center text-white text-xs font-bold">P</div>
                        <span className="text-xs text-gray-400">PayPal</span>
                      </div>
                      <div className="p-3 bg-gray-700/50 rounded-lg flex-1 text-center">
                        <div className="w-6 h-6 bg-[#5433FF] rounded mx-auto mb-1"></div>
                        <span className="text-xs text-gray-400">Stripe</span>
                      </div>
                    </div>
                    <div className="p-3 bg-green-500/20 rounded-lg text-center">
                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                      <span className="text-green-400 text-sm">Betaling succesvol</span>
                    </div>
                  </div>
                )}

                {activeFeature === 'multilingual' && (
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <button className="px-3 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium">🇳🇱 NL</button>
                      <button className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm">🇫🇷 FR</button>
                      <button className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm">🇬🇧 EN</button>
                    </div>
                    <div className="p-3 bg-gray-700/50 rounded-lg">
                      <p className="text-white text-sm">Welkom bij ons restaurant!</p>
                      <p className="text-gray-500 text-xs mt-1">→ Bienvenue dans notre restaurant!</p>
                      <p className="text-gray-500 text-xs">→ Welcome to our restaurant!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Portfolio Section with live previews
const PortfolioSection = ({ t, lang }) => {
  const [selectedSite, setSelectedSite] = useState(null);

  return (
    <section id="portfolio" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">{t.portfolio.title}</h2>
          <p className="text-xl text-gray-400">{t.portfolio.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div 
              key={index}
              className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-amber-500/50 transition-all"
            >
              {/* Live Preview in iframe */}
              <div className="relative h-48 overflow-hidden bg-gray-800">
                <iframe
                  src={item.previewUrl}
                  className="w-[200%] h-[200%] transform scale-50 origin-top-left pointer-events-none"
                  title={item.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                    ● Live
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-1">{item.name}</h3>
                <p className="text-amber-400 text-sm mb-3">{item.type[lang]} • {item.location}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.features.map((feature, idx) => (
                    <span key={idx} className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors font-medium"
                >
                  <span>{t.portfolio.viewSite}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const PricingSection = ({ t }) => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-24 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">{t.pricing.title}</h2>
          <p className="text-xl text-gray-400">{t.pricing.subtitle}</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-800/50 rounded-3xl border border-gray-700 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="flex items-baseline justify-center space-x-2">
                <span className="text-2xl text-gray-400">€</span>
                <span className="text-7xl font-bold text-white">{t.pricing.price}</span>
                <span className="text-xl text-gray-400">/{t.pricing.period}</span>
              </div>
            </div>

            <div className="mb-10">
              <p className="text-amber-400 font-semibold mb-4">{t.pricing.includes}</p>
              <div className="grid md:grid-cols-2 gap-4">
                {t.pricing.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-amber-400" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={scrollToContact}
                className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-semibold rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg shadow-amber-500/25"
              >
                {t.pricing.cta}
              </button>
              <p className="text-sm text-gray-500 mt-4">{t.pricing.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = ({ t }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', business: '', message: ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    const text = `Hallo! Ik ben ${formData.name} (${formData.business}). ${formData.message}`;
    window.open(`https://wa.me/32494516064?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">{t.contact.title}</h2>
          <p className="text-xl text-gray-400">{t.contact.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Bedankt!</h3>
                <p className="text-gray-400">We nemen zo snel mogelijk contact met u op.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.form.name}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.form.email}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.form.phone}</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.form.business}</label>
                    <input
                      type="text"
                      value={formData.business}
                      onChange={(e) => setFormData({...formData, business: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Restaurant, Winkel, ..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.form.message}</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-semibold rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all disabled:opacity-50"
                >
                  {sending ? '...' : t.contact.form.submit}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">{t.contact.info.title}</h3>
              <div className="space-y-4">
                <a href="mailto:info@fworksbuilders.com" className="flex items-center space-x-4 text-gray-300 hover:text-amber-400 transition-colors">
                  <Mail className="w-5 h-5" />
                  <span>{t.contact.info.email}</span>
                </a>
                <a href="tel:+32494516064" className="flex items-center space-x-4 text-gray-300 hover:text-amber-400 transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>{t.contact.info.phone}</span>
                </a>
                <div className="flex items-center space-x-4 text-gray-300">
                  <Clock className="w-5 h-5" />
                  <span>{t.contact.info.hours}</span>
                </div>
              </div>
            </div>

            <a 
              href="https://wa.me/32494516064"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-600 hover:bg-green-700 transition-colors rounded-2xl p-8 text-center"
            >
              <MessageCircle className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{t.contact.whatsapp}</h3>
              <p className="text-green-200">+32 494 51 60 64</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = ({ t }) => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <img src="/images/fworks-logo.png" alt="F.Works" className="h-10 w-auto" />
            <div>
              <span className="text-xl font-bold text-white">F.Works Builders</span>
              <p className="text-sm text-gray-500">{t.footer.tagline}</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} F.Works Builders. {t.footer.rights}.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App
function FWorksApp() {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('fworks_lang');
    if (saved) return saved;
    const browserLang = navigator.language.split('-')[0];
    return ['nl', 'fr', 'en'].includes(browserLang) ? browserLang : 'nl';
  });

  useEffect(() => {
    localStorage.setItem('fworks_lang', lang);
  }, [lang]);

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-gray-900">
      <SEO 
        title="F.Works Builders | Professionele Websites op Maat"
        description="Moderne, snelle en mobielvriendelijke websites met eigen beheerdashboard. Volledig op maat gemaakt voor uw bedrijf. Vanaf €199/jaar."
        keywords="website maken, webdesign, website laten maken, professionele website, België, Nederland, horeca website, restaurant website"
      />
      <Navigation t={t} lang={lang} setLang={setLang} />
      <HeroSection t={t} />
      <FeaturesSection t={t} />
      <PortfolioSection t={t} lang={lang} />
      <PricingSection t={t} />
      <ContactSection t={t} />
      <Footer t={t} />
    </div>
  );
}

export default FWorksApp;
