import { createContext } from 'react';
import noop from 'lodash/noop';
import { Theme, WithTheme } from './types';

const ThemeContext = createContext<WithTheme>({
  theme: Theme.Light, setAppTheme: noop,
});

export default ThemeContext;
