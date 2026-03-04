import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { Download, ExternalLink } from 'lucide-react';

const Menu = () => {
  const { language } = useLanguage();
  const t = translations.menu;

  // PDF URL for embedded viewer
  const pdfUrl = '/images/mercato/gallery/ss-mains_mercato_09_24__1_.pdf';

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4">
            {t.title[language]}
          </h1>
          <p className="text-xl text-gray-300">{t.subtitle[language]}</p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
        </div>

        {/* Embedded PDF Menu - Direct zichtbaar */}
        <div className="mb-12 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border-2 border-gold/30 shadow-2xl">
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + pdfUrl)}&embedded=true`}
              title="Menu Ristorante Mercato"
              className="w-full rounded-lg"
              style={{ height: '800px', border: 'none' }}
              data-testid="menu-pdf-viewer"
            >
              <p className="text-gray-300">
                Uw browser ondersteunt geen PDF weergave. 
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline ml-1">
                  Klik hier om de PDF te downloaden
                </a>.
              </p>
            </iframe>
          </div>
        </div>

        {/* PDF Download Card */}
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border-2 border-gold/30 shadow-2xl text-center animate-fade-in mb-12">
          <Download size={48} className="text-gold mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">
            {t.download[language]}
          </h2>
          <p className="text-gray-300 mb-6">
            {{
              nl: 'Download onze menukaart als PDF bestand',
              fr: 'Téléchargez notre carte en fichier PDF',
              en: 'Download our menu as a PDF file',
              es: 'Descargue nuestro menú como archivo PDF',
              de: 'Laden Sie unsere Speisekarte als PDF herunter',
              it: 'Scarica il nostro menu come file PDF'
            }[language]}
          </p>
          <a
            href={pdfUrl}
            download="menukaart-mercato.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-gold text-black font-bold rounded-lg hover:bg-gold/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            data-testid="menu-download-button"
          >
            <Download className="mr-2" size={20} />
            {t.download[language]}
            <ExternalLink className="ml-2" size={20} />
          </a>
        </div>

        {/* Feature Images - Smaller below PDF */}
        <div className="grid md:grid-cols-3 gap-6">
          <img
            src="/images/mercato/menu/aperol.webp"
            alt="Aperol Spritz"
            className="w-full h-48 object-cover rounded-lg shadow-xl border border-gold/20 hover:scale-105 transition-transform duration-500"
          />
          <img
            src="/images/mercato/menu/pizza.jpg"
            alt="Pizza"
            className="w-full h-48 object-cover rounded-lg shadow-xl border border-gold/20 hover:scale-105 transition-transform duration-500"
          />
          <img
            src="/images/mercato/menu/dish1.jpg"
            alt="Restaurant"
            className="w-full h-48 object-cover rounded-lg shadow-xl border border-gold/20 hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Menu;
