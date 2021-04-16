import { User } from 'globalTypes';

export interface WSHandshakeAuth {
  sessionId: string;
  userId: string;
}

export interface WSMessage<T extends object = {}> {
  body: T;
  sessionId: string;
}

export type WSEventMapItem = {
  event: string;
  listener: (...args: any) => Generator;
  emitterData?: (...args: any) => Generator;
  debounced?: boolean;
};

export type WSMessageUserData = WSMessage<{ user: User }>;

export type WSMessageSetVoteValue = WSMessage<{ user: User; voteValue: string }>;

export type WSMessageSetTopic = WSMessage<{ topic: string }>;

export type WSMessageSessionPermissions = WSMessage<{ usePermissions: boolean }>;

export type WSMessageUserPermissions = WSMessage<{ hasPermission: boolean }>;
