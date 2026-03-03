import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { Download, ExternalLink } from 'lucide-react';

const Menu = () => {
  const { language } = useLanguage();
  const t = translations.menu;

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4">
            {t.title[language]}
          </h1>
          <p className="text-xl text-gray-300">{t.subtitle[language]}</p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
        </div>

        {/* Menu Preview Images */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <img
            src="/images/menu/aperol.webp"
            alt="Aperol Spritz"
            className="w-full h-80 object-cover rounded-lg shadow-2xl border border-gold/20 hover:scale-105 transition-transform duration-500"
          />
          <img
            src="/images/menu/pizza.jpg"
            alt="Pizza"
            className="w-full h-80 object-cover rounded-lg shadow-2xl border border-gold/20 hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* PDF Download Card */}
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-black p-12 rounded-lg border-2 border-gold/30 shadow-2xl text-center animate-fade-in">
          <Download size={64} className="text-gold mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            {t.download[language]}
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            {{
              nl: 'Bekijk onze volledige menukaart met alle gerechten en prijzen',
              fr: 'Consultez notre carte complète avec tous les plats et prix',
              en: 'View our complete menu with all dishes and prices',
              es: 'Vea nuestro menú completo con todos los platos y precios',
              de: 'Sehen Sie unsere vollständige Speisekarte mit allen Gerichten und Preisen',
              it: 'Visualizza il nostro menu completo con tutti i piatti e i prezzi'
            }[language]}
          </p>
          <a
            href="https://ristorantemercato.weebly.com/uploads/1/0/1/5/101515486/ss-mains_mercato_09_24__1_.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-gold text-black font-bold rounded-lg hover:bg-gold/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Download className="mr-2" size={20} />
            {t.download[language]}
            <ExternalLink className="ml-2" size={20} />
          </a>
        </div>

        {/* Feature Images */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <img
            src="/images/menu/dish1.jpg"
            alt="Restaurant"
            className="w-full h-64 object-cover rounded-lg shadow-xl border border-gold/20 hover:scale-105 transition-transform duration-500"
          />
          <img
            src="/images/menu/dish2.jpg"
            alt="Italian Cuisine"
            className="w-full h-64 object-cover rounded-lg shadow-xl border border-gold/20 hover:scale-105 transition-transform duration-500"
          />
          <img
            src="/images/menu/dish3.jpg"
            alt="Ambiance"
            className="w-full h-64 object-cover rounded-lg shadow-xl border border-gold/20 hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Menu;
