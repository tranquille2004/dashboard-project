import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useBasePath } from '../contexts/BasePathContext';
import { translations } from '../data/translations';
import { ChevronRight } from 'lucide-react';

// SEO Configuration for Il Siciliano
const SEO_CONFIG = {
  siteName: 'Il Siciliano',
  defaultImage: '/images/ilsiciliano/home/hero.jpg',
  baseUrl: 'https://ilsiciliano.fworksbuilders.com',
  title: 'Il Siciliano | Trattoria Pizzería — Santo Domingo, Ecuador',
  description: 'Il Siciliano — auténtica cocina siciliana en Santo Domingo de los Tsáchilas. Pasta fresca, pizza de horno de leña, especialidades de Sicilia. Reserva tu mesa.',
  keywords: 'restaurante italiano Santo Domingo, pizzería Ecuador, cocina siciliana, Il Siciliano, trattoria, pizza horno de leña'
};

const Home = () => {
  const { language } = useLanguage();
  const basePath = useBasePath();
  const t = translations;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // SEO Effect
  useEffect(() => {
    document.title = SEO_CONFIG.title;
    
    const setMeta = (name, content, isProperty = false) => {
      if (!content) return;
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    setMeta('description', SEO_CONFIG.description);
    setMeta('keywords', SEO_CONFIG.keywords);
    setMeta('og:title', SEO_CONFIG.title, true);
    setMeta('og:description', SEO_CONFIG.description, true);
    setMeta('og:image', SEO_CONFIG.defaultImage, true);
    setMeta('og:url', SEO_CONFIG.baseUrl, true);
    setMeta('og:site_name', SEO_CONFIG.siteName, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', SEO_CONFIG.title);
    setMeta('twitter:description', SEO_CONFIG.description);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Mobile-only logo bar above the video */}
      <div className="md:hidden bg-black flex justify-center items-center pt-24 pb-6">
        <img
          src="/images/ilsiciliano/logo/ilsiciliano-logo.png"
          alt="Il Siciliano"
          className="h-32 w-auto"
        />
      </div>

      {/* Hero Section with Parallax */}
      <section className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden py-12 md:py-32">
        {/* Video backdrop: compilation of restaurant action */}
        <div className="absolute inset-0 z-0">
          <video
            src="/images/ilsiciliano/home/video/hero-compilation.mp4"
            poster="/images/ilsiciliano/home/video/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          {/* Warm Italian-tinted overlay for readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(70% 55% at 18% 22%, rgba(0,146,70,0.20) 0%, transparent 60%),' +
                'radial-gradient(60% 50% at 82% 20%, rgba(206,43,55,0.20) 0%, transparent 60%),' +
                'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.65) 100%)'
            }}
          />
        </div>

        {/* Hero Content - left-aligned so the center of the video stays visible */}
        <div className="relative z-10 px-4 sm:px-8 lg:px-16 animate-fade-in w-full max-w-7xl mx-auto text-center md:text-left">
          {/* Logo only visible on desktop (mobile shows logo bar above the video) */}
          <div className="mb-8 hidden md:flex justify-center md:justify-start">
            <img
              src="/images/ilsiciliano/logo/ilsiciliano-logo.png"
              alt="Il Siciliano"
              className="h-40 md:h-56 lg:h-64 w-auto drop-shadow-[0_10px_40px_rgba(0,0,0,0.7)]"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            {t.home.welcome[language]}
          </h1>
          <p className="text-xl md:text-2xl text-gold/90 mb-12 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            {t.home.subtitle[language]}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to={`${basePath}/reserve`}
              className="group inline-flex items-center justify-center px-8 py-4 bg-gold text-black font-bold rounded-lg hover:bg-gold/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t.home.cta.reserve[language]}
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to={`${basePath}/takeaway`}
              className="group inline-flex items-center justify-center px-8 py-4 bg-gold text-black font-bold rounded-lg hover:bg-gold/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t.home.cta.takeaway[language]}
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Section - background Emanuele with filter */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        {/* Background image: Emanuele in the kitchen */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/ilsiciliano/about/emanuele-cocina.jpg"
            alt="Emanuele en la cocina"
            className="w-full h-full object-cover object-center"
          />
          {/* Cinematic warm filter for readability and Italian mood */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.30) 100%),' +
                'radial-gradient(60% 50% at 75% 30%, rgba(206,43,55,0.18) 0%, transparent 70%),' +
                'radial-gradient(60% 50% at 90% 80%, rgba(0,146,70,0.14) 0%, transparent 70%)'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6 animate-slide-in-left">
            <div className="flex items-center gap-3">
              <span className="inline-block w-12 h-1 bg-italian-green rounded-full"></span>
              <span className="text-italian-green font-semibold tracking-wider uppercase text-sm">Il Siciliano</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gold drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {{
                nl: 'Experiencia Siciliana Auténtica',
                fr: 'Expérience Italienne Authentique',
                en: 'Authentic Italian Experience',
                es: 'Experiencia Italiana Auténtica',
                de: 'Authentisches Italienisches Erlebnis',
                it: 'Esperienza Italiana Autentica'
              }[language]}
            </h2>
            <p className="text-gray-100 text-lg leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              {{
                nl: 'In het hart van Santo Domingo biedt Il Siciliano u een unieke culinaire ervaring. Met onze prachtige pizza oven en open keuken ziet u bij binnenkomst direct het universum van ons gastronomisch geheel.',
                fr: 'Au cœur de Santo Domingo, Il Siciliano vous offre une expérience culinaire unique. Avec notre magnifique four à pizza et notre cuisine ouverte, vous voyez directement en entrant l\'univers de notre ensemble gastronomique.',
                en: 'In the heart of Santo Domingo, Il Siciliano offers you a unique culinary experience. With our beautiful pizza oven and open kitchen, you immediately see the universe of our gastronomic whole upon entering.',
                es: 'En el corazón de Santo Domingo, Il Siciliano le ofrece una experiencia culinaria única. Con nuestro hermoso horno de pizza y cocina abierta, ve inmediatamente el universo de nuestro conjunto gastronómico al entrar.',
                de: 'Im Herzen von Santo Domingo bietet Ihnen Il Siciliano ein einzigartiges kulinarisches Erlebnis. Mit unserem schönen Pizzaofen und der offenen Küche sehen Sie beim Betreten sofort das Universum unseres gastronomischen Ganzen.',
                it: 'Nel cuore di Santo Domingo, Il Siciliano vi offre un\'esperienza culinaria unica. Con il nostro bellissimo forno per pizza e la cucina a vista, entrando vedete immediatamente l\'universo del nostro insieme gastronomico.'
              }[language]}
            </p>
            <Link
              to={`${basePath}/about`}
              className="inline-flex items-center text-gold hover:text-gold/80 transition-colors font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
            >
              {{
                nl: 'Lees ons verhaal',
                fr: 'Lire notre histoire',
                en: 'Read our story',
                es: 'Lee nuestra historia',
                de: 'Lesen Sie unsere Geschichte',
                it: 'Leggi la nostra storia'
              }[language]}
              <ChevronRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                img: '/images/ilsiciliano/menu/dish1.jpg',
                title: { nl: 'Calidad Italiana', fr: 'Qualité Italienne', en: 'Italian Quality', es: 'Calidad Italiana', de: 'Italienische Qualität', it: 'Qualità Italiana' },
                desc: { nl: 'Ingredientes sicilianos auténticos', fr: 'Ingrédients italiens authentiques', en: 'Authentic Italian ingredients', es: 'Ingredientes italianos auténticos', de: 'Authentische italienische Zutaten', it: 'Ingredienti italiani autentici' }
              },
              {
                img: '/images/ilsiciliano/menu/pizza.jpg',
                title: { nl: 'Verse Bereiding', fr: 'Préparation Fraîche', en: 'Fresh Preparation', es: 'Preparación Fresca', de: 'Frische Zubereitung', it: 'Preparazione Fresca' },
                desc: { nl: 'Dagelijks vers bereid', fr: 'Préparé frais quotidiennement', en: 'Freshly prepared daily', es: 'Preparado fresco diariamente', de: 'Täglich frisch zubereitet', it: 'Preparato fresco ogni giorno' }
              },
              {
                img: '/images/ilsiciliano/home/ambiance.jpg',
                title: { nl: 'Elegante Ambiance', fr: 'Ambiance Élégante', en: 'Elegant Ambiance', es: 'Ambiente Elegante', de: 'Elegantes Ambiente', it: 'Ambiente Elegante' },
                desc: { nl: 'Verfijnde eetervaring', fr: 'Expérience culinaire raffinée', en: 'Refined dining experience', es: 'Experiencia gastronómica refinada', de: 'Raffiniertes Speiseerlebnis', it: 'Esperienza culinaria raffinata' }
              }
            ].map((feature, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${idx * 0.2}s` }}>
                <div className="relative h-64">
                  <img
                    src={feature.img}
                    alt={feature.title[language] || feature.title.nl}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold text-gold mb-2">{feature.title[language] || feature.title.nl}</h3>
                  <p className="text-gray-300">{feature.desc[language] || feature.desc.nl}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black border-t-4 border-italian-green">
        <div className="ilsiciliano-tricolor-bar absolute left-0 right-0 -mt-24" aria-hidden="true">
          <span className="tc-green" />
          <span className="tc-white" />
          <span className="tc-red" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {{
              nl: 'Klaar voor een onvergetelijke ervaring?',
              fr: 'Prêt pour une expérience inoubliable?',
              en: 'Ready for an unforgettable experience?',
              es: '¿Listo para una experiencia inolvidable?',
              de: 'Bereit für ein unvergessliches Erlebnis?',
              it: 'Pronti per un\'esperienza indimenticabile?'
            }[language]}
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            {{
              nl: 'Reserva tu mesa o haz tu pedido para llevar',
              fr: 'Réservez votre table maintenant ou commandez pour emporter',
              en: 'Reserve your table now or order for takeaway',
              es: 'Reserve su mesa ahora o pida para llevar',
              de: 'Reservieren Sie jetzt Ihren Tisch oder bestellen Sie zum Mitnehmen',
              it: 'Prenota ora il tuo tavolo o ordina da asporto'
            }[language]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={`${basePath}/reserve`}
              className="inline-flex items-center justify-center px-8 py-4 bg-gold text-black font-bold rounded-lg hover:bg-gold/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {{
                nl: 'Reserveren',
                fr: 'Réserver',
                en: 'Reserve',
                es: 'Reservar',
                de: 'Reservieren',
                it: 'Prenota'
              }[language]}
              <ChevronRight className="ml-2" />
            </Link>
            <Link
              to={`${basePath}/takeaway`}
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-gold text-gold font-bold rounded-lg hover:bg-gold hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              {{
                nl: 'Afhalen',
                fr: 'Emporter',
                en: 'Takeaway',
                es: 'Para Llevar',
                de: 'Zum Mitnehmen',
                it: 'Da Asporto'
              }[language]}
              <ChevronRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
