import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Varietes = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-16 bg-[#f5f1ed] overflow-x-hidden">
      {/* Hero Section with Background Image */}
      <section 
        className="relative bg-cover bg-center py-32 md:py-40 px-4 overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(184, 153, 158, 0.70), rgba(184, 153, 158, 0.70)), url(/images/gallery/photo13.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.15em] sm:tracking-[0.3em] text-white break-words">
            {t.varietes.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Terroir Section */}
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
              {t.varietes.terroirTitle}
            </h2>
            <h3 className="text-xl md:text-2xl font-light text-[#b8999e] mb-4">
              {t.varietes.terroirSubtitle}
            </h3>
            <p className="text-gray-800 leading-relaxed mb-6" style={{textAlign: 'left'}}>
              {t.varietes.terroirIntro}
            </p>

            <h4 className="text-lg md:text-xl font-light text-gray-900 mb-3 mt-8">
              {t.varietes.terroirExceptionTitle}
            </h4>
            
            <div className="space-y-6 ml-0 md:ml-4">
              <div className="bg-[#f5f1ed] p-6 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">{t.varietes.solsTitle}</h5>
                <p className="text-gray-800 leading-relaxed" style={{textAlign: 'left'}}>
                  {t.varietes.solsContent}
                </p>
              </div>

              <div className="bg-white border-l-4 border-[#b8999e] pl-6 py-4">
                <h5 className="font-medium text-gray-900 mb-2">{t.varietes.microclimatsTitle}</h5>
                <p className="text-gray-800 leading-relaxed mb-2" style={{textAlign: 'left'}}>
                  {t.varietes.microclimatsIntro}
                </p>
                <ul className="list-disc ml-6 space-y-1 text-gray-800" style={{textAlign: 'left'}}>
                  {t.varietes.microclimatsRegions.map((region, index) => (
                    <li key={index}>{region}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#f5f1ed] p-6 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">{t.varietes.ecosystemeTitle}</h5>
                <p className="text-gray-800 leading-relaxed" style={{textAlign: 'left'}}>
                  {t.varietes.ecosystemeContent}
                </p>
              </div>
            </div>
          </div>

          {/* Nacional Section */}
          <div className="bg-[#b8999e]/10 p-6 md:p-8 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-light text-[#b8999e] mb-4">
              {t.varietes.nacionalTitle}
            </h3>
            <p className="text-gray-800 leading-relaxed mb-4" style={{textAlign: 'left'}}>
              {t.varietes.nacionalIntro}
            </p>
            <h4 className="font-medium text-gray-900 mb-2">{t.varietes.nacionalOrigineTitle}</h4>
            <ul className="list-disc ml-6 space-y-1 text-gray-800 mb-4" style={{textAlign: 'left'}}>
              {t.varietes.nacionalOrigineList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h4 className="font-medium text-gray-900 mb-2">{t.varietes.nacionalCaracteristiquesTitle}</h4>
            <p className="text-gray-800 leading-relaxed" style={{textAlign: 'left'}}>
              {t.varietes.nacionalCaracteristiquesContent}
            </p>
          </div>

          {/* Trinitario Section */}
          <div>
            <h3 className="text-xl md:text-2xl font-light text-[#b8999e] mb-4">
              {t.varietes.trinitarioTitle}
            </h3>
            <p className="text-gray-800 leading-relaxed mb-4" style={{textAlign: 'left'}}>
              {t.varietes.trinitarioIntro}
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-[#b8999e] pl-6 py-2">
                <h4 className="font-medium text-gray-900 mb-2">{t.varietes.trinitarioAvantagesTitle}</h4>
                <ul className="list-disc ml-6 space-y-1 text-gray-800" style={{textAlign: 'left'}}>
                  {t.varietes.trinitarioAvantagesList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Criollo Section */}
          <div className="bg-[#b8999e]/10 p-6 md:p-8 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-light text-[#b8999e] mb-4">
              {t.varietes.criolloTitle}
            </h3>
            <p className="text-gray-800 leading-relaxed mb-4" style={{textAlign: 'left'}}>
              {t.varietes.criolloIntro}
            </p>
            <h4 className="font-medium text-gray-900 mb-2">{t.varietes.criolloCaracteristiquesTitle}</h4>
            <ul className="list-disc ml-6 space-y-1 text-gray-800" style={{textAlign: 'left'}}>
              {t.varietes.criolloCaracteristiquesList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Image Gallery */}
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            <img src="/images/gallery/photo8.jpg" alt="Cacao" className="w-full h-48 object-cover rounded-lg shadow-md" loading="lazy" style={{ opacity: 1 }} />
            <img src="/images/gallery/photo9.jpg" alt="Cacao" className="w-full h-48 object-cover rounded-lg shadow-md" loading="lazy" style={{ opacity: 1 }} />
            <img src="/images/gallery/photo13.jpg" alt="Cacao" className="w-full h-48 object-cover rounded-lg shadow-md" loading="lazy" style={{ opacity: 1 }} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Varietes;
