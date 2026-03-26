import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { IMG } from '../utils/imageHelper';

const Qualite = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-16 bg-[#f5f1ed]">
      {/* Hero Section with Background Image */}
      <section 
        className="relative bg-cover bg-center py-32 md:py-40 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(184, 153, 158, 0.70), rgba(184, 153, 158, 0.70)), url(${IMG('/images/gallery/qualite-hero.jpg')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.3em] text-white mb-4">
            {t.qualite.title}
          </h1>
          <p className="text-center text-lg md:text-xl font-light text-white/90">
            {t.qualite.subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {t.qualite.processes.map((process, index) => (
              <div
                key={index}
                className="border-l-4 border-[#b8999e] pl-6 md:pl-8 py-4 hover:bg-gray-50 transition-colors rounded-r-lg"
              >
                <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-4">
                  {process.title}
                </h3>
                <p className="text-gray-800 leading-relaxed text-base md:text-lg" style={{textAlign: 'left'}}>
                  {process.content}
                </p>
              </div>
            ))}
          </div>

          {/* Image Section */}
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={IMG("/images/gallery/photo10.jpg")}
                alt="Cacao process"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy" style={{ opacity: 1 }}
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={IMG("/images/gallery/photo12.jpg")}
                alt="Cacao quality"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy" style={{ opacity: 1 }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Qualite;
