import React, { useEffect } from 'react';
import { useStorageState } from 'utils/customHooks';
import { StorageKey } from 'utils/storageService';
import ThemeContext from './ThemeContext';
import { Theme } from './types';
import { setThemeVars } from './utils';

const ThemeContextProvider: React.FC = (props) => {
  const { children } = props;
  const [themeProps, setThemeProps] =
      useStorageState(StorageKey.Theme, { theme: Theme.Violet, isInverted: false });

  const setTheme = (newTheme: Theme) => {
    const newState = {
      ...themeProps,
      theme: newTheme,
    };

    setThemeProps(newState);
  };

  const toggleInverted = () => {
    const newState = {
      ...themeProps,
      isInverted: !themeProps.isInverted,
    };

    setThemeProps(newState);
  };

  useEffect(() => {
    setThemeVars(themeProps);
  }, [themeProps]);

  useEffect(() => {
    if (!Object.values(Theme).includes(themeProps.theme)) {
      setTheme(Theme.Violet);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{ setTheme, toggleInverted, ...themeProps }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
