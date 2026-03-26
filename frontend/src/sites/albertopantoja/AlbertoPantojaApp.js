import React, { useState, useEffect } from 'react';
import { Menu, X, Facebook, Youtube, Linkedin, MapPin, Mail, Phone, ChevronRight, Users, Building, Heart, Briefcase, GraduationCap, Home } from 'lucide-react';

// Helper for production image paths
const IMG = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  // Check if window exists (server-side rendering check)
  if (typeof window === 'undefined') return path;
  const isProduction = window.location.hostname.includes('.emergent.host');
  if (isProduction && path.startsWith('/images/')) {
    return '/api' + path;
  }
  return path;
};

// Color scheme: Blue (#1E3A8A), Red (#DC2626), White (#FFFFFF)
// Based on Revolución Ciudadana party colors

// Translations
const translations = {
  es: {
    nav: { home: 'Inicio', bio: 'Biografía', work: 'Trabajo', media: 'Medios', contact: 'Contacto', join: 'Únete' },
    hero: {
      subtitle: 'CONSEJAL RURAL DE SANTO DOMINGO',
      title: 'Alberto Pantoja',
      tagline: 'La Voz del Campo',
      description: 'Director Provincial de la Revolución Ciudadana en Santo Domingo de los Tsáchilas. Trabajando por el desarrollo integral de nuestras comunidades.',
      cta: 'Conoce Mi Trabajo'
    },
    about: {
      label: 'SOBRE ALBERTO',
      title: 'Compromiso con el pueblo',
      description: 'Alberto Pantoja es Consejal Rural del cantón Santo Domingo y Director Provincial de la Revolución Ciudadana (RC5) en Santo Domingo de los Tsáchilas. Con una profunda vocación de servicio público, Alberto representa los intereses de las comunidades rurales y urbanas de la provincia.',
      mission: 'Su compromiso abarca el desarrollo integral de las 7 parroquias rurales y todo el territorio rural de la provincia, luchando por mejor infraestructura, servicios de salud, educación, y oportunidades económicas para todos los ciudadanos.',
      stats: {
        years: 'Años de servicio',
        parishes: 'Parroquias rurales',
        projects: 'Proyectos'
      }
    },
    work: {
      label: 'ÁREAS DE TRABAJO',
      title: 'Trabajando por el desarrollo',
      subtitle: 'Por las 7 parroquias rurales y todo el territorio rural de Santo Domingo de los Tsáchilas',
      areas: [
        { title: 'Desarrollo Rural', desc: 'Mejorando la vida de las comunidades campesinas' },
        { title: 'Infraestructura', desc: 'Vías, agua potable y servicios básicos' },
        { title: 'Salud Pública', desc: 'Acceso a atención médica de calidad' },
        { title: 'Educación', desc: 'Oportunidades para niños y jóvenes' },
        { title: 'Economía Local', desc: 'Apoyo a emprendedores y pequeños negocios' },
        { title: 'Comunidad', desc: 'Fortaleciendo el tejido social' }
      ]
    },
    position: {
      label: 'REVOLUCIÓN CIUDADANA',
      title: 'RC5',
      subtitle: 'Por un Ecuador más justo',
      description: 'Como parte del movimiento Revolución Ciudadana, trabajamos por un Ecuador con oportunidades para todos, donde cada ciudadano tenga acceso a servicios básicos, educación de calidad, y la posibilidad de construir un futuro mejor para sus familias.',
      points: [
        'Justicia social y equidad',
        'Desarrollo sostenible',
        'Participación ciudadana',
        'Transparencia en la gestión pública'
      ]
    },
    media: {
      label: 'MEDIOS',
      title: 'Videos y Entrevistas',
      subtitle: 'Mantente informado sobre nuestras actividades y propuestas'
    },
    contact: {
      label: 'CONTACTO',
      title: 'Contáctame',
      subtitle: 'Estoy aquí para escucharte. Tu voz importa.',
      address: 'Santo Domingo de los Tsáchilas, Ecuador'
    },
    footer: {
      slogan: 'La Voz del Campo - Por un Santo Domingo mejor',
      rights: 'Todos los derechos reservados',
      webmaster: 'Sitio web creado por'
    }
  },
  fr: {
    nav: { home: 'Accueil', bio: 'Biographie', work: 'Travail', media: 'Médias', contact: 'Contact', join: 'Rejoignez-nous' },
    hero: {
      subtitle: 'CONSEILLER RURAL DE SANTO DOMINGO',
      title: 'Alberto Pantoja',
      tagline: 'La Voix de la Campagne',
      description: 'Directeur Provincial de la Revolución Ciudadana à Santo Domingo de los Tsáchilas. Travaillant pour le développement intégral de nos communautés.',
      cta: 'Découvrez Mon Travail'
    },
    about: {
      label: 'À PROPOS D\'ALBERTO',
      title: 'Engagement envers le peuple',
      description: 'Alberto Pantoja est Conseiller Rural du canton de Santo Domingo et Directeur Provincial de la Revolución Ciudadana (RC5) à Santo Domingo de los Tsáchilas. Avec une profonde vocation de service public, Alberto représente les intérêts des communautés rurales et urbaines de la province.',
      mission: 'Son engagement couvre le développement intégral des 7 paroisses rurales et de tout le territoire rural de la province, en luttant pour de meilleures infrastructures, des services de santé, l\'éducation et des opportunités économiques pour tous les citoyens.',
      stats: {
        years: 'Années de service',
        parishes: 'Paroisses rurales',
        projects: 'Projets'
      }
    },
    work: {
      label: 'DOMAINES DE TRAVAIL',
      title: 'Travailler pour le développement',
      subtitle: 'Pour les 7 paroisses rurales et tout le territoire rural de Santo Domingo de los Tsáchilas',
      areas: [
        { title: 'Développement Rural', desc: 'Améliorer la vie des communautés paysannes' },
        { title: 'Infrastructure', desc: 'Routes, eau potable et services de base' },
        { title: 'Santé Publique', desc: 'Accès à des soins médicaux de qualité' },
        { title: 'Éducation', desc: 'Opportunités pour les enfants et les jeunes' },
        { title: 'Économie Locale', desc: 'Soutien aux entrepreneurs et petites entreprises' },
        { title: 'Communauté', desc: 'Renforcer le tissu social' }
      ]
    },
    position: {
      label: 'REVOLUCIÓN CIUDADANA',
      title: 'RC5',
      subtitle: 'Pour un Équateur plus juste',
      description: 'En tant que membre du mouvement Revolución Ciudadana, nous travaillons pour un Équateur avec des opportunités pour tous, où chaque citoyen a accès aux services de base, à une éducation de qualité et à la possibilité de construire un meilleur avenir pour sa famille.',
      points: [
        'Justice sociale et équité',
        'Développement durable',
        'Participation citoyenne',
        'Transparence dans la gestion publique'
      ]
    },
    media: {
      label: 'MÉDIAS',
      title: 'Vidéos et Interviews',
      subtitle: 'Restez informé sur nos activités et propositions'
    },
    contact: {
      label: 'CONTACT',
      title: 'Contactez-moi',
      subtitle: 'Je suis là pour vous écouter. Votre voix compte.',
      address: 'Santo Domingo de los Tsáchilas, Équateur'
    },
    footer: {
      slogan: 'La Voix de la Campagne - Pour un meilleur Santo Domingo',
      rights: 'Tous droits réservés',
      webmaster: 'Site web créé par'
    }
  },
  en: {
    nav: { home: 'Home', bio: 'Biography', work: 'Work', media: 'Media', contact: 'Contact', join: 'Join Us' },
    hero: {
      subtitle: 'RURAL COUNCILMAN OF SANTO DOMINGO',
      title: 'Alberto Pantoja',
      tagline: 'The Voice of the Countryside',
      description: 'Provincial Director of Revolución Ciudadana in Santo Domingo de los Tsáchilas. Working for the integral development of our communities.',
      cta: 'See My Work'
    },
    about: {
      label: 'ABOUT ALBERTO',
      title: 'Commitment to the people',
      description: 'Alberto Pantoja is Rural Councilman of Santo Domingo canton and Provincial Director of Revolución Ciudadana (RC5) in Santo Domingo de los Tsáchilas. With a deep vocation for public service, Alberto represents the interests of rural and urban communities in the province.',
      mission: 'His commitment covers the integral development of the 7 rural parishes and the entire rural territory of the province, fighting for better infrastructure, health services, education, and economic opportunities for all citizens.',
      stats: {
        years: 'Years of service',
        parishes: 'Rural parishes',
        projects: 'Projects'
      }
    },
    work: {
      label: 'WORK AREAS',
      title: 'Working for development',
      subtitle: 'For the 7 rural parishes and the entire rural territory of Santo Domingo de los Tsáchilas',
      areas: [
        { title: 'Rural Development', desc: 'Improving the lives of rural communities' },
        { title: 'Infrastructure', desc: 'Roads, drinking water and basic services' },
        { title: 'Public Health', desc: 'Access to quality medical care' },
        { title: 'Education', desc: 'Opportunities for children and youth' },
        { title: 'Local Economy', desc: 'Support for entrepreneurs and small businesses' },
        { title: 'Community', desc: 'Strengthening the social fabric' }
      ]
    },
    position: {
      label: 'REVOLUCIÓN CIUDADANA',
      title: 'RC5',
      subtitle: 'For a fairer Ecuador',
      description: 'As part of the Revolución Ciudadana movement, we work for an Ecuador with opportunities for all, where every citizen has access to basic services, quality education, and the possibility to build a better future for their families.',
      points: [
        'Social justice and equity',
        'Sustainable development',
        'Citizen participation',
        'Transparency in public management'
      ]
    },
    media: {
      label: 'MEDIA',
      title: 'Videos and Interviews',
      subtitle: 'Stay informed about our activities and proposals'
    },
    contact: {
      label: 'CONTACT',
      title: 'Contact Me',
      subtitle: 'I\'m here to listen. Your voice matters.',
      address: 'Santo Domingo de los Tsáchilas, Ecuador'
    },
    footer: {
      slogan: 'The Voice of the Countryside - For a better Santo Domingo',
      rights: 'All rights reserved',
      webmaster: 'Website created by'
    }
  }
};

// Working video embeds (Facebook and YouTube)
const WORKING_VIDEOS = [
  {
    type: 'youtube',
    id: 'IZruu3cScWM',
    title: '¿Qué tiene en común con Rafael Correa?'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/elboligraforojoztv/videos/964375001521446/',
    title: '¿Quién es Alberto Pantoja?'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/391366400133630/',
    title: 'Mensaje a los jóvenes'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/1202824487276299/',
    title: 'Alberto Pantoja La voz del campo'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/alberto.p.guzman.7/videos/749319879738556/',
    title: 'Entrevista'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/867916851242102/',
    title: 'Otonga café en Alluriquín'
  }
];

// Gallery photos - paths only, IMG() applied at render time
const GALLERY_PHOTO_PATHS = [
  '/images/albertopantoja/Alberto/472952303_18477340369043721_5011479368151296835_n.jpg',
  '/images/albertopantoja/Alberto/478641831_653342143704312_3590459736061452532_n.jpg',
  '/images/albertopantoja/Alberto/480204303_656629500042243_9125989698012357854_n.jpg',
  '/images/albertopantoja/Alberto/480234149_655075170197676_3095455821364526613_n.jpg',
  '/images/albertopantoja/Alberto/480307455_655548596817000_7185293510812986926_n.jpg',
  '/images/albertopantoja/Alberto/480420139_656203370084856_4617900264739168853_n.jpg',
  '/images/albertopantoja/Alberto/480421906_655550936816766_6945101436370099127_n.jpg',
  '/images/albertopantoja/Alberto/480491262_655706246801235_7747192686795289121_n.jpg',
  '/images/albertopantoja/Alberto/480507403_656621136709746_5365126592573174961_n.jpg',
  '/images/albertopantoja/Alberto/480515354_655679926803867_5651133536485746327_n.jpg',
  '/images/albertopantoja/Alberto/480597505_657290146642845_592043654360335281_n.jpg',
  '/images/albertopantoja/Alberto/480707479_664558439249349_1595257261308133666_n.jpg',
  '/images/albertopantoja/Alberto/480709251_663836895988170_3797412518251391390_n.jpg',
  '/images/albertopantoja/Alberto/480711549_664567345915125_5958413020413343586_n.jpg',
  '/images/albertopantoja/Alberto/480713334_664562685915591_5007164056289956623_n.jpg',
  '/images/albertopantoja/Alberto/480774037_663522822686244_2715016025777416478_n.jpg',
  '/images/albertopantoja/Alberto/480786370_659474339757759_5500208258288237982_n.jpg',
  '/images/albertopantoja/Alberto/480791234_663504932688033_8187670340233454988_n.jpg',
  '/images/albertopantoja/Alberto/480807994_661243509580842_7638301278192419863_n.jpg',
  '/images/albertopantoja/Alberto/480826221_661238332914693_1950222681443014752_n.jpg',
  '/images/albertopantoja/Alberto/480860472_657275016644358_1581221998482835370_n.jpg',
  '/images/albertopantoja/Alberto/480983630_663666932671833_6619852466579408832_n.jpg',
  '/images/albertopantoja/Alberto/480994438_663829629322230_3965225250880568579_n.jpg',
  '/images/albertopantoja/Alberto/480996918_663503959354797_8069443481933364202_n.jpg',
];

// Images
const IMAGES = {
  logo: IMG('/images/albertopantoja/logo.jpg'),
  profileMain: IMG('/images/albertopantoja/profile-main.jpg'),
  heroBackground: IMG('/images/albertopantoja/hero-background.png'),
  soilHands: IMG('/images/albertopantoja/soil-hands.png'),
  rc5Logo: IMG('/images/albertopantoja/rc5-logo.png'),
  fworksLogo: IMG('/images/fworksbuilders.png')
};

// Social links
const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/AlbertoPantojaRC5/',
  tiktok: 'https://www.tiktok.com/@albertopantojasgb',
  linkedin: 'https://ec.linkedin.com/in/alberto-pantoja-guzman-2b919bb0'
};

const AlbertoPantojaApp = () => {
  const [language, setLanguage] = useState('es');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const t = translations[language];

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'bio', 'work', 'gallery', 'media', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // Work area icons
  const workIcons = [Building, Home, Heart, GraduationCap, Briefcase, Users];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Manrope', sans-serif" }}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      
      {/* Header - Blue theme */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/90 border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3" data-testid="header-logo">
              <img src={IMAGES.logo} alt="Alberto Pantoja" className="h-10 md:h-12 w-auto rounded-full border-2 border-blue-600" />
              <div className="hidden sm:block">
                <div className="text-blue-900 font-bold text-sm md:text-base">Alberto Pantoja</div>
                <div className="text-red-600 text-xs font-semibold">RC5 - La Voz del Campo</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {['home', 'bio', 'work', 'gallery', 'media', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  data-testid={`nav-${section}-link`}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === section
                      ? 'text-red-600'
                      : 'text-blue-900 hover:text-red-600'
                  }`}
                >
                  {section === 'gallery' ? (language === 'es' ? 'Fotos' : language === 'fr' ? 'Photos' : 'Photos') : t.nav[section]}
                </button>
              ))}
            </nav>

            {/* Language Switcher & CTA */}
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="hidden sm:flex items-center gap-1 text-sm" data-testid="language-switcher">
                {['es', 'fr', 'en'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    data-testid={`lang-${lang}-btn`}
                    className={`px-2 py-1 rounded transition-colors ${
                      language === lang
                        ? 'bg-blue-600 text-white'
                        : 'text-blue-900 hover:bg-blue-100'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="nav-join-btn"
                className="hidden md:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
              >
                {t.nav.join}
                <ChevronRight className="w-4 h-4" />
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-blue-900"
                data-testid="mobile-menu-btn"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-blue-100">
            <div className="px-4 py-4 space-y-3">
              {['home', 'bio', 'work', 'gallery', 'media', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  data-testid={`mobile-nav-${section}`}
                  className="block w-full text-left px-3 py-2 text-blue-900 hover:bg-blue-50 rounded"
                >
                  {section === 'gallery' ? (language === 'es' ? 'Fotos' : language === 'fr' ? 'Photos' : 'Photos') : t.nav[section]}
                </button>
              ))}
              <div className="flex items-center gap-2 px-3 pt-2 border-t border-blue-100">
                {['es', 'fr', 'en'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded text-sm ${
                      language === lang
                        ? 'bg-blue-600 text-white'
                        : 'text-blue-900 bg-blue-50'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - Blue/Red/White */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900"
        data-testid="hero-section"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-red-600" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <p className="text-red-400 text-xs md:text-sm font-semibold tracking-[0.2em] mb-4">
                {t.hero.subtitle}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-2">
                {t.hero.title}
              </h1>
              <p className="text-2xl sm:text-3xl font-bold text-red-400 mb-6">
                {t.hero.tagline}
              </p>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl mx-auto lg:mx-0">
                {t.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection('work')}
                  data-testid="hero-cta-btn"
                  className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors shadow-lg"
                >
                  {t.hero.cta}
                  <ChevronRight className="w-5 h-5" />
                </button>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="hero-facebook-btn"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors border border-white/30"
                >
                  <Facebook className="w-5 h-5" />
                  Facebook
                </a>
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-red-600/30 rounded-full blur-2xl" />
                <img
                  src={IMAGES.profileMain}
                  alt="Alberto Pantoja"
                  className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white shadow-2xl"
                  data-testid="hero-profile-img"
                />
                <div className="absolute -bottom-4 -right-4 bg-red-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">
                  RC5
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* About/Bio Section */}
      <section id="bio" className="py-20 md:py-32 bg-gray-50" data-testid="bio-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src={IMAGES.profileMain}
                alt="Alberto Pantoja"
                className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
                data-testid="bio-image"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
                <Users className="w-8 h-8" />
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-red-600 text-xs font-semibold tracking-[0.2em] mb-4">
                {t.about.label}
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 tracking-tight mb-6">
                {t.about.title}
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {t.about.description}
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {t.about.mission}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-xl shadow-md border-t-4 border-blue-600">
                  <div className="text-3xl font-extrabold text-blue-600">10+</div>
                  <div className="text-sm text-gray-600">{t.about.stats.years}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md border-t-4 border-red-600">
                  <div className="text-3xl font-extrabold text-red-600">7</div>
                  <div className="text-sm text-gray-600">{t.about.stats.parishes}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md border-t-4 border-blue-600">
                  <div className="text-3xl font-extrabold text-blue-600">50+</div>
                  <div className="text-sm text-gray-600">{t.about.stats.projects}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Areas Section */}
      <section id="work" className="py-20 md:py-32 bg-white" data-testid="work-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-red-600 text-xs font-semibold tracking-[0.2em] mb-4">
              {t.work.label}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 tracking-tight mb-4">
              {t.work.title}
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              {t.work.subtitle}
            </p>
          </div>

          {/* Work Areas Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.work.areas.map((area, index) => {
              const Icon = workIcons[index];
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow border-l-4 border-blue-600"
                  data-testid={`work-area-${index}`}
                >
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3">{area.title}</h3>
                  <p className="text-gray-600">{area.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Political Position Section - RC5 */}
      <section className="py-20 md:py-32 bg-blue-900" data-testid="position-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <p className="text-red-400 text-xs font-semibold tracking-[0.2em] mb-4">
                {t.position.label}
              </p>
              <div className="flex items-center gap-4 mb-6">
                {/* RC5 Logo placeholder - user needs to provide actual logo */}
                <div className="bg-white rounded-xl p-3">
                  <div className="text-3xl font-extrabold text-blue-900">RC<span className="text-red-600">5</span></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  {t.position.title}
                </h2>
              </div>
              <p className="text-2xl text-red-400 font-semibold mb-6">
                {t.position.subtitle}
              </p>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                {t.position.description}
              </p>

              {/* Points */}
              <ul className="space-y-4">
                {t.position.points.map((point, index) => (
                  <li key={index} className="flex items-center gap-3 text-white">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                    <span className="text-lg">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Icon Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
                <Users className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <div className="text-white font-semibold">Comunidad</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
                <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <div className="text-white font-semibold">Salud</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
                <GraduationCap className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <div className="text-white font-semibold">Educación</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
                <MapPin className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <div className="text-white font-semibold">7 Parroquias</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className="py-20 md:py-32 bg-white" data-testid="gallery-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-red-600 text-xs font-semibold tracking-[0.2em] mb-4">
              {language === 'es' ? 'GALERÍA' : language === 'fr' ? 'GALERIE' : 'GALLERY'}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 tracking-tight mb-4">
              {language === 'es' ? 'Momentos con la Comunidad' : language === 'fr' ? 'Moments avec la Communauté' : 'Moments with the Community'}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {language === 'es' ? 'Imágenes de nuestro trabajo en las parroquias rurales de Santo Domingo de los Tsáchilas' : 
               language === 'fr' ? 'Images de notre travail dans les paroisses rurales de Santo Domingo de los Tsáchilas' :
               'Images from our work in the rural parishes of Santo Domingo de los Tsáchilas'}
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GALLERY_PHOTO_PATHS.slice(0, 24).map((photoPath, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
                data-testid={`gallery-photo-${index}`}
              >
                <img
                  src={IMG(photoPath)}
                  alt={`Alberto Pantoja - Foto ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-12">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors"
            >
              <Facebook className="w-5 h-5" />
              {language === 'es' ? 'Ver más en Facebook' : language === 'fr' ? 'Voir plus sur Facebook' : 'See more on Facebook'}
            </a>
          </div>
        </div>
      </section>

      {/* Media/Videos Section */}
      <section id="media" className="py-20 md:py-32 bg-gray-50" data-testid="media-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-red-600 text-xs font-semibold tracking-[0.2em] mb-4">
              {t.media.label}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 tracking-tight mb-4">
              {t.media.title}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t.media.subtitle}
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WORKING_VIDEOS.map((video, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
                data-testid={`video-card-${index}`}
              >
                <div className="aspect-video">
                  {video.type === 'youtube' ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <iframe
                      src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.url)}&show_text=0&width=560`}
                      title={video.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {video.type === 'youtube' ? (
                      <Youtube className="w-5 h-5 text-red-600" />
                    ) : (
                      <Facebook className="w-5 h-5 text-blue-600" />
                    )}
                    <span className="text-xs text-gray-500 uppercase">
                      {video.type === 'youtube' ? 'YouTube' : 'Facebook'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-blue-900">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Síguenos en redes sociales</p>
            <div className="flex justify-center gap-4">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-facebook"
                className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-tiktok"
                className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-linkedin"
                className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-white" data-testid="contact-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-red-600 text-xs font-semibold tracking-[0.2em] mb-4">
              {t.contact.label}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 tracking-tight mb-4">
              {t.contact.title}
            </h2>
            <p className="text-gray-600 text-lg">
              {t.contact.subtitle}
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin className="w-5 h-5 text-red-600" />
              <span>{t.contact.address}</span>
            </div>
          </div>

          {/* JotForm Embed Placeholder */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-200" data-testid="contact-form-container">
            <div className="text-center text-gray-600">
              <Mail className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <p className="text-lg font-semibold text-blue-900 mb-2">Formulario de Contacto</p>
              <p className="text-sm mb-4">JotForm será integrado aquí</p>
              {/* JotForm iframe placeholder - replace with actual form ID */}
              <div className="bg-white rounded-xl p-8 min-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-300">
                <p className="text-gray-500">
                  Inserte el enlace de JotForm para activar el formulario de contacto
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 py-12" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo & Slogan */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <img src={IMAGES.logo} alt="Alberto Pantoja" className="h-10 w-auto rounded-full border-2 border-white" />
                <span className="text-white font-bold">Alberto Pantoja</span>
              </div>
              <p className="text-blue-200 text-sm">{t.footer.slogan}</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-red-400 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-red-400 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>

            {/* Webmaster */}
            <div className="text-center md:text-right">
              <p className="text-blue-300 text-xs mb-2">{t.footer.webmaster}</p>
              <a
                href="https://fworksbuilders.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img src={IMAGES.fworksLogo} alt="fworksbuilders" className="h-6 w-auto opacity-60 hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-blue-300 text-sm">
              © {new Date().getFullYear()} Alberto Pantoja - La Voz del Campo. {t.footer.rights}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AlbertoPantojaApp;
