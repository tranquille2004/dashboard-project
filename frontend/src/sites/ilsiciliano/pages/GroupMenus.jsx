import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useBasePath } from '../contexts/BasePathContext';
import { Users, Mail, Phone } from 'lucide-react';

const GroupMenus = () => {
  const { language } = useLanguage();
  const basePath = useBasePath();

  const pageTitle = {
    es: 'Menús de Grupo',
    en: 'Group Menus',
    it: 'Menu di Gruppo',
    fr: 'Menus de Groupe',
    nl: 'Groepmenus',
    de: 'Gruppenmenüs'
  };

  const comingSoon = {
    es: 'Próximamente',
    en: 'Coming soon',
    it: 'Prossimamente',
    fr: 'Bientôt disponible',
    nl: 'Binnenkort beschikbaar',
    de: 'Bald verfügbar'
  };

  const description = {
    es: 'Estamos preparando nuestras propuestas de menús para grupos. Para celebraciones, eventos corporativos, cumpleaños y reuniones especiales, contáctenos directamente — diseñaremos un menú a medida para su grupo.',
    en: 'We are preparing our group menu offerings. For celebrations, corporate events, birthdays and special gatherings, contact us directly — we will design a tailor-made menu for your group.',
    it: 'Stiamo preparando le nostre proposte di menu per gruppi. Per celebrazioni, eventi aziendali, compleanni e riunioni speciali, contattateci direttamente — progetteremo un menu su misura per il vostro gruppo.',
    fr: 'Nous préparons nos propositions de menus pour groupes. Pour célébrations, événements d\'entreprise, anniversaires et réunions spéciales, contactez-nous directement — nous concevrons un menu sur mesure pour votre groupe.',
    nl: 'We bereiden onze groepsmenu-aanbiedingen voor. Voor vieringen, bedrijfsevenementen, verjaardagen en speciale bijeenkomsten kunt u rechtstreeks contact met ons opnemen — we stellen een menu op maat samen voor uw groep.',
    de: 'Wir bereiten unsere Gruppen-Menüvorschläge vor. Für Feiern, Firmenveranstaltungen, Geburtstage und besondere Anlässe kontaktieren Sie uns direkt — wir gestalten ein maßgeschneidertes Menü für Ihre Gruppe.'
  };

  const contactLabel = {
    es: 'Contáctenos para grupos',
    en: 'Contact us for groups',
    it: 'Contattateci per gruppi',
    fr: 'Contactez-nous pour les groupes',
    nl: 'Neem contact op voor groepen',
    de: 'Kontaktieren Sie uns für Gruppen'
  };

  const reserveLabel = {
    es: 'Reservar mesa',
    en: 'Reserve a table',
    it: 'Prenota un tavolo',
    fr: 'Réserver une table',
    nl: 'Reserveer een tafel',
    de: 'Tisch reservieren'
  };

  const t = (obj) => obj[language] || obj.es;

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Users size={56} className="text-gold mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4">
            {t(pageTitle)}
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-2xl text-italian-green font-semibold uppercase tracking-wider">
            {t(comingSoon)}
          </p>
        </div>

        {/* Description card */}
        <div className="bg-gradient-to-br from-gray-900 to-black p-8 md:p-12 rounded-lg border border-gold/20 shadow-2xl animate-fade-in">
          <p className="text-gray-200 text-lg leading-relaxed text-center">
            {t(description)}
          </p>

          <div className="mt-10 pt-8 border-t border-gold/10">
            <h2 className="text-xl font-bold text-gold text-center mb-6">
              {t(contactLabel)}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="tel:+593984110781"
                className="inline-flex items-center gap-3 text-gray-200 hover:text-gold transition-colors"
              >
                <Phone size={20} className="text-gold" />
                <span className="text-lg">+593 98 411 0781</span>
              </a>
              <a
                href="mailto:litalianoec@gmail.com"
                className="inline-flex items-center gap-3 text-gray-200 hover:text-gold transition-colors"
              >
                <Mail size={20} className="text-gold" />
                <span className="text-lg">litalianoec@gmail.com</span>
              </a>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to={`${basePath}/reserve`}
              className="inline-flex items-center px-8 py-4 bg-gold text-black font-bold rounded-lg hover:bg-gold/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t(reserveLabel)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupMenus;
