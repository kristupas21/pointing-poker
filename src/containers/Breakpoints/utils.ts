import { Breakpoint } from './types';

export function getBreakPoint(windowWidth: number): Breakpoint {
  if (windowWidth >= 1024) {
    return Breakpoint.Desktop;
  }

  if (windowWidth >= 768) {
    return Breakpoint.Tablet;
  }

  return Breakpoint.Mobile;
}
