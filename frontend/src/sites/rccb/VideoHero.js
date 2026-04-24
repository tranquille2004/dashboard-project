// RCCB - Hero Video Compilation
// Cycles through multiple videos with a green overlay filter (like Hotel del Pacifico)

import React, { useEffect, useRef, useState } from 'react';
import { IMG } from '@/utils/imageHelper';
import { VIDEOS } from './translations';

export default function VideoHero({ children, heightClass = 'h-screen' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);

  // When current video ends -> play next
  const handleEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  useEffect(() => {
    // Ensure only the current video plays
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === currentIndex) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [currentIndex]);

  return (
    <section className={`relative ${heightClass} flex items-center justify-center overflow-hidden bg-emerald-950`}>
      {/* Video stack - all rendered, only current visible & playing */}
      {VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => (videoRefs.current[i] = el)}
          autoPlay={i === 0}
          muted
          playsInline
          preload={i === 0 ? 'auto' : 'metadata'}
          onEnded={i === currentIndex ? handleEnded : undefined}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ objectPosition: '50% 50%' }}
          data-testid={`hero-video-${i}`}
        >
          <source src={IMG(src)} type="video/mp4" />
        </video>
      ))}

      {/* Green brand overlay filter */}
      <div className="absolute inset-0 bg-emerald-900/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-900/30 to-emerald-950/90" />

      {/* Subtle animated grain */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>

      {/* Video progress dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === currentIndex ? 'w-10 bg-emerald-300' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Video ${i + 1}`}
            data-testid={`hero-video-dot-${i}`}
          />
        ))}
      </div>
    </section>
  );
}
