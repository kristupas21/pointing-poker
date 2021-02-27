import React from 'react';
import { WithTheme } from './types';
import ThemeContext from './ThemeContext';

const withThemeContext = <T extends WithTheme>(
  Component: React.ComponentType<T>
) => (props: T) => (
  <ThemeContext.Consumer>
    {(contextProps) => <Component {...props} {...contextProps} />}
  </ThemeContext.Consumer>
  // eslint-disable-next-line indent
);

export default withThemeContext;
