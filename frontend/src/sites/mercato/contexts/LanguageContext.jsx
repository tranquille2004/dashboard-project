import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('nl');

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  // Keep toggleLanguage for backward compatibility
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'nl' ? 'fr' : 'nl');
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
