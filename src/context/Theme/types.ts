export interface ThemeContextProps {
  theme: Theme;
  setAppTheme: (theme: Theme) => void;
}

export enum Theme {
  Dark = 'dark',
  Light = 'light',
  Violet = 'violet',
}
