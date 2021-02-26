import store from '../state/store';
import { AvatarId } from '../components/Avatar';

export enum Breakpoint {
  Desktop = 'Desktop',
  Tablet = 'Tablet',
  Mobile = 'Mobile',
}

export interface User {
  avatarId?: AvatarId;
  id: string;
  isObserver?: boolean;
  name: string;
  role?: string;
  registeredSessionId?: string;
  voteValue?: string;
}

const state = store.getState();

export type State = typeof state;

export type ValueOf<T> = T[keyof T];

export interface Identifier {
  id: string;
  name: string;
}

export type Selector<R> = (state: State) => R;
