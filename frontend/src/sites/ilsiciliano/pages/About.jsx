import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { Award, Users, Heart } from 'lucide-react';

const About = () => {
  const { language } = useLanguage();
  const t = translations.about;

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
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
              src="/images/ilsiciliano/about/lorenzo.jpg"
              alt="Lorenzo Di Siervi"
              className="w-full h-96 object-cover rounded-lg shadow-2xl border border-gold/20"
            />
          </div>
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            {t.content[language].split('\n\n').slice(0, 3).map((paragraph, idx) => (
              <p key={idx} className="text-lg">{paragraph}</p>
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
              icon: Award,
              title: { nl: 'Ervaring', fr: 'Expérience' },
              desc: { nl: 'Meer dan 40 jaar ervaring in de horeca', fr: 'Plus de 40 ans d’expérience dans la restauration' }
            },
            {
              icon: Heart,
              title: { nl: 'Passie', fr: 'Passion' },
              desc: { nl: 'Amor por la auténtica cocina siciliana', fr: 'Amour pour la cuisine italienne authentique' }
            },
            {
              icon: Users,
              title: { nl: 'Gastvrijheid', fr: 'Hospitalité' },
              desc: { nl: 'Warme ontvangst en persoonlijke service', fr: 'Accueil chaleureux et service personnalisé' }
            }
          ].map((value, idx) => (
            <div key={idx} className="text-center p-8 bg-gradient-to-b from-gray-900 to-black rounded-lg border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:scale-105">
              <value.icon size={48} className="text-gold mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">{value.title[language]}</h3>
              <p className="text-gray-400">{value.desc[language]}</p>
            </div>
          ))}
        </div>

        {/* Additional Images */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <img
            src="/images/ilsiciliano/about/restaurant-interior.jpg"
            alt="Restaurant Interior"
            className="w-full h-72 object-contain rounded-lg shadow-xl border border-gold/20 hover:scale-105 transition-transform duration-500 bg-gray-900"
            loading="lazy"
          />
          <img
            src="/images/ilsiciliano/about/dining.jpeg"
            alt="Italian Dining"
            className="w-full h-72 object-cover rounded-lg shadow-xl border border-gold/20 hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
