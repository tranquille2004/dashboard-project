import React from 'react';
import { siteData } from '../data/mock';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f5f1ed]">
      {/* Hero Section */}
      <section className="relative bg-[#b8999e] text-white py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.2em] animate-fade-in text-white">
            {siteData.companyName}
          </h1>
        </div>
      </section>

      {/* Founder Story Section - SMALLER PHOTO */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image - SMALLER */}
            <div className="order-2 md:order-1">
              <div className="rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
                <img
                  src={siteData.founder.image}
                  alt={siteData.founder.name}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
              </div>
            </div>
            
            {/* Text */}
            <div className="order-1 md:order-2 space-y-6">
              <p className="text-gray-800 leading-relaxed text-base md:text-lg" style={{textAlign: 'left'}}>
                {t.home.founderStory}
              </p>
              <div className="pt-6 border-t border-gray-200">
                <p className="text-xl md:text-2xl font-light text-gray-900 mb-2">
                  {siteData.founder.name}
                </p>
                <p className="text-gray-600 text-lg">{t.home.founder}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
