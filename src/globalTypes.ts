import { MessageId } from 'lang';
import { AvatarId } from 'components/Avatar';
import { UserRole } from 'utils/userRoles/types';

export interface User {
  avatarId?: AvatarId;
  id: string;
  isObserver?: boolean;
  name: string;
  role?: UserRole;
  registeredSessionId?: string;
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

export interface AppVariables {
  mainColor: string;
  backgroundColor: string;
  textColor: string;
}

export enum AlignType {
  Left = 'left',
  Right = 'right',
  Center = 'center',
}

export type Timeout = ReturnType<typeof setTimeout>;
