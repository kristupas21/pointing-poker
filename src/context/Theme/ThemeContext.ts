import { createContext } from 'react';
import noop from 'lodash/noop';
import { Theme, ThemeContextProps } from './types';

const ThemeContext = createContext<ThemeContextProps>({
  theme: Theme.Light, setAppTheme: noop,
});

export default ThemeContext;
