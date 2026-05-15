import React from 'react';
import { Calendar, Heart, Users, Briefcase, Camera } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const Eventos = () => {
  const { language } = useLanguage();
  const t = translations;

  const labels = {
    title: { es:'Eventos', en:'Events', fr:'Événements', it:'Eventi', de:'Events' },
    subtitle: {
      es:'Bodas, cumpleaños, reuniones corporativas y celebraciones especiales en un entorno natural único.',
      en:'Weddings, birthdays, corporate gatherings and special celebrations in a unique natural setting.',
      fr:'Mariages, anniversaires, réunions d\'entreprise et célébrations spéciales dans un cadre naturel unique.',
      it:'Matrimoni, compleanni, riunioni aziendali e celebrazioni speciali in un ambiente naturale unico.',
      de:'Hochzeiten, Geburtstage, Firmenveranstaltungen und besondere Feiern in einer einzigartigen natürlichen Umgebung.'
    },
    photoTitle: { es:'Planes Fotográficos', en:'Photo Packages', fr:'Forfaits Photo', it:'Pacchetti Fotografici', de:'Foto-Pakete' },
    photoDesc: {
      es:'Sesiones fotográficas en escenarios naturales y campestres. Jueves, viernes, sábado y domingos en la mañana.',
      en:'Photo sessions in natural and country settings. Thursdays, Fridays, Saturdays and Sunday mornings.',
      fr:'Séances photo dans des cadres naturels et champêtres. Jeudi, vendredi, samedi et dimanche matin.',
      it:'Sessioni fotografiche in ambienti naturali e campestri. Giovedì, venerdì, sabato e domenica mattina.',
      de:'Fotoshootings in natürlicher und ländlicher Umgebung. Donnerstag, Freitag, Samstag und Sonntagmorgen.'
    },
    request: { es:'Solicitar cotización por WhatsApp', en:'Request quote via WhatsApp', fr:'Devis sur WhatsApp', it:'Richiedi preventivo via WhatsApp', de:'Angebot per WhatsApp anfordern' },
    note: {
      es:'Los paquetes varían según la cantidad de personas y los requerimientos de decoración.',
      en:'Packages vary based on number of people and decoration requirements.',
      fr:'Les forfaits varient selon le nombre de personnes et les exigences de décoration.',
      it:'I pacchetti variano in base al numero di persone e ai requisiti di decorazione.',
      de:'Pakete variieren je nach Personenzahl und Dekorationsanforderungen.'
    }
  };

  const eventTypes = [
    { icon: Heart, label: { es:'Bodas', en:'Weddings', fr:'Mariages', it:'Matrimoni', de:'Hochzeiten' } },
    { icon: Calendar, label: { es:'Cumpleaños', en:'Birthdays', fr:'Anniversaires', it:'Compleanni', de:'Geburtstage' } },
    { icon: Briefcase, label: { es:'Corporativos', en:'Corporate', fr:'Entreprises', it:'Aziendali', de:'Firmen' } },
    { icon: Users, label: { es:'Celebraciones', en:'Celebrations', fr:'Célébrations', it:'Celebrazioni', de:'Feiern' } }
  ];

  const photoPlans = [
    { name: { es:'Sesión en Instalaciones', en:'On-site Session', fr:'Séance sur Site', it:'Sessione in Sede', de:'Vor-Ort-Session' }, price: '$100 - $125' },
    { name: { es:'Sesión con un Caballo', en:'Session with a Horse', fr:'Séance avec Cheval', it:'Sessione con Cavallo', de:'Session mit Pferd' }, price: '$150 - $187' },
    { name: { es:'Sesión con Carroza y Caballo', en:'Session with Carriage & Horse', fr:'Séance avec Calèche & Cheval', it:'Sessione con Carrozza e Cavallo', de:'Session mit Kutsche & Pferd' }, price: '$200 - $250' },
    { name: { es:'Sesión con Carroza, Pony y Caballo', en:'Session with Carriage, Pony & Horse', fr:'Calèche, Poney & Cheval', it:'Carrozza, Pony e Cavallo', de:'Kutsche, Pony & Pferd' }, price: '$250 - $312' }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero with background image */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/sanfrancisco/gallery/gallery-30.jpg" alt="Eventos" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{
            background:'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.30) 40%, rgba(0,0,0,0.85) 100%)'
          }} />
        </div>
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gold mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">🎊 {labels.title[language]}</h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-cream max-w-3xl mx-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]" style={{color:'#F5E6CA'}}>{labels.subtitle[language]}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {eventTypes.map((et, idx) => (
            <div key={idx} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gold/20 text-center hover:border-gold/50 transition-all">
              <et.icon size={40} className="text-gold mx-auto mb-3" />
              <p className="text-cream font-semibold" style={{color:'#F5E6CA'}}>{et.label[language]}</p>
            </div>
          ))}
        </div>

        {/* Photo plans */}
        <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-gold/30 mb-8">
          <div className="text-center mb-8">
            <Camera size={48} className="text-gold mx-auto mb-3" />
            <h2 className="text-3xl font-bold text-gold mb-3">{labels.photoTitle[language]}</h2>
            <p className="text-cream/80 max-w-2xl mx-auto" style={{color:'rgba(245,230,202,0.8)'}}>{labels.photoDesc[language]}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {photoPlans.map((p, idx) => (
              <div key={idx} className="bg-black/50 p-5 rounded-lg border border-gold/20 flex items-center justify-between">
                <span className="text-cream font-semibold" style={{color:'#F5E6CA'}}>{p.name[language]}</span>
                <span className="text-gold font-bold text-lg">{p.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-cream/60 text-sm italic mb-6" style={{color:'rgba(245,230,202,0.6)'}}>{labels.note[language]}</p>
          <a href={t.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-10 py-4 bg-gold text-black font-bold rounded-lg hover:bg-gold/90 transition-all shadow-lg text-lg">
            📱 {labels.request[language]}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Eventos;
