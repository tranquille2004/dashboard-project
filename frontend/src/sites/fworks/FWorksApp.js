import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, Smartphone, Shield, Zap, MessageCircle, Mail, Phone, 
  ChevronRight, Check, Star, Menu, X, ArrowRight, Settings,
  CreditCard, Calendar, Languages, BarChart3, Clock, Bell,
  Image, FileText, Users, ShoppingCart, MapPin, ChevronLeft,
  Monitor, Palette, Lock, Megaphone, ExternalLink, Rocket
} from 'lucide-react';
import SEO from '@/components/SEO';
import { trackVisit } from '@/utils/trackVisit';
import './FWorks.css';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error('FWorks Error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Oops!</h1>
            <button onClick={() => window.location.reload()} className="px-6 py-3 bg-amber-500 text-gray-900 rounded-lg font-semibold">
              Pagina herladen
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Translations - NL, FR, EN, ES, IT
const translations = {
  nl: {
    nav: { home: 'Home', features: 'Mogelijkheden', portfolio: 'Portfolio', pricing: 'Prijzen', contact: 'Contact' },
    hero: {
      badge: 'Vertrouwd door 100+ bedrijven',
      fastBadge: '⚡ Standaard website klaar in 48 uur!',
      title: 'Professionele Websites',
      subtitle: 'Snel & Betaalbaar',
      description: 'Moderne, snelle en mobielvriendelijke websites met eigen beheerdashboard. Volledig op maat gemaakt voor uw bedrijf.',
      cta: 'Gratis Offerte Aanvragen',
      ctaSecondary: 'Bekijk Mogelijkheden'
    },
    speed: {
      title: '48 Uur Levering',
      desc: 'Standaard websites binnen 48 uur online'
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
      note: 'Eenmalige opzet: €/$100 (voor standaard sites — complexere projecten op aanvraag)',
      speed: 'Standaard website klaar in 48 uur!'
    },
    contact: {
      title: 'Neem Contact Op',
      subtitle: 'Laten we uw project bespreken',
      emailForm: 'Stuur een email',
      supportChannels: 'Support per email en WhatsApp',
      thanks: 'Bedankt!',
      thanksMsg: 'We nemen zo snel mogelijk contact met u op.',
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
    },
    process: {
      kicker: 'Onze werkwijze',
      title: 'In 3 stappen naar uw website',
      subtitle: 'Een helder proces, van eerste gesprek tot oplevering — zonder verrassingen.',
      steps: [
        {
          number: '01',
          title: 'Kennismaking (gratis)',
          desc: 'We beginnen met een persoonlijk gesprek of videocall. Samen brengen we uw wensen, doelen en merk in kaart zodat we een plan bouwen dat echt bij u past. Vervolg-meetings en klantendienstverlening zijn altijd beschikbaar en altijd inbegrepen.'
        },
        {
          number: '02',
          title: 'Ontwerp & prototype',
          desc: 'Voor er één regel code geschreven wordt, maken we een visueel prototype. Zo ziet u hoe uw site of app eruit zal zien — en kunt u stijl en functies bijsturen voordat we écht beginnen.'
        },
        {
          number: '03',
          title: 'Bouw & livegang',
          desc: 'Onze developers bouwen het prototype om tot een snelle, betrouwbare en toekomstbestendige website. Elke regel code wordt geschreven met oog voor prestaties, veiligheid en groei.'
        }
      ]
    }
  },
  fr: {
    nav: { home: 'Accueil', features: 'Fonctionnalités', portfolio: 'Portfolio', pricing: 'Tarifs', contact: 'Contact' },
    hero: {
      badge: 'Fait confiance par 100+ entreprises',
      fastBadge: '⚡ Site standard prêt en 48 heures!',
      title: 'Sites Web Professionnels',
      subtitle: 'Rapide & Abordable',
      description: 'Sites web modernes, rapides et adaptés aux mobiles avec tableau de bord personnel. Entièrement personnalisé pour votre entreprise.',
      cta: 'Demander Un Devis Gratuit',
      ctaSecondary: 'Voir Les Fonctionnalités'
    },
    speed: {
      title: 'Livraison 48h',
      desc: 'Sites standards en ligne en 48 heures'
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
      note: 'Frais de création: €/$100 (pour les sites standards — projets complexes sur devis)',
      speed: 'Site standard prêt en 48 heures!'
    },
    contact: {
      title: 'Contactez-Nous',
      subtitle: 'Discutons de votre projet',
      emailForm: 'Envoyez un email',
      supportChannels: 'Support par email et WhatsApp',
      thanks: 'Merci!',
      thanksMsg: 'Nous vous contacterons dès que possible.',
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
    },
    process: {
      kicker: 'Notre méthode',
      title: 'Votre site en 3 étapes',
      subtitle: 'Un processus clair, de la première rencontre à la mise en ligne — sans mauvaises surprises.',
      steps: [
        {
          number: '01',
          title: 'Rencontre gratuite',
          desc: 'Tout commence par un échange — en personne ou en visio. Nous prenons le temps de comprendre votre univers, vos objectifs et vos contraintes pour construire un plan qui vous ressemble. Les réunions de suivi et le service client sont toujours disponibles et toujours inclus.'
        },
        {
          number: '02',
          title: 'Maquette & prototype',
          desc: 'Avant de coder la moindre ligne, nous créons une maquette visuelle de votre site ou application. Vous validez le style et les fonctionnalités avant que le développement ne démarre.'
        },
        {
          number: '03',
          title: 'Développement & mise en ligne',
          desc: 'Nos développeurs transforment la maquette en solution performante, robuste et évolutive. Chaque ligne de code vise la rapidité, la fiabilité et la pérennité de votre projet.'
        }
      ]
    }
  },
  en: {
    nav: { home: 'Home', features: 'Features', portfolio: 'Portfolio', pricing: 'Pricing', contact: 'Contact' },
    hero: {
      badge: 'Trusted by 100+ businesses',
      fastBadge: '⚡ Standard website ready in 48 hours!',
      title: 'Professional Websites',
      subtitle: 'Fast & Affordable',
      description: 'Modern, fast, and mobile-friendly websites with your own management dashboard. Fully customized for your business.',
      cta: 'Get A Free Quote',
      ctaSecondary: 'View Features'
    },
    speed: {
      title: '48 Hour Delivery',
      desc: 'Standard websites online within 48 hours'
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
      note: 'One-time setup: €/$100 (for standard sites — complex projects on request)',
      speed: 'Standard website ready in 48 hours!'
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Let\'s discuss your project',
      emailForm: 'Send an email',
      supportChannels: 'Support via email and WhatsApp',
      thanks: 'Thank you!',
      thanksMsg: 'We will contact you as soon as possible.',
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
    },
    process: {
      kicker: 'How we work',
      title: 'Your website in 3 steps',
      subtitle: 'A clear process, from first call to going live — no surprises.',
      steps: [
        {
          number: '01',
          title: 'Free intro call',
          desc: 'Every project starts with a real conversation — in person or online. We take the time to understand your goals, your brand and your constraints to shape a plan that fits you. Follow-up meetings and customer support are always available and always included.'
        },
        {
          number: '02',
          title: 'Design & prototype',
          desc: 'Before writing a single line of code, we build a visual prototype of your site or app. You can review the look and the features, and fine-tune everything before development begins.'
        },
        {
          number: '03',
          title: 'Build & launch',
          desc: 'Our developers turn the prototype into a fast, reliable and future-proof solution. Every line of code is written with performance, security and long-term growth in mind.'
        }
      ]
    }
  },
  es: {
    nav: { home: 'Inicio', features: 'Funciones', portfolio: 'Portfolio', pricing: 'Precios', contact: 'Contacto' },
    hero: {
      badge: 'Confiado por más de 100 empresas',
      fastBadge: '⚡ ¡Sitio web estándar listo en 48 horas!',
      title: 'Sitios Web Profesionales',
      subtitle: 'Rápido y Asequible',
      description: 'Sitios web modernos, rápidos y adaptados a móviles con su propio panel de control. Totalmente personalizado para su negocio.',
      cta: 'Solicitar Presupuesto Gratis',
      ctaSecondary: 'Ver Funciones'
    },
    speed: {
      title: 'Entrega en 24h',
      desc: 'Sitios estándar en línea en 48 horas'
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
      note: 'Configuración única: €/$100 (para sitios estándar — proyectos complejos bajo presupuesto)',
      speed: '¡Sitio web estándar listo en 48 horas!'
    },
    contact: {
      title: 'Contáctenos',
      subtitle: 'Hablemos de su proyecto',
      emailForm: 'Enviar un email',
      supportChannels: 'Soporte por email y WhatsApp',
      thanks: '¡Gracias!',
      thanksMsg: 'Nos pondremos en contacto lo antes posible.',
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
    },
    process: {
      kicker: 'Nuestro método',
      title: 'Tu sitio web en 3 pasos',
      subtitle: 'Un proceso claro, desde la primera reunión hasta la publicación — sin sorpresas.',
      steps: [
        {
          number: '01',
          title: 'Primera reunión gratuita',
          desc: 'Todo comienza con una conversación — en persona o por videollamada. Nos tomamos el tiempo de entender tus objetivos, tu marca y tus necesidades para diseñar un plan hecho a tu medida. Las reuniones de seguimiento y la atención al cliente siempre están disponibles y siempre incluidas.'
        },
        {
          number: '02',
          title: 'Diseño y prototipo',
          desc: 'Antes de escribir una sola línea de código, creamos un prototipo visual de tu sitio o aplicación. Podrás validar el estilo y las funciones antes de que comience el desarrollo.'
        },
        {
          number: '03',
          title: 'Desarrollo y publicación',
          desc: 'Nuestros desarrolladores convierten el prototipo en una solución rápida, fiable y escalable. Cada línea de código está pensada para rendimiento, seguridad y crecimiento a largo plazo.'
        }
      ]
    }
  },
  it: {
    nav: { home: 'Home', features: 'Funzionalità', portfolio: 'Portfolio', pricing: 'Prezzi', contact: 'Contatto' },
    hero: {
      badge: 'Scelto da oltre 100 aziende',
      fastBadge: '⚡ Sito web standard pronto in 48 ore!',
      title: 'Siti Web Professionali',
      subtitle: 'Veloce e Conveniente',
      description: 'Siti web moderni, veloci e ottimizzati per dispositivi mobili con il proprio pannello di controllo. Completamente personalizzato per la tua attività.',
      cta: 'Richiedi Preventivo Gratuito',
      ctaSecondary: 'Vedi Funzionalità'
    },
    speed: {
      title: 'Consegna in 24h',
      desc: 'Siti standard online in 48 ore'
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
      note: 'Setup una tantum: €100 (per siti standard — progetti complessi su preventivo)',
      speed: 'Sito web standard pronto in 48 ore!'
    },
    contact: {
      title: 'Contattaci',
      subtitle: 'Parliamo del tuo progetto',
      emailForm: 'Invia un\'email',
      supportChannels: 'Supporto via email e WhatsApp',
      thanks: 'Grazie!',
      thanksMsg: 'Ti contatteremo il prima possibile.',
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
    },
    process: {
      kicker: 'Il nostro metodo',
      title: 'Il tuo sito in 3 passi',
      subtitle: 'Un percorso chiaro, dal primo contatto al lancio — senza sorprese.',
      steps: [
        {
          number: '01',
          title: 'Primo incontro gratuito',
          desc: 'Tutto inizia con una conversazione — di persona o in videochiamata. Ci prendiamo il tempo di capire i tuoi obiettivi, il tuo brand e le tue esigenze per costruire un piano su misura. Gli incontri di follow-up e l\'assistenza clienti sono sempre disponibili e sempre inclusi.'
        },
        {
          number: '02',
          title: 'Design e prototipo',
          desc: "Prima di scrivere una riga di codice, creiamo un prototipo visivo del tuo sito o della tua app. Potrai validare lo stile e le funzionalità prima dell'inizio dello sviluppo."
        },
        {
          number: '03',
          title: 'Sviluppo e pubblicazione',
          desc: 'I nostri sviluppatori trasformano il prototipo in una soluzione veloce, affidabile e scalabile. Ogni riga di codice è pensata per performance, sicurezza e crescita nel tempo.'
        }
      ]
    }
  }
};

// Portfolio data
// Feature translations for portfolio items
const featureTranslations = {
  'Reservaties': { nl: 'Reservaties', fr: 'Réservations', en: 'Reservations', es: 'Reservas', it: 'Prenotazioni' },
  'Meertalig': { nl: 'Meertalig', fr: 'Multilingue', en: 'Multilingual', es: 'Multilingüe', it: 'Multilingue' },
  'Menu': { nl: 'Menu', fr: 'Menu', en: 'Menu', es: 'Menú', it: 'Menu' },
  'Afhalen': { nl: 'Afhalen', fr: 'À emporter', en: 'Takeaway', es: 'Para llevar', it: 'Da asporto' },
  'Groepsmenu\'s': { nl: 'Groepsmenu\'s', fr: 'Menus de groupe', en: 'Group Menus', es: 'Menús de grupo', it: 'Menu di gruppo' },
  'Galerij': { nl: 'Galerij', fr: 'Galerie', en: 'Gallery', es: 'Galería', it: 'Galleria' },
  'Evenementen': { nl: 'Evenementen', fr: 'Événements', en: 'Events', es: 'Eventos', it: 'Eventi' },
  'Contact': { nl: 'Contact', fr: 'Contact', en: 'Contact', es: 'Contacto', it: 'Contatto' },
  'E-commerce': { nl: 'E-commerce', fr: 'E-commerce', en: 'E-commerce', es: 'E-commerce', it: 'E-commerce' },
  'WhatsApp': { nl: 'WhatsApp', fr: 'WhatsApp', en: 'WhatsApp', es: 'WhatsApp', it: 'WhatsApp' },
  'Producten': { nl: 'Producten', fr: 'Produits', en: 'Products', es: 'Productos', it: 'Prodotti' },
  'Video\'s': { nl: 'Video\'s', fr: 'Vidéos', en: 'Videos', es: 'Videos', it: 'Video' },
  'Dashboard': { nl: 'Dashboard', fr: 'Tableau de bord', en: 'Dashboard', es: 'Panel', it: 'Pannello' },
};

const translateFeature = (feature, lang) => {
  const t = featureTranslations[feature];
  return t ? (t[lang] || t.en || feature) : feature;
};

const portfolioItems = [
  {
    name: 'La Cantina Italiana',
    type: { nl: 'Italiaans Restaurant', fr: 'Restaurant Italien', en: 'Italian Restaurant', es: 'Restaurante Italiano', it: 'Ristorante Italiano' },
    location: 'Tervuren',
    url: 'https://lacantinaitaliana.net',
    image: '/images/cantina/hero-background.jpg',
    features: ['Reservaties', 'Meertalig', 'Menu']
  },
  {
    name: 'La Bottega Italiana',
    type: { nl: 'Italiaans Restaurant', fr: 'Restaurant Italien', en: 'Italian Restaurant', es: 'Restaurante Italiano', it: 'Ristorante Italiano' },
    location: 'Herent',
    url: 'https://labottegaherent.com',
    image: '/images/bottega/gallery/3_1_orig.jpg',
    features: ['Reservaties', 'Afhalen', 'Groepsmenu\'s']
  },
  {
    name: "L'Ascoli",
    type: { nl: 'Italiaans Restaurant', fr: 'Restaurant Italien', en: 'Italian Restaurant', es: 'Restaurante Italiano', it: 'Ristorante Italiano' },
    location: 'Zaventem',
    url: 'https://ascolizaventem.com',
    image: '/images/ascoli/gallery/20689781-1380875678699421-9174551204022883676-o_1_orig.jpg',
    features: ['Reservaties', 'Galerij', 'Evenementen']
  },
  {
    name: 'Ristorante Mercato',
    type: { nl: 'Pizzeria & Restaurant', fr: 'Pizzeria & Restaurant', en: 'Pizzeria & Restaurant', es: 'Pizzería y Restaurante', it: 'Pizzeria e Ristorante' },
    location: 'Zaventem',
    url: 'https://ristorantemercato.be',
    image: '/images/logo/mercato-logo.jpg',
    features: ['Reservaties', 'Afhalen', 'Menu']
  },
  {
    name: 'Theo Beans Export',
    type: { nl: 'Cacao Export', fr: 'Export de Cacao', en: 'Cacao Export', es: 'Exportación de Cacao', it: 'Esportazione Cacao' },
    location: 'Ecuador',
    url: 'https://theobeans-export.com',
    image: '/images/theobeans/gallery/qualite-hero.jpg',
    features: ['Meertalig', 'Galerij', 'Contact']
  },
  {
    name: 'Tracemaster',
    type: { nl: 'GPS Tracking', fr: 'Suivi GPS', en: 'GPS Tracking', es: 'Rastreo GPS', it: 'Tracciamento GPS' },
    location: 'Ecuador',
    url: 'https://tracemaster-rastreadores.com',
    image: '/images/tracemaster/chargeur1_orig.jpg',
    features: ['E-commerce', 'WhatsApp', 'Producten']
  },
  {
    name: 'Résidence Villa Smeralda',
    type: { nl: 'Vakantieverhuur', fr: 'Location de Vacances', en: 'Holiday Rental', es: 'Alquiler Vacacional', it: 'Affitto Vacanze' },
    location: 'Sardinië, Italië',
    url: 'https://smeraldavacanze.it',
    image: '/images/smeralda/bg-header.png',
    features: ['Reservaties', 'Meertalig', 'Galerij']
  },
  {
    name: 'Alberto Pantoja',
    type: { nl: 'Politieke Campagne', fr: 'Campagne Politique', en: 'Political Campaign', es: 'Campaña Política', it: 'Campagna Politica' },
    location: 'Santo Domingo, Ecuador',
    url: 'https://www.albertopantoja.com',
    image: '/images/albertopantoja/Alberto/472952303_18477340369043721_5011479368151296835_n.jpg',
    features: ['Meertalig', 'Galerij', 'Video\'s']
  },
  {
    name: 'Hotel del Pacífico',
    type: { nl: 'Hotel & Restaurant', fr: 'Hôtel & Restaurant', en: 'Hotel & Restaurant', es: 'Hotel y Restaurante', it: 'Hotel e Ristorante' },
    location: 'Santo Domingo, Ecuador',
    url: 'https://www.hoteldelpacifico.net',
    image: '/images/hoteldelpacifico/backgrounds/hotel-entrance.jpg',
    features: ['Meertalig', 'Galerij', 'Dashboard']
  },
  {
    name: 'Il Siciliano',
    type: { nl: 'Trattoria & Pizzería', fr: 'Trattoria & Pizzería', en: 'Trattoria & Pizzería', es: 'Trattoria y Pizzería', it: 'Trattoria e Pizzería' },
    location: 'Santo Domingo, Ecuador',
    url: 'https://ilsiciliano-santodomingo.com',
    image: '/images/ilsiciliano/home/hero-background.jpg',
    features: ['Meertalig', 'Menu', 'Galerij']
  },
  {
    name: 'RCCB Group',
    type: { nl: 'Schoonmaakdiensten', fr: 'Services de nettoyage', en: 'Cleaning services', es: 'Servicios de limpieza', it: 'Servizi di pulizia' },
    location: 'België / Belgium',
    url: 'https://rccbgroup.com',
    image: '/images/rccb/photos/photo-05.jpg',
    features: ['Meertalig', 'Galerij', 'Contact']
  },
  {
    name: 'Club San Francisco',
    type: { nl: 'Hacienda Turística', fr: 'Hacienda Touristique', en: 'Tourist Hacienda', es: 'Hacienda Turística', it: 'Hacienda Turistica' },
    location: 'Santo Domingo, Ecuador',
    url: 'https://sanfrancisco-haciendaturistica.com',
    image: '/images/sanfrancisco/logo/sanfrancisco-logo.png',
    features: ['Meertalig', 'WhatsApp', 'Galerij']
  }
];

// Language Selector with 5 languages - Discrete gold/black theme
const LanguageSelector = ({ lang, setLang }) => {
  const [open, setOpen] = useState(false);
  const langs = [
    { code: 'nl', flag: '🇳🇱', name: 'NL' },
    { code: 'fr', flag: '🇫🇷', name: 'FR' },
    { code: 'en', flag: '🇬🇧', name: 'EN' },
    { code: 'es', flag: '🇪🇸', name: 'ES' },
    { code: 'it', flag: '🇮🇹', name: 'IT' }
  ];
  const current = langs.find(l => l.code === lang) || langs[0];

  return (
    <div className="relative">
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-transparent border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/50 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{current?.name}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-gray-900 border border-amber-500/30 rounded-lg overflow-hidden shadow-2xl z-50 min-w-[120px]">
          {langs.map(l => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full px-4 py-2.5 text-left flex items-center space-x-2 hover:bg-amber-500/10 transition-colors ${lang === l.code ? 'bg-amber-500/20 text-amber-400' : 'text-gray-300'}`}
            >
              <span className="text-sm">{l.flag}</span>
              <span className="text-sm font-medium">{l.name}</span>
              {lang === l.code && <Check className="w-3 h-3 ml-auto text-amber-500" />}
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
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 rounded-full mb-6 shadow-lg shadow-amber-500/30 animate-bounce">
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

// Realistic Feature Demos - Gold/Black theme only
const FeatureDemoContent = ({ activeFeature, t }) => {
  const [demoState, setDemoState] = useState({ announcementActive: true, selectedLang: 'nl' });

  const demos = {
    dashboard: (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl border border-amber-500/20">
        <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2 border-b border-amber-500/20">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-amber-300"></div>
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
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-amber-400">247</p>
                <p className="text-xs text-amber-300">Bezoekers</p>
              </div>
              <div className="bg-amber-600/10 border border-amber-600/30 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-amber-500">12</p>
                <p className="text-xs text-amber-400">Reservaties</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    announcement: (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl border border-red-500/20">
          <div className="bg-red-600 px-4 py-3 flex items-center justify-between animate-pulse">
            <span className="text-sm font-medium text-white">🎄 Wij zijn gesloten van 24 tot 26 december!</span>
            <X className="w-4 h-4 text-white" />
          </div>
          <div className="p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">La Cantina Italiana</h3>
            <p className="text-gray-400 text-sm">Authentieke Italiaanse keuken</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 flex gap-2">
          {['Belangrijk', 'Nieuws', 'Actie'].map((style, i) => (
            <span key={i} className={`px-3 py-1 text-xs rounded cursor-pointer ${i === 0 ? 'bg-red-600 text-white' : 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'}`}>{style}</span>
          ))}
        </div>
      </div>
    ),
    reservation: (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl border border-amber-500/20">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3">
          <h4 className="text-gray-900 font-semibold">Reserveer een tafel</h4>
        </div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input type="text" value="15 maart 2026" readOnly className="w-full bg-gray-800 border border-amber-500/30 rounded px-3 py-2 text-white text-sm" />
            <input type="text" value="19:30" readOnly className="w-full bg-gray-800 border border-amber-500/30 rounded px-3 py-2 text-white text-sm" />
          </div>
          <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 py-3 rounded-lg font-semibold">Reserveer Nu</button>
        </div>
      </div>
    ),
    menu: (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl border border-amber-500/20">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3"><h4 className="text-gray-900 font-semibold text-center">Onze Kaart</h4></div>
        <div className="p-4 space-y-3">
          {[{name: 'Pizza Margherita', desc: 'Tomaat, mozzarella', price: '€12.50'}, {name: 'Spaghetti Carbonara', desc: 'Spek, ei, parmezaan', price: '€14.00'}].map((item, i) => (
            <div key={i} className="flex justify-between p-3 bg-gray-800 border border-amber-500/20 rounded-lg">
              <div><h5 className="font-semibold text-white">{item.name}</h5><p className="text-xs text-gray-400">{item.desc}</p></div>
              <span className="text-amber-400 font-bold">{item.price}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    payment: (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl border border-amber-500/20 p-4 space-y-4">
        <div className="flex justify-between border-b border-amber-500/20 pb-2"><span className="text-white font-semibold">Totaal</span><span className="text-amber-400 font-bold text-xl">€45.50</span></div>
        <div className="space-y-2">
          {[{name: 'Kaart', icon: '💳'}, {name: 'Bancontact', icon: '🏦'}].map((p, i) => (
            <div key={i} className="p-3 border border-amber-500/30 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-amber-500/10 transition-colors">
              <span className="text-xl">{p.icon}</span>
              <span className="text-white text-sm">{p.name}</span>
            </div>
          ))}
        </div>
        <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"><Lock className="w-4 h-4" /><span>Veilig Betalen</span></button>
      </div>
    ),
    multilingual: (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl border border-amber-500/20">
        <div className="bg-gray-800 px-4 py-2 flex justify-end space-x-2 border-b border-amber-500/20">
          {[{l: 'nl', f: '🇳🇱'}, {l: 'fr', f: '🇫🇷'}, {l: 'en', f: '🇬🇧'}].map((lang, i) => (
            <button key={i} onClick={() => setDemoState({...demoState, selectedLang: lang.l})} className={`px-3 py-1 rounded text-xs font-medium transition-colors ${demoState.selectedLang === lang.l ? 'bg-amber-500 text-gray-900' : 'text-gray-300 hover:bg-amber-500/20'}`}>{lang.f}</button>
          ))}
        </div>
        <div className="p-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">{demoState.selectedLang === 'nl' ? 'Welkom!' : demoState.selectedLang === 'fr' ? 'Bienvenue!' : 'Welcome!'}</h3>
          <button className="mt-4 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 px-6 py-2 rounded-lg font-semibold">{demoState.selectedLang === 'nl' ? 'Reserveer' : demoState.selectedLang === 'fr' ? 'Réservez' : 'Book Now'}</button>
        </div>
      </div>
    )
  };

  return demos[activeFeature] || null;
};

// Features Section (compact) - Gold/Black theme
const FeaturesSection = ({ t }) => {
  const [activeFeature, setActiveFeature] = useState('dashboard');
  const featuresList = [
    { id: 'dashboard', icon: Settings },
    { id: 'announcement', icon: Megaphone },
    { id: 'reservation', icon: Calendar },
    { id: 'menu', icon: FileText },
    { id: 'payment', icon: CreditCard },
    { id: 'multilingual', icon: Languages }
  ];

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
            const isActive = activeFeature === feature.id;
            return (
              <button key={feature.id} onClick={() => setActiveFeature(feature.id)} className={`flex items-center space-x-2 px-5 py-3 rounded-xl transition-all ${isActive ? 'bg-amber-500 text-gray-900' : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'}`}>
                <Icon className="w-5 h-5" /><span className="font-medium">{t.features[feature.id]?.title || feature.id}</span>
              </button>
            );
          })}
        </div>
        <div className="bg-gray-800/50 rounded-3xl p-8 md:p-12 border border-amber-500/20 backdrop-blur-sm">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">{t.features[activeFeature]?.title || ''}</h3>
              <p className="text-xl text-gray-400 mb-8">{t.features[activeFeature]?.desc || ''}</p>
              <div className="space-y-4">
                {(t.features[activeFeature]?.features || []).map((feature, idx) => (
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

// Process Section - Our 3-step approach
const ProcessSection = ({ t }) => (
  <section id="process" className="py-24 bg-gray-900 relative overflow-hidden">
    {/* Background accents */}
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" aria-hidden />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" aria-hidden />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Section header */}
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-amber-500/30 bg-amber-500/5">
          <span className="text-xs tracking-[0.3em] uppercase text-amber-400 font-medium">
            {t.process?.kicker || 'Our method'}
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4 leading-tight">
          {t.process?.title || 'Your website in 3 steps'}
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          {t.process?.subtitle || ''}
        </p>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {(t.process?.steps || []).map((step, i) => (
          <div
            key={i}
            className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-1"
            data-testid={`fworks-process-step-${i}`}
          >
            {/* Connector line (desktop) */}
            {i < 2 && (
              <div className="hidden md:block absolute top-12 -right-4 lg:-right-5 w-8 lg:w-10 h-px bg-gradient-to-r from-amber-500/50 to-transparent z-10" />
            )}

            {/* Big number */}
            <div className="text-6xl lg:text-7xl font-light bg-gradient-to-br from-amber-400 to-amber-600 bg-clip-text text-transparent mb-4 leading-none">
              {step.number}
            </div>

            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-amber-300 transition-colors">
              {step.title}
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm lg:text-base">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

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
          <div key={index} className="group bg-gray-900 rounded-2xl overflow-hidden border border-amber-500/20 hover:border-amber-500/50 transition-all hover:scale-[1.02]">
            <div className="relative h-48 overflow-hidden bg-gray-800">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              <div className="absolute top-3 right-3"><span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full font-medium flex items-center space-x-1"><span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span><span>{t.portfolio.liveDemo}</span></span></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-1">{item.name}</h3>
              <p className="text-amber-400 text-sm mb-3">{item.type[lang] || item.type.en} • {item.location}</p>
              <div className="flex flex-wrap gap-2 mb-4">{item.features.map((f, i) => <span key={i} className="text-xs bg-amber-500/10 text-amber-400 px-2 py-1 rounded">{translateFeature(f, lang)}</span>)}</div>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 font-medium"><span>{t.portfolio.viewSite}</span><ExternalLink className="w-4 h-4" /></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Pricing Section with 24h and updated note - Gold/Black theme
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
        <div className="bg-gradient-to-br from-gray-800 to-gray-800/50 rounded-3xl border border-amber-500/30 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-center">
            <span className="text-gray-900 font-bold flex items-center justify-center space-x-2"><Rocket className="w-5 h-5" /><span>{t.pricing.speed}</span></span>
          </div>
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="flex items-baseline justify-center space-x-2">
                <span className="text-2xl text-amber-400">€/$</span>
                <span className="text-7xl font-bold text-white">{t.pricing.price}</span>
                <span className="text-xl text-amber-400">/{t.pricing.period}</span>
              </div>
            </div>
            <div className="mb-10">
              <p className="text-amber-400 font-semibold mb-4">{t.pricing.includes}</p>
              <div className="grid md:grid-cols-2 gap-4">
                {(t.pricing.features || []).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-amber-500/20 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-amber-400" /></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <button onClick={scrollToContact} className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-semibold rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg hover:scale-105">{t.pricing.cta}</button>
              <p className="text-sm text-amber-400/70 mt-4">{t.pricing.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section - Email form + WhatsApp support
const ContactSection = ({ t }) => {
  const [formData, setFormData] = useState({name: '', email: '', phone: '', business: '', message: ''});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    
    try {
      // Send email via backend - correct endpoint is /api/public/contact
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/public/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site: 'fworks',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Type bedrijf: ${formData.business}\n\n${formData.message}`
        })
      });
      
      if (response.ok) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
    
    setSending(false);
  };

  return (
    <section id="contact" className="py-24 bg-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80)', backgroundSize: 'cover'}}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">{t.contact.title}</h2>
          <p className="text-xl text-gray-400">{t.contact.subtitle}</p>
          <p className="text-amber-400 mt-2">{t.contact.supportChannels || 'Support per email en WhatsApp'}</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-gray-900 rounded-2xl p-8 border border-amber-500/20">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2"><Mail className="w-5 h-5 text-amber-400" /><span>{t.contact.emailForm || 'Stuur een email'}</span></h3>
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce"><Check className="w-8 h-8 text-amber-400" /></div>
                <h3 className="text-2xl font-bold text-white mb-2">{t.contact.thanks || 'Bedankt!'}</h3>
                <p className="text-gray-400">{t.contact.thanksMsg || 'We nemen zo snel mogelijk contact met u op.'}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.form.name}</label><input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-800 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" /></div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.form.email}</label><input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-800 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.form.phone}</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-800 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" /></div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.form.business}</label><input type="text" value={formData.business} onChange={(e) => setFormData({...formData, business: e.target.value})} className="w-full bg-gray-800 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="Restaurant, Winkel, ..." /></div>
                </div>
                <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.form.message}</label><textarea rows={4} required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-gray-800 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"></textarea></div>
                <button type="submit" disabled={sending} className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-semibold rounded-lg hover:from-amber-500 hover:to-amber-600 disabled:opacity-50 flex items-center justify-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>{sending ? '...' : t.contact.form.submit}</span>
                </button>
              </form>
            )}
          </div>
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-2xl p-8 border border-amber-500/20">
              <h3 className="text-xl font-semibold text-white mb-6">{t.contact.info.title}</h3>
              <div className="space-y-4">
                <a href="mailto:fworks@mail.be" className="flex items-center space-x-4 text-gray-300 hover:text-amber-400 transition-colors"><Mail className="w-5 h-5" /><span>{t.contact.info.email}</span></a>
                <a href="https://wa.me/32494516064" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 text-gray-300 hover:text-green-400 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <div>
                    <span className="block">{t.contact.info.phone}</span>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] tracking-wider uppercase bg-green-500/20 text-green-400 rounded-full font-medium border border-green-500/30">
                      {t.contact.whatsappOnly || 'WhatsApp only'}
                    </span>
                  </div>
                </a>
              </div>
            </div>
            <a href="https://wa.me/32494516064" target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 transition-all rounded-2xl p-8 text-center hover:scale-[1.02]">
              <MessageCircle className="w-12 h-12 text-white mx-auto mb-4 animate-bounce" />
              <h3 className="text-xl font-semibold text-white mb-2">{t.contact.whatsapp}</h3>
              <p className="text-green-100">+32 494 51 60 64</p>
              <p className="text-green-200 text-sm mt-1">+593 98 901 3622</p>
              <p className="mt-3 text-xs tracking-[0.2em] uppercase text-white/90 font-semibold">
                {t.contact.whatsappOnly || 'WhatsApp only'}
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer with legal info
const Footer = ({ t }) => (
  <footer className="bg-gray-900 border-t border-gray-800 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Legal Information */}
      <div className="text-center">
        <p className="text-xs text-gray-600 flex items-center justify-center space-x-2">
          <img src="/images/fworks-logo.png" alt="fworksbuilders" className="h-4 w-auto opacity-60" />
          <span>fworksbuilders • RUC: 1759884990001 • Via Aventura, Santo Domingo, Ecuador</span>
        </p>
        <p className="text-xs text-gray-700 mt-2">© {new Date().getFullYear()} fworksbuilders. {t.footer.rights}.</p>
      </div>
    </div>
  </footer>
);

// Main App with Tawk.to and SEO
function FWorksApp() {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('fworks_lang');
    if (saved && translations[saved]) return saved;
    const browserLang = navigator.language.split('-')[0];
    return translations[browserLang] ? browserLang : 'nl';
  });

  useEffect(() => {
    localStorage.setItem('fworks_lang', lang);
    
    // Add structured data (JSON-LD) for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "fworksbuilders",
      "description": "Professionele websites op maat. Standaard website klaar in 24 uur! Eigen beheerdashboard, meertalig, mobielvriendelijk.",
      "url": "https://fworksbuilders.com",
      "logo": "https://fworksbuilders.com/images/fworks-logo.png",
      "image": "https://fworksbuilders.com/images/fworks-logo.png",
      "telephone": "+32494516064",
      "email": "fworks@mail.be",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "BE"
      },
      "priceRange": "€199/jaar",
      "serviceType": ["Web Design", "Website Development", "Web Hosting"],
      "areaServed": ["Belgium", "Netherlands", "Europe"],
      "sameAs": [
        "https://wa.me/32494516064"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Website Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Professionele Website",
              "description": "Maatwerk website met eigen beheerdashboard"
            },
            "price": "199",
            "priceCurrency": "EUR",
            "priceValidUntil": "2027-12-31"
          }
        ]
      }
    };
    
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) existingScript.remove();
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [lang]);

  // Tawk.to live chat - load via script (more reliable than React component)
  useEffect(() => {
    // Track page visit (was missing — fixed May 18 2026)
    trackVisit('fworks', window.location.pathname);

    var Tawk_API = window.Tawk_API || {};
    var Tawk_LoadStart = new Date();
    var s1 = document.createElement("script");
    var s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/5d83c092c22bdd393bb6bf8b/default';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
    
    return () => {
      if (window.Tawk_API && window.Tawk_API.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    };
  }, []);

  const t = translations[lang];

  // Dynamic SEO based on language
  const seoContent = {
    nl: {
      title: "fworksbuilders | Professionele Websites op Maat - Klaar in 24 uur!",
      description: "Professionele websites vanaf €199/jaar + €50 opzet. Standaard website klaar in 24 uur! Eigen beheerdashboard, meertalig, mobielvriendelijk. Webdesign België.",
      keywords: "website maken, webdesign, website laten maken, professionele website, België, goedkoop website, 24 uur website, webdesigner"
    },
    fr: {
      title: "fworksbuilders | Sites Web Professionnels Sur Mesure - Prêt en 24h!",
      description: "Sites web professionnels à partir de €199/an + €50 création. Site standard prêt en 24 heures! Tableau de bord personnel, multilingue. Webdesign Belgique.",
      keywords: "création site web, webdesign, site web professionnel, Belgique, site web pas cher, 24 heures, webdesigner"
    },
    en: {
      title: "fworksbuilders | Professional Custom Websites - Ready in 24 Hours!",
      description: "Professional websites from €199/year + €50 setup. Standard website ready in 24 hours! Personal dashboard, multilingual, mobile-friendly. Web design worldwide.",
      keywords: "website design, web development, professional website, cheap website, 24 hour website, web designer, custom website"
    },
    es: {
      title: "fworksbuilders | Sitios Web Profesionales a Medida - ¡Listo en 24h!",
      description: "Sitios web profesionales desde €199/año + €50 configuración. ¡Sitio web estándar listo en 48 horas! Panel de control personal, multilingüe. Diseño web mundial.",
      keywords: "diseño web, crear sitio web, sitio web profesional, sitio web barato, 48 horas, diseñador web"
    },
    it: {
      title: "fworksbuilders | Siti Web Professionali Su Misura - Pronto in 24h!",
      description: "Siti web professionali da €199/anno + €50 setup. Sito web standard pronto in 48 ore! Pannello di controllo personale, multilingue. Web design mondiale.",
      keywords: "web design, creare sito web, sito web professionale, sito web economico, 48 ore, web designer"
    }
  };

  const currentSeo = seoContent[lang] || seoContent.en;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900">
        <SEO 
          title={currentSeo.title}
          description={currentSeo.description}
          keywords={currentSeo.keywords}
          image="https://fworksbuilders.com/images/fworks-logo.png"
          url="https://fworksbuilders.com"
          siteName="fworksbuilders"
          locale={lang === 'nl' ? 'nl_BE' : lang === 'fr' ? 'fr_BE' : lang === 'es' ? 'es_ES' : lang === 'it' ? 'it_IT' : 'en_US'}
        />
        <Navigation t={t} lang={lang} setLang={setLang} />
        <HeroSection t={t} />
        <FeaturesSection t={t} />
        <ProcessSection t={t} />
        <PortfolioSection t={t} lang={lang} />
        <PricingSection t={t} />
        <ContactSection t={t} />
        <Footer t={t} />
      </div>
    </ErrorBoundary>
  );
}

export default FWorksApp;
