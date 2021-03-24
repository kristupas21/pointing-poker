import React from 'react';
import { WithBreakpoint } from './types';
import BreakpointsContext from './BreakpointsContext';

const withBreakpointsContext = <T extends WithBreakpoint>(
  Component: React.ComponentType<T>
) => (props: T) => (
  <BreakpointsContext.Consumer>
    {(contextProps) => <Component {...props} {...contextProps} />}
  </BreakpointsContext.Consumer>
  // eslint-disable-next-line indent
);

export default withBreakpointsContext;
