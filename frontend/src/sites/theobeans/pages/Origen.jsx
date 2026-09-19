import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { IMG } from '@/utils/imageHelper';

const ORIGEN_HERO = 'https://customer-assets-jt897jd0.emergentagent.net/job_d9bb699b-4a81-4d6f-b624-bd86a4a2f156/artifacts/l99m5bhv_WhatsApp%20Image%202026-09-08%20at%2005.06.19.jpeg';
const ORIGEN_IMG_2 = 'https://customer-assets-jt897jd0.emergentagent.net/job_d9bb699b-4a81-4d6f-b624-bd86a4a2f156/artifacts/wkeih0ng_WhatsApp%20Image%202026-09-08%20at%2005.06.51.jpeg';

const Origen = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-16 bg-[#F5EDE0]">
      {/* Hero Section with cacao pod background */}
      <section
        className="relative bg-cover bg-center py-32 md:py-40 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(43, 24, 16, 0.75), rgba(62, 39, 35, 0.75)), url(${ORIGEN_HERO})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6 opacity-90">
            <div className="h-px w-16 bg-[#D4A574]" />
            <span className="text-[#D4A574] text-xs tracking-[0.4em] uppercase font-light">
              {t.origen.eyebrow}
            </span>
            <div className="h-px w-16 bg-[#D4A574]" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.2em] text-white">
            {t.origen.title}
          </h1>
        </div>
      </section>

      {/* Intro tagline */}
      <section className="py-14 md:py-20 px-4 bg-[#6D4C41]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white text-lg md:text-2xl font-light italic leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
            {t.origen.intro}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          {t.origen.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-gray-800 leading-relaxed text-base md:text-lg"
              style={{ textAlign: 'left', fontFamily: 'Georgia, serif' }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Image showcase */}
      <section className="py-14 md:py-20 px-4 bg-[#F5EDE0]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="rounded-lg overflow-hidden shadow-lg aspect-[3/4]">
            <img
              src={ORIGEN_HERO}
              alt={t.origen.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg aspect-[3/4]">
            <img
              src={ORIGEN_IMG_2}
              alt={t.origen.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Closing statement */}
      <section className="py-14 md:py-20 px-4 bg-[#6D4C41]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#D4A574] text-xl md:text-2xl font-light italic leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
            {t.origen.closing}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Origen;
