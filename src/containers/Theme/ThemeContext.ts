import React from 'react';
import { WithTheme } from './types';

const ThemeContext = React.createContext<WithTheme>(
  { theme: 'light', toggleTheme: () => undefined }
);

export default ThemeContext;
