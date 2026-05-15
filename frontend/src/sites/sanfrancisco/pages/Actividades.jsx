import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const Actividades = () => {
  const { language } = useLanguage();
  const t = translations;

  const labels = {
    title: { es:'Actividades', en:'Activities', fr:'Activités', it:'Attività', de:'Aktivitäten' },
    subtitle: {
      es:'Aventura, naturaleza y diversión para toda la familia.',
      en:'Adventure, nature and fun for the whole family.',
      fr:'Aventure, nature et divertissement pour toute la famille.',
      it:'Avventura, natura e divertimento per tutta la famiglia.',
      de:'Abenteuer, Natur und Spaß für die ganze Familie.'
    },
    passTitle: { es:'Pase del Día — Ingreso', en:'Day Pass — Entry', fr:'Pass Journée — Entrée', it:'Pass Giornaliero — Ingresso', de:'Tagespass — Eintritt' },
    passDesc: {
      es:'Disfruta de las instalaciones sin necesidad de hospedarte.',
      en:'Enjoy the facilities without needing to stay overnight.',
      fr:'Profitez des installations sans avoir à séjourner.',
      it:'Goditi le strutture senza bisogno di pernottare.',
      de:'Genießen Sie die Einrichtungen, ohne zu übernachten.'
    },
    facilities: { es:'Instalaciones incluidas', en:'Facilities included', fr:'Installations incluses', it:'Strutture incluse', de:'Inkludierte Einrichtungen' },
    extras: { es:'Actividades Extras', en:'Extra Activities', fr:'Activités Supplémentaires', it:'Attività Extra', de:'Zusätzliche Aktivitäten' },
    book: { es:'Reservar', en:'Book', fr:'Réserver', it:'Prenota', de:'Buchen' }
  };

  const facilitiesList = {
    es: ['Piscinas','Turco','Hidromasaje','Canchas deportivas','Mini-granja','Caballerizas','Senderos naturales'],
    en: ['Swimming pools','Turkish bath','Whirlpool','Sports courts','Mini-farm','Stables','Nature trails'],
    fr: ['Piscines','Bain turc','Bain hydromassant','Terrains de sport','Mini-ferme','Écuries','Sentiers naturels'],
    it: ['Piscine','Bagno turco','Idromassaggio','Campi sportivi','Mini-fattoria','Scuderie','Sentieri naturali'],
    de: ['Schwimmbäder','Türkisches Bad','Whirlpool','Sportplätze','Mini-Bauernhof','Ställe','Naturpfade']
  };

  const extrasList = [
    { name: { es:'Paseo a Caballo', en:'Horse Ride', fr:'Balade à Cheval', it:'Cavalcata', de:'Reittour' }, price: '$25 / persona' },
    { name: { es:'Paseo en Carroza', en:'Carriage Ride', fr:'Tour en Calèche', it:'Giro in Carrozza', de:'Kutschfahrt' }, price: '$50 / 5 pers.' },
    { name: { es:'Columpio Extremo', en:'Extreme Swing', fr:'Balançoire Extrême', it:'Altalena Estrema', de:'Extremschaukel' }, price: '$10 / persona' },
    { name: { es:'Bicicleta Aérea', en:'Sky Bike', fr:'Vélo Aérien', it:'Bicicletta Aerea', de:'Luftrad' }, price: '$10 / persona' }
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4">{labels.title[language]}</h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-xl text-cream/80" style={{color:'rgba(245,230,202,0.8)'}}>{labels.subtitle[language]}</p>
        </div>

        {/* Day Pass card */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gold/30 overflow-hidden mb-12">
          <div className="grid md:grid-cols-2">
            <img src="/images/sanfrancisco/gallery/gallery-22.jpg" alt="Pase del día" className="w-full h-full min-h-[300px] object-cover" />
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gold mb-2">{labels.passTitle[language]}</h2>
              <p className="text-cream/80 mb-6" style={{color:'rgba(245,230,202,0.8)'}}>{labels.passDesc[language]}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/50 p-4 rounded-lg border border-gold/20 text-center">
                  <p className="text-3xl font-bold text-gold">$10</p>
                  <p className="text-cream/70 text-sm" style={{color:'rgba(245,230,202,0.7)'}}>{ {es:'Adultos',en:'Adults',fr:'Adultes',it:'Adulti',de:'Erwachsene'}[language] }</p>
                </div>
                <div className="bg-black/50 p-4 rounded-lg border border-gold/20 text-center">
                  <p className="text-3xl font-bold text-gold">$5</p>
                  <p className="text-cream/70 text-sm" style={{color:'rgba(245,230,202,0.7)'}}>{ {es:'Niños',en:'Kids',fr:'Enfants',it:'Bambini',de:'Kinder'}[language] }</p>
                </div>
              </div>
              <h3 className="text-cream font-semibold mb-3" style={{color:'#F5E6CA'}}>{labels.facilities[language]}:</h3>
              <ul className="space-y-2 mb-6">
                {facilitiesList[language].map((f,i) => (
                  <li key={i} className="flex items-start gap-2 text-cream/80 text-sm" style={{color:'rgba(245,230,202,0.8)'}}>
                    <Check size={16} className="text-gold flex-shrink-0 mt-0.5" /><span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href={t.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-gold text-black font-bold rounded-lg hover:bg-gold/90 transition-all">{labels.book[language]}</a>
            </div>
          </div>
        </div>

        {/* Extras grid */}
        <h2 className="text-3xl font-bold text-gold text-center mb-8">{labels.extras[language]}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {extrasList.map((ex, idx) => (
            <div key={idx} className="hover-lift bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gold/20 overflow-hidden">
              <img src={`/images/sanfrancisco/gallery/gallery-${(idx + 23).toString().padStart(2,'0')}.jpg`} alt={ex.name[language]} className="w-full h-40 object-cover" />
              <div className="p-5">
                <h3 className="text-lg font-bold text-cream mb-2" style={{color:'#F5E6CA'}}>{ex.name[language]}</h3>
                <p className="text-2xl font-bold text-gold">{ex.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Actividades;
