import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useBasePath } from '../contexts/BasePathContext';
import { translations } from '../data/translations';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const basePath = useBasePath();
  const homePath = basePath || '/';
  const { language, changeLanguage } = useLanguage();
  const t = translations.nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { path: `${basePath}/`, label: t.home[language] },
    { path: `${basePath}/about`, label: t.about[language] },
    { path: `${basePath}/hospedaje`, label: t.hospedaje[language] },
    { path: `${basePath}/caballos`, label: t.caballos[language] },
    { path: `${basePath}/animales`, label: t.animales[language] },
    { path: `${basePath}/actividades`, label: t.actividades[language] },
    { path: `${basePath}/eventos`, label: t.eventos[language] },
    { path: `${basePath}/restaurante`, label: t.restaurante[language] },
    { path: `${basePath}/gallery`, label: t.gallery[language] },
    { path: `${basePath}/contacto`, label: t.contacto[language] }
  ];

  const isActive = (path) => {
    if (path === `${basePath}/`) return location.pathname === path || location.pathname === basePath;
    return location.pathname.startsWith(path);
  };

  const langs = [
    { code: 'es', label: 'ES', flag: '🇪🇨' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'it', label: 'IT', flag: '🇮🇹' },
    { code: 'de', label: 'DE', flag: '🇩🇪' }
  ];

  const currentLang = langs.find(l => l.code === language) || langs[0];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/98 shadow-lg' : 'bg-black/90'} backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to={homePath} className="flex items-center">
            <img src="/images/sanfrancisco/logo/sanfrancisco-logo.png" alt="San Francisco Hacienda Turística" className="h-14 w-auto" />
          </Link>

          <div className="hidden xl:flex items-center space-x-1">
            {links.map(link => (
              <Link key={link.path} to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive(link.path) ? 'text-gold bg-gold/10' : 'text-cream hover:text-gold hover:bg-white/5'}`}
                style={{ color: isActive(link.path) ? undefined : '#F5E6CA' }}>
                {link.label}
              </Link>
            ))}
            <div className="flex items-center space-x-1 ml-3 pl-3 border-l border-gold/20">
              <a href="https://www.instagram.com/haciendaturisticasanfrancisco/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-md text-cream hover:text-gold transition-all" style={{color:'#F5E6CA'}}>
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/clubsanfranciscoec" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 rounded-md text-cream hover:text-gold transition-all" style={{color:'#F5E6CA'}}>
                <Facebook size={18} />
              </a>
              <a href="https://www.tiktok.com/@haciendasanfranciso" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="p-2 rounded-md text-cream hover:text-gold transition-all" style={{color:'#F5E6CA'}}>
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/></svg>
              </a>
            </div>
            <div className="relative ml-2">
              <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gold hover:bg-gold/10 transition-all border border-gold/30" data-testid="lang-toggle-btn">
                <Globe size={16} />
                <span>{currentLang.flag} {currentLang.label}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-black border border-gold/30 rounded-md shadow-xl py-1">
                  {langs.map(l => (
                    <button key={l.code} onClick={() => { changeLanguage(l.code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gold/10 transition-all ${language === l.code ? 'text-gold' : 'text-cream'}`} style={{color: language===l.code?undefined:'#F5E6CA'}}>
                      {l.flag} {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="xl:hidden flex items-center gap-2">
            {/* Mobile: language switcher OUTSIDE hamburger */}
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gold border border-gold/30" data-testid="lang-toggle-mobile-btn">
                <Globe size={16} />
                <span>{currentLang.flag}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-black border border-gold/30 rounded-md shadow-xl py-1 z-50">
                  {langs.map(l => (
                    <button key={l.code} onClick={() => { changeLanguage(l.code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gold/10 ${language===l.code?'text-gold':'text-cream'}`} style={{color: language===l.code?undefined:'#F5E6CA'}}>
                      {l.flag} {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gold p-2" aria-label="Menu" data-testid="mobile-menu-btn">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="xl:hidden bg-black/98 border-t border-gold/20">
          <div className="px-4 py-4 space-y-1">
            {links.map(link => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-md text-base font-medium ${isActive(link.path) ? 'text-gold bg-gold/10' : 'text-cream hover:text-gold hover:bg-white/5'}`} style={{color: isActive(link.path)?undefined:'#F5E6CA'}}>
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-center gap-3 pt-4 border-t border-gold/20 mt-3">
              <a href="https://www.instagram.com/haciendaturisticasanfrancisco/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full text-gold hover:bg-gold/10"><Instagram size={22} /></a>
              <a href="https://www.facebook.com/clubsanfranciscoec" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full text-gold hover:bg-gold/10"><Facebook size={22} /></a>
              <a href="https://www.tiktok.com/@haciendasanfranciso" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full text-gold hover:bg-gold/10">
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/></svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
