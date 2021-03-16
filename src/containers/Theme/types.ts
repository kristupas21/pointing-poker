export interface WithTheme {
  theme?: Theme;
  setAppTheme?: (theme: Theme) => void;
}

export enum Theme {
  Dark = 'dark',
  Light = 'light',
  Rose = 'rose',
}
