export type Theme = 'dark' | 'light';

export interface WithTheme {
  theme?: Theme;
  toggleTheme?: () => void
}
