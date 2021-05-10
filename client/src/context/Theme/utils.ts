import { colorWithOpacity, darkColor, darkerColor, generateCssVarName, lightColor, lighterColor, grayedColor } from 'utils/colors';
import { COLOR_BLUE, COLOR_DARK, COLOR_GREEN, COLOR_PINK, COLOR_RED, COLOR_VIOLET, COLOR_WHITE } from 'utils/colors/constants';
import { Theme, ThemeContextState, ThemeVariables } from './types';

const themeColors = (color: string): ThemeVariables => ({
  mainColor: { default: COLOR_DARK, inverted: COLOR_WHITE },
  mainColorLight: { default: lighterColor(COLOR_DARK), inverted: lighterColor(COLOR_DARK) },
  mainColorLighter: { default: grayedColor(COLOR_DARK), inverted: COLOR_DARK },
  backgroundColor: { default: COLOR_WHITE, inverted: COLOR_DARK },
  dangerColor: { default: COLOR_RED, inverted: COLOR_RED },
  dangerColorDark: { default: darkColor(COLOR_RED), inverted: darkColor(COLOR_RED) },
  dangerColorDarker: { default: darkerColor(COLOR_RED), inverted: darkerColor(COLOR_RED) },
  dangerColorLighter: { default: lighterColor(COLOR_RED), inverted: darkerColor(COLOR_RED) },
  shadowColor: { default: colorWithOpacity(COLOR_DARK, 0.17), inverted: colorWithOpacity(COLOR_DARK, 0.17) },
  themeColor: { default: color, inverted: color },
  themeColorLight: { default: lightColor(color), inverted: darkColor(color) },
  themeColorLighter: { default: lighterColor(color), inverted: darkerColor(color) },
  themeColorDark: { default: darkColor(color), inverted: darkerColor(color) },
  themeColorDarker: { default: darkerColor(color), inverted: lightColor(color) },
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
    themeColor: { default: COLOR_DARK, inverted: COLOR_WHITE },
    themeColorDarker: { default: darkerColor(COLOR_DARK), inverted: lighterColor(COLOR_DARK) },
  },
};

export const getThemeColor = (theme: Theme): string | any =>
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
