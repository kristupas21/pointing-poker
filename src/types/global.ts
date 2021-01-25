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

export type State = typeof state;

export type ValueOf<T> = T[keyof T];

export interface Identifier {
  id: string;
  name: string;
}
