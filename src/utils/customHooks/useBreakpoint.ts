import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { Breakpoint } from 'types/global';

const getBreakPoint = (windowWidth: number): Breakpoint => {
  if (windowWidth >= 1024) {
    return Breakpoint.Desktop;
  }

  if (windowWidth >= 768) {
    return Breakpoint.Tablet;
  }

  return Breakpoint.Mobile;
};

const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState(getBreakPoint(window.innerWidth));

  useEffect(() => {
    function setWidth() {
      const value = getBreakPoint(window.innerWidth);

      setBreakpoint(value);
    }

    const handleResize = debounce(setWidth, 50);

    window.addEventListener('resize', handleResize);
    setWidth();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return breakpoint;
};

export default useBreakpoint;
