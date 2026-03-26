import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { IMG } from '../utils/imageHelper';

const Tracabilite = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-16 bg-[#f5f1ed]">
      {/* Hero Section with Background Image */}
      <section 
        className="relative bg-cover bg-center py-32 md:py-40 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(184, 153, 158, 0.70), rgba(184, 153, 158, 0.70)), url(${IMG('/images/gallery/tracabilite-hero.jpg')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.3em] text-white">
            {t.tracabilite.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-800 leading-relaxed text-base md:text-lg mb-8" style={{textAlign: 'left'}}>
            {t.tracabilite.intro}
          </p>

          <p className="text-gray-800 leading-relaxed text-base md:text-lg mb-10 italic" style={{textAlign: 'left'}}>
            {t.tracabilite.subtitle}
          </p>

          {/* Elements List */}
          <div className="bg-[#f5f1ed] p-6 md:p-8 rounded-lg mb-10 shadow-md">
            <div className="grid md:grid-cols-2 gap-4">
              {t.tracabilite.elements.map((element, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="text-[#b8999e] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-900">{element}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-gray-800 leading-relaxed text-base md:text-lg mb-8" style={{textAlign: 'left'}}>
            {t.tracabilite.process}
          </p>

          <div className="bg-[#b8999e]/10 p-6 md:p-8 rounded-lg shadow-md">
            <p className="text-gray-900 leading-relaxed text-base md:text-lg" style={{textAlign: 'left'}}>
              {t.tracabilite.conclusion}
            </p>
          </div>

          {/* Visual Element */}
          <div className="mt-12 rounded-lg overflow-hidden shadow-xl">
            <img
              src={IMG("/images/gallery/photo14.jpg")}
              alt="Cacao traceability"
              className="w-full h-96 object-cover"
              loading="lazy" style={{ opacity: 1 }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tracabilite;
