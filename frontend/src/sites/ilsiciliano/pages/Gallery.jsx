import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const FALLBACK_IMAGES = Array.from({ length: 26 }, (_, i) => {
  const num = (i + 1).toString().padStart(2, '0');
  return `/images/ilsiciliano/gallery/gallery-${num}.jpg`;
});

const Gallery = () => {
  const { language } = useLanguage();
  const t = translations.gallery;
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState(FALLBACK_IMAGES);

  useEffect(() => {
    fetch(`${API}/public/site/ilsiciliano`)
      .then((r) => r.json())
      .then((data) => {
        const dbGallery = data?.gallery || [];
        if (dbGallery.length > 0) {
          setImages(dbGallery.map((g) => g.url).filter(Boolean));
        }
      })
      .catch(() => { /* keep fallback */ });
  }, []);

  const openLightbox = (index) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4">
            {t.title[language]}
          </h1>
          <p className="text-xl text-gray-300">
            {{
              nl: 'Ontdek onze sfeervolle ambiance',
              fr: 'Découvrez notre ambiance chaleureuse',
              en: 'Discover our cozy ambiance',
              es: 'Descubra nuestro ambiente acogedor',
              de: 'Entdecken Sie unser gemütliches Ambiente',
              it: 'Scopri la nostra atmosfera accogliente'
            }[language]}
          </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-lg shadow-xl cursor-pointer transform hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
              onClick={() => openLightbox(idx)}
            >
              <img
                src={img}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-semibold">
                  {{
                    nl: 'Klik om te vergroten',
                    fr: 'Cliquez pour agrandir',
                    en: 'Click to enlarge',
                    es: 'Haga clic para ampliar',
                    de: 'Klicken zum Vergrößern',
                    it: 'Clicca per ingrandire'
                  }[language]}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={closeLightbox}>
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gold transition-colors z-10"
            >
              <X size={32} />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 text-white hover:text-gold transition-colors z-10"
            >
              <ChevronLeft size={48} />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 text-white hover:text-gold transition-colors z-10"
            >
              <ChevronRight size={48} />
            </button>

            <img
              src={images[selectedImage]}
              alt={`Gallery ${selectedImage + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
