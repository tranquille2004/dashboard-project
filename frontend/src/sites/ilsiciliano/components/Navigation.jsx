import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useBasePath } from '../contexts/BasePathContext';
import { translations } from '../data/translations';
import { Menu, X, Globe } from 'lucide-react';

const Navigation = () => {
  const { language, changeLanguage } = useLanguage();
  const basePath = useBasePath();
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();
  const t = translations.nav;

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇨' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  const currentLang = languages.find(l => l.code === language);

  // Als basePath leeg is, gebruik "/" voor home
  const homePath = basePath || '/';
  
  const navLinks = [
    { path: homePath, label: t.home[language] },
    { path: `${basePath}/about`, label: t.about[language] },
    { path: `${basePath}/menu`, label: t.menu[language] },
    { path: `${basePath}/group-menus`, label: t.groupMenus[language] },
    { path: `${basePath}/reserve`, label: t.reserve[language] },
    { path: `${basePath}/takeaway`, label: t.takeaway[language] },
    { path: `${basePath}/gallery`, label: t.gallery[language] },
    { path: `${basePath}/info`, label: t.info[language] }
  ];

  const isActive = (path) => location.pathname === path || (path === homePath && (location.pathname === `${basePath}/` || location.pathname === basePath || location.pathname === '/'));

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to={homePath} className="flex items-center space-x-3">
            <img 
              src="/images/ilsiciliano/logo/ilsiciliano-logo.jpg" 
              alt="Il Siciliano Logo" 
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-gold bg-gold/10'
                    : 'text-white hover:text-gold hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Language Dropdown */}
            <div className="relative ml-4">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-2 px-4 py-3 rounded-md text-base font-bold bg-gold text-black hover:bg-gold/90 transition-all duration-300 border-2 border-gold shadow-lg"
              >
                <Globe size={20} />
                <span>{currentLang.flag} {currentLang.code.toUpperCase()}</span>
              </button>
              
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-sm border-2 border-gold/30 rounded-lg shadow-2xl overflow-hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all ${
                        language === lang.code
                          ? 'bg-gold text-black font-bold'
                          : 'text-white hover:bg-gold/20 hover:text-gold'
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile: Language + Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Language Selector - Always visible on mobile */}
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center space-x-1 px-3 py-2.5 rounded-md text-sm font-bold bg-gold text-black hover:bg-gold/90 transition-all duration-300 border-2 border-gold shadow-lg z-50"
            >
              <span>{currentLang.flag}</span>
              <span>{currentLang.code.toUpperCase()}</span>
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-md text-gold hover:bg-gold/10 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-black/98 border-t border-gold/20">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-md text-base font-medium transition-all ${
                  isActive(link.path)
                    ? 'text-gold bg-gold/10'
                    : 'text-white hover:text-gold hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Language Dropdown */}
      {langMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/90" onClick={() => setLangMenuOpen(false)}>
          <div className="absolute top-20 right-4 w-56 bg-black/95 backdrop-blur-sm border-2 border-gold/30 rounded-lg shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code);
                  setLangMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-4 text-left transition-all ${
                  language === lang.code
                    ? 'bg-gold text-black font-bold'
                    : 'text-white hover:bg-gold/20 hover:text-gold'
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-base">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
