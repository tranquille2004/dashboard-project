import React from 'react';
import { Construction, Instagram, Facebook, MessageCircle, Mail } from 'lucide-react';

const InConstruction = ({ siteName = "Hacienda Turística San Francisco", logo = "/images/sanfrancisco/logo/sanfrancisco-logo.png" }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0d0d0d', color: '#F5E6CA' }}>
      <div className="max-w-2xl w-full text-center">
        <img src={logo} alt={siteName} className="h-44 md:h-56 w-auto mx-auto mb-8 drop-shadow-[0_10px_40px_rgba(0,0,0,0.7)]" />

        <div className="inline-flex items-center justify-center mb-6 px-5 py-2 rounded-full border border-[#C9A35C]/40" style={{ color: '#C9A35C' }}>
          <Construction size={18} className="mr-2" />
          <span className="uppercase tracking-widest text-xs font-bold">En construcción · Coming soon</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#C9A35C' }}>
          ¡Estamos preparando algo especial!
        </h1>
        <p className="text-lg md:text-xl mb-2" style={{ color: 'rgba(245,230,202,0.85)' }}>
          Nuestro sitio web oficial está en construcción.
        </p>
        <p className="text-base md:text-lg mb-10" style={{ color: 'rgba(245,230,202,0.7)' }}>
          🐎 Cabalgatas · Aventuras · Naturaleza<br />
          🌿 Vive la experiencia campestre en familia
        </p>

        <div className="bg-black/40 border border-[#C9A35C]/30 rounded-lg p-6 mb-6">
          <p className="text-sm uppercase tracking-widest mb-3" style={{ color: '#C9A35C' }}>Mientras tanto, contáctanos</p>
          <div className="grid sm:grid-cols-2 gap-3 max-w-md mx-auto">
            <a href="https://wa.me/593999060566" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-bold transition-all hover:opacity-90"
              style={{ backgroundColor: '#C9A35C', color: '#0d0d0d' }}>
              <MessageCircle size={18} />
              WhatsApp
            </a>
            <a href="mailto:info@sanfrancisco-haciendaturistica.com"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-bold border-2 transition-all hover:bg-[#C9A35C]/10"
              style={{ borderColor: '#C9A35C', color: '#C9A35C' }}>
              <Mail size={18} />
              Email
            </a>
          </div>
          <p className="text-xs mt-4" style={{ color: 'rgba(245,230,202,0.6)' }}>
            +593 99 906 0566 · Vía a Quinindé Km 22, Santo Domingo, Ecuador
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-8">
          <a href="https://www.instagram.com/haciendaturisticasanfrancisco/" target="_blank" rel="noopener noreferrer" className="p-3 border-2 rounded-full transition-all hover:bg-[#C9A35C] hover:text-black" style={{ borderColor: 'rgba(201,163,92,0.4)', color: '#C9A35C' }}>
            <Instagram size={22} />
          </a>
          <a href="https://www.facebook.com/clubsanfranciscoec" target="_blank" rel="noopener noreferrer" className="p-3 border-2 rounded-full transition-all hover:bg-[#C9A35C] hover:text-black" style={{ borderColor: 'rgba(201,163,92,0.4)', color: '#C9A35C' }}>
            <Facebook size={22} />
          </a>
          <a href="https://www.tiktok.com/@haciendasanfranciso" target="_blank" rel="noopener noreferrer" className="p-3 border-2 rounded-full transition-all hover:bg-[#C9A35C] hover:text-black" style={{ borderColor: 'rgba(201,163,92,0.4)', color: '#C9A35C' }}>
            <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/></svg>
          </a>
        </div>

        <p className="text-xs" style={{ color: 'rgba(245,230,202,0.4)' }}>
          Sitio web por <a href="https://www.fworksbuilders.com" target="_blank" rel="noopener noreferrer" style={{ color: '#C9A35C' }}>fworksbuilders</a>
        </p>
      </div>
    </div>
  );
};

export default InConstruction;
