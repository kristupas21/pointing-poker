import { AvatarId } from 'components/Avatar';

export interface User {
  avatarId?: AvatarId;
  id: string;
  isObserver?: boolean;
  name: string;
  role?: string;
  sessionId?: string;
  hasPermission?: boolean;
  voteValue?: string;
}

export type State = ReturnType<typeof import('state/store').getState>;

export type ValueOf<T> = T[keyof T];

export interface Identifier {
  id: string;
  name: string;
}

export enum AlignType {
  Left = 'left',
  Right = 'right',
  Center = 'center',
}

export type Timeout = ReturnType<typeof setTimeout>;
