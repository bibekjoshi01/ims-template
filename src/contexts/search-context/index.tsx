import React, { createContext, useContext, useState } from 'react';
import { ISearchContextType } from './types';

const MenuSearchContext = createContext<ISearchContextType | undefined>(undefined);

export const MenuSearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return <MenuSearchContext.Provider value={{ searchTerm, setSearchTerm }}>{children}</MenuSearchContext.Provider>;
};

export const useMenuSearch = () => {
  const context = useContext(MenuSearchContext);
  if (!context) {
    throw new Error('useMenuSearch must be used within a SearchProvider');
  }
  return context;
};
