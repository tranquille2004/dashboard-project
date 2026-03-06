import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Globe, Smartphone, Shield, Zap, MessageCircle, Mail, Phone, 
  ChevronRight, Check, Star, Menu, X, ArrowRight, Settings,
  CreditCard, Calendar, Languages, BarChart3, Clock
} from 'lucide-react';
import SEO from '@/components/SEO';
import './FWorks.css';

// Translations
const translations = {
  nl: {
    nav: { home: 'Home', services: 'Diensten', portfolio: 'Portfolio', pricing: 'Prijzen', contact: 'Contact' },
    hero: {
      title: 'Professionele Websites',
      subtitle: 'Die Klanten Aantrekken',
      description: 'Moderne, snelle en mobielvriendelijke websites met eigen beheerdashboard. Volledig op maat gemaakt voor uw bedrijf.',
      cta: 'Gratis Offerte Aanvragen',
      ctaSecondary: 'Bekijk Portfolio'
    },
    services: {
      title: 'Wat Wij Bieden',
      subtitle: 'Alles wat u nodig heeft voor online succes',
      items: [
        { icon: 'globe', title: 'Maatwerk Website', desc: 'Uniek ontwerp dat past bij uw merk en doelgroep' },
        { icon: 'smartphone', title: 'Mobiel Geoptimaliseerd', desc: 'Perfect op elk apparaat, van desktop tot smartphone' },
        { icon: 'settings', title: 'Eigen Dashboard', desc: 'Beheer uw website zelf met een eenvoudig dashboard' },
        { icon: 'shield', title: 'Veilig & Betrouwbaar', desc: 'SSL-certificaat en dagelijkse backups inbegrepen' },
        { icon: 'zap', title: 'Supersnel', desc: 'Geoptimaliseerd voor snelle laadtijden en SEO' },
        { icon: 'languages', title: 'Meertalig', desc: 'Bereik meer klanten met meerdere talen' }
      ]
    },
    features: {
      title: 'Krachtige Functies',
      subtitle: 'Ingebouwd in elke website',
      items: [
        { icon: 'calendar', title: 'Reservatiesysteem', desc: 'Laat klanten online reserveren of afspraken maken' },
        { icon: 'creditcard', title: 'Betalingen', desc: 'Accepteer online betalingen via Stripe of PayPal' },
        { icon: 'messagecircle', title: 'Mededelingen', desc: 'Plaats belangrijke aankondigingen op uw website' },
        { icon: 'barchart', title: 'Analytics', desc: 'Volg bezoekers en prestaties van uw website' }
      ]
    },
    portfolio: {
      title: 'Ons Portfolio',
      subtitle: 'Enkele van onze recente projecten',
      viewSite: 'Bekijk Website'
    },
    pricing: {
      title: 'Transparante Prijzen',
      subtitle: 'Geen verrassingen, alles inbegrepen',
      price: '199',
      period: 'per jaar',
      includes: 'Inclusief:',
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
    nav: { home: 'Accueil', services: 'Services', portfolio: 'Portfolio', pricing: 'Tarifs', contact: 'Contact' },
    hero: {
      title: 'Sites Web Professionnels',
      subtitle: 'Qui Attirent Les Clients',
      description: 'Sites web modernes, rapides et adaptés aux mobiles avec tableau de bord personnel. Entièrement personnalisé pour votre entreprise.',
      cta: 'Demander Un Devis Gratuit',
      ctaSecondary: 'Voir Portfolio'
    },
    services: {
      title: 'Nos Services',
      subtitle: 'Tout ce dont vous avez besoin pour réussir en ligne',
      items: [
        { icon: 'globe', title: 'Site Sur Mesure', desc: 'Design unique adapté à votre marque et public cible' },
        { icon: 'smartphone', title: 'Optimisé Mobile', desc: 'Parfait sur tous les appareils, du desktop au smartphone' },
        { icon: 'settings', title: 'Tableau de Bord', desc: 'Gérez votre site vous-même avec un dashboard simple' },
        { icon: 'shield', title: 'Sécurisé & Fiable', desc: 'Certificat SSL et sauvegardes quotidiennes inclus' },
        { icon: 'zap', title: 'Ultra Rapide', desc: 'Optimisé pour des temps de chargement rapides et SEO' },
        { icon: 'languages', title: 'Multilingue', desc: 'Atteignez plus de clients avec plusieurs langues' }
      ]
    },
    features: {
      title: 'Fonctionnalités Puissantes',
      subtitle: 'Intégrées dans chaque site',
      items: [
        { icon: 'calendar', title: 'Système de Réservation', desc: 'Permettez aux clients de réserver en ligne' },
        { icon: 'creditcard', title: 'Paiements', desc: 'Acceptez les paiements en ligne via Stripe ou PayPal' },
        { icon: 'messagecircle', title: 'Annonces', desc: 'Publiez des annonces importantes sur votre site' },
        { icon: 'barchart', title: 'Analytiques', desc: 'Suivez les visiteurs et performances de votre site' }
      ]
    },
    portfolio: {
      title: 'Notre Portfolio',
      subtitle: 'Quelques-uns de nos projets récents',
      viewSite: 'Voir Le Site'
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
    nav: { home: 'Home', services: 'Services', portfolio: 'Portfolio', pricing: 'Pricing', contact: 'Contact' },
    hero: {
      title: 'Professional Websites',
      subtitle: 'That Attract Customers',
      description: 'Modern, fast, and mobile-friendly websites with your own management dashboard. Fully customized for your business.',
      cta: 'Get A Free Quote',
      ctaSecondary: 'View Portfolio'
    },
    services: {
      title: 'What We Offer',
      subtitle: 'Everything you need for online success',
      items: [
        { icon: 'globe', title: 'Custom Website', desc: 'Unique design that fits your brand and target audience' },
        { icon: 'smartphone', title: 'Mobile Optimized', desc: 'Perfect on every device, from desktop to smartphone' },
        { icon: 'settings', title: 'Own Dashboard', desc: 'Manage your website yourself with a simple dashboard' },
        { icon: 'shield', title: 'Secure & Reliable', desc: 'SSL certificate and daily backups included' },
        { icon: 'zap', title: 'Super Fast', desc: 'Optimized for fast loading times and SEO' },
        { icon: 'languages', title: 'Multilingual', desc: 'Reach more customers with multiple languages' }
      ]
    },
    features: {
      title: 'Powerful Features',
      subtitle: 'Built into every website',
      items: [
        { icon: 'calendar', title: 'Reservation System', desc: 'Let customers book online or make appointments' },
        { icon: 'creditcard', title: 'Payments', desc: 'Accept online payments via Stripe or PayPal' },
        { icon: 'messagecircle', title: 'Announcements', desc: 'Post important announcements on your website' },
        { icon: 'barchart', title: 'Analytics', desc: 'Track visitors and performance of your website' }
      ]
    },
    portfolio: {
      title: 'Our Portfolio',
      subtitle: 'Some of our recent projects',
      viewSite: 'View Website'
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

// Portfolio data with actual screenshots from our sites
const portfolioItems = [
  {
    name: 'La Cantina Italiana',
    type: { nl: 'Italiaans Restaurant', fr: 'Restaurant Italien', en: 'Italian Restaurant' },
    location: 'Tervuren',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    url: 'https://lacantinaitaliana.net',
    features: ['reservation', 'multilingual', 'menu']
  },
  {
    name: 'La Bottega Italiana',
    type: { nl: 'Italiaans Restaurant', fr: 'Restaurant Italien', en: 'Italian Restaurant' },
    location: 'Herent',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop',
    url: 'https://labottegaherent.com',
    features: ['reservation', 'takeaway', 'multilingual']
  },
  {
    name: "L'Ascoli",
    type: { nl: 'Italiaans Restaurant', fr: 'Restaurant Italien', en: 'Italian Restaurant' },
    location: 'Zaventem',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
    url: 'https://ascolizaventem.com',
    features: ['reservation', 'groupmenus', 'gallery']
  },
  {
    name: 'Ristorante Mercato',
    type: { nl: 'Pizzeria & Restaurant', fr: 'Pizzeria & Restaurant', en: 'Pizzeria & Restaurant' },
    location: 'Zaventem',
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=600&h=400&fit=crop',
    url: 'https://ristorantemercato.be',
    features: ['reservation', 'takeaway', 'menu']
  },
  {
    name: 'Theo Beans Export',
    type: { nl: 'Cacao Export', fr: 'Export de Cacao', en: 'Cacao Export' },
    location: 'Ecuador',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&h=400&fit=crop',
    url: 'https://theobeans-export.com',
    features: ['multilingual', 'gallery', 'contact']
  },
  {
    name: 'Tracemaster',
    type: { nl: 'GPS Tracking', fr: 'Suivi GPS', en: 'GPS Tracking' },
    location: 'Ecuador',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    url: 'https://tracemaster-rastreadores.com',
    features: ['ecommerce', 'multilingual', 'whatsapp']
  }
];

// Icon component
const IconComponent = ({ name, className }) => {
  const icons = {
    globe: Globe,
    smartphone: Smartphone,
    shield: Shield,
    zap: Zap,
    settings: Settings,
    languages: Languages,
    calendar: Calendar,
    creditcard: CreditCard,
    messagecircle: MessageCircle,
    barchart: BarChart3
  };
  const Icon = icons[name] || Globe;
  return <Icon className={className} />;
};

// Language Selector
const LanguageSelector = ({ lang, setLang }) => {
  const [open, setOpen] = useState(false);
  const langs = [
    { code: 'nl', flag: '🇳🇱', name: 'NL' },
    { code: 'fr', flag: '🇫🇷', name: 'FR' },
    { code: 'en', flag: '🇬🇧', name: 'EN' }
  ];
  const current = langs.find(l => l.code === lang);

  return (
    <div className="relative">
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
      >
        <span>{current?.flag}</span>
        <span className="text-sm font-medium">{current?.name}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden shadow-xl z-50">
          {langs.map(l => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-800 transition-colors ${lang === l.code ? 'bg-gray-800' : ''}`}
            >
              <span>{l.flag}</span>
              <span className="text-sm">{l.name}</span>
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
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-gray-900 font-bold text-xl">F</span>
            </div>
            <span className="text-xl font-bold text-white">F.Works</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-white transition-colors">{t.nav.services}</button>
            <button onClick={() => scrollToSection('portfolio')} className="text-gray-300 hover:text-white transition-colors">{t.nav.portfolio}</button>
            <button onClick={() => scrollToSection('pricing')} className="text-gray-300 hover:text-white transition-colors">{t.nav.pricing}</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors">{t.nav.contact}</button>
            <LanguageSelector lang={lang} setLang={setLang} />
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-semibold rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg"
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
          <div className="lg:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800 pb-6">
            <div className="flex flex-col space-y-4 pt-4">
              <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-white py-2">{t.nav.services}</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-gray-300 hover:text-white py-2">{t.nav.portfolio}</button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-300 hover:text-white py-2">{t.nav.pricing}</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white py-2">{t.nav.contact}</button>
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

// Hero Section
const HeroSection = ({ t }) => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
          <Star className="w-4 h-4 text-amber-400" />
          <span className="text-sm text-gray-300">Trusted by 10+ businesses</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
          {t.hero.title}
        </h1>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent mb-8">
          {t.hero.subtitle}
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
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
            onClick={scrollToPortfolio}
            className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
          >
            {t.hero.ctaSecondary}
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-8 h-8 text-gray-500 rotate-90" />
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = ({ t }) => {
  return (
    <section id="services" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">{t.services.title}</h2>
          <p className="text-xl text-gray-400">{t.services.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.items.map((item, index) => (
            <div 
              key={index}
              className="group p-8 bg-gray-800/50 rounded-2xl border border-gray-700/50 hover:border-amber-500/50 transition-all hover:bg-gray-800"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <IconComponent name={item.icon} className="w-7 h-7 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = ({ t }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">{t.features.title}</h2>
          <p className="text-xl text-gray-400">{t.features.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.features.items.map((item, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/30"
            >
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconComponent name={item.icon} className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Portfolio Section
const PortfolioSection = ({ t, lang }) => {
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
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-1">{item.name}</h3>
                <p className="text-amber-400 text-sm mb-3">{item.type[lang]} • {item.location}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors"
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
    // Simulate sending
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    // Open WhatsApp with message
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
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-gray-900 font-bold text-xl">F</span>
            </div>
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
      <ServicesSection t={t} />
      <FeaturesSection t={t} />
      <PortfolioSection t={t} lang={lang} />
      <PricingSection t={t} />
      <ContactSection t={t} />
      <Footer t={t} />
    </div>
  );
}

export default FWorksApp;
