import Color from 'color';
import { COLOR_WHITE, COLOR_DARK, COLOR_VIOLET, COLOR_BLUE, COLOR_GREEN, COLOR_PINK, COLOR_RED } from './constants';
import { Theme, ThemeContextState, ThemeVariables } from './types';

function generateCssVarName(name: string): string {
  return `--${name.split(/(?=[A-Z])/).join('-').toLowerCase()}`;
}

function lightColor(color: string): string {
  return Color(color).lighten(0.27).hex();
}

function lighterColor(color: string): string {
  return Color(color).lighten(0.27).mix(Color('#EEEEEE'), 0.8).hex();
}

function darkColor(color: string): string {
  return Color(color).darken(0.2).mix(Color('#706e6e'), 0.3).hex();
}

function darkerColor(color: string): string {
  return Color(color).darken(0.15).mix(Color('#5e5e5e'), 0.6).hex();
}

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
