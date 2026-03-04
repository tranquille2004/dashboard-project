import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBasePath } from '../context/BasePathContext';
import { allTranslations } from '../translations/allTranslations';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { currentLanguage, changeLanguage } = useLanguage();
  const basePath = useBasePath();
  const location = useLocation();
  const t = allTranslations.nav[currentLanguage] || allTranslations.nav.nl;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t.home, path: basePath },
    { name: t.about, path: `${basePath}/about` },
    { name: t.menu, path: `${basePath}/menu` },
    { name: t.groupMenu, path: `${basePath}/group-menu` },
    { name: t.reservations, path: `${basePath}/reservations` },
    { name: t.gallery, path: `${basePath}/gallery` },
    { name: t.info, path: `${basePath}/info` },
  ];

  const languages = [
    { code: 'nl', name: 'Nederlands', flag: '🇧🇪' },
    { code: 'fr', name: 'Français', flag: '🇧🇪' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  const handleLangChange = (langCode) => {
    changeLanguage(langCode);
    setIsLangMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#1a1a1a]/95 shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={basePath} className="flex items-center">
              <img
                src="https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/ascoli.jpg"
                alt="L'Ascoli"
                className="h-12 w-auto"
                style={{
                  filter: 'brightness(0.7) saturate(1.3) hue-rotate(-5deg)'
                }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center" style={{ gap: '24px' }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-white hover:text-[#6b1f1f] transition-colors duration-200 text-sm uppercase tracking-wide ${
                    location.pathname === item.path ? 'text-[#6b1f1f]' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Language Selector */}
              <div className="relative">
                <button
                  className="flex items-center gap-2 text-white hover:text-[#6b1f1f] transition-colors duration-200"
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                >
                  <span className="text-lg">{languages.find(l => l.code === currentLanguage)?.flag}</span>
                  <span className="text-sm uppercase">{currentLanguage}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a]/95 border border-gray-800 rounded-sm shadow-lg">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="w-full px-4 py-2 text-left text-white hover:bg-[#6b1f1f] transition-colors flex items-center gap-3"
                        onClick={() => handleLangChange(lang.code)}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Language Selector - Always Visible */}
            <div className="lg:hidden flex items-center gap-3">
              <div className="relative">
                <button
                  className="flex items-center gap-1 text-white hover:text-[#6b1f1f] transition-colors duration-200"
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                >
                  <span className="text-lg">{languages.find(l => l.code === currentLanguage)?.flag}</span>
                  <span className="text-xs uppercase">{currentLanguage}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                
                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-[#1a1a1a]/95 border border-gray-800 rounded-sm shadow-lg z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="w-full px-3 py-2 text-left text-white hover:bg-[#6b1f1f] transition-colors flex items-center gap-2 text-sm"
                        onClick={() => handleLangChange(lang.code)}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span className="text-xs">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Mobile Menu Button */}
              <button
                className="text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-[#1a1a1a]/95" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-white hover:text-[#6b1f1f] transition-colors duration-200 text-xl uppercase tracking-wide ${
                    location.pathname === item.path ? 'text-[#6b1f1f]' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
