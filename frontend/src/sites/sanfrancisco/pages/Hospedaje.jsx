import React from 'react';
import { Check, Users, Bed, Bath } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const Hospedaje = () => {
  const { language } = useLanguage();
  const t = translations;

  const labels = {
    title: { es:'Hospedaje', en:'Lodging', fr:'Hébergement', it:'Alloggio', de:'Unterkunft' },
    subtitle: {
      es:'Alojamiento cómodo en un entorno natural único.',
      en:'Comfortable accommodation in a unique natural setting.',
      fr:'Hébergement confortable dans un cadre naturel unique.',
      it:'Alloggio confortevole in un ambiente naturale unico.',
      de:'Komfortable Unterkunft in einer einzigartigen Naturkulisse.'
    },
    capacity: { es:'Capacidad', en:'Capacity', fr:'Capacité', it:'Capacità', de:'Kapazität' },
    includes: { es:'Incluye', en:'Includes', fr:'Inclut', it:'Include', de:'Beinhaltet' },
    from: { es:'Desde', en:'From', fr:'À partir de', it:'Da', de:'Ab' },
    book: { es:'Reservar', en:'Book', fr:'Réserver', it:'Prenota', de:'Buchen' },
    checkin: { es:'Check-in: 14:00 · Check-out: 11:00 (uso de instalaciones extendido hasta las 17:00)', en:'Check-in: 2 PM · Check-out: 11 AM (extended facility use until 5 PM)', fr:'Arrivée: 14h · Départ: 11h (utilisation prolongée jusqu\'à 17h)', it:'Check-in: 14:00 · Check-out: 11:00 (uso prolungato fino alle 17:00)', de:'Check-in: 14:00 · Check-out: 11:00 (verlängerte Nutzung bis 17:00)' }
  };

  const plans = [
    {
      key: 'escapada',
      name: { es:'Escapada Real en Pareja', en:'Royal Couple Getaway', fr:'Escapade Royale en Couple', it:'Fuga Reale per Coppia', de:'Königliche Auszeit zu Zweit' },
      tag: { es:'Romance · Naturaleza · Relax', en:'Romance · Nature · Relaxation', fr:'Romance · Nature · Détente', it:'Romanticismo · Natura · Relax', de:'Romantik · Natur · Entspannung' },
      capacity: '2 adultos',
      room: { es:'Habitación King con jacuzzi privado y balcón', en:'King room with private jacuzzi and balcony', fr:'Chambre King avec jacuzzi privé et balcon', it:'Camera King con jacuzzi privata e balcone', de:'King-Zimmer mit privatem Whirlpool und Balkon' },
      price: '$100',
      priceNote: { es:'+ impuestos · 2 días / 1 noche', en:'+ taxes · 2 days / 1 night', fr:'+ taxes · 2 jours / 1 nuit', it:'+ tasse · 2 giorni / 1 notte', de:'+ Steuern · 2 Tage / 1 Nacht' },
      features: {
        es:['Decoración romántica (pétalos + velas LED)','Desayuno campestre para 2','1 actividad a elección (bicicleta aérea, columpio, paseo en carroza o a caballo 15 min)','Uso de piscinas, jacuzzi y áreas comunes','Caminata por senderos naturales'],
        en:['Romantic decoration (petals + LED candles)','Country breakfast for 2','1 activity of choice (sky bike, swing, carriage or horse ride 15 min)','Use of pools, jacuzzi and common areas','Walk on natural trails'],
        fr:['Décoration romantique (pétales + bougies LED)','Petit-déjeuner champêtre pour 2','1 activité au choix (vélo aérien, balançoire, calèche ou cheval 15 min)','Piscines, jacuzzi et espaces communs','Promenade sur sentiers naturels'],
        it:['Decorazione romantica (petali + candele LED)','Colazione campestre per 2','1 attività a scelta (bicicletta aerea, altalena, carrozza o cavallo 15 min)','Uso di piscine, jacuzzi e aree comuni','Camminata sui sentieri naturali'],
        de:['Romantische Dekoration (Blütenblätter + LED-Kerzen)','Ländliches Frühstück für 2','1 Aktivität nach Wahl (Luftrad, Schaukel, Kutsche oder Pferd 15 Min)','Nutzung von Pools, Whirlpool und Gemeinschaftsbereichen','Spaziergang auf Naturpfaden']
      }
    },
    {
      key: 'familiar',
      name: { es:'Aventura Familiar', en:'Family Adventure', fr:'Aventure en Famille', it:'Avventura Familiare', de:'Familienabenteuer' },
      tag: { es:'Naturaleza · Familia · Cultura Campestre', en:'Nature · Family · Country Culture', fr:'Nature · Famille · Culture Champêtre', it:'Natura · Famiglia · Cultura Campestre', de:'Natur · Familie · Landkultur' },
      capacity: '2 adultos + 2 niños',
      room: { es:'Cama King + sofá cama', en:'King bed + sofa bed', fr:'Lit King + canapé-lit', it:'Letto King + divano letto', de:'King-Bett + Schlafsofa' },
      price: '$50 / $35',
      priceNote: { es:'Adultos $50 · Niños (3-11 años) $35 · 2 días / 1 noche', en:'Adults $50 · Children (3-11 yrs) $35 · 2 days / 1 night', fr:'Adultes 50 $ · Enfants (3-11 ans) 35 $ · 2 jours / 1 nuit', it:'Adulti $50 · Bambini (3-11 anni) $35 · 2 giorni / 1 notte', de:'Erwachsene $50 · Kinder (3-11 J.) $35 · 2 Tage / 1 Nacht' },
      features: {
        es:['Desayuno campestre para 4','Uso de piscina y áreas comunes','Área verde con hamacas','1 actividad a elección (bicicleta aérea, columpio, paseo en carroza o a caballo 15 min)','Caminata por senderos naturales'],
        en:['Country breakfast for 4','Pool and common areas','Green area with hammocks','1 activity of choice (sky bike, swing, carriage or horse ride 15 min)','Walk on natural trails'],
        fr:['Petit-déjeuner champêtre pour 4','Piscine et espaces communs','Espace vert avec hamacs','1 activité au choix (vélo aérien, balançoire, calèche ou cheval 15 min)','Promenade sur sentiers naturels'],
        it:['Colazione campestre per 4','Piscina e aree comuni','Area verde con amache','1 attività a scelta (bicicletta aerea, altalena, carrozza o cavallo 15 min)','Camminata sui sentieri naturali'],
        de:['Ländliches Frühstück für 4','Pool und Gemeinschaftsbereiche','Grünbereich mit Hängematten','1 Aktivität nach Wahl (Luftrad, Schaukel, Kutsche oder Pferd 15 Min)','Spaziergang auf Naturpfaden']
      }
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4">{labels.title[language]}</h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-xl text-cream/80" style={{color:'rgba(245,230,202,0.8)'}}>{labels.subtitle[language]}</p>
        </div>

        {/* Hero photo */}
        <img src="/images/sanfrancisco/gallery/gallery-02.jpg" alt="Hospedaje" className="w-full h-96 object-cover rounded-lg shadow-2xl border border-gold/20 mb-16" />

        {/* Plans */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {plans.map((plan, idx) => (
            <div key={plan.key} className="hover-lift bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gold/30 overflow-hidden">
              <img src={`/images/sanfrancisco/gallery/gallery-${(idx + 3).toString().padStart(2,'0')}.jpg`} alt={plan.name[language]} className="w-full h-64 object-cover" />
              <div className="p-8">
                <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">{plan.tag[language]}</p>
                <h3 className="text-3xl font-bold text-cream mb-3" style={{color:'#F5E6CA'}}>{plan.name[language]}</h3>
                <div className="flex items-center gap-4 mb-4 text-cream/70 text-sm" style={{color:'rgba(245,230,202,0.7)'}}>
                  <span className="flex items-center gap-1"><Users size={16}/>{plan.capacity}</span>
                  <span className="flex items-center gap-1"><Bed size={16}/>{plan.room[language]}</span>
                </div>
                <p className="text-3xl font-bold text-gold mb-1">{plan.price}</p>
                <p className="text-xs text-cream/60 mb-6" style={{color:'rgba(245,230,202,0.6)'}}>{plan.priceNote[language]}</p>
                <h4 className="text-cream font-semibold mb-3" style={{color:'#F5E6CA'}}>{labels.includes[language]}:</h4>
                <ul className="space-y-2 mb-6">
                  {plan.features[language].map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-cream/80 text-sm" style={{color:'rgba(245,230,202,0.8)'}}>
                      <Check size={16} className="text-gold flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href={t.contact.whatsappLink} target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3 bg-gold text-black font-bold rounded-lg hover:bg-gold/90 transition-all">
                  {labels.book[language]}
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-cream/60 text-sm italic" style={{color:'rgba(245,230,202,0.6)'}}>{labels.checkin[language]}</p>
      </div>
    </div>
  );
};

export default Hospedaje;
