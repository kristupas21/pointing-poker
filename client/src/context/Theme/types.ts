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
  default: string | any; // TODO type for rgba
  inverted: string | any;
}

type ThemeVariableKey =
    'backgroundColor' |
    'dangerColor' |
    'dangerColorDark' |
    'dangerColorDarker' |
    'dangerColorLighter' |
    'mainColor' |
    'mainColorLighter' |
    'shadowColor' |
    'themeColor' |
    'themeColorDark' |
    'themeColorDarker' |
    'themeColorLight' |
    'themeColorLighter';

export type ThemeVariables = Record<ThemeVariableKey, ThemeVariableProps>;
