import React, { createContext, useContext } from 'react';

const BasePathContext = createContext('/site/ascoli');

export const BasePathProvider = ({ basePath = '/site/ascoli', children }) => {
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
