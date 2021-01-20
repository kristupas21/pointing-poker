export enum Breakpoint {
  Desktop = 'Desktop',
  Tablet = 'Tablet',
  Mobile = 'Mobile',
}

export interface User {
  id: string;
  name: string;
  role?: string;
}
