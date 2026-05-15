import React from 'react';
import { Utensils, Coffee } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const Restaurante = () => {
  const { language } = useLanguage();
  const t = translations;

  const labels = {
    title: { es:'Restaurante', en:'Restaurant', fr:'Restaurant', it:'Ristorante', de:'Restaurant' },
    subtitle: {
      es:'Cocina campestre auténtica en el corazón de la hacienda.',
      en:'Authentic country cuisine at the heart of the hacienda.',
      fr:'Cuisine champêtre authentique au cœur de la hacienda.',
      it:'Cucina campestre autentica nel cuore della hacienda.',
      de:'Authentische Landküche im Herzen der Hacienda.'
    },
    breakfast: { es:'Desayuno Campestre', en:'Country Breakfast', fr:'Petit-déjeuner Champêtre', it:'Colazione Campestre', de:'Ländliches Frühstück' },
    breakfastDesc: {
      es:'Comienza tu día con un desayuno tradicional ecuatoriano: huevos, queso fresco, frutas de temporada, pan, café o chocolate caliente.',
      en:'Start your day with a traditional Ecuadorian breakfast: eggs, fresh cheese, seasonal fruits, bread, coffee or hot chocolate.',
      fr:'Commencez votre journée avec un petit-déjeuner équatorien traditionnel: œufs, fromage frais, fruits de saison, pain, café ou chocolat chaud.',
      it:'Inizia la giornata con una colazione tradizionale ecuadoriana: uova, formaggio fresco, frutta di stagione, pane, caffè o cioccolata calda.',
      de:'Beginnen Sie Ihren Tag mit einem traditionellen ecuadorianischen Frühstück: Eier, frischer Käse, Saisonfrüchte, Brot, Kaffee oder heiße Schokolade.'
    },
    mainTitle: { es:'Menú Principal', en:'Main Menu', fr:'Menu Principal', it:'Menu Principale', de:'Hauptmenü' },
    mainDesc: {
      es:'Platos tradicionales preparados con ingredientes frescos y locales. Especialidades de la cocina ecuatoriana y opciones para toda la familia.',
      en:'Traditional dishes prepared with fresh local ingredients. Ecuadorian specialties and options for the whole family.',
      fr:'Plats traditionnels préparés avec des ingrédients frais et locaux. Spécialités équatoriennes et options pour toute la famille.',
      it:'Piatti tradizionali preparati con ingredienti freschi e locali. Specialità ecuadoriane e opzioni per tutta la famiglia.',
      de:'Traditionelle Gerichte mit frischen, lokalen Zutaten. Ecuadorianische Spezialitäten und Optionen für die ganze Familie.'
    },
    comingSoon: { es:'Carta completa próximamente', en:'Full menu coming soon', fr:'Carte complète bientôt', it:'Menu completo prossimamente', de:'Vollständige Karte bald verfügbar' },
    reserveLabel: { es:'Reservar mesa por WhatsApp', en:'Reserve a table via WhatsApp', fr:'Réserver une table sur WhatsApp', it:'Prenota un tavolo via WhatsApp', de:'Tisch per WhatsApp reservieren' }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4">🍽️ {labels.title[language]}</h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-xl text-cream/80" style={{color:'rgba(245,230,202,0.8)'}}>{labels.subtitle[language]}</p>
        </div>

        <img src="/images/sanfrancisco/gallery/gallery-35.jpg" alt="Restaurante" className="w-full h-96 object-cover rounded-lg shadow-2xl border border-gold/20 mb-12" />

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-gold/20">
            <Coffee size={40} className="text-gold mb-4" />
            <h2 className="text-2xl font-bold text-gold mb-3">{labels.breakfast[language]}</h2>
            <p className="text-cream/80 leading-relaxed" style={{color:'rgba(245,230,202,0.8)'}}>{labels.breakfastDesc[language]}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-gold/20">
            <Utensils size={40} className="text-gold mb-4" />
            <h2 className="text-2xl font-bold text-gold mb-3">{labels.mainTitle[language]}</h2>
            <p className="text-cream/80 leading-relaxed" style={{color:'rgba(245,230,202,0.8)'}}>{labels.mainDesc[language]}</p>
            <p className="text-gold mt-4 text-sm italic">— {labels.comingSoon[language]} —</p>
          </div>
        </div>

        <div className="text-center">
          <a href={t.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-10 py-4 bg-gold text-black font-bold rounded-lg hover:bg-gold/90 transition-all shadow-lg text-lg">
            📱 {labels.reserveLabel[language]}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Restaurante;
