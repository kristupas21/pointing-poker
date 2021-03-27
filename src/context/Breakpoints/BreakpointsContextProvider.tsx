import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { getBreakpoint, getBreakpointsContextProps } from './utils';
import BreakpointsContext from './BreakpointsContext';

const BreakpointsContextProvider: React.FC = ({ children }) => {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint(window.innerWidth));

  useEffect(() => {
    function setWidth() {
      setBreakpoint(getBreakpoint(window.innerWidth));
    }

    const handleResize = debounce(setWidth, 50);

    window.addEventListener('resize', handleResize);
    setWidth();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <BreakpointsContext.Provider value={getBreakpointsContextProps(breakpoint)}>
      {children}
    </BreakpointsContext.Provider>
  );
};

export default BreakpointsContextProvider;
