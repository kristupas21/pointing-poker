import { Theme } from './types';

const THEME_VARS: Record<string, Record<Theme, string>> = {
  '--app-background-color': { light: '#fff', dark: '#333' },
  '--app-color': { light: '#000', dark: '#eee' },
};

export const setThemeVars = (theme: Theme) => {
  Object.entries(THEME_VARS).forEach(([variable, val]) => {
    document
      .documentElement
      .style
      .setProperty(variable, val[theme]);
  });
};
