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
                      href="https://www.google.com/maps/search/?api=1&query=Il+Siciliano+Santo Domingo"
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
                    <a href="tel:+593984110781" className="text-gray-300 hover:text-gold transition-colors text-lg">
                      {t.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail size={24} className="text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <a href="mailto:info@ilsiciliano.ec" className="text-gray-300 hover:text-gold transition-colors">
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
                      href="https://www.facebook.com/siciliano_trattoria_pizzeria/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-gold transition-colors"
                    >
                      @siciliano_trattoria_pizzeria
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
                  <h3 className="text-white font-semibold mb-2">{t.hours.lunch[language]}</h3>
                  <p className="text-gold text-2xl font-bold">{t.hours.dinner}</p>
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
                title="Il Siciliano en Google Maps"
                src="https://www.google.com/maps?q=Il+Siciliano+Santo+Domingo+Ecuador&output=embed"
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

        {/* How to find us - Google Maps embed */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gold/20 overflow-hidden mb-12">
          <div className="p-8 pb-0">
            <h2 className="text-3xl font-bold text-gold mb-2 flex items-center gap-3">
              <MapPin size={28} />
              {{
                nl: 'Hoe te komen',
                fr: 'Comment venir',
                en: 'How to find us',
                es: 'Cómo llegar',
                de: 'So finden Sie uns',
                it: 'Come arrivare'
              }[language]}
            </h2>
            <p className="text-gray-300 mb-6">
              {{
                nl: 'Wij liggen in het hart van Santo Domingo, goed bereikbaar met auto en taxi. Gratis parkeren in de omgeving.',
                fr: 'Nous sommes situés au cœur de Santo Domingo, facilement accessible en voiture ou en taxi. Stationnement gratuit à proximité.',
                en: 'We are located in the heart of Santo Domingo, easily reached by car or taxi. Free parking nearby.',
                es: 'Estamos ubicados en el corazón de Santo Domingo, de fácil acceso en auto o taxi. Parqueo gratuito en los alrededores.',
                de: 'Wir befinden uns im Herzen von Santo Domingo, gut erreichbar mit Auto oder Taxi. Kostenlose Parkplätze in der Nähe.',
                it: 'Siamo nel cuore di Santo Domingo, facilmente raggiungibile in auto o taxi. Parcheggio gratuito nelle vicinanze.'
              }[language]}
            </p>
          </div>
          <div className="relative w-full" style={{ paddingBottom: '50%' }}>
            <iframe
              title="Il Siciliano en Google Maps"
              src="https://www.google.com/maps?q=Il+Siciliano+Santo+Domingo+Ecuador&output=embed"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="p-6 bg-black/60 border-t border-gold/10 flex flex-wrap gap-3 items-center justify-center">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Il+Siciliano+Santo+Domingo+Ecuador"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-black font-semibold px-6 py-3 rounded-md transition-all shadow-lg"
            >
              <MapPin size={18} />
              {{
                nl: 'Route berekenen',
                fr: "Calculer l'itinéraire",
                en: 'Get directions',
                es: 'Cómo llegar (ruta)',
                de: 'Route berechnen',
                it: 'Calcola il percorso'
              }[language]}
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Il+Siciliano+Santo+Domingo+Ecuador"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-gold text-gold hover:bg-gold/10 font-semibold px-6 py-3 rounded-md transition-all"
            >
              {{
                nl: 'Open in Google Maps',
                fr: 'Ouvrir dans Google Maps',
                en: 'Open in Google Maps',
                es: 'Abrir en Google Maps',
                de: 'In Google Maps öffnen',
                it: 'Apri in Google Maps'
              }[language]}
            </a>
          </div>
        </div>

        {/* Images */}
        <div className="grid md:grid-cols-3 gap-6">
          <img
            src="/images/ilsiciliano/gallery/gallery-11.jpg"
            alt="La Trinacria - símbolo siciliano"
            className="w-full h-72 object-cover rounded-lg shadow-xl border border-gold/20 hover:scale-105 transition-transform duration-500"
          />
          <img
            src="/images/ilsiciliano/gallery/gallery-12.jpg"
            alt="Nuestra bodega"
            className="w-full h-72 object-cover rounded-lg shadow-xl border border-gold/20 hover:scale-105 transition-transform duration-500"
          />
          <img
            src="/images/ilsiciliano/gallery/gallery-13.jpg"
            alt="Ambiente del restaurante"
            className="w-full h-72 object-cover rounded-lg shadow-xl border border-gold/20 hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Info;
