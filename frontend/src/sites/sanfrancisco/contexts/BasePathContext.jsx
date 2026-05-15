import React, { createContext, useContext } from 'react';

const BasePathContext = createContext('');

export const BasePathProvider = ({ basePath = '', children }) => {
  return (
    <BasePathContext.Provider value={basePath}>
      {children}
    </BasePathContext.Provider>
  );
};

export const useBasePath = () => {
  return useContext(BasePathContext);
};

export default BasePathContext;
