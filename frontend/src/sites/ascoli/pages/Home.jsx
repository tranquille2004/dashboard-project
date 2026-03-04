import React from 'react';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useBasePath } from '../context/BasePathContext';
import { allTranslations } from '../translations/allTranslations';

const Home = () => {
  const { currentLanguage } = useLanguage();
  const basePath = useBasePath();
  const t = allTranslations.home[currentLanguage] || allTranslations.home.nl;
  
  const features = [
    {
      title: t.italianQuality,
      description: t.italianQualityDesc,
      image: '/images/ascoli/gallery/img-5801.jpg',
    },
    {
      title: t.freshPreparation,
      description: t.freshPreparationDesc,
      image: '/images/ascoli/gallery/img-5849.jpg',
    },
    {
      title: t.elegantAmbiance,
      description: t.elegantAmbianceDesc,
      image: '/images/ascoli/gallery/img-6046_1_orig.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-[#2a2a2a]">
      {/* Hero Section */}
      <Hero
        title={t.title}
        subtitle={t.subtitle}
        image="/images/ascoli/gallery/45280374-1885058464947804-146153777123033088-o_2_orig.jpg"
        showButtons={true}
        buttonText1={t.reserve}
        buttonText2={t.viewMenu}
      />

      {/* Features Section */}
      <section className="py-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            {t.cta}
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            {t.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={`${basePath}/reservations`}
              className="group px-8 py-4 bg-[#6b1f1f] hover:bg-[#7d2424] text-white rounded-sm transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide font-medium"
            >
              {t.reserve}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to={`${basePath}/menu`}
              className="group px-8 py-4 bg-transparent border-2 border-[#a48f7a] hover:bg-[#a48f7a] text-white rounded-sm transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide font-medium"
            >
              {t.viewMenu}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-[#2a2a2a]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-serif text-[#a48f7a] mb-6">
                {t.authenticity}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t.story}
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                {t.story2}
              </p>
              <Link
                to={`${basePath}/about`}
                className="inline-flex items-center text-[#6b1f1f] hover:text-[#7d2424] transition-colors group"
              >
                {t.readOurStory}
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Image */}
            <div className="relative h-[500px] rounded-sm overflow-hidden">
              <img
                src="/images/ascoli/gallery/333497-362660580479961-522768784-o.jpg"
                alt="Restaurant Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">{t.ourDishes}</h2>
            <p className="text-gray-300 text-lg">{t.dishesSubtitle}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="aspect-square overflow-hidden rounded-sm">
              <img
                src="/images/ascoli/gallery/img-5788.jpg"
                alt="Dish 1"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-sm">
              <img
                src="/images/ascoli/gallery/img-5857.jpg"
                alt="Dish 2"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-sm">
              <img
                src="/images/ascoli/gallery/img-5879.jpg"
                alt="Dish 3"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-sm">
              <img
                src="/images/ascoli/gallery/img-5889.jpg"
                alt="Dish 4"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="text-center">
            <Link
              to={`${basePath}/gallery`}
              className="inline-flex items-center text-[#6b1f1f] hover:text-[#7d2424] transition-colors group text-lg"
            >
              {t.viewGallery}
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
