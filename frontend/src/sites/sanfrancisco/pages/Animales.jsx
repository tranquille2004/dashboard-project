import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const Animales = () => {
  const { language } = useLanguage();
  const t = translations;

  const labels = {
    title: { es:'Mini-Granja & Animales', en:'Mini-Farm & Animals', fr:'Mini-Ferme & Animaux', it:'Mini-Fattoria & Animali', de:'Mini-Bauernhof & Tiere' },
    subtitle: {
      es:'Conoce a nuestros amigos: caballos, llamas, alpacas, patos, gansos, cisnes y muchos más.',
      en:'Meet our friends: horses, llamas, alpacas, ducks, geese, swans and many more.',
      fr:'Rencontrez nos amis : chevaux, lamas, alpagas, canards, oies, cygnes et bien plus.',
      it:'Incontra i nostri amici: cavalli, lama, alpaca, anatre, oche, cigni e molti altri.',
      de:'Treffen Sie unsere Freunde: Pferde, Lamas, Alpakas, Enten, Gänse, Schwäne und viele mehr.'
    },
    intro: {
      es:'Un espacio ideal para que los niños y adultos disfruten del contacto con los animales en un ambiente seguro y natural. Parte de tu visita o estadía.',
      en:'An ideal space for children and adults to enjoy contact with animals in a safe and natural environment. Part of your visit or stay.',
      fr:'Un espace idéal pour que enfants et adultes profitent du contact avec les animaux dans un environnement sûr et naturel. Inclus dans votre visite ou séjour.',
      it:'Uno spazio ideale per bambini e adulti per godere del contatto con gli animali in un ambiente sicuro e naturale. Parte della tua visita o soggiorno.',
      de:'Ein idealer Raum für Kinder und Erwachsene, um den Kontakt mit Tieren in einer sicheren und natürlichen Umgebung zu genießen. Teil Ihres Besuchs oder Aufenthalts.'
    }
  };

  // Show 12 photos in a grid (from gallery)
  const photoIndexes = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero with background image */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/sanfrancisco/gallery/gallery-15.jpg" alt="Animales" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{
            background:'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.30) 40%, rgba(0,0,0,0.85) 100%)'
          }} />
        </div>
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gold mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">🦙 {labels.title[language]}</h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-cream max-w-3xl mx-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]" style={{color:'#F5E6CA'}}>{labels.subtitle[language]}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-gold/20 mb-12 max-w-3xl mx-auto">
          <p className="text-cream/90 text-center leading-relaxed text-lg" style={{color:'rgba(245,230,202,0.9)'}}>{labels.intro[language]}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photoIndexes.map(i => (
            <img key={i} src={`/images/sanfrancisco/gallery/gallery-${i.toString().padStart(2,'0')}.jpg`} alt={`Animal ${i}`} className="w-full h-48 object-cover rounded-lg shadow-lg border border-gold/10 hover:border-gold/40 hover:scale-105 transition-all" loading="lazy" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Animales;
