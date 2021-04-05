import { MessageId } from 'lang';
import { AvatarId } from 'components/Avatar';

export interface User {
  avatarId?: AvatarId;
  id: string;
  isObserver?: boolean;
  name: string;
  role?: string;
  registeredSessionId?: string;
  sessionControlPermission?: boolean;
  voteValue?: string;
}

export type State = ReturnType<typeof import('state/store').getState>;

export type ValueOf<T> = T[keyof T];

export interface Identifier {
  id: string;
  name: string;
}

export type CustomFormError = { id: MessageId; values?: any };

export type CustomFormErrors<T> = Record<keyof T, CustomFormError>;

export enum AlignType {
  Left = 'left',
  Right = 'right',
  Center = 'center',
}

export type Timeout = ReturnType<typeof setTimeout>;
