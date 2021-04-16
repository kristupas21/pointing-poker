export interface ThemeContextState {
  isInverted: boolean;
  theme: Theme;
}

export interface ThemeContextProps extends ThemeContextState {
  setTheme: (theme: Theme) => void;
  toggleInverted: () => void;
}

export enum Theme {
  Violet = 'violet',
  Blue = 'blue',
  Green = 'green',
  Pink = 'pink',
  Monochrome = 'monochrome',
}

type ThemeVariableProps = {
  default: string;
  inverted: string;
}

type ThemeVariableKey =
    'backgroundColor' |
    'dangerColor' |
    'mainColor' |
    'themeColor' |
    'themeColorDark' |
    'themeColorDarker' |
    'themeColorLight' |
    'themeColorLighter';

export type ThemeVariables = Record<ThemeVariableKey, ThemeVariableProps>;
