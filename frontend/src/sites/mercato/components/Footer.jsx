import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { Phone, Mail, MapPin, Facebook } from 'lucide-react';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations;

  return (
    <footer className="bg-black border-t border-gold/20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-gold mb-4">Contact</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-gold mt-1 flex-shrink-0" />
                <span>{t.contact.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-gold flex-shrink-0" />
                <a href="tel:+3227200121" className="hover:text-gold transition-colors">
                  {t.contact.phone}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Mail size={20} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <a href="mailto:mercato@mail.be" className="hover:text-gold transition-colors">
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
              <p>{t.hours.lunch}</p>
              <p>{t.hours.dinner}</p>
              <p className="text-sm text-gray-400 mt-3">{t.hours.closed[language]}</p>
            </div>
          </div>

          {/* Social & Links */}
          <div>
            <h3 className="text-xl font-bold text-gold mb-4">Social</h3>
            <a 
              href="https://www.facebook.com/mercatozaventem/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-gray-300 hover:text-gold transition-colors"
            >
              <Facebook size={24} />
              <span>Facebook</span>
            </a>
            <div className="mt-6">
              <img 
                src="/images/mercato/logo/mercato-logo.jpg" 
                alt="Mercato Logo" 
                className="h-20 w-auto opacity-80"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gold/10 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Ristorante Pizzeria Mercato. BTW: BE0553506051</p>
          
          {/* Webmaster Contact */}
          <div className="mt-6 pt-4 border-t border-gold/5 flex items-center justify-center gap-3 text-xs opacity-70 hover:opacity-100 transition-opacity">
            <img 
              src="/images/fworksbuilders-logo.png" 
              alt="fworksbuilders logo" 
              className="h-8 w-auto"
            />
            <div className="flex items-center gap-2">
              <span>Webmaster:</span>
              <a 
                href="https://wa.me/32494516064" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80 transition-colors font-medium flex items-center gap-1"
              >
                fworksbuilders
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
