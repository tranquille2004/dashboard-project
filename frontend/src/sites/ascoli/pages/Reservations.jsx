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
        image="https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5497_1_orig.jpg"
      />

      <section className="py-16 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Important Notice */}
            <div className="bg-[#6b1f1f]/10 border border-[#6b1f1f] rounded-sm p-8 mb-12">
              <p className="text-[#6b1f1f] text-lg text-center font-semibold">
                <strong>{t.closedNotice}</strong><br />
                {t.closedDates}
              </p>
            </div>

            {/* Reservation Instructions */}
            <div className="bg-gray-900 border border-gray-800 rounded-sm p-8 mb-12">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-6">
                  <strong className="text-white">{t.instructions}</strong> {t.confirmed} <strong>{t.notContacted}</strong> {t.unlessBooked}{' '}
                  <strong>{t.groupReservation}</strong>
                </p>

                <div className="bg-[#6b1f1f]/10 border-l-4 border-[#6b1f1f] p-6 mt-6">
                  <p className="text-[#6b1f1f] text-lg font-semibold">
                    {t.closedSaturday} <span className="text-green-500">{t.eveningOpen}</span> {t.sundayClosed}
                  </p>
                </div>
              </div>
            </div>

            {/* JotForm Embed */}
            <div className="bg-white rounded-sm overflow-hidden">
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
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="text-[#a48f7a] font-semibold mb-2 uppercase text-sm">{t.website}</h4>
                <p className="text-gray-400">www.ascolizaventem.com</p>
              </div>
              <div>
                <h4 className="text-[#a48f7a] font-semibold mb-2 uppercase text-sm">{t.phone}</h4>
                <a href="tel:+3227254545" className="text-gray-400 hover:text-[#6b1f1f] transition-colors">
                  +32 2 725 45 45
                </a>
              </div>
              <div>
                <h4 className="text-[#a48f7a] font-semibold mb-2 uppercase text-sm">{t.address}</h4>
                <p className="text-gray-400">
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
