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
    'themeColor' |
    'themeColorLight' |
    'themeColorLighter' |
    'themeColorDark' |
    'themeColorDarker' |
    'mainColor' |
    'backgroundColor';

export type ThemeVariables = Record<Theme, Record<ThemeVariableKey, ThemeVariableProps>>;
