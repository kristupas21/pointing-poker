import React, { useEffect } from 'react';
import { useStorageState } from 'utils/customHooks';
import { StorageKey } from 'utils/storageService';
import ThemeContext from './ThemeContext';
import { Theme } from './types';
import { setThemeVars } from './utils';

const ThemeContextProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useStorageState<Theme>(StorageKey.Theme, Theme.Light);

  const setAppTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setThemeVars(newTheme);
  };

  useEffect(() => {
    setThemeVars(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setAppTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
