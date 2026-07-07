import React from 'react';
import { Link } from '../context/BasePathContext';
import { siteData } from '../data/mock';
import { useLanguage } from '../context/LanguageContext';
import SEO from '@/components/SEO';
import { IMG } from '@/utils/imageHelper';
import { Leaf, Sprout, Award, MapPin, ArrowRight, ChevronDown } from 'lucide-react';

const Home = () => {
  const { t } = useLanguage();

  const values = [
    { icon: MapPin, title: t.home.value1Title, desc: t.home.value1Desc },
    { icon: Leaf,   title: t.home.value2Title, desc: t.home.value2Desc },
    { icon: Award,  title: t.home.value3Title, desc: t.home.value3Desc },
    { icon: Sprout, title: t.home.value4Title, desc: t.home.value4Desc },
  ];

  const previewImages = [
    '/images/gallery/photo1.jpg',
    '/images/gallery/photo3.jpg',
    '/images/gallery/photo5.jpg',
    '/images/gallery/photo7.jpg',
  ];

  return (
    <div className="min-h-screen bg-[#F5EDE0] font-serif">
      <SEO
        title="Theo Beans Export - Premium Cacao uit Ecuador"
        description="Theo Beans Export: Premium cacao bonen rechtstreeks uit Ecuador. Duurzame teelt, uitstekende kwaliteit, directe handel met lokale boeren."
        keywords="cacao, Ecuador, cacao bonen, premium cacao, duurzaam, export, theobeans, chocolade, fermentatie"
        image="https://theobeans-export.com/images/theobeans/hero.jpg"
        url="https://theobeans-export.com"
        siteName="Theo Beans Export"
        locale="nl_BE"
      />

      {/* HERO — full-screen with cacao imagery and dark warm gradient */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${IMG('/images/gallery/photo6.jpg')})`,
          }}
        />
        {/* Warm cacao gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B1810]/70 via-[#3E2723]/60 to-[#1F0F09]/85" />
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
             style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, #D4A574 0%, transparent 40%), radial-gradient(circle at 70% 80%, #8D4E30 0%, transparent 45%)' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* small ornamental line */}
          <div className="flex items-center justify-center gap-4 mb-8 opacity-90">
            <div className="h-px w-16 bg-[#D4A574]" />
            <span className="text-[#D4A574] text-xs tracking-[0.4em] uppercase font-light">Ecuador · Cacao Nacional</span>
            <div className="h-px w-16 bg-[#D4A574]" />
          </div>

          <h1 className="text-white font-light tracking-[0.18em] leading-tight text-4xl sm:text-6xl lg:text-7xl mb-6" data-testid="theobeans-hero-title">
            {siteData.companyName || 'THEO BEANS'}
          </h1>

          <p className="text-[#F5E6D3]/95 text-lg sm:text-xl md:text-2xl font-light italic max-w-3xl mx-auto mb-12 leading-relaxed">
            {t.home.tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/objectif"
              className="group inline-flex items-center gap-2 bg-[#D4A574] hover:bg-[#C9A55A] text-[#2B1810] px-8 py-4 rounded-none border border-[#D4A574] transition-all font-medium tracking-wider text-sm uppercase"
              data-testid="hero-discover-btn"
            >
              {t.home.discover}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-[#F5E6D3]/40 hover:border-[#F5E6D3] hover:bg-[#F5E6D3]/10 text-[#F5E6D3] px-8 py-4 transition-all font-medium tracking-wider text-sm uppercase"
              data-testid="hero-contact-btn"
            >
              {t.home.contactUs}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce pointer-events-none">
          <ChevronDown className="text-[#F5E6D3]/70 w-6 h-6" />
        </div>
      </section>

      {/* FOUNDER STORY — refined, with cacao pod accent */}
      <section className="py-20 md:py-28 px-6 bg-[#F5EDE0] relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#D4A574]/10 blur-3xl" />

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-14">
            <p className="text-[#8D4E30] text-xs tracking-[0.4em] uppercase mb-3 font-medium">
              {t.home.ourStory}
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[#3E2723] max-w-3xl mx-auto leading-tight">
              {t.home.ourMissionTitle}
            </h2>
            <div className="w-16 h-[2px] bg-[#D4A574] mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Portrait with border frame */}
            <div className="order-2 md:order-1 relative">
              <div className="relative max-w-md mx-auto">
                {/* Frame decoration */}
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#D4A574]/60 rounded-sm" />
                <div className="relative overflow-hidden rounded-sm shadow-2xl">
                  <img
                    src={IMG(siteData.founder.image)}
                    alt={siteData.founder.name}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
                    loading="eager"
                  />
                  {/* Gradient overlay bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#3E2723]/90 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <p className="text-white text-2xl font-light tracking-wide">
                      {siteData.founder.name}
                    </p>
                    <p className="text-[#D4A574] text-sm tracking-widest uppercase mt-1">
                      {t.home.founder}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Story text */}
            <div className="order-1 md:order-2">
              <p className="text-[#5D4037] leading-loose text-base md:text-lg first-letter:text-6xl first-letter:font-serif first-letter:text-[#8D4E30] first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1">
                {t.home.founderStory}
              </p>
              <div className="mt-10 pt-8 border-t border-[#D4A574]/40">
                <img
                  src={IMG('/images/contact/contact-hero.jpg')}
                  alt="Theo Beans Official Logo"
                  className="h-20 w-auto opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES — 4-card grid with icons */}
      <section className="py-20 md:py-28 px-6 bg-[#3E2723] relative overflow-hidden">
        {/* Subtle cacao texture pattern */}
        <div className="absolute inset-0 opacity-5"
             style={{ backgroundImage: 'radial-gradient(#D4A574 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-14">
            <p className="text-[#D4A574] text-xs tracking-[0.4em] uppercase mb-3 font-medium">
              Theo Beans
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[#F5E6D3]">
              {t.home.valuesTitle}
            </h2>
            <div className="w-16 h-[2px] bg-[#D4A574] mx-auto mt-6" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="group bg-[#4E342E]/40 backdrop-blur-sm border border-[#D4A574]/20 hover:border-[#D4A574]/60 p-8 transition-all duration-300 hover:-translate-y-1"
                data-testid={`value-card-${i}`}
              >
                <div className="w-14 h-14 rounded-full bg-[#D4A574]/15 border border-[#D4A574]/40 flex items-center justify-center mb-6 group-hover:bg-[#D4A574]/25 group-hover:scale-110 transition-all">
                  <v.icon className="w-6 h-6 text-[#D4A574]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[#F5E6D3] text-lg font-medium mb-3 tracking-wide">
                  {v.title}
                </h3>
                <p className="text-[#F5E6D3]/70 text-sm leading-relaxed font-light">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-20 md:py-28 px-6 bg-[#F5EDE0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#8D4E30] text-xs tracking-[0.4em] uppercase mb-3 font-medium">
              Finca · Ecuador
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[#3E2723]">
              {t.home.gallerySneakTitle}
            </h2>
            <p className="text-[#6D4C41] text-base mt-4 max-w-xl mx-auto font-light">
              {t.home.gallerySneakSubtitle}
            </p>
            <div className="w-16 h-[2px] bg-[#D4A574] mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12">
            {previewImages.map((src, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-sm shadow-lg cursor-pointer ${i === 0 || i === 3 ? 'aspect-[3/4]' : 'aspect-square'}`}
                data-testid={`gallery-preview-${i}`}
              >
                <img
                  src={IMG(src)}
                  alt={`Cacao finca ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/photos"
              className="group inline-flex items-center gap-2 border-b-2 border-[#8D4E30] text-[#3E2723] pb-1 hover:text-[#8D4E30] transition-colors tracking-widest text-sm uppercase font-medium"
              data-testid="view-all-photos-link"
            >
              {t.home.viewGallery}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA — final call to action */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMG('/images/gallery/photo10.jpg')})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3E2723]/95 via-[#3E2723]/85 to-[#6D4C41]/80" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-light text-white leading-tight mb-4">
            {t.home.ctaTitle}
          </h2>
          <p className="text-[#F5E6D3]/90 text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.home.ctaDesc}
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 bg-[#D4A574] hover:bg-[#C9A55A] text-[#2B1810] px-10 py-4 border border-[#D4A574] transition-all font-medium tracking-widest text-sm uppercase"
            data-testid="cta-contact-btn"
          >
            {t.home.contactUs}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
