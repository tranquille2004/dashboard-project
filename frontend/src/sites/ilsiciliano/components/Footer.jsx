import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations;

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
                <span>{t.contact.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-gold flex-shrink-0" />
                <a href="tel:+593984110781" className="hover:text-gold transition-colors">
                  {t.contact.phone}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Mail size={20} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <a href="mailto:info@ilsiciliano.ec" className="hover:text-gold transition-colors">
                    {t.contact.email}
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
              <p>{t.hours.lunch[language]}</p>
              <p>{t.hours.dinner}</p>
              <p className="text-sm text-gray-400 mt-3">{t.hours.closed[language]}</p>
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
