import store from '../state/store';

export enum Breakpoint {
  Desktop = 'Desktop',
  Tablet = 'Tablet',
  Mobile = 'Mobile',
}

export interface User {
  id: string;
  name: string;
  role?: string;
  registeredSessionId?: string;
}

const state = store.getState();

export type StateMapper = (s: typeof state) => Record<string, any>;

export type ValueOf<T> = T[keyof T];
