import React from 'react';
import { siteData } from '../data/mock';
import { useLanguage } from '../context/LanguageContext';
import { IMG } from '../utils/imageHelper';

const Objectif = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-16 bg-[#f5f1ed]">
      {/* Hero Section with Background Image */}
      <section 
        className="relative bg-cover bg-center py-32 md:py-40 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(184, 153, 158, 0.70), rgba(184, 153, 158, 0.70)), url(${IMG('/images/gallery/photo6.jpg')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.3em] text-white">
            {t.objectif.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
            {t.objectif.subtitle}
          </h2>
          <p className="text-gray-800 leading-relaxed text-base md:text-lg mb-12" style={{textAlign: 'left'}}>
            {t.objectif.intro}
          </p>

          <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-8">
            {t.objectif.detailedObjectives}
          </h3>

          <div className="space-y-10">
            {t.objectif.objectives.map((obj) => (
              <div key={obj.number} className="border-l-4 border-[#b8999e] pl-6 py-2 hover:bg-gray-50 transition-colors">
                <h4 className="text-lg md:text-xl font-light text-gray-900 mb-3">
                  {obj.number}. {obj.title}
                </h4>
                <p className="text-gray-800 leading-relaxed" style={{textAlign: 'left'}}>{obj.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-[#f5f1ed] rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-4">
              {t.objectif.conclusionTitle}
            </h3>
            <p className="text-gray-800 leading-relaxed text-base md:text-lg" style={{textAlign: 'left'}}>
              {t.objectif.conclusion}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Objectif;
