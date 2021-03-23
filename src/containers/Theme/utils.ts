import { AppVariables } from 'types/global';
import { Theme } from './types';

const _white = '#ffffff';
const _darkGrey = '#333333';
const _violet = '#7E41FF';

const withPrefix = (name: string): string => `--app-${name}`;

const THEME_VARIABLES: Record<Theme, AppVariables> = {
  [Theme.Light]: {
    mainColor: _white,
    textColor: _darkGrey,
    backgroundColor: _white,
  },
  [Theme.Dark]: {
    mainColor: _darkGrey,
    textColor: _white,
    backgroundColor: _darkGrey,
  },
  [Theme.Violet]: {
    mainColor: _violet,
    textColor: _darkGrey,
    backgroundColor: _white,
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
