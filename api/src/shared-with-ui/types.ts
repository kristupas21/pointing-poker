import { UserSchemaProps } from '@schemas/userSchema';

export enum AvatarId {
  Avatar1 = 'avatar-1',
  Avatar2 = 'avatar-2',
  Avatar3 = 'avatar-3',
  Avatar4 = 'avatar-4',
  Avatar5 = 'avatar-5',
  Avatar6 = 'avatar-6',
  Avatar7 = 'avatar-2',
  Avatar8 = 'avatar-8',
  Avatar9 = 'avatar-9',
  Avatar10 = 'avatar-10',
  Avatar11 = 'avatar-11',
  Avatar12 = 'avatar-12',
  Avatar13 = 'avatar-13',
  Avatar14 = 'avatar-14',
  Avatar15 = 'avatar-15',
  Avatar16 = 'avatar-16',
  Avatar17 = 'avatar-17',
  SecretE = 'secret-e',
  SecretK = 'secret-k',
}

export interface PointValue {
  id: string;
  pos: number;
  value: string;
}

export type ValueOf<T> = T[keyof T];

export type Primitive = string | boolean | number;

export type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

export interface WSHandshakeAuth {
  sessionId: string;
  userId: string;
}

export interface WSMessage<T extends object = {}> {
  body: T;
  sessionId: string;
}

export type WSMessageUserData = WSMessage<{ user: UserSchemaProps }>;
export type WSMessageSetVoteValue = WSMessage<{ user: UserSchemaProps; voteValue: string }>;
export type WSMessageSetTopic = WSMessage<{ topic: string }>;
export type WSMessageModifyUser = WSMessage<{ params: Partial<UserSchemaProps>; userId: string }>;
export type WSMessageSessionPermissions = WSMessage<{ usePermissions: boolean }>;
export type WSMessageUserPermissions = WSMessage<{ hasPermission: boolean }>;
