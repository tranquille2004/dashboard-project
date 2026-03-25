import React, { useState, useEffect } from 'react';
import { Menu, X, Facebook, Youtube, Linkedin, MapPin, Mail, Phone, ChevronRight, Users, Leaf, Building } from 'lucide-react';

// Helper for production image paths
const IMG = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const isProduction = typeof window !== 'undefined' && window.location.hostname.includes('.emergent.host');
  if (isProduction && path.startsWith('/images/')) {
    return '/api' + path;
  }
  return path;
};

// Translations
const translations = {
  es: {
    nav: { home: 'Inicio', bio: 'Biografía', media: 'Medios', contact: 'Contacto', join: 'Únete' },
    hero: {
      subtitle: 'CONSEJAL DE SANTO DOMINGO',
      title: 'La Voz del Campo',
      description: 'Director Provincial de la Revolución Ciudadana en Santo Domingo de los Tsáchilas',
      cta: 'Conoce Más'
    },
    about: {
      label: 'SOBRE ALBERTO',
      title: 'Un líder del pueblo, para el pueblo',
      description: 'Alberto Pantoja es Consejal del cantón Santo Domingo y Director Provincial de la Revolución Ciudadana (RC5) en Santo Domingo de los Tsáchilas. Con profundas raíces en el campo ecuatoriano, Alberto representa la voz de los trabajadores rurales, agricultores y comunidades campesinas.',
      mission: 'Su misión es fortalecer el desarrollo rural, mejorar las condiciones de vida de las 7 parroquias rurales y garantizar que cada ciudadano tenga acceso a servicios básicos y oportunidades de crecimiento.',
      stats: {
        years: 'Años de servicio',
        communities: 'Comunidades',
        projects: 'Proyectos'
      }
    },
    position: {
      label: 'POSICIÓN POLÍTICA',
      title: 'Revolución Ciudadana',
      subtitle: 'Por el desarrollo de nuestras 7 parroquias rurales',
      description: 'Como parte de la Revolución Ciudadana, luchamos por un Ecuador más justo, con oportunidades para todos. Defendemos los derechos de los campesinos, la soberanía alimentaria y el desarrollo sostenible de nuestras comunidades.',
      points: [
        'Desarrollo rural integral',
        'Apoyo a pequeños agricultores',
        'Infraestructura para comunidades',
        'Educación y salud para todos'
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
      slogan: 'La Voz del Campo - Por un Ecuador justo',
      rights: 'Todos los derechos reservados',
      webmaster: 'Sitio web creado por'
    }
  },
  fr: {
    nav: { home: 'Accueil', bio: 'Biographie', media: 'Médias', contact: 'Contact', join: 'Rejoignez-nous' },
    hero: {
      subtitle: 'CONSEILLER DE SANTO DOMINGO',
      title: 'La Voix de la Campagne',
      description: 'Directeur Provincial de la Revolución Ciudadana à Santo Domingo de los Tsáchilas',
      cta: 'En Savoir Plus'
    },
    about: {
      label: 'À PROPOS D\'ALBERTO',
      title: 'Un leader du peuple, pour le peuple',
      description: 'Alberto Pantoja est Conseiller du canton de Santo Domingo et Directeur Provincial de la Revolución Ciudadana (RC5) à Santo Domingo de los Tsáchilas. Avec de profondes racines dans la campagne équatorienne, Alberto représente la voix des travailleurs ruraux, des agriculteurs et des communautés paysannes.',
      mission: 'Sa mission est de renforcer le développement rural, d\'améliorer les conditions de vie des 7 paroisses rurales et de garantir que chaque citoyen ait accès aux services de base et aux opportunités de croissance.',
      stats: {
        years: 'Années de service',
        communities: 'Communautés',
        projects: 'Projets'
      }
    },
    position: {
      label: 'POSITION POLITIQUE',
      title: 'Revolución Ciudadana',
      subtitle: 'Pour le développement de nos 7 paroisses rurales',
      description: 'En tant que membre de la Revolución Ciudadana, nous luttons pour un Équateur plus juste, avec des opportunités pour tous. Nous défendons les droits des paysans, la souveraineté alimentaire et le développement durable de nos communautés.',
      points: [
        'Développement rural intégral',
        'Soutien aux petits agriculteurs',
        'Infrastructure pour les communautés',
        'Éducation et santé pour tous'
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
      slogan: 'La Voix de la Campagne - Pour un Équateur juste',
      rights: 'Tous droits réservés',
      webmaster: 'Site web créé par'
    }
  },
  en: {
    nav: { home: 'Home', bio: 'Biography', media: 'Media', contact: 'Contact', join: 'Join Us' },
    hero: {
      subtitle: 'COUNCILMAN OF SANTO DOMINGO',
      title: 'The Voice of the Countryside',
      description: 'Provincial Director of Revolución Ciudadana in Santo Domingo de los Tsáchilas',
      cta: 'Learn More'
    },
    about: {
      label: 'ABOUT ALBERTO',
      title: 'A leader of the people, for the people',
      description: 'Alberto Pantoja is a Councilman of Santo Domingo canton and Provincial Director of Revolución Ciudadana (RC5) in Santo Domingo de los Tsáchilas. With deep roots in the Ecuadorian countryside, Alberto represents the voice of rural workers, farmers and peasant communities.',
      mission: 'His mission is to strengthen rural development, improve living conditions in the 7 rural parishes and ensure that every citizen has access to basic services and growth opportunities.',
      stats: {
        years: 'Years of service',
        communities: 'Communities',
        projects: 'Projects'
      }
    },
    position: {
      label: 'POLITICAL POSITION',
      title: 'Revolución Ciudadana',
      subtitle: 'For the development of our 7 rural parishes',
      description: 'As part of Revolución Ciudadana, we fight for a fairer Ecuador with opportunities for all. We defend the rights of peasants, food sovereignty and the sustainable development of our communities.',
      points: [
        'Integral rural development',
        'Support for small farmers',
        'Infrastructure for communities',
        'Education and health for all'
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
      slogan: 'The Voice of the Countryside - For a fair Ecuador',
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
      const sections = ['home', 'bio', 'media', 'contact'];
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

  return (
    <div className="min-h-screen bg-[#F6F7F2]" style={{ fontFamily: "'Manrope', sans-serif" }}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-[#00A75D]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3" data-testid="header-logo">
              <img src={IMAGES.logo} alt="Alberto Pantoja" className="h-10 md:h-12 w-auto rounded-full" />
              <div className="hidden sm:block">
                <div className="text-[#1A2B22] font-bold text-sm md:text-base">Alberto Pantoja</div>
                <div className="text-[#00A75D] text-xs">RC5 - La Voz del Campo</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {['home', 'bio', 'media', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  data-testid={`nav-${section}-link`}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === section
                      ? 'text-[#00A75D]'
                      : 'text-[#4A5D53] hover:text-[#00A75D]'
                  }`}
                >
                  {t.nav[section]}
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
                        ? 'bg-[#00A75D] text-white'
                        : 'text-[#4A5D53] hover:bg-[#00A75D]/10'
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
                className="hidden md:flex items-center gap-2 bg-[#00A75D] hover:bg-[#008B4D] text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
              >
                {t.nav.join}
                <ChevronRight className="w-4 h-4" />
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#1A2B22]"
                data-testid="mobile-menu-btn"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#D5D9CE]">
            <div className="px-4 py-4 space-y-3">
              {['home', 'bio', 'media', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  data-testid={`mobile-nav-${section}`}
                  className="block w-full text-left px-3 py-2 text-[#1A2B22] hover:bg-[#00A75D]/10 rounded"
                >
                  {t.nav[section]}
                </button>
              ))}
              <div className="flex items-center gap-2 px-3 pt-2 border-t border-[#D5D9CE]">
                {['es', 'fr', 'en'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded text-sm ${
                      language === lang
                        ? 'bg-[#00A75D] text-white'
                        : 'text-[#4A5D53] bg-[#E8EAE0]'
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

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20"
        data-testid="hero-section"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.heroBackground})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <p className="text-[#00A75D] text-xs md:text-sm font-semibold tracking-[0.2em] mb-4">
                {t.hero.subtitle}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
                {t.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto lg:mx-0">
                {t.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection('bio')}
                  data-testid="hero-cta-btn"
                  className="inline-flex items-center justify-center gap-2 bg-[#00A75D] hover:bg-[#008B4D] text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors"
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
                <div className="absolute -inset-4 bg-[#00A75D]/20 rounded-full blur-2xl" />
                <img
                  src={IMAGES.profileMain}
                  alt="Alberto Pantoja"
                  className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white shadow-2xl"
                  data-testid="hero-profile-img"
                />
                <div className="absolute -bottom-4 -right-4 bg-[#00A75D] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
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
      <section id="bio" className="py-20 md:py-32 bg-white" data-testid="bio-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src={IMAGES.soilHands}
                alt="La Voz del Campo"
                className="w-full rounded-2xl shadow-xl"
                data-testid="bio-image"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#00A75D] text-white p-6 rounded-2xl shadow-lg">
                <Leaf className="w-8 h-8" />
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-[#00A75D] text-xs font-semibold tracking-[0.2em] mb-4">
                {t.about.label}
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A2B22] tracking-tight mb-6">
                {t.about.title}
              </h2>
              <p className="text-[#4A5D53] text-lg mb-6 leading-relaxed">
                {t.about.description}
              </p>
              <p className="text-[#4A5D53] text-lg mb-8 leading-relaxed">
                {t.about.mission}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 bg-[#F6F7F2] rounded-xl">
                  <div className="text-3xl font-extrabold text-[#00A75D]">10+</div>
                  <div className="text-sm text-[#4A5D53]">{t.about.stats.years}</div>
                </div>
                <div className="text-center p-4 bg-[#F6F7F2] rounded-xl">
                  <div className="text-3xl font-extrabold text-[#00A75D]">7</div>
                  <div className="text-sm text-[#4A5D53]">{t.about.stats.communities}</div>
                </div>
                <div className="text-center p-4 bg-[#F6F7F2] rounded-xl">
                  <div className="text-3xl font-extrabold text-[#00A75D]">50+</div>
                  <div className="text-sm text-[#4A5D53]">{t.about.stats.projects}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Political Position Section */}
      <section className="py-20 md:py-32 bg-[#1A2B22]" data-testid="position-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <p className="text-[#00A75D] text-xs font-semibold tracking-[0.2em] mb-4">
                {t.position.label}
              </p>
              <div className="flex items-center gap-4 mb-6">
                <img src={IMAGES.rc5Logo} alt="RC5" className="h-16 w-auto" />
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  {t.position.title}
                </h2>
              </div>
              <p className="text-2xl text-[#00A75D] font-semibold mb-6">
                {t.position.subtitle}
              </p>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                {t.position.description}
              </p>

              {/* Points */}
              <ul className="space-y-4">
                {t.position.points.map((point, index) => (
                  <li key={index} className="flex items-center gap-3 text-white">
                    <div className="w-8 h-8 bg-[#00A75D] rounded-full flex items-center justify-center flex-shrink-0">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                    <span className="text-lg">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Icon Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                <Users className="w-12 h-12 text-[#00A75D] mx-auto mb-4" />
                <div className="text-white font-semibold">Comunidad</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                <Leaf className="w-12 h-12 text-[#00A75D] mx-auto mb-4" />
                <div className="text-white font-semibold">Agricultura</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                <Building className="w-12 h-12 text-[#00A75D] mx-auto mb-4" />
                <div className="text-white font-semibold">Infraestructura</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                <MapPin className="w-12 h-12 text-[#00A75D] mx-auto mb-4" />
                <div className="text-white font-semibold">7 Parroquias</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media/Videos Section */}
      <section id="media" className="py-20 md:py-32 bg-[#F6F7F2]" data-testid="media-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-[#00A75D] text-xs font-semibold tracking-[0.2em] mb-4">
              {t.media.label}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A2B22] tracking-tight mb-4">
              {t.media.title}
            </h2>
            <p className="text-[#4A5D53] text-lg max-w-2xl mx-auto">
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
                    <span className="text-xs text-[#4A5D53] uppercase">
                      {video.type === 'youtube' ? 'YouTube' : 'Facebook'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#1A2B22]">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="mt-12 text-center">
            <p className="text-[#4A5D53] mb-4">Síguenos en redes sociales</p>
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
            <p className="text-[#00A75D] text-xs font-semibold tracking-[0.2em] mb-4">
              {t.contact.label}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A2B22] tracking-tight mb-4">
              {t.contact.title}
            </h2>
            <p className="text-[#4A5D53] text-lg">
              {t.contact.subtitle}
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-3 text-[#4A5D53]">
              <MapPin className="w-5 h-5 text-[#00A75D]" />
              <span>{t.contact.address}</span>
            </div>
          </div>

          {/* JotForm Embed Placeholder */}
          <div className="bg-[#F6F7F2] rounded-2xl p-8 shadow-lg" data-testid="contact-form-container">
            <div className="text-center text-[#4A5D53]">
              <Mail className="w-12 h-12 mx-auto mb-4 text-[#00A75D]" />
              <p className="text-lg font-semibold mb-2">Formulario de Contacto</p>
              <p className="text-sm mb-4">JotForm será integrado aquí</p>
              {/* JotForm iframe placeholder - replace with actual form ID */}
              <div className="bg-white rounded-xl p-8 min-h-[400px] flex items-center justify-center border-2 border-dashed border-[#D5D9CE]">
                <p className="text-[#4A5D53]">
                  Inserte el enlace de JotForm para activar el formulario de contacto
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A2B22] py-12" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo & Slogan */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <img src={IMAGES.logo} alt="Alberto Pantoja" className="h-10 w-auto rounded-full" />
                <span className="text-white font-bold">Alberto Pantoja</span>
              </div>
              <p className="text-white/60 text-sm">{t.footer.slogan}</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#00A75D] transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#00A75D] transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>

            {/* Webmaster */}
            <div className="text-center md:text-right">
              <p className="text-white/40 text-xs mb-2">{t.footer.webmaster}</p>
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
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Alberto Pantoja - La Voz del Campo. {t.footer.rights}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AlbertoPantojaApp;
