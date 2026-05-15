import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Bed, Hotel, Trees, Calendar, Utensils, Camera } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useBasePath } from '../contexts/BasePathContext';
import { translations } from '../data/translations';

const Home = () => {
  const { language } = useLanguage();
  const basePath = useBasePath();
  const t = translations;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const featureCards = [
    {
      icon: Hotel,
      title: { es:'Hospedaje', en:'Lodging', fr:'Hébergement', it:'Alloggio', de:'Unterkunft' },
      desc: { es:'Cabañas, suites y habitaciones para familias y parejas.', en:'Cabins, suites and rooms for families and couples.', fr:'Cabanes, suites et chambres pour familles et couples.', it:'Cabañas, suite e camere per famiglie e coppie.', de:'Hütten, Suiten und Zimmer für Familien und Paare.' },
      link: 'hospedaje'
    },
    {
      icon: Trees,
      title: { es:'Naturaleza', en:'Nature', fr:'Nature', it:'Natura', de:'Natur' },
      desc: { es:'Senderos, mini-granja, áreas verdes y paisajes únicos.', en:'Trails, mini-farm, green areas and unique landscapes.', fr:'Sentiers, mini-ferme, espaces verts et paysages uniques.', it:'Sentieri, mini-fattoria, aree verdi e paesaggi unici.', de:'Wanderwege, Mini-Bauernhof, Grünflächen und einzigartige Landschaften.' },
      link: 'animales'
    },
    {
      icon: Camera,
      title: { es:'Aventura', en:'Adventure', fr:'Aventure', it:'Avventura', de:'Abenteuer' },
      desc: { es:'Columpio gigante, bicicleta aérea, paseos a caballo y carroza.', en:'Giant swing, sky bike, horseback riding and carriage rides.', fr:'Balançoire géante, vélo aérien, balades à cheval et en calèche.', it:'Altalena gigante, bicicletta aerea, passeggiate a cavallo e in carrozza.', de:'Riesenschaukel, Luftrad, Reiten und Kutschfahrten.' },
      link: 'actividades'
    },
    {
      icon: Calendar,
      title: { es:'Eventos', en:'Events', fr:'Événements', it:'Eventi', de:'Events' },
      desc: { es:'Bodas, cumpleaños, reuniones corporativas en un entorno natural.', en:'Weddings, birthdays, corporate gatherings in a natural setting.', fr:'Mariages, anniversaires, réunions d\'entreprise dans un cadre naturel.', it:'Matrimoni, compleanni, riunioni aziendali in un ambiente naturale.', de:'Hochzeiten, Geburtstage, Firmenfeiern in natürlicher Umgebung.' },
      link: 'eventos'
    },
    {
      icon: Bed,
      title: { es:'Pase del Día', en:'Day Pass', fr:'Pass Journée', it:'Pass Giornaliero', de:'Tagespass' },
      desc: { es:'Adultos $10 · Niños $5 · piscinas, áreas recreativas, mini-granja.', en:'Adults $10 · Kids $5 · pools, recreational areas, mini-farm.', fr:'Adultes 10 $ · Enfants 5 $ · piscines, aires de jeux, mini-ferme.', it:'Adulti $10 · Bambini $5 · piscine, aree ricreative, mini-fattoria.', de:'Erwachsene 10 $ · Kinder 5 $ · Pools, Freizeitbereiche, Mini-Bauernhof.' },
      link: 'actividades'
    },
    {
      icon: Utensils,
      title: { es:'Restaurante', en:'Restaurant', fr:'Restaurant', it:'Ristorante', de:'Restaurant' },
      desc: { es:'Cocina campestre con desayuno típico y platos tradicionales.', en:'Country cuisine with traditional breakfast and dishes.', fr:'Cuisine champêtre avec petit-déjeuner et plats traditionnels.', it:'Cucina campestre con colazione e piatti tradizionali.', de:'Landküche mit traditionellem Frühstück und Gerichten.' },
      link: 'restaurante'
    }
  ];

  return (
    <div>
      {/* Hero with video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
          <video
            src="/images/sanfrancisco/video/hero-compilation.mp4"
            poster="/images/sanfrancisco/video/hero-poster.jpg"
            autoPlay muted loop playsInline preload="auto"
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0" style={{
            background:
              'radial-gradient(70% 55% at 20% 20%, rgba(201,163,92,0.20) 0%, transparent 60%),' +
              'radial-gradient(60% 50% at 85% 80%, rgba(58,95,60,0.20) 0%, transparent 60%),' +
              'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.75) 100%)'
          }} />
        </div>

        <div className="relative z-10 px-4 sm:px-8 lg:px-16 animate-fade-in w-full max-w-7xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <img src="/images/sanfrancisco/logo/sanfrancisco-logo.png" alt="San Francisco" className="h-48 md:h-64 lg:h-72 w-auto drop-shadow-[0_10px_40px_rgba(0,0,0,0.7)]" />
          </div>
          <p className="text-2xl md:text-3xl text-gold font-light mb-3 tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            🐎 {t.brand.tagline[language]}
          </p>
          <p className="text-xl md:text-2xl text-cream mb-12 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" style={{color:'#F5E6CA'}}>
            🌿 {t.brand.subtitle[language]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={t.contact.whatsappLink} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gold text-black font-bold rounded-lg hover:bg-gold/90 transition-all duration-300 transform hover:scale-105 shadow-lg">
              {t.home.cta.reserve[language]}
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link to={`${basePath}/about`}
              className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-gold text-gold font-bold rounded-lg hover:bg-gold hover:text-black transition-all duration-300 transform hover:scale-105">
              {t.home.cta.explore[language]}
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gold mb-6">
            {{es:'Bienvenidos a la Hacienda',en:'Welcome to the Hacienda',fr:'Bienvenue à la Hacienda',it:'Benvenuti alla Hacienda',de:'Willkommen auf der Hacienda'}[language]}
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
          <p className="text-lg leading-relaxed text-cream/90" style={{color:'#F5E6CA'}}>
            {t.home.intro[language]}
          </p>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gold mb-4">
              {{es:'Nuestra Experiencia',en:'Our Experience',fr:'Notre Expérience',it:'La Nostra Esperienza',de:'Unser Erlebnis'}[language]}
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureCards.map((card, idx) => (
              <Link key={idx} to={`${basePath}/${card.link}`}
                className="hover-lift bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-gold/20 hover:border-gold/50 transition-all group">
                <card.icon size={48} className="text-gold mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-cream mb-3" style={{color:'#F5E6CA'}}>{card.title[language]}</h3>
                <p className="text-cream/70 leading-relaxed" style={{color:'rgba(245,230,202,0.7)'}}>{card.desc[language]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black border-t border-gold/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gold mb-6">
            {{es:'¿Listo para una aventura?',en:'Ready for an adventure?',fr:'Prêt pour une aventure?',it:'Pronto per un\'avventura?',de:'Bereit für ein Abenteuer?'}[language]}
          </h2>
          <p className="text-lg text-cream/80 mb-10" style={{color:'rgba(245,230,202,0.8)'}}>
            {{es:'Reserva por WhatsApp y vive momentos inolvidables en familia.',en:'Book via WhatsApp and live unforgettable moments with your family.',fr:'Réservez par WhatsApp et vivez des moments inoubliables en famille.',it:'Prenota su WhatsApp e vivi momenti indimenticabili in famiglia.',de:'Buchen Sie per WhatsApp und erleben Sie unvergessliche Familienmomente.'}[language]}
          </p>
          <a href={t.contact.whatsappLink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center px-10 py-5 bg-gold text-black font-bold rounded-lg hover:bg-gold/90 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg">
            📱 {t.contact.whatsapp}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
