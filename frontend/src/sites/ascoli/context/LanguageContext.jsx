import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('nl');

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      setCurrentLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('language', langCode);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
