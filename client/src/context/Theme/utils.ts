import { darkColor, darkerColor, generateCssVarName, lightColor, lighterColor } from 'utils/colors';
import { COLOR_BLUE, COLOR_DARK, COLOR_GREEN, COLOR_PINK, COLOR_RED, COLOR_VIOLET, COLOR_WHITE } from 'utils/colors/constants';
import { Theme, ThemeContextState, ThemeVariables } from './types';

const themeColors = (color: string): ThemeVariables => ({
  mainColor: { default: COLOR_DARK, inverted: COLOR_WHITE },
  backgroundColor: { default: COLOR_WHITE, inverted: COLOR_DARK },
  dangerColor: { default: COLOR_RED, inverted: COLOR_RED },
  themeColor: { default: color, inverted: color },
  themeColorLight: { default: lightColor(color), inverted: lightColor(color) },
  themeColorLighter: { default: lighterColor(color), inverted: lighterColor(color) },
  themeColorDark: { default: darkColor(color), inverted: darkColor(color) },
  themeColorDarker: { default: darkerColor(color), inverted: darkerColor(color) },
});

const THEME_VARIABLES: Record<Theme, ThemeVariables> = {
  [Theme.Violet]: {
    ...themeColors(COLOR_VIOLET),
  },
  [Theme.Blue]: {
    ...themeColors(COLOR_BLUE),
  },
  [Theme.Green]: {
    ...themeColors(COLOR_GREEN),
  },
  [Theme.Pink]: {
    ...themeColors(COLOR_PINK),
  },
  [Theme.Monochrome]: {
    ...themeColors(COLOR_DARK),
  },
};

export const getThemeColor = (theme: Theme): string =>
  THEME_VARIABLES[theme].themeColor.default;

export const setThemeVars = ({ theme, isInverted }: ThemeContextState): void => {
  const record = THEME_VARIABLES[theme];

  Object.entries(record).forEach(([variable, value]) => {
    const prop: keyof typeof value = isInverted ? 'inverted' : 'default';

    document
      .documentElement
      .style
      .setProperty(generateCssVarName(variable), value[prop]);
  });
};
