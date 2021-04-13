export interface ThemeContextState {
  isInverted: boolean;
  theme: Theme;
}

export interface ThemeContextProps extends ThemeContextState {
  setTheme: (theme: Theme) => void;
  toggleInverted: () => void;
}

export enum Theme {
  Default = 'default',
  Violet = 'violet',
}

type ThemeVariableProps = {
  default: string;
  inverted: string;
}

type ThemeVariableKey =
    'mainColor' |
    'backgroundColor' |
    'textColor';

export type ThemeVariables = Record<Theme, Record<ThemeVariableKey, ThemeVariableProps>>;
