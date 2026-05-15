import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Gallery = () => {
  const { language } = useLanguage();
  const [selected, setSelected] = useState(null);

  const labels = {
    title: { es:'Galería', en:'Gallery', fr:'Galerie', it:'Galleria', de:'Galerie' },
    subtitle: {
      es:'Descubre todos los rincones de nuestra hacienda en imágenes.',
      en:'Discover every corner of our hacienda in pictures.',
      fr:'Découvrez tous les coins de notre hacienda en images.',
      it:'Scopri ogni angolo della nostra hacienda in immagini.',
      de:'Entdecken Sie jeden Winkel unserer Hacienda in Bildern.'
    }
  };

  // 94 photos
  const images = Array.from({ length: 94 }, (_, i) => {
    const num = (i + 1).toString().padStart(2, '0');
    return `/images/sanfrancisco/gallery/gallery-${num}.jpg`;
  });

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4">{labels.title[language]}</h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-xl text-cream/80" style={{color:'rgba(245,230,202,0.8)'}}>{labels.subtitle[language]}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(src)}
              className="relative overflow-hidden rounded-lg shadow-lg border border-gold/10 hover:border-gold/50 transition-all group"
              data-testid={`gallery-thumb-${idx}`}
            >
              <img src={src} alt={`Photo ${idx + 1}`} loading="lazy"
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
            </button>
          ))}
        </div>

        {selected && (
          <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-gold p-2 hover:bg-white/10 rounded-full"><X size={28} /></button>
            <img src={selected} alt="enlarged" className="max-w-full max-h-full object-contain rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
