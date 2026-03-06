import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, Smartphone, Shield, Zap, MessageCircle, Mail, Phone, 
  ChevronRight, Check, Star, Menu, X, ArrowRight, Settings,
  CreditCard, Calendar, Languages, BarChart3, Clock, Bell,
  Image, FileText, Users, ShoppingCart, MapPin, ChevronLeft,
  Monitor, Palette, Lock, Megaphone, ExternalLink, Rocket
} from 'lucide-react';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import SEO from '@/components/SEO';
import './FWorks.css';

// Translations - NL, FR, EN, ES, IT
const translations = {
  nl: {
    nav: { home: 'Home', features: 'Mogelijkheden', portfolio: 'Portfolio', pricing: 'Prijzen', contact: 'Contact' },
    hero: {
      badge: 'Vertrouwd door 10+ bedrijven',
      fastBadge: '⚡ Standaard website klaar in 24 uur!',
      title: 'Professionele Websites',
      subtitle: 'Snel & Betaalbaar',
      description: 'Moderne, snelle en mobielvriendelijke websites met eigen beheerdashboard. Volledig op maat gemaakt voor uw bedrijf.',
      cta: 'Gratis Offerte Aanvragen',
      ctaSecondary: 'Bekijk Mogelijkheden'
    },
    speed: {
      title: '24 Uur Levering',
      desc: 'Standaard websites binnen 24 uur online'
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
    portfolio: {
      title: 'Onze Websites',
      subtitle: 'Bekijk enkele van onze recente projecten',
      viewSite: 'Bekijk Website',
      liveDemo: 'Live'
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
      note: 'Eenmalige opzet: vanaf €50 (afhankelijk van het werk)',
      speed: 'Standaard website klaar in 24 uur!'
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
      whatsappOnly: 'Alleen WhatsApp',
      whatsapp: 'Stuur een WhatsApp',
      info: {
        title: 'Direct Contact',
        email: 'fworks@mail.be',
        phone: '+32 494 51 60 64'
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
      badge: 'Fait confiance par 10+ entreprises',
      fastBadge: '⚡ Site standard prêt en 24 heures!',
      title: 'Sites Web Professionnels',
      subtitle: 'Rapide & Abordable',
      description: 'Sites web modernes, rapides et adaptés aux mobiles avec tableau de bord personnel. Entièrement personnalisé pour votre entreprise.',
      cta: 'Demander Un Devis Gratuit',
      ctaSecondary: 'Voir Les Fonctionnalités'
    },
    speed: {
      title: 'Livraison 24h',
      desc: 'Sites standards en ligne en 24 heures'
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
        desc: 'Publiez des messages importants directement sur votre site.',
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
    portfolio: {
      title: 'Nos Sites Web',
      subtitle: 'Découvrez quelques-uns de nos projets récents',
      viewSite: 'Voir Le Site',
      liveDemo: 'Live'
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
      note: 'Frais de création: à partir de €50 (selon le travail)',
      speed: 'Site standard prêt en 24 heures!'
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
      whatsappOnly: 'WhatsApp uniquement',
      whatsapp: 'Envoyez un WhatsApp',
      info: {
        title: 'Contact Direct',
        email: 'fworks@mail.be',
        phone: '+32 494 51 60 64'
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
      badge: 'Trusted by 10+ businesses',
      fastBadge: '⚡ Standard website ready in 24 hours!',
      title: 'Professional Websites',
      subtitle: 'Fast & Affordable',
      description: 'Modern, fast, and mobile-friendly websites with your own management dashboard. Fully customized for your business.',
      cta: 'Get A Free Quote',
      ctaSecondary: 'View Features'
    },
    speed: {
      title: '24 Hour Delivery',
      desc: 'Standard websites online within 24 hours'
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
        desc: 'Post important messages directly on your website.',
        features: ['Instantly visible', 'Multiple styles', 'Temporary or permanent']
      },
      reservation: {
        title: 'Reservations & Contact Forms',
        desc: 'Let customers book online or contact you.',
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
    portfolio: {
      title: 'Our Websites',
      subtitle: 'Check out some of our recent projects',
      viewSite: 'View Website',
      liveDemo: 'Live'
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
      note: 'One-time setup: from €50 (depending on work)',
      speed: 'Standard website ready in 24 hours!'
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
      whatsappOnly: 'WhatsApp only',
      whatsapp: 'Send a WhatsApp',
      info: {
        title: 'Direct Contact',
        email: 'fworks@mail.be',
        phone: '+32 494 51 60 64'
      }
    },
    footer: {
      tagline: 'Professional websites that deliver results',
      rights: 'All rights reserved'
    }
  },
  es: {
    nav: { home: 'Inicio', features: 'Funciones', portfolio: 'Portfolio', pricing: 'Precios', contact: 'Contacto' },
    hero: {
      badge: 'Confiado por más de 10 empresas',
      fastBadge: '⚡ ¡Sitio web estándar listo en 24 horas!',
      title: 'Sitios Web Profesionales',
      subtitle: 'Rápido y Asequible',
      description: 'Sitios web modernos, rápidos y adaptados a móviles con su propio panel de control. Totalmente personalizado para su negocio.',
      cta: 'Solicitar Presupuesto Gratis',
      ctaSecondary: 'Ver Funciones'
    },
    speed: {
      title: 'Entrega en 24h',
      desc: 'Sitios estándar en línea en 24 horas'
    },
    features: {
      title: '¿Qué Puede Hacer Su Sitio Web?',
      subtitle: 'Descubra las potentes funciones que ofrecemos',
      dashboard: {
        title: 'Panel de Control Personal',
        desc: '¡Gestione su sitio web usted mismo! Cambie textos, fotos y configuraciones cuando quiera.',
        features: ['Cambios ilimitados', 'Sin conocimientos técnicos', 'Acceso 24/7']
      },
      announcement: {
        title: 'Anuncios y Avisos',
        desc: 'Publique mensajes importantes directamente en su sitio web.',
        features: ['Visible al instante', 'Múltiples estilos', 'Temporal o permanente']
      },
      reservation: {
        title: 'Reservas y Formularios',
        desc: 'Permita que los clientes reserven en línea o se pongan en contacto.',
        features: ['Reservas en línea', 'Formularios de contacto', 'Notificaciones por email']
      },
      menu: {
        title: 'Menús y Productos',
        desc: 'Muestre su menú o productos con precios, descripciones y fotos.',
        features: ['Categorías', 'Gestión de precios', 'Galerías de fotos']
      },
      payment: {
        title: 'Pagos En Línea',
        desc: 'Acepte pagos mediante Stripe, PayPal u otros métodos.',
        features: ['Pago seguro', 'Múltiples opciones', 'Facturas automáticas']
      },
      multilingual: {
        title: 'Sitio Web Multilingüe',
        desc: 'Llegue a más clientes con un sitio web en varios idiomas.',
        features: ['Holandés', 'Francés', 'Inglés', 'Otros idiomas']
      }
    },
    portfolio: {
      title: 'Nuestros Sitios Web',
      subtitle: 'Vea algunos de nuestros proyectos recientes',
      viewSite: 'Ver Sitio Web',
      liveDemo: 'En Vivo'
    },
    pricing: {
      title: 'Precios Transparentes',
      subtitle: 'Sin sorpresas, todo incluido',
      price: '199',
      period: 'por año',
      includes: 'Incluye:',
      features: [
        'Sitio web profesional personalizado',
        'Panel de control personal',
        'Cambios ilimitados vía dashboard',
        'Diseño adaptado a móviles',
        'Certificado SSL (conexión segura)',
        'Alojamiento y mantenimiento',
        'Soporte por email',
        'Soporte multilingüe'
      ],
      cta: 'Empezar Hoy',
      note: 'Configuración única: desde €50 (según el trabajo)',
      speed: '¡Sitio web estándar listo en 24 horas!'
    },
    contact: {
      title: 'Contáctenos',
      subtitle: 'Hablemos de su proyecto',
      form: {
        name: 'Su Nombre',
        email: 'Correo Electrónico',
        phone: 'Número de Teléfono',
        message: 'Su Mensaje',
        business: 'Tipo de Negocio',
        submit: 'Enviar Mensaje'
      },
      whatsappOnly: 'Solo WhatsApp',
      whatsapp: 'Enviar WhatsApp',
      info: {
        title: 'Contacto Directo',
        email: 'fworks@mail.be',
        phone: '+32 494 51 60 64'
      }
    },
    footer: {
      tagline: 'Sitios web profesionales que generan resultados',
      rights: 'Todos los derechos reservados'
    }
  },
  it: {
    nav: { home: 'Home', features: 'Funzionalità', portfolio: 'Portfolio', pricing: 'Prezzi', contact: 'Contatto' },
    hero: {
      badge: 'Scelto da oltre 10 aziende',
      fastBadge: '⚡ Sito web standard pronto in 24 ore!',
      title: 'Siti Web Professionali',
      subtitle: 'Veloce e Conveniente',
      description: 'Siti web moderni, veloci e ottimizzati per dispositivi mobili con il proprio pannello di controllo. Completamente personalizzato per la tua attività.',
      cta: 'Richiedi Preventivo Gratuito',
      ctaSecondary: 'Vedi Funzionalità'
    },
    speed: {
      title: 'Consegna in 24h',
      desc: 'Siti standard online in 24 ore'
    },
    features: {
      title: 'Cosa Può Fare Il Tuo Sito Web?',
      subtitle: 'Scopri le potenti funzionalità che offriamo',
      dashboard: {
        title: 'Pannello di Controllo Personale',
        desc: 'Gestisci il tuo sito web da solo! Modifica testi, foto e impostazioni quando vuoi.',
        features: ['Modifiche illimitate', 'Nessuna conoscenza tecnica', 'Accesso 24/7']
      },
      announcement: {
        title: 'Annunci e Avvisi',
        desc: 'Pubblica messaggi importanti direttamente sul tuo sito web.',
        features: ['Visibile istantaneamente', 'Più stili', 'Temporaneo o permanente']
      },
      reservation: {
        title: 'Prenotazioni e Moduli',
        desc: 'Permetti ai clienti di prenotare online o contattarti.',
        features: ['Prenotazioni online', 'Moduli di contatto', 'Notifiche email']
      },
      menu: {
        title: 'Menu e Prodotti',
        desc: 'Mostra il tuo menu o prodotti con prezzi, descrizioni e foto.',
        features: ['Categorie', 'Gestione prezzi', 'Gallerie fotografiche']
      },
      payment: {
        title: 'Pagamenti Online',
        desc: 'Accetta pagamenti tramite Stripe, PayPal o altri metodi.',
        features: ['Pagamento sicuro', 'Più opzioni', 'Fatture automatiche']
      },
      multilingual: {
        title: 'Sito Web Multilingue',
        desc: 'Raggiungi più clienti con un sito web in più lingue.',
        features: ['Olandese', 'Francese', 'Inglese', 'Altre lingue']
      }
    },
    portfolio: {
      title: 'I Nostri Siti Web',
      subtitle: 'Scopri alcuni dei nostri progetti recenti',
      viewSite: 'Vedi Sito Web',
      liveDemo: 'Live'
    },
    pricing: {
      title: 'Prezzi Trasparenti',
      subtitle: 'Nessuna sorpresa, tutto incluso',
      price: '199',
      period: 'all\'anno',
      includes: 'Include:',
      features: [
        'Sito web professionale personalizzato',
        'Pannello di controllo personale',
        'Modifiche illimitate via dashboard',
        'Design ottimizzato per mobile',
        'Certificato SSL (connessione sicura)',
        'Hosting e manutenzione',
        'Supporto via email',
        'Supporto multilingue'
      ],
      cta: 'Inizia Oggi',
      note: 'Setup una tantum: da €50 (a seconda del lavoro)',
      speed: 'Sito web standard pronto in 24 ore!'
    },
    contact: {
      title: 'Contattaci',
      subtitle: 'Parliamo del tuo progetto',
      form: {
        name: 'Il Tuo Nome',
        email: 'Indirizzo Email',
        phone: 'Numero di Telefono',
        message: 'Il Tuo Messaggio',
        business: 'Tipo di Attività',
        submit: 'Invia Messaggio'
      },
      whatsappOnly: 'Solo WhatsApp',
      whatsapp: 'Invia WhatsApp',
      info: {
        title: 'Contatto Diretto',
        email: 'fworks@mail.be',
        phone: '+32 494 51 60 64'
      }
    },
    footer: {
      tagline: 'Siti web professionali che generano risultati',
      rights: 'Tutti i diritti riservati'
    }
  }
};

// Portfolio data
const portfolioItems = [
  {
    name: 'La Cantina Italiana',
    type: { nl: 'Italiaans Restaurant', fr: 'Restaurant Italien', en: 'Italian Restaurant', es: 'Restaurante Italiano', it: 'Ristorante Italiano' },
    location: 'Tervuren',
    url: 'https://lacantinaitaliana.net',
    previewUrl: 'https://fworks-admin.preview.emergentagent.com/site/cantina',
    features: ['Reservaties', 'Meertalig', 'Menu']
  },
  {
    name: 'La Bottega Italiana',
    type: { nl: 'Italiaans Restaurant', fr: 'Restaurant Italien', en: 'Italian Restaurant', es: 'Restaurante Italiano', it: 'Ristorante Italiano' },
    location: 'Herent',
    url: 'https://labottegaherent.com',
    previewUrl: 'https://fworks-admin.preview.emergentagent.com/site/bottega',
    features: ['Reservaties', 'Afhalen', 'Groepsmenu\'s']
  },
  {
    name: "L'Ascoli",
    type: { nl: 'Italiaans Restaurant', fr: 'Restaurant Italien', en: 'Italian Restaurant', es: 'Restaurante Italiano', it: 'Ristorante Italiano' },
    location: 'Zaventem',
    url: 'https://ascolizaventem.com',
    previewUrl: 'https://fworks-admin.preview.emergentagent.com/site/ascoli',
    features: ['Reservaties', 'Galerij', 'Evenementen']
  },
  {
    name: 'Ristorante Mercato',
    type: { nl: 'Pizzeria & Restaurant', fr: 'Pizzeria & Restaurant', en: 'Pizzeria & Restaurant', es: 'Pizzería y Restaurante', it: 'Pizzeria e Ristorante' },
    location: 'Zaventem',
    url: 'https://ristorantemercato.be',
    previewUrl: 'https://fworks-admin.preview.emergentagent.com/site/mercato',
    features: ['Reservaties', 'Afhalen', 'Menu']
  },
  {
    name: 'Theo Beans Export',
    type: { nl: 'Cacao Export', fr: 'Export de Cacao', en: 'Cacao Export', es: 'Exportación de Cacao', it: 'Esportazione Cacao' },
    location: 'Ecuador',
    url: 'https://theobeans-export.com',
    previewUrl: 'https://fworks-admin.preview.emergentagent.com/site/theobeans',
    features: ['Meertalig', 'Galerij', 'Contact']
  },
  {
    name: 'Tracemaster',
    type: { nl: 'GPS Tracking', fr: 'Suivi GPS', en: 'GPS Tracking', es: 'Rastreo GPS', it: 'Tracciamento GPS' },
    location: 'Ecuador',
    url: 'https://tracemaster-rastreadores.com',
    previewUrl: 'https://fworks-admin.preview.emergentagent.com/site/tracemaster',
    features: ['E-commerce', 'WhatsApp', 'Producten']
  }
];

// Language Selector with 5 languages
const LanguageSelector = ({ lang, setLang }) => {
  const [open, setOpen] = useState(false);
  const langs = [
    { code: 'nl', flag: '🇳🇱', name: 'Nederlands' },
    { code: 'fr', flag: '🇫🇷', name: 'Français' },
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'es', flag: '🇪🇸', name: 'Español' },
    { code: 'it', flag: '🇮🇹', name: 'Italiano' }
  ];
  const current = langs.find(l => l.code === lang);

  return (
    <div className="relative">
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white text-gray-800 hover:bg-gray-100 transition-colors shadow-md"
      >
        <span className="text-lg">{current?.flag}</span>
        <span className="text-sm font-semibold">{current?.name}</span>
        <ChevronRight className={`w-4 h-4 transition-transform ${open ? 'rotate-90' : ''}`} />
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
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="flex items-center space-x-3">
            <img src="/images/fworks-logo.png" alt="fworksbuilders" className="h-12 w-auto" />
            <span className="text-xl font-bold text-white hidden sm:block">fworksbuilders</span>
          </a>

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

          <div className="lg:hidden flex items-center space-x-4">
            <LanguageSelector lang={lang} setLang={setLang} />
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white p-2">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-gray-900/95 backdrop-blur-md border-t border-white/10 pb-6">
            <div className="flex flex-col space-y-4 pt-4">
              <button onClick={() => scrollToSection('features')} className="text-white/90 hover:text-white py-2 font-medium">{t.nav.features}</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-white/90 hover:text-white py-2 font-medium">{t.nav.portfolio}</button>
              <button onClick={() => scrollToSection('pricing')} className="text-white/90 hover:text-white py-2 font-medium">{t.nav.pricing}</button>
              <button onClick={() => scrollToSection('contact')} className="text-white/90 hover:text-white py-2 font-medium">{t.nav.contact}</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section with 24h badge
const HeroSection = ({ t }) => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/75 via-gray-900/65 to-gray-800/75"></div>
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Fast delivery badge */}
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 px-5 py-2.5 rounded-full mb-6 shadow-lg shadow-green-500/30 animate-bounce">
          <Rocket className="w-5 h-5 text-white" />
          <span className="text-sm font-bold text-white">{t.hero.fastBadge}</span>
        </div>

        <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/30 animate-fadeIn">
          <Star className="w-4 h-4 text-amber-400" />
          <span className="text-sm text-white">{t.hero.badge}</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 animate-slideUp">
          {t.hero.title}
        </h1>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent mb-8 animate-slideUp" style={{animationDelay: '0.2s'}}>
          {t.hero.subtitle}
        </h2>
        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 animate-slideUp" style={{animationDelay: '0.4s'}}>
          {t.hero.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideUp" style={{animationDelay: '0.6s'}}>
          <button 
            onClick={scrollToContact}
            className="group px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-semibold rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center space-x-2 hover:scale-105"
          >
            <span>{t.hero.cta}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={scrollToFeatures}
            className="px-8 py-4 bg-white/15 text-white font-semibold rounded-xl hover:bg-white/25 transition-all border border-white/40 backdrop-blur-sm hover:scale-105"
          >
            {t.hero.ctaSecondary}
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-8 h-8 text-white/70 rotate-90" />
        </div>
      </div>
    </section>
  );
};

// Realistic Feature Demos - kept compact for this file
const FeatureDemoContent = ({ activeFeature, t }) => {
  const [demoState, setDemoState] = useState({ announcementActive: true, selectedLang: 'nl' });

  const demos = {
    dashboard: (
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl overflow-hidden shadow-2xl border border-gray-700">
        <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs text-gray-400 ml-3">fworksbuilders - Dashboard</span>
        </div>
        <div className="p-4 flex gap-4">
          <div className="w-44 space-y-2">
            {[{icon: Settings, label: 'Dashboard', active: true}, {icon: Bell, label: 'Mededelingen'}, {icon: Image, label: "Foto's"}, {icon: FileText, label: 'Menu'}].map((item, i) => (
              <div key={i} className={`p-3 rounded-lg flex items-center space-x-2 ${item.active ? 'bg-amber-500/20 border-l-4 border-amber-500' : 'bg-gray-800/50 hover:bg-gray-700/50'} transition cursor-pointer`}>
                <item.icon className={`w-4 h-4 ${item.active ? 'text-amber-400' : 'text-gray-400'}`} />
                <span className={`text-sm ${item.active ? 'text-white font-medium' : 'text-gray-300'}`}>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="flex-1 bg-gray-800/30 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Welkom terug!</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-green-400">247</p>
                <p className="text-xs text-green-300">Bezoekers</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-blue-400">12</p>
                <p className="text-xs text-blue-300">Reservaties</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    announcement: (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-[#7D3C32] to-[#5a2d26] rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-amber-500 px-4 py-3 flex items-center justify-between animate-pulse">
            <span className="text-sm font-medium text-gray-900">🎄 Wij zijn gesloten van 24 tot 26 december!</span>
            <X className="w-4 h-4 text-gray-900" />
          </div>
          <div className="p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">La Cantina Italiana</h3>
            <p className="text-white/70 text-sm">Authentieke Italiaanse keuken</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 flex gap-2">
          {['Waarschuwing', 'Info', 'Succes'].map((style, i) => (
            <span key={i} className={`px-2 py-1 text-xs rounded cursor-pointer ${i === 0 ? 'bg-amber-500/20 text-amber-400' : i === 1 ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>{style}</span>
          ))}
        </div>
      </div>
    ),
    reservation: (
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f23] rounded-xl overflow-hidden shadow-2xl border border-gray-700">
        <div className="bg-gradient-to-r from-[#7D3C32] to-[#9a4a3d] px-4 py-3">
          <h4 className="text-white font-semibold">Reserveer een tafel</h4>
        </div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input type="text" value="15 maart 2026" readOnly className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm" />
            <input type="text" value="19:30" readOnly className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm" />
          </div>
          <button className="w-full bg-gradient-to-r from-[#7D3C32] to-[#9a4a3d] text-white py-3 rounded-lg font-semibold">Reserveer Nu</button>
        </div>
      </div>
    ),
    menu: (
      <div className="bg-gradient-to-br from-[#faf6f1] to-[#f5efe8] rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-[#7D3C32] px-4 py-3"><h4 className="text-white font-semibold text-center">Onze Kaart</h4></div>
        <div className="p-4 space-y-3">
          {[{name: 'Pizza Margherita', desc: 'Tomaat, mozzarella', price: '€12.50'}, {name: 'Spaghetti Carbonara', desc: 'Spek, ei, parmezaan', price: '€14.00'}].map((item, i) => (
            <div key={i} className="flex justify-between p-3 bg-white rounded-lg shadow-sm">
              <div><h5 className="font-semibold text-gray-800">{item.name}</h5><p className="text-xs text-gray-500">{item.desc}</p></div>
              <span className="text-[#7D3C32] font-bold">{item.price}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    payment: (
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f23] rounded-xl overflow-hidden shadow-2xl border border-gray-700 p-4 space-y-4">
        <div className="flex justify-between border-b border-gray-700 pb-2"><span className="text-white font-semibold">Totaal</span><span className="text-amber-400 font-bold text-xl">€45.50</span></div>
        <div className="space-y-2">
          {[{name: 'Stripe', color: '#635bff'}, {name: 'PayPal', color: '#0070ba'}].map((p, i) => (
            <div key={i} className="p-3 border rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-gray-800/50" style={{borderColor: p.color + '50', background: p.color + '10'}}>
              <div className="w-10 h-6 rounded flex items-center justify-center text-white text-xs font-bold" style={{background: p.color}}>{p.name[0]}</div>
              <span className="text-white text-sm">{p.name}</span>
            </div>
          ))}
        </div>
        <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"><Lock className="w-4 h-4" /><span>Veilig Betalen</span></button>
      </div>
    ),
    multilingual: (
      <div className="bg-gradient-to-br from-[#7D3C32] to-[#5a2d26] rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-black/20 px-4 py-2 flex justify-end space-x-2">
          {[{l: 'nl', f: '🇳🇱'}, {l: 'fr', f: '🇫🇷'}, {l: 'en', f: '🇬🇧'}].map((lang, i) => (
            <button key={i} onClick={() => setDemoState({...demoState, selectedLang: lang.l})} className={`px-3 py-1 rounded text-xs font-medium ${demoState.selectedLang === lang.l ? 'bg-white text-gray-900' : 'text-white/80 hover:bg-white/20'}`}>{lang.f}</button>
          ))}
        </div>
        <div className="p-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">{demoState.selectedLang === 'nl' ? 'Welkom!' : demoState.selectedLang === 'fr' ? 'Bienvenue!' : 'Welcome!'}</h3>
          <button className="mt-4 bg-white text-[#7D3C32] px-6 py-2 rounded-lg font-semibold">{demoState.selectedLang === 'nl' ? 'Reserveer' : demoState.selectedLang === 'fr' ? 'Réservez' : 'Book Now'}</button>
        </div>
      </div>
    )
  };

  return demos[activeFeature] || null;
};

// Features Section (compact)
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
    const colors = { amber: isActive ? 'bg-amber-500 text-white' : 'bg-amber-500/10 text-amber-400', red: isActive ? 'bg-red-500 text-white' : 'bg-red-500/10 text-red-400', blue: isActive ? 'bg-blue-500 text-white' : 'bg-blue-500/10 text-blue-400', green: isActive ? 'bg-green-500 text-white' : 'bg-green-500/10 text-green-400', purple: isActive ? 'bg-purple-500 text-white' : 'bg-purple-500/10 text-purple-400', cyan: isActive ? 'bg-cyan-500 text-white' : 'bg-cyan-500/10 text-cyan-400' };
    return colors[color];
  };

  return (
    <section id="features" className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">{t.features.title}</h2>
          <p className="text-xl text-gray-400">{t.features.subtitle}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {featuresList.map((feature) => {
            const Icon = feature.icon;
            return (
              <button key={feature.id} onClick={() => setActiveFeature(feature.id)} className={`flex items-center space-x-2 px-5 py-3 rounded-xl transition-all ${getColorClasses(feature.color, activeFeature === feature.id)}`}>
                <Icon className="w-5 h-5" /><span className="font-medium">{t.features[feature.id].title}</span>
              </button>
            );
          })}
        </div>
        <div className="bg-gray-800/50 rounded-3xl p-8 md:p-12 border border-gray-700/50 backdrop-blur-sm">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">{t.features[activeFeature].title}</h3>
              <p className="text-xl text-gray-400 mb-8">{t.features[activeFeature].desc}</p>
              <div className="space-y-4">
                {t.features[activeFeature].features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center"><Check className="w-4 h-4 text-amber-400" /></div>
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <FeatureDemoContent activeFeature={activeFeature} t={t} />
          </div>
        </div>
      </div>
    </section>
  );
};

// Portfolio Section
const PortfolioSection = ({ t, lang }) => (
  <section id="portfolio" className="py-24 bg-gray-800 relative overflow-hidden">
    <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1920&q=80)', backgroundSize: 'cover'}}></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">{t.portfolio.title}</h2>
        <p className="text-xl text-gray-400">{t.portfolio.subtitle}</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item, index) => (
          <div key={index} className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-amber-500/50 transition-all hover:scale-[1.02]">
            <div className="relative h-48 overflow-hidden bg-gray-800">
              <iframe src={item.previewUrl} className="w-[200%] h-[200%] transform scale-50 origin-top-left pointer-events-none" title={item.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              <div className="absolute top-3 right-3"><span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full font-medium flex items-center space-x-1"><span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span><span>{t.portfolio.liveDemo}</span></span></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-1">{item.name}</h3>
              <p className="text-amber-400 text-sm mb-3">{item.type[lang] || item.type.en} • {item.location}</p>
              <div className="flex flex-wrap gap-2 mb-4">{item.features.map((f, i) => <span key={i} className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">{f}</span>)}</div>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 font-medium"><span>{t.portfolio.viewSite}</span><ExternalLink className="w-4 h-4" /></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Pricing Section with 24h and updated note
const PricingSection = ({ t }) => {
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section id="pricing" className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=80)', backgroundSize: 'cover'}}></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">{t.pricing.title}</h2>
          <p className="text-xl text-gray-400">{t.pricing.subtitle}</p>
        </div>
        <div className="bg-gradient-to-br from-gray-800 to-gray-800/50 rounded-3xl border border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 text-center">
            <span className="text-white font-bold flex items-center justify-center space-x-2"><Rocket className="w-5 h-5" /><span>{t.pricing.speed}</span></span>
          </div>
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
                    <div className="w-5 h-5 bg-amber-500/20 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-amber-400" /></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <button onClick={scrollToContact} className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-semibold rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg hover:scale-105">{t.pricing.cta}</button>
              <p className="text-sm text-gray-400 mt-4">{t.pricing.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section - no hours
const ContactSection = ({ t }) => {
  const [formData, setFormData] = useState({name: '', email: '', phone: '', business: '', message: ''});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    window.open(`https://wa.me/32494516064?text=${encodeURIComponent(`Hallo! Ik ben ${formData.name} (${formData.business}). ${formData.message}`)}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80)', backgroundSize: 'cover'}}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">{t.contact.title}</h2>
          <p className="text-xl text-gray-400">{t.contact.subtitle}</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce"><Check className="w-8 h-8 text-green-400" /></div>
                <h3 className="text-2xl font-bold text-white mb-2">Bedankt!</h3>
                <p className="text-gray-400">We nemen zo snel mogelijk contact met u op.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.form.name}</label><input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500" /></div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.form.email}</label><input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500" /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.form.phone}</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500" /></div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.form.business}</label><input type="text" value={formData.business} onChange={(e) => setFormData({...formData, business: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500" placeholder="Restaurant, Winkel, ..." /></div>
                </div>
                <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.form.message}</label><textarea rows={4} required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500"></textarea></div>
                <button type="submit" disabled={sending} className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-semibold rounded-lg hover:from-amber-500 hover:to-amber-600 disabled:opacity-50">{sending ? '...' : t.contact.form.submit}</button>
              </form>
            )}
          </div>
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">{t.contact.info.title}</h3>
              <div className="space-y-4">
                <a href="mailto:fworks@mail.be" className="flex items-center space-x-4 text-gray-300 hover:text-amber-400 transition-colors"><Mail className="w-5 h-5" /><span>{t.contact.info.email}</span></a>
                <a href="https://wa.me/32494516064" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 text-gray-300 hover:text-green-400 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <div><span className="block">{t.contact.info.phone}</span><span className="text-xs text-gray-500">{t.contact.whatsappOnly}</span></div>
                </a>
              </div>
            </div>
            <a href="https://wa.me/32494516064" target="_blank" rel="noopener noreferrer" className="block bg-green-600 hover:bg-green-500 transition-all rounded-2xl p-8 text-center hover:scale-[1.02]">
              <MessageCircle className="w-12 h-12 text-white mx-auto mb-4 animate-bounce" />
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
const Footer = ({ t }) => (
  <footer className="bg-gray-900 border-t border-gray-800 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <img src="/images/fworks-logo.png" alt="fworksbuilders" className="h-10 w-auto" />
          <div><span className="text-xl font-bold text-white">fworksbuilders</span><p className="text-sm text-gray-500">{t.footer.tagline}</p></div>
        </div>
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} fworksbuilders. {t.footer.rights}.</p>
      </div>
    </div>
  </footer>
);

// Main App with Tawk.to
function FWorksApp() {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('fworks_lang');
    if (saved && translations[saved]) return saved;
    const browserLang = navigator.language.split('-')[0];
    return translations[browserLang] ? browserLang : 'nl';
  });

  useEffect(() => {
    localStorage.setItem('fworks_lang', lang);
  }, [lang]);

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-gray-900">
      <SEO 
        title="fworksbuilders | Professionele Websites op Maat - Klaar in 24 uur!"
        description="Moderne, snelle en mobielvriendelijke websites met eigen beheerdashboard. Standaard website klaar in 24 uur! Vanaf €199/jaar + €50 opzet."
        keywords="website maken, webdesign, website laten maken, professionele website, België, snel website, goedkoop website, 24 uur website"
      />
      <Navigation t={t} lang={lang} setLang={setLang} />
      <HeroSection t={t} />
      <FeaturesSection t={t} />
      <PortfolioSection t={t} lang={lang} />
      <PricingSection t={t} />
      <ContactSection t={t} />
      <Footer t={t} />
      
      {/* Tawk.to Live Chat - Replace with your property and widget IDs */}
      <TawkMessengerReact
        propertyId="YOUR_PROPERTY_ID"
        widgetId="YOUR_WIDGET_ID"
      />
    </div>
  );
}

export default FWorksApp;
