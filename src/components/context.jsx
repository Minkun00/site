import { createContext, useContext, useState } from 'react';

const SiteContext = createContext();

const SiteProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState('initial value');

  const updateGlobalState = (newValue) => {
    setGlobalState(newValue);
  };

  return (
    <SiteContext.Provider value={{ globalState, updateGlobalState }}>
      {children}
    </SiteContext.Provider>
  );
};

const useSiteContext = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('Context must be used within a SiteProvider');
  }
  return context;
};

export { SiteProvider, useSiteContext };
