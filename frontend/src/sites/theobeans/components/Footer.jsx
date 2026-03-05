import React from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/mock';
import { useLanguage } from '../context/LanguageContext';
import { useBasePath } from '../context/BasePathContext';

const Footer = () => {
  const { t } = useLanguage();
  const basePath = useBasePath();

  return (
    <footer className="bg-[#b8999e] text-white">
      {/* Main Footer Content */}
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm mb-6">
            {siteData.navigation.map((item, index) => (
              <React.Fragment key={item.path}>
                <Link
                  to={item.path === '/' ? basePath : `${basePath}${item.path}`}
                  className="hover:opacity-70 transition-opacity font-light tracking-wide text-white/90 hover:text-white"
                >
                  {t.nav[item.key]}
                </Link>
                {index < siteData.navigation.length - 1 && (
                  <span className="text-white/40">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="text-center text-xs text-white/70">
            © 2024 Theo Beans Export. {t.footer.rights}.
          </div>
        </div>
      </div>

      {/* Webmaster Info Section - IN FRENCH */}
      <div className="bg-[#a8898e] py-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs text-white/80 mb-3">
              {t.footer.webmasterText}
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a 
                href="https://wa.me/32494516064" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/images/theobeans/fworks-logo.png" 
                  alt="f.works builders" 
                  className="h-12 w-auto"
                />
              </a>
              <span className="text-xs text-white/70">
                {t.footer.webmaster}: fworksbuilders •{' '}
                <a 
                  href="https://wa.me/32494516064" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline"
                >
                  +32 494 51 60 64
                </a>
                {' '}(WhatsApp)
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
