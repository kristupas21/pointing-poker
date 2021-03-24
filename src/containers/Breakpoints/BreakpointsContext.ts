import { createContext } from 'react';
import { Breakpoint, WithBreakpoint } from './types';

const BreakpointsContext = createContext<WithBreakpoint>({
  breakpoint: Breakpoint.Desktop,
});

export default BreakpointsContext;
