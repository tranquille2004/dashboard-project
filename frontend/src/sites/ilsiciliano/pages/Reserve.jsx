import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { Calendar, Clock, Users, Phone, Mail, MessageCircle } from 'lucide-react';

const Reserve = () => {
  const { language } = useLanguage();
  const t = translations;

  const comingSoonText = {
    es: 'Reservas online próximamente',
    en: 'Online reservations coming soon',
    it: 'Prenotazioni online prossimamente',
    fr: 'Réservations en ligne bientôt disponibles',
    nl: 'Online reserveren binnenkort beschikbaar',
    de: 'Online-Reservierungen demnächst verfügbar'
  };

  const callToReserveText = {
    es: 'Mientras tanto, llámenos o escríbanos por WhatsApp para reservar su mesa.',
    en: 'In the meantime, call us or message us via WhatsApp to book your table.',
    it: 'Nel frattempo, chiamateci o scriveteci su WhatsApp per prenotare il vostro tavolo.',
    fr: 'En attendant, appelez-nous ou écrivez-nous sur WhatsApp pour réserver votre table.',
    nl: 'Bel ons of stuur een WhatsApp om uw tafel te reserveren.',
    de: 'Rufen Sie uns an oder schreiben Sie uns per WhatsApp, um Ihren Tisch zu reservieren.'
  };

  const whatsappLabel = {
    es: 'WhatsApp', en: 'WhatsApp', it: 'WhatsApp', fr: 'WhatsApp', nl: 'WhatsApp', de: 'WhatsApp'
  };

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
              es: 'Cerrado', en: 'Closed', it: 'Chiuso', fr: 'Fermé', nl: 'Gesloten', de: 'Geschlossen'
            }[language]}</h3>
            <p className="text-gray-300 text-sm">{t.hours.closed[language]}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gold/20 text-center hover:border-gold/40 transition-all">
            <Users size={40} className="text-gold mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">{{
              es: 'Grupos', en: 'Groups', it: 'Gruppi', fr: 'Groupes', nl: 'Groepen', de: 'Gruppen'
            }[language]}</h3>
            <p className="text-gray-300 text-sm">{{
              es: '10+ personas', en: '10+ people', it: '10+ persone', fr: '10+ personnes', nl: '10+ personen', de: '10+ Personen'
            }[language]}</p>
          </div>
        </div>

        {/* Coming Soon Card with direct contact */}
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-900 to-black p-8 md:p-12 rounded-lg border-2 border-gold/30 shadow-2xl text-center animate-fade-in">
          <p className="text-italian-green font-semibold uppercase tracking-widest text-sm mb-3">
            {{ es: 'Próximamente', en: 'Coming soon', it: 'Prossimamente', fr: 'Bientôt', nl: 'Binnenkort', de: 'Bald' }[language]}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gold mb-4">
            {comingSoonText[language]}
          </h2>
          <p className="text-gray-200 text-lg mb-8 leading-relaxed">
            {callToReserveText[language]}
          </p>

          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <a
              href="tel:+593984110781"
              className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-gold text-black font-bold rounded-lg hover:bg-gold/90 transition-all duration-300 shadow-lg"
            >
              <Phone size={20} />
              <span>+593 98 411 0781</span>
            </a>
            <a
              href="https://wa.me/593984110781"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-italian-green text-white font-bold rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg"
            >
              <MessageCircle size={20} />
              <span>{whatsappLabel[language]}</span>
            </a>
          </div>

          <div className="mt-6 pt-6 border-t border-gold/10">
            <a
              href="mailto:litalianoec@gmail.com"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-gold transition-colors"
            >
              <Mail size={18} />
              <span>litalianoec@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
