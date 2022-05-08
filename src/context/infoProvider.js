import React from 'react';
import InfoContext from './infoContext';

export default function InfoProvider({ children }) {
  

  const contextValues = {
    
  };

  return (
    <InfoContext.Provider value={ contextValues }>
      { children }
    </InfoContext.Provider>
  );
}