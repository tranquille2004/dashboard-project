import React from 'react';
import Hero from '../components/Hero';
import { MapPin, Phone, Clock, Mail, Car } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { allTranslations } from '../translations/allTranslations';

const Info = () => {
  const { currentLanguage } = useLanguage();
  const t = allTranslations.info[currentLanguage] || allTranslations.info.nl;

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Hero
        title={t.title}
        subtitle={t.subtitle}
        image="/images/ascoli/gallery/img-5714_1_orig.jpg"
      />

      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-serif text-[#a48f7a] mb-8">{t.contactInfo}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 text-white">
                  <MapPin className="w-6 h-6 text-[#6b1f1f] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">{t.address}</h3>
                    <p className="text-gray-400">
                      Hector Henneaulaan 136<br />
                      1930 Zaventem<br />
                      België
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-white">
                  <Phone className="w-6 h-6 text-[#6b1f1f] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">{t.phone}</h3>
                    <a href="tel:+3227254545" className="text-gray-400 hover:text-[#6b1f1f] transition-colors">
                      +32 2 725 45 45
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-white">
                  <Clock className="w-6 h-6 text-[#6b1f1f] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">{t.openingHours}</h3>
                    <div className="text-gray-400 space-y-2">
                      <p><span className="font-medium text-white">{t.mondayFriday}</span></p>
                      <p className="ml-4">12:00 - 14:00</p>
                      <p className="ml-4">18:30 - 22:30</p>
                      <p className="mt-2"><span className="font-medium text-white">{t.saturday}</span></p>
                      <p className="ml-4">18:30 - 22:30</p>
                      <p className="mt-2"><span className="font-medium text-white">{t.sunday}</span></p>
                      <p className="ml-4">{t.closed}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-white">
                  <Car className="w-6 h-6 text-[#6b1f1f] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">{t.accessibility}</h3>
                    <p className="text-gray-400" style={{ whiteSpace: 'pre-line' }}>
                      {t.accessibilityText}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div>
              <h2 className="text-3xl font-serif text-[#a48f7a] mb-8">{t.location}</h2>
              <div className="aspect-video bg-gray-800 rounded-sm overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.8675939089746!2d4.474851876929906!3d50.89009047167477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3dda5c78e8c93%3A0x8b7c9c0f8e9c8f0a!2sHector%20Henneaulaan%20136%2C%201930%20Zaventem!5e0!3m2!1snl!2sbe!4v1699999999999!5m2!1snl!2sbe"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="L'Ascoli Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Notice */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-[#6b1f1f]/10 border border-[#6b1f1f] rounded-sm p-8">
              <h3 className="text-2xl font-serif text-[#6b1f1f] mb-4">
                {t.importantNotice}
              </h3>
              <p className="text-white text-lg mb-4">
                <strong>{t.closedPeriod}</strong>
              </p>
              <p className="text-white text-lg" style={{ whiteSpace: 'pre-line' }}>
                {t.closedDates}
              </p>
              <div className="mt-6 pt-6 border-t border-[#6b1f1f]/30">
                <p className="text-gray-300" style={{ whiteSpace: 'pre-line' }}>
                  <strong>{t.closedPeriodFR}</strong><br />
                  {t.closedDatesFR}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Takeaway Notice */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-serif text-[#a48f7a] mb-4">
            {t.takeawayTitle}
          </h3>
          <p className="text-gray-300 text-lg">
            {t.takeawayText}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Info;
