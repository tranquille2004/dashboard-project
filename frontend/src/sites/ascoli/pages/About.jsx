import React from 'react';
import Hero from '../components/Hero';
import { Award, Users, Heart, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { allTranslations } from '../translations/allTranslations';

const About = () => {
  const { currentLanguage } = useLanguage();
  const t = allTranslations.about[currentLanguage] || allTranslations.about.nl;

  const values = [
    {
      icon: Award,
      title: t.quality,
      description: t.qualityDesc,
    },
    {
      icon: Heart,
      title: t.passion,
      description: t.passionDesc,
    },
    {
      icon: Users,
      title: t.service,
      description: t.serviceDesc,
    },
    {
      icon: Clock,
      title: t.tradition,
      description: t.traditionDesc,
    },
  ];

  return (
    <div className="min-h-screen bg-[#2a2a2a]">
      <Hero
        title={t.title}
        subtitle={t.subtitle}
        image="/images/ascoli/gallery/img-5497_1_orig.jpg"
      />

      {/* Story Section */}
      <section className="py-24 bg-[#2a2a2a]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-[#a48f7a] mb-6">
                {t.ourStory}
              </h2>
              <div className="w-24 h-1 bg-[#6b1f1f] mx-auto"></div>
            </div>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">{t.story1}</p>
              <p className="text-lg">{t.story2}</p>
              <p className="text-lg">{t.story3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              {t.ourValues}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#6b1f1f] rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-[#2a2a2a]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="/images/ascoli/gallery/20689781-1380875678699421-9174551204022883676-o_1_orig.jpg"
              alt="Restaurant"
              className="w-full h-80 object-cover rounded-sm"
            />
            <img
              src="/images/ascoli/gallery/45280374-1885058464947804-146153777123033088-o_2_orig.jpg"
              alt="Restaurant"
              className="w-full h-80 object-cover rounded-sm"
            />
          </div>
        </div>
      </section>

      {/* Multilingual Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-serif text-[#a48f7a] mb-4">
            {t.groupEvents}
          </h3>
          <p className="text-gray-300">
            {t.languages}
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
