import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useBasePath } from '../contexts/BasePathContext';
import { translations } from '../data/translations';
import { ShoppingBag, Clock, Phone, Info, ArrowRight } from 'lucide-react';
import { IMG } from '@/utils/imageHelper';

const Takeaway = () => {
  const { language } = useLanguage();
  const basePath = useBasePath();
  const navigate = useNavigate();
  const t = translations;
  const iframeRef = useRef(null);

  // Listen for JotForm submission via postMessage
  useEffect(() => {
    const handleMessage = (event) => {
      // JotForm sends messages from these origins
      if (event.origin.includes('jotform.com')) {
        try {
          const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
          
          // Various ways JotForm signals completion
          if (data) {
            if (data.action === 'submission-completed' || 
                data.action === 'formSubmitted' ||
                data.submissionID ||
                (data.type === 'form-submit-success')) {
              navigate(`${basePath}/confirmation`);
              return;
            }
          }
        } catch (e) {
          // If it's a string containing submission info
          if (typeof event.data === 'string') {
            const dataStr = event.data.toLowerCase();
            if (dataStr.includes('submit') || dataStr.includes('thank') || dataStr.includes('success')) {
              navigate(`${basePath}/confirmation`);
            }
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Also load JotForm's embed handler for better detection
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    script.async = true;
    document.body.appendChild(script);
    
    script.onload = () => {
      if (window.jotformEmbedHandler) {
        window.jotformEmbedHandler(
          'iframe[id="JotFormIFrame-201116780473653"]',
          'https://form.jotform.com/'
        );
      }
    };

    return () => {
      window.removeEventListener('message', handleMessage);
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, [navigate, basePath]);

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

        {/* Important Notice */}
        <div className="bg-gold/10 border-l-4 border-gold p-6 rounded-lg mb-8 max-w-3xl mx-auto">
          <div className="flex items-start space-x-4">
            <Info className="text-gold flex-shrink-0 mt-1" size={24} />
            <div>
              <p className="text-white font-semibold mb-2">
                {t.takeaway.note[language]}{' '}
                <Link to={`${basePath}/reserve`} className="text-gold hover:text-gold/80 underline inline-flex items-center">
                  {t.takeaway.clickHere[language]}
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gold/20 text-center hover:border-gold/40 transition-all">
            <Clock size={40} className="text-gold mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">{t.hours.title[language]}</h3>
            <p className="text-gray-300 text-sm">{t.hours.lunch}</p>
            <p className="text-gray-300 text-sm">{t.hours.dinner}</p>
            <p className="text-gray-400 text-xs mt-3">{t.hours.closed[language]}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gold/20 text-center hover:border-gold/40 transition-all">
            <Phone size={40} className="text-gold mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">Telefoon</h3>
            <a href="tel:+3227200121" className="text-gold hover:text-gold/80 transition-colors text-lg">
              {t.contact.phone}
            </a>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gold/20 text-center hover:border-gold/40 transition-all">
            <ShoppingBag size={40} className="text-gold mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">{{
              nl: 'Bekijk kaart',
              fr: 'Voir la carte',
              en: 'View menu',
              es: 'Ver menú',
              de: 'Speisekarte ansehen',
              it: 'Visualizza menu'
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

        {/* Holiday Notice */}
        <div className="bg-gradient-to-r from-red-900/20 to-gold/10 border border-gold/30 p-6 rounded-lg mb-8 text-center">
          <p className="text-white font-semibold">{t.home.closedNotice[language]}</p>
        </div>

        {/* Jotform Embed */}
        <div className="bg-gradient-to-br from-gray-900 to-black p-6 md:p-12 rounded-lg border border-gold/20 shadow-2xl">
          <iframe
            ref={iframeRef}
            id="JotFormIFrame-201116780473653"
            title="Afhalen Formulier"
            src="https://form.jotform.com/201116780473653"
            className="w-full"
            style={{ minHeight: '1200px', border: 'none' }}
            scrolling="yes"
          />
        </div>

        {/* Food Images */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <img
            src={IMG("/images/mercato/gallery/475539315-9097135276989113-4629240725372122729-n.jpg")}
            alt="Italian Food"
            className="w-full h-64 object-cover rounded-lg shadow-xl border border-gold/20 hover:scale-105 transition-transform duration-500"
          />
          <img
            src={IMG("/images/mercato/gallery/478330133-1140135614790013-1825406155141421292-n.jpg")}
            alt="Food 2"
            className="w-full h-64 object-cover rounded-lg shadow-xl border border-gold/20 hover:scale-105 transition-transform duration-500"
          />
          <img
            src={IMG("/images/mercato/gallery/481243795-9244475188921787-9185171556075761483-n.jpg")}
            alt="Food 3"
            className="w-full h-64 object-cover rounded-lg shadow-xl border border-gold/20 hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Takeaway;
