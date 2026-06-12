import React, { createContext, useContext } from 'react';

const SiteConfigContext = createContext(null);

export const SiteConfigProvider = ({ value, children }) => (
  <SiteConfigContext.Provider value={value}>{children}</SiteConfigContext.Provider>
);

export const useSiteConfig = () => useContext(SiteConfigContext);
