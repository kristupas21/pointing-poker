import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { getBreakPoint } from './utils';
import BreakpointsContext from './BreakpointsContext';

const BreakpointsContextProvider: React.FC = ({ children }) => {
  const [breakpoint, setBreakpoint] = useState(getBreakPoint(window.innerWidth));

  useEffect(() => {
    function setWidth() {
      setBreakpoint(getBreakPoint(window.innerWidth));
    }

    const handleResize = debounce(setWidth, 50);

    window.addEventListener('resize', handleResize);
    setWidth();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <BreakpointsContext.Provider value={{ breakpoint }}>
      {children}
    </BreakpointsContext.Provider>
  );
};

export default BreakpointsContextProvider;
