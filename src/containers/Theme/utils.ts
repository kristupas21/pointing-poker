import { AppVariables } from 'types/global';
import { Theme } from './types';

const _white = '#ffffff';
const _darkGrey = '#333333';
const _rose = '#ec3669';

const withPrefix = (name: string): string => `--app-${name}`;

const THEME_VARIABLES: Record<Theme, AppVariables> = {
  [Theme.Light]: {
    mainColor: _white,
    secondaryColor: _darkGrey,
  },
  [Theme.Dark]: {
    mainColor: _darkGrey,
    secondaryColor: _white,
  },
  [Theme.Rose]: {
    mainColor: _rose,
    secondaryColor: _white,
  },
};

export const getThemeColor = (theme: Theme): string =>
  THEME_VARIABLES[theme].mainColor;

export const setThemeVars = (theme: Theme): void => {
  const record = THEME_VARIABLES[theme];

  Object.entries(record).forEach(([variable, value]) => {
    document
      .documentElement
      .style
      .setProperty(withPrefix(variable), value);
  });
};
