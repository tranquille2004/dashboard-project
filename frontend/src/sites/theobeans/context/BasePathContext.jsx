import React, { createContext, useContext } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// Context voor de base path
const BasePathContext = createContext('');

export const useBasePath = () => useContext(BasePathContext);

export const BasePathProvider = ({ basePath, children }) => (
  <BasePathContext.Provider value={basePath}>
    {children}
  </BasePathContext.Provider>
);

// Custom Link component die automatisch basePath toevoegt
export const Link = ({ to, children, ...props }) => {
  const basePath = useBasePath();
  
  // Op custom domain is basePath leeg, dus gebruik gewoon het originele pad
  // Op preview (/site/theobeans) voeg basePath toe
  let fullPath = to;
  if (basePath && to.startsWith('/')) {
    fullPath = `${basePath}${to === '/' ? '' : to}`;
  }
  
  return (
    <RouterLink to={fullPath || '/'} {...props}>
      {children}
    </RouterLink>
  );
};

// Hook om te checken of huidige path matched (met basePath support)
export const usePathMatch = (path) => {
  const location = useLocation();
  const basePath = useBasePath();
  const fullPath = path === '/' ? basePath : `${basePath}${path}`;
  return location.pathname === fullPath || location.pathname === fullPath + '/';
};
