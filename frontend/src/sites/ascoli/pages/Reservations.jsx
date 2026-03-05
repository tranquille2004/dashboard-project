import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import { useLanguage } from '../context/LanguageContext';
import { allTranslations } from '../translations/allTranslations';

const Reservations = () => {
  const { currentLanguage } = useLanguage();
  const t = allTranslations.reservations[currentLanguage] || allTranslations.reservations.nl;

  useEffect(() => {
    // Load JotForm script
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.jotformEmbedHandler) {
        window.jotformEmbedHandler(
          'iframe[id="JotFormIFrame-81428826238362"]',
          'https://form.jotform.com/'
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Hero
        title={t.title}
        subtitle={t.subtitle}
        image="/images/ascoli/gallery/img-5497_1_orig.jpg"
      />

      <section className="py-16 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Reservation Instructions */}
            <div className="bg-[#2a2a2a] border border-[#D4A574]/30 rounded-lg p-8 mb-12">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-200 mb-6 leading-relaxed">
                  <strong className="text-[#D4A574]">{t.instructions}</strong> {t.confirmed} <strong className="text-white">{t.notContacted}</strong> {t.unlessBooked}{' '}
                  <strong className="text-white">{t.groupReservation}</strong>
                </p>

                <div className="bg-[#8B4513]/20 border-l-4 border-[#D4A574] p-6 mt-6 rounded-r-lg">
                  <p className="text-white text-lg">
                    <span className="text-[#D4A574] font-semibold">{t.closedSaturday}</span> <span className="text-green-400 font-bold">{t.eveningOpen}</span> <span className="text-[#D4A574] font-semibold">{t.sundayClosed}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* JotForm Embed */}
            <div className="bg-white rounded-lg overflow-hidden shadow-xl">
              <iframe
                id="JotFormIFrame-81428826238362"
                title="ASCOLI Reservation Form"
                onLoad={() => window.parent.scrollTo(0, 0)}
                allowFullScreen
                allow="geolocation; microphone; camera"
                src="https://form.jotform.com/81428826238362"
                frameBorder="0"
                style={{
                  minWidth: '100%',
                  maxWidth: '100%',
                  height: '539px',
                  border: 'none',
                }}
                scrolling="no"
              />
            </div>

            {/* Contact Information */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center bg-[#2a2a2a] rounded-lg p-8 border border-[#D4A574]/30">
              <div>
                <h4 className="text-[#D4A574] font-semibold mb-2 uppercase text-sm">{t.website}</h4>
                <p className="text-white">www.ascolizaventem.com</p>
              </div>
              <div>
                <h4 className="text-[#D4A574] font-semibold mb-2 uppercase text-sm">{t.phone}</h4>
                <a href="tel:+3227254545" className="text-white hover:text-[#D4A574] transition-colors">
                  +32 2 725 45 45
                </a>
              </div>
              <div>
                <h4 className="text-[#D4A574] font-semibold mb-2 uppercase text-sm">{t.address}</h4>
                <p className="text-white">
                  Hector Henneaulaan 136<br />
                  1930 Zaventem
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reservations;
