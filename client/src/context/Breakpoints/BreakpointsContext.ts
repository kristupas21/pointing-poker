import { createContext } from 'react';
import { BreakpointsContextProps } from './types';
import { getBreakpoint, getBreakpointsContextProps } from './utils';

const BreakpointsContext = createContext<BreakpointsContextProps>(
  getBreakpointsContextProps(getBreakpoint(window.innerWidth))
);

export default BreakpointsContext;
