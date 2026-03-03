import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { ChevronRight, UtensilsCrossed } from 'lucide-react';

const Home = () => {
  const { language } = useLanguage();
  const t = translations;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          <img
            src="/images/home/hero-background.jpg"
            alt="Mercato Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <div className="mb-8">
            <UtensilsCrossed size={64} className="text-gold mx-auto mb-6 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wide">
            {t.home.welcome[language]}
          </h1>
          <p className="text-xl md:text-2xl text-gold/90 mb-12 font-light">
            {t.home.subtitle[language]}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/reserve"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gold text-black font-bold rounded-lg hover:bg-gold/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t.home.cta.reserve[language]}
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/takeaway"
              className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-gold text-gold font-bold rounded-lg hover:bg-gold hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              {t.home.cta.takeaway[language]}
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Notice Section */}
      <section className="bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 py-6 border-y border-gold/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white text-sm md:text-base">
            {t.home.closedNotice[language]}
          </p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <h2 className="text-4xl md:text-5xl font-bold text-gold">
                {{
                  nl: 'Authentieke Italiaanse Ervaring',
                  fr: 'Expérience Italienne Authentique',
                  en: 'Authentic Italian Experience',
                  es: 'Experiencia Italiana Auténtica',
                  de: 'Authentisches Italienisches Erlebnis',
                  it: 'Esperienza Italiana Autentica'
                }[language]}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {{
                  nl: 'In het hart van Zaventem biedt Ristorante Pizzeria Mercato u een unieke culinaire ervaring. Met onze prachtige pizza oven en open keuken ziet u bij binnenkomst direct het universum van ons gastronomisch geheel.',
                  fr: 'Au cœur de Zaventem, Ristorante Pizzeria Mercato vous offre une expérience culinaire unique. Avec notre magnifique four à pizza et notre cuisine ouverte, vous voyez directement en entrant l\'univers de notre ensemble gastronomique.',
                  en: 'In the heart of Zaventem, Ristorante Pizzeria Mercato offers you a unique culinary experience. With our beautiful pizza oven and open kitchen, you immediately see the universe of our gastronomic whole upon entering.',
                  es: 'En el corazón de Zaventem, Ristorante Pizzeria Mercato le ofrece una experiencia culinaria única. Con nuestro hermoso horno de pizza y cocina abierta, ve inmediatamente el universo de nuestro conjunto gastronómico al entrar.',
                  de: 'Im Herzen von Zaventem bietet Ihnen Ristorante Pizzeria Mercato ein einzigartiges kulinarisches Erlebnis. Mit unserem schönen Pizzaofen und der offenen Küche sehen Sie beim Betreten sofort das Universum unseres gastronomischen Ganzen.',
                  it: 'Nel cuore di Zaventem, Ristorante Pizzeria Mercato vi offre un\'esperienza culinaria unica. Con il nostro bellissimo forno per pizza e la cucina a vista, entrando vedete immediatamente l\'universo del nostro insieme gastronomico.'
                }[language]}
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-gold hover:text-gold/80 transition-colors font-semibold"
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
            <div className="animate-slide-in-right">
              <img
                src="/images/home/interior.jpg"
                alt="Restaurant Interior"
                className="rounded-lg shadow-2xl border border-gold/20 hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                img: '/images/home/quality.jpg',
                title: { nl: 'Italiaanse Kwaliteit', fr: 'Qualité Italienne' },
                desc: { nl: 'Authentieke Italiaanse ingrediënten', fr: 'Ingrédients italiens authentiques' }
              },
              {
                img: '/images/home/fresh.jpg',
                title: { nl: 'Verse Bereiding', fr: 'Préparation Fraîche' },
                desc: { nl: 'Dagelijks vers bereid', fr: 'Préparé frais quotidiennement' }
              },
              {
                img: '/images/home/ambiance.jpg',
                title: { nl: 'Elegante Ambiance', fr: 'Ambiance Élégante' },
                desc: { nl: 'Verfijnde eetervaring', fr: 'Expérience culinaire raffinée' }
              }
            ].map((feature, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${idx * 0.2}s` }}>
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={feature.img}
                    alt={feature.title[language]}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold text-gold mb-2">{feature.title[language]}</h3>
                  <p className="text-gray-300">{feature.desc[language]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black border-t border-gold/20">
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
              nl: 'Reserveer nu uw tafel of bestel voor afhaling',
              fr: 'Réservez votre table maintenant ou commandez pour emporter',
              en: 'Reserve your table now or order for takeaway',
              es: 'Reserve su mesa ahora o pida para llevar',
              de: 'Reservieren Sie jetzt Ihren Tisch oder bestellen Sie zum Mitnehmen',
              it: 'Prenota ora il tuo tavolo o ordina da asporto'
            }[language]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/reserve"
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
              to="/takeaway"
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
