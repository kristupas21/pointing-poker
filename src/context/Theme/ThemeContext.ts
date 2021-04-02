import { createContext } from 'react';
import noop from 'lodash/noop';
import { Theme, ThemeContextProps } from './types';

const ThemeContext = createContext<ThemeContextProps>({
  isInverted: false,
  theme: Theme.Default,
  setTheme: noop,
  toggleInverted: noop,
});

export default ThemeContext;
