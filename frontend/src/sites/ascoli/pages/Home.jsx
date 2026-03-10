import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useBasePath } from '../context/BasePathContext';
import { allTranslations } from '../translations/allTranslations';

// SEO Configuration for L'Ascoli
const SEO_CONFIG = {
  siteName: "L'Ascoli Zaventem",
  defaultImage: '/images/ascoli/gallery/img-5497_1_orig.jpg',
  baseUrl: 'https://ascolizaventem.com',
  title: "L'Ascoli | Italiaans Restaurant Zaventem",
  description: "L'Ascoli in Zaventem - Verfijnd Italiaans restaurant met authentieke gerechten, verse pasta en uitstekende wijnen. Reserveer nu voor een culinaire ervaring.",
  keywords: "Italiaans restaurant, Zaventem, L'Ascoli, pasta, Italiaanse keuken, fine dining, Brussel"
};

const Home = () => {
  const { currentLanguage } = useLanguage();
  const basePath = useBasePath();
  const t = allTranslations.home[currentLanguage] || allTranslations.home.nl;
  
  // SEO Effect
  useEffect(() => {
    document.title = SEO_CONFIG.title;
    
    const setMeta = (name, content, isProperty = false) => {
      if (!content) return;
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    setMeta('description', SEO_CONFIG.description);
    setMeta('keywords', SEO_CONFIG.keywords);
    setMeta('og:title', SEO_CONFIG.title, true);
    setMeta('og:description', SEO_CONFIG.description, true);
    setMeta('og:image', SEO_CONFIG.defaultImage, true);
    setMeta('og:url', SEO_CONFIG.baseUrl, true);
    setMeta('og:site_name', SEO_CONFIG.siteName, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', SEO_CONFIG.title);
    setMeta('twitter:description', SEO_CONFIG.description);
  }, []);
  
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

      {/* Easter Menu Banner */}
      <Link to={`${basePath}/reservations`} className="block">
        <section className="relative py-16 bg-gradient-to-r from-[#4a1f1f] via-[#6b1f1f] to-[#4a1f1f] overflow-hidden cursor-pointer hover:from-[#5a2a2a] hover:via-[#7d2424] hover:to-[#5a2a2a] transition-all duration-500">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-4 left-10 text-6xl">🐣</div>
            <div className="absolute bottom-4 right-10 text-6xl">🌷</div>
            <div className="absolute top-1/2 left-1/4 text-4xl">✨</div>
            <div className="absolute top-1/3 right-1/4 text-4xl">🥚</div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1 bg-[#a48f7a] text-white text-sm uppercase tracking-widest rounded-full mb-4">
                Speciaal / Spécial
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-2">
                🐰 Paas Menu / Menu de Pâques 🐰
              </h2>
              <p className="text-3xl text-[#d4af37] font-bold">€65</p>
              <p className="text-[#a48f7a] mt-2 text-lg">
                4 + 6 april: middag en avond | 4 + 6 avril: midi et soir
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 text-center">
                {/* Dutch Column */}
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-[#a48f7a]/30">
                  <h3 className="text-[#d4af37] font-serif text-xl mb-4 border-b border-[#a48f7a]/30 pb-2">Nederlands</h3>
                  <div className="space-y-4 text-white/90 text-sm">
                    <div>
                      <p className="font-semibold text-[#a48f7a]">Antipasti alla Cellentani</p>
                      <p>Aardappelkroketjes uit Alfano</p>
                      <p>Soppressata, paprika en gegrilde artisjok</p>
                    </div>
                    <p className="text-[#d4af37]">—◆—</p>
                    <div>
                      <p>Cavatelli met kalfsragoût</p>
                      <p className="text-[#a48f7a] text-xs">OF</p>
                      <p>Ravioli de ricotta alla celentana</p>
                    </div>
                    <p className="text-[#d4af37]">—◆—</p>
                    <div>
                      <p>Lam uit de oven met Cilento aroma</p>
                      <p className="text-[#a48f7a] text-xs">OF</p>
                      <p>Gestoomde kabeljouwfilet, olijfolie,</p>
                      <p>Amalfi citroen en garnituur</p>
                    </div>
                    <p className="text-[#d4af37]">—◆—</p>
                    <div>
                      <p className="font-semibold">Pastiera Napoletana</p>
                      <p className="text-xs text-[#a48f7a] mt-2">Aangeboden: limoncello of melannurca</p>
                    </div>
                  </div>
                </div>
                
                {/* French Column */}
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-[#a48f7a]/30">
                  <h3 className="text-[#d4af37] font-serif text-xl mb-4 border-b border-[#a48f7a]/30 pb-2">Français</h3>
                  <div className="space-y-4 text-white/90 text-sm">
                    <div>
                      <p className="font-semibold text-[#a48f7a]">Antipasti alla Cellentani</p>
                      <p>Croquettes de pommes de terre de Alfano</p>
                      <p>Soppressata, poivron et artichauts grillés</p>
                    </div>
                    <p className="text-[#d4af37]">—◆—</p>
                    <div>
                      <p>Cavatelli au ragoût d'agneau</p>
                      <p className="text-[#a48f7a] text-xs">OU</p>
                      <p>Ravioli de ricotta alla celentana</p>
                    </div>
                    <p className="text-[#d4af37]">—◆—</p>
                    <div>
                      <p>Agnello al forno aux arômes de cilento</p>
                      <p className="text-[#a48f7a] text-xs">OU</p>
                      <p>Filet de cabillaud à la vapeur, huile d'olives,</p>
                      <p>citron d'Amalfi et garniture</p>
                    </div>
                    <p className="text-[#d4af37]">—◆—</p>
                    <div>
                      <p className="font-semibold">Pastiera Napoletana</p>
                      <p className="text-xs text-[#a48f7a] mt-2">Offert: limoncello ou melannurca</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Call to action */}
              <div className="text-center mt-8">
                <span className="inline-flex items-center gap-2 px-8 py-4 bg-[#d4af37] hover:bg-[#c9a032] text-[#2a2a2a] font-bold rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
                  <span>Reserveer Nu / Réservez Maintenant</span>
                  <ChevronRight className="w-5 h-5" />
                </span>
              </div>
            </div>
          </div>
        </section>
      </Link>

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
