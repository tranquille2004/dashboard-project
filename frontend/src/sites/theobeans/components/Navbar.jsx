import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { siteData } from '../data/mock';
import { useLanguage } from '../context/LanguageContext';
import { useBasePath } from '../context/BasePathContext';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const basePath = useBasePath();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#b8999e]/98 backdrop-blur-sm shadow-lg' : 'bg-[#b8999e]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to={basePath}
            className="text-white font-light tracking-wider text-xs md:text-sm hover:opacity-80 transition-opacity"
          >
            {siteData.tagline}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {siteData.navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path === '/' ? basePath : `${basePath}${item.path}`}
                className={`px-4 py-2 text-xs font-normal tracking-wide transition-all duration-200 ${
                  location.pathname === (item.path === '/' ? basePath : `${basePath}${item.path}`)
                    ? 'text-white border border-white/50'
                    : 'text-white/95 hover:text-white hover:border hover:border-white/30'
                }`}
              >
                {t.nav[item.key]}
              </Link>
            ))}
            <LanguageSelector />
          </div>

          {/* Mobile menu button and Language Selector */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSelector />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 hover:bg-white/10 rounded transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#b8999e] border-t border-white/20">
          <div className="px-4 py-4 space-y-2">
            {siteData.navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path === '/' ? basePath : `${basePath}${item.path}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-light tracking-wide transition-all ${
                  location.pathname === (item.path === '/' ? basePath : `${basePath}${item.path}`)
                    ? 'text-white bg-white/20 border border-white/50'
                    : 'text-white/95 hover:bg-white/10'
                }`}
              >
                {t.nav[item.key]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
