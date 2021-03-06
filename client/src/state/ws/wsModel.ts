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
  debounced?: boolean;
  emitterData?: (...args: any) => Generator;
  event: string;
  listener: (...args: any) => Generator;
};

export type WSMessageUserData = WSMessage<{ user: User }>;

export type WSMessageSetVoteValue = WSMessage<{ user: User; voteValue: string }>;

export type WSMessageSetTopic = WSMessage<{ topic: string }>;

export type WSMessageSessionPermissions = WSMessage<{ usePermissions: boolean }>;

export type WSMessageUserPermissions = WSMessage<{ hasPermission: boolean }>;
