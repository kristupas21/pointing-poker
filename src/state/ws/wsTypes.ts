import { User } from '../../types/global';

export interface WSMessage<T = never> {
  eventType: string;
  body: T;
}

export interface WSBodySessionJoined {
  session: {
    id: string;
    users: User[];
  }
}
