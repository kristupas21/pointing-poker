import { User } from '../../types/global';

export interface SessionState {
  sessionId: string;
  user: User;
}

export type CreateSession = typeof import('./sessionActions').createSession;
