import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../services/storage';

interface ConfiguratorContextType {
  selections: any[];
  setSelections: (selections: any[]) => void;
  activeProductIndex: number;
  setActiveProductIndex: (index: number) => void;
  resetSelections: () => void;
}

const ConfiguratorContext = createContext<ConfiguratorContextType | undefined>(undefined);

export const ConfiguratorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selections, setSelections] = useState<any[]>([]);
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      const saved = await storage.getItem<any[]>('configurator-selections');
      if (saved) setSelections(saved);
      const savedIndex = await storage.getItem<number>('active-product-index');
      if (typeof savedIndex === 'number') setActiveProductIndex(savedIndex);
    };
    load();
  }, []);

  const handleSetSelections = (newSelections: any[]) => {
    setSelections(newSelections);
    storage.setItem('configurator-selections', newSelections);
  };

  const handleSetActiveIndex = (index: number) => {
    setActiveProductIndex(index);
    storage.setItem('active-product-index', index);
  };

  const resetSelections = () => {
    // This should ideally be passed from where the default products are defined
    // but for simplicity we'll let the component handle the initial state
  };

  return (
    <ConfiguratorContext.Provider value={{
      selections,
      setSelections: handleSetSelections,
      activeProductIndex,
      setActiveProductIndex: handleSetActiveIndex,
      resetSelections
    }}>
      {children}
    </ConfiguratorContext.Provider>
  );
};

export const useConfigurator = () => {
  const context = useContext(ConfiguratorContext);
  if (!context) throw new Error('useConfigurator must be used within ConfiguratorProvider');
  return context;
};
