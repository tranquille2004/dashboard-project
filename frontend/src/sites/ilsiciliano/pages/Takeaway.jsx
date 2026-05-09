import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useBasePath } from '../contexts/BasePathContext';
import { translations } from '../data/translations';
import { ShoppingBag, Clock, Phone, Mail, MessageCircle } from 'lucide-react';

const Takeaway = () => {
  const { language } = useLanguage();
  const basePath = useBasePath();
  const t = translations;

  const comingSoonText = {
    es: 'Pedidos online próximamente',
    en: 'Online ordering coming soon',
    it: 'Ordini online prossimamente',
    fr: 'Commandes en ligne bientôt disponibles',
    nl: 'Online bestellen binnenkort beschikbaar',
    de: 'Online-Bestellungen demnächst verfügbar'
  };

  const callToOrderText = {
    es: 'Mientras tanto, llámenos o escríbanos por WhatsApp para hacer su pedido para llevar.',
    en: 'In the meantime, call us or message us via WhatsApp to place your takeaway order.',
    it: 'Nel frattempo, chiamateci o scriveteci su WhatsApp per il vostro ordine da asporto.',
    fr: 'En attendant, appelez-nous ou écrivez-nous sur WhatsApp pour passer votre commande à emporter.',
    nl: 'Bel ons of stuur een WhatsApp om uw afhaalbestelling door te geven.',
    de: 'Rufen Sie uns an oder schreiben Sie uns per WhatsApp, um Ihre Bestellung zum Mitnehmen aufzugeben.'
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <ShoppingBag size={64} className="text-gold mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4">
            {t.takeaway.title[language]}
          </h1>
          <p className="text-2xl text-white font-semibold">{t.takeaway.subtitle[language]}</p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gold/20 text-center hover:border-gold/40 transition-all">
            <Clock size={40} className="text-gold mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">{t.hours.title[language]}</h3>
            <p className="text-gray-300 text-sm">{t.hours.lunch[language]}</p>
            <p className="text-gray-300 text-sm">{t.hours.dinner}</p>
            <p className="text-gray-400 text-xs mt-3">{t.hours.closed[language]}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gold/20 text-center hover:border-gold/40 transition-all">
            <Phone size={40} className="text-gold mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">{{
              es: 'Teléfono', en: 'Phone', it: 'Telefono', fr: 'Téléphone', nl: 'Telefoon', de: 'Telefon'
            }[language]}</h3>
            <a href="tel:+593984110781" className="text-gold hover:text-gold/80 transition-colors text-lg">
              {t.contact.phone}
            </a>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gold/20 text-center hover:border-gold/40 transition-all">
            <ShoppingBag size={40} className="text-gold mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">{{
              es: 'Ver menú', en: 'View menu', it: 'Visualizza menu', fr: 'Voir la carte', nl: 'Bekijk kaart', de: 'Speisekarte'
            }[language]}</h3>
            <Link to={`${basePath}/menu`} className="text-gold hover:text-gold/80 transition-colors">
              {t.menu.title[language]}
            </Link>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-gold/20 mb-8 max-w-3xl mx-auto">
          <p className="text-gray-300 text-center leading-relaxed">
            {t.takeaway.description[language]}
          </p>
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
            {callToOrderText[language]}
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
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="mt-6 pt-6 border-t border-gold/10">
            <a
              href="mailto:info@ilsiciliano.ec"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-gold transition-colors"
            >
              <Mail size={18} />
              <span>info@ilsiciliano.ec</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Takeaway;
