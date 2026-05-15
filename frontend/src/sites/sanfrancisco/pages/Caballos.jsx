import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const Caballos = () => {
  const { language } = useLanguage();
  const t = translations;

  const labels = {
    title: { es:'Paseos a Caballo', en:'Horseback Riding', fr:'Balades à Cheval', it:'Passeggiate a Cavallo', de:'Reiten' },
    subtitle: {
      es:'Cabalgatas, paseos en carroza y experiencias ecuestres únicas en plena naturaleza.',
      en:'Horseback rides, carriage tours and unique equestrian experiences in nature.',
      fr:'Balades à cheval, tours en calèche et expériences équestres uniques en pleine nature.',
      it:'Cavalcate, giri in carrozza ed esperienze equestri uniche nella natura.',
      de:'Reitausflüge, Kutschfahrten und einzigartige Reiterlebnisse in der Natur.'
    },
    book: { es:'Reservar por WhatsApp', en:'Book via WhatsApp', fr:'Réserver via WhatsApp', it:'Prenota su WhatsApp', de:'Per WhatsApp buchen' }
  };

  const experiences = [
    {
      img: 'gallery-05.jpg',
      title: { es:'Paseo a Caballo (15 min)', en:'Horse Ride (15 min)', fr:'Balade à Cheval (15 min)', it:'Passeggiata a Cavallo (15 min)', de:'Reittour (15 Min)' },
      desc: {
        es:'Recorre senderos tranquilos en una experiencia segura y guiada. Perfecto para todas las edades y niveles.',
        en:'Ride along peaceful trails in a safe, guided experience. Perfect for all ages and skill levels.',
        fr:'Parcourez des sentiers tranquilles dans une expérience sûre et guidée. Parfait pour tous les âges et niveaux.',
        it:'Percorri sentieri tranquilli in un\'esperienza sicura e guidata. Perfetto per tutte le età e livelli.',
        de:'Wandern Sie auf ruhigen Pfaden in einer sicheren, geführten Erfahrung. Perfekt für alle Altersgruppen.'
      },
      price: '$25 / persona'
    },
    {
      img: 'gallery-06.jpg',
      title: { es:'Paseo en Carroza', en:'Carriage Ride', fr:'Tour en Calèche', it:'Giro in Carrozza', de:'Kutschfahrt' },
      desc: {
        es:'Una experiencia encantadora, perfecta para compartir en pareja, familia o eventos especiales.',
        en:'A charming experience, perfect for couples, families or special events.',
        fr:'Une expérience charmante, parfaite pour couples, familles ou événements spéciaux.',
        it:'Un\'esperienza affascinante, perfetta per coppie, famiglie o eventi speciali.',
        de:'Ein bezauberndes Erlebnis, perfekt für Paare, Familien oder besondere Anlässe.'
      },
      price: '$50 / 5 personas'
    },
    {
      img: 'gallery-07.jpg',
      title: { es:'Sesión de Fotos con Caballo', en:'Photo Session with Horse', fr:'Séance Photo avec Cheval', it:'Sessione Foto con Cavallo', de:'Fotoshooting mit Pferd' },
      desc: {
        es:'Una experiencia elegante y diferente para fotos memorables junto a nuestros caballos.',
        en:'An elegant and different experience for memorable photos with our horses.',
        fr:'Une expérience élégante et différente pour des photos mémorables avec nos chevaux.',
        it:'Un\'esperienza elegante e diversa per foto memorabili con i nostri cavalli.',
        de:'Ein elegantes und besonderes Erlebnis für unvergessliche Fotos mit unseren Pferden.'
      },
      price: '$150 - $250'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4">🐎 {labels.title[language]}</h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-xl text-cream/80 max-w-3xl mx-auto" style={{color:'rgba(245,230,202,0.8)'}}>{labels.subtitle[language]}</p>
        </div>

        <img src="/images/sanfrancisco/gallery/gallery-08.jpg" alt="Caballos" className="w-full h-96 md:h-[500px] object-cover rounded-lg shadow-2xl border border-gold/20 mb-16" />

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {experiences.map((exp, idx) => (
            <div key={idx} className="hover-lift bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gold/20 overflow-hidden">
              <img src={`/images/sanfrancisco/gallery/${exp.img}`} alt={exp.title[language]} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gold mb-3">{exp.title[language]}</h3>
                <p className="text-cream/80 mb-4 leading-relaxed" style={{color:'rgba(245,230,202,0.8)'}}>{exp.desc[language]}</p>
                <p className="text-xl font-bold text-cream mb-4" style={{color:'#F5E6CA'}}>{exp.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href={t.contact.whatsappLink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center px-10 py-4 bg-gold text-black font-bold rounded-lg hover:bg-gold/90 transition-all shadow-lg text-lg">
            📱 {labels.book[language]}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Caballos;
