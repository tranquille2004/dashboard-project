import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSiteConfig } from '../contexts/SiteConfigContext';
import { translations } from '../data/translations';
import { MapPin, Phone, Mail, Clock, Facebook } from 'lucide-react';

const Info = () => {
  const { language } = useLanguage();
  const cfg = useSiteConfig();
  const t = translations;

  const phone = cfg?.phone || t.contact.phone;
  const phone2 = cfg?.phone2 || '';
  const address = cfg?.address || t.contact.address;
  const email = cfg?.email || t.contact.email;
  const phoneTelLink = (phone || '').replace(/\s+/g, '');
  const phone2TelLink = (phone2 || '').replace(/\s+/g, '');

  const dayLabels = { es: ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'], en: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], it: ['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica'], fr: ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'], nl: ['Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag','Zaterdag','Zondag'], de: ['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'] };
  const dayKeys = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
  const labels = dayLabels[language] || dayLabels.es;
  const formatHours = (h) => {
    const lunch = (h?.lunch_open && h?.lunch_close) ? `${h.lunch_open}–${h.lunch_close}` : h?.lunch || '';
    const dinner = (h?.dinner_open && h?.dinner_close) ? `${h.dinner_open}–${h.dinner_close}` : h?.dinner || '';
    return [lunch, dinner].filter(Boolean).join(' · ');
  };
  const hoursRows = (cfg?.opening_hours && Object.keys(cfg.opening_hours).length)
    ? dayKeys.map((k, i) => {
        const text = formatHours(cfg.opening_hours?.[k]);
        return { day: labels[i], text: text || '—' };
      })
    : null;

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
                    <p className="text-gray-300">{address}</p>
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
                    <a href={`tel:${phoneTelLink}`} className="text-gray-300 hover:text-gold transition-colors text-lg">
                      {phone}
                    </a>
                    {phone2 && (
                      <a href={`tel:${phone2TelLink}`} className="block text-gray-300 hover:text-gold transition-colors text-lg mt-1">
                        {phone2}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail size={24} className="text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <a href={`mailto:${email}`} className="text-gray-300 hover:text-gold transition-colors">
                      {email}
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
                {hoursRows ? (
                  hoursRows.map(({ day, text }) => (
                    <div key={day} className="flex items-baseline justify-between gap-4 border-b border-gold/10 pb-2">
                      <span className="text-white font-semibold">{day}</span>
                      <span className="text-gray-300">{text}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div>
                      <h3 className="text-white font-semibold mb-2">{t.hours.lunch[language]}</h3>
                      <p className="text-gold text-2xl font-bold">{t.hours.dinner}</p>
                    </div>
                    <div className="pt-4 border-t border-gold/20">
                      <p className="text-gray-400">{t.hours.closed[language]}</p>
                    </div>
                  </>
                )}
                {cfg?.closure_notice && (
                  <p className="text-sm text-amber-400 italic mt-3">{cfg.closure_notice}</p>
                )}
              </div>
            </div>
          </div>

          {/* Restaurant Photo */}
          <div className="animate-slide-in-right">
            <div className="relative h-full min-h-[500px] rounded-lg overflow-hidden border border-gold/20 group">
              <img
                src="/images/ilsiciliano/about/restaurant-interior.jpg"
                alt="Il Siciliano — Restaurante"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">
                  {{
                    nl: 'Welkom',
                    fr: 'Bienvenue',
                    en: 'Welcome',
                    es: 'Bienvenidos',
                    de: 'Willkommen',
                    it: 'Benvenuti'
                  }[language]}
                </p>
                <h3 className="text-white text-3xl font-bold leading-tight">
                  Il Siciliano
                </h3>
                <p className="text-gray-200 text-sm mt-2 max-w-md">
                  {{
                    nl: 'Authentieke smaken van Zuid-Italië in het hart van Santo Domingo.',
                    fr: "Saveurs authentiques du sud de l'Italie au cœur de Santo Domingo.",
                    en: 'Authentic flavors of Southern Italy in the heart of Santo Domingo.',
                    es: 'Sabores auténticos del sur de Italia en el corazón de Santo Domingo.',
                    de: 'Authentische Aromen Süditaliens im Herzen von Santo Domingo.',
                    it: "Sapori autentici del sud Italia nel cuore di Santo Domingo."
                  }[language]}
                </p>
              </div>
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
