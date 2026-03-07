import React from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { allTranslations } from '../translations/allTranslations';

const Footer = ({ basePath = '' }) => {
  const { currentLanguage } = useLanguage();
  const t = allTranslations.footer[currentLanguage] || allTranslations.footer.nl;
  const navT = allTranslations.nav[currentLanguage] || allTranslations.nav.nl;
  
  return (
    <footer className="bg-[#2a2a2a] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-2xl font-serif mb-4 text-[#6b1f1f]">L'Ascoli</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t.about}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#a48f7a]">{t.contact}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-[#6b1f1f] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Hector Henneaulaan 136<br />
                  1930 Zaventem
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#6b1f1f]" />
                <a href="tel:+3227254545" className="text-gray-400 hover:text-[#6b1f1f] transition-colors">
                  +32 2 725 45 45
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#a48f7a]">{t.openingHours}</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <Clock className="w-5 h-5 text-[#6b1f1f] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Ma - Vr:</p>
                  <p>12:00 - 14:00</p>
                  <p>18:30 - 22:30</p>
                  <p className="font-medium mt-2">Za:</p>
                  <p>18:30 - 22:30</p>
                  <p className="font-medium mt-2">Zo:</p>
                  <p>Gesloten</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#a48f7a]">{t.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={`${basePath}/menu`} className="text-gray-400 hover:text-[#6b1f1f] transition-colors">
                  {t.menu}
                </Link>
              </li>
              <li>
                <Link to={`${basePath}/group-menu`} className="text-gray-400 hover:text-[#6b1f1f] transition-colors">
                  {t.groupMenus}
                </Link>
              </li>
              <li>
                <Link to={`${basePath}/reservations`} className="text-gray-400 hover:text-[#6b1f1f] transition-colors">
                  {navT.reservations}
                </Link>
              </li>
              <li>
                <Link to={`${basePath}/gallery`} className="text-gray-400 hover:text-[#6b1f1f] transition-colors">
                  {t.photoGallery}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="text-center text-sm text-gray-500 mb-6">
            <p>&copy; {new Date().getFullYear()} L'Ascoli Zaventem. {t.rights}.</p>
            <p className="mt-2 italic text-xs">{t.tagline}</p>
          </div>
          
          {/* Webmaster Info - Exact zoals Mercato */}
          <div className="text-center text-xs text-gray-500 pt-6 border-t border-gray-800">
            <p className="mb-3">{t.webmasterText}</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <img 
                src="/images/fworksbuilders-logo.png" 
                alt="fworksbuilders" 
                className="h-8 w-auto"
              />
              <span className="text-gray-400">{t.webmaster}</span>
              <span className="text-gray-300">fworksbuilders</span>
              <span className="text-gray-400">|</span>
              <a 
                href="https://wa.me/32494516064" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                +32 494 51 60 64 (WhatsApp)
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
