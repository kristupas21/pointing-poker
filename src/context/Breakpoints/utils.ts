import { Breakpoint, BreakpointsContextProps } from './types';

export function getBreakpoint(windowWidth: number): Breakpoint {
  if (windowWidth >= 1024) {
    return Breakpoint.Desktop;
  }

  if (windowWidth >= 768) {
    return Breakpoint.Tablet;
  }

  return Breakpoint.Mobile;
}

export function getBreakpointsContextProps(br: Breakpoint): BreakpointsContextProps {
  return {
    isMobile: br === Breakpoint.Mobile,
    isTablet: br === Breakpoint.Tablet,
    isDesktop: br === Breakpoint.Desktop,
    isMobileOrTablet: br === Breakpoint.Mobile || br === Breakpoint.Tablet,
    isDesktopOrTablet: br === Breakpoint.Desktop || br === Breakpoint.Tablet,
  };
}
