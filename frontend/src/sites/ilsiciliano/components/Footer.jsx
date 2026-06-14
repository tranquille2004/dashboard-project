import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useSiteConfig } from '../contexts/SiteConfigContext';
import { translations } from '../data/translations';
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  const { language } = useLanguage();
  const cfg = useSiteConfig();
  const t = translations;

  const phone = cfg?.phone || t.contact.phone;
  const phone2 = cfg?.phone2 || '';
  const address = cfg?.address || t.contact.address;
  const email = cfg?.email || t.contact.email;
  const phoneTelLink = (phone || '').replace(/\s+/g, '');
  const phone2TelLink = (phone2 || '').replace(/\s+/g, '');

  // Build hours array from DB config (only days with values)
  const dayLabels = { es: ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'], en: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], it: ['Lun','Mar','Mer','Gio','Ven','Sab','Dom'], fr: ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'], nl: ['Ma','Di','Wo','Do','Vr','Za','Zo'], de: ['Mo','Di','Mi','Do','Fr','Sa','So'] };
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
        return text ? { day: labels[i], text } : null;
      }).filter(Boolean)
    : null;

  return (
    <footer className="bg-black border-t border-gold/20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo Header */}
        <div className="flex justify-center mb-10">
          <img
            src="/images/ilsiciliano/logo/ilsiciliano-logo.png"
            alt="Il Siciliano - Trattoria Pizzería"
            className="h-32 md:h-40 w-auto"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-gold mb-4">Contacto</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-gold mt-1 flex-shrink-0" />
                <span>{address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-gold flex-shrink-0" />
                <a href={`tel:${phoneTelLink}`} className="hover:text-gold transition-colors">
                  {phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle size={20} className="text-green-400 flex-shrink-0" />
                <a
                  href={`https://wa.me/${(phone2 || phone).replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  WhatsApp: {phone2 || phone}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Mail size={20} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <a href={`mailto:${email}`} className="hover:text-gold transition-colors">
                    {email}
                  </a>
                  <p className="text-xs text-gray-400 mt-1">
                    {t.contact.emailNote[language]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold text-gold mb-4">{t.hours.title[language]}</h3>
            <div className="space-y-2 text-gray-300">
              {hoursRows ? (
                hoursRows.map(({ day, text }) => (
                  <p key={day}><span className="text-gold font-semibold mr-2">{day}:</span>{text}</p>
                ))
              ) : (
                <>
                  <p>{t.hours.lunch[language]}</p>
                  <p>{t.hours.dinner}</p>
                  <p className="text-sm text-gray-400 mt-3">{t.hours.closed[language]}</p>
                </>
              )}
              {cfg?.closure_notice && (
                <p className="text-sm text-amber-400 mt-3 italic">{cfg.closure_notice}</p>
              )}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-bold text-gold mb-4">Síguenos</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="https://www.facebook.com/sicilianotrattoriapizzeria/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-gray-300 hover:text-gold transition-colors"
              >
                <Facebook size={22} />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/siciliano_trattoria_pizzeria/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-gray-300 hover:text-gold transition-colors"
              >
                <Instagram size={22} />
                <span>@siciliano_trattoria_pizzeria</span>
              </a>
              <a
                href="https://www.tiktok.com/@siciliano_trattoria"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-gray-300 hover:text-gold transition-colors"
              >
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/></svg>
                <span>@siciliano_trattoria</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gold/10 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Il Siciliano — Trattoria Pizzería — Santo Domingo, Ecuador</p>
          
          {/* Webmaster Contact */}
          <div className="mt-6 pt-4 border-t border-gold/5 flex items-center justify-center gap-3 text-xs opacity-70 hover:opacity-100 transition-opacity flex-wrap">
            <img 
              src="/images/fworksbuilders-logo.png" 
              alt="fworksbuilders logo" 
              className="h-8 w-auto"
            />
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span>Webmaster:</span>
              <a 
                href="https://www.fworksbuilders.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80 transition-colors font-medium"
              >
                fworksbuilders
              </a>
              <span className="text-gray-500">—</span>
              <a 
                href="https://wa.me/32494516064" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80 transition-colors font-medium flex items-center gap-1"
              >
                <Phone size={12} className="inline" />
                <span>+32 494 51 60 64 (WhatsApp)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
