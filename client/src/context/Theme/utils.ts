import { Theme, ThemeContextState, ThemeVariables } from './types';

const _white = '#ffffff';

const _darkGrey = '#333333';

const _violet = '#7e41ff';

function withPrefix(name: string): string {
  return `--app-${name}`;
}

const THEME_VARIABLES: ThemeVariables = {
  [Theme.Default]: {
    mainColor: { default: _white, inverted: _darkGrey },
    textColor: { default: _darkGrey, inverted: _white },
    backgroundColor: { default: _white, inverted: _darkGrey },
  },
  [Theme.Violet]: {
    mainColor: { default: _violet, inverted: _white },
    textColor: { default: _darkGrey, inverted: _darkGrey },
    backgroundColor: { default: _white, inverted: _violet },
  },
};

export const getThemeColor = (theme: Theme): string =>
  THEME_VARIABLES[theme].mainColor.default;

export const setThemeVars = ({ theme, isInverted }: ThemeContextState): void => {
  const record = THEME_VARIABLES[theme];

  Object.entries(record).forEach(([variable, value]) => {
    const prop: keyof typeof value = isInverted ? 'inverted' : 'default';

    document
      .documentElement
      .style
      .setProperty(withPrefix(variable), value[prop]);
  });
};
