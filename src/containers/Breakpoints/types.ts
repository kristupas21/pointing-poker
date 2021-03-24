export enum Breakpoint {
  Desktop = 'Desktop',
  Tablet = 'Tablet',
  Mobile = 'Mobile',
}

export interface WithBreakpoint {
  breakpoint: Breakpoint;
}
