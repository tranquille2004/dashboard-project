import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { MapPin, Phone, Mail, Clock, Facebook } from 'lucide-react';

const Info = () => {
  const { language } = useLanguage();
  const t = translations;

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4">
            {{
              nl: 'Praktische Info',
              fr: 'Infos Pratiques',
              en: 'Practical Information',
              es: 'Información Práctica',
              de: 'Praktische Informationen',
              it: 'Informazioni Pratiche'
            }[language]}
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-gold/20 hover:border-gold/40 transition-all">
              <h2 className="text-3xl font-bold text-gold mb-6">Contact</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin size={24} className="text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">{{
                      nl: 'Adres',
                      fr: 'Adresse',
                      en: 'Address',
                      es: 'Dirección',
                      de: 'Adresse',
                      it: 'Indirizzo'
                    }[language]}</h3>
                    <p className="text-gray-300">{t.contact.address}</p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Ristorante+Pizzeria+Mercato+Zaventem"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:text-gold/80 text-sm mt-2 inline-block"
                    >
                      {{
                        nl: 'Open in Google Maps',
                        fr: 'Ouvrir dans Google Maps',
                        en: 'Open in Google Maps',
                        es: 'Abrir en Google Maps',
                        de: 'In Google Maps öffnen',
                        it: 'Apri in Google Maps'
                      }[language]} →
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone size={24} className="text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">Telefoon / Téléphone</h3>
                    <a href="tel:+3227200121" className="text-gray-300 hover:text-gold transition-colors text-lg">
                      {t.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail size={24} className="text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <a href="mailto:mercato@mail.be" className="text-gray-300 hover:text-gold transition-colors">
                      {t.contact.email}
                    </a>
                    <p className="text-xs text-gray-400 mt-2">{t.contact.emailNote[language]}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Facebook size={24} className="text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">Facebook</h3>
                    <a
                      href="https://www.facebook.com/mercatozaventem/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-gold transition-colors"
                    >
                      @mercatozaventem
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-gold/20 hover:border-gold/40 transition-all">
              <div className="flex items-center space-x-3 mb-6">
                <Clock size={32} className="text-gold" />
                <h2 className="text-3xl font-bold text-gold">{t.hours.title[language]}</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">{{
                    nl: 'Lunch',
                    fr: 'Déjeuner',
                    en: 'Lunch',
                    es: 'Almuerzo',
                    de: 'Mittagessen',
                    it: 'Pranzo'
                  }[language]}</h3>
                  <p className="text-gray-300 text-xl">{t.hours.lunch}</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{{
                    nl: 'Diner',
                    fr: 'Dîner',
                    en: 'Dinner',
                    es: 'Cena',
                    de: 'Abendessen',
                    it: 'Cena'
                  }[language]}</h3>
                  <p className="text-gray-300 text-xl">{t.hours.dinner}</p>
                </div>
                <div className="pt-4 border-t border-gold/20">
                  <p className="text-gray-400">{t.hours.closed[language]}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="animate-slide-in-right">
            <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border border-gold/20 h-full">
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.7241234567!2d4.467890315674!3d50.883333379533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3dda8e8e8e8e8%3A0x8e8e8e8e8e8e8e8!2sStationsstraat%2035%2C%201930%20Zaventem!5e0!3m2!1sen!2sbe!4v1234567890123!5m2!1sen!2sbe"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '500px', borderRadius: '8px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Holiday Notice */}
        <div className="bg-gradient-to-r from-red-900/20 to-gold/10 border border-gold/30 p-8 rounded-lg text-center mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">
            {{
              nl: 'Sluitingsdagen',
              fr: 'Jours de fermeture',
              en: 'Closing Days',
              es: 'Días de cierre',
              de: 'Schließtage',
              it: 'Giorni di Chiusura'
            }[language]}
          </h3>
          <p className="text-white text-lg">{t.home.closedNotice[language]}</p>
        </div>

        {/* Images */}
        <div className="grid md:grid-cols-3 gap-6">
          <img
            src="/images/mercato/gallery/img-20160704-110159.jpg"
            alt="Interior 1"
            className="w-full h-72 object-cover rounded-lg shadow-xl border border-gold/20 hover:scale-105 transition-transform duration-500"
          />
          <img
            src="/images/mercato/gallery/3_1.jpg"
            alt="Italian Restaurant"
            className="w-full h-72 object-cover rounded-lg shadow-xl border border-gold/20 hover:scale-105 transition-transform duration-500"
          />
          <img
            src="/images/mercato/gallery/dscn0463.jpg"
            alt="Interior 3"
            className="w-full h-72 object-cover rounded-lg shadow-xl border border-gold/20 hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Info;
