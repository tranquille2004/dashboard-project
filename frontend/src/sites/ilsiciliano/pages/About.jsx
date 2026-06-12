import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { ChefHat, Users, Heart, X } from 'lucide-react';

const TEAM_PHOTOS = [
  'https://customer-assets.emergentagent.com/job_d9bb699b-4a81-4d6f-b624-bd86a4a2f156/artifacts/sweesn6f_1ok.jpeg',
  'https://customer-assets.emergentagent.com/job_d9bb699b-4a81-4d6f-b624-bd86a4a2f156/artifacts/842243yx_3ok.jpeg',
  'https://customer-assets.emergentagent.com/job_d9bb699b-4a81-4d6f-b624-bd86a4a2f156/artifacts/889ajp7u_5ok.jpeg',
  'https://customer-assets.emergentagent.com/job_d9bb699b-4a81-4d6f-b624-bd86a4a2f156/artifacts/vwdhzoro_8ok.jpeg',
  'https://customer-assets.emergentagent.com/job_d9bb699b-4a81-4d6f-b624-bd86a4a2f156/artifacts/88gw674m_13ok.jpeg',
];

const TEAM_TITLE = {
  es: 'Nuestro equipo',
  en: 'Our team',
  it: 'Il nostro team',
  fr: 'Notre équipe'
};

const About = () => {
  const { language } = useLanguage();
  const t = translations.about;
  const [zoomedPhoto, setZoomedPhoto] = useState(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setZoomedPhoto(null); };
    if (zoomedPhoto) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [zoomedPhoto]);

  return (
    <div className="min-h-screen bg-black pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-6">
            {t.title[language]}
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <img
              src="/images/ilsiciliano/about/emanuele.jpg"
              alt="Emanuele — Chef & propietario"
              className="w-full max-h-[560px] object-contain rounded-lg shadow-2xl border border-gold/20 bg-black"
            />
          </div>
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            {t.content[language].split('\n\n').slice(0, 3).map((paragraph, idx) => (
              <p key={idx} className="text-lg">{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16 animate-fade-in" data-testid="team-section">
          <h2 className="text-3xl md:text-4xl font-bold text-gold text-center mb-2">
            {TEAM_TITLE[language] || TEAM_TITLE.es}
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-8"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {TEAM_PHOTOS.map((src, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setZoomedPhoto(src)}
                className="group relative overflow-hidden rounded-lg border border-gold/20 hover:border-gold/60 bg-black shadow-lg transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-gold"
                data-testid={`team-photo-${idx}`}
                aria-label={`Team member ${idx + 1}`}
              >
                <img
                  src={src}
                  alt={`Equipo Il Siciliano ${idx + 1}`}
                  loading="lazy"
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Story Content */}
        <div className="bg-gradient-to-br from-gray-900 to-black p-8 md:p-12 rounded-lg border border-gold/20 mb-16 animate-fade-in">
          <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
            {t.content[language].split('\n\n').slice(3).map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
          {[
            {
              icon: ChefHat,
              title: {
                es: 'Tradición Siciliana',
                en: 'Sicilian Tradition',
                it: 'Tradizione Siciliana',
                fr: 'Tradition Sicilienne'
              },
              desc: {
                es: 'Recetas familiares transmitidas de generación en generación, con la verdadera alma de la cocina del sur de Italia.',
                en: 'Family recipes passed down from generation to generation, with the true soul of Southern Italian cuisine.',
                it: 'Ricette di famiglia tramandate di generazione in generazione, con la vera anima della cucina del sud Italia.',
                fr: 'Des recettes familiales transmises de génération en génération, avec la véritable âme de la cuisine du sud de l\'Italie.'
              }
            },
            {
              icon: Heart,
              title: {
                es: 'Pasión Auténtica',
                en: 'Authentic Passion',
                it: 'Passione Autentica',
                fr: 'Passion Authentique'
              },
              desc: {
                es: 'Cada plato preparado con cuidado y dedicación — pasta amasada a mano, pizza al horno de leña, ingredientes seleccionados.',
                en: 'Every dish prepared with care and dedication — hand-kneaded pasta, wood-fired pizza, hand-picked ingredients.',
                it: 'Ogni piatto preparato con cura e dedizione — pasta impastata a mano, pizza al forno a legna, ingredienti selezionati.',
                fr: 'Chaque plat préparé avec soin et dévouement — pâtes pétries à la main, pizza au four à bois, ingrédients sélectionnés.'
              }
            },
            {
              icon: Users,
              title: {
                es: 'Hospitalidad Italiana',
                en: 'Italian Hospitality',
                it: 'Ospitalità Italiana',
                fr: 'Hospitalité Italienne'
              },
              desc: {
                es: 'Una bienvenida cálida, atención personal y un ambiente familiar — como en una verdadera trattoria de Sicilia.',
                en: 'A warm welcome, personal attention and a family atmosphere — just like a true Sicilian trattoria.',
                it: 'Un\'accoglienza calorosa, attenzione personale e un\'atmosfera familiare — come in una vera trattoria siciliana.',
                fr: 'Un accueil chaleureux, une attention personnelle et une atmosphère familiale — comme dans une vraie trattoria sicilienne.'
              }
            }
          ].map((value, idx) => (
            <div key={idx} className="text-center p-8 bg-gradient-to-b from-gray-900 to-black rounded-lg border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(229,57,53,0.2)]">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/40 mb-5">
                <value.icon size={40} className="text-gold" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{value.title[language] || value.title.es}</h3>
              <p className="text-gray-300 leading-relaxed">{value.desc[language] || value.desc.es}</p>
            </div>
          ))}
        </div>

        {/* Sicilia panorama with caption */}
        <div className="mt-12 mb-4 relative rounded-xl overflow-hidden shadow-2xl border border-gold/30 animate-fade-in group">
          <img
            src="/images/ilsiciliano/about/sicilia.jpg"
            alt="Sicilia — el origen de Il Siciliano"
            className="w-full h-[420px] md:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle gradient overlay from bottom for caption readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          {/* Italian tricolor stripe accent at top */}
          <div className="absolute top-0 left-0 right-0 h-1.5 flex">
            <span className="flex-1 bg-[#009246]" />
            <span className="flex-1 bg-white" />
            <span className="flex-1 bg-[#CE2B37]" />
          </div>
          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <p className="text-italian-green font-semibold uppercase tracking-widest text-xs md:text-sm mb-2">
              {{
                es: 'Nuestras raíces',
                en: 'Our roots',
                it: 'Le nostre radici',
                fr: 'Nos racines'
              }[language] || 'Nuestras raíces'}
            </p>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
              {{
                es: 'Sicilia, en cada plato',
                en: 'Sicily, in every dish',
                it: 'La Sicilia, in ogni piatto',
                fr: 'La Sicile, dans chaque plat'
              }[language] || 'Sicilia, en cada plato'}
            </h3>
            <p className="text-gray-100 text-base md:text-lg max-w-2xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              {{
                es: 'Del mar azul de Castellammare a las mesas de Santo Domingo — traemos los sabores, los colores y el alma de la isla más hermosa del Mediterráneo.',
                en: 'From the blue sea of Castellammare to the tables of Santo Domingo — we bring you the flavors, colors and soul of the most beautiful island in the Mediterranean.',
                it: 'Dal mare blu di Castellammare ai tavoli di Santo Domingo — vi portiamo i sapori, i colori e l\'anima dell\'isola più bella del Mediterraneo.',
                fr: 'De la mer bleue de Castellammare aux tables de Santo Domingo — nous vous apportons les saveurs, les couleurs et l\'âme de la plus belle île de la Méditerranée.'
              }[language] || 'Del mar azul de Castellammare a las mesas de Santo Domingo — traemos los sabores, los colores y el alma de la isla más hermosa del Mediterráneo.'}
            </p>
          </div>
        </div>
      </div>

      {/* Zoom Lightbox */}
      {zoomedPhoto && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setZoomedPhoto(null)}
          data-testid="team-photo-lightbox"
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setZoomedPhoto(null); }}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/60 hover:bg-black border border-gold/40 text-gold flex items-center justify-center transition-all"
            aria-label="Close"
            data-testid="team-photo-lightbox-close"
          >
            <X size={24} />
          </button>
          <img
            src={zoomedPhoto}
            alt="Equipo Il Siciliano"
            onClick={(e) => e.stopPropagation()}
            className="max-w-[92vw] max-h-[88vh] object-contain rounded-lg shadow-2xl border border-gold/30"
          />
        </div>
      )}
    </div>
  );
};

export default About;
