import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { siteData } from '../data/mock';
import { useLanguage } from '../context/LanguageContext';
import { IMG } from '@/utils/imageHelper';

const Photos = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(siteData.photos[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = (e) => {
    e.stopPropagation();
    const newIndex = currentIndex === 0 ? siteData.photos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(siteData.photos[newIndex]);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    const newIndex = currentIndex === siteData.photos.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(siteData.photos[newIndex]);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious(e);
      if (e.key === 'ArrowRight') goToNext(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  return (
    <div className="min-h-screen pt-16 bg-[#f5f1ed]">
      {/* Hero Section with Background Image */}
      <section 
        className="relative bg-cover bg-center py-32 md:py-40 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(184, 153, 158, 0.70), rgba(184, 153, 158, 0.70)), url(${IMG('/images/gallery/photo1.jpg')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.3em] text-white">
            {t.photos.title}
          </h1>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {siteData.photos.map((photo, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={IMG(photo)}
                  alt={`Cacao ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  style={{ opacity: 1 }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={32} />
          </button>

          {/* Previous button */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/30 rounded-full p-2 hover:bg-black/50"
            onClick={goToPrevious}
            aria-label="Previous"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Image */}
          <div 
            className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={IMG(selectedImage)}
              alt={`Cacao ${currentIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Next button */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/30 rounded-full p-2 hover:bg-black/50"
            onClick={goToNext}
            aria-label="Next"
          >
            <ChevronRight size={40} />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {currentIndex + 1} / {siteData.photos.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Photos;
