import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useBasePath } from '../contexts/BasePathContext';
import { translations } from '../data/translations';

const Footer = () => {
  const { language } = useLanguage();
  const basePath = useBasePath();
  const t = translations;
  const homePath = basePath || '/';

  const labels = {
    contact: { es:'Contacto', en:'Contact', fr:'Contact', it:'Contatto', de:'Kontakt' },
    location: { es:'Ubicación', en:'Location', fr:'Emplacement', it:'Posizione', de:'Standort' },
    social: { es:'Síguenos', en:'Follow Us', fr:'Suivez-nous', it:'Seguici', de:'Folgen Sie uns' },
    rights: { es:'Todos los derechos reservados.', en:'All rights reserved.', fr:'Tous droits réservés.', it:'Tutti i diritti riservati.', de:'Alle Rechte vorbehalten.' },
    webBy: { es:'Sitio web diseñado por', en:'Website designed by', fr:'Site web conçu par', it:'Sito web progettato da', de:'Website gestaltet von' }
  };

  return (
    <footer className="bg-black border-t border-gold/20 text-cream" style={{color:'#F5E6CA'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center mb-10">
          <Link to={homePath}>
            <img src="/images/sanfrancisco/logo/sanfrancisco-logo.png" alt="San Francisco Hacienda Turística" className="h-28 md:h-36 w-auto" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-gold font-bold text-lg mb-4 uppercase tracking-wider">{labels.contact[language]}</h3>
            <div className="space-y-3 text-sm">
              <a href={`tel:+593999060566`} className="flex items-center gap-2 hover:text-gold transition-colors">
                <Phone size={16} className="text-gold" />
                <span>{t.contact.phone}</span>
              </a>
              <a href={t.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                <MessageCircle size={16} className="text-gold" />
                <span>WhatsApp</span>
              </a>
              <a href={`mailto:${t.contact.email}`} className="flex items-center gap-2 hover:text-gold transition-colors break-all">
                <Mail size={16} className="text-gold flex-shrink-0" />
                <span className="text-xs">{t.contact.email}</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-gold font-bold text-lg mb-4 uppercase tracking-wider">{labels.location[language]}</h3>
            <div className="flex items-start gap-2 text-sm">
              <MapPin size={16} className="text-gold flex-shrink-0 mt-1" />
              <span>{t.contact.address}</span>
            </div>
          </div>

          <div>
            <h3 className="text-gold font-bold text-lg mb-4 uppercase tracking-wider">{labels.social[language]}</h3>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/haciendaturisticasanfrancisco/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-3 border border-gold/40 rounded-full hover:bg-gold hover:text-black hover:border-gold transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/clubsanfranciscoec" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-3 border border-gold/40 rounded-full hover:bg-gold hover:text-black hover:border-gold transition-all">
                <Facebook size={20} />
              </a>
              <a href="https://www.tiktok.com/@haciendasanfranciso" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="p-3 border border-gold/40 rounded-full hover:bg-gold hover:text-black hover:border-gold transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gold/10 text-center text-sm text-cream/70">
          <p>&copy; {new Date().getFullYear()} Hacienda Turística San Francisco. {labels.rights[language]}</p>
          <p className="mt-2">
            {labels.webBy[language]}{' '}
            <a href="https://www.fworksbuilders.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 transition-colors font-semibold">
              fworksbuilders
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
