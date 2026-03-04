import React, { createContext, useContext } from 'react';

const BasePathContext = createContext('/site/mercato');

export const BasePathProvider = ({ basePath = '/site/mercato', children }) => {
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
