import React, { createContext, useContext } from 'react';

const BasePathContext = createContext('/site/theobeans');

export const useBasePath = () => useContext(BasePathContext);

export const BasePathProvider = ({ basePath, children }) => (
  <BasePathContext.Provider value={basePath}>
    {children}
  </BasePathContext.Provider>
);
