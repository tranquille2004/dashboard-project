import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { Calendar, Clock, Users, Info } from 'lucide-react';

const Reserve = () => {
  const { language } = useLanguage();
  const t = translations;

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4">
            {t.reserve.title[language]}
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gold/20 text-center hover:border-gold/40 transition-all">
            <Clock size={40} className="text-gold mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">{t.hours.title[language]}</h3>
            <p className="text-gray-300 text-sm">{t.hours.lunch[language]}</p>
            <p className="text-gray-300 text-sm">{t.hours.dinner}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gold/20 text-center hover:border-gold/40 transition-all">
            <Calendar size={40} className="text-gold mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">{{
              nl: 'Gesloten',
              fr: 'Fermé',
              en: 'Closed',
              es: 'Cerrado',
              de: 'Geschlossen',
              it: 'Chiuso'
            }[language]}</h3>
            <p className="text-gray-300 text-sm">{t.hours.closed[language]}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gold/20 text-center hover:border-gold/40 transition-all">
            <Users size={40} className="text-gold mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">{{
              nl: 'Groepen',
              fr: 'Groupes',
              en: 'Groups',
              es: 'Grupos',
              de: 'Gruppen',
              it: 'Gruppi'
            }[language]}</h3>
            <p className="text-gray-300 text-sm">{{
              nl: '10+ personen',
              fr: '10+ personnes',
              en: '10+ people',
              es: '10+ personas',
              de: '10+ Personen',
              it: '10+ persone'
            }[language]}</p>
          </div>
        </div>

        {/* Notice */}
        <div className="bg-gold/10 border-l-4 border-gold p-6 rounded-lg mb-8">
          <div className="flex items-start space-x-4">
            <Info className="text-gold flex-shrink-0 mt-1" size={24} />
            <div className="space-y-2">
              <p className="text-white font-semibold">{t.reserve.description[language]}</p>
              <p className="text-gray-300 text-sm">{t.reserve.groupNote[language]}</p>
            </div>
          </div>
        </div>

        {/* Holiday Notice */}
        <div className="bg-gradient-to-r from-red-900/20 to-gold/10 border border-gold/30 p-6 rounded-lg mb-8 text-center">
          <p className="text-white font-semibold">{t.home.closedNotice[language]}</p>
        </div>

        {/* Jotform Embed */}
        <div className="bg-gradient-to-br from-gray-900 to-black p-6 md:p-12 rounded-lg border border-gold/20 shadow-2xl">
          <iframe
            title="Reserveren Formulier"
            src="https://form.jotform.com/81425803784360"
            className="w-full"
            style={{ minHeight: '1200px', border: 'none' }}
            scrolling="yes"
          />
        </div>

        {/* Image Banner */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <img
            src="/images/ilsiciliano/gallery/img-20160704-110159_orig.jpg"
            alt="Restaurant Interior"
            className="w-full h-72 object-cover rounded-lg shadow-xl border border-gold/20"
          />
          <img
            src="/images/ilsiciliano/gallery/3_1_orig.jpg"
            alt="Dining"
            className="w-full h-72 object-cover rounded-lg shadow-xl border border-gold/20"
          />
        </div>
      </div>
    </div>
  );
};

export default Reserve;
