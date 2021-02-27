import React, { useEffect } from 'react';
import { useStorageState } from '../../utils/customHooks';
import ThemeContext from './ThemeContext';
import { Theme } from './types';
import { setThemeVars } from './utils';

const ThemeContextProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useStorageState<Theme>('theme', 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    setTheme(newTheme);
    setThemeVars(newTheme);
  };

  const value = { theme, toggleTheme };

  useEffect(() => {
    setThemeVars(theme);
  }, []);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
