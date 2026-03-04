import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { languageNames } from '../translations';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = ['nl', 'fr', 'en', 'de', 'es', 'it'];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        data-testid="language-switcher-btn"
      >
        <Globe className="w-5 h-5 text-[#7D3C32]" />
        <span className="text-sm font-medium text-gray-700 uppercase">{language}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setLanguage(lang);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                language === lang ? 'bg-[#7D3C32] text-white hover:bg-[#6A3229]' : 'text-gray-700'
              }`}
            >
              {languageNames[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
